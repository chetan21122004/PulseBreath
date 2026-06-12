import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgramCategoryPage } from "@/components/pulse-landing/ProgramCategoryPage";
import { PROGRAM_ROUTES, type ProgramSlug } from "@/components/pulse-landing/constants";
import { getAllCategoryParams, getCategoryBySlug } from "@/components/pulse-landing/ProgramCatalog";

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

  return {
    title: `${cat.cat} Rehabilitation Programs | PulseBreath Physiotherapy`,
    description: cat.desc,
  };
}

export default async function ServiceCategoryRoute({ params }: PageProps) {
  const { category } = await params;
  const slug = category as ProgramSlug;

  if (!getCategoryBySlug(slug) || !(slug in PROGRAM_ROUTES)) {
    notFound();
  }

  return <ProgramCategoryPage slug={slug} />;
}
