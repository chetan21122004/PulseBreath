import { cn } from "@/lib/utils";

type PageSectionProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "section" | "background";
  id?: string;
};

export function PageSection({
  children,
  className,
  variant = "default",
  id,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-14 lg:py-20",
        variant === "section" && "bg-section",
        variant === "background" && "bg-background",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
    </section>
  );
}
