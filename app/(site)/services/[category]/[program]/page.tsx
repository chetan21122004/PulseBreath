import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceProgramPage } from "@/components/pages/ServiceProgramPage";
import { PROGRAM_ROUTES, type ProgramSlug } from "@/components/pulse-landing/constants";
import { getAllProgramParams, getProgramBySlugs } from "@/components/pulse-landing/ProgramCatalog";

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
    title: `${result.program.t} | PulseBreath Physiotherapy`,
    description: result.program.intro,
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

  return <ServiceProgramPage categorySlug={catSlug} programSlug={program} />;
}
