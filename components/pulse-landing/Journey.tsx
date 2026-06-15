'use client';

import { Fragment, useEffect, useState } from "react";
import { ChevronRight, HeartPulse, ShieldCheck, Video, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BackgroundBlob } from "./BackgroundBlob";
import {
  DR_DEEPALI_JOURNEY_BG,
} from "./dr-deepali-assets";
import { DrDeepaliAutoplayVideo } from "./DrDeepaliAutoplayVideo";
import { JOURNEY_SAFETY_FALLBACK_IMAGE, JOURNEY_SAFETY_VIDEO } from "./constants";
import { SectionIllustration } from "./SectionIllustration";
import { ILLUSTRATIONS } from "./visual-assets";
import { Reveal, StaggerItem, StaggerReveal } from "./motion";
import { SectionPageLink } from "./SectionPageLink";

const safetyPoints: { icon: LucideIcon; text: string }[] = [
  {
    icon: Video,
    text: "Every session is guided live by Dr. Deepali - not a pre-recorded workout",
  },
  {
    icon: HeartPulse,
    text: "Heart rate, breathing, and how you feel are monitored throughout",
  },
  {
    icon: ShieldCheck,
    text: "Built on clinical rehab guidelines with clear stop rules if you feel unwell",
  },
];

type Step = {
  n: number;
  t: string;
  lead: string;
  detail?: string;
  more?: string[];
  tone: "teal" | "pink";
};

const steps: Step[] = [
  {
    n: 1,
    t: "Free Assessment",
    lead: "Complimentary free assessment with Dr. Deepali.",
    detail:
      "She reviews your condition, what you can manage today, and your recovery goals - before you decide anything.",
    more: [
      "Completely free - no obligation to join",
      "Family members welcome on the call",
    ],
    tone: "teal",
  },
  {
    n: 2,
    t: "Personalised Plan",
    lead: "A program built for your condition and capacity.",
    detail:
      "Dr. Deepali designs exercises around your diagnosis, fitness level, and daily routine - not a generic template.",
    more: ["Adapted for home with minimal equipment", "Clear pace and progression from day one"],
    tone: "pink",
  },
  {
    n: 3,
    t: "Guided Sessions",
    lead: "Live online sessions - group or one-to-one.",
    detail:
      "Dr. Deepali supervises throughout: safe pace, correct technique, and real-time guidance.",
    more: [
      "Heart rate, breathing, and how you feel are monitored",
      "Every session is live - not a pre-recorded workout",
    ],
    tone: "teal",
  },
  {
    n: 4,
    t: "Progress Review",
    lead: "Regular check-ins as you improve.",
    detail: "Your plan is adjusted gradually as your capacity grows - sustainable, not rushed.",
    more: ["Changes based on how you respond each week", "Focused on long-term strength and confidence"],
    tone: "pink",
  },
];

function StepDetails({ n, t, lead, detail, more, tone }: Step) {
  const [open, setOpen] = useState(false);
  const hasMore = Boolean(detail || more?.length);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, { capture: true, passive: true });
    return () => window.removeEventListener("scroll", close, { capture: true });
  }, [open]);

  return (
    <div className="mt-4 w-full max-w-[18rem] text-left sm:max-w-[18rem] lg:max-w-[13.5rem] xl:max-w-[15rem]">
      <p className="text-[15px] font-medium leading-snug text-navy">{lead}</p>
      {hasMore ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-expanded={open}
              className="mt-2.5 inline-flex min-h-11 items-center gap-1 px-1 py-2 text-[13px] font-semibold text-brand transition-colors hover:text-brand/80"
            >
              {open ? "Close" : "View more"}
              <ChevronRight
                className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
                strokeWidth={2.25}
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            side="bottom"
            align="start"
            sideOffset={10}
            collisionPadding={20}
            className="w-[min(17.5rem,calc(100vw-2rem))] gap-0 overflow-hidden rounded-xl border-border/80 bg-background p-0 shadow-[0_16px_48px_-20px_rgba(30,46,61,0.35)]"
          >
            <div
              aria-hidden
              className={`h-1 ${tone === "teal" ? "bg-teal" : "bg-brand"}`}
            />
            <div className="relative max-h-[min(50vh,18rem)] overflow-y-auto p-4">
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-3 flex min-h-11 min-w-11 items-center justify-center rounded-md p-2.5 text-muted-foreground transition-colors hover:bg-soft hover:text-navy"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.25} />
              </button>
              <div className="pr-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Step {n}
                </span>
                <p className="mt-1 font-display text-base font-bold leading-snug text-navy">
                  {t}
                </p>
              </div>
              {detail ? (
                <p className="mt-3 text-[13px] leading-relaxed text-[var(--body-text)]">{detail}</p>
              ) : null}
              {more?.length ? (
                <ul className="mt-3 space-y-2 rounded-lg border border-border/70 bg-soft/30 px-3 py-2.5">
                  {more.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[12px] leading-snug text-navy/90"
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${tone === "teal" ? "bg-teal" : "bg-brand"}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </PopoverContent>
        </Popover>
      ) : null}
    </div>
  );
}

function Orb({ n, tone }: { n: number; tone: "teal" | "pink" }) {
  const palette =
    tone === "teal"
      ? {
          ring: "from-[#9fd3dd]/70 via-[#3A8FA3]/40 to-[#0d3a44]/70",
          face: "radial-gradient(circle at 32% 28%, #7cc4d2 0%, #3A8FA3 38%, #1f5a68 70%, #0d3a44 100%)",
          glow: "shadow-[0_18px_40px_-12px_rgba(58,143,163,0.55),inset_0_-6px_14px_rgba(0,0,0,0.35),inset_0_4px_10px_rgba(255,255,255,0.25)]",
          rim: "ring-[#bfe2ea]/60",
        }
      : {
          ring: "from-[#f3c9d4]/70 via-[#C0516A]/40 to-[#5a1f2c]/70",
          face: "radial-gradient(circle at 32% 28%, #e8a7b5 0%, #C0516A 40%, #8a3a4d 72%, #5a1f2c 100%)",
          glow: "shadow-[0_18px_40px_-12px_rgba(192,81,106,0.55),inset_0_-6px_14px_rgba(0,0,0,0.35),inset_0_4px_10px_rgba(255,255,255,0.25)]",
          rim: "ring-[#f4d4dc]/60",
        };

  return (
    <div className="relative group [perspective:600px]">
      {/* outer glass ring */}
      <div
        className={`absolute inset-0 max-md:-m-1 -m-2 rounded-full bg-gradient-to-br ${palette.ring} blur-[2px] opacity-80 transition-all duration-500 group-hover:opacity-100 group-hover:-m-3 max-md:group-hover:-m-1.5`}
      />
      {/* orb face */}
      <div
        className={`relative h-24 w-24 md:h-28 md:w-28 rounded-full ring-2 ${palette.rim} ${palette.glow} transition-transform duration-500 will-change-transform group-hover:scale-105 group-hover:-translate-y-1`}
        style={{ background: palette.face }}
      >
        {/* glossy top highlight */}
        <span
          className="pointer-events-none absolute inset-x-3 top-2 h-1/3 rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 70%)",
          }}
        />
        {/* number */}
        <span className="absolute inset-0 grid place-items-center font-display text-3xl md:text-4xl font-medium text-white/95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
          {n}
        </span>
        {/* subtle slow rotating shimmer */}
        <span
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(255,255,255,0) 0deg, rgba(255,255,255,0.18) 60deg, rgba(255,255,255,0) 120deg)",
            animation: "spin 6s linear infinite",
          }}
        />
      </div>
    </div>
  );
}

function MobileStepList() {
  return (
    <ul className="flex flex-col gap-2 md:hidden">
      {steps.map((s) => (
        <li
          key={s.n}
          className="flex items-start gap-3 rounded-xl border border-border/80 bg-background/95 px-3 py-3 shadow-sm ring-1 ring-white/80"
        >
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold text-white ${
              s.tone === "teal" ? "bg-teal" : "bg-brand"
            }`}
          >
            {s.n}
          </span>
          <div className="min-w-0 pt-0.5">
            <h3 className="font-display text-[15px] font-bold leading-snug text-navy">{s.t}</h3>
            <p className="mt-0.5 text-[13px] leading-snug text-navy/70">{s.lead}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Chevrons({ delay = 0 }: { delay?: number }) {
  return (
    <div className="hidden md:flex items-center gap-1 text-brand/40 pt-10">
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          style={{
            animation: `chevPulse 1.8s ease-in-out ${delay + i * 0.18}s infinite`,
          }}
        >
          <polyline points="9 6 15 12 9 18" />
        </svg>
      ))}
    </div>
  );
}

function SafetyMedia() {
  return (
    <DrDeepaliAutoplayVideo
      src={JOURNEY_SAFETY_VIDEO}
      poster={JOURNEY_SAFETY_FALLBACK_IMAGE}
      alt="Dr. Deepali Shah supervising a live rehabilitation session"
      className="rounded-2xl"
      videoClassName="aspect-[16/10] h-full w-full object-[center_35%] sm:aspect-[4/3]"
    />
  );
}

export function Journey() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-background">
      <div className="relative py-5 sm:py-6">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <BackgroundBlob variant={2} cover opacity={0.12} className="object-[40%_45%]" />
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 0%, rgba(58,143,163,0.08), transparent 70%), radial-gradient(50% 40% at 50% 100%, rgba(192,81,106,0.07), transparent 70%)",
            }}
          />
        </div>

        <style>{`
          @keyframes chevPulse {
            0%, 100% { opacity: 0.25; transform: translateX(-2px); }
            50% { opacity: 1; transform: translateX(2px); }
          }
          @keyframes orbFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
        `}</style>

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-6 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[1fr_minmax(240px,320px)] lg:gap-12">
          <Reveal variant="fadeUp" className="text-center lg:text-left">
            <div className="flex items-center justify-center gap-3 lg:justify-start">
              <span className="hidden h-px w-10 bg-brand/40 sm:block" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand sm:text-[12px]">
                How It Works
              </span>
              <span className="hidden h-px w-10 bg-brand/40 sm:block" />
            </div>
            <h2 className="heading-display mt-4 text-[1.65rem] sm:mt-5 sm:text-4xl">
              How it works — <span className="italic text-brand">four simple steps</span>
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[var(--body-text)] sm:mt-4 lg:max-w-none">
              <span className="md:hidden">
                Four supervised steps from your first call to long-term recovery.
              </span>
              <span className="hidden md:inline">
                A calm, supervised path — four deliberate steps from first call to long-term capacity.
                Whether you are recovering after surgery or rebuilding strength in later life, every step
                is guided.
              </span>
            </p>
            <SectionPageLink href="/how-it-works" className="mt-4 justify-center sm:mt-5 lg:justify-start">
              See the full process
            </SectionPageLink>
          </Reveal>
          <SectionIllustration
            src={ILLUSTRATIONS.elderlyAmico}
            alt="Active elderly people enjoying wellness and rehabilitation"
            className="mx-auto hidden max-w-[280px] md:block sm:max-w-xs lg:max-w-none"
            variant="fadeLeft"
          />
        </div>

        <div className="relative z-10 mx-auto mt-4 max-w-6xl px-4 sm:mt-5 sm:px-6">
          <MobileStepList />

          <div className="hidden md:block absolute left-[8%] right-[8%] top-[calc(2.5rem+3.5rem)] h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />

          <StaggerReveal
            className="hidden grid-cols-1 gap-y-8 md:grid sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-start lg:gap-y-12"
            amount={0.15}
          >
            {steps.map((s, i) => (
              <Fragment key={s.n}>
                <StaggerItem className="flex flex-col items-center overflow-x-clip px-3 text-center sm:px-4">
                  <div
                    style={{
                      animation: `orbFloat 5s ease-in-out ${i * 0.4}s infinite`,
                    }}
                  >
                    <Orb n={s.n} tone={s.tone} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-navy md:mt-7 md:text-[22px]">
                    {s.t}
                  </h3>
                  <StepDetails {...s} />
                </StaggerItem>

                {i < steps.length - 1 && (
                  <StaggerItem variant="fadeIn" className="hidden lg:flex">
                    <Chevrons delay={i * 0.1} />
                  </StaggerItem>
                )}
              </Fragment>
            ))}
          </StaggerReveal>
        </div>
      </div>

      <div className="relative overflow-hidden py-4 sm:py-5">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img
            src={DR_DEEPALI_JOURNEY_BG}
            alt=""
            className="h-full w-full object-cover object-[42%_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/12 to-background/35" />
        </div>

        <Reveal variant="fadeUp" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-5 sm:gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="relative flex items-center pt-2 sm:pt-6">
              <div className="relative w-full">
                <div
                  aria-hidden
                  className="absolute -top-2 left-3 z-20 rounded-lg border border-white/80 bg-white px-2.5 py-1.5 shadow-[0_10px_28px_-14px_rgba(30,46,61,0.3)] sm:-top-4 sm:left-5 sm:rounded-xl sm:px-3.5 sm:py-2.5"
                >
                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-brand sm:text-[10px] sm:tracking-[0.14em]">
                    Every session
                  </p>
                  <p className="mt-0.5 font-display text-xs font-bold text-navy sm:text-sm">
                    Dr. Deepali on screen
                  </p>
                </div>

                <div className="relative w-full overflow-hidden rounded-2xl border-2 border-white/80 shadow-[0_28px_70px_-24px_rgba(30,46,61,0.45)] sm:rounded-[1.5rem]">
                  <SafetyMedia />

                  <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-wrap gap-1.5 bg-gradient-to-t from-navy/70 via-navy/35 to-transparent p-3 sm:gap-2 sm:p-5">
                    {[
                      { icon: Video, label: "Live guided" },
                      { icon: HeartPulse, label: "Vitals tracked" },
                      { icon: ShieldCheck, label: "Clinical rules" },
                    ].map(({ icon: Icon, label }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/15 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.12em]"
                      >
                        <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col justify-center rounded-2xl border border-white/50 bg-white/68 p-4 shadow-[0_20px_56px_-28px_rgba(30,46,61,0.28)] backdrop-blur-[6px] sm:rounded-[1.5rem] sm:p-6 lg:p-7">
              <div
                aria-hidden
                className="absolute -left-px top-5 bottom-5 w-1 rounded-full bg-gradient-to-b from-teal via-brand to-teal opacity-70 sm:top-6 sm:bottom-6"
              />
              <span className="pill w-fit">Safety First</span>
              <div className="mt-3 rounded-xl bg-white/88 px-3.5 py-3 ring-1 ring-white/90 sm:mt-4 sm:px-5 sm:py-4">
                <h3 className="heading-display text-xl font-semibold text-navy sm:text-[2rem]">
                  Is it safe to exercise with{" "}
                  <span className="font-display italic text-brand">my condition?</span>
                </h3>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-navy sm:mt-3 sm:text-base">
                  With live specialist supervision, structured movement becomes one of the safest
                  tools for recovery.
                </p>
              </div>

              <div className="mt-4 hidden rounded-2xl border border-white/70 bg-white/75 p-3.5 backdrop-blur-[4px] sm:block sm:p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  A common concern
                </p>
                <p className="mt-2 font-display text-base font-semibold leading-snug text-navy sm:text-lg">
                  &ldquo;Will exercising put my heart or lungs at risk?&rdquo;
                </p>
              </div>

              <ul className="mt-3 space-y-2 sm:mt-4 sm:space-y-2.5">
                {safetyPoints.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex items-start gap-2.5 rounded-lg bg-white/65 px-2.5 py-2 ring-1 ring-white/80 sm:gap-3 sm:rounded-xl sm:px-3 sm:py-2.5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white shadow-[0_4px_14px_-6px_rgba(192,81,106,0.3)] ring-1 ring-brand/15 sm:h-11 sm:w-11 sm:rounded-xl">
                      <Icon className="h-3.5 w-3.5 text-brand sm:h-5 sm:w-5" strokeWidth={2.25} />
                    </span>
                    <span className="pt-1 text-[13px] font-medium leading-snug text-navy sm:pt-2 sm:text-[15px] sm:leading-relaxed">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
