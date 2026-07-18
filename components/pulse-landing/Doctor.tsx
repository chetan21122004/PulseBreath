'use client';

import { Award, BadgeCheck } from "lucide-react";
import { LINKEDIN } from "./constants";
import { DOCTOR_CREDENTIALS, DOCTOR_HIGHLIGHTS, DOCTOR_OVERVIEW_BRIEF } from "./doctor-content";
import { DR_DEEPALI_ABOUT_PORTRAIT } from "./dr-deepali-assets";
import { LinkedInIcon } from "./LinkedInIcon";
import { Reveal, StaggerItem, StaggerReveal } from "./motion";
import { SectionPageLink } from "./SectionPageLink";

export function Doctor() {
  return (
    <section
      id="about"
      className="relative max-md:snap-align-none snap-start overflow-hidden bg-background py-8 sm:py-10 lg:py-14"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 40% at 8% 15%, rgba(46,139,139,0.06), transparent 60%), radial-gradient(45% 38% at 92% 85%, rgba(176,64,96,0.05), transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--brand-dark) 1px, transparent 1px), linear-gradient(to bottom, var(--brand-dark) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-16">
          <Reveal variant="fadeRight" className="mx-auto w-full max-w-[min(100%,260px)] sm:max-w-[min(100%,320px)] lg:col-span-5 lg:mx-0 lg:max-w-none">
            <div className="relative lg:mx-0">
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

                <div className="flex items-center justify-between gap-3 border-b border-border/70 bg-white/90 px-3 py-2.5 backdrop-blur-sm sm:px-5 sm:py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-soft)] ring-1 ring-brand/15 sm:h-9 sm:w-9"
                      aria-hidden
                    >
                      <BadgeCheck className="h-3.5 w-3.5 text-brand sm:h-4 sm:w-4" strokeWidth={2.25} />
                    </div>
                    <a
                      href={LINKEDIN}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Dr. Deepali Shah on LinkedIn"
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] ring-1 ring-[#0A66C2]/25 transition-colors hover:bg-[#0A66C2] hover:text-white sm:h-9 sm:w-9"
                    >
                      <LinkedInIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </a>
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
                    className="aspect-[3/4] max-h-[min(58vw,280px)] w-full bg-white object-contain object-center sm:max-h-none"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--brand-deeper)]/55 via-[var(--brand-deeper)]/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--brand-deeper)]/92 via-[var(--brand-deeper)]/72 to-transparent px-3 pb-3 pt-10 sm:px-5 sm:pb-5 sm:pt-16">
                    <div className="border-t border-white/15 pt-2.5 sm:pt-3">
                      <p className="font-display text-base font-bold leading-tight text-white sm:text-xl">
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
            </div>
          </Reveal>

          <StaggerReveal className="lg:col-span-7" itemVariant="fadeUp">
            <StaggerItem>
              <span className="pill">About Dr. Deepali</span>
            </StaggerItem>

            <StaggerItem>
              <h2 className="heading-display mt-4 text-[1.65rem] sm:mt-5 sm:text-4xl">
                The specialist behind <span className="font-display italic text-brand">PulseBreath.</span>
              </h2>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-3 font-display text-lg font-medium italic leading-snug text-navy sm:mt-4 sm:text-[clamp(1.2rem,2.2vw,1.55rem)]">
                Expert care,{" "}
                <span className="italic text-brand">compassionate</span> touch.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 border-b border-border pb-4 sm:mt-6 sm:gap-x-4 sm:gap-y-2 sm:pb-5">
                <span className="font-display text-lg italic text-brand sm:text-2xl">BPT · MPT</span>
                <span className="text-sm font-medium text-navy/85">Cardiopulmonary Sciences</span>
                <span className="w-full font-sans text-[11px] font-medium text-muted-foreground sm:ml-auto sm:w-auto sm:text-xs">
                  MP Paramedical Reg No. 54685/2023
                </span>
              </div>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-4 max-w-xl text-[15px] leading-[1.75] text-[var(--body-text)] sm:mt-6 sm:leading-[1.85] sm:text-[16px]">
                {DOCTOR_OVERVIEW_BRIEF}
              </p>
              <SectionPageLink href="/about" className="mt-3 sm:mt-4">
                Read full profile
              </SectionPageLink>
            </StaggerItem>
            <StaggerItem>
              <ul className="mt-4 space-y-2 sm:mt-6 sm:space-y-2.5">
                {DOCTOR_HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 sm:gap-3">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand sm:mt-2"
                      aria-hidden
                    />
                    <span className="text-[13px] font-medium leading-snug text-navy sm:text-[15px] sm:leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-8 sm:grid-cols-3 sm:gap-3">
                {DOCTOR_CREDENTIALS.map(({ icon: Icon, t, d }) => (
                  <div
                    key={t}
                    className="motion-card flex flex-col rounded-lg border border-border/80 bg-white/90 p-2.5 text-center shadow-[0_12px_40px_-20px_rgba(30,46,61,0.2)] ring-1 ring-white/80 backdrop-blur-sm sm:rounded-xl sm:p-4 sm:text-left"
                  >
                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary-soft)] ring-1 ring-brand/15 sm:mx-0 sm:h-10 sm:w-10">
                      <Icon className="h-3.5 w-3.5 text-brand sm:h-4 sm:w-4" strokeWidth={2.25} />
                    </div>
                    <p className="mt-2 font-display text-[11px] font-bold leading-snug text-navy sm:mt-3 sm:text-base">{t}</p>
                    <p className="mt-0.5 hidden text-xs leading-snug text-muted-foreground sm:block">{d}</p>
                  </div>
                ))}
              </div>
            </StaggerItem>
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}
