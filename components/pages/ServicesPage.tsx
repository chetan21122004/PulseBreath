'use client';

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Clock, ArrowRight, HeartPulse, Wind, Droplet } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { programCategories, type ProgramCategoryTone } from "@/components/pulse-landing/conditions-data";
import { categoryProgramsHeading, ProgramPreview } from "@/components/pulse-landing/ProgramPreview";
import { categorySlug, getProgramHref } from "@/components/pulse-landing/ProgramCatalog";
import type { ProgramSlug } from "@/components/pulse-landing/constants";
import { ILLUSTRATIONS } from "@/components/pulse-landing/visual-assets";
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
  { border: string; icon: string; badge: string; chip: string }
> = {
  rose: {
    border: "border-l-[var(--brand-pink)]",
    icon: "bg-[var(--primary-soft)] text-[var(--brand-pink)]",
    badge: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    chip: "border-brand/20 bg-[var(--primary-soft)]/50 text-[var(--brand-pink-deep)] hover:bg-[var(--primary-soft)]",
  },
  teal: {
    border: "border-l-teal",
    icon: "bg-[var(--brand-teal-soft)] text-teal",
    badge: "bg-[var(--brand-teal-soft)] text-teal",
    chip: "border-teal/20 bg-[var(--brand-teal-soft)]/50 text-teal hover:bg-[var(--brand-teal-soft)]",
  },
  burgundy: {
    border: "border-l-[var(--brand-pink-deep)]",
    icon: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    badge: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    chip: "border-[var(--brand-pink-deep)]/20 bg-[var(--primary-soft)]/50 text-[var(--brand-pink-deep)] hover:bg-[var(--primary-soft)]",
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
    <motion.div variants={cardScaleIn} whileHover={reduceMotion ? {} : hoverLift} className="h-full">
      <Link
        href={getProgramHref(catSlug, program.slug)}
        className={cn(
          "group block h-full rounded-xl border border-border/80 border-l-4 bg-white/90 p-3.5 shadow-[0_8px_28px_-18px_rgba(30,46,61,0.16)] backdrop-blur-sm active:scale-[0.99] lg:p-6 lg:shadow-[0_12px_40px_-20px_rgba(30,46,61,0.18)] lg:active:scale-100",
          styles.border,
        )}
      >
        <div className="flex items-center gap-3 lg:items-start lg:gap-4">
          <motion.div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-xl",
              "h-10 w-10 lg:h-11 lg:w-11",
              styles.icon,
            )}
            whileHover={reduceMotion ? {} : { scale: 1.1, transition: { duration: 0.25 } }}
          >
            <Icon className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={2.25} />
          </motion.div>

          <div className="min-w-0 flex-1">
            <div className="hidden flex-wrap items-center gap-2 lg:flex">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em]",
                  styles.badge,
                )}
              >
                Specialist supervised
              </span>
            </div>
            <h3 className="font-display text-[15px] font-bold leading-snug text-navy lg:mt-2 lg:text-xl">
              {program.t}
            </h3>
            <p className="mt-0.5 line-clamp-1 text-[12px] leading-snug text-navy/60 lg:hidden">
              {program.for}
            </p>
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-navy/55 lg:hidden">
              <Clock className="h-3.5 w-3.5 text-brand" strokeWidth={2.25} />
              {program.dur}
            </div>
            <ProgramPreview program={program} className="mt-2 hidden lg:block" />
          </div>

          <ArrowRight
            className="h-4 w-4 shrink-0 text-brand/70 transition-transform group-hover:translate-x-0.5 lg:hidden"
            strokeWidth={2.25}
          />
        </div>

        <div className="mt-5 hidden items-center justify-between gap-4 border-t border-border/60 pt-5 lg:flex">
          <div className="flex items-center gap-2 text-sm font-medium text-navy/75">
            <Clock className="h-4 w-4 text-brand" strokeWidth={2.25} />
            {program.dur}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-brand">
            View program{" "}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function CategorySection({
  category,
}: {
  category: (typeof programCategories)[number];
}) {
  const CatIcon = category.icon;
  const styles = toneStyles[category.tone];
  const parsedStat = parseStatValue(category.stat.v);
  const reduceMotion = useReducedMotion();
  const slug = categorySlug(category.cat);

  return (
    <>
      <motion.div
        variants={sectionFadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        whileHover={reduceMotion ? {} : hoverLiftSubtle}
        className={cn(
          "motion-card rounded-xl border border-border/80 border-l-4 p-4 sm:p-6 lg:rounded-2xl lg:p-8",
          styles.border,
        )}
      >
        <div className="flex items-start gap-3 lg:gap-4">
          <motion.div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-xl",
              "h-10 w-10 lg:h-12 lg:w-12",
              styles.icon,
            )}
            whileHover={reduceMotion ? {} : { scale: 1.08, rotate: 3, transition: { duration: 0.3 } }}
          >
            <CatIcon className="h-5 w-5 lg:h-6 lg:w-6" strokeWidth={2.25} />
          </motion.div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {category.tag}
              </span>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold lg:hidden",
                  styles.badge,
                )}
              >
                {category.programs.length} programs
              </span>
            </div>
            <h2 className="mt-0.5 font-display text-lg font-bold leading-snug text-navy sm:text-2xl lg:mt-1 lg:text-3xl">
              {categoryProgramsHeading(category.cat, category.tag)}
            </h2>
            <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-[var(--body-text)] lg:mt-3 lg:line-clamp-none lg:max-w-2xl lg:text-base">
              {category.desc}
            </p>
            <p className="mt-2 text-[12px] font-bold text-brand lg:mt-3 lg:text-sm">
              <CountUp value={parsedStat.number} suffix={parsedStat.suffix} /> {category.stat.l}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.ul
        className="mt-4 grid list-none gap-2.5 lg:mt-8 lg:gap-6 md:grid-cols-2 xl:grid-cols-3"
        variants={staggerContainerCards}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
      >
        {category.programs.map((program, index) => (
          <li key={program.t}>
            <ServiceCard
              program={program}
              index={index}
              tone={category.tone}
              categorySlug={slug}
            />
          </li>
        ))}
      </motion.ul>
    </>
  );
}

function ServicesCatalogNav() {
  return (
    <motion.nav
      variants={sectionFadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      aria-label="Jump to service category"
      className={cn(
        "z-20 mb-6 lg:mb-10",
        "sticky top-[var(--header-height)] -mx-4 border-b border-border/50 bg-[color-mix(in_oklch,var(--section-grey)_55%,white)]/95 px-4 py-2.5 backdrop-blur-md",
        "lg:static lg:mx-0 lg:rounded-2xl lg:border lg:border-border/80 lg:bg-background/90 lg:px-0 lg:py-0 lg:backdrop-blur-md",
      )}
    >
      <div className="flex gap-2 overflow-x-auto [-webkit-overflow-scrolling:touch] [scrollbar-width:none] lg:flex-wrap lg:overflow-visible lg:p-2 [&::-webkit-scrollbar]:hidden">
        {programCategories.map((category) => {
          const Icon = category.icon;
          const slug = categorySlug(category.cat);
          const styles = toneStyles[category.tone];

          return (
            <a
              key={category.cat}
              href={`#services-${slug}`}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 font-sans-brand text-[11px] font-bold uppercase tracking-[0.08em] transition-colors active:scale-[0.98] lg:min-h-10 lg:rounded-xl lg:px-4 lg:text-xs",
                styles.chip,
              )}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              {category.cat}
              <span className="rounded-full bg-white/70 px-1.5 py-px text-[10px] font-bold opacity-70">
                {category.programs.length}
              </span>
            </a>
          );
        })}
      </div>
    </motion.nav>
  );
}

function ServicesCatalog() {
  return (
    <div>
      <ServicesCatalogNav />
      <div className="space-y-10 sm:space-y-14 lg:space-y-20">
        {programCategories.map((category, index) => {
          const slug = categorySlug(category.cat);
          const isLast = index === programCategories.length - 1;

          return (
            <section
              key={category.cat}
              id={`services-${slug}`}
              className={cn(
                "scroll-mt-[calc(var(--header-height)+3.75rem)] lg:scroll-mt-[calc(var(--header-height)+5rem)]",
                !isLast && "border-b border-border/50 pb-10 sm:pb-14 lg:border-border/60 lg:pb-20",
              )}
            >
              <CategorySection category={category} />
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────── hero illustration ─────────────────── */

const heroCategoryChips = [
  { icon: HeartPulse, label: "Cardiovascular", tone: "text-[var(--brand-pink-deep)] bg-[var(--primary-soft)]" },
  { icon: Wind, label: "Pulmonary", tone: "text-[var(--brand-teal-deep)] bg-[var(--brand-teal-soft)]" },
  { icon: Droplet, label: "Metabolic", tone: "text-[var(--brand-pink-deep)] bg-[var(--primary-soft)]" },
] as const;

function ServicesHeroAside() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 m-auto h-[85%] w-[90%] rounded-[1.75rem] bg-soft/80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-2 top-[6%] h-28 w-28 rounded-full bg-[var(--brand-teal)]/14 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-3 bottom-[8%] h-24 w-24 rounded-full bg-[var(--brand-pink)]/12 blur-3xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/75 bg-white/60 p-5 shadow-[0_28px_70px_-32px_rgba(30,46,61,0.28)] backdrop-blur-sm sm:p-6">
        <img
          src={ILLUSTRATIONS.cardiologistRafiki}
          alt="Specialist guiding personalised rehabilitation services"
          className="mx-auto max-h-[min(32vh,260px)] w-full object-contain xl:max-h-[280px]"
        />
        <p className="mt-3 text-center font-sans-brand text-[12px] font-medium leading-snug text-navy/65">
          Heart, lung & metabolic pathways - all supervised live by Dr. Deepali.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {heroCategoryChips.map(({ icon: Icon, label, tone }) => (
            <span
              key={label}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ring-1 ring-black/[0.04]",
                tone,
              )}
            >
              <Icon className="h-3 w-3" strokeWidth={2} aria-hidden />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── main page ─────────────────── */

export function ServicesPage() {
  const reduceMotion = useReducedMotion();

  /* Compute totals for stats */
  const totalPrograms = programCategories.reduce((acc, cat) => acc + cat.programs.length, 0);

  return (
    <>
      <PageHero
        pill={
          <span className="inline-flex items-center gap-2">
            Services
          </span>
        }
        title={
          <>
            Complete Service <span className="font-display italic text-brand">Catalogue</span>
          </>
        }
        description="Specialist rehabilitation pathways for heart, lung, and metabolic health - supervised throughout. Start with a free assessment with Dr. Deepali."
        aside={<ServicesHeroAside />}
      >
        <div className="mt-6 grid grid-cols-3 gap-3 sm:mt-10 sm:flex sm:flex-wrap sm:items-center sm:gap-8 lg:gap-12">
          {[
            { num: programCategories.length, suffix: "", label: "Specialisations" },
            { num: totalPrograms, suffix: "+", label: "Programs" },
            { num: 100, suffix: "%", label: "Supervised" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col rounded-xl border border-border/60 bg-white/60 px-3 py-2.5 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0"
            >
              <span className="font-display text-xl font-bold text-brand sm:text-2xl lg:text-3xl">
                <CountUp value={stat.num} suffix={stat.suffix} />
              </span>
              <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.1em] text-muted-foreground sm:text-[10px] sm:tracking-[0.12em]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </PageHero>

      {/* ── Services Catalog ────────────────────── */}
      <PageSection variant="section" className="overflow-visible py-6 sm:py-12 lg:py-20">
        <div className="w-full">
          <ServicesCatalog />

          {/* CTA block */}
          <motion.div
            variants={sectionFadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8 sm:mt-12"
          >
            <div className="relative overflow-hidden rounded-xl border border-border/70 bg-background/80 p-5 text-center sm:rounded-2xl sm:p-8">
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
                  assessment - no obligation to enrol.
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
