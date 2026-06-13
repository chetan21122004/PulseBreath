'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, BookOpen, Route, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type MobileNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive: (pathname: string) => boolean;
};

const MOBILE_NAV_ITEMS: MobileNavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    isActive: (pathname) => pathname === "/",
  },
  {
    label: "Services",
    href: "/services",
    icon: Layers,
    isActive: (pathname) => pathname === "/services" || pathname.startsWith("/services/"),
  },
  {
    label: "Process",
    href: "/how-it-works",
    icon: Route,
    isActive: (pathname) => pathname === "/how-it-works",
  },
  {
    label: "Articles",
    href: "/blog",
    icon: BookOpen,
    isActive: (pathname) => pathname === "/blog" || pathname.startsWith("/blog/"),
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Phone,
    isActive: (pathname) => pathname === "/contact",
  },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-[color-mix(in_oklch,var(--background)_92%,transparent)] shadow-[0_-12px_40px_-20px_rgba(30,46,61,0.22)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-[color-mix(in_oklch,var(--background)_78%,transparent)] lg:hidden"
      aria-label="Mobile primary navigation"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="mx-auto grid h-[var(--bottom-nav-height)] max-w-lg grid-cols-5">
        {MOBILE_NAV_ITEMS.map(({ label, href, icon: Icon, isActive }) => {
          const active = isActive(pathname);

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex min-h-11 flex-col items-center justify-center gap-0.5 px-1 py-1.5 font-sans-brand text-[10px] font-semibold leading-none transition-colors",
                active ? "text-[var(--brand-pink-deep)]" : "text-[var(--brand-dark)]/65",
              )}
            >
              {active ? (
                <span
                  className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-[var(--brand-pink)]"
                  aria-hidden
                />
              ) : null}
              <Icon
                className={cn("h-5 w-5 shrink-0", active ? "text-[var(--brand-pink)]" : "text-[var(--brand-teal)]")}
                strokeWidth={active ? 2.25 : 1.85}
              />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
