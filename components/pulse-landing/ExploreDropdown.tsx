'use client';

import Link from "next/link";
import { BookOpen, ChevronDown, CircleHelp, Route } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { EXPLORE_LINKS } from "./nav-links";

const navLinkClass =
  "group relative inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-2 font-sans-brand text-[10px] font-bold uppercase tracking-[0.09em] transition-[color,background-color,box-shadow] hover:bg-white hover:text-[var(--brand-pink)] hover:shadow-[0_2px_12px_rgba(176,64,96,0.12)] xl:px-3.5 xl:py-2.5 xl:text-[11px] xl:tracking-[0.11em]";

const exploreIcons: Record<string, LucideIcon> = {
  FAQs: CircleHelp,
  "How It Works": Route,
  Articles: BookOpen,
};

const exploreDescriptions: Record<string, string> = {
  FAQs: "Common questions answered",
  "How It Works": "Four steps from first call to recovery",
  Articles: "Guides on safe rehab and tele-health",
};

type ExploreDropdownDesktopProps = {
  isActive: boolean;
};

export function ExploreDropdownDesktop({ isActive }: ExploreDropdownDesktopProps) {
  return (
    <div className="group/explore relative">
      <button
        type="button"
        className={cn(
          navLinkClass,
          isActive
            ? "bg-white text-[var(--brand-pink)] shadow-[0_2px_12px_rgba(176,64,96,0.12)]"
            : "text-[var(--brand-dark)]/72",
        )}
        aria-haspopup="true"
        aria-expanded={false}
      >
        Explore
        <ChevronDown
          className="h-3 w-3 opacity-60 transition-transform duration-200 group-hover/explore:rotate-180"
          strokeWidth={2.5}
          aria-hidden
        />
        <span className="absolute inset-x-3.5 bottom-2 h-px origin-left scale-x-0 bg-[var(--brand-pink)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/explore:scale-x-100 xl:inset-x-4" />
      </button>

      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-full z-50 w-[min(92vw,17.5rem)] -translate-x-1/2 pt-2",
          "opacity-0 transition-[opacity,transform] duration-200 ease-out motion-safe:-translate-y-1",
          "group-hover/explore:pointer-events-auto group-hover/explore:opacity-100 motion-safe:group-hover/explore:translate-y-0",
          "group-focus-within/explore:pointer-events-auto group-focus-within/explore:opacity-100 motion-safe:group-focus-within/explore:translate-y-0",
        )}
      >
        <div
          className="overflow-hidden rounded-2xl border border-border/80 bg-white p-1.5 shadow-[0_24px_64px_-28px_rgba(30,46,61,0.28)]"
          role="menu"
          aria-label="Explore menu"
        >
          <ul className="space-y-0.5" role="none">
            {EXPLORE_LINKS.map((link) => {
              const Icon = exploreIcons[link.label] ?? CircleHelp;
              const description = exploreDescriptions[link.label];

              return (
                <li key={link.href} role="none">
                  <Link
                    href={link.href}
                    role="menuitem"
                    className="flex items-start gap-2.5 rounded-xl px-2.5 py-2.5 text-left text-navy/80 transition-colors hover:bg-[color-mix(in_oklch,var(--brand-teal-soft)_45%,white)] hover:text-[var(--brand-pink-deep)]"
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-teal-soft)] text-[var(--brand-teal)] ring-1 ring-teal/15">
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-sans-brand text-[11px] font-bold uppercase tracking-[0.08em]">
                        {link.label}
                      </span>
                      {description ? (
                        <span className="mt-0.5 block text-[11px] leading-snug text-navy/50">
                          {description}
                        </span>
                      ) : null}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
