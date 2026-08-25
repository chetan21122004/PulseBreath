'use client';

import Image from "next/image";
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
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure || reduceMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(figure);
    return () => observer.disconnect();
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || failed || !shouldLoad) return;

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
  }, [reduceMotion, failed, shouldLoad, src, trimEndSeconds]);

  const fallbackSrc = poster ?? DR_DEEPALI_PORTRAIT;

  if (reduceMotion || failed || !shouldLoad) {
    return (
      <figure ref={figureRef} className={cn("overflow-hidden", className)}>
        <Image
          src={fallbackSrc}
          alt={alt}
          width={800}
          height={900}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 34vw"
          loading="lazy"
          quality={74}
          className={cn("w-full object-cover", videoClassName)}
        />
      </figure>
    );
  }

  return (
    <figure ref={figureRef} className={cn("overflow-hidden", className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        autoPlay
        playsInline
        preload="none"
        aria-label={alt}
        onError={() => setFailed(true)}
        className={cn("bg-[var(--brand-deeper)]/5 w-full object-cover", videoClassName)}
      />
    </figure>
  );
}
