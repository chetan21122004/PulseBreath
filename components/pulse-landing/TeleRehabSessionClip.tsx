'use client';

import { Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { DrDeepaliAutoplayVideo } from "./DrDeepaliAutoplayVideo";

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
  return (
    <div className={cn("relative overflow-hidden rounded-2xl ring-1 ring-navy/[0.08]", className)}>
      <DrDeepaliAutoplayVideo
        src={src}
        poster={poster}
        alt={alt}
        className="rounded-none"
        videoClassName="aspect-[4/5] object-top"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-navy backdrop-blur-sm">
        <Video className="h-3 w-3 text-brand" strokeWidth={2.25} />
        Live supervision
      </span>
    </div>
  );
}
