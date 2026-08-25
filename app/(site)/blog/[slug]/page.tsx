import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/pages/BlogsPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getAllPostSlugs,
  getPostBySlug,
  getPostReferences,
} from "@/components/pulse-landing/blog-data";
import { createPageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article | PulseBreath" };

  return createPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
  });
}

export default async function BlogArticle({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${slug}`;
  const references = getPostReferences(post);
  const articleLd = {
    "@context": "https://schema.org",
    "@type": ["BlogPosting", "MedicalWebPage"],
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${SITE_URL}/opengraph-image`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/about#dr-deepali-shah`,
      name: "Dr. Deepali Shah",
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/pulsebreath-logo.png` },
    },
    articleSection: post.category,
    inLanguage: "en-IN",
    isAccessibleForFree: true,
    citation: references.map((reference) => reference.url),
    about: [post.category, "Cardiopulmonary rehabilitation", "Physiotherapy"],
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Articles", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />
      <BlogArticlePage post={post} />
    </>
  );
}
