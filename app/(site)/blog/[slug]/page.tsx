import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/pages/BlogsPage";
import { getAllPostSlugs, getPostBySlug } from "@/components/pulse-landing/blog-data";

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

  return {
    title: `${post.title} | PulseBreath`,
    description: post.excerpt,
  };
}

export default async function BlogArticle({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return <BlogArticlePage post={post} />;
}
