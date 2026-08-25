import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartPulse, ShieldCheck, Stethoscope, Wind } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { getIndexableSeoManifests } from "@/lib/programmatic-seo/catalog";
import { createPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

const title = "Rehabilitation Guides for Heart, Lung and Metabolic Health";
const description =
  "Clinically reviewed guides to cardiac, pulmonary and metabolic rehabilitation, including suitability, safety, monitoring and supervised online care across India.";

export const metadata: Metadata = createPageMetadata({
  title,
  description,
  path: "/rehabilitation",
});

const serviceLines = [
  {
    title: "Pulmonary rehabilitation",
    description: "COPD, bronchiectasis, ILD, asthma and recovery after lung surgery.",
    href: "/services/pulmonary",
    icon: Wind,
  },
  {
    title: "Cardiac rehabilitation",
    description: "Recovery after angioplasty, heart attack, bypass surgery and stable heart conditions.",
    href: "/services/cardiac",
    icon: HeartPulse,
  },
  {
    title: "Metabolic exercise programs",
    description: "Supervised exercise pathways for diabetes, obesity and thyroid-related limitations.",
    href: "/services/metabolic",
    icon: Stethoscope,
  },
] as const;

export default function RehabilitationGuidesPage() {
  const approvedGuides = getIndexableSeoManifests();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url: `${SITE_URL}/rehabilitation`,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Rehabilitation guides",
          item: `${SITE_URL}/rehabilitation`,
        },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <header className="border-b border-border/70 bg-[linear-gradient(135deg,var(--background),var(--section-grey))] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="section-label text-[var(--brand-teal-deep)]">Clinical learning centre</p>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-bold leading-tight text-navy sm:text-4xl lg:text-5xl">
            Rehabilitation guidance built around real patient decisions
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-navy/72 sm:text-lg">
            Understand what rehabilitation involves, who may be suitable, how supervised exercise is monitored, and when hospital or centre-based care is the safer choice. Every condition guide must pass an editorial and clinical review before it appears here.
          </p>
        </div>
      </header>

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {serviceLines.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.href} href={service.href} className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <Icon className="h-7 w-7 text-[var(--brand-teal-deep)]" aria-hidden />
                  <h2 className="mt-5 font-display text-xl font-bold text-navy">{service.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-navy/65">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-pink-deep)]">
                    View programs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-section py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="section-label text-[var(--brand-pink-deep)]">Publishing standard</p>
              <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">Why the guide library grows in reviewed batches</h2>
              <p className="mt-5 leading-8 text-navy/70">
                Health pages should not be produced by replacing one condition or city name with another. A publishable PulseBreath guide needs a distinct patient question, condition-specific safety information, authoritative references, clear authorship and a recorded clinical review date.
              </p>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {[
                "Condition- and recovery-stage-specific assessment",
                "Eligibility, limitations and urgent red flags",
                "Named clinical author and reviewer",
                "Authoritative sources and real update dates",
                "A self-canonical URL and bounded internal links",
                "No city pages without verified local value",
              ].map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-border bg-white p-4 text-sm leading-6 text-navy/75">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-teal)]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {approvedGuides.length ? (
        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="section-label text-[var(--brand-teal-deep)]">Reviewed guides</p>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">Browse by patient question</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {approvedGuides.map((guide) => (
                <Link key={guide.id} href={guide.path} className="group rounded-2xl border border-border bg-white p-5 shadow-sm hover:shadow-md">
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--brand-teal-deep)]">{guide.conditionName}</p>
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug text-navy">{guide.h1}</h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-navy/65">{guide.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand-pink-deep)]">Read guide <ArrowRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
