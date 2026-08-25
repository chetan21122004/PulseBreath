import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProgrammaticSeoPageView } from "@/components/seo/ProgrammaticSeoPageView";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getPreRenderedSeoManifests,
  getRelatedSeoManifests,
  getSeoManifestBySlug,
  getSeoPerson,
  getSeoReferences,
  isIndexableSeoManifest,
  isPublishableSeoManifest,
  loadSeoPage,
} from "@/lib/programmatic-seo/catalog";
import { buildProgrammaticJsonLd } from "@/lib/programmatic-seo/jsonld";
import { createPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ slug: string[] }> };

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return getPreRenderedSeoManifests().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const manifest = getSeoManifestBySlug(slug);
  if (!manifest) return { title: "Guide Not Found", robots: { index: false, follow: false } };

  const metadata = createPageMetadata({
    title: manifest.title,
    description: manifest.description,
    path: manifest.path,
    type: "article",
    modifiedTime: manifest.lastModified,
  });
  if (!isIndexableSeoManifest(manifest)) {
    metadata.robots = { index: false, follow: false, noarchive: true };
  }
  return metadata;
}

export default async function ProgrammaticSeoRoute({ params }: PageProps) {
  const { slug } = await params;
  const manifest = getSeoManifestBySlug(slug);
  if (!manifest) notFound();

  const publishable = isPublishableSeoManifest(manifest);
  if (process.env.NODE_ENV === "production" && !publishable) notFound();

  const page = await loadSeoPage(manifest);
  if (!page) notFound();

  const author = getSeoPerson(page.evidence.authorId);
  const reviewer = getSeoPerson(page.evidence.assignedReviewerId);
  const references = getSeoReferences(page.evidence.referenceIds);
  const relatedPages = getRelatedSeoManifests(page);
  const jsonLd = buildProgrammaticJsonLd({ page, author, reviewer, references });

  return (
    <>
      <JsonLd data={jsonLd} />
      <ProgrammaticSeoPageView
        page={page}
        author={author}
        references={references}
        relatedPages={relatedPages}
        preview={!publishable}
      />
    </>
  );
}
