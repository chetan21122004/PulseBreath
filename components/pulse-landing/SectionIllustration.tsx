'use client';

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal, type RevealVariant } from "./motion";

type SectionIllustrationProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  float?: boolean;
  animateOnScroll?: boolean;
  variant?: RevealVariant;
};

export function SectionIllustration({
  src,
  alt,
  className,
  imgClassName,
  float = true,
  animateOnScroll = true,
  variant = "fadeRight",
}: SectionIllustrationProps) {
  const reduceMotion = useReducedMotion();

  const image = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      className={cn("h-auto w-full", imgClassName)}
    />
  );

  const content =
    float && !reduceMotion ? (
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      >
        {image}
      </motion.div>
    ) : (
      <div className={cn(float && "motion-safe:animate-illustration-float")}>{image}</div>
    );

  if (!animateOnScroll) {
    return <div className={cn("relative", className)}>{content}</div>;
  }

  return (
    <Reveal variant={variant} className={cn("relative overflow-x-clip", className)}>
      {content}
    </Reveal>
  );
}
