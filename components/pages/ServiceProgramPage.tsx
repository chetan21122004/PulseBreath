'use client';

import { useState, type ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  ChevronDown,
  ClipboardList,
  HeartPulse,
  ListChecks,
  MessageCircleQuestion,
  Quote,
  Repeat,
  Shield,
  Sparkles,
  Star,
  Stethoscope,
  Video,
} from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { WHATSAPP, PROGRAM_ROUTES, PHONE, type ProgramSlug } from "@/components/pulse-landing/constants";
import {
  buildProgramFaqs,
  programDurationParts,
  type ProgramCategoryTone,
} from "@/components/pulse-landing/conditions-data";
import { getProgramBySlugs, getProgramHref } from "@/components/pulse-landing/ProgramCatalog";
import { categoryProgramsHeading } from "@/components/pulse-landing/ProgramPreview";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/pulse-landing/motion";
import { DR_DEEPALI_PORTRAIT_PRIMARY } from "@/components/pulse-landing/dr-deepali-assets";
import { cn } from "@/lib/utils";

type ToneUi = {
  accent: string;
  accentDark: string;
  iconTile: string;
  badge: string;
  border: string;
  borderFull: string;
  ring: string;
  softBg: string;
  gradientFrom: string;
};

const toneStyles: Record<ProgramCategoryTone, ToneUi> = {
  rose: {
    accent: "text-[var(--brand-pink)]",
    accentDark: "text-[var(--brand-pink-deep)]",
    iconTile: "bg-[var(--primary-soft)] text-[var(--brand-pink)]",
    badge: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    border: "border-l-[var(--brand-pink)]",
    borderFull: "border-[var(--brand-pink)]",
    ring: "ring-[color-mix(in_oklch,var(--brand-pink)_18%,var(--border))]",
    softBg: "bg-[color-mix(in_oklch,white_74%,var(--primary-soft))]",
    gradientFrom: "from-[color-mix(in_oklch,white_92%,var(--primary-soft))]",
  },
  teal: {
    accent: "text-teal",
    accentDark: "text-[var(--brand-teal-deep)]",
    iconTile: "bg-[var(--brand-teal-soft)] text-teal",
    badge: "bg-[var(--brand-teal-soft)] text-teal",
    border: "border-l-[var(--brand-teal)]",
    borderFull: "border-[var(--brand-teal)]",
    ring: "ring-[color-mix(in_oklch,var(--brand-teal)_22%,var(--border))]",
    softBg: "bg-[color-mix(in_oklch,white_80%,var(--brand-teal-soft))]",
    gradientFrom: "from-[color-mix(in_oklch,white_92%,var(--brand-teal-soft))]",
  },
  burgundy: {
    accent: "text-[var(--brand-pink-deep)]",
    accentDark: "text-[var(--brand-pink-deep)]",
    iconTile: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    badge: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    border: "border-l-[var(--brand-pink-deep)]",
    borderFull: "border-[var(--brand-pink-deep)]",
    ring: "ring-[color-mix(in_oklch,var(--brand-pink-deep)_16%,var(--border))]",
    softBg: "bg-[color-mix(in_oklch,white_88%,var(--section-grey))]",
    gradientFrom: "from-[color-mix(in_oklch,white_94%,var(--section-grey))]",
  },
};

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>;

/* ─── Section header ───────────────────────────────────────────────────── */

function SectionHead({
  icon: Icon,
  label,
  title,
  tone,
  id,
}: {
  icon: IconType;
  label: string;
  title: string;
  tone: ToneUi;
  id?: string;
}) {
  return (
    <div id={id} className="scroll-mt-28 flex items-center gap-3 pb-5">
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          tone.iconTile,
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p
          className={cn(
            "font-sans-brand text-[11px] font-bold uppercase tracking-[0.16em]",
            tone.accent,
          )}
        >
          {label}
        </p>
        <h2 className="font-display text-xl font-bold leading-tight text-navy sm:text-2xl">
          {title}
        </h2>
      </div>
    </div>
  );
}

/* ─── Hero stats panel (desktop aside) ─────────────────────────────────── */

function HeroStatTile({
  icon: Icon,
  value,
  label,
  tone,
}: {
  icon: IconType;
  value: string;
  label: string;
  tone: ToneUi;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border/60 bg-white/80 p-4">
      <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", tone.iconTile)}>
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <div>
        <p className="font-display text-base font-bold leading-snug text-navy">{value}</p>
        <p className="text-[11px] font-medium text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function HeroStatsPanel({
  durLength,
  durFrequency,
  tone,
}: {
  durLength: string;
  durFrequency: string;
  tone: ToneUi;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border/70 p-5 shadow-[0_20px_56px_-24px_rgba(30,46,61,0.22)] ring-1",
        tone.ring,
        tone.softBg,
      )}
    >
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        Programme at a glance
      </p>
      <div className="grid grid-cols-2 gap-2.5">
        <HeroStatTile icon={Calendar} value={durLength} label="Duration" tone={tone} />
        {durFrequency ? (
          <HeroStatTile icon={Repeat} value={durFrequency} label="Frequency" tone={tone} />
        ) : null}
        <HeroStatTile icon={Video} value="Live online" label="Tele-rehab" tone={tone} />
        <HeroStatTile icon={HeartPulse} value="Every session" label="Supervised" tone={tone} />
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/70 p-3">
        <Star className={cn("h-4 w-4 shrink-0", tone.accent)} strokeWidth={2} />
        <p className="text-[12px] leading-snug text-navy/75">
          Supervised by a Gold Medalist cardiopulmonary specialist
        </p>
      </div>
    </div>
  );
}

/* ─── First session as numbered timeline ────────────────────────────────── */

function SessionTimeline({
  firstSession,
  tone,
}: {
  firstSession: string;
  tone: ToneUi;
}) {
  const steps = firstSession
    .split(/;\s*/)
    .map((s) => s.trim().replace(/\.$/, ""))
    .filter(Boolean);

  return (
    <ol className="space-y-0">
      {steps.map((step, i) => (
        <li key={step} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold tabular-nums",
                tone.iconTile,
              )}
            >
              {i + 1}
            </span>
            {i < steps.length - 1 ? (
              <span className="mt-1.5 h-6 w-px bg-border/70" />
            ) : null}
          </div>
          <p
            className={cn(
              "text-[15px] leading-relaxed text-navy/85",
              i < steps.length - 1 ? "pb-5 pt-1" : "pt-1",
            )}
          >
            {step}
          </p>
        </li>
      ))}
    </ol>
  );
}

/* ─── FAQ accordion ─────────────────────────────────────────────────────── */

function FaqAccordion({
  faqs,
  tone,
}: {
  faqs: { q: string; a: string }[];
  tone: ToneUi;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/80 bg-white/85">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-[color-mix(in_oklch,var(--section-grey)_40%,white)]"
            >
              <span className="font-sans-brand text-[14px] font-semibold leading-snug text-navy sm:text-[15px]">
                {faq.q}
              </span>
              <ChevronDown
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0 transition-transform duration-200",
                  tone.accent,
                  isOpen && "rotate-180",
                )}
                strokeWidth={2.25}
              />
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-navy/70">
                  {faq.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Sidebar stat chip ─────────────────────────────────────────────────── */

function StatChip({
  icon: Icon,
  value,
  label,
  tone,
}: {
  icon: IconType;
  value: string;
  label: string;
  tone: ToneUi;
}) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl bg-[color-mix(in_oklch,white_70%,var(--section-grey))] p-3">
      <span className={cn("flex h-7 w-7 items-center justify-center rounded-lg", tone.iconTile)}>
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
      </span>
      <p className="font-display text-[13px] font-bold leading-snug text-navy">{value}</p>
      <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

/* ─── Main page component ───────────────────────────────────────────────── */

export function ServiceProgramPage({
  categorySlug: catSlug,
  programSlug,
}: {
  categorySlug: ProgramSlug;
  programSlug: string;
}) {
  const result = getProgramBySlugs(catSlug, programSlug);
  const reduceMotion = useReducedMotion();

  if (!result) return null;

  const { category, program } = result;
  const styles = toneStyles[category.tone];
  const { length: durLength, frequency: durFrequency } = programDurationParts(program.dur);
  const faqs = buildProgramFaqs(program);
  const related = category.programs.filter((p) => p.slug !== program.slug);
  const categoryHeading = categoryProgramsHeading(category.cat, category.tag);

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="border-b border-border/40 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/services">Services</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={PROGRAM_ROUTES[catSlug]}>{category.cat}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1 max-w-[52vw] sm:max-w-none">
                  {program.t}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </nav>

      {/* Hero */}
      <PageHero
        pill={category.tag}
        title={program.t}
        description={program.intro}
        animateOnLoad={true}
        aside={
          <HeroStatsPanel
            durLength={durLength}
            durFrequency={durFrequency}
            tone={styles}
          />
        }
      >
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em]",
              styles.badge,
            )}
          >
            <HeartPulse className="h-3.5 w-3.5" strokeWidth={2.25} />
            Specialist supervised
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-white/70 px-3 py-1.5 text-[12px] font-medium text-navy/75">
            <Calendar className={cn("h-3.5 w-3.5", styles.accent)} strokeWidth={2.25} />
            {program.dur}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-white/70 px-3 py-1.5 text-[12px] font-medium text-navy/75">
            <Video className={cn("h-3.5 w-3.5", styles.accent)} strokeWidth={2.25} />
            Live tele-rehabilitation
          </span>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary motion-btn inline-flex items-center gap-2"
          >
            Book Free Assessment
            <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
          </a>
          <Link href={PROGRAM_ROUTES[catSlug]} className="btn-secondary">
            All {categoryHeading.toLowerCase()}
          </Link>
        </div>
      </PageHero>

      {/* Body - overflow-visible so the sidebar can stick for the full section height */}
      <PageSection variant="section" className="overflow-visible">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_320px]">

          {/* ── Main content column ── */}
          <div className="space-y-16">

            {/* § Who it's for */}
            <Reveal variant="fadeUp" as="section">
              <SectionHead
                icon={ListChecks}
                label={program.includes?.length ? "Conditions covered" : "Who it\u2019s for"}
                title="Who this program is for"
                tone={styles}
                id="conditions"
              />
              {program.includes?.length ? (
                <>
                  {program.includesLabel ? (
                    <p className="mb-4 text-sm font-semibold text-navy/65">
                      {program.includesLabel}
                    </p>
                  ) : null}
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {program.includes.map((item) => (
                      <li
                        key={item}
                        className={cn(
                          "flex items-start gap-3 rounded-2xl border border-border/60 bg-white/85 p-4 shadow-[0_2px_8px_-4px_rgba(30,46,61,0.08)]",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                            styles.iconTile,
                          )}
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </span>
                        <span className="text-[14px] leading-snug text-navy/85">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 rounded-xl border border-border/50 bg-white/60 px-4 py-3 text-sm text-navy/65">
                    <span className="font-semibold text-navy">Suitable for: </span>
                    {program.for}
                  </p>
                </>
              ) : (
                <p className="text-[15px] leading-[1.85] text-navy/80 sm:text-base">
                  {program.for}
                </p>
              )}
            </Reveal>

            {/* § What it involves - pull-quote style */}
            <Reveal variant="fadeUp" as="section">
              <SectionHead
                icon={Stethoscope}
                label="Overview"
                title="What this program involves"
                tone={styles}
                id="overview"
              />
              <div
                className={cn(
                  "relative rounded-2xl border border-l-4 border-border/60 bg-white/90 p-6 shadow-[0_4px_16px_-8px_rgba(30,46,61,0.1)] sm:p-8",
                  styles.border,
                )}
              >
                <Quote
                  className={cn("mb-4 h-8 w-8 opacity-15", styles.accent)}
                  strokeWidth={1.5}
                />
                <p className="text-[17px] font-medium leading-[1.8] text-navy sm:text-lg">
                  {program.involves}
                </p>
              </div>
            </Reveal>

            {/* § What to expect */}
            <Reveal variant="fadeUp" as="section">
              <SectionHead
                icon={Sparkles}
                label="Your experience"
                title="What to expect"
                tone={styles}
                id="expect"
              />
              <div
                className={cn(
                  "rounded-2xl bg-gradient-to-br to-white p-6 ring-1 sm:p-7",
                  styles.gradientFrom,
                  styles.ring,
                )}
              >
                <p className="text-[15px] leading-[1.85] text-navy/80 sm:text-base">
                  {program.expect}
                </p>
              </div>
            </Reveal>

            {/* § First session - visual timeline */}
            <Reveal variant="fadeUp" as="section">
              <SectionHead
                icon={ClipboardList}
                label="Getting started"
                title="Your first session, step by step"
                tone={styles}
                id="first-session"
              />
              <div className="rounded-2xl border border-border/70 bg-white/90 p-5 shadow-[0_4px_16px_-8px_rgba(30,46,61,0.1)] sm:p-7">
                <SessionTimeline firstSession={program.firstSession} tone={styles} />
              </div>
            </Reveal>

            {/* § Benefits */}
            <Reveal variant="fadeUp" as="section">
              <SectionHead
                icon={ListChecks}
                label="Outcomes"
                title="Benefits & outcomes"
                tone={styles}
                id="benefits"
              />
              <StaggerReveal
                as="ul"
                className="grid gap-3 sm:grid-cols-2"
                itemVariant="fadeUp"
              >
                {program.benefits.map((benefit, i) => (
                  <StaggerItem
                    as="li"
                    key={benefit}
                    className="flex items-start gap-4 rounded-2xl border border-border/60 bg-white/90 p-5 shadow-[0_2px_8px_-4px_rgba(30,46,61,0.08)]"
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-[15px] font-bold",
                        styles.iconTile,
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-2 text-[14px] font-semibold leading-snug text-navy">
                      {benefit}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </Reveal>

            {/* § Safety */}
            <Reveal variant="fadeUp" as="section">
              <SectionHead
                icon={Shield}
                label="Safety protocol"
                title="How we keep you safe"
                tone={styles}
                id="safety"
              />
              <ul className="space-y-2.5">
                {program.safetyNotes.map((note) => (
                  <li
                    key={note}
                    className="flex items-start gap-3.5 rounded-xl bg-[color-mix(in_oklch,white_78%,var(--section-grey))] px-4 py-3.5 ring-1 ring-border/50"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-border/60">
                      <Shield
                        className={cn("h-3.5 w-3.5", styles.accent)}
                        strokeWidth={2.25}
                      />
                    </span>
                    <span className="text-[14px] leading-relaxed text-navy/80">{note}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* § FAQ */}
            <Reveal variant="fadeUp" as="section">
              <SectionHead
                icon={MessageCircleQuestion}
                label="FAQ"
                title="Frequently asked questions"
                tone={styles}
                id="faq"
              />
              <FaqAccordion faqs={faqs} tone={styles} />
            </Reveal>
          </div>

          {/* ── Sticky sidebar ── */}
          <aside aria-label="Programme summary" className="lg:col-start-2 lg:row-start-1">
            <div className="space-y-4 lg:sticky lg:top-[calc(var(--header-height)+1.25rem)]">

              {/* At a glance */}
              <div className="overflow-hidden rounded-2xl border border-border/80 bg-white/95 shadow-[0_8px_32px_-16px_rgba(30,46,61,0.18)]">
                <div className="border-b border-border/60 px-5 py-3.5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    At a glance
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 p-3">
                  <StatChip icon={Calendar} value={durLength} label="Duration" tone={styles} />
                  {durFrequency ? (
                    <StatChip icon={Repeat} value={durFrequency} label="Per week" tone={styles} />
                  ) : null}
                  <StatChip icon={Video} value="Live online" label="Format" tone={styles} />
                  <StatChip icon={HeartPulse} value="Every session" label="Supervised" tone={styles} />
                </div>
              </div>

              {/* Specialist card with portrait */}
              <div className="overflow-hidden rounded-2xl border border-border/80 bg-white/95 shadow-[0_8px_32px_-16px_rgba(30,46,61,0.18)]">
                <div className="border-b border-border/60 px-5 py-3.5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    Your specialist
                  </p>
                </div>
                <div className="p-4">
                  <div className="flex gap-3.5">
                    <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl bg-[var(--section-grey)]">
                      <Image
                        src={DR_DEEPALI_PORTRAIT_PRIMARY}
                        alt="Dr. Deepali Shah, PT"
                        fill
                        className="object-contain object-bottom"
                        sizes="72px"
                      />
                    </div>
                    <div className="min-w-0 pt-0.5">
                      <p className="font-display text-[15px] font-bold leading-snug text-navy">
                        Dr. Deepali Shah
                      </p>
                      <p className="text-[12px] text-navy/55">(PT)</p>
                      <p className={cn("mt-1 text-[12px] font-semibold", styles.accent)}>
                        Gold Medalist
                      </p>
                    </div>
                  </div>
                  <div className="mt-3.5 space-y-1">
                    {[
                      "MPT Cardiopulmonary Sciences",
                      "Ex-Cipla Pulmonary Rehab Faculty",
                      "Cardiac & Pulmonary Specialist",
                    ].map((c) => (
                      <div key={c} className="flex items-center gap-2">
                        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", styles.iconTile.split(" ")[0])} />
                        <span className="text-[12px] text-navy/65">{c}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/about"
                    className={cn(
                      "mt-4 inline-flex items-center gap-1.5 font-sans-brand text-[12px] font-bold uppercase tracking-[0.08em] hover:underline",
                      styles.accent,
                    )}
                  >
                    About Dr. Deepali
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>

              {/* CTA card */}
              <div
                className={cn(
                  "overflow-hidden rounded-2xl border p-5 text-center ring-1",
                  styles.ring,
                  styles.softBg,
                )}
              >
                <HeartPulse
                  className={cn("mx-auto h-8 w-8", styles.accent)}
                  strokeWidth={1.75}
                />
                <p className="mt-3 font-display text-base font-bold text-navy">
                  Ready to get started?
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-navy/65">
                  Free assessment - no obligation to enrol.
                </p>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary motion-btn mt-4 block w-full"
                >
                  Book Free Assessment
                </a>
                <a
                  href={`tel:+91${PHONE}`}
                  className="mt-2 block text-[12px] text-navy/50 hover:text-navy transition-colors"
                >
                  Or call +91 77728 94136
                </a>
              </div>
            </div>
          </aside>
        </div>
      </PageSection>

      {/* Related programs */}
      {related.length ? (
        <PageSection variant="background">
          <Reveal variant="fadeUp">
            <p className={cn("section-label", styles.accent)}>More in {category.tag}</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-navy sm:text-3xl">
              Related programs
            </h2>
          </Reveal>
          <StaggerReveal
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            itemVariant="fadeUp"
          >
            {related.map((p) => {
              const PIcon = p.i;
              return (
                <StaggerItem as="article" key={p.slug}>
                  <Link
                    href={getProgramHref(catSlug, p.slug)}
                    className={cn(
                      "group flex h-full flex-col rounded-2xl border border-border/60 border-l-4 bg-white/90 p-5 shadow-[0_8px_32px_-16px_rgba(30,46,61,0.14)] transition-[box-shadow,transform] motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_16px_40px_-14px_rgba(30,46,61,0.2)]",
                      styles.border,
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl",
                        styles.iconTile,
                      )}
                    >
                      <PIcon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-4 font-display text-[1.05rem] font-bold leading-snug text-navy">
                      {p.t}
                    </h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-navy/60">
                      {p.for}
                    </p>
                    <span
                      className={cn(
                        "mt-4 inline-flex items-center gap-1 font-sans-brand text-[11px] font-bold uppercase tracking-[0.12em]",
                        styles.accent,
                      )}
                    >
                      View program
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerReveal>
        </PageSection>
      ) : null}

      {/* Final CTA */}
      <PageSection variant="section">
        <Reveal
          variant="fadeUp"
          className="relative overflow-hidden rounded-2xl border border-border/70 bg-background/80 p-6 text-center sm:p-12"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-8 -top-8 h-48 w-48 rounded-full bg-[var(--brand-teal)]/[0.04] blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-8 -right-8 h-48 w-48 rounded-full bg-[var(--brand-pink)]/[0.04] blur-2xl"
          />
          <div className="relative z-10">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em]",
                styles.badge,
              )}
            >
              <HeartPulse className="h-3.5 w-3.5" strokeWidth={2.25} />
              Free assessment
            </span>
            <h2 className="mx-auto mt-5 max-w-xl font-display text-2xl font-bold text-navy sm:text-3xl">
              Start {program.t} with specialist guidance
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-navy/65 sm:text-base">
              Book a free assessment with Dr. Deepali Shah (PT). We&apos;ll review your diagnosis,
              discuss your goals, and build a programme tailored to you - no obligation to enrol.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <motion.div
                whileHover={
                  reduceMotion ? {} : { y: -2, scale: 1.02, transition: { duration: 0.25 } }
                }
                whileTap={reduceMotion ? {} : { scale: 0.98 }}
              >
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary motion-btn inline-flex items-center gap-2"
                >
                  Book Free Assessment
                  <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
                </a>
              </motion.div>
              <Link href="/services" className="btn-secondary">
                All programmes
              </Link>
            </div>
          </div>
        </Reveal>
      </PageSection>
    </>
  );
}
