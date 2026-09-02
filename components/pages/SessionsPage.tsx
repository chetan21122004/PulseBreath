'use client';

import { CheckCircle2, ClipboardCheck, Phone, Send, Video } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { ENQUIRY_HREF, PHONE, WHATSAPP_OFFERS } from "@/components/pulse-landing/constants";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/pulse-landing/motion";
import {
  FREE_ASSESSMENT,
  PROGRAM_HIGHLIGHTS,
  SESSION_FEATURES,
  SESSIONS_INTRO,
  TARGET_CONDITIONS,
} from "@/components/pulse-landing/sessions-data";
import { SessionFormatRow } from "@/components/pulse-landing/SessionFormatCards";
import { WhatsAppIcon } from "@/components/pulse-landing/WhatsAppIcon";

export function SessionsPage() {
  return (
    <>
      <PageHero
        pill={SESSIONS_INTRO.pill}
        title={
          <>
            {SESSIONS_INTRO.titleLead}{" "}
            <span className="font-display italic text-brand">{SESSIONS_INTRO.titleAccent}</span>
          </>
        }
        description={SESSIONS_INTRO.description}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-[var(--primary-soft)] px-4 py-2 text-sm font-semibold text-navy">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand" aria-hidden />
            1-on-1 and small-group
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/80 px-4 py-2 text-sm font-medium text-navy/80">
            <Video className="h-4 w-4 text-brand" />
            {SESSIONS_INTRO.teleRehab}
          </span>
        </div>
      </PageHero>

      <PageSection variant="section">
        <Reveal variant="fadeUp" className="text-center">
          <span className="section-label">Choose Your Format</span>
          <h2 className="heading-display mt-4 text-2xl sm:text-4xl">
            Personalised 1-on-1 or{" "}
            <span className="italic text-brand">small-group sessions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[var(--body-text)]">
            Live, clinician-guided rehabilitation from home. Choose individual attention, or
            progress alongside people with a similar clinical and functional profile.
          </p>
        </Reveal>

        <div className="mt-10">
          <SessionFormatRow variant="page" />
        </div>
      </PageSection>

      <PageSection>
        <Reveal variant="fadeUp" className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-soft)] ring-1 ring-brand/20">
            <ClipboardCheck className="h-7 w-7 text-brand" strokeWidth={2.25} />
          </div>
          <h2 className="heading-display mt-6 text-2xl sm:text-4xl">
            {FREE_ASSESSMENT.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--body-text)] sm:text-lg">
            {FREE_ASSESSMENT.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP_OFFERS}
              target="_blank"
              rel="noopener"
              className="btn-whatsapp motion-btn inline-flex w-full max-w-sm justify-center sm:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {FREE_ASSESSMENT.cta}
            </a>
            <a href={ENQUIRY_HREF} className="btn-secondary motion-btn inline-flex w-full max-w-sm justify-center sm:w-auto">
              <Send className="h-4 w-4" />
              Send enquiry
            </a>
          </div>
        </Reveal>
      </PageSection>

      <PageSection variant="background">
        <Reveal variant="fadeUp" className="text-center">
          <span className="section-label">Every Session</span>
          <h2 className="heading-display mt-4 text-2xl sm:text-4xl">
            What makes each session <span className="italic text-brand">different</span>
          </h2>
        </Reveal>

        <StaggerReveal
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          itemVariant="scaleIn"
        >
          {SESSION_FEATURES.map(({ icon: Icon, title, description }) => (
            <StaggerItem
              key={title}
              className="motion-card rounded-2xl border border-border/70 bg-white/85 p-5 backdrop-blur-sm sm:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-soft)] ring-1 ring-brand/15">
                <Icon className="h-5 w-5 text-brand" strokeWidth={2.25} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--body-text)]">
                {description}
              </p>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </PageSection>

      <PageSection variant="section">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal variant="fadeUp">
            <span className="section-label">Who Is This For?</span>
            <h2 className="heading-display mt-4 text-2xl sm:text-4xl">
              Living with a chronic heart or lung condition?
            </h2>
            <p className="mt-4 text-[var(--body-text)]">
              This programme is designed for individuals who need structured, specialist-led
              rehabilitation for cardiopulmonary conditions.
            </p>
          </Reveal>

          <StaggerReveal className="grid gap-2.5 sm:grid-cols-2" itemVariant="fadeUp">
            {TARGET_CONDITIONS.map((condition) => (
              <StaggerItem
                key={condition}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-white/80 px-4 py-3.5"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span className="text-sm font-medium leading-snug text-navy">{condition}</span>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </PageSection>

      <PageSection>
        <Reveal variant="fadeUp">
          <div className="overflow-hidden rounded-3xl border border-border/70 bg-[var(--brand-dark)] px-5 py-10 text-white sm:px-10 sm:py-14">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand sm:text-sm">
                {SESSIONS_INTRO.motto}
              </p>
              <h2 className="heading-display mt-5 text-2xl text-white sm:text-4xl">
                Find the session format that fits you
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                {FREE_ASSESSMENT.support}
              </p>

              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                <a
                  href={WHATSAPP_OFFERS}
                  target="_blank"
                  rel="noopener"
                  className="btn-whatsapp motion-btn justify-center"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  {FREE_ASSESSMENT.cta}
                </a>
                <a
                  href={ENQUIRY_HREF}
                  className="btn-secondary motion-btn justify-center !border-white/20 !bg-white/10 !text-white hover:!border-white/35 hover:!bg-white/15"
                >
                  <Send className="h-4 w-4" />
                  Send enquiry
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="btn-secondary motion-btn justify-center !border-white/20 !bg-white/10 !text-white hover:!border-white/35 hover:!bg-white/15"
                >
                  <Phone className="h-4 w-4" />
                  Call {PHONE}
                </a>
              </div>

              <ul className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-3">
                {PROGRAM_HIGHLIGHTS.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white/70"
                  >
                    <Icon className="h-4 w-4 text-brand" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </PageSection>
    </>
  );
}
