import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceProgramPage } from "@/components/pages/ServiceProgramPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  PROGRAM_ROUTES,
  SITE_URL,
  type ProgramSlug,
} from "@/components/pulse-landing/constants";
import { buildProgramFaqs } from "@/components/pulse-landing/conditions-data";
import { getAllProgramParams, getProgramBySlugs } from "@/components/pulse-landing/ProgramCatalog";
import { createPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ category: string; program: string }>;
};

export function generateStaticParams() {
  return getAllProgramParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, program } = await params;
  const result = getProgramBySlugs(category, program);
  if (!result) return { title: "Program Not Found" };

  return {
    ...createPageMetadata({
      title: result.program.t,
      description: result.program.intro,
      path: `/services/${category}/${program}`,
      type: "article",
    }),
    keywords: [
      result.program.t,
      result.category.tag,
      `${result.category.cat} rehabilitation`,
      ...(result.program.includes ?? []),
      "physiotherapy",
      "tele-rehabilitation",
      "Dr. Deepali Shah",
    ],
  };
}

export default async function ServiceProgramRoute({ params }: PageProps) {
  const { category, program } = await params;
  const catSlug = category as ProgramSlug;

  if (!(catSlug in PROGRAM_ROUTES)) {
    notFound();
  }

  const result = getProgramBySlugs(catSlug, program);
  if (!result) {
    notFound();
  }

  const url = `${SITE_URL}/services/${catSlug}/${program}`;
  const faqs = buildProgramFaqs(result.program);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: result.category.cat,
        item: `${SITE_URL}/services/${catSlug}`,
      },
      { "@type": "ListItem", position: 4, name: result.program.t, item: url },
    ],
  };

  const therapyLd = {
    "@context": "https://schema.org",
    "@type": "MedicalTherapy",
    name: result.program.t,
    url,
    description: result.program.intro,
    howPerformed: result.program.involves,
    medicineSystem: "https://schema.org/WesternConventional",
    relevantSpecialty: "Physiotherapy",
    provider: {
      "@type": "MedicalBusiness",
      name: "PulseBreath Physiotherapy",
      url: SITE_URL,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: Array.isArray(faq.a) ? faq.a.join(" ") : faq.a,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={therapyLd} />
      <JsonLd data={faqLd} />
      <ServiceProgramPage categorySlug={catSlug} programSlug={program} />
    </>
  );
}
