import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProgramSlug } from "./constants";
import {
  programCategories,
  type Program,
  type ProgramCategoryLayout,
  type ProgramCategoryTone,
} from "./conditions-data";
import { ProgramPreview, categoryServicesHeading } from "./ProgramPreview";

type Category = (typeof programCategories)[number];

export function categorySlug(cat: string) {
  return cat.toLowerCase() as ProgramSlug;
}

export function getCategoryBySlug(slug: string) {
  return programCategories.find((c) => categorySlug(c.cat) === slug);
}

export function getProgramHref(categorySlug: ProgramSlug, programSlug: string) {
  return `/services/${categorySlug}/${programSlug}`;
}

export function getProgramBySlugs(categorySlug: string, programSlug: string): {
  category: Category;
  program: Program;
} | null {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;
  const program = category.programs.find((p) => p.slug === programSlug) as Program | undefined;
  if (!program) return null;
  return { category, program };
}

export function getAllCategoryParams() {
  return programCategories.map((c) => ({ category: categorySlug(c.cat) }));
}

export function getAllProgramParams() {
  return programCategories.flatMap((c) => {
    const cat = categorySlug(c.cat);
    return c.programs.map((p) => ({ category: cat, program: p.slug }));
  });
}

const toneUi: Record<
  ProgramCategoryTone,
  {
    border: string;
    iconTile: string;
    iconHover: string;
    benefitIcon: string;
    clockIcon: string;
    label: string;
    chapterRing: string;
    chapterBg: string;
  }
> = {
  rose: {
    border: "border-l-[var(--brand-pink)]",
    iconTile: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    iconHover: "group-hover:bg-[var(--brand-pink)] group-hover:text-white",
    benefitIcon: "text-[var(--brand-pink)]",
    clockIcon: "text-[var(--brand-pink)]",
    label: "text-[var(--brand-pink-deep)]",
    chapterRing: "ring-[color-mix(in_oklch,var(--brand-pink)_18%,var(--border))]",
    chapterBg: "bg-[color-mix(in_oklch,white_72%,var(--primary-soft))]",
  },
  teal: {
    border: "border-l-[var(--brand-teal)]",
    iconTile: "bg-[var(--brand-teal-soft)] text-[var(--brand-teal-deep)]",
    iconHover: "group-hover:bg-[var(--brand-teal)] group-hover:text-white",
    benefitIcon: "text-[var(--brand-teal)]",
    clockIcon: "text-[var(--brand-teal)]",
    label: "text-[var(--brand-teal-deep)]",
    chapterRing: "ring-[color-mix(in_oklch,var(--brand-teal)_22%,var(--border))]",
    chapterBg: "bg-[color-mix(in_oklch,white_78%,var(--brand-teal-soft))]",
  },
  burgundy: {
    border: "border-l-[var(--brand-pink-deep)]",
    iconTile: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    iconHover: "group-hover:bg-[var(--brand-pink-deep)] group-hover:text-white",
    benefitIcon: "text-[var(--brand-pink-deep)]",
    clockIcon: "text-[var(--brand-pink-deep)]",
    label: "text-[var(--brand-pink-deep)]",
    chapterRing: "ring-[color-mix(in_oklch,var(--brand-pink-deep)_16%,var(--border))]",
    chapterBg: "bg-[color-mix(in_oklch,white_88%,var(--section-grey))]",
  },
};

function ProgramCard({
  program,
  tone,
  categorySlug: catSlug,
}: {
  program: Program;
  tone: ProgramCategoryTone;
  categorySlug: ProgramSlug;
}) {
  const PIcon = program.i;
  const t = toneUi[tone];
  return (
    <Link
      href={getProgramHref(catSlug, program.slug)}
      className={cn(
        "group flex h-full flex-col rounded-xl border border-navy/[0.08] border-l-[3px] bg-white p-5 shadow-[0_8px_32px_-16px_rgba(30,46,61,0.18)] transition-[box-shadow,border-color,transform] motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_16px_40px_-14px_rgba(30,46,61,0.22)] sm:p-6",
        t.border,
      )}
    >
      <div className="flex items-start gap-3.5">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
            t.iconTile,
            t.iconHover,
          )}
        >
          <PIcon className="h-[18px] w-[18px]" strokeWidth={1.65} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-display text-[1.05rem] font-bold leading-snug text-navy sm:text-lg">
            {program.t}
          </h4>
          <ProgramPreview program={program} />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-navy/[0.06] pt-4">
        <div className="flex items-center gap-2 font-sans-brand text-[12px] font-medium text-navy/65">
          <Clock className={cn("h-3.5 w-3.5 shrink-0", t.clockIcon)} />
          <span>{program.dur}</span>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 font-sans-brand text-[11px] font-bold uppercase tracking-[0.12em]",
            t.label,
          )}
        >
          View program
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function ProgramGrid({
  programs,
  tone,
  layout,
  categorySlug: catSlug,
}: {
  programs: Program[];
  tone: ProgramCategoryTone;
  layout: ProgramCategoryLayout;
  categorySlug: ProgramSlug;
}) {
  const gridPad = "gap-4 p-5 sm:gap-5 sm:p-8";

  if (layout === "quad") {
    return (
      <div className={cn("grid sm:grid-cols-2", gridPad)}>
        {programs.map((p) => (
          <ProgramCard key={p.t} program={p} tone={tone} categorySlug={catSlug} />
        ))}
      </div>
    );
  }

  if (layout === "five") {
    return (
      <div className={cn("grid sm:grid-cols-2 lg:grid-cols-6", gridPad)}>
        {programs.map((p, i) => (
          <div key={p.t} className={cn(i < 3 ? "lg:col-span-2" : "lg:col-span-3")}>
            <ProgramCard program={p} tone={tone} categorySlug={catSlug} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid sm:grid-cols-2 lg:grid-cols-3",
        gridPad,
        "[&>*:last-child:nth-child(3)]:sm:col-span-2 [&>*:last-child:nth-child(3)]:sm:max-w-md [&>*:last-child:nth-child(3)]:sm:justify-self-center [&>*:last-child:nth-child(3)]:lg:col-span-1 [&>*:last-child:nth-child(3)]:lg:max-w-none",
      )}
    >
      {programs.map((p) => (
        <ProgramCard key={p.t} program={p} tone={tone} categorySlug={catSlug} />
      ))}
    </div>
  );
}

export function CategoryChapter({
  cat,
  anchorId,
}: {
  cat: Category;
  anchorId?: string;
}) {
  const Icon = cat.icon;
  const t = toneUi[cat.tone];

  return (
    <section
      id={anchorId}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-2xl ring-1 sm:rounded-3xl",
        t.chapterRing,
        t.chapterBg,
      )}
    >
      <header className="relative border-b border-navy/[0.06] px-5 py-7 sm:px-8 sm:py-9">
        <span
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none font-display text-[5rem] font-bold leading-none text-navy/[0.05] sm:right-8 sm:text-[6.5rem]"
          aria-hidden
        >
          {cat.k}
        </span>
        <div className="relative max-w-3xl pr-14 sm:pr-28">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-navy/[0.08]">
              <Icon className={cn("h-5 w-5", t.label)} strokeWidth={1.6} />
            </span>
            <div>
              <p
                className={cn(
                  "font-sans-brand text-[10px] font-bold uppercase tracking-[0.2em]",
                  t.label,
                )}
              >
                {cat.tag}
              </p>
              <h3 className="font-display text-2xl font-bold text-navy sm:text-3xl">
                {categoryServicesHeading(cat.cat, cat.tag)}
              </h3>
            </div>
          </div>
          <p className="mt-4 font-sans-brand text-[15px] leading-relaxed text-navy/85 sm:text-base">
            {cat.desc}
          </p>
        </div>
      </header>

      <ProgramGrid
        programs={cat.programs}
        tone={cat.tone}
        layout={cat.layout}
        categorySlug={categorySlug(cat.cat)}
      />
    </section>
  );
}
