import { ClipboardCheck, Users, Video } from "lucide-react";
import { WHATSAPP_OFFERS } from "./constants";
import { Reveal, StaggerItem, StaggerReveal } from "./motion";
import {
  FREE_ASSESSMENT,
  PROGRAM_HIGHLIGHTS,
  SESSIONS_INTRO,
  SESSIONS_ROUTE,
} from "./sessions-data";
import { SectionPageLink } from "./SectionPageLink";
import { SessionFormatRow } from "./SessionFormatCards";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function SessionsSection() {
  return (
    <section id="sessions" className="relative overflow-hidden bg-section py-10 lg:py-14">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal variant="fadeUp" className="text-center lg:text-left">
          <span className="pill">{SESSIONS_INTRO.pill}</span>

          <h2 className="heading-display mt-5 text-[1.75rem] sm:text-4xl lg:text-[2.5rem]">
            {SESSIONS_INTRO.titleLead}{" "}
            <span className="font-display italic text-brand">{SESSIONS_INTRO.titleAccent}</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--body-text)] sm:text-base lg:mx-0">
            {SESSIONS_INTRO.description}
          </p>

          <p className="mx-auto mt-4 inline-flex max-w-full items-center justify-center gap-2 text-sm font-medium text-navy/80 lg:mx-0 lg:justify-start">
            <Video className="h-4 w-4 shrink-0 text-brand" />
            {SESSIONS_INTRO.teleRehab}
          </p>
        </Reveal>

        <div className="mt-10">
          <SessionFormatRow variant="home" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <Reveal variant="fadeUp" className="rounded-2xl border border-border/80 bg-background/95 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-soft)] ring-1 ring-brand/15">
                <ClipboardCheck className="h-5 w-5 text-brand" strokeWidth={2.25} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-navy sm:text-xl">
                  {FREE_ASSESSMENT.headline}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--body-text)]">
                  {FREE_ASSESSMENT.description}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal variant="fadeUp" className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a
              href={WHATSAPP_OFFERS}
              target="_blank"
              rel="noopener"
              className="btn-whatsapp motion-btn w-full justify-center sm:w-auto lg:w-full xl:w-auto"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {FREE_ASSESSMENT.cta}
            </a>
            <SectionPageLink href={SESSIONS_ROUTE} className="justify-center">
              View session details
            </SectionPageLink>
          </Reveal>
        </div>

        <StaggerReveal
          as="ul"
          className="mt-8 grid gap-2 sm:grid-cols-2 lg:mt-10 lg:grid-cols-5"
          itemVariant="fadeUp"
        >
          {PROGRAM_HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <StaggerItem
              key={label}
              as="li"
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/80 px-3 py-2.5 sm:px-4 sm:py-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-soft)]">
                <Icon className="h-4 w-4 text-brand" strokeWidth={2} />
              </span>
              <span className="font-sans-brand text-[13px] font-semibold leading-snug text-navy sm:text-sm">
                {label}
              </span>
            </StaggerItem>
          ))}
        </StaggerReveal>

        <Reveal variant="fadeUp" className="mt-8 text-center lg:text-left">
          <p className="inline-flex items-center gap-2 text-sm font-medium italic text-navy/55">
            <Users className="h-4 w-4 text-brand" />
            {SESSIONS_INTRO.motto}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
