import { CheckCircle2, HeartPulse, ShieldCheck, TrendingUp, Video } from "lucide-react";
const safetyExercise = "/assets/imgs/pexels-kampus-8173440.jpg.jpeg";
import { BackgroundBlob } from "./BackgroundBlob";

const pillars = [
  {
    Icon: ShieldCheck,
    title: "Specialist-led every session",
    body: "Every session is guided live by Dr. Deepali - a cardiopulmonary physiotherapist, not a generic workout plan.",
  },
  {
    Icon: HeartPulse,
    title: "Monitored as you move",
    body: "Heart rate, breathing, and how you feel are tracked throughout. Intensity stays within limits set for your condition.",
  },
  {
    Icon: TrendingUp,
    title: "Progress at your pace",
    body: "Your capacity is reviewed regularly. The program advances only when your body is ready - never rushed.",
  },
];

const commitments = [
  "Built on clinical cardiac and pulmonary rehab guidelines",
  "Clear stop rules if you feel unwell during a session",
  "Weekly review and plan adjustment as you improve",
];

export function Safety() {
  return (
    <section className="relative overflow-hidden py-5 bg-section ">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <BackgroundBlob variant={3} cover opacity={0.1} className="object-[50%_35%]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 45% at 80% 15%, rgba(58,143,163,0.08), transparent 65%), radial-gradient(45% 40% at 10% 85%, rgba(192,81,106,0.06), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Photo */}
          <div className="relative order-2 lg:order-1">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand/15 via-transparent to-[#C0516A]/10 blur-sm"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 shadow-[0_28px_70px_-32px_rgba(44,62,80,0.35)]">
              <img
                src={safetyExercise}
                alt="Small group exercising at home under live specialist supervision"
                loading="lazy"
                width={960}
                height={720}
                className="aspect-[4/3] h-full w-full object-cover object-[center_35%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md">
                  <Video className="h-3.5 w-3.5" strokeWidth={2.25} />
                  Live supervision
                </div>
                <p className="mt-3 max-w-sm font-display text-lg font-semibold leading-snug text-white drop-shadow-md sm:text-xl">
                  Structured movement - guided in real time, from the safety of home.
                </p>
              </div>
            </div>
            <div
              aria-hidden
              className="absolute -bottom-5 -right-4 hidden rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-[0_12px_32px_-16px_rgba(44,62,80,0.3)] backdrop-blur-sm sm:block"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand">Every session</p>
              <p className="mt-0.5 font-display text-sm font-bold text-navy">Dr. Deepali on screen</p>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <span className="pill">Safety First</span>
            <h2 className="heading-display mt-6">
              Exercise that is <span className="text-brand">safe</span> for your heart and lungs
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[var(--body-text)]">
              Many patients worry that exercise will make their condition worse. With live specialist
              supervision - even from your living room - structured movement becomes one of the most
              effective tools for cardiopulmonary recovery.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-background/90 backdrop-blur-sm">
              <div className="border-b border-border bg-soft/40 px-6 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  A common concern
                </p>
                <p className="mt-2 font-display text-lg leading-snug text-navy sm:text-xl">
                  &ldquo;Is it really safe for me to exercise with a heart or lung condition?&rdquo;
                </p>
              </div>
              <div className="px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">Our answer</p>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--body-text)]">
                  Yes - when it is medically supervised, personalised to your limits, and progressed
                  gradually. That is exactly how PulseBreath programs are designed and delivered, online
                  or in person.
                </p>
              </div>
            </div>
          </div>
        </div>

       

        
      </div>
    </section>
  );
}
