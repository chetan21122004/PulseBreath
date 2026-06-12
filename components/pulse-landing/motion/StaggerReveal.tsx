'use client';

import { createContext, useContext } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { VIEWPORT } from "./tokens";
import {
  staggerContainer,
  staggerItem,
  variantMap,
  type RevealVariant,
} from "./variants";

const StaggerVariantContext = createContext<RevealVariant>("fadeUp");

type StaggerRevealProps = HTMLMotionProps<"div"> & {
  itemVariant?: RevealVariant;
  once?: boolean;
  amount?: number;
  as?: "div" | "ul" | "section";
};

export function StaggerReveal({
  itemVariant = "fadeUp",
  once = VIEWPORT.once,
  amount = VIEWPORT.amount,
  as = "div",
  className,
  children,
  ...props
}: StaggerRevealProps) {
  const reduceMotion = useReducedMotion();
  const Container = motion[as] as typeof motion.div;

  return (
    <StaggerVariantContext.Provider value={itemVariant}>
      <Container
        initial={reduceMotion ? "visible" : "hidden"}
        whileInView="visible"
        viewport={{ once, amount }}
        variants={staggerContainer}
        className={cn(className)}
        {...props}
      >
        {children}
      </Container>
    </StaggerVariantContext.Provider>
  );
}

type StaggerItemProps = HTMLMotionProps<"div"> & {
  variant?: RevealVariant;
  as?: "div" | "li" | "article";
};

export function StaggerItem({
  variant,
  as = "div",
  className,
  children,
  ...props
}: StaggerItemProps) {
  const inheritedVariant = useContext(StaggerVariantContext);
  const Item = motion[as] as typeof motion.div;
  const itemVariants = variantMap[variant ?? inheritedVariant] ?? staggerItem;

  return (
    <Item variants={itemVariants} className={cn(className)} {...props}>
      {children}
    </Item>
  );
}
