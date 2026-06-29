'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { WHATSAPP } from "./constants";
import { AnnouncementBar } from "./AnnouncementBar";
import { NAV_LINKS } from "./nav-links";
import { fadeDown } from "./motion";
import { ServicesMegaMenuDesktop } from "./ServicesMegaMenu";
import { WhatsAppIcon } from "./WhatsAppIcon";

const logo = "/assets/logo_n.png";
const logo_text = "/assets/logo_text.png";

export function Header() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const links = NAV_LINKS;

  return (
    <motion.header
      className="sticky top-0 z-40 w-full"
      initial={reduceMotion ? "visible" : "hidden"}
      animate="visible"
      variants={fadeDown}
    >
      <AnnouncementBar />
      <div
        className="h-[3px] w-full bg-gradient-to-r from-[var(--brand-teal)] via-[var(--brand-pink)] to-[var(--brand-teal)]"
        aria-hidden
      />
      <div className="border-b border-[var(--border)] bg-[color-mix(in_oklch,var(--background)_88%,transparent)] shadow-[0_18px_48px_-24px_rgba(30,46,61,0.22)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-[color-mix(in_oklch,var(--background)_72%,transparent)]">
        <div className="relative mx-auto flex h-[var(--header-nav-height)] max-w-7xl items-center justify-between gap-2 overflow-visible px-4 max-sm:grid max-sm:grid-cols-[1fr_auto_1fr] sm:gap-4 sm:px-6 lg:h-16">
          <div
            className="pointer-events-none absolute right-[12%] top-1/2 hidden h-40 w-[min(52vw,28rem)] -translate-y-1/2 rounded-full bg-gradient-to-l from-[var(--brand-teal-soft)]/45 via-[var(--primary-soft)]/25 to-transparent blur-2xl lg:block"
            aria-hidden
          />

          <Link
            href="/"
            className="group flex min-w-0 items-center gap-1.5 justify-self-start sm:gap-4"
            aria-label="PulseBreath home"
          >
            <span className="relative flex shrink-0 items-center justify-center sm:mr-3 lg:mr-7">
              <img
                src={logo}
                alt=""
                className="relative h-8 w-8 origin-center object-contain max-sm:scale-[1.7] sm:h-16 sm:w-16 sm:scale-75 lg:h-24 lg:w-24 lg:scale-75"
              />
              <img
                src={logo_text}
                alt="PulseBreath"
                className="relative hidden h-9 w-auto max-w-[6.5rem] object-contain sm:block sm:h-20 sm:max-w-none lg:h-32 lg:w-32"
              />
            </span>
          </Link>

          <Link
            href="/"
            className="justify-self-center max-sm:col-start-2 max-sm:row-start-1 sm:hidden"
            aria-hidden
            tabIndex={-1}
          >
            <img
              src={logo_text}
              alt=""
              className="h-9 w-auto max-w-[7.5rem] object-contain"
            />
          </Link>

          <nav className="relative hidden lg:flex" aria-label="Primary">
            <div
              className={cn(
                "flex items-center gap-0.5 rounded-full border border-[color-mix(in_oklch,var(--brand-teal)_22%,var(--border))] bg-[color-mix(in_oklch,white_78%,var(--brand-teal-soft))] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_10px_40px_-12px_rgba(30,46,61,0.18),0_0_0_1px_rgba(176,64,96,0.06)]",
                "backdrop-blur-md",
              )}
            >
              {links.map((l) =>
                l.label === "Services" ? (
                  <ServicesMegaMenuDesktop
                    key={l.label}
                    isActive={pathname === l.href || pathname.startsWith("/services/")}
                  />
                ) : (
                  <Link
                    key={l.label}
                    href={l.href}
                    className={cn(
                      "group relative rounded-full px-3.5 py-2.5 font-sans-brand text-[11px] font-bold uppercase tracking-[0.11em] transition-[color,background-color,box-shadow] hover:bg-white hover:text-[var(--brand-pink)] hover:shadow-[0_2px_12px_rgba(176,64,96,0.12)] xl:px-4",
                      pathname === l.href ||
                        (l.href === "/blog" && pathname.startsWith("/blog"))
                        ? "bg-white text-[var(--brand-pink)] shadow-[0_2px_12px_rgba(176,64,96,0.12)]"
                        : "text-[var(--brand-dark)]/72",
                    )}
                  >
                    {l.label}
                    <span className="absolute inset-x-3.5 bottom-2 h-px origin-left scale-x-0 bg-[var(--brand-pink)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 xl:inset-x-4" />
                  </Link>
                ),
              )}
            </div>
          </nav>

          <div className="flex shrink-0 items-center justify-self-end gap-2 max-sm:col-start-3 max-sm:row-start-1 sm:gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "btn-primary motion-btn inline-flex items-center gap-1.5 shadow-[0_0_0_1px_rgba(46,139,139,0.28),0_12px_36px_-8px_rgba(176,64,96,0.42)] lg:!min-h-[48px] lg:!px-6 lg:!py-3 lg:!text-[0.75rem] xl:!px-7 xl:!text-[0.8125rem]",
                "!min-h-10 !px-3 !py-2 !text-[0.6875rem] font-bold",
                "motion-safe:transition-[transform,box-shadow] motion-safe:hover:scale-[1.02] motion-reduce:hover:scale-100",
              )}
            >
              <WhatsAppIcon className="h-3.5 w-3.5 lg:hidden" />
              <span className="lg:hidden">Book</span>
              <span className="hidden lg:inline">Free Assessment</span>
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
