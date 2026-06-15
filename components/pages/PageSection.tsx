import { cn } from "@/lib/utils";
import { PageSectionBackdrop } from "@/components/pages/PageSectionBackdrop";

type PageSectionProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "section" | "background";
  id?: string;
  withBackdrop?: boolean;
};

export function PageSection({
  children,
  className,
  variant = "default",
  id,
  withBackdrop = true,
}: PageSectionProps) {
  const showBackdrop =
    withBackdrop && (variant === "section" || variant === "background");

  return (
    <section
      id={id}
      className={cn(
        "relative py-14 lg:py-20",
        variant === "section" && "overflow-hidden bg-section",
        variant === "background" && "overflow-hidden bg-background",
        className,
      )}
    >
      {showBackdrop ? <PageSectionBackdrop variant={variant} /> : null}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
    </section>
  );
}
