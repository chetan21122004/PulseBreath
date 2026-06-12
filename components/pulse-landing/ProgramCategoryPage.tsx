import Link from "next/link";
import { WHATSAPP, type ProgramSlug } from "./constants";
import { getCategoryBySlug, CategoryChapter } from "./ProgramCatalog";
import { ProblemBlock } from "./ProblemBlock";
import { SectionIllustration } from "./SectionIllustration";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ILLUSTRATIONS } from "./visual-assets";

const categoryIllustrations: Record<ProgramSlug, { src: string; alt: string }> = {
  cardiac: {
    src: ILLUSTRATIONS.cardiologistBro,
    alt: "Cardiologist providing specialized heart care",
  },
  pulmonary: {
    src: ILLUSTRATIONS.elderlyRafiki,
    alt: "Patient breathing easier after pulmonary rehabilitation",
  },
  metabolic: {
    src: ILLUSTRATIONS.cardiologistRafiki,
    alt: "Specialist guiding metabolic rehabilitation",
  },
};

type ProgramCategoryPageProps = {
  slug: ProgramSlug;
};

export function ProgramCategoryPage({ slug }: ProgramCategoryPageProps) {
  const category = getCategoryBySlug(slug);
  const illustration = categoryIllustrations[slug];

  if (!category) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20 text-center">
        <p className="text-navy">Program category not found.</p>
        <Link href="/" className="mt-4 inline-block text-brand hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <>
      <section className="relative overflow-hidden bg-section py-12 lg:py-16">
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <span className="pill">{category.tag}</span>
              <h1 className="heading-display mt-5">{category.cat} Rehabilitation</h1>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--body-text)] sm:text-base">
                {category.desc}
              </p>
              <div className="mt-6 flex items-center gap-3 rounded-xl border border-navy/10 bg-white/80 px-4 py-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-soft">
                  <Icon className="h-5 w-5 text-brand" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-brand">{category.stat.v}</p>
                  <p className="text-xs text-navy/70">{category.stat.l}</p>
                </div>
              </div>
            </div>
            <SectionIllustration
              src={illustration.src}
              alt={illustration.alt}
              className="mx-auto max-w-sm lg:max-w-md"
            />
          </div>
        </div>
      </section>

      <ProblemBlock />

      <section className="bg-background py-12 lg:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 text-center lg:text-left">
            <span className="pill">Full Program Catalog</span>
            <h2 className="heading-display mt-5">
              {category.cat} programs -{" "}
              <span className="text-brand">clinical detail</span>
            </h2>
            <p className="mt-4 max-w-2xl text-[var(--body-text)]">
              Every program below is condition-specific, evidence-based, and personally supervised
              by Dr. Deepali Shah.
            </p>
          </div>
          <CategoryChapter cat={category} />
        </div>
      </section>

      <section className="bg-section py-10 lg:py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p className="text-center font-sans-brand text-sm text-navy/75 sm:text-left">
            Ready to find the right {category.cat.toLowerCase()} program for you?
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener"
            className="btn-whatsapp inline-flex shrink-0 items-center gap-2"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Book Free Assessment
          </a>
        </div>
      </section>
    </>
  );
}
