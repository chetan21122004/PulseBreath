'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROGRAM_ROUTES } from "./constants";
import { programCategories } from "./conditions-data";
import { categorySlug, getProgramHref } from "./ProgramCatalog";

const navLinkClass =
  "group relative rounded-full px-3.5 py-2.5 font-sans-brand text-[11px] font-bold uppercase tracking-[0.11em] transition-[color,background-color,box-shadow] hover:bg-white hover:text-[var(--brand-pink)] hover:shadow-[0_2px_12px_rgba(176,64,96,0.12)] xl:px-4";

type ServicesMegaMenuDesktopProps = {
  isActive: boolean;
};

export function ServicesMegaMenuDesktop({ isActive }: ServicesMegaMenuDesktopProps) {
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
        <span className="absolute inset-x-3.5 bottom-2 h-px origin-left scale-x-0 bg-[var(--brand-pink)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/static:scale-x-100 xl:inset-x-4" />
      </Link>

      <div
        className={cn(
          "pointer-events-none absolute left-1/2 top-full z-50 w-[min(92vw,720px)] -translate-x-1/2 pt-2",
          "opacity-0 transition-[opacity,transform] duration-200 ease-out motion-safe:-translate-y-1",
          "group-hover/static:pointer-events-auto group-hover/static:opacity-100 motion-safe:group-hover/static:translate-y-0",
          "group-focus-within/static:pointer-events-auto group-focus-within/static:opacity-100 motion-safe:group-focus-within/static:translate-y-0",
        )}
      >
        <div
          className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-[0_18px_48px_-24px_rgba(30,46,61,0.22)]"
          role="menu"
          aria-label="Services menu"
        >
          <div className="grid grid-cols-3 gap-8">
            {programCategories.map((cat) => {
              const slug = categorySlug(cat.cat);
              return (
                <div key={cat.cat} role="none">
                  <Link
                    href={PROGRAM_ROUTES[slug]}
                    className="font-display text-base font-bold text-navy transition-colors hover:text-[var(--brand-pink)]"
                    role="menuitem"
                  >
                    {cat.cat}
                  </Link>
                  <ul className="mt-3 space-y-2" role="none">
                    {cat.programs.map((program) => (
                      <li key={program.slug} role="none">
                        <Link
                          href={getProgramHref(slug, program.slug)}
                          className="block font-sans-brand text-[13px] leading-snug text-[var(--brand-dark)]/75 transition-colors hover:text-[var(--brand-pink)]"
                          role="menuitem"
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
                    {cat.cat}
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
