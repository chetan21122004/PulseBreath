import { cn } from "@/lib/utils";
import { BLOBS } from "./visual-assets";

type BlobVariant = keyof typeof BLOBS;
type BlendMode = "multiply" | "soft-light" | "normal";

type BackgroundBlobProps = {
  variant?: BlobVariant;
  className?: string;
  opacity?: number;
  blend?: BlendMode;
  /** Stretch to fill the parent section (inset-0 + object-cover). */
  cover?: boolean;
};

const blendClass: Record<BlendMode, string> = {
  multiply: "mix-blend-multiply",
  "soft-light": "mix-blend-soft-light",
  normal: "",
};

export function BackgroundBlob({
  variant = 1,
  className,
  opacity = 0.22,
  blend = "multiply",
  cover = false,
}: BackgroundBlobProps) {
  return (
    <img
      src={BLOBS[variant]}
      alt=""
      aria-hidden
      draggable={false}
      className={cn(
        "pointer-events-none absolute select-none",
        cover
          ? "inset-0 z-0 h-full w-full min-h-full scale-[1.12] object-cover blur-[3px]"
          : "object-contain",
        blendClass[blend],
        className,
      )}
      style={{ opacity }}
    />
  );
}
