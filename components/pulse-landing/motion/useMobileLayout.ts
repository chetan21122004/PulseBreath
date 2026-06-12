'use client';

import { useEffect, useState } from "react";
import type { RevealVariant } from "./variants";

const MOBILE_QUERY = "(max-width: 767px)";

export function useIsMobileLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

/** Avoid horizontal slide reveals on narrow screens (prevents overflow). */
export function useRevealVariant(variant: RevealVariant): RevealVariant {
  const isMobile = useIsMobileLayout();
  if (isMobile && (variant === "fadeLeft" || variant === "fadeRight")) {
    return "fadeUp";
  }
  return variant;
}
