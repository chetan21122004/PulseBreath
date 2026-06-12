'use client';

import { Award, BadgeCheck } from "lucide-react";
const teamDoctor = "/assets/team-doctor.jpg";
import { DOCTOR_CREDENTIALS, DOCTOR_HIGHLIGHTS, DOCTOR_OVERVIEW } from "./doctor-content";
import { Reveal, StaggerItem, StaggerReveal } from "./motion";

export function Doctor() {
  return (
    <section
      id="about"
      className="relative max-md:snap-align-none snap-start overflow-hidden bg-background py-10 lg:py-14"
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
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
          <Reveal variant="fadeRight" className="lg:col-span-5">
            <div className="relative mx-auto max-w-[min(100%,320px)] lg:mx-0 lg:max-w-none">
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
                    src={teamDoctor}
                    alt="Dr. Deepali Shah (PT) -  Founder, PulseBreath Physiotherapy"
                    width={800}
                    height={900}
                    className="aspect-[3/4] w-full object-cover object-top"
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
            </div>
          </Reveal>

          <StaggerReveal className="lg:col-span-7" itemVariant="fadeUp">
            <StaggerItem>
              <span className="pill">About Dr. Deepali</span>
            </StaggerItem>

            <StaggerItem>
              <h2 className="heading-display mt-5 text-[2rem] sm:text-4xl">
                The specialist behind <span className="font-display italic text-brand">PulseBreath.</span>
              </h2>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-4 font-display text-[clamp(1.2rem,2.2vw,1.55rem)] font-medium italic leading-snug text-navy">
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
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {DOCTOR_CREDENTIALS.map(({ icon: Icon, t, d }) => (
                  <div
                    key={t}
                    className="motion-card flex flex-col rounded-xl border border-border/80 bg-white/90 p-4 shadow-[0_12px_40px_-20px_rgba(30,46,61,0.2)] ring-1 ring-white/80 backdrop-blur-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary-soft)] ring-1 ring-brand/15">
                      <Icon className="h-4 w-4 text-brand" strokeWidth={2.25} />
                    </div>
                    <p className="mt-3 font-display text-base font-bold leading-snug text-navy">{t}</p>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">{d}</p>
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
