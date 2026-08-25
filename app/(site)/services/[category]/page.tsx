import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramCategoryPage } from "@/components/pulse-landing/ProgramCategoryPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { PROGRAM_ROUTES, type ProgramSlug } from "@/components/pulse-landing/constants";
import { getAllCategoryParams, getCategoryBySlug } from "@/components/pulse-landing/ProgramCatalog";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

type PageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return getAllCategoryParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "Program Not Found" };

  return createPageMetadata({
    title: `${cat.cat} Rehabilitation Programs`,
    description: cat.desc,
    path: `/services/${category}`,
  });
}

export default async function ServiceCategoryRoute({ params }: PageProps) {
  const { category } = await params;
  const slug = category as ProgramSlug;

  if (!getCategoryBySlug(slug) || !(slug in PROGRAM_ROUTES)) {
    notFound();
  }

  const cat = getCategoryBySlug(slug);
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: `${cat?.cat ?? slug} rehabilitation`,
        item: `${SITE_URL}/services/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <ProgramCategoryPage slug={slug} />
    </>
  );
}
