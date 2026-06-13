import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionPageLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "light" | "hero";
};

export function SectionPageLink({
  href,
  children,
  className,
  variant = "default",
}: SectionPageLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 font-sans-brand text-sm font-semibold transition-colors",
        variant === "hero"
          ? "rounded-full border border-white/25 bg-black/45 px-3.5 py-1.5 text-white shadow-[0_4px_20px_rgba(0,0,0,0.35)] backdrop-blur-sm hover:border-white/45 hover:bg-black/60"
          : variant === "light"
          ? "text-white/80 hover:text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]"
          : "text-brand hover:text-[var(--brand-pink-deep)]",
        className,
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
