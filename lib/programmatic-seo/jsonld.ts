import { SITE_NAME, SITE_URL } from "@/lib/seo";
import type { ProgrammaticSeoPage, SeoPerson, SeoReference } from "./types";

export function buildProgrammaticJsonLd({
  page,
  author,
  reviewer,
  references,
}: {
  page: ProgrammaticSeoPage;
  author?: SeoPerson;
  reviewer?: SeoPerson;
  references: SeoReference[];
}) {
  const pageUrl = `${SITE_URL}${page.path}`;
  const person = (value?: SeoPerson) =>
    value
      ? {
          "@type": "Person",
          name: `${value.name} (${value.honorificSuffix})`,
          url: `${SITE_URL}${value.profilePath}`,
          jobTitle: value.role,
        }
      : undefined;

  const article = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "Article"],
    "@id": `${pageUrl}#article`,
    url: pageUrl,
    headline: page.content.h1,
    name: page.metadata.title,
    description: page.metadata.description,
    inLanguage: page.locale,
    datePublished: page.publication.createdAt,
    dateModified: page.publication.updatedAt,
    author:
      page.evidence.medicalReview.status === "approved"
        ? person(author)
        : { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    ...(page.evidence.medicalReview.status === "approved" && reviewer
      ? {
          reviewedBy: person(reviewer),
          lastReviewed: page.evidence.medicalReview.reviewedAt,
        }
      : {}),
    about: {
      "@type": "MedicalCondition",
      name: page.taxonomy.conditionName,
    },
    citation: references.map((reference) => reference.url),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const breadcrumb = {
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
      { "@type": "ListItem", position: 3, name: page.content.h1, item: pageUrl },
    ],
  };

  return [article, breadcrumb];
}
