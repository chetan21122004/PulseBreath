import Link from "next/link";
import { ArrowRight, HeartPulse, Wind, Droplet } from "lucide-react";
const careMonitoring = "/assets/care-monitoring.jpg";
const careAdherence = "/assets/care-adherence.jpg";
const careAwareness = "/assets/care-awareness.jpg";
import { PROGRAM_ROUTES } from "./constants";
import { Reveal, StaggerItem, StaggerReveal } from "./motion";
import { SectionIllustration } from "./SectionIllustration";
import { SectionPageLink } from "./SectionPageLink";
import { SectionWaveBg } from "./SectionWaveBg";
import { ILLUSTRATIONS } from "./visual-assets";

const pillars = [
  {
    slug: "cardiac" as const,
    icon: HeartPulse,
    title: "Cardiac Rehabilitation",
    conditions: "After bypass · Angioplasty · Heart failure · Valve replacement",
    image: careMonitoring,
    cta: "View Cardiac Programs",
  },
  {
    slug: "pulmonary" as const,
    icon: Wind,
    title: "Pulmonary Rehabilitation",
    conditions:
      "COPD, ILD, asthma, bronchiectasis, pulmonary hypertension, occupational lung diseases, post lung surgery",
    image: careAdherence,
    cta: "View Pulmonary Programs",
  },
  {
    slug: "metabolic" as const,
    icon: Droplet,
    title: "Metabolic & Lifestyle",
    conditions: "Diabetes · Obesity · Thyroid",
    image: careAwareness,
    cta: "View Metabolic Programs",
  },
];

export function Conditions() {
  return (
    <section id="programs" className="relative max-md:snap-align-none snap-start overflow-hidden bg-section pb-5">
      <SectionWaveBg idPrefix="programs-wave" />

      <svg
        className="pointer-events-none absolute inset-x-0 top-32 z-0 h-32 w-full opacity-[0.04]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M0,60 L220,60 L238,60 L252,35 L268,85 L282,20 L298,92 L312,60 L520,60 L538,60 L552,38 L568,78 L582,25 L598,88 L612,60 L1200,60"
          fill="none"
          stroke="var(--brand-pink)"
          strokeWidth="1.75"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal variant="fadeUp" className="text-center lg:text-left">
            <span className="pill">Programs</span>
            <h2 className="heading-display mt-5 text-[2rem] sm:text-4xl lg:text-[2.75rem]">
              Rehabilitation Designed Around Your Health,{" "}
              <span className="font-display italic text-brand">Not Just Your Diagnosis</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans-brand text-[15px] leading-relaxed text-navy/85 sm:text-base lg:mx-0">
              Our specialist-led cardiac, pulmonary, and metabolic rehabilitation programs are
              tailored to your unique needs, goals, and limitations. Every step of your journey is
              personally guided by Dr. Deepali, ensuring expert care beyond a conventional exercise
              program.
            </p>
            <SectionPageLink href="/services" className="mt-5">
              View all services
            </SectionPageLink>
          </Reveal>
          <SectionIllustration
            src={ILLUSTRATIONS.cardiologistBro}
            alt="Cardiologist providing specialized heart care"
            className="mx-auto max-w-sm lg:max-w-md lg:px-0"
            variant="fadeLeft"
          />
        </div>

        <StaggerReveal
          className="mt-10 grid gap-6 md:grid-cols-3"
          itemVariant="scaleIn"
          amount={0.12}
        >
          {pillars.map(({ slug, icon: Icon, title, conditions, image, cta }) => (
            <StaggerItem key={slug}>
              <Link
                href={PROGRAM_ROUTES[slug]}
                className="motion-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/55 shadow-[0_20px_60px_-30px_rgba(30,46,61,0.35)] backdrop-blur-xl hover:shadow-[0_30px_80px_-30px_rgba(176,64,96,0.4)]"
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute -top-1/2 -left-1/3 h-full w-2/3 rotate-12 bg-gradient-to-br from-white/70 to-transparent opacity-60" />
                </div>

                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    width={700}
                    height={525}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, var(--brand-dark), rgba(44,62,80,0.35), transparent)",
                    }}
                  />
                  <span className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/90 shadow-sm">
                    <Icon className="h-5 w-5 text-brand" strokeWidth={1.6} />
                  </span>
                </div>

                <div className="relative flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-navy sm:text-2xl">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/80">{conditions}</p>
                  <span className="motion-link-arrow mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand transition-all group-hover:gap-3">
                    {cta}
                    <ArrowRight className="motion-link-arrow-icon h-4 w-4" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
