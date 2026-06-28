import Link from "next/link";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { Reveal } from "@/components/pulse-landing/motion";
import { WHATSAPP, type ProgramSlug } from "./constants";
import { getCategoryBySlug, CategoryChapter } from "./ProgramCatalog";
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
      <PageHero
        pill={category.tag}
        title={
          <>
            {category.cat}{" "}
            <span className="font-display italic text-brand">Rehabilitation</span>
          </>
        }
        description={category.heroDesc}
      >
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-3 rounded-xl border border-border/80 bg-white/80 px-4 py-3 shadow-sm">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-soft">
              <Icon className="h-5 w-5 text-brand" strokeWidth={1.6} />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-brand">{category.stat.v}</p>
              <p className="text-xs text-navy/70">{category.stat.l}</p>
            </div>
          </div>
          <SectionIllustration
            src={illustration.src}
            alt={illustration.alt}
            className="max-w-[200px] sm:max-w-[240px]"
            float={false}
            variant="fadeLeft"
          />
        </div>
      </PageHero>

      <PageSection variant="background">
        <Reveal variant="fadeUp">
          <span className="pill">Programs</span>
          <h2 className="heading-display mt-5">
            {category.cat} <span className="text-brand">services</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--body-text)]">
            Condition-specific rehabilitation programs, supervised throughout.
          </p>
        </Reveal>
        <div className="mt-10">
          <CategoryChapter cat={category} />
        </div>
      </PageSection>

      <PageSection variant="section">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center font-sans-brand text-sm text-navy/75 sm:text-left">
            Ready to find the right {category.cat.toLowerCase()} program for you?
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp inline-flex shrink-0 items-center gap-2"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Book Free Assessment
          </a>
        </div>
      </PageSection>
    </>
  );
}
