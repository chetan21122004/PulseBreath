import type { MetadataRoute } from "next";
import { programCategories } from "@/components/pulse-landing/conditions-data";
import { categorySlug } from "@/components/pulse-landing/ProgramCatalog";
import { getAllPosts } from "@/components/pulse-landing/blog-data";
import { getIndexableSeoManifests } from "@/lib/programmatic-seo/catalog";
import { SITE_URL } from "@/lib/seo";

const SITE_CONTENT_UPDATED = new Date("2026-09-02");

function url(path: string, extra?: Omit<MetadataRoute.Sitemap[number], "url">): MetadataRoute.Sitemap[number] {
  return { url: `${SITE_URL}${path}`, ...extra };
}

export default function sitemap(): MetadataRoute.Sitemap {
  /* ── Static pages ── */
  const staticPages: MetadataRoute.Sitemap = [
    url("/", { lastModified: SITE_CONTENT_UPDATED }),
    url("/services", { lastModified: SITE_CONTENT_UPDATED }),
    url("/sessions", { lastModified: SITE_CONTENT_UPDATED }),
    url("/about", { lastModified: SITE_CONTENT_UPDATED }),
    url("/contact", { lastModified: SITE_CONTENT_UPDATED }),
    url("/how-it-works", { lastModified: SITE_CONTENT_UPDATED }),
    url("/faqs", { lastModified: SITE_CONTENT_UPDATED }),
    url("/blog", { lastModified: SITE_CONTENT_UPDATED }),
    url("/rehabilitation", { lastModified: SITE_CONTENT_UPDATED }),
    url("/privacy", { lastModified: SITE_CONTENT_UPDATED }),
  ];

  /* ── Service category pages ── */
  const categoryPages: MetadataRoute.Sitemap = programCategories.map((cat) => {
    const slug = categorySlug(cat.cat);
    return url(`/services/${slug}`, {
      lastModified: SITE_CONTENT_UPDATED,
    });
  });

  /* ── Individual program pages ── */
  const programPages: MetadataRoute.Sitemap = programCategories.flatMap((cat) => {
    const catSl = categorySlug(cat.cat);
    return cat.programs.map((program) =>
      url(`/services/${catSl}/${program.slug}`, {
        lastModified: SITE_CONTENT_UPDATED,
      }),
    );
  });

  /* ── Blog article pages ── */
  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) =>
    url(`/blog/${post.slug}`, {
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
    }),
  );

  /* ── Clinically approved programmatic guides only ── */
  const programmaticPages: MetadataRoute.Sitemap = getIndexableSeoManifests().map((page) =>
    url(page.path, { lastModified: new Date(page.lastModified) }),
  );

  return [...staticPages, ...categoryPages, ...programPages, ...blogPages, ...programmaticPages];
}
