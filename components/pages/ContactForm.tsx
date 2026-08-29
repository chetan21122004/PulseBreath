"use client";

import { useId, useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { FORMSPREE_ENDPOINT, WHATSAPP } from "@/components/pulse-landing/constants";
import { cn } from "@/lib/utils";

const INTEREST_OPTIONS = [
  "Cardiac rehabilitation",
  "Pulmonary rehabilitation",
  "Metabolic rehabilitation",
  "Not sure / other",
] as const;

type FormStatus = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "h-12 w-full rounded-xl border border-border/80 bg-white px-4 font-sans-brand text-[15px] text-navy shadow-[0_1px_2px_rgba(30,46,61,0.04)] outline-none transition-[border-color,box-shadow] placeholder:text-navy/40 focus:border-brand/45 focus:ring-2 focus:ring-brand/15 disabled:cursor-not-allowed disabled:opacity-60";

function FormspreeErrorMessage(payload: unknown): string {
  if (payload && typeof payload === "object") {
    const record = payload as { error?: unknown; errors?: { message?: string }[] };
    const first = record.errors?.find((item) => item.message)?.message;
    if (typeof first === "string" && first.trim()) return first;
    if (typeof record.error === "string" && record.error.trim()) return record.error;
  }
  return "Something went wrong. Please try again, or message Dr. Deepali on WhatsApp.";
}

export function ContactForm({
  className,
  variant = "page",
}: {
  className?: string;
  variant?: "page" | "dialog";
}) {
  const id = useId();
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Autofill sometimes fills hidden fields. Never fake a success if that happens.
    if (String(data.get("_gotcha") ?? "").trim()) {
      data.set("_gotcha", "");
    }

    const email = String(data.get("email") ?? "").trim();
    data.set("email", email);
    data.set("_replyto", email);
    data.set("name", String(data.get("name") ?? "").trim());
    data.set("phone", String(data.get("phone") ?? "").trim());
    data.set("interest", String(data.get("interest") ?? "").trim());
    data.set("message", String(data.get("message") ?? "").trim());
    data.set("_subject", "PulseBreath free assessment enquiry");

    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      const payload: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const message = FormspreeErrorMessage(payload);
        const recaptchaBlocked = /recaptcha/i.test(message);
        setError(
          recaptchaBlocked
            ? "Formspree reCAPTCHA is blocking AJAX submissions. In the Formspree form settings, turn reCAPTCHA off, then try again."
            : message,
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setError("Network error. Please try again, or message Dr. Deepali on WhatsApp.");
      setStatus("error");
    }
  }

  const submitting = status === "submitting";
  const isDialog = variant === "dialog";

  if (status === "success") {
    return (
      <div
        className={cn(
          isDialog
            ? "rounded-xl border border-[var(--brand-teal)]/25 bg-[var(--brand-teal-soft)]/40 p-5"
            : "rounded-2xl border border-[var(--brand-teal)]/25 bg-white/95 p-6 shadow-[0_12px_40px_-18px_rgba(30,46,61,0.18)] sm:p-8",
          className,
        )}
        role="status"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand-teal-soft)]">
          <CheckCircle2 className="h-6 w-6 text-[var(--brand-teal-deep)]" strokeWidth={2.25} />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-navy">Enquiry sent</h3>
        <p className="mt-2 font-sans-brand text-[15px] leading-relaxed text-navy/80">
          Thank you. Dr. Deepali will reply personally during clinic hours (Mon–Sat, 8 AM – 8 PM IST).
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="btn-secondary motion-btn w-full justify-center sm:w-auto"
            onClick={() => {
              setStatus("idle");
              setError(null);
            }}
          >
            Send another enquiry
          </button>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary motion-btn w-full justify-center sm:w-auto"
          >
            Message on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      action={FORMSPREE_ENDPOINT}
      method="POST"
      onSubmit={handleSubmit}
      className={cn(
        "relative",
        isDialog
          ? ""
          : "rounded-2xl border border-border/80 bg-white/95 p-5 shadow-[0_12px_40px_-18px_rgba(30,46,61,0.16)] sm:p-8",
        className,
      )}
    >
      <input type="hidden" name="_subject" value="PulseBreath free assessment enquiry" />
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        data-1p-ignore
        data-lpignore="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor={`${id}-name`} className="mb-2 block text-sm font-semibold text-navy">
            Full name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Your name"
            disabled={submitting}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor={`${id}-phone`} className="mb-2 block text-sm font-semibold text-navy">
            Phone / WhatsApp
          </label>
          <input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            minLength={10}
            maxLength={20}
            placeholder="+91"
            disabled={submitting}
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-semibold text-navy">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={160}
            placeholder="you@email.com"
            disabled={submitting}
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-interest`} className="mb-2 block text-sm font-semibold text-navy">
            What are you looking for?
          </label>
          <select
            id={`${id}-interest`}
            name="interest"
            required
            defaultValue=""
            disabled={submitting}
            className={cn(fieldClass, "cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10")}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23C0516A' stroke-width='2.25' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
            }}
          >
            <option value="" disabled>
              Select a program
            </option>
            {INTEREST_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className="mb-2 block text-sm font-semibold text-navy">
            Tell Dr. Deepali about your condition
            <span className="ml-1.5 font-medium text-navy/45">(optional)</span>
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={isDialog ? 4 : 5}
            maxLength={2000}
            placeholder="Diagnosis, current challenges, or the questions you would like to ask…"
            disabled={submitting}
            className={cn(fieldClass, "h-auto min-h-[8.5rem] resize-y py-3")}
          />
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-800" role="alert">
          {error}{" "}
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
            Open WhatsApp
          </a>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary motion-btn mt-6 w-full gap-2 disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send enquiry
          </>
        )}
      </button>

      <p className="mt-4 max-w-xl text-[12px] leading-relaxed text-muted-foreground">
        By sending this form you agree that PulseBreath may use these details to reply to your
        enquiry. Do not include emergency information. See our{" "}
        <Link href="/privacy" className="font-semibold text-brand underline-offset-4 hover:underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
