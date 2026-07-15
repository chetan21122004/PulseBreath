import { Calendar, CheckCircle2, Clock } from "lucide-react";
import { UPCOMING_BATCH, type ProgramOption } from "./new-batch-data";

type UpcomingBatchCardProps = {
  option: ProgramOption;
  index: number;
  variant?: "home" | "page";
};

export function UpcomingBatchCard({ option, index, variant = "home" }: UpcomingBatchCardProps) {
  const isPage = variant === "page";

  return (
    <article
      className={`motion-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-background/95 shadow-[0_12px_40px_-24px_rgba(30,46,61,0.14)] ${
        isPage ? "p-6 sm:p-8" : "p-5 sm:p-6"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-[var(--primary-soft)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-brand sm:text-[10px]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" aria-hidden />
          {UPCOMING_BATCH.status}
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

      <div className="mt-4 rounded-xl border border-brand/20 bg-gradient-to-br from-[var(--primary-soft)]/80 to-white/60 p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand sm:text-[11px]">
          Batch starts on
        </p>
        <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
          <p
            className={`font-display font-bold leading-none text-navy ${
              isPage ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"
            }`}
          >
            {option.startDateShort}
          </p>
          <p className="pb-0.5 text-sm font-medium text-navy/55">{UPCOMING_BATCH.startDay}</p>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-navy/65">
          <Calendar className="h-3.5 w-3.5 text-brand" />
          {option.startDate}
        </p>
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
