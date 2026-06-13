import {
  BLOG_OVERVIEW,
  getFeaturedPosts,
} from "@/components/pulse-landing/blog-data";
import { BlogCard } from "@/components/pulse-landing/BlogCard";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/pulse-landing/motion";
import { SectionPageLink } from "@/components/pulse-landing/SectionPageLink";

export function BlogTeaser() {
  const posts = getFeaturedPosts(3);

  return (
    <section id="articles" className="relative border-b border-border bg-section py-14 lg:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal variant="fadeUp" className="mx-auto max-w-2xl text-center">
          <span className="pill">Articles & Insights</span>
          <h2 className="heading-display mt-5 text-[2rem] sm:text-4xl">
            Evidence-led guidance for{" "}
            <span className="font-display italic text-brand">patients & families.</span>
          </h2>
          <p className="mt-4 font-sans-brand text-[15px] leading-relaxed text-navy/85 sm:text-base">
            {BLOG_OVERVIEW}
          </p>
        </Reveal>

        <StaggerReveal
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          itemVariant="fadeUp"
          amount={0.1}
        >
          {posts.map((post) => (
            <StaggerItem key={post.slug} className="h-full">
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </StaggerReveal>

        <Reveal variant="fadeUp" className="mt-10 text-center">
          <SectionPageLink href="/blog" className="justify-center">
            Browse all articles
          </SectionPageLink>
        </Reveal>
      </div>
    </section>
  );
}
