'use client';

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Award, BadgeCheck, Sparkles } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import {
  DOCTOR_CREDENTIALS,
  DOCTOR_HIGHLIGHTS,
  DOCTOR_OVERVIEW,
} from "@/components/pulse-landing/doctor-content";
import {
  DR_DEEPALI_ABOUT_PORTRAIT,
  DR_DEEPALI_FEATURED_VIDEO,
  DR_DEEPALI_GALLERY_PHOTOS,
  DR_DEEPALI_PORTRAIT,
} from "@/components/pulse-landing/dr-deepali-assets";
import { DrDeepaliGallery } from "@/components/pulse-landing/DrDeepaliGallery";
import { DrDeepaliVideo } from "@/components/pulse-landing/DrDeepaliVideo";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/pulse-landing/motion";

const teamDoctorFallback = "/assets/team-doctor.jpg";

/* ─────────────────── animation presets ─────────────────── */

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

const sectionFadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_SMOOTH },
  },
};

const cardScaleIn = {
  hidden: { opacity: 0, scale: 0.92, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_SMOOTH },
  },
};

const staggerContainerCards = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const hoverLift = {
  y: -6,
  boxShadow: "0 18px 50px -16px rgba(30,46,61,0.28)",
  transition: { duration: 0.35, ease: EASE_SMOOTH },
};

const hoverLiftSubtle = {
  y: -3,
  transition: { duration: 0.3, ease: EASE_SMOOTH },
};

/* ─────────────────── counter component ─────────────────── */

function CountUp({
  target,
  suffix = "",
  duration = 1.6,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE_SMOOTH }}
    >
      {isInView ? (
        <AnimatedNumber target={target} suffix={suffix} duration={duration} reduceMotion={!!reduceMotion} />
      ) : (
        `0${suffix}`
      )}
    </motion.span>
  );
}

function AnimatedNumber({
  target,
  suffix,
  duration,
  reduceMotion,
}: {
  target: number;
  suffix: string;
  duration: number;
  reduceMotion: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  // Use a simple approach: animate with useRef + requestAnimationFrame
  const hasAnimated = useRef(false);

  if (typeof window !== "undefined" && !hasAnimated.current && !reduceMotion) {
    hasAnimated.current = true;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easedProgress * target);
      if (ref.current) {
        ref.current.textContent = `${current}${suffix}`;
      }
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }

  return <span ref={ref}>{reduceMotion ? `${target}${suffix}` : `0${suffix}`}</span>;
}

/* ─────────────────── main page ─────────────────── */

export function AboutPage() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <PageHero
        pill="About Dr. Deepali"
        title={
          <>
            The specialist behind{" "}
            <span className="font-display italic text-brand">PulseBreath.</span>
          </>
        }
        description="Expert care, compassionate touch - supervised cardiopulmonary rehabilitation across India."
      />

      {/* ── Doctor Profile ──────────────────────── */}
      <PageSection variant="section">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          <Reveal variant="fadeRight" className="lg:col-span-5">
            <motion.div
              className="relative mx-auto max-w-[min(100%,320px)] lg:mx-0 lg:max-w-none"
              whileHover={reduceMotion ? {} : hoverLiftSubtle}
            >
              <div
                className="pointer-events-none absolute inset-[-6px] rounded-[calc(1.25rem+6px)] bg-gradient-to-br from-white via-[var(--brand-teal)]/12 to-[var(--brand-pink)]/10 p-[1.5px] sm:inset-[-8px] sm:rounded-[calc(1.5rem+8px)]"
                aria-hidden
              >
                <div className="h-full w-full rounded-[calc(1.25rem+6px-1.5px)] bg-background/80 sm:rounded-[calc(1.5rem+8px-1.5px)]" />
              </div>
              <div
                className="pointer-events-none absolute -right-1 top-[10%] z-0 h-24 w-24 rounded-full bg-[var(--brand-pink)]/10 blur-2xl motion-reduce:hidden sm:h-28 sm:w-28"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -left-2 bottom-[18%] z-0 h-28 w-28 rounded-full bg-[var(--brand-teal)]/12 blur-2xl motion-reduce:hidden"
                aria-hidden
              />

              <div className="relative z-[1] overflow-hidden rounded-2xl shadow-[0_28px_70px_-24px_rgba(30,46,61,0.28)] ring-1 ring-border/80">
                <div
                  className="relative h-0.5 w-full bg-gradient-to-r from-[var(--brand-teal)] from-[-5%] via-[var(--brand-pink)] to-[var(--brand-teal-soft)] to-[105%]"
                  aria-hidden
                />

                <div className="flex items-center justify-between gap-3 border-b border-border/70 bg-white/90 px-4 py-3 backdrop-blur-sm sm:px-5">
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-soft)] ring-1 ring-brand/15"
                    aria-hidden
                  >
                    <BadgeCheck className="h-4 w-4 text-brand" strokeWidth={2.25} />
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--brand-gold)]/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--brand-dark)] ring-1 ring-[var(--brand-gold)]/35 sm:px-3 sm:text-[10px]">
                    <Award className="h-3 w-3 text-[var(--brand-gold)]" strokeWidth={2.25} />
                    Gold Medalist
                  </span>
                </div>

                <div className="relative overflow-hidden bg-[var(--brand-deeper)]/5">
                  <img
                    src={DR_DEEPALI_ABOUT_PORTRAIT}
                    alt="Dr. Deepali Shah (PT) - Founder, PulseBreath Physiotherapy"
                    width={800}
                    height={900}
                    className="aspect-[3/4] w-full bg-white object-contain object-center"
                    onError={(e) => {
                      e.currentTarget.src = teamDoctorFallback;
                    }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--brand-deeper)]/55 via-[var(--brand-deeper)]/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--brand-deeper)]/92 via-[var(--brand-deeper)]/72 to-transparent px-4 pb-4 pt-14 sm:px-5 sm:pb-5 sm:pt-16">
                    <div className="border-t border-white/15 pt-3">
                      <p className="font-display text-lg font-bold leading-tight text-white sm:text-xl">
                        Dr. Deepali Shah{" "}
                        <span className="font-normal italic text-white/80">(PT)</span>
                      </p>
                      <p className="mt-1 font-sans text-[9px] font-bold uppercase leading-snug tracking-[0.14em] text-[var(--brand-teal-soft)] sm:text-[10px] sm:tracking-[0.16em]">
                        Founder · Cardiopulmonary Specialist
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>

          <StaggerReveal className="lg:col-span-7" itemVariant="fadeUp">
            <StaggerItem>
              <p className="font-display text-[clamp(1.2rem,2.2vw,1.55rem)] font-medium italic leading-snug text-navy">
                Expert care,{" "}
                <span className="italic text-brand">compassionate</span> touch.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-b border-border pb-5">
                <span className="font-display text-xl italic text-brand sm:text-2xl">BPT · MPT</span>
                <span className="text-sm font-medium text-navy/85">Cardiopulmonary Sciences</span>
                <span className="w-full font-sans text-xs font-medium text-muted-foreground sm:ml-auto sm:w-auto">
                  MP Paramedical Reg No. 54685/2023
                </span>
              </div>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.85] text-[var(--body-text)] sm:text-[16px]">
                {DOCTOR_OVERVIEW}
              </p>
            </StaggerItem>

            <StaggerItem>
              <ul className="mt-6 space-y-2.5">
                {DOCTOR_HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                      aria-hidden
                    />
                    <span className="text-sm font-medium leading-relaxed text-navy sm:text-[15px]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
                variants={staggerContainerCards}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {DOCTOR_CREDENTIALS.map(({ icon: Icon, t, d }, index) => (
                  <motion.div
                    key={t}
                    variants={cardScaleIn}
                    whileHover={reduceMotion ? {} : hoverLift}
                    className="motion-card flex flex-col rounded-xl border border-border/80 bg-white/90 p-4 shadow-[0_12px_40px_-20px_rgba(30,46,61,0.2)] ring-1 ring-white/80 backdrop-blur-sm cursor-default"
                  >
                    <motion.div
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-soft)] ring-1 ring-brand/15"
                      whileHover={reduceMotion ? {} : { scale: 1.08, transition: { duration: 0.25 } }}
                    >
                      <Icon className="h-4 w-4 text-brand" strokeWidth={2.25} />
                    </motion.div>
                    <p className="mt-3 font-display text-base font-bold leading-snug text-navy">{t}</p>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">{d}</p>
                  </motion.div>
                ))}
              </motion.div>
            </StaggerItem>
          </StaggerReveal>
        </div>
      </PageSection>

      {/* ── Dr. Deepali in Action (Enhanced) ──── */}
      <PageSection variant="background">
        <motion.div
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center"
        >
          <motion.span
            className="section-label inline-flex items-center gap-2"
            initial={reduceMotion ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE_SMOOTH }}
          >
            <Sparkles className="h-3.5 w-3.5 text-brand" strokeWidth={2} />
            In practice
          </motion.span>

          <h2 className="heading-display mt-4 text-3xl sm:text-4xl">
            Dr. Deepali <span className="italic text-brand">in action</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[var(--body-text)]">
            Supervised rehabilitation sessions - live guidance, real patients, clinical rigour.
          </p>

          <motion.div
            className="mx-auto mt-6 h-[2px] w-16 rounded-full bg-gradient-to-r from-[var(--brand-teal)] to-[var(--brand-pink)]"
            initial={reduceMotion ? {} : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.3 }}
          />
        </motion.div>

        <motion.div
          className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-6 sm:gap-10"
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {[
            { num: 500, suffix: "+", label: "Patients Treated" },
            { num: 8, suffix: "+", label: "Years Experience" },
            { num: 100, suffix: "%", label: "Supervised Sessions" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span className="font-display text-2xl font-bold text-brand sm:text-3xl">
                <CountUp target={stat.num} suffix={stat.suffix} />
              </span>
              <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            variants={sectionFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            whileHover={reduceMotion ? {} : hoverLiftSubtle}
            className="group relative"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 z-0 rounded-3xl bg-gradient-to-br from-[var(--brand-teal)]/8 to-[var(--brand-pink)]/6 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
            />
            <div className="relative z-[1]">
              <DrDeepaliVideo
                src={DR_DEEPALI_FEATURED_VIDEO}
                poster={DR_DEEPALI_PORTRAIT}
                preload="metadata"
                maxDurationSeconds={6}
                caption="Live supervised session with Dr. Deepali Shah"
                className="border border-border/80 shadow-[0_28px_70px_-24px_rgba(30,46,61,0.28)]"
              />
            </div>
          </motion.div>

          <motion.div
            variants={sectionFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.15 }}
          >
            <DrDeepaliGallery photos={DR_DEEPALI_GALLERY_PHOTOS} />
          </motion.div>
        </div>

        <motion.div
          className="mt-12 flex items-center justify-center"
          variants={sectionFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <blockquote className="relative max-w-xl text-center">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-4 -top-2 font-display text-5xl leading-none text-brand/15 select-none"
            >
              &ldquo;
            </div>
            <p className="font-display text-[clamp(1rem,2vw,1.2rem)] italic leading-relaxed text-navy/90">
              Healing is not only about lung function, heart rate, or stamina. It is also about
              feeling heard, supported, and capable again.
            </p>
            <footer className="mt-3 text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">
              - Dr. Deepali Shah
            </footer>
          </blockquote>
        </motion.div>
      </PageSection>
    </>
  );
}
