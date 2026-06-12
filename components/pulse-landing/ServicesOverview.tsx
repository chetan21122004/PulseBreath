"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PROGRAM_ROUTES, type ProgramSlug } from "./constants";
import { categorySlug } from "./ProgramCatalog";
import {
  programCategories,
  type ProgramCategoryLayout,
  type ProgramCategoryTone,
} from "./conditions-data";
import { BackgroundBlob } from "./BackgroundBlob";
import { Reveal } from "./motion";
import { SectionIllustration } from "./SectionIllustration";
import { ILLUSTRATIONS } from "./visual-assets";

type Program = (typeof programCategories)[number]["programs"][number];
type ToneUi = (typeof toneUi)[ProgramCategoryTone];

const AUTOPLAY_MS = 4800;

const toneUi: Record<
  ProgramCategoryTone,
  {
    label: string;
    iconTile: string;
    cardBorder: string;
    iconHover: string;
    link: string;
    numberBg: string;
    chapterRing: string;
    chapterBg: string;
  }
> = {
  rose: {
    label: "text-[var(--brand-pink-deep)]",
    iconTile: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    cardBorder: "border-l-[var(--brand-pink)]",
    iconHover: "group-hover:bg-[var(--brand-pink)] group-hover:text-white",
    link: "text-[var(--brand-pink)]",
    numberBg: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    chapterRing: "ring-[color-mix(in_oklch,var(--brand-pink)_18%,var(--border))]",
    chapterBg: "bg-[color-mix(in_oklch,white_72%,var(--primary-soft))]",
  },
  teal: {
    label: "text-[var(--brand-teal-deep)]",
    iconTile: "bg-[var(--brand-teal-soft)] text-[var(--brand-teal-deep)]",
    cardBorder: "border-l-[var(--brand-teal)]",
    iconHover: "group-hover:bg-[var(--brand-teal)] group-hover:text-white",
    link: "text-[var(--brand-teal)]",
    numberBg: "bg-[var(--brand-teal-soft)] text-[var(--brand-teal-deep)]",
    chapterRing: "ring-[color-mix(in_oklch,var(--brand-teal)_22%,var(--border))]",
    chapterBg: "bg-[color-mix(in_oklch,white_78%,var(--brand-teal-soft))]",
  },
  burgundy: {
    label: "text-[var(--brand-pink-deep)]",
    iconTile: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    cardBorder: "border-l-[var(--brand-pink-deep)]",
    iconHover: "group-hover:bg-[var(--brand-pink-deep)] group-hover:text-white",
    link: "text-[var(--brand-pink-deep)]",
    numberBg: "bg-[var(--primary-soft)] text-[var(--brand-pink-deep)]",
    chapterRing: "ring-[color-mix(in_oklch,var(--brand-pink-deep)_16%,var(--border))]",
    chapterBg: "bg-[color-mix(in_oklch,white_88%,var(--section-grey))]",
  },
};

function slugFromCategory(cat: string): ProgramSlug {
  return categorySlug(cat);
}

function useStackPeekIndices(stackRef: RefObject<HTMLDivElement | null>) {
  const [peekIndices, setPeekIndices] = useState<ReadonlySet<number>>(new Set());

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const update = () => {
      const cards = Array.from(stack.querySelectorAll<HTMLElement>("[data-stack-card]"));
      const nextPeek = new Set<number>();
      const headerOffset = parseFloat(getComputedStyle(stack).getPropertyValue("--stack-step")) || 0;

      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];
        if (!nextCard) return;

        const cardTop = card.getBoundingClientRect().top;
        const nextTop = nextCard.getBoundingClientRect().top;
        if (nextTop - cardTop <= headerOffset + 8) {
          nextPeek.add(index);
        }
      });

      setPeekIndices(nextPeek);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [stackRef]);

  return peekIndices;
}

function ServiceProgramsCarousel({
  programs,
  renderCard,
  className,
}: {
  programs: Program[];
  renderCard: (program: Program, index: number) => ReactNode;
  className?: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(programs.length);

  const onSelect = useCallback((embla: CarouselApi) => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
    setSnapCount(embla.scrollSnapList().length);
  }, []);

  useEffect(() => {
    if (!api) return;

    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let timer = window.setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    const root = api.rootNode();

    const pause = () => window.clearInterval(timer);
    const resume = () => {
      pause();
      timer = window.setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    };

    root.addEventListener("mouseenter", pause);
    root.addEventListener("focusin", pause);
    root.addEventListener("mouseleave", resume);
    root.addEventListener("focusout", resume);

    return () => {
      pause();
      root.removeEventListener("mouseenter", pause);
      root.removeEventListener("focusin", pause);
      root.removeEventListener("mouseleave", resume);
      root.removeEventListener("focusout", resume);
    };
  }, [api]);

  return (
    <div className={cn("relative", className)}>
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start", containScroll: "trimSnaps" }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 sm:-ml-4">
          {programs.map((program, index) => (
            <CarouselItem
              key={program.t}
              className="basis-[88%] pl-3 sm:basis-[46%] sm:pl-4 lg:basis-1/3"
            >
              <div className="h-full">{renderCard(program, index)}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-4 flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: snapCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === selected ? "w-6 bg-brand" : "w-1.5 bg-navy/20",
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Previous programs"
            onClick={() => api?.scrollPrev()}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-sm transition-colors hover:border-navy/20 hover:bg-navy/[0.03]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next programs"
            onClick={() => api?.scrollNext()}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-sm transition-colors hover:border-navy/20 hover:bg-navy/[0.03]"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({
  program,
  slug,
  tone,
  number,
}: {
  program: Program;
  slug: ProgramSlug;
  tone: ToneUi;
  number: number;
}) {
  const ProgramIcon = program.i;

  return (
    <a
      href={PROGRAM_ROUTES[slug]}
      className={cn(
        "group motion-card relative flex h-full min-h-[148px] flex-col rounded-xl border border-navy/[0.08] border-l-[3px] bg-white p-5 pr-12 shadow-[0_4px_20px_-10px_rgba(30,46,61,0.12)] transition-[box-shadow,transform,border-color] hover:-translate-y-0.5 hover:border-navy/15 hover:shadow-[0_16px_40px_-14px_rgba(30,46,61,0.2)] sm:p-6 sm:pr-14",
        tone.cardBorder,
      )}
    >
      <span
        className={cn(
          "absolute right-4 top-4 rounded-full px-2 py-1 font-sans-brand text-[10px] font-bold leading-none tracking-[0.14em] transition-colors group-hover:bg-brand group-hover:text-white",
          tone.numberBg,
        )}
      >
        {String(number).padStart(2, "0")}
      </span>

      <div className="flex items-start gap-3.5">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
            tone.iconTile,
            tone.iconHover,
          )}
        >
          <ProgramIcon className="h-[18px] w-[18px]" strokeWidth={1.65} />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-display text-[1.05rem] font-bold leading-snug text-navy sm:text-lg">
            {program.t}
          </h4>
          <p className="mt-1.5 font-sans-brand text-[13px] leading-relaxed text-navy/70">
            {program.for}
          </p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <div className="flex items-center gap-2 font-sans-brand text-[12px] font-medium text-navy/60">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span>{program.dur}</span>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 font-sans-brand text-[11px] font-bold uppercase tracking-[0.12em] opacity-0 transition-all group-hover:gap-1.5 group-hover:opacity-100",
            tone.link,
          )}
        >
          Details
          <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </a>
  );
}

function ServiceCardsGrid({
  programs,
  slug,
  tone,
  layout,
}: {
  programs: Program[];
  slug: ProgramSlug;
  tone: ToneUi;
  layout: ProgramCategoryLayout;
}) {
  const pad = "gap-4 p-5 sm:gap-5 sm:p-8";

  if (programs.length >= 7) {
    return (
      <div className="p-5 sm:p-8">
        <ServiceProgramsCarousel
          programs={programs}
          renderCard={(program, index) => (
            <ServiceCard program={program} slug={slug} tone={tone} number={index + 1} />
          )}
        />
      </div>
    );
  }

  if (layout === "quad") {
    return (
      <div className={cn("grid sm:grid-cols-2", pad)}>
        {programs.map((program, index) => (
          <ServiceCard
            key={program.t}
            program={program}
            slug={slug}
            tone={tone}
            number={index + 1}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3",
        pad,
        "[&>*:last-child:nth-child(3)]:sm:col-span-2 [&>*:last-child:nth-child(3)]:sm:max-w-md [&>*:last-child:nth-child(3)]:sm:justify-self-center [&>*:last-child:nth-child(3)]:lg:col-span-1 [&>*:last-child:nth-child(3)]:lg:max-w-none",
      )}
    >
      {programs.map((program, index) => (
        <ServiceCard
          key={program.t}
          program={program}
          slug={slug}
          tone={tone}
          number={index + 1}
        />
      ))}
    </div>
  );
}

type CategoryChapter = (typeof programCategories)[number];

function CategoryChapterCard({
  category,
  slug,
  tone,
  isPeekHeader = false,
}: {
  category: CategoryChapter;
  slug: ProgramSlug;
  tone: ToneUi;
  isPeekHeader?: boolean;
}) {
  const CategoryIcon = category.icon;

  return (
    <div
      id={`service-${slug}`}
      className={cn(
        "scroll-mt-24 overflow-hidden rounded-2xl ring-1 transition-[box-shadow,transform] duration-500 sm:rounded-3xl",
        tone.chapterRing,
        tone.chapterBg,
      )}
    >
      <header
        className={cn(
          "service-chapter-header relative overflow-hidden rounded-t-2xl border-b border-navy/[0.06] px-5 py-6 transition-[min-height,padding] duration-300 sm:rounded-t-3xl sm:px-8 sm:py-8",
          isPeekHeader
            ? "min-h-[5.5rem] sm:min-h-[7rem] sm:py-5"
            : "min-h-[10.25rem] sm:min-h-[11.75rem]",
        )}
      >
        <span
          className={cn(
            "pointer-events-none absolute select-none font-display font-bold leading-none text-navy/[0.05] transition-all duration-300",
            isPeekHeader
              ? "right-4 top-4 text-[2rem] sm:right-6 sm:text-[2.5rem]"
              : "right-2 top-1/2 -translate-y-1/2 text-[3.5rem] sm:right-8 sm:text-[6rem]",
          )}
          aria-hidden
        >
          {category.k}
        </span>
        <div
          className={cn(
            "relative flex items-start gap-4 transition-[padding] duration-300",
            isPeekHeader ? "pr-14 sm:pr-20" : "pr-16 sm:pr-24",
          )}
        >
          <span
            className={cn(
              "flex shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-navy/[0.08] transition-all duration-300",
              isPeekHeader ? "h-10 w-10" : "h-12 w-12",
            )}
          >
            <CategoryIcon className={cn("h-5 w-5", tone.label)} strokeWidth={1.6} />
          </span>
          <div className="min-w-0">
            <p
              className={cn(
                "font-sans-brand text-[10px] font-bold uppercase tracking-[0.2em]",
                tone.label,
              )}
            >
              {category.tag}
            </p>
            <h3 className="font-display text-xl font-bold leading-tight text-navy sm:text-2xl">
              {category.cat} Services
            </h3>
            <p
              className={cn(
                "mt-2 max-w-xl overflow-hidden font-sans-brand text-sm leading-relaxed text-navy/75 transition-all duration-300",
                isPeekHeader ? "max-h-0 opacity-0" : "max-h-24 opacity-100",
              )}
            >
              {category.desc}
            </p>
          </div>
        </div>
      </header>

      <ServiceCardsGrid
        programs={category.programs}
        slug={slug}
        tone={tone}
        layout={category.layout}
      />
    </div>
  );
}

function stackScrollMargin(index: number) {
  if (index === 1) return "5.5rem";
  if (index === 2) return "0";
  return "2.5rem";
}

function StackedCategoryCards() {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const peekIndices = useStackPeekIndices(stackRef);

  return (
    <>
      <style>{`
        .services-stack {
          --stack-step: 5.5rem;
        }
        @media (min-width: 640px) {
          .services-stack {
            --stack-step: 7rem;
          }
        }
        .stack-category-card {
          position: sticky;
          top: calc(var(--header-height) + var(--stack-index) * var(--stack-step));
          will-change: transform;
        }
        @supports (animation-timeline: view()) {
          @media (prefers-reduced-motion: no-preference) {
            .stack-category-card {
              animation: stack-card-shrink linear both;
              animation-timeline: view();
              animation-range: exit 8% exit 100%;
            }
          }
        }
        @keyframes stack-card-shrink {
          100% {
            transform: scale(0.985) translateY(-2px);
            opacity: 0.96;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .services-stack {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding-bottom: 0;
          }
          .stack-category-card {
            position: relative;
            top: auto;
            will-change: auto;
            animation: none;
            margin-bottom: 0;
          }
        }
        @media (max-width: 767px) {
          .services-stack {
            padding-bottom: 2rem;
          }
          .stack-category-card {
            position: relative;
            top: auto;
            will-change: auto;
            animation: none;
          }
        }
      `}</style>

      <div ref={stackRef} className="services-stack relative pb-6 lg:pb-10">
        {programCategories.map((category, index) => {
          const slug = slugFromCategory(category.cat);
          const tone = toneUi[category.tone];
          const isLast = index === programCategories.length - 1;

          return (
            <div
              key={category.cat}
              data-stack-card
              className="stack-category-card mb-6 shadow-[0_20px_50px_-20px_rgba(30,46,61,0.22)] last:mb-0 sm:mb-8"
              style={
                {
                  "--stack-index": index,
                  zIndex: index + 1,
                  marginBottom: isLast ? 0 : stackScrollMargin(index),
                } as CSSProperties
              }
            >
              <CategoryChapterCard
                category={category}
                slug={slug}
                tone={tone}
                isPeekHeader={peekIndices.has(index)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}

export function ServicesOverview() {
  return (
    <section id="services" className="relative overflow-x-clip bg-background pb-5">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <BackgroundBlob variant={1} cover opacity={0.08} className="object-[50%_40%]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 45% at 15% 25%, rgba(58,143,163,0.06), transparent 65%), radial-gradient(45% 40% at 85% 75%, rgba(192,81,106,0.05), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(280px,380px)] lg:gap-12 xl:gap-16">
          <Reveal variant="fadeUp" className="text-center lg:text-left">
            <span className="pill">Services</span>
            <h2 className="heading-display mt-5 text-[2rem] sm:text-4xl lg:text-[2.75rem]">
              Complete Service{" "}
              <span className="font-display italic text-brand">Catalogue</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-sans-brand text-[15px] leading-relaxed text-navy/85 sm:text-base lg:mx-0">
              Specialist rehabilitation pathways for heart, lung, and metabolic health - designed
              with clinical precision, personalized to your goals, and supervised throughout.
            </p>
          </Reveal>

          <SectionIllustration
            src={ILLUSTRATIONS.cardiologistRafiki}
            alt="Specialist guiding personalised rehabilitation services"
            className="mx-auto w-full max-w-[min(100%,480px)] lg:max-w-none lg:justify-self-end"
            imgClassName="mx-auto max-h-[min(63vw,360px)] w-full object-contain sm:max-h-[390px] lg:max-h-[420px]"
            float={false}
            variant="fadeLeft"
          />
        </div>

        <nav
          className="flex flex-wrap items-center justify-start gap-2 border-b border-navy/10 pb-8 sm:hidden"
          aria-label="Service categories"
        >
          {programCategories.map((c) => {
            const Icon = c.icon;
            const anchor = slugFromCategory(c.cat);
            return (
              <a
                key={c.cat}
                href={`#service-${anchor}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-navy/10 bg-white px-3.5 py-2.5 font-sans-brand text-[13px] font-semibold text-navy shadow-sm transition-colors hover:border-brand/30 hover:text-brand"
              >
                <Icon className="h-3.5 w-3.5 opacity-70" aria-hidden />
                {c.cat}
                <span className="rounded-full bg-navy/[0.06] px-1.5 py-px text-[10px] font-bold text-navy/55">
                  {c.programs.length}
                </span>
              </a>
            );
          })}
        </nav>

        <StackedCategoryCards />

        <Reveal variant="fadeUp" delay={0.1}>
          <div className="relative z-10 mt-5 rounded-2xl border border-navy/10 bg-white/90 px-6 py-5 text-center sm:text-left lg:mt-5">
            <p className="font-sans-brand text-sm text-navy/75">
              Unsure which service applies to you? Dr. Deepali will guide you during your free
              assessment - no obligation to enrol.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
