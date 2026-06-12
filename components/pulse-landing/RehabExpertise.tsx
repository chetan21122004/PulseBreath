import { Check } from "lucide-react";
import { TAGLINES, taglineClass } from "./marketing-taglines";
import { Reveal, StaggerItem, StaggerReveal } from "./motion";

const checklist = [
  "Heart-rate monitoring",
  "Oxygen saturation monitoring",
  "Symptom-guided progression",
  "Condition-specific exercise prescription",
  "Evidence-based rehabilitation protocols",
  "Medical supervision and safety",
];

export function RehabExpertise() {
  return (
    <section className="relative max-md:snap-align-none snap-start overflow-hidden bg-section py-10 lg:py-14">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal variant="fadeUp" className="text-center lg:text-left">
            <span className="pill">Specialist Rehabilitation</span>
            <h2 className="heading-display mt-5 text-[1.75rem] sm:text-4xl lg:text-[2.5rem]">
              Why rehabilitation with a{" "}
              <span className="font-display italic text-brand">
                cardiopulmonary physiotherapist?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-display text-lg font-medium text-navy sm:text-xl lg:mx-0">
              Not all exercise is rehabilitation.
            </p>
            <p className="mx-auto mt-3 max-w-xl font-sans-brand text-[15px] leading-relaxed text-navy/85 sm:text-base lg:mx-0">
              Your program is based on clinical monitoring and condition-specific protocols - not a
              generic workout, regular physiotherapy routine, or yoga class.
            </p>
            <p className={`mx-auto mt-5 lg:mx-0 ${taglineClass}`}>{TAGLINES.rehabExpertise}</p>
          </Reveal>

          <StaggerReveal
            className="rounded-2xl border border-border/80 bg-background/95 p-6 shadow-[0_12px_40px_-24px_rgba(30,46,61,0.14)] sm:p-8"
            itemVariant="fadeUp"
          >
            <p className="font-sans-brand text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Your program is based on
            </p>
            <ul className="mt-5 space-y-4">
              {checklist.map((item) => (
                <StaggerItem key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary-soft)]">
                    <Check className="h-3.5 w-3.5 text-brand" strokeWidth={2.5} />
                  </span>
                  <span className="font-sans-brand text-[15px] leading-snug text-navy/90 sm:text-base">
                    {item}
                  </span>
                </StaggerItem>
              ))}
            </ul>
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
