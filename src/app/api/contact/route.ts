import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/data/site";
import { validateContact, type ContactInput } from "@/lib/validation";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function fail(status: number, error: string, extra?: object) {
  return NextResponse.json({ ok: false, error, ...extra }, { status });
}

export async function POST(request: Request) {
  let body: Partial<ContactInput> & { website?: string };
  try {
    body = await request.json();
  } catch {
    return fail(400, "Invalid request.");
  }

  // Honeypot anti-bot check
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return fail(400, "Invalid request.");
  }

  const input: ContactInput = {
    name: String(body.name ?? ""),
    email: String(body.email ?? ""),
    subject: String(body.subject ?? ""),
    message: String(body.message ?? ""),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length > 0) {
    return fail(422, "Please fix the highlighted fields.", { fields: errors });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return fail(429, "Too many messages. Please try again in a few minutes.");
  }

  const name = input.name.trim();
  const email = input.email.trim();
  const subject = input.subject.trim().replace(/[\r\n]+/g, " ");
  const message = input.message.trim();
  const recipientEmail = process.env.CONTACT_TO_EMAIL || site.email;

  // 1. Try Nodemailer SMTP (Gmail or custom SMTP) if configured
  const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name} (Portfolio)" <${smtpUser}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `[Portfolio Inquiry] ${subject}`,
        text: `You received a new message from your portfolio website:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #f6f3ee; border-radius: 12px; color: #0b1428;">
            <h2 style="color: #142b50; border-bottom: 2px solid #c5a46d; padding-bottom: 8px;">New Portfolio Contact Message</h2>
            <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2ddd3; margin-top: 12px;">
              <p style="white-space: pre-wrap; margin: 0;">${message}</p>
            </div>
            <p style="font-size: 12px; color: #64748b; margin-top: 16px;">Delivered directly via Geetanjali Chouhan Developer Portfolio</p>
          </div>
        `,
      });

      return NextResponse.json({ ok: true });
    } catch (err) {
      console.error("[contact:nodemailer] Failed to send email via SMTP:", err);
    }
  }

  // 2. Try Resend API if RESEND_API_KEY is configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const response = await fetch(process.env.RESEND_API_URL ?? "https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || `Portfolio Contact <onboarding@resend.dev>`,
          to: [recipientEmail],
          reply_to: email,
          subject: `[Portfolio] ${subject}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
        signal: AbortSignal.timeout(10_000),
      });

      if (response.ok) {
        return NextResponse.json({ ok: true });
      }
      console.error("[contact:resend] Email service rejected message:", response.status, await response.text());
    } catch (err) {
      console.error("[contact:resend] Could not reach Resend email service:", err);
    }
  }

  // 3. Fallback: Free FormSubmit API dispatch to recipient's email
  try {
    const origin =
      request.headers.get("origin") ||
      request.headers.get("referer") ||
      "http://localhost:3000";

    const formSubmitRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: origin,
      },
      body: JSON.stringify({
        name,
        email,
        _subject: `[Portfolio Inquiry] ${subject}`,
        message,
        _replyto: email,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    const data = (await formSubmitRes.json().catch(() => ({}))) as {
      success?: string | boolean;
      message?: string;
    };

    if (formSubmitRes.ok && (data.success === "true" || data.success === true)) {
      return NextResponse.json({ ok: true });
    }

    if (
      data.message &&
      typeof data.message === "string" &&
      data.message.toLowerCase().includes("activation")
    ) {
      return NextResponse.json({
        ok: true,
        notice: "activation",
        message:
          "FormSubmit has sent a 1-time activation email to your Gmail (geetanjalichouhan82@gmail.com). Please open Gmail and click 'Activate Form' once to enable automatic forwarding!",
      });
    }
  } catch (err) {
    console.error("[contact:formsubmit] FormSubmit fallback dispatch attempt:", err);
  }

  // Fallback 4: Web3Forms if WEB3FORMS_KEY is set
  if (process.env.WEB3FORMS_KEY) {
    try {
      const fallbackRes = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_KEY,
          name,
          email,
          subject: `[Portfolio] ${subject}`,
          message,
          to: recipientEmail,
        }),
        signal: AbortSignal.timeout(8_000),
      });

      const fallbackData = await fallbackRes.json().catch(() => ({}));
      if (fallbackRes.ok && fallbackData.success) {
        return NextResponse.json({ ok: true });
      }
    } catch (err) {
      console.error("[contact:web3forms] Web3Forms fallback dispatch attempt:", err);
    }
  }

  // If no email provider is configured or all attempts failed, give actionable feedback
  if (!smtpPass && !resendApiKey) {
    return fail(
      503,
      "Email service is awaiting your Gmail App Password in .env.local.",
      { fallbackEmail: recipientEmail }
    );
  }

  return fail(502, "Could not deliver email to the server. Please email directly.", {
    fallbackEmail: recipientEmail,
  });
}
