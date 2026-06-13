'use client';

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DR_DEEPALI_PORTRAIT } from "./dr-deepali-assets";

const DEFAULT_TRIM_SECONDS = 2;

type DrDeepaliAutoplayVideoProps = {
  src: string;
  poster?: string;
  alt?: string;
  className?: string;
  videoClassName?: string;
  trimEndSeconds?: number;
};

export function DrDeepaliAutoplayVideo({
  src,
  poster,
  alt = "Dr. Deepali Shah supervising a rehabilitation session",
  className,
  videoClassName,
  trimEndSeconds = DEFAULT_TRIM_SECONDS,
}: DrDeepaliAutoplayVideoProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (reduceMotion || failed) return;

    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      void video.play().catch(() => setFailed(true));
    };

    const onLoadedMetadata = () => tryPlay();
    const onTimeUpdate = () => {
      const { currentTime, duration } = video;
      if (!Number.isFinite(duration) || duration <= trimEndSeconds) return;
      if (currentTime >= duration - trimEndSeconds) {
        video.currentTime = 0;
        tryPlay();
      }
    };

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("timeupdate", onTimeUpdate);
    tryPlay();

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [reduceMotion, failed, src, trimEndSeconds]);

  const fallbackSrc = poster ?? DR_DEEPALI_PORTRAIT;

  if (reduceMotion || failed) {
    return (
      <figure className={cn("overflow-hidden", className)}>
        <img
          src={fallbackSrc}
          alt={alt}
          className={cn("w-full object-cover", videoClassName)}
        />
      </figure>
    );
  }

  return (
    <figure className={cn("overflow-hidden", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        autoPlay
        playsInline
        preload="metadata"
        aria-label={alt}
        onError={() => setFailed(true)}
        className={cn("bg-[var(--brand-deeper)]/5 w-full object-cover", videoClassName)}
      />
    </figure>
  );
}
