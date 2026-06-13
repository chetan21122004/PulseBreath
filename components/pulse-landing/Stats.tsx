import { BackgroundBlob } from "./BackgroundBlob";
import { StaggerItem, StaggerReveal } from "./motion";
import { SectionPageLink } from "./SectionPageLink";

const stats = [
  { v: "200+", l: "Patients guided", tone: "brand" as const },
  { v: "94%", l: "Program adherence", tone: "brand" as const },
  { v: "0", l: "Adverse events", tone: "teal" as const },
  { v: "Pan-India", l: "Tele-rehab reach", tone: "navy" as const },
];

function StatValue({ value, tone }: { value: string; tone: "brand" | "teal" | "navy" }) {
  const suffix = value.match(/(\+|%)$/)?.[1];
  const valueTone =
    tone === "teal" ? "text-teal" : tone === "brand" ? "text-brand" : "text-navy";

  if (!suffix) {
    return <span className={valueTone}>{value}</span>;
  }

  return (
    <span className="text-navy">
      {value.slice(0, -1)}
      <span className={tone === "teal" ? "text-teal" : "text-brand"}>{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-section py-5 sm:py-6">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <BackgroundBlob variant={2} cover opacity={0.08} className="object-[45%_50%]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 50% at 15% 50%, rgba(192,81,106,0.06), transparent 65%), radial-gradient(50% 45% at 85% 50%, rgba(58,143,163,0.07), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-background/95 shadow-[0_12px_40px_-24px_rgba(30,46,61,0.14)] backdrop-blur-sm">
          <div
            aria-hidden
            className="h-1 bg-gradient-to-r from-teal via-brand to-teal opacity-80"
          />

          <StaggerReveal
            className="grid grid-cols-2 divide-x divide-y divide-border/70 lg:grid-cols-4 lg:divide-y-0"
            amount={0.2}
          >
            {stats.map(({ v, l, tone }) => (
              <StaggerItem
                key={l}
                className="flex flex-col items-center justify-center px-2 py-4 text-center sm:px-5 sm:py-5"
              >
                <p className="font-display text-[clamp(1.65rem,3.5vw,2.25rem)] font-medium leading-none tracking-tight">
                  <StatValue value={v} tone={tone} />
                </p>
                <p className="mt-2 font-sans-brand text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground sm:text-[11px] sm:tracking-[0.16em]">
                  {l}
                </p>
              </StaggerItem>
            ))}
          </StaggerReveal>

          <div className="border-t border-border/70 px-4 py-4 text-center sm:px-6">
            <SectionPageLink href="/about">About PulseBreath</SectionPageLink>
          </div>
        </div>
      </div>
    </section>
  );
}
