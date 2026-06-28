import {
  Users,
  Video,
  Activity,
  MapPin,
  PieChart,
  Heart,
  Phone,
} from "lucide-react";
import { PHONE, WHATSAPP } from "./constants";
import {
  DR_DEEPALI_FEATURED_VIDEO,
  DR_DEEPALI_SESSION_POSTER,
} from "./dr-deepali-assets";
import { BackgroundBlob } from "./BackgroundBlob";
import { Reveal, StaggerItem, StaggerReveal } from "./motion";
import { SectionPageLink } from "./SectionPageLink";
import { TeleRehabSessionClip } from "./TeleRehabSessionClip";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function TeleRehab() {
  const features = [
    { Icon: Users, t: "Small group of 5-8", d: "Intimate cohorts grouped by condition and capacity for focused supervision." },
    { Icon: Heart, t: "Personalized 1:1 sessions", d: "Individual sessions are also available when your goals need closer attention." },
    { Icon: Video, t: "Live video, never recorded", d: "Real-time guidance from Dr. Deepali Shah every session." },
    { Icon: Activity, t: "Vitals tracked together", d: "Heart-rate & SpO₂ monitoring guidance through the session." },
    { Icon: MapPin, t: "Available across India", d: "From Noida to anywhere -   wherever you have a screen." },
  ];

  return (
    <section className="relative py-8  overflow-hidden">
      <style>{`
        @keyframes tr-float { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-10px) rotate(2deg)} }
        @keyframes tr-floatAlt { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(8px) rotate(-3deg)} }
        @keyframes tr-pulseRing { 0%{transform:scale(1); opacity:.6} 100%{transform:scale(1.8); opacity:0} }
        @keyframes tr-ecg { 0%{stroke-dashoffset:1000} 100%{stroke-dashoffset:0} }
        @keyframes tr-ecgPulse { 0%,100%{opacity:.35} 50%{opacity:1} }
        @keyframes tr-shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .tr-float { animation: tr-float 6s ease-in-out infinite; }
        .tr-floatAlt { animation: tr-floatAlt 7s ease-in-out infinite; }
        .tr-cta { background: linear-gradient(110deg, #3A8FA3 0%, #6b6ec8 45%, #C0516A 100%); background-size: 200% 200%; animation: tr-shimmer 6s linear infinite; }
        .tr-cta:hover { filter: brightness(1.08); }
      `}</style>

      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, #f7f8fb 0%, #eef2f6 60%, #f7f8fb 100%)",
          }}
        />
        <BackgroundBlob variant={3} cover opacity={0.1} className="object-[55%_50%]" />
        <div
          className="absolute -top-32 left-1/4 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "var(--primary-soft)" }}
        />
        <div
          className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "rgba(58,143,163,.18)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/40 shadow-[0_30px_80px_-40px_rgba(44,62,80,.25)] backdrop-blur-sm">
          <div className="absolute top-6 right-4 w-40 opacity-80 sm:right-10 sm:w-60" aria-hidden>
            <svg viewBox="0 0 240 60" className="w-full" fill="none">
              <path
                d="M0 30 L40 30 L55 30 L65 10 L75 50 L85 18 L95 42 L110 30 L150 30 L165 30 L175 14 L185 46 L195 30 L240 30"
                stroke="#C0516A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="600"
                style={{ animation: "tr-ecg 3s ease-out forwards, tr-ecgPulse 2.2s ease-in-out infinite 3s" }}
              />
            </svg>
          </div>
          <DecoIcon className="absolute bottom-8 right-6 tr-float sm:right-10" delay={0.2}>
            <IconTile><PieChart className="h-5 w-5 text-[#C0516A]" /></IconTile>
          </DecoIcon>
          <DecoIcon className="absolute bottom-8 right-24 tr-floatAlt hidden sm:block sm:right-32" delay={0.6}>
            <IconTile><Heart className="h-5 w-5 text-[#C0516A]" fill="#C0516A" fillOpacity={0.25} /></IconTile>
          </DecoIcon>

          <Reveal variant="fadeUp" amount={0.2}>
            <div className="grid items-center gap-10 px-6 pt-12  pb-0 sm:px-10  lg:grid-cols-[1fr_minmax(280px,420px)] lg:gap-14 lg:px-12 xl:gap-16">
              <div className="order-2 text-center lg:order-1 lg:text-left">
                <div className="relative mx-auto mb-8 h-20 w-20 lg:mx-0">
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "conic-gradient(from 180deg, #3A8FA3, #6b6ec8, #C0516A, #3A8FA3)",
                      filter: "blur(2px)",
                    }}
                  />
                  <span
                    className="absolute -inset-2 rounded-full border border-[#3A8FA3]/30"
                    style={{ animation: "tr-pulseRing 2.4s ease-out infinite" }}
                  />
                  <span
                    className="absolute -inset-2 rounded-full border border-[#C0516A]/30"
                    style={{ animation: "tr-pulseRing 2.4s ease-out infinite 1.2s" }}
                  />
                  <span className="absolute inset-[3px] flex items-center justify-center rounded-full bg-white shadow-[inset_0_2px_6px_rgba(0,0,0,.08)]">
                    <span
                      className="flex h-14 w-14 items-center justify-center rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #3A8FA3 0%, #6b6ec8 60%, #8a5fb8 100%)",
                      }}
                    >
                      <Video className="h-7 w-7 text-white" strokeWidth={2.2} />
                    </span>
                  </span>
                </div>

                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.28em] text-[#C0516A]">
                  Tele-Rehabilitation
                </p>

                <h2 className="heading-display text-[2rem] leading-[1.08] text-navy sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]">
                  Can&apos;t travel?
                  <br />
                  <span className="font-display italic">Recover from home.</span>
                </h2>

                <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[1.7] text-[var(--body-text)] sm:text-[17px] lg:mx-0">
                  Our Tele-Rehab program brings world-class cardiopulmonary care to your living room.
                  Live, supervised group sessions with Dr. Deepali -   secure, interactive, and just as effective.
                </p>

                <SectionPageLink href="/how-it-works" className="mt-6 justify-center lg:justify-start">
                  Learn how tele-rehab works
                </SectionPageLink>

                <div className="mt-10 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener"
                    className="tr-cta motion-btn inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-white shadow-[0_14px_40px_-12px_rgba(58,143,163,.55)] transition-transform hover:-translate-y-0.5"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Book Your Free Rehab Call
                  </a>
                  <a
                    href={`tel:${PHONE}`}
                    className="motion-btn inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/70 px-6 py-4 font-semibold text-navy backdrop-blur transition-colors hover:border-[#C0516A]/40 hover:text-[#C0516A]"
                  >
                    <Phone className="h-4 w-4" /> {PHONE}
                  </a>
                </div>
              </div>

              <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
                <div className="w-full max-w-[16rem] overflow-hidden rounded-[28px] border border-white/80 bg-gradient-to-br from-white/90 via-white/70 to-[var(--primary-soft)]/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_20px_48px_-20px_rgba(44,62,80,0.22)] sm:max-w-[18rem] lg:max-w-[20rem] xl:max-w-[22rem]">
                  <div className="relative p-4 sm:p-5">
                    <TeleRehabSessionClip
                      src={DR_DEEPALI_FEATURED_VIDEO}
                      poster={DR_DEEPALI_SESSION_POSTER}
                    />
                    <p className="mt-4 text-center font-sans-brand text-[13px] font-medium leading-snug text-navy/70">
                      Supervised sessions from anywhere in India
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="border-t border-white/60 px-4 py-4 sm:px-10 sm:py-5 lg:px-12 lg:pb-14">
            {/* Mobile: compact title-only list */}
            <ul className="mx-auto flex max-w-6xl flex-col gap-1.5 md:hidden">
              {features.map(({ Icon, t }) => (
                <li
                  key={t}
                  className="flex items-center gap-3 rounded-xl border border-navy/[0.06] bg-white/70 px-3 py-2.5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#C0516A]/10">
                    <Icon className="h-3.5 w-3.5 text-[#C0516A]" strokeWidth={2} />
                  </span>
                  <span className="font-sans-brand text-[13px] font-semibold leading-snug text-navy">
                    {t}
                  </span>
                </li>
              ))}
            </ul>

            {/* Tablet+: full feature cards */}
            <StaggerReveal
              as="ul"
              className="mx-auto hidden max-w-6xl grid-cols-2 gap-3 md:grid lg:grid-cols-5"
              itemVariant="scaleIn"
              amount={0.15}
            >
              {features.map(({ Icon, t, d }) => (
                <StaggerItem
                  key={t}
                  as="li"
                  className="group motion-card rounded-xl border border-navy/10 bg-white/80 p-3 text-left backdrop-blur-sm sm:rounded-2xl sm:p-4 hover:border-[#C0516A]/40 hover:shadow-[0_8px_24px_-12px_rgba(192,81,106,.35)]"
                >
                  <div className="flex items-center gap-2 sm:gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C0516A]/10 transition-colors group-hover:bg-[#C0516A] sm:h-9 sm:w-9 sm:rounded-xl">
                      <Icon className="h-3.5 w-3.5 text-[#C0516A] transition-colors group-hover:text-white sm:h-4 sm:w-4" />
                    </span>
                    <h4 className="font-display text-[12px] font-bold leading-snug text-navy sm:text-[13px] sm:leading-tight">
                      {t}
                    </h4>
                  </div>
                  <p className="mt-2.5 hidden text-[12px] leading-relaxed text-[var(--body-text)] md:block">
                    {d}
                  </p>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function DecoIcon({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div className={`hidden sm:block ${className}`} style={{ animationDelay: `${delay}s` }} aria-hidden>
      {children}
    </div>
  );
}

function IconTile({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-11 w-11 rounded-2xl bg-white shadow-[0_6px_18px_-8px_rgba(44,62,80,.25)] border border-black/[0.03] flex items-center justify-center">
      {children}
    </div>
  );
}
