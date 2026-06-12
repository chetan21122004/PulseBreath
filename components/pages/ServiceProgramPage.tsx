'use client';

import Link from "next/link";
import { ArrowLeft, Check, Clock, Shield } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { WHATSAPP, PROGRAM_ROUTES, type ProgramSlug } from "@/components/pulse-landing/constants";
import type { ProgramCategoryTone } from "@/components/pulse-landing/conditions-data";
import { getProgramBySlugs } from "@/components/pulse-landing/ProgramCatalog";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/pulse-landing/motion";
import { cn } from "@/lib/utils";

const toneStyles: Record<
  ProgramCategoryTone,
  { border: string; icon: string; badge: string; accent: string }
> = {
  rose: {
    border: "border-l-[var(--brand-pink)]",
    icon: "bg-[var(--primary-soft)] text-[var(--brand-pink)]",
    badge: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    accent: "text-[var(--brand-pink)]",
  },
  teal: {
    border: "border-l-[var(--brand-teal)]",
    icon: "bg-[var(--brand-teal-soft)] text-teal",
    badge: "bg-[var(--brand-teal-soft)] text-teal",
    accent: "text-teal",
  },
  burgundy: {
    border: "border-l-[var(--brand-pink-deep)]",
    icon: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    badge: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    accent: "text-[var(--brand-pink-deep)]",
  },
};

export function ServiceProgramPage({
  categorySlug: catSlug,
  programSlug,
}: {
  categorySlug: ProgramSlug;
  programSlug: string;
}) {
  const result = getProgramBySlugs(catSlug, programSlug);
  if (!result) return null;

  const { category, program } = result;
  const Icon = program.i;
  const styles = toneStyles[category.tone];

  return (
    <>
      <PageHero pill={category.tag} title={program.t} description={program.intro}>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em]",
              styles.badge,
            )}
          >
            Specialist supervised
          </span>
          <div className="flex items-center gap-2 font-sans-brand text-sm text-navy/75">
            <Clock className={cn("h-4 w-4", styles.accent)} strokeWidth={2.25} />
            {program.dur}
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--body-text)]">
          <span className="font-semibold text-navy">For: </span>
          {program.for}
        </p>
        <Link
          href={PROGRAM_ROUTES[catSlug]}
          className="mt-5 inline-flex items-center gap-2 font-sans-brand text-sm font-semibold text-brand hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          All {category.cat} programs
        </Link>
      </PageHero>

      <PageSection variant="section">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <Reveal variant="fadeUp" className="lg:col-span-3">
            <div className="flex items-start gap-4">
              <div className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", styles.icon)}>
                <Icon className="h-5 w-5" strokeWidth={2.25} />
              </div>
              <div>
                <span className="section-label">Overview</span>
                <p className="mt-3 text-[15px] leading-[1.85] text-[var(--body-text)] sm:text-base">
                  {program.involves}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.08} className="lg:col-span-2">
            <div
              className={cn(
                "rounded-xl border border-border/80 border-l-4 bg-white/90 p-5 sm:p-6",
                styles.border,
              )}
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Key outcomes
              </span>
              <ul className="mt-4 space-y-2.5">
                {program.benefits.slice(0, 4).map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm leading-relaxed text-navy/85">
                    <Check className={cn("mt-0.5 h-4 w-4 shrink-0", styles.accent)} strokeWidth={2.5} />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection variant="background">
        <StaggerReveal className="grid gap-4 sm:grid-cols-3" itemVariant="fadeUp">
          <StaggerItem>
            <div className="rounded-xl border border-border/70 bg-white/80 p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className={cn("h-4 w-4", styles.accent)} strokeWidth={2.25} />
                <span className="text-[11px] font-bold uppercase tracking-[0.14em]">Duration</span>
              </div>
              <p className="mt-2 text-sm font-medium leading-relaxed text-navy">{program.dur}</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="rounded-xl border border-border/70 bg-white/80 p-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                First session
              </span>
              <p className="mt-2 text-sm leading-relaxed text-navy/85">{program.firstSession}</p>
            </div>
          </StaggerItem>
          <StaggerItem>
            <div className="rounded-xl border border-border/70 bg-white/80 p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className={cn("h-4 w-4", styles.accent)} strokeWidth={2.25} />
                <span className="text-[11px] font-bold uppercase tracking-[0.14em]">Safety</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-navy/85">{program.safetyNotes[0]}</p>
            </div>
          </StaggerItem>
        </StaggerReveal>
      </PageSection>

      <PageSection variant="section">
        <div className="rounded-2xl border border-border/70 bg-background/80 p-6 text-center sm:p-10">
          <p className="text-[var(--body-text)]">
            Ready to start {program.t}? Book a free assessment — no obligation to enrol.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary motion-btn mt-6 inline-flex items-center gap-2"
          >
            Book Free Assessment
          </a>
        </div>
      </PageSection>
    </>
  );
}
