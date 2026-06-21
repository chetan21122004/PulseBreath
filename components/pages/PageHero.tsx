'use client';

import { motion, useReducedMotion } from "framer-motion";
import { BackgroundBlob } from "@/components/pulse-landing/BackgroundBlob";
import { Reveal } from "@/components/pulse-landing/motion";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  pill: React.ReactNode;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
  withBlob?: boolean;
  animateOnLoad?: boolean;
  customBackground?: React.ReactNode;
};

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

function HeroMain({
  pill,
  title,
  children,
}: Pick<PageHeroProps, "pill" | "title" | "children">) {
  return (
    <>
      <span className="pill">{pill}</span>
      <h1 className="heading-display mt-5 max-w-4xl text-[2rem] sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h1>
      {children}
    </>
  );
}

export function PageHero({
  pill,
  title,
  description,
  children,
  aside,
  className,
  withBlob = true,
  animateOnLoad = true,
  customBackground,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();
  const hasAside = Boolean(aside);

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/60 bg-background pt-10 pb-14 lg:pt-14 lg:pb-20",
        className,
      )}
    >
      {customBackground ? (
        customBackground
      ) : withBlob ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <BackgroundBlob
            variant={1}
            cover
            opacity={0.08}
            className={hasAside ? "object-[18%_38%]" : "object-[70%_40%]"}
          />
          <div
            className="absolute inset-0"
            style={{
              background: hasAside
                ? "radial-gradient(45% 50% at 12% 35%, rgba(192,81,106,0.07), transparent 65%), radial-gradient(40% 45% at 88% 55%, rgba(58,143,163,0.09), transparent 70%)"
                : "radial-gradient(50% 45% at 15% 30%, rgba(192,81,106,0.06), transparent 65%), radial-gradient(45% 40% at 90% 70%, rgba(58,143,163,0.07), transparent 70%)",
            }}
          />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {animateOnLoad ? (
          <div
            className={cn(
              hasAside &&
                "grid items-center gap-8 lg:grid-cols-[1fr_minmax(280px,400px)] lg:gap-12 xl:gap-16",
            )}
          >
            <motion.div
              initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.1 }}
            >
              <HeroMain pill={pill} title={title}>
                {description ? (
                  <motion.p
                    className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--body-text)] sm:text-lg"
                    initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE_SMOOTH, delay: 0.3 }}
                  >
                    {description}
                  </motion.p>
                ) : null}
                {children ? (
                  <motion.div
                    initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: 0.45 }}
                  >
                    {children}
                  </motion.div>
                ) : null}
              </HeroMain>
            </motion.div>

            {hasAside ? (
              <motion.div
                initial={reduceMotion ? {} : { opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, ease: EASE_SMOOTH, delay: 0.25 }}
                className="hidden lg:block"
              >
                {aside}
              </motion.div>
            ) : null}
          </div>
        ) : (
          <div
            className={cn(
              hasAside &&
                "grid items-center gap-8 lg:grid-cols-[1fr_minmax(280px,400px)] lg:gap-12 xl:gap-16",
            )}
          >
            <Reveal variant="fadeUp">
              <HeroMain pill={pill} title={title}>
                {description ? (
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--body-text)] sm:text-lg">
                    {description}
                  </p>
                ) : null}
                {children}
              </HeroMain>
            </Reveal>
            {hasAside ? <div className="hidden lg:block">{aside}</div> : null}
          </div>
        )}
      </div>
    </section>
  );
}
