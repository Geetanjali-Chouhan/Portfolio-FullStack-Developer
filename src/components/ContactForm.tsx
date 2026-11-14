"use client";

import { useRef, useState } from "react";
import { CircleCheck, Loader2, Send, TriangleAlert } from "lucide-react";
import { LIMITS, validateContact, type ContactErrors, type ContactInput } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const EMPTY: ContactInput = { name: "", email: "", subject: "", message: "" };

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; name: string }
  | { kind: "activation"; message: string }
  | { kind: "error"; message: string; fallbackEmail?: string };

const fieldBase =
  "w-full rounded-2xl border border-[#C5A46D]/30 bg-[#142B50]/70 px-4 py-3.5 text-sm text-[#E8EDF5] placeholder:text-[#AAB5C5]/50 transition-all duration-200 focus:border-[#C5A46D] focus:bg-[#142B50] focus:outline-none focus:ring-4 focus:ring-[#C5A46D]/15";

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-xs font-semibold tracking-wider text-[#DFCA9F] uppercase">
          {label}
        </label>
        {hint && <span className="font-mono text-xs text-[#AAB5C5]/60">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm({ fallbackEmail }: { fallbackEmail: string }) {
  const [values, setValues] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  const sending = status.kind === "sending";

  const update =
    (key: keyof ContactInput) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  const inputProps = (key: keyof ContactInput) => ({
    id: key,
    name: key,
    value: values[key],
    onChange: update(key),
    disabled: sending,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
    className: cn(fieldBase, errors[key] && "border-rose-500 focus:border-rose-500"),
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;

    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as Array<keyof ContactInput>)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${firstInvalid}`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const honeypot = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value;
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot ?? "" }),
      });
      const data: {
        ok?: boolean;
        notice?: string;
        message?: string;
        error?: string;
        fields?: ContactErrors;
        fallbackEmail?: string;
      } = await res.json().catch(() => ({}));

      if (res.ok && data.ok === true) {
        if (data.notice === "activation") {
          setStatus({
            kind: "activation",
            message: data.message ?? "Please click 'Activate Form' in your Gmail inbox.",
          });
        } else {
          setStatus({ kind: "success", name: values.name.trim().split(/\s+/)[0] });
          setValues(EMPTY);
          setErrors({});
        }
        return;
      }
      if (data.fields) setErrors(data.fields);
      setStatus({
        kind: "error",
        message: data.error ?? "Something went wrong and your message was not sent.",
        fallbackEmail: data.fallbackEmail,
      });
    } catch {
      setStatus({
        kind: "error",
        message: "Couldn't reach the server, so your message was not sent.",
        fallbackEmail,
      });
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="space-y-5 rounded-3xl border border-[#C5A46D]/30 bg-[#0B1428]/95 p-6 shadow-2xl backdrop-blur-md sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full Name" error={errors.name}>
          <input type="text" autoComplete="name" placeholder="Geetanjali Chouhan" required {...inputProps("name")} />
        </Field>
        <Field id="email" label="Email Address" error={errors.email}>
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@domain.com"
            required
            {...inputProps("email")}
          />
        </Field>
      </div>

      <Field id="subject" label="Subject" error={errors.subject}>
        <input type="text" placeholder="Project Inquiry / Job Opportunity" required {...inputProps("subject")} />
      </Field>

      <Field
        id="message"
        label="Message"
        error={errors.message}
        hint={`${values.message.trim().length}/${LIMITS.message.max}`}
      >
        <textarea rows={5} placeholder="Tell me about your project, timeline, or requirements…" required {...inputProps("message")} />
      </Field>

      {/* Honeypot field */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" variant="gold" size="lg" className="w-full sm:w-auto" disabled={sending}>
        {sending ? (
          <>
            <Loader2 className="size-4 animate-spin text-[#0B1428]" aria-hidden />
            Delivering Message…
          </>
        ) : (
          <>
            <Send className="size-4 text-[#0B1428]" aria-hidden />
            Send Message
          </>
        )}
      </Button>

      <div aria-live="polite" className="empty:hidden">
        {status.kind === "activation" && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-2xl border border-[#C5A46D]/60 bg-[#142B50]/90 p-4 text-sm font-medium text-[#DFCA9F]"
          >
            <CircleCheck className="mt-0.5 size-5 shrink-0 text-[#DFCA9F]" aria-hidden />
            <div>
              <p className="font-semibold text-white">One-Time Activation Required:</p>
              <p className="mt-1 text-xs text-[#E8EDF5] leading-relaxed">{status.message}</p>
            </div>
          </div>
        )}
        {status.kind === "success" && (
          <p
            role="status"
            className="flex items-start gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-sm font-medium text-emerald-300"
          >
            <CircleCheck className="mt-0.5 size-5 shrink-0 text-emerald-400" aria-hidden />
            Thank you{status.name ? `, ${status.name}` : ""}! Your message has been received — I will get back to you promptly.
          </p>
        )}
        {status.kind === "error" && (
          <div
            role="alert"
            className="flex flex-col gap-3 rounded-2xl border border-rose-500/40 bg-rose-950/40 p-4 text-sm font-medium text-rose-300"
          >
            <div className="flex items-start gap-3">
              <TriangleAlert className="mt-0.5 size-5 shrink-0 text-rose-400" aria-hidden />
              <span>{status.message}</span>
            </div>
            {status.fallbackEmail && (
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-rose-500/20">
                <span className="text-xs text-[#DFCA9F]">Instant 1-Click Backup:</span>
                <a
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#C5A46D] bg-[#0B1428] px-4 py-1.5 text-xs font-semibold text-[#DFCA9F] shadow-xs transition-transform hover:scale-105 hover:bg-[#142B50]"
                  href={`mailto:${status.fallbackEmail}?subject=${encodeURIComponent(
                    values.subject || "Portfolio Inquiry"
                  )}&body=${encodeURIComponent(
                    `Hi Geetanjali,\n\nName: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`
                  )}`}
                >
                  <Send className="size-3 text-[#DFCA9F]" />
                  Send directly to {status.fallbackEmail}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
