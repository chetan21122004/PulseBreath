'use client';

import { forwardRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Layers,
  BookOpen,
  Route,
  Phone,
  UserCircle,
  LayoutGrid,
  CircleHelp,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type MobileNavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  description?: string;
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
    label: "About",
    href: "/about",
    icon: UserCircle,
    isActive: (pathname) => pathname === "/about",
  },
  {
    label: "Contact",
    href: "/contact",
    icon: Phone,
    isActive: (pathname) => pathname === "/contact",
  },
];

const MOBILE_MORE_ITEMS: MobileNavItem[] = [
  {
    label: "How It Works",
    href: "/how-it-works",
    icon: Route,
    description: "Four steps from first call to recovery",
    isActive: (pathname) => pathname === "/how-it-works",
  },
  {
    label: "Articles",
    href: "/blog",
    icon: BookOpen,
    description: "Guides on safe rehab and tele-health",
    isActive: (pathname) => pathname === "/blog" || pathname.startsWith("/blog/"),
  },
  {
    label: "FAQs",
    href: "/faqs",
    icon: CircleHelp,
    description: "Common questions answered",
    isActive: (pathname) => pathname === "/faqs",
  },
];

function tabClassName(active: boolean) {
  return cn(
    "relative flex min-h-11 w-full touch-manipulation cursor-pointer flex-col items-center justify-center gap-0.5 px-1 py-1.5 font-sans-brand text-[10px] font-semibold leading-none transition-colors",
    active ? "text-[var(--brand-pink-deep)]" : "text-[var(--brand-dark)]/65",
  );
}

function TabContent({ label, icon: Icon, active }: { label: string; icon: LucideIcon; active: boolean }) {
  return (
    <>
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
    </>
  );
}

const MoreTabButton = forwardRef<
  HTMLButtonElement,
  { active: boolean; onClick: () => void; "aria-expanded"?: boolean }
>(function MoreTabButton({ active, onClick, "aria-expanded": ariaExpanded }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-expanded={ariaExpanded}
      aria-haspopup="dialog"
      aria-label="More pages"
      className={tabClassName(active || !!ariaExpanded)}
    >
      <TabContent label="More" icon={LayoutGrid} active={active || !!ariaExpanded} />
    </button>
  );
});

export function MobileBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreActive = MOBILE_MORE_ITEMS.some((item) => item.isActive(pathname));

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-[color-mix(in_oklch,var(--background)_92%,transparent)] shadow-[0_-12px_40px_-20px_rgba(30,46,61,0.22)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-[color-mix(in_oklch,var(--background)_78%,transparent)] lg:hidden"
        aria-label="Mobile primary navigation"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="mx-auto grid h-[var(--bottom-nav-height)] max-w-lg grid-cols-5">
          {MOBILE_NAV_ITEMS.map(({ label, href, icon, isActive }) => {
            const active = isActive(pathname);
            const Icon = icon;

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={tabClassName(active)}
              >
                <TabContent label={label} icon={Icon} active={active} />
              </Link>
            );
          })}

          <MoreTabButton
            active={moreActive}
            aria-expanded={moreOpen}
            onClick={() => setMoreOpen(true)}
          />
        </div>
      </nav>

      <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
        <SheetContent
          side="bottom"
          className="bottom-[calc(var(--bottom-nav-height)+env(safe-area-inset-bottom,0px))] max-h-[min(70vh,24rem)] rounded-t-2xl border-t px-4 pb-4 pt-5"
        >
          <SheetHeader className="space-y-1 text-left">
            <SheetTitle className="font-display text-lg text-navy">Explore PulseBreath</SheetTitle>
            <SheetDescription className="text-[13px] text-muted-foreground">
              More pages and resources
            </SheetDescription>
          </SheetHeader>

          <ul className="mt-4 space-y-1.5">
            {MOBILE_MORE_ITEMS.map(({ label, href, icon: Icon, description, isActive }) => {
              const active = isActive(pathname);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMoreOpen(false)}
                    className={cn(
                      "flex min-h-[3.25rem] items-center gap-3 rounded-xl px-3 py-2.5 transition-colors active:scale-[0.99]",
                      active
                        ? "bg-[var(--primary-soft)]/50 text-[var(--brand-pink-deep)] ring-1 ring-brand/15"
                        : "bg-soft/40 text-navy active:bg-soft/70",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1",
                        active
                          ? "bg-white text-[var(--brand-pink)] ring-brand/20"
                          : "bg-white text-[var(--brand-teal)] ring-border/70",
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-sans-brand text-sm font-semibold leading-snug">{label}</span>
                      {description ? (
                        <span className="mt-0.5 block text-[12px] leading-snug text-navy/55">{description}</span>
                      ) : null}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2.25} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </SheetContent>
      </Sheet>
    </>
  );
}
