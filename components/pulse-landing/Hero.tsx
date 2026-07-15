'use client';

import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Check,
  Award,
  GraduationCap,
  Stethoscope,
  HeartPulse,
  Phone,
} from "lucide-react";
import {
  DR_DEEPALI_HERO_PORTRAIT,
} from "./dr-deepali-assets";
import { HERO_BG_CLIPS, HERO_BG_PLAYBACK_RATE, PHONE, WHATSAPP } from "./constants";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { heroItem } from "./motion";
import { SectionPageLink } from "./SectionPageLink";

const bgHero = "/assets/bg_hero.jpeg";

const credentials = [
  { icon: Award, title: "MPT Gold Medalist", sub: "Cardiopulmonary Sciences" },
  { icon: GraduationCap, title: "Ex-training Faculty", sub: "Cipla Pulmonary Rehab" },
] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const heroBgVideoRef = useRef<HTMLVideoElement | null>(null);
  const [heroBgClipIndex, setHeroBgClipIndex] = useState(0);
  const [heroBgVideoFailed, setHeroBgVideoFailed] = useState(false);
  const [shouldLoadHeroVideo, setShouldLoadHeroVideo] = useState(false);
  const [heroBgVideoReady, setHeroBgVideoReady] = useState(false);

  /** Defer background video until the page has finished loading. */
  useEffect(() => {
    if (reduceMotion) return;

    const enableVideo = () => setShouldLoadHeroVideo(true);

    if (document.readyState === "complete") {
      enableVideo();
      return;
    }

    window.addEventListener("load", enableVideo, { once: true });
    return () => window.removeEventListener("load", enableVideo);
  }, [reduceMotion]);

  useEffect(() => {
    setHeroBgVideoReady(false);
  }, [heroBgClipIndex]);

  useEffect(() => {
    const el = heroBgVideoRef.current;
    if (!el || heroBgVideoFailed || !shouldLoadHeroVideo) return;
    el.playbackRate = HERO_BG_PLAYBACK_RATE;
    void el.play().catch(() => setHeroBgVideoFailed(true));
  }, [heroBgClipIndex, heroBgVideoFailed, shouldLoadHeroVideo]);

  /** If the clip never reaches playable data (network/format), fall back to static art. */
  useEffect(() => {
    if (heroBgVideoFailed || !shouldLoadHeroVideo) return;
    let cancelled = false;
    const id = window.setTimeout(() => {
      if (cancelled) return;
      const el = heroBgVideoRef.current;
      if (!el) return;
      if (el.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        setHeroBgVideoFailed(true);
      }
    }, 12_000);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [heroBgClipIndex, heroBgVideoFailed, shouldLoadHeroVideo]);

  const showStaticHeroBg =
    reduceMotion || heroBgVideoFailed || !shouldLoadHeroVideo || !heroBgVideoReady;

  return (
    <section className="relative isolate scroll-mt-[var(--header-height)] min-h-[calc(100svh-var(--header-height))] overflow-hidden bg-[var(--brand-deeper)]">
      {/* Cinematographic background -all `bg_vdo` clips sequentially at 1.25× */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {shouldLoadHeroVideo && !heroBgVideoFailed && !reduceMotion && (
          <video
            ref={heroBgVideoRef}
            key={heroBgClipIndex}
            className="absolute inset-0 h-full w-full object-cover brightness-[1.12] contrast-[1.04] saturate-[1.06]"
            src={HERO_BG_CLIPS[heroBgClipIndex]}
            autoPlay
            muted
            playsInline
            preload="none"
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = HERO_BG_PLAYBACK_RATE;
            }}
            onCanPlay={() => setHeroBgVideoReady(true)}
            onEnded={() => {
              setHeroBgClipIndex((i) => (i + 1) % HERO_BG_CLIPS.length);
            }}
            onError={() => setHeroBgVideoFailed(true)}
          />
        )}
        {/* Static hero art on first paint, while video loads, on failure, or reduced motion */}
        <img
          src={bgHero}
          alt=""
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover brightness-[1.12] contrast-[1.04] saturate-[1.06] motion-reduce:opacity-40 ${showStaticHeroBg ? "" : "motion-safe:hidden"}`}
        />
        {/* Light global tint -video stays vivid; darken only lightly for depth */}
         {/* Subtle grid -“clinical precision” without noise */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Mobile/tablet: scrim so headline copy stays legible over the video */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[min(62%,520px)] bg-gradient-to-b from-[var(--brand-deeper)]/96 via-[var(--brand-deeper)]/88 to-transparent lg:hidden"
        aria-hidden
      />

      {/* Desktop: scrim behind copy column only -right side stays close to raw video */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[54%] bg-gradient-to-r from-[var(--brand-deeper)]/90 via-[var(--brand-deeper)]/55 to-transparent lg:block"
        aria-hidden
      />

      {/* Giant watermark type -bold, still restrained */}
      <div
        className="pointer-events-none absolute -left-4 top-1/2 z-[2] hidden -translate-y-1/2 select-none font-display text-[clamp(5rem,14vw,12rem)] font-bold leading-none text-white/[0.04] motion-reduce:opacity-0 lg:block"
        aria-hidden
      >
        BREATHE
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 py-6 sm:px-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-12 lg:items-center lg:gap-8 xl:gap-10">
          <motion.div className="relative z-[2] flex flex-col gap-3 lg:col-span-7 lg:gap-4">
            <motion.h1
              custom={0}
              variants={heroItem}
              initial={reduceMotion ? "visible" : "hidden"}
              animate="visible"
              className="font-display text-[clamp(1.5rem,4.5vw,3.25rem)] font-bold leading-[1.12] tracking-[-0.02em] text-white text-balance max-lg:[text-shadow:0_2px_28px_rgba(0,0,0,0.95),0_1px_4px_rgba(0,0,0,1)] lg:leading-[1.1] lg:[text-shadow:0_2px_20px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.85)]"
            >
              Breathlessness is not the end of your recovery.
            </motion.h1>

            <motion.p
              custom={1}
              variants={heroItem}
              initial={reduceMotion ? "visible" : "hidden"}
              animate="visible"
              className="max-w-xl max-md:text-base font-display text-lg italic leading-snug text-white max-lg:[text-shadow:0_1px_20px_rgba(0,0,0,0.9),0_1px_3px_rgba(0,0,0,0.85)] lg:text-xl lg:[text-shadow:0_1px_14px_rgba(0,0,0,0.5)]"
            >
              Rehabilitation that helps you{" "}
              <span className="text-[var(--brand-teal-soft)] max-lg:[text-shadow:0_1px_16px_rgba(0,0,0,0.95)]">
                reclaim your life,
              </span>
              {" "} not just manage disease.
            </motion.p>

            <motion.div
              custom={1.5}
              variants={heroItem}
              initial={reduceMotion ? "visible" : "hidden"}
              animate="visible"
              className="mt-3 flex flex-wrap items-center gap-2 sm:gap-2.5"
            >
              <SectionPageLink href="/services" variant="hero">
                Explore services
              </SectionPageLink>
              <SectionPageLink href="/how-it-works" variant="hero">
                How it works
              </SectionPageLink>
            </motion.div>

            <motion.div
              custom={2}
              variants={heroItem}
              initial={reduceMotion ? "visible" : "hidden"}
              animate="visible"
              className="relative min-h-0 w-full max-w-lg shrink lg:max-w-xl"
            >
              <div
                className="rounded-2xl p-[1.5px] shadow-[0_28px_90px_-18px_rgba(0,0,0,0.6),0_0_1px_rgba(255,255,255,0.12)]"
                style={{
                  background:
                    "linear-gradient(132deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.05) 42%, rgba(46,139,139,0.18) 88%, rgba(176,64,96,0.12) 100%)",
                }}
              >
                <div className="relative overflow-hidden rounded-[calc(1rem-1.5px)] border border-white/[0.12] bg-gradient-to-b from-white/[0.06] via-[var(--brand-deeper)]/35 to-black/30 backdrop-blur-2xl">
                  <div className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.06]" aria-hidden />
                  <div
                    className="relative h-0.5 w-full bg-gradient-to-r from-[var(--brand-teal)] from-[-5%] via-[var(--brand-pink)] to-[var(--brand-teal-soft)] to-[105%]"
                    aria-hidden
                  />

                  <div className="relative px-3 py-4 sm:px-6 sm:py-6">
                    <header className="flex gap-3 border-b border-white/[0.12] pb-3 sm:items-start sm:gap-4 sm:pb-4">
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-black/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:h-11 sm:w-11 sm:rounded-xl"
                        aria-hidden
                      >
                        <Stethoscope className="h-5 w-5 text-[var(--brand-teal-soft)] sm:h-6 sm:w-6" />
                      </div>
                      <div className="min-w-0 pt-px">
                        <p className="font-sans text-[10px] font-bold uppercase leading-none tracking-[0.2em] text-[var(--brand-teal-soft)] sm:tracking-[0.22em]">
                          Specialist-led programs
                        </p>
                        <p className="mt-1.5 font-display text-sm font-medium italic leading-snug tracking-normal text-white/88 sm:text-[15px]">
                          Care built around your condition
                        </p>
                      </div>
                    </header>

                    <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:gap-3">
                      <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener"
                        className="btn-primary motion-btn !min-h-[48px] flex flex-1 items-center justify-center gap-2 px-4 py-2.5 text-[0.8125rem] shadow-[0_12px_40px_rgba(176,64,96,0.45)] transition-[transform,box-shadow] hover:scale-[1.01] hover:shadow-[0_16px_48px_rgba(176,64,96,0.52)] motion-reduce:hover:scale-100 sm:py-3"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        Book free assessment
                      </a>
                      <a
                        href={`tel:${PHONE}`}
                        className="inline-flex min-h-[48px] flex-1 flex-col items-center justify-center gap-0.5 rounded-md border border-white/35 bg-white/[0.06] px-4 py-2.5 text-white backdrop-blur-sm transition-[background-color,border-color] hover:border-white/50 hover:bg-white/[0.1] sm:py-2.5"
                      >
                        <span className="flex items-center gap-2 text-[0.8125rem] font-semibold tracking-wide">
                          <Phone className="h-4 w-4 text-[var(--brand-teal-soft)]" strokeWidth={2.25} />
                          +91 {PHONE}
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/50">
                          Or call directly
                        </span>
                      </a>
                    </div>

                    <footer
                      className="mt-4 border-t border-white/[0.1] pt-4"
                      aria-label="Credentials and consultation offer"
                    >
                      <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2 sm:gap-2.5">
                        {credentials.map(({ icon: Icon, title, sub }) => (
                          <li
                            key={title}
                            className="flex items-center gap-2.5 rounded-lg bg-white/[0.05] px-3 py-2.5 ring-1 ring-white/[0.08]"
                          >
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.08]">
                              <Icon className="h-4 w-4 text-[var(--brand-teal-soft)]" strokeWidth={2.25} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[11px] font-bold leading-tight tracking-[0.04em] text-white sm:text-xs">
                                {title}
                              </p>
                              <p className="mt-0.5 text-[11px] leading-snug text-white/60">{sub}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] leading-snug text-white/55 sm:text-xs">
                        <span className="inline-flex items-center gap-1.5">
                          <Check className="h-3.5 w-3.5 text-[var(--brand-teal-soft)]" strokeWidth={2.5} aria-hidden />
                          Free assessment with Dr. Deepali
                        </span>
                        <span aria-hidden className="hidden text-white/30 sm:inline">
                          ·
                        </span>
                        <span>No obligation</span>
                      </p>
                    </footer>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div className="relative flex items-center justify-center pt-1 lg:col-span-5 lg:pt-0">
            <motion.div
              className="flex w-full max-w-[280px] flex-col items-center sm:max-w-[300px] lg:max-w-none lg:items-center"
            >
              <motion.div
                custom={3}
                variants={heroItem}
                initial={reduceMotion ? "visible" : "hidden"}
                animate="visible"
                className="relative isolate w-full max-w-[min(100%,320px)] lg:max-w-[340px]"
              >
                <div
                  className="pointer-events-none absolute max-md:inset-[-3px] inset-[-6px] rounded-[calc(1.25rem+5px)] bg-gradient-to-br from-white/30 via-transparent to-[var(--brand-teal)]/35 p-[1.5px] motion-reduce:from-white/12 sm:inset-[-9px] sm:rounded-[calc(1.5rem+8px)] lg:inset-[-11px]"
                  aria-hidden
                >
                  <div className="h-full w-full rounded-[calc(1.25rem+5px-1.5px)] bg-[var(--brand-deeper)]/70 sm:rounded-[calc(1.5rem+8px-1.5px)]" />
                </div>
                <div className="pointer-events-none absolute -right-2 top-[8%] z-0 hidden h-28 w-28 rounded-full bg-[var(--brand-pink)]/15 blur-3xl motion-reduce:hidden md:block lg:right-0" aria-hidden />
                <div className="pointer-events-none absolute max-md:hidden -left-4 bottom-[12%] z-0 h-32 w-32 rounded-full bg-[var(--brand-teal)]/18 blur-3xl motion-reduce:hidden" aria-hidden />

                <div className="relative z-[1] overflow-hidden rounded-2xl ring-2 ring-white/25 ring-offset-2 ring-offset-transparent lg:translate-x-1">
                  <img
                    src={DR_DEEPALI_HERO_PORTRAIT}
                    alt="Dr. Deepali Shah, Cardiopulmonary Physiotherapist"
                    width={800}
                    height={900}
                    className="aspect-[4/5] w-full max-h-[min(42svh,320px)] bg-white object-contain object-center sm:max-h-[min(48svh,380px)] lg:max-h-[min(52svh,440px)]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[var(--brand-deeper)]/35 via-transparent to-transparent" />
                  {/* In-frame footer -avoids hero overflow clip; stays legible on any backdrop */}
                  <div className="motion-reduce:hidden absolute inset-x-0 bottom-0 z-[2] rounded-b-[1rem] bg-gradient-to-t from-black/92 via-black/72 to-transparent px-3 pb-3 pt-10 sm:px-4 sm:pb-4 sm:pt-11">
                    <div className="flex items-start gap-2 border-t border-white/15 pt-2.5 sm:items-center sm:gap-2.5 sm:pt-3">
                      <HeartPulse className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-teal-soft)] sm:mt-0 sm:h-5 sm:w-5" />
                      <p className="font-sans text-[9px] font-bold uppercase leading-snug tracking-[0.12em] text-white sm:text-[10px] sm:tracking-[0.14em]">
                        <span className="text-white border-b">Evidence-led</span>
                        <span className="text-white"> </span>
                        <span className="text-white border-b">Supervised</span>
                        <span className="text-white"> </span>
                        <span className="text-white border-b">Personalised</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
