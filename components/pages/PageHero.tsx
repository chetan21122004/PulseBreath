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
  className?: string;
  withBlob?: boolean;
  animateOnLoad?: boolean;
  customBackground?: React.ReactNode;
};

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export function PageHero({
  pill,
  title,
  description,
  children,
  className,
  withBlob = true,
  animateOnLoad = true,
  customBackground,
}: PageHeroProps) {
  const reduceMotion = useReducedMotion();

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
          <BackgroundBlob variant={1} cover opacity={0.08} className="object-[70%_40%]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 45% at 15% 30%, rgba(192,81,106,0.06), transparent 65%), radial-gradient(45% 40% at 90% 70%, rgba(58,143,163,0.07), transparent 70%)",
            }}
          />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {animateOnLoad ? (
          <motion.div
            initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: 0.1 }}
          >
            <span className="pill">{pill}</span>
            <h1 className="heading-display mt-5 max-w-4xl text-[2rem] sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h1>
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
          </motion.div>
        ) : (
          <Reveal variant="fadeUp">
            <span className="pill">{pill}</span>
            <h1 className="heading-display mt-5 max-w-4xl text-[2rem] sm:text-4xl lg:text-[2.75rem]">
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--body-text)] sm:text-lg">
                {description}
              </p>
            ) : null}
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
