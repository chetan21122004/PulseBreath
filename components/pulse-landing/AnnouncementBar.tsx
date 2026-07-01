import { MedicalDisclaimerNotice } from "./MedicalDisclaimerNotice";

export function AnnouncementBar() {
  return (
    <div
      className="relative flex min-h-[var(--header-disclaimer-height)] items-center border-b border-white/[0.07] bg-[linear-gradient(180deg,color-mix(in_oklch,var(--brand-deeper)_92%,var(--brand-teal)_8%)_0%,var(--brand-deeper)_100%)]"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklch,var(--brand-teal)_45%,transparent)] to-transparent"
        aria-hidden
      />
      <MedicalDisclaimerNotice variant="bar" />
    </div>
  );
}
