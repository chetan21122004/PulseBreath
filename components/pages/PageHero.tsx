import { BackgroundBlob } from "@/components/pulse-landing/BackgroundBlob";
import { Reveal } from "@/components/pulse-landing/motion";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  pill: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  withBlob?: boolean;
};

export function PageHero({
  pill,
  title,
  description,
  children,
  className,
  withBlob = true,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/60 bg-background pt-10 pb-14 lg:pt-14 lg:pb-20",
        className,
      )}
    >
      {withBlob ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <BackgroundBlob variant={1} cover opacity={0.08} className="object-[70%_40%]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 45% at 15% 30%, rgba(192,81,106,0.06), transparent 65%), radial-gradient(45% 40% at 90% 70%, rgba(58,143,163,0.07), transparent 70%)",
            }}
          />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal variant="fadeUp">
          <span className="pill">{pill}</span>
          <h1 className="heading-display mt-5 max-w-4xl text-[2rem] sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--body-text)] sm:text-lg">
              {description}
            </p>
          ) : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
