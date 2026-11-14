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
  | { kind: "error"; message: string; fallbackEmail?: string };

const fieldBase =
  "w-full rounded-xl border bg-card px-4 py-3 text-base text-ink shadow-sm transition-colors placeholder:text-slate-400 focus:border-royal focus:outline-none focus:ring-4 focus:ring-royal/15";

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
        <label htmlFor={id} className="text-sm font-semibold text-heading">
          {label}
        </label>
        {hint && <span className="font-mono text-xs text-muted">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-600">
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
      // Clear a field's error as soon as the visitor starts fixing it.
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
    className: cn(fieldBase, errors[key] ? "border-red-400" : "border-line"),
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
      const data: { ok?: boolean; error?: string; fields?: ContactErrors; fallbackEmail?: string } =
        await res.json().catch(() => ({}));

      // Success is reported ONLY when the server confirms the message was sent.
      if (res.ok && data.ok === true) {
        setStatus({ kind: "success", name: values.name.trim().split(/\s+/)[0] });
        setValues(EMPTY);
        setErrors({});
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
      className="space-y-5 rounded-2xl border border-line bg-card p-6 shadow-card sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input type="text" autoComplete="name" placeholder="Your name" required {...inputProps("name")} />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            required
            {...inputProps("email")}
          />
        </Field>
      </div>

      <Field id="subject" label="Subject" error={errors.subject}>
        <input type="text" placeholder="What's this about?" required {...inputProps("subject")} />
      </Field>

      <Field
        id="message"
        label="Message"
        error={errors.message}
        hint={`${values.message.trim().length}/${LIMITS.message.max}`}
      >
        <textarea rows={6} placeholder="Tell me about your project or opportunity…" required {...inputProps("message")} />
      </Field>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" variant="gradient" className="w-full sm:w-auto" disabled={sending}>
        {sending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden />
            Send message
          </>
        )}
      </Button>

      <div aria-live="polite" className="empty:hidden">
        {status.kind === "success" && (
          <p
            role="status"
            className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800"
          >
            <CircleCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
            Thanks{status.name ? `, ${status.name}` : ""}! Your message has been sent — I&apos;ll get back to you soon.
          </p>
        )}
        {status.kind === "error" && (
          <p
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800"
          >
            <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden />
            <span>
              {status.message}
              {status.fallbackEmail && (
                <>
                  {" "}
                  You can email me directly at{" "}
                  <a className="underline underline-offset-2" href={`mailto:${status.fallbackEmail}`}>
                    {status.fallbackEmail}
                  </a>
                  .
                </>
              )}
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
