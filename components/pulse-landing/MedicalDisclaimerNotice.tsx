import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { MEDICAL_DISCLAIMER } from "./constants";

export function MedicalNoticeBadge({
  className,
  iconOnly = false,
}: {
  className?: string;
  iconOnly?: boolean;
}) {
  return (
    <span
      title="Medical notice"
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[color-mix(in_oklch,var(--brand-teal)_38%,transparent)]",
        "bg-[color-mix(in_oklch,var(--brand-teal)_14%,transparent)]",
        iconOnly ? "p-1" : "px-2.5 py-0.5",
        "font-sans-brand text-[9px] font-semibold uppercase tracking-[0.14em]",
        "text-[color-mix(in_oklch,var(--brand-teal-soft)_90%,white)]",
        className,
      )}
    >
      <ShieldCheck className="h-3 w-3 shrink-0 opacity-90" strokeWidth={2.25} aria-hidden />
      {iconOnly ? (
        <span className="sr-only">Medical notice</span>
      ) : (
        "Medical notice"
      )}
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
        className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 sm:px-5 sm:py-4"
      >
        <div className="flex items-start gap-2.5 sm:flex-row sm:items-center sm:gap-3">
          <MedicalNoticeBadge iconOnly className="mt-0.5 sm:hidden" />
          <MedicalNoticeBadge className="hidden sm:inline-flex" />
          <span className="hidden h-3.5 w-px shrink-0 bg-white/15 sm:block" aria-hidden />
          <p className="min-w-0 flex-1 text-left text-[11px] leading-[1.45] text-white/80 sm:flex-none sm:text-xs sm:leading-relaxed sm:text-white/75">
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
      className="mx-auto flex w-full max-w-7xl items-start gap-2 px-3 py-2 sm:items-center sm:gap-3 sm:px-6 sm:py-0"
    >
      <MedicalNoticeBadge iconOnly className="mt-0.5 sm:hidden" />
      <MedicalNoticeBadge className="hidden sm:inline-flex" />
      <span className="hidden h-3.5 w-px shrink-0 bg-white/15 sm:block" aria-hidden />
      <p className="min-w-0 flex-1 text-left text-[10px] leading-[1.45] text-white/80 sm:flex-none sm:text-[11px] sm:leading-snug sm:text-white/75 xl:text-xs">
        {MEDICAL_DISCLAIMER}
      </p>
    </div>
  );
}
