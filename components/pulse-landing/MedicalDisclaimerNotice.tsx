import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { MEDICAL_DISCLAIMER } from "./constants";

export function MedicalNoticeBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[color-mix(in_oklch,var(--brand-teal)_38%,transparent)]",
        "bg-[color-mix(in_oklch,var(--brand-teal)_14%,transparent)] px-2.5 py-0.5",
        "font-sans-brand text-[9px] font-semibold uppercase tracking-[0.14em]",
        "text-[color-mix(in_oklch,var(--brand-teal-soft)_90%,white)]",
        className,
      )}
    >
      <ShieldCheck className="h-3 w-3 shrink-0 opacity-90" strokeWidth={2.25} aria-hidden />
      Medical notice
    </span>
  );
}

type MedicalDisclaimerNoticeProps = {
  variant?: "bar" | "footer";
};

export function MedicalDisclaimerNotice({ variant = "bar" }: MedicalDisclaimerNoticeProps) {
  if (variant === "footer") {
    return (
      <div
        role="note"
        aria-label="Medical disclaimer"
        className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 sm:px-5 sm:py-4"
      >
        <div className="flex flex-col items-start gap-2.5 sm:flex-row sm:items-center sm:gap-3">
          <MedicalNoticeBadge />
          <span className="hidden h-3.5 w-px shrink-0 bg-white/15 sm:block" aria-hidden />
          <p className="text-left text-[11px] leading-relaxed text-white/75 sm:text-xs">
            {MEDICAL_DISCLAIMER}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      role="note"
      aria-label="Medical disclaimer"
      className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 sm:px-6"
    >
      <MedicalNoticeBadge />
      <span className="h-3.5 w-px shrink-0 bg-white/15" aria-hidden />
      <p className="min-w-0 text-left text-[10px] leading-snug text-white/75 sm:text-[11px] xl:text-xs">
        {MEDICAL_DISCLAIMER}
      </p>
    </div>
  );
}
