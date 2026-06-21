'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROGRAM_ROUTES } from "./constants";
import { programCategories, type ProgramCategoryTone } from "./conditions-data";
import { categorySlug, getProgramHref } from "./ProgramCatalog";
import { categoryProgramsHeading } from "./ProgramPreview";

const navLinkClass =
  "group relative inline-flex items-center gap-1 rounded-full px-3.5 py-2.5 font-sans-brand text-[11px] font-bold uppercase tracking-[0.11em] transition-[color,background-color,box-shadow] hover:bg-white hover:text-[var(--brand-pink)] hover:shadow-[0_2px_12px_rgba(176,64,96,0.12)] xl:px-4";

const toneRail: Record<
  ProgramCategoryTone,
  { active: string; icon: string; accent: string }
> = {
  rose: {
    active: "bg-white text-[var(--brand-pink-deep)] shadow-sm ring-1 ring-brand/15",
    icon: "bg-[var(--primary-soft)] text-[var(--brand-pink)]",
    accent: "text-[var(--brand-pink)]",
  },
  teal: {
    active: "bg-white text-teal shadow-sm ring-1 ring-teal/20",
    icon: "bg-[var(--brand-teal-soft)] text-teal",
    accent: "text-teal",
  },
  burgundy: {
    active: "bg-white text-[var(--brand-pink-deep)] shadow-sm ring-1 ring-brand/15",
    icon: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    accent: "text-[var(--brand-pink-deep)]",
  },
};

type ServicesMegaMenuDesktopProps = {
  isActive: boolean;
};

export function ServicesMegaMenuDesktop({ isActive }: ServicesMegaMenuDesktopProps) {
  const [activeCat, setActiveCat] = useState(programCategories[0].cat);
  const activeCategory =
    programCategories.find((category) => category.cat === activeCat) ?? programCategories[0];
  const activeSlug = categorySlug(activeCategory.cat);
  const railTone = toneRail[activeCategory.tone];

  return (
    <div className="group/static relative">
      <Link
        href="/services"
        className={cn(
          navLinkClass,
          isActive
            ? "bg-white text-[var(--brand-pink)] shadow-[0_2px_12px_rgba(176,64,96,0.12)]"
            : "text-[var(--brand-dark)]/72",
        )}
        aria-haspopup="true"
      >
        Services
        <ChevronDown
          className="h-3 w-3 opacity-60 transition-transform duration-200 group-hover/static:rotate-180"
          strokeWidth={2.5}
          aria-hidden
        />
        <span className="absolute inset-x-3.5 bottom-2 h-px origin-left scale-x-0 bg-[var(--brand-pink)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/static:scale-x-100 xl:inset-x-4" />
      </Link>

      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-full z-50 w-[min(94vw,880px)] -translate-x-1/2 pt-2",
          "opacity-0 transition-[opacity,transform] duration-200 ease-out motion-safe:-translate-y-1",
          "group-hover/static:pointer-events-auto group-hover/static:opacity-100 motion-safe:group-hover/static:translate-y-0",
          "group-focus-within/static:pointer-events-auto group-focus-within/static:opacity-100 motion-safe:group-focus-within/static:translate-y-0",
        )}
      >
        <div
          className="overflow-hidden rounded-2xl border border-border/80 bg-white shadow-[0_24px_64px_-28px_rgba(30,46,61,0.28)]"
          role="menu"
          aria-label="Services menu"
        >
          <div className="flex min-h-[320px]">
            <aside className="w-[13.5rem] shrink-0 border-r border-border/70 bg-[color-mix(in_oklch,var(--section-grey)_35%,white)] p-3 xl:w-[15rem]">
              <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Specialisations
              </p>
              <ul className="space-y-1" role="none">
                {programCategories.map((category) => {
                  const Icon = category.icon;
                  const selected = category.cat === activeCat;
                  const tone = toneRail[category.tone];

                  return (
                    <li key={category.cat} role="none">
                      <button
                        type="button"
                        role="menuitem"
                        onMouseEnter={() => setActiveCat(category.cat)}
                        onFocus={() => setActiveCat(category.cat)}
                        className={cn(
                          "flex w-full items-start gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition-colors",
                          selected ? tone.active : "text-navy/75 hover:bg-white/70",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                            tone.icon,
                          )}
                        >
                          <Icon className="h-4 w-4" strokeWidth={2} aria-hidden />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display text-[13px] font-bold leading-snug text-navy">
                            {category.cat}
                          </span>
                          <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                            {category.programs.length} programs
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/services"
                role="menuitem"
                className="mt-3 flex items-center gap-1.5 rounded-lg px-2.5 py-2 font-sans-brand text-[11px] font-bold uppercase tracking-[0.1em] text-brand transition-colors hover:bg-white/80"
              >
                Full catalogue
                <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
              </Link>
            </aside>

            <div className="min-w-0 flex-1 p-5 xl:p-6">
              <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    {activeCategory.tag}
                  </p>
                  <h3 className="mt-1 font-display text-lg font-bold leading-snug text-navy xl:text-xl">
                    {categoryProgramsHeading(activeCategory.cat, activeCategory.tag)}
                  </h3>
                  <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-[var(--body-text)] line-clamp-2">
                    {activeCategory.desc}
                  </p>
                </div>
                <Link
                  href={PROGRAM_ROUTES[activeSlug]}
                  role="menuitem"
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1 rounded-full border border-border/80 bg-background px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors hover:border-brand/25 hover:text-brand",
                    railTone.accent,
                  )}
                >
                  View all
                  <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                </Link>
              </div>

              <ul
                className={cn(
                  "mt-4 grid gap-1",
                  activeCategory.programs.length > 4 ? "sm:grid-cols-2" : "grid-cols-1",
                )}
                role="none"
              >
                {activeCategory.programs.map((program) => (
                  <li key={program.slug} role="none">
                    <Link
                      href={getProgramHref(activeSlug, program.slug)}
                      role="menuitem"
                      className="group flex items-start gap-2.5 rounded-xl px-3 py-2.5 transition-colors hover:bg-[color-mix(in_oklch,var(--section-grey)_40%,white)]"
                    >
                      <span
                        className={cn(
                          "mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md opacity-80 transition-opacity group-hover:opacity-100",
                          railTone.icon,
                        )}
                      >
                        <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-sans-brand text-[13px] font-semibold leading-snug text-navy group-hover:text-brand">
                          {program.t}
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-navy/55 line-clamp-1">
                          {program.for}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-border/70 bg-[color-mix(in_oklch,var(--brand-teal-soft)_18%,white)] px-5 py-3">
            <p className="text-[12px] text-navy/70">
              Every program is live-supervised by Dr. Deepali Shah (PT).
            </p>
            <Link
              href="/contact"
              role="menuitem"
              className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-brand hover:underline"
            >
              Book free assessment
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

type ServicesMobileAccordionProps = {
  isActive: boolean;
  onNavigate: () => void;
};

export function ServicesMobileAccordion({ isActive, onNavigate }: ServicesMobileAccordionProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const servicesActive =
    isActive || pathname === "/services" || pathname.startsWith("/services/");

  return (
    <div className="overflow-hidden rounded-xl border border-transparent bg-white/55 shadow-sm ring-1 ring-[var(--border)]/80">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between gap-3 px-4 py-3.5 font-sans-brand text-[15px] font-semibold transition-[border-color,background-color]",
          servicesActive
            ? "border-[var(--brand-pink)]/25 bg-white text-[var(--brand-pink-deep)]"
            : "text-[var(--brand-dark)]",
        )}
      >
        <span>Services</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-[var(--brand-teal)] transition-transform duration-200",
            open && "rotate-180",
          )}
          strokeWidth={2.25}
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 border-t border-[var(--border)]/80 px-4 py-4">
            <Link
              href="/services"
              onClick={onNavigate}
              className="block font-sans-brand text-sm font-semibold text-brand hover:underline"
            >
              All Services
            </Link>
            {programCategories.map((cat) => {
              const slug = categorySlug(cat.cat);
              return (
                <div key={cat.cat}>
                  <Link
                    href={PROGRAM_ROUTES[slug]}
                    onClick={onNavigate}
                    className="font-display text-sm font-bold text-navy"
                  >
                    {categoryProgramsHeading(cat.cat, cat.tag)}
                  </Link>
                  <ul className="mt-2 space-y-1.5 pl-2">
                    {cat.programs.map((program) => (
                      <li key={program.slug}>
                        <Link
                          href={getProgramHref(slug, program.slug)}
                          onClick={onNavigate}
                          className="block font-sans-brand text-[13px] leading-snug text-[var(--brand-dark)]/80 hover:text-[var(--brand-pink)]"
                        >
                          {program.t}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
