import type { MetadataRoute } from "next";
import { programCategories } from "@/components/pulse-landing/conditions-data";
import { categorySlug } from "@/components/pulse-landing/ProgramCatalog";
import { BLOG_POSTS } from "@/components/pulse-landing/blog-data";

const BASE = "https://www.pulsebreathphysiotherapy.in";

function url(path: string, extra?: Omit<MetadataRoute.Sitemap[number], "url">): MetadataRoute.Sitemap[number] {
  return { url: `${BASE}${path}`, ...extra };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  /* ── Static pages ── */
  const staticPages: MetadataRoute.Sitemap = [
    url("/", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    }),
    url("/services", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    }),
    url("/new-batch", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    }),
    url("/about", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    }),
    url("/contact", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
    url("/how-it-works", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    }),
    url("/faqs", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }),
    url("/blog", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  ];

  /* ── Service category pages ── */
  const categoryPages: MetadataRoute.Sitemap = programCategories.map((cat) => {
    const slug = categorySlug(cat.cat);
    return url(`/services/${slug}`, {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  });

  /* ── Individual program pages ── */
  const programPages: MetadataRoute.Sitemap = programCategories.flatMap((cat) => {
    const catSl = categorySlug(cat.cat);
    return cat.programs.map((program) =>
      url(`/services/${catSl}/${program.slug}`, {
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      }),
    );
  });

  /* ── Blog article pages ── */
  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) =>
    url(`/blog/${post.slug}`, {
      lastModified: new Date(post.publishedAt),
      changeFrequency: "yearly",
      priority: 0.65,
    }),
  );

  return [...staticPages, ...categoryPages, ...programPages, ...blogPages];
}
