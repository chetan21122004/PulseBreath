import type { Metadata } from "next";
import { BlogsPage } from "@/components/pages/BlogsPage";
import { BLOG_OVERVIEW } from "@/components/pulse-landing/blog-data";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Articles & Patient Education",
  description: BLOG_OVERVIEW,
  path: "/blog",
});

export default function Blog() {
  return <BlogsPage />;
}
