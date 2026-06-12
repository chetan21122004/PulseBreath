'use client';

import Link from "next/link";
import { ArrowRight, User, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import {
  JOURNEY_STEPS,
  JOURNEY_SAFETY_POINTS,
  JOURNEY_SAFETY_EXTRA,
  JOURNEY_TELE_REHAB,
} from "@/components/pulse-landing/journey-content";
import { DR_DEEPALI_FEATURED_VIDEO, DR_DEEPALI_PORTRAIT } from "@/components/pulse-landing/constants";
import { DR_DEEPALI_PHOTOS } from "@/components/pulse-landing/dr-deepali-assets";
import { DrDeepaliGallery } from "@/components/pulse-landing/DrDeepaliGallery";
import { DrDeepaliVideo } from "@/components/pulse-landing/DrDeepaliVideo";
import { BackgroundBlob } from "@/components/pulse-landing/BackgroundBlob";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/pulse-landing/motion";
import { cn } from "@/lib/utils";

export function HowItWorksPage() {
  return (
    <>
      <style>{`
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      <PageHero
        pill="How It Works"
        title={
          <>
            Four steps to{" "}
            <span className="font-display italic text-brand">confident recovery</span>
          </>
        }
        description="A calm, supervised path from first call to long-term capacity. Whether you are recovering after surgery or rebuilding strength in later life, every step is guided by Dr. Deepali."
        withBlob
      />

      <PageSection variant="background">
        <StaggerReveal className="space-y-20" itemVariant="fadeUp">
          {JOURNEY_STEPS.map((step, index) => (
            <StaggerItem key={step.n}>
              <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <div
                    className="inline-block motion-reduce:animate-none"
                    style={{
                      animation: `orbFloat 5s ease-in-out ${index * 0.4}s infinite`,
                    }}
                  >
                    <div
                      className={cn(
                        "inline-flex h-16 w-16 items-center justify-center rounded-full font-display text-2xl font-bold text-white shadow-lg",
                        step.tone === "teal"
                          ? "bg-gradient-to-br from-[#7cc4d2] to-[#1f5a68]"
                          : "bg-gradient-to-br from-[#e8a7b5] to-[#8a3a4d]",
                      )}
                    >
                      {step.n}
                    </div>
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-bold text-navy sm:text-3xl">
                    {step.t}
                  </h2>
                  <p className="mt-3 text-lg font-medium text-navy">{step.lead}</p>
                  <p className="mt-2 text-[var(--body-text)]">{step.detail}</p>
                  <ul className="mt-4 space-y-2">
                    {step.more.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-navy/85">
                        <span
                          className={cn(
                            "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                            step.tone === "teal" ? "bg-teal" : "bg-brand",
                          )}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="motion-card rounded-xl border border-border/80 bg-white/90 p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-brand">
                      <User className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-[0.16em]">What you do</span>
                    </div>
                    <ul className="mt-4 space-y-3">
                      {step.patientDoes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-[var(--body-text)]">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="motion-card rounded-xl border border-border/80 bg-[var(--brand-teal-soft)]/20 p-5 sm:p-6">
                    <div className="flex items-center gap-2 text-teal">
                      <Stethoscope className="h-5 w-5" />
                      <span className="text-xs font-bold uppercase tracking-[0.16em]">What Dr. Deepali does</span>
                    </div>
                    <ul className="mt-4 space-y-3">
                      {step.drDeepaliDoes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-[var(--body-text)]">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </PageSection>

      <PageSection variant="section" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <BackgroundBlob variant={2} cover opacity={0.1} />
        </div>
        <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal variant="fadeUp">
            <DrDeepaliVideo
              src={DR_DEEPALI_FEATURED_VIDEO}
              poster={DR_DEEPALI_PORTRAIT}
              preload="metadata"
              className="border-2 border-white/80 shadow-[0_28px_70px_-24px_rgba(30,46,61,0.35)]"
            />
          </Reveal>
          <Reveal variant="fadeUp" delay={0.1}>
            <span className="pill">Safety First</span>
            <h2 className="heading-display mt-4 text-2xl sm:text-3xl">
              Is it safe to exercise with{" "}
              <span className="italic text-brand">my condition?</span>
            </h2>
            <div className="mt-5 rounded-xl bg-white/88 px-4 py-4 ring-1 ring-border/60">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                A common concern
              </p>
              <p className="mt-2 font-display text-lg font-semibold text-navy">
                &ldquo;Will exercising put my heart or lungs at risk?&rdquo;
              </p>
            </div>
            <StaggerReveal className="mt-6 space-y-3" itemVariant="fadeUp">
              {JOURNEY_SAFETY_POINTS.map(({ icon: Icon, text }) => (
                <StaggerItem key={text}>
                  <div className="flex items-start gap-3 rounded-xl border border-border/70 bg-background p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)]">
                      <Icon className="h-4 w-4 text-brand" strokeWidth={2.25} />
                    </span>
                    <span className="pt-1.5 text-sm font-medium leading-relaxed text-navy">{text}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
            <div className="mt-6 space-y-3">
              {JOURNEY_SAFETY_EXTRA.map((para) => (
                <p key={para.slice(0, 40)} className="text-sm leading-relaxed text-[var(--body-text)]">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageSection variant="background">
        <Reveal variant="fadeUp">
          <span className="section-label">Tele-Rehabilitation</span>
          <h2 className="heading-display mt-4 text-2xl sm:text-3xl">
            Supervised recovery, <span className="italic text-brand">wherever you are</span>
          </h2>
        </Reveal>

        <Reveal variant="fadeUp" className="mt-8">
          <DrDeepaliGallery
            photos={DR_DEEPALI_PHOTOS.slice(1, 4)}
            columns="compact"
          />
        </Reveal>

        <StaggerReveal className="mt-10 grid gap-4 sm:grid-cols-2" itemVariant="fadeUp">
          {JOURNEY_TELE_REHAB.map((item) => (
            <StaggerItem key={item.title}>
              <div className="motion-card h-full rounded-xl border border-border/80 bg-white/90 p-5">
                <h3 className="font-display text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--body-text)]">{item.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
        <Reveal variant="fadeUp" className="mt-12 text-center">
          <Link href="/contact" className="btn-primary motion-btn inline-flex items-center gap-2">
            Book your free assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </PageSection>
    </>
  );
}
