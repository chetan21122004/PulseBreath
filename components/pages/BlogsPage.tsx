import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { BlogCard } from "@/components/pulse-landing/BlogCard";
import {
  BLOG_OVERVIEW,
  formatBlogDate,
  getAllPosts,
  type BlogPost,
} from "@/components/pulse-landing/blog-data";
import { BackgroundBlob } from "@/components/pulse-landing/BackgroundBlob";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/pulse-landing/motion";
import { SectionPageLink } from "@/components/pulse-landing/SectionPageLink";

export function BlogsPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        pill="Articles & Insights"
        title={
          <>
            Patient education from{" "}
            <span className="font-display italic text-brand">Dr. Deepali.</span>
          </>
        }
        description={BLOG_OVERVIEW}
      />

      <PageSection variant="section" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <BackgroundBlob variant={2} cover opacity={0.08} />
        </div>

        <div className="relative z-10">
          <Reveal variant="fadeUp">
            <p className="section-label mb-2">Latest articles</p>
            <p className="max-w-2xl font-sans-brand text-[15px] leading-relaxed text-navy/80">
              Practical guidance on cardiac and pulmonary recovery, breathlessness, and supervised
              tele-rehabilitation — grounded in clinical practice, not trends.
            </p>
          </Reveal>

          <StaggerReveal
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            itemVariant="fadeUp"
            amount={0.1}
          >
            {posts.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerReveal>

          <Reveal variant="fadeUp" className="mt-12 rounded-2xl border border-border/80 bg-background/90 px-6 py-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <p className="font-sans-brand text-sm leading-relaxed text-navy/80">
              Want personalised guidance for your condition? Dr. Deepali offers a free assessment —
              no obligation.
            </p>
            <SectionPageLink href="/contact" className="mt-4 shrink-0 sm:mt-0">
              Book free assessment
            </SectionPageLink>
          </Reveal>
        </div>
      </PageSection>
    </>
  );
}

export function BlogArticleBody({ post }: { post: BlogPost }) {
  return (
    <article className="prose-blog mx-auto max-w-3xl">
      {post.blocks.map((block, index) => {
        if (block.type === "h2") {
          return (
            <h2
              key={index}
              className="mt-10 font-display text-2xl font-bold leading-snug text-navy first:mt-0"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={index} className="mt-4 space-y-2.5">
              {block.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-sans-brand text-[15px] leading-relaxed text-navy/85"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={index}
            className="mt-4 font-sans-brand text-[16px] leading-[1.85] text-[var(--body-text)]"
          >
            {block.text}
          </p>
        );
      })}
    </article>
  );
}

export function BlogArticlePage({ post }: { post: BlogPost }) {
  const related = getAllPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageHero
        pill={post.category}
        title={post.title}
        description={post.excerpt}
        className="pb-10 lg:pb-14"
      >
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-sans-brand text-sm text-navy/70">
          <span>{post.author}</span>
          <span aria-hidden>·</span>
          <span>{formatBlogDate(post.publishedAt)}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-brand" strokeWidth={2.25} />
            {post.readMinutes} min read
          </span>
        </div>
        <Link
          href="/blog"
          className="group mt-6 inline-flex items-center gap-1.5 font-sans-brand text-sm font-semibold text-brand transition-colors hover:text-[var(--brand-pink-deep)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          All articles
        </Link>
      </PageHero>

      <PageSection variant="background" className="pt-0">
        <Reveal variant="fadeUp">
          <BlogArticleBody post={post} />
        </Reveal>
      </PageSection>

      {related.length > 0 ? (
        <PageSection variant="section" className="border-t border-border/60">
          <Reveal variant="fadeUp">
            <p className="section-label mb-2">Continue reading</p>
            <h2 className="heading-display text-2xl sm:text-3xl">Related articles</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {related.map((item) => (
              <BlogCard key={item.slug} post={item} />
            ))}
          </div>
        </PageSection>
      ) : null}
    </>
  );
}
