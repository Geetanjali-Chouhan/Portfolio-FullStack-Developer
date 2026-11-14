import { NextResponse } from "next/server";
import { site } from "@/data/site";
import { validateContact, type ContactInput } from "@/lib/validation";

/**
 * Contact form endpoint. Sends the message through Resend's HTTP API.
 *
 * It only ever answers `{ ok: true }` after Resend has accepted the message.
 * If the service isn't configured, or sending fails, the caller gets an honest
 * error instead of a fake success.
 *
 * Env vars (see .env.example):
 *   RESEND_API_KEY      required
 *   CONTACT_TO_EMAIL    optional, defaults to the address in src/data/site.ts
 *   CONTACT_FROM_EMAIL  optional, defaults to Resend's shared test sender
 *   RESEND_API_URL      optional, override the API endpoint (used in tests)
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Best-effort per-instance limiter. On serverless each instance has its own
// memory, so treat this as a speed bump, not a guarantee.
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
  // Keep the map from growing without bound.
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

  // Honeypot: real visitors never see or fill this field.
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set; message not sent.");
    return fail(
      503,
      "The contact form isn't set up yet, so your message was not sent.",
      { fallbackEmail: site.email },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return fail(429, "Too many messages. Please try again in a few minutes.");
  }

  const name = input.name.trim();
  const email = input.email.trim();
  const subject = input.subject.trim().replace(/[\r\n]+/g, " ");
  const message = input.message.trim();

  let response: Response;
  try {
    response = await fetch(process.env.RESEND_API_URL ?? "https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // `||` not `??`: a blank value copied from .env.example must still fall back.
        from: process.env.CONTACT_FROM_EMAIL || `Portfolio Contact <onboarding@resend.dev>`,
        to: [process.env.CONTACT_TO_EMAIL || site.email],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err) {
    console.error("[contact] Could not reach the email service:", err);
    return fail(502, "Couldn't reach the email service. Your message was not sent.", {
      fallbackEmail: site.email,
    });
  }

  if (!response.ok) {
    console.error("[contact] Email service rejected the message:", response.status, await response.text());
    return fail(502, "The email service rejected your message. It was not sent.", {
      fallbackEmail: site.email,
    });
  }

  return NextResponse.json({ ok: true });
}
