import Link from "next/link";
import { ExternalLink } from "lucide-react";
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

const categoryGuidance: Record<
  ProgramSlug,
  {
    overview: readonly string[];
    focus: readonly string[];
    source: { title: string; publisher: string; url: string };
  }
> = {
  cardiac: {
    overview: [
      "Cardiac rehabilitation is a structured return to activity after a cardiac diagnosis, procedure, or period of reduced capacity. It combines individually prescribed exercise with symptom monitoring, risk-factor education, and practical milestones such as walking, stairs, and daily household activity.",
      "Your starting level depends on your diagnosis, procedure, current symptoms, medication response, and guidance from your cardiologist. Exercise is progressed only when your clinical response supports it; it is not a generic fitness plan or a replacement for medical treatment.",
    ],
    focus: [
      "Diagnosis- and procedure-specific assessment before exercise begins",
      "Heart rate, blood pressure, symptoms, and perceived exertion monitoring",
      "Gradual return to daily function with clear stop and escalation rules",
    ],
    source: {
      title: "Core Components of Cardiac Rehabilitation Programs: 2024 Update",
      publisher: "American Heart Association and AACVPR",
      url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001289",
    },
  },
  pulmonary: {
    overview: [
      "Pulmonary rehabilitation combines exercise training, breathing and airway-clearance strategies, education, and self-management support. The program is adapted to the underlying lung condition rather than treating every form of breathlessness in the same way.",
      "Assessment considers oxygen saturation, symptom pattern, flare history, mobility, prescribed oxygen, and the activities that matter in everyday life. Some people need centre-based care or closer medical monitoring; tele-rehabilitation is recommended only when it is clinically suitable.",
    ],
    focus: [
      "Condition-specific breathing, pacing, and airway-clearance techniques",
      "SpO₂, heart rate, breathlessness, and fatigue monitoring during activity",
      "Progressive endurance and strength work linked to daily-life goals",
    ],
    source: {
      title: "Pulmonary Rehabilitation for Adults with Chronic Respiratory Disease",
      publisher: "American Thoracic Society clinical practice guideline",
      url: "https://www.thoracic.org/statements/guideline-implementation-tools/matrix-guidelines-and-derivatives-pulmonary-rehab-in-adults-08-23-23.php",
    },
  },
  metabolic: {
    overview: [
      "Metabolic rehabilitation uses planned physical activity to improve capacity, strength, mobility, and long-term health alongside medical and nutritional care. Exercise selection should account for medications, glucose response, cardiovascular risk, joint symptoms, fatigue, and relevant complications.",
      "The aim is a sustainable increase in safe activity—not rapid weight loss or exercise as a substitute for endocrinology care. Your program is adjusted as symptoms, laboratory measures, energy levels, and functional goals change.",
    ],
    focus: [
      "Baseline screening for medications, complications, and exercise tolerance",
      "Aerobic and resistance work adapted to glucose, fatigue, and joint response",
      "Progress measured through function, consistency, and relevant health markers",
    ],
    source: {
      title: "Standards of Care in Diabetes—2026: Physical Activity",
      publisher: "American Diabetes Association",
      url: "https://diabetesjournals.org/care/article/49/Supplement_1/S89/163932/5-Facilitating-Positive-Health-Behaviors-and-Well",
    },
  },
};

type ProgramCategoryPageProps = {
  slug: ProgramSlug;
};

export function ProgramCategoryPage({ slug }: ProgramCategoryPageProps) {
  const category = getCategoryBySlug(slug);
  const illustration = categoryIllustrations[slug];
  const guidance = categoryGuidance[slug];

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
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
          <div>
            <span className="pill">Clinical approach</span>
            <h2 className="heading-display mt-5">
              What {category.cat.toLowerCase()} rehabilitation{" "}
              <span className="text-brand">focuses on</span>
            </h2>
            <div className="mt-5 space-y-4">
              {guidance.overview.map((paragraph) => (
                <p key={paragraph} className="leading-[1.8] text-[var(--body-text)]">
                  {paragraph}
                </p>
              ))}
            </div>
            <a
              href={guidance.source.url}
              rel="external"
              className="mt-6 inline-flex items-start gap-2 rounded-xl border border-border/80 bg-white px-4 py-3 text-sm font-semibold leading-relaxed text-navy transition-colors hover:border-brand/35 hover:text-brand"
            >
              <span>
                Clinical source: {guidance.source.title}
                <span className="mt-0.5 block text-xs font-medium text-muted-foreground">
                  {guidance.source.publisher}
                </span>
              </span>
              <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            </a>
          </div>
          <aside className="rounded-2xl border border-[var(--brand-teal)]/20 bg-[var(--brand-teal-soft)]/35 p-6">
            <h3 className="font-display text-xl font-bold text-navy">Core priorities</h3>
            <ul className="mt-5 space-y-4">
              {guidance.focus.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-navy/80">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--brand-teal)]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
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
