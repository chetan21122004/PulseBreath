import type { Metadata } from "next";
import { BlogsPage } from "@/components/pages/BlogsPage";
import { BLOG_OVERVIEW } from "@/components/pulse-landing/blog-data";

export const metadata: Metadata = {
  title: "Articles & Patient Education | PulseBreath Physiotherapy",
  description: BLOG_OVERVIEW,
};

export default function Blog() {
  return <BlogsPage />;
}
