'use client';

import { useState } from "react";
import { X } from "lucide-react";
import { Reveal, StaggerItem, StaggerReveal } from "./motion";
import { cn } from "@/lib/utils";

type DrDeepaliGalleryProps = {
  photos: readonly string[];
  className?: string;
  columns?: "compact" | "full";
  altPrefix?: string;
};

export function DrDeepaliGallery({
  photos,
  className,
  columns = "full",
  altPrefix = "Dr. Deepali Shah",
}: DrDeepaliGalleryProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  if (!photos.length) return null;

  return (
    <>
      <StaggerReveal
        className={cn(
          "grid gap-3 sm:gap-4",
          columns === "compact"
            ? "grid-cols-2 sm:grid-cols-3"
            : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
          className,
        )}
        itemVariant="fadeUp"
      >
        {photos.map((src, index) => (
          <StaggerItem key={src}>
            <button
              type="button"
              onClick={() => setLightbox(src)}
              className="motion-card group relative w-full overflow-hidden rounded-xl border border-border/80 ring-1 ring-white/80 transition-transform duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <img
                src={src}
                alt={`${altPrefix} — photo ${index + 1}`}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--brand-deeper)]/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </StaggerItem>
        ))}
      </StaggerReveal>

      {lightbox ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--brand-deeper)]/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Close preview"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-navy shadow-lg transition-colors hover:bg-white"
          >
            <X className="h-5 w-5" />
          </button>
          <Reveal variant="scaleIn" className="max-h-[90vh] max-w-4xl">
            <img
              src={lightbox}
              alt={`${altPrefix} — enlarged`}
              className="max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </Reveal>
        </div>
      ) : null}
    </>
  );
}
