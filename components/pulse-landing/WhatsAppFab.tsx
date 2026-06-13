'use client';

import { motion, useReducedMotion } from "framer-motion";
import { WHATSAPP } from "./constants";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { fabPulse } from "./motion";

export function WhatsAppFab() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={WHATSAPP}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp Dr. Deepali"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { scale: 1.08 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      className="fixed bottom-6 right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg max-lg:bottom-[calc(var(--bottom-nav-height)+env(safe-area-inset-bottom,0px)+0.75rem)] sm:right-6"
      style={{ background: "#25D366" }}
    >
      {!reduceMotion ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full border-2 border-[#25D366]/50"
          variants={fabPulse}
          animate="animate"
        />
      ) : null}
      <WhatsAppIcon className="relative h-7 w-7" />
    </motion.a>
  );
}
