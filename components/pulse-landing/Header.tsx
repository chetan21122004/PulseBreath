'use client';

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { WHATSAPP } from "./constants";
import { fadeDown } from "./motion";
const logo = "/assets/logo_n.png";
const logo_text = "/assets/logo_text.png";
export function Header() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { label: "Home", href: "#" },
    { label: "About Dr. Deepali", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQs", href: "#faqs" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      className="sticky top-0 z-40 w-full"
      initial={reduceMotion ? "visible" : "hidden"}
      animate="visible"
      variants={fadeDown}
    >
      {/* Top accent -  clinical “precision line” in brand teal + rose */}
      <div
        className="h-[3px] w-full bg-gradient-to-r from-[var(--brand-teal)] via-[var(--brand-pink)] to-[var(--brand-teal)]"
        aria-hidden
      />
      <div
        className="border-b border-[var(--border)] bg-[color-mix(in_oklch,var(--background)_88%,transparent)] shadow-[0_18px_48px_-24px_rgba(30,46,61,0.22)] backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-[color-mix(in_oklch,var(--background)_72%,transparent)]"
      >
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 max-md:overflow-hidden overflow-visible px-4 py-0 sm:gap-4 sm:px-6">
          {/* Subtle radial wash behind nav cluster */}
          <div
            className="pointer-events-none absolute right-[12%] top-1/2 hidden h-40 w-[min(52vw,28rem)] -translate-y-1/2 rounded-full bg-gradient-to-l from-[var(--brand-teal-soft)]/45 via-[var(--primary-soft)]/25 to-transparent blur-2xl lg:block"
            aria-hidden
          />

<a
      href="#"
      className="group flex min-w-0 max-md:max-w-[calc(100%-3.5rem)] items-center gap-2 sm:gap-4"
    >
      <span className="relative mr-2 flex shrink-0 items-center justify-center sm:mr-7">
        <span
          className="pointer-events-none absolute rounded-full "
          aria-hidden
        />
        <img
          src={logo}
          alt=""
          className="relative h-10 w-10 object-contain sm:h-16 sm:w-16 lg:h-24 lg:w-24"
        />
        <img
          src={logo_text}
          alt=""
          className="relative h-12 w-auto max-w-[7rem] object-contain sm:h-20 sm:max-w-none lg:h-32 lg:w-32"
        />
      </span>
    </a>
          <nav
            className="relative hidden lg:flex"
            aria-label="Primary"
          >
            <div
              className={cn(
                "flex items-center gap-0.5 rounded-full border border-[color-mix(in_oklch,var(--brand-teal)_22%,var(--border))] bg-[color-mix(in_oklch,white_78%,var(--brand-teal-soft))] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_10px_40px_-12px_rgba(30,46,61,0.18),0_0_0_1px_rgba(176,64,96,0.06)]",
                "backdrop-blur-md",
              )}
            >
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="group relative rounded-full px-3.5 py-2.5 font-sans-brand text-[11px] font-bold uppercase tracking-[0.11em] text-[var(--brand-dark)]/72 transition-[color,background-color,box-shadow] hover:bg-white hover:text-[var(--brand-pink)] hover:shadow-[0_2px_12px_rgba(176,64,96,0.12)] xl:px-4"
                >
                  {l.label}
                  <span className="absolute inset-x-3.5 bottom-2 h-px origin-left scale-x-0 bg-[var(--brand-pink)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 xl:inset-x-4" />
                </a>
              ))}
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "btn-primary motion-btn hidden shadow-[0_0_0_1px_rgba(46,139,139,0.28),0_12px_36px_-8px_rgba(176,64,96,0.42)] sm:inline-flex",
                "!min-h-[48px] !px-6 !py-3 !text-[0.75rem] xl:!px-7 xl:!text-[0.8125rem]",
                "motion-safe:transition-[transform,box-shadow] motion-safe:hover:scale-[1.02] motion-reduce:hover:scale-100",
              )}
            >
              Free Assessment
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "flex max-md:h-12 max-md:w-12 h-11 w-11 items-center justify-center rounded-xl border border-[color-mix(in_oklch,var(--brand-teal)_25%,var(--border))] bg-white/90 text-[var(--brand-dark)] shadow-[0_8px_24px_-10px_rgba(30,46,61,0.25)] lg:hidden",
                "motion-safe:transition-[transform,box-shadow,background-color] active:scale-[0.97]",
                open && "border-[var(--brand-pink)]/35 bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
              )}
              aria-expanded={open}
              aria-controls="site-mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" strokeWidth={2.25} /> : <Menu className="h-5 w-5" strokeWidth={2.25} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          id="site-mobile-nav"
          className={cn(
            "lg:hidden motion-safe:transition-[grid-template-rows] grid",
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="min-h-0 max-md:max-h-[calc(100dvh-var(--header-height))] overflow-hidden max-md:overflow-y-auto">
            <div className="border-t border-[var(--border)] bg-gradient-to-b from-[color-mix(in_oklch,var(--background)_96%,var(--brand-teal-soft))] to-[var(--brand-teal-soft)]/35 px-4 py-5 backdrop-blur-md sm:px-6">
              <div className="mx-auto max-w-md space-y-1">
                <p className="pb-2 font-sans-brand text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand-teal)]">
                  Navigate
                </p>
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-transparent bg-white/55 px-4 py-3.5 font-sans-brand text-[15px] font-semibold text-[var(--brand-dark)] shadow-sm ring-1 ring-[var(--border)]/80 transition-[border-color,background-color,box-shadow] active:bg-white"
                  >
                    <span className="text-[var(--brand-dark)]">{l.label}</span>
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-teal)] opacity-60 motion-safe:transition-opacity group-hover:opacity-100"
                      aria-hidden
                    />
                  </a>
                ))}
              </div>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="btn-primary motion-btn mt-5 w-full shadow-[0_0_0_1px_rgba(46,139,139,0.28),0_12px_36px_-8px_rgba(176,64,96,0.38)]"
              >
                Free Assessment
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
