import { HeartPulse, Users, Activity } from "lucide-react";

const cards = [
  {
    Icon: HeartPulse,
    tint: "rose",
    title: "Built for your condition",
    body: "Programs designed around your specific diagnosis, not a one-size-fits-all template.",
    offset: "md:translate-y-0",
  },
  {
    Icon: Users,
    tint: "teal",
    title: "Specialist supervision",
    body: "Every session is guided in real time by Dr. Deepali -not pre-recorded videos.",
    offset: "md:translate-y-10",
  },
  {
    Icon: Activity,
    tint: "rose",
    title: "Adjusted as you progress",
    body: "Regular review of capacity, with the program updated as you improve.",
    offset: "md:translate-y-4",
  },
];

export function Solution() {
  return (
    <section id="solution" className="relative overflow-hidden bg-section py-8 pb-12">
      {/* Flowing wave background */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-45"
        viewBox="0 0 1440 700"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wave-rose" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(var(--brand) / 0)" />
            <stop offset="50%" stopColor="hsl(var(--brand) / 0.55)" />
            <stop offset="100%" stopColor="hsl(var(--brand) / 0)" />
          </linearGradient>
          <linearGradient id="wave-teal" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(180 45% 45% / 0)" />
            <stop offset="50%" stopColor="hsl(180 45% 45% / 0.55)" />
            <stop offset="100%" stopColor="hsl(180 45% 45% / 0)" />
          </linearGradient>
          <linearGradient id="wave-navy" x1="0" x2="1">
            <stop offset="0%" stopColor="hsl(var(--navy) / 0)" />
            <stop offset="50%" stopColor="hsl(var(--navy) / 0.35)" />
            <stop offset="100%" stopColor="hsl(var(--navy) / 0)" />
          </linearGradient>
        </defs>
        {Array.from({ length: 14 }).map((_, i) => {
          const grads = ["url(#wave-teal)", "url(#wave-rose)", "url(#wave-navy)"];
          const y = 300 + i * 8;
          const amp = 70 + i * 4;
          return (
            <path
              key={i}
              d={`M -50 ${y} C 300 ${y - amp}, 600 ${y + amp}, 900 ${y - amp * 0.7} S 1500 ${y + amp * 0.5}, 1500 ${y}`}
              fill="none"
              stroke={grads[i % 3]}
              strokeWidth={i % 4 === 0 ? 1.4 : 0.8}
              opacity={0.55 - i * 0.025}
            />
          );
        })}
        {/* floating dots */}
        {Array.from({ length: 30 }).map((_, i) => (
          <circle
            key={`d${i}`}
            cx={(i * 137) % 1440}
            cy={150 + ((i * 53) % 450)}
            r={i % 5 === 0 ? 2.2 : 1.2}
            fill={i % 2 ? "hsl(var(--brand) / 0.35)" : "hsl(180 45% 45% / 0.35)"}
          />
        ))}
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="pill">The PulseBreath Approach</span>
          <h2 className="heading-display text-5xl md:text-6xl">
            Personalised, supervised, <span className="text-brand">evidence-based.</span>
          </h2>
          <div className="mx-auto  h-px w-16 bg-navy/30" />
          <p className="mx-auto mt-6 max-w-3xl font-sans-brand text-base leading-[1.75] text-navy/90 sm:text-[17px]">
            Every patient is different -   their condition, their capacity, their goals. The program must reflect that.
            PulseBreath Physiotherapy delivers condition-specific cardiac and pulmonary rehabilitation -
            designed and personally supervised by Dr. Deepali Shah, online or in-person.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">
          {cards.map(({ Icon, title, body, tint, offset }) => (
            <article
              key={title}
              className={`group relative rounded-3xl border border-white/60 bg-white/55 p-8 shadow-[0_20px_60px_-30px_rgba(30,46,61,0.35)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_30px_80px_-30px_rgba(176,64,96,0.4)] ${offset}`}
            >
              {/* glass highlight */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                <div className="absolute -top-1/2 -left-1/3 h-full w-2/3 rotate-12 bg-gradient-to-br from-white/70 to-transparent opacity-60" />
              </div>

              <div className="relative">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border ${
                    tint === "rose"
                      ? "border-brand/30 bg-brand/10 text-brand"
                      : "border-teal-500/30 bg-teal-500/10 text-teal-600"
                  }`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </div>

                <h3 className="font-display mt-10 text-3xl font-bold text-navy">
                  {title}
                </h3>

                <p className="mt-4 text-[15px] leading-relaxed text-navy/85">
                  {body}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* corner sparkle */}
        <svg className="pointer-events-none absolute bottom-6 right-6 h-6 w-6 text-brand/60" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2 7 7 2-7 2-2 7-2-7-7-2 7-2z" />
        </svg>
      </div>
    </section>
  );
}
