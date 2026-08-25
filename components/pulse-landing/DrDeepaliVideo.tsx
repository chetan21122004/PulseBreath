'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DR_DEEPALI_PORTRAIT } from "./dr-deepali-assets";

type DrDeepaliVideoProps = {
  src: string;
  poster?: string;
  alt?: string;
  className?: string;
  videoClassName?: string;
  preload?: "none" | "metadata" | "auto";
  caption?: string;
  maxDurationSeconds?: number;
};

export function DrDeepaliVideo({
  src,
  poster,
  alt = "Dr. Deepali Shah supervising a rehabilitation session",
  className,
  videoClassName,
  preload = "metadata",
  caption,
  maxDurationSeconds,
}: DrDeepaliVideoProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (reduceMotion || failed || !maxDurationSeconds) return;

    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (video.currentTime >= maxDurationSeconds) {
        video.currentTime = 0;
      }
    };

    const onSeeked = () => {
      if (video.currentTime > maxDurationSeconds) {
        video.currentTime = maxDurationSeconds;
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("seeked", onSeeked);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("seeked", onSeeked);
    };
  }, [reduceMotion, failed, maxDurationSeconds, src]);

  if (reduceMotion || failed) {
    return (
      <figure className={cn("overflow-hidden rounded-2xl", className)}>
        <Image
          src={poster ?? DR_DEEPALI_PORTRAIT}
          alt={alt}
          width={800}
          height={900}
          sizes="(max-width: 1024px) 92vw, 44vw"
          loading="lazy"
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
        ref={videoRef}
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
