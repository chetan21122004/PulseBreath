import { BackgroundBlob } from "@/components/pulse-landing/BackgroundBlob";
import { cn } from "@/lib/utils";

type PageSectionBackdropProps = {
  variant: "section" | "background";
  className?: string;
};

export function PageSectionBackdrop({ variant, className }: PageSectionBackdropProps) {
  if (variant === "section") {
    return (
      <div aria-hidden className={cn("pointer-events-none absolute inset-0 z-0", className)}>
        <BackgroundBlob variant={1} cover opacity={0.08} className="object-[70%_40%]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 45% at 15% 30%, rgba(192,81,106,0.06), transparent 65%), radial-gradient(45% 40% at 90% 70%, rgba(58,143,163,0.07), transparent 70%)",
          }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 z-0", className)}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 40% at 8% 15%, rgba(46,139,139,0.06), transparent 60%), radial-gradient(45% 38% at 92% 85%, rgba(176,64,96,0.05), transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--brand-dark) 1px, transparent 1px), linear-gradient(to bottom, var(--brand-dark) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
