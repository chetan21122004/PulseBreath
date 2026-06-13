'use client';

import { useEffect, useRef, useState } from "react";
import { Video } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DR_DEEPALI_PORTRAIT } from "./dr-deepali-assets";

const LOOP_TRIM_SECONDS = 2;

type TeleRehabSessionClipProps = {
  src: string;
  poster?: string;
  alt?: string;
  className?: string;
};

export function TeleRehabSessionClip({
  src,
  poster,
  alt = "Dr. Deepali Shah leading a live tele-rehabilitation session",
  className,
}: TeleRehabSessionClipProps) {
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
      if (!Number.isFinite(duration) || duration <= LOOP_TRIM_SECONDS) return;
      if (currentTime >= duration - LOOP_TRIM_SECONDS) {
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
  }, [reduceMotion, failed, src]);

  const fallbackSrc = poster ?? DR_DEEPALI_PORTRAIT;

  if (reduceMotion || failed) {
    return (
      <SessionClipFrame className={className}>
        <img src={fallbackSrc} alt={alt} className="aspect-[4/5] w-full object-cover object-top" />
      </SessionClipFrame>
    );
  }

  return (
    <SessionClipFrame className={className}>
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
        className="aspect-[4/5] w-full object-cover object-top"
      />
    </SessionClipFrame>
  );
}

function SessionClipFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl ring-1 ring-navy/[0.08]", className)}>
      {children}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-navy backdrop-blur-sm">
        <Video className="h-3 w-3 text-brand" strokeWidth={2.25} />
        Live supervision
      </span>
    </div>
  );
}
