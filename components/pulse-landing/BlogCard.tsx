import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BLOG_CATEGORY_STYLES,
  formatBlogDate,
  type BlogPost,
} from "@/components/pulse-landing/blog-data";

type BlogCardProps = {
  post: BlogPost;
  className?: string;
};

export function BlogCard({ post, className }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "motion-card group flex h-full flex-col rounded-2xl border border-border/80 bg-background p-6 shadow-[0_12px_40px_-24px_rgba(30,46,61,0.16)] ring-1 ring-white/80 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-20px_rgba(30,46,61,0.22)]",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "rounded-full px-2.5 py-0.5 font-sans-brand text-[10px] font-bold uppercase tracking-[0.12em]",
            BLOG_CATEGORY_STYLES[post.category],
          )}
        >
          {post.category}
        </span>
        <span className="flex items-center gap-1 font-sans-brand text-[11px] font-medium text-muted-foreground">
          <Clock className="h-3 w-3" />
          {post.readMinutes} min read
        </span>
      </div>

      <h3 className="mt-4 font-display text-xl font-bold leading-snug text-navy transition-colors group-hover:text-brand">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 font-sans-brand text-[15px] leading-relaxed text-navy/75">
        {post.overview}
      </p>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
        <span className="font-sans-brand text-xs font-medium text-muted-foreground">
          {formatBlogDate(post.publishedAt)}
        </span>
        <span className="inline-flex items-center gap-1 font-sans-brand text-[13px] font-semibold text-brand">
          Read article
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
