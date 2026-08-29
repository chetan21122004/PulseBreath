'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { DURATION, EASE_PREMIUM, VIEWPORT } from "./tokens";
import { useRevealVariant } from "./useMobileLayout";
import { type RevealVariant, variantMap } from "./variants";

type RevealProps = HTMLMotionProps<"div"> & {
  variant?: RevealVariant;
  delay?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  as?: "div" | "section" | "article" | "header" | "footer" | "li" | "span";
};

export function Reveal({
  variant = "fadeUp",
  delay = 0,
  once = VIEWPORT.once,
  amount = VIEWPORT.amount,
  as = "div",
  className,
  children,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const resolvedVariant = useRevealVariant(variant);
  const Component = motion[as] as typeof motion.div;
  const variants = variantMap[resolvedVariant];

  return (
    <Component
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={
        delay
          ? { delay, duration: DURATION.base, ease: EASE_PREMIUM }
          : undefined
      }
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  );
}
