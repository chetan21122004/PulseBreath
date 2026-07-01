import { cn } from "@/lib/utils";
import type { Program } from "./conditions-data";

type ProgramPreviewProps = {
  program: Program;
  compact?: boolean;
  className?: string;
};

export function ProgramPreview({ program, compact = false, className }: ProgramPreviewProps) {
  if (!program.includes?.length) {
    return (
      <p
        className={cn(
          "font-sans-brand leading-relaxed text-navy/65",
          compact ? "mt-1 line-clamp-2 text-[13px]" : "mt-2 text-[13px] sm:text-sm",
          className,
        )}
      >
        {program.for}
      </p>
    );
  }

  const bulletClass = compact
    ? "list-disc space-y-1 pl-4 text-[12px] leading-snug marker:text-brand"
    : "list-disc space-y-1 pl-4 text-[12px] leading-snug marker:text-brand sm:text-[13px]";
  const focusBulletClass = compact
    ? "list-disc space-y-1 pl-4 text-[12px] leading-snug marker:text-teal"
    : "list-disc space-y-1 pl-4 text-[12px] leading-snug marker:text-teal sm:text-[13px]";
  const labelClass = "text-[10px] font-bold uppercase tracking-[0.12em] text-navy/50 sm:text-[11px]";
  const focusItems = compact ? program.benefits.slice(0, 3) : program.benefits;

  return (
    <div className={cn("mt-2 flex-1 space-y-2.5 font-sans-brand", className)}>
      {program.includesLabel ? <p className={labelClass}>{program.includesLabel}</p> : null}
      <ul className={cn(bulletClass, "text-navy/75")}>
        {program.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {focusItems.length ? (
        <div>
          <p className={labelClass}>Focus:</p>
          <ul className={cn(focusBulletClass, "mt-1 text-navy/70")}>
            {focusItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function categoryProgramsHeading(cat: string, tag: string) {
  return cat === "Cardiac" ? tag : `${cat} Programs`;
}

export function categoryServicesHeading(cat: string, tag: string) {
  return cat === "Cardiac" ? tag : `${cat} Services`;
}
