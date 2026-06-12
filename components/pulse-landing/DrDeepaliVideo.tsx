'use client';

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type DrDeepaliVideoProps = {
  src: string;
  poster?: string;
  alt?: string;
  className?: string;
  videoClassName?: string;
  preload?: "none" | "metadata" | "auto";
  caption?: string;
};

export function DrDeepaliVideo({
  src,
  poster,
  alt = "Dr. Deepali Shah supervising a rehabilitation session",
  className,
  videoClassName,
  preload = "metadata",
  caption,
}: DrDeepaliVideoProps) {
  const reduceMotion = useReducedMotion();
  const [failed, setFailed] = useState(false);

  if (reduceMotion || failed) {
    return (
      <figure className={cn("overflow-hidden rounded-2xl", className)}>
        <img
          src={poster ?? "/assets/team-doctor.jpg"}
          alt={alt}
          className={cn("aspect-[4/3] w-full object-cover", videoClassName)}
        />
        {caption ? (
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  return (
    <figure className={cn("overflow-hidden rounded-2xl", className)}>
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload={preload}
        onError={() => setFailed(true)}
        className={cn(
          "aspect-[4/3] w-full bg-[var(--brand-deeper)]/5 object-cover",
          videoClassName,
        )}
      >
        <track kind="captions" />
      </video>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
