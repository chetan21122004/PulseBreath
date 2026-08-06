import { CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { Reveal, StaggerItem, StaggerReveal } from "./motion";
import {
  PROGRAM_OPTIONS,
  UPCOMING_BATCH,
  type ProgramOption,
} from "./new-batch-data";

type UpcomingBatchCardProps = {
  option: ProgramOption;
  index: number;
  variant?: "home" | "page";
};

function UpcomingBatchCard({ option, index, variant = "home" }: UpcomingBatchCardProps) {
  const isPage = variant === "page";

  return (
    <article
      className={`motion-card relative flex h-full flex-col overflow-hidden bg-background/95 ${
        isPage ? "p-6 sm:p-8" : "p-5 sm:p-6"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-[var(--primary-soft)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-brand sm:text-[10px]">
          Batch {index + 1}
        </span>
        <span
          className={`font-display font-bold text-[var(--primary-soft)] ${
            isPage ? "text-4xl sm:text-5xl" : "text-3xl"
          }`}
          aria-hidden
        >
          0{index + 1}
        </span>
      </div>

      <div className="mt-5 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
          {option.label}
        </p>
        <p
          className={`mt-3 font-display font-bold text-navy ${
            isPage ? "text-3xl sm:text-4xl" : "text-3xl"
          }`}
        >
          {option.sessionsPerWeek}
          <span className="ml-1.5 text-base font-medium text-navy/55">sessions / week</span>
        </p>

        <ul className="mt-4 space-y-2 text-sm text-navy/75">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
            {option.durationWeeks}-week programme
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
            {option.totalSessions} supervised sessions
          </li>
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0 text-brand" />
            Live tele-rehabilitation
          </li>
        </ul>

        <p className="mt-4 text-sm leading-relaxed text-[var(--body-text)]">{option.description}</p>
      </div>
    </article>
  );
}

type UpcomingBatchRowProps = {
  variant?: "home" | "page";
};

/** Shared enquiry header with two batch columns underneath. */
export function UpcomingBatchRow({ variant = "home" }: UpcomingBatchRowProps) {
  const isPage = variant === "page";

  return (
    <Reveal
      variant="fadeUp"
      className="overflow-hidden rounded-2xl border border-border/80 bg-background/95 shadow-[0_12px_40px_-24px_rgba(30,46,61,0.14)]"
    >
      <div className="flex flex-col items-center justify-between gap-3 border-b border-border/70 bg-gradient-to-r from-[var(--primary-soft)]/70 via-white/80 to-[var(--primary-soft)]/40 px-5 py-4 sm:flex-row sm:px-8 sm:py-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/90 ring-1 ring-brand/20">
            <MessageCircle className="h-5 w-5 text-brand" strokeWidth={2.25} />
          </span>
          <div>
            <p
              className={`font-display font-bold leading-tight text-navy ${
                isPage ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
              }`}
            >
              {UPCOMING_BATCH.enquiryLabel}
            </p>
            <p className="mt-0.5 text-sm font-medium text-navy/60">
              {UPCOMING_BATCH.enquiryMessage}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand sm:text-[11px]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" aria-hidden />
          {UPCOMING_BATCH.status}
        </span>
      </div>

      <StaggerReveal
        className="grid divide-y divide-border/70 sm:grid-cols-2 sm:divide-x sm:divide-y-0"
        itemVariant="fadeUp"
      >
        {PROGRAM_OPTIONS.map((option, index) => (
          <StaggerItem key={option.id}>
            <UpcomingBatchCard option={option} index={index} variant={variant} />
          </StaggerItem>
        ))}
      </StaggerReveal>
    </Reveal>
  );
}

