import { CheckCircle2 } from "lucide-react";
import { Reveal, StaggerItem, StaggerReveal } from "./motion";
import { SESSION_FORMATS, type SessionFormat } from "./sessions-data";

type SessionFormatCardProps = {
  format: SessionFormat;
  index: number;
  variant?: "home" | "page";
};

function SessionFormatCard({ format, index, variant = "home" }: SessionFormatCardProps) {
  const isPage = variant === "page";
  const Icon = format.icon;

  return (
    <article
      className={`motion-card relative flex h-full flex-col overflow-hidden bg-background/95 ${
        isPage ? "p-6 sm:p-8" : "p-5 sm:p-6"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-[var(--primary-soft)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-brand sm:text-[10px]">
          {format.label}
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

      <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-soft)] ring-1 ring-brand/15">
        <Icon className="h-5 w-5 text-brand" strokeWidth={2.25} />
      </div>

      <div className="mt-4 flex-1">
        <h3
          className={`font-display font-bold leading-tight text-navy ${
            isPage ? "text-2xl sm:text-[1.75rem]" : "text-xl sm:text-2xl"
          }`}
        >
          {format.title}
        </h3>
        <p className="mt-2 text-sm font-medium italic leading-snug text-brand">{format.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-[var(--body-text)]">{format.description}</p>

        <ul className="mt-4 space-y-2 text-sm text-navy/75">
          {format.points.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-sm leading-relaxed text-navy/70">{format.detail}</p>
      </div>
    </article>
  );
}

type SessionFormatRowProps = {
  variant?: "home" | "page";
};

export function SessionFormatRow({ variant = "home" }: SessionFormatRowProps) {
  return (
    <Reveal
      variant="fadeUp"
      className="overflow-hidden rounded-2xl border border-border/80 bg-background/95 shadow-[0_12px_40px_-24px_rgba(30,46,61,0.14)]"
    >
      <StaggerReveal
        className="grid divide-y divide-border/70 sm:grid-cols-2 sm:divide-x sm:divide-y-0"
        itemVariant="fadeUp"
      >
        {SESSION_FORMATS.map((format, index) => (
          <StaggerItem key={format.id}>
            <SessionFormatCard format={format} index={index} variant={variant} />
          </StaggerItem>
        ))}
      </StaggerReveal>
    </Reveal>
  );
}
