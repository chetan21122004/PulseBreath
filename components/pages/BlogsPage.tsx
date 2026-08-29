import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { BlogCard } from "@/components/pulse-landing/BlogCard";
import {
  BLOG_OVERVIEW,
  formatBlogDate,
  getAllPosts,
  getPostReferences,
  type BlogPost,
} from "@/components/pulse-landing/blog-data";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/pulse-landing/motion";
import { SectionPageLink } from "@/components/pulse-landing/SectionPageLink";
import { ENQUIRY_HREF } from "@/components/pulse-landing/constants";

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

      <PageSection variant="section">
        <Reveal variant="fadeUp">
          <p className="section-label mb-2">Latest articles</p>
          <p className="max-w-2xl font-sans-brand text-[15px] leading-relaxed text-navy/80">
            Practical guidance on cardiac and pulmonary recovery, breathlessness, and supervised
            tele-rehabilitation - grounded in clinical practice, not trends.
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
          <SectionPageLink href={ENQUIRY_HREF} className="mt-4 shrink-0 sm:mt-0">
            Book free assessment
          </SectionPageLink>
        </Reveal>
      </PageSection>
    </>
  );
}

export function BlogArticleBody({ post }: { post: BlogPost }) {
  const references = getPostReferences(post);

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
        if (block.type === "img") {
          return (
            <figure
              key={index}
              className="mx-auto mt-8 max-w-md overflow-hidden rounded-2xl border border-border/70 bg-white sm:max-w-lg"
            >
              <img
                src={block.src}
                alt={block.alt}
                loading="lazy"
                className="mx-auto h-auto max-h-[280px] w-full object-contain p-3 sm:max-h-[320px]"
              />
              {block.caption ? (
                <figcaption className="border-t border-border/60 px-4 py-3 font-sans-brand text-sm leading-relaxed text-navy/65">
                  {block.caption}
                </figcaption>
              ) : null}
            </figure>
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

      <section className="mt-12 border-t border-border/80 pt-8" aria-labelledby="references-heading">
        <h2 id="references-heading" className="font-display text-2xl font-bold text-navy">
          Clinical references
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Primary professional guidance used to support the clinical context in this article.
        </p>
        <ol className="mt-5 space-y-3">
          {references.map((reference) => (
            <li key={reference.url} className="rounded-xl border border-border/75 bg-white/80 p-4">
              <a
                href={reference.url}
                rel="external"
                className="group flex items-start justify-between gap-4 font-semibold leading-relaxed text-navy transition-colors hover:text-brand"
              >
                <span>
                  {reference.title}
                  <span className="mt-1 block text-xs font-medium text-muted-foreground">
                    {reference.publisher}
                  </span>
                </span>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden />
              </a>
            </li>
          ))}
        </ol>
      </section>

      <aside className="mt-8 rounded-2xl border border-[var(--brand-teal)]/25 bg-[var(--brand-teal-soft)]/45 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-teal-deep)]" aria-hidden />
          <div>
            <h2 className="font-display text-xl font-bold text-navy">About this medical content</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy/80">
              Written by{" "}
              <Link href="/about" className="font-semibold text-brand underline-offset-4 hover:underline">
                Dr. Deepali Shah (PT)
              </Link>
              , MPT Cardiopulmonary Sciences (Gold Medalist), and updated on{" "}
              {formatBlogDate(post.updatedAt ?? post.publishedAt)}. This article provides general
              education and does not replace assessment by your treating doctor or physiotherapist.
            </p>
          </div>
        </div>
      </aside>
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
          <Link href="/about" className="font-semibold text-brand underline-offset-4 hover:underline">
            {post.author}
          </Link>
          <span aria-hidden>·</span>
          <span>{formatBlogDate(post.publishedAt)}</span>
          {post.updatedAt && post.updatedAt !== post.publishedAt ? (
            <>
              <span aria-hidden>·</span>
              <span>Updated {formatBlogDate(post.updatedAt)}</span>
            </>
          ) : null}
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
        <Reveal variant="fadeUp" amount="some">
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
