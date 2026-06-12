import type { Variants } from "framer-motion";
import { DURATION, EASE_PREMIUM, STAGGER } from "./tokens";

const transition = (duration: number = DURATION.base) => ({
  duration,
  ease: EASE_PREMIUM,
});

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: transition() },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: transition(DURATION.fast) },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition(DURATION.fast) },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: transition() },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: transition() },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition() },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.hero,
      ease: EASE_PREMIUM,
      delay: 0.05 + i * 0.05,
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.base,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transition(),
  },
};

export const float: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export const fabPulse: Variants = {
  animate: {
    scale: [1, 1.35],
    opacity: [0.5, 0],
    transition: {
      duration: 2.4,
      ease: "easeOut",
      repeat: Infinity,
    },
  },
};

export const variantMap = {
  fadeUp,
  fadeDown,
  fadeIn,
  fadeLeft,
  fadeRight,
  scaleIn,
} as const;

export type RevealVariant = keyof typeof variantMap;
