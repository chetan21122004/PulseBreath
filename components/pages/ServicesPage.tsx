'use client';

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Clock, ArrowRight, Sparkles } from "lucide-react";
import { PageSection } from "@/components/pages/PageSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { programCategories, type ProgramCategoryTone } from "@/components/pulse-landing/conditions-data";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/pulse-landing/motion";
import { categorySlug, getProgramHref } from "@/components/pulse-landing/ProgramCatalog";
import type { ProgramSlug } from "@/components/pulse-landing/constants";
import { cn } from "@/lib/utils";

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
  hidden: { opacity: 0, scale: 0.93, y: 16 },
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
      staggerChildren: 0.1,
      delayChildren: 0.06,
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

/* ─────────────────── floating blob ─────────────────── */

function FloatingBlob({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      aria-hidden
      initial={{ x: 0, y: 0 }}
      animate={
        reduceMotion
          ? {}
          : {
              x: [0, 30, -20, 10, 0],
              y: [0, -25, 15, -10, 0],
            }
      }
      transition={{
        duration: 22,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

/* ─────────────────── count-up component ─────────────────── */

function CountUp({
  value,
  suffix = "",
  duration = 1.4,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 6 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: EASE_SMOOTH }}
    >
      {isInView ? (
        <AnimatedNumber target={value} suffix={suffix} duration={duration} reduceMotion={!!reduceMotion} />
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
  const hasAnimated = useRef(false);

  if (typeof window !== "undefined" && !hasAnimated.current && !reduceMotion) {
    hasAnimated.current = true;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
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

/** Parse a stat value like "120+" into { number: 120, suffix: "+" } */
function parseStatValue(v: string): { number: number; suffix: string } {
  const match = v.match(/^(\d+)(.*)$/);
  if (match) {
    return { number: parseInt(match[1], 10), suffix: match[2] };
  }
  return { number: 0, suffix: v };
}

/* ─────────────────── tone styles ─────────────────── */

const toneStyles: Record<
  ProgramCategoryTone,
  { border: string; icon: string; badge: string; tab: string }
> = {
  rose: {
    border: "border-l-[var(--brand-pink)]",
    icon: "bg-[var(--primary-soft)] text-[var(--brand-pink)]",
    badge: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    tab: "data-[state=active]:bg-[var(--primary-soft)] data-[state=active]:text-[var(--brand-pink-deep)]",
  },
  teal: {
    border: "border-l-teal",
    icon: "bg-[var(--brand-teal-soft)] text-teal",
    badge: "bg-[var(--brand-teal-soft)] text-teal",
    tab: "data-[state=active]:bg-[var(--brand-teal-soft)] data-[state=active]:text-teal",
  },
  burgundy: {
    border: "border-l-[var(--brand-pink-deep)]",
    icon: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    badge: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    tab: "data-[state=active]:bg-[var(--primary-soft)] data-[state=active]:text-[var(--brand-pink-deep)]",
  },
};

/* ─────────────────── service card ─────────────────── */

function ServiceCard({
  program,
  index,
  tone,
  categorySlug: catSlug,
}: {
  program: (typeof programCategories)[number]["programs"][number];
  index: number;
  tone: ProgramCategoryTone;
  categorySlug: ProgramSlug;
}) {
  const Icon = program.i;
  const styles = toneStyles[tone];
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={cardScaleIn}
      whileHover={reduceMotion ? {} : hoverLift}
      className="h-full"
    >
      <Link
        href={getProgramHref(catSlug, program.slug)}
        className={cn(
          "group block h-full rounded-xl border border-border/80 border-l-4 bg-white/90 p-5 shadow-[0_12px_40px_-20px_rgba(30,46,61,0.18)] backdrop-blur-sm sm:p-6",
          styles.border,
        )}
      >
        <div className="flex items-start gap-4">
          <motion.div
            className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", styles.icon)}
            whileHover={reduceMotion ? {} : { scale: 1.1, transition: { duration: 0.25 } }}
          >
            <Icon className="h-5 w-5" strokeWidth={2.25} />
          </motion.div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em]", styles.badge)}>
                Specialist supervised
              </span>
            </div>
            <h3 className="mt-2 font-display text-lg font-bold leading-snug text-navy sm:text-xl">
              {program.t}
            </h3>
            <p className="mt-2 text-sm font-medium text-navy/80">
              <span className="text-muted-foreground">For: </span>
              {program.for}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-border/60 pt-5">
          <div className="flex items-center gap-2 text-sm font-medium text-navy/75">
            <Clock className="h-4 w-4 text-brand" strokeWidth={2.25} />
            {program.dur}
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-brand">
            View program <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─────────────────── main page ─────────────────── */

export function ServicesPage() {
  const reduceMotion = useReducedMotion();

  /* Compute totals for stats */
  const totalPrograms = programCategories.reduce((acc, cat) => acc + cat.programs.length, 0);

  return (
    <>
      {/* ── Hero ────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/60 bg-background pt-10 pb-14 lg:pt-14 lg:pb-20">
        {/* Animated background blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <FloatingBlob
            className="absolute -left-28 -top-16 h-[400px] w-[400px] rounded-full bg-[var(--brand-teal)]/[0.06] blur-[80px]"
            delay={0}
          />
          <FloatingBlob
            className="absolute -right-20 top-1/4 h-[350px] w-[350px] rounded-full bg-[var(--brand-pink)]/[0.05] blur-[90px]"
            delay={4}
          />
          <FloatingBlob
            className="absolute bottom-0 left-1/3 h-[280px] w-[280px] rounded-full bg-[var(--brand-gold)]/[0.04] blur-[70px]"
            delay={8}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.1 }}
          >
            <motion.span
              className="pill inline-flex items-center gap-2"
              initial={reduceMotion ? {} : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE_SMOOTH, delay: 0.15 }}
            >
              <Sparkles className="h-3 w-3" strokeWidth={2} />
              Services
            </motion.span>
            <h1 className="heading-display mt-5 max-w-4xl text-[2rem] sm:text-4xl lg:text-[2.75rem]">
              Complete Service <span className="font-display italic text-brand">Catalogue</span>
            </h1>
            <motion.p
              className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--body-text)] sm:text-lg"
              initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_SMOOTH, delay: 0.3 }}
            >
              Specialist rehabilitation pathways for heart, lung, and metabolic health — supervised throughout.
            </motion.p>
          </motion.div>

          {/* Hero stats strip */}
          <motion.div
            className="mt-8 flex flex-wrap items-center gap-8 sm:gap-12"
            initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_SMOOTH, delay: 0.45 }}
          >
            {[
              { num: programCategories.length, suffix: "", label: "Specialisations" },
              { num: totalPrograms, suffix: "+", label: "Programs" },
              { num: 100, suffix: "%", label: "Supervised" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="font-display text-2xl font-bold text-brand sm:text-3xl">
                  <CountUp value={stat.num} suffix={stat.suffix} />
                </span>
                <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Services Catalog ────────────────────── */}
      <PageSection variant="section" className="relative overflow-hidden">
        {/* Animated floating blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <FloatingBlob
            className="absolute -left-20 top-[15%] h-[320px] w-[320px] rounded-full bg-[var(--brand-pink)]/[0.04] blur-[80px]"
            delay={2}
          />
          <FloatingBlob
            className="absolute -right-16 top-[60%] h-[300px] w-[300px] rounded-full bg-[var(--brand-teal)]/[0.05] blur-[75px]"
            delay={6}
          />
          <FloatingBlob
            className="absolute bottom-[10%] left-1/2 h-[240px] w-[240px] -translate-x-1/2 rounded-full bg-[var(--brand-gold)]/[0.03] blur-[65px]"
            delay={10}
          />
        </div>

        <div className="relative z-[1]">
          <Tabs defaultValue="Cardiac" className="w-full">
            {/* Tabs bar with fade-up */}
            <motion.div
              variants={sectionFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <TabsList className="mb-10 flex h-auto w-full flex-wrap justify-start gap-2 rounded-2xl border border-border/80 bg-background p-2">
                {programCategories.map((cat) => (
                  <TabsTrigger
                    key={cat.cat}
                    value={cat.cat}
                    className={cn(
                      "rounded-xl px-5 py-2.5 text-sm font-bold uppercase tracking-[0.08em] transition-all duration-300",
                      toneStyles[cat.tone].tab,
                    )}
                  >
                    {cat.cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            {programCategories.map((category) => {
              const CatIcon = category.icon;
              const styles = toneStyles[category.tone];
              const parsedStat = parseStatValue(category.stat.v);

              return (
                <TabsContent key={category.cat} value={category.cat}>
                  {/* Category header card */}
                  <motion.div
                    variants={sectionFadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.15 }}
                    whileHover={reduceMotion ? {} : hoverLiftSubtle}
                    className={cn("motion-card rounded-2xl border border-border/80 p-6 sm:p-8", styles.border, "border-l-4")}
                  >
                    <div className="flex flex-wrap items-start gap-4">
                      <motion.div
                        className={cn("flex h-12 w-12 items-center justify-center rounded-xl", styles.icon)}
                        whileHover={reduceMotion ? {} : { scale: 1.08, rotate: 3, transition: { duration: 0.3 } }}
                      >
                        <CatIcon className="h-6 w-6" strokeWidth={2.25} />
                      </motion.div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                          {category.tag}
                        </span>
                        <h2 className="mt-1 font-display text-2xl font-bold text-navy sm:text-3xl">
                          {category.cat} Programs
                        </h2>
                        <p className="mt-3 max-w-2xl text-[var(--body-text)]">{category.desc}</p>
                        <p className="mt-3 text-sm font-bold text-brand">
                          <CountUp value={parsedStat.number} suffix={parsedStat.suffix} />{" "}
                          {category.stat.l}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Program cards with staggered scale-in */}
                  <motion.div
                    className="mt-8 grid gap-6 lg:grid-cols-2"
                    variants={staggerContainerCards}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.08 }}
                  >
                    {category.programs.map((program, index) => (
                      <ServiceCard
                        key={program.t}
                        program={program}
                        index={index}
                        tone={category.tone}
                        categorySlug={categorySlug(category.cat)}
                      />
                    ))}
                  </motion.div>
                </TabsContent>
              );
            })}
          </Tabs>

          {/* CTA block */}
          <motion.div
            variants={sectionFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-background/80 p-6 text-center sm:p-8">
              {/* Decorative gradient accents */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-[var(--brand-teal)]/[0.06] blur-[50px]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-[var(--brand-pink)]/[0.05] blur-[50px]"
              />

              <div className="relative z-[1]">
                <p className="text-[var(--body-text)]">
                  Unsure which service applies to you? Dr. Deepali will guide you during your free
                  assessment — no obligation to enrol.
                </p>
                <motion.div
                  className="mt-5 inline-block"
                  whileHover={reduceMotion ? {} : { scale: 1.03, transition: { duration: 0.25 } }}
                  whileTap={reduceMotion ? {} : { scale: 0.97 }}
                >
                  <Link
                    href="/contact"
                    className="btn-primary motion-btn inline-flex items-center gap-2"
                  >
                    Book free assessment <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </PageSection>
    </>
  );
}
