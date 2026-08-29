'use client';

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Quote, Star, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { BackgroundBlob } from "./BackgroundBlob";
import { StaggerItem, StaggerReveal } from "./motion";
import { SectionIllustration } from "./SectionIllustration";
import { SectionPageLink } from "./SectionPageLink";
import { ENQUIRY_HREF } from "./constants";
import { ILLUSTRATIONS } from "./visual-assets";

const PREVIEW_LENGTH = 150;
const AGGREGATE_RATING = 4.9;

const testimonials = [
  {
    quote:
      "Hello, I have been taking sessions from Dr. Deepali Shah for last few months. Earlier I could barely walk for 2 to 3 minutes which has gradually improved to 10 mins. Also on activity my oxygen levels would drop to 90 which has improved to 94 / 95. Dr. Deepali is very good and guides me with breathing techniques. My flexibility has also improved. She is also very motivating and excellent in her work. Thank you Dr. Deepali.",
    name: "Mrs. Hansa V.",
    role: "Patient",
    city: "India",
    program: "Pulmonary Rehab",
    rating: 5,
    illustration: ILLUSTRATIONS.elderlyRafiki,
    illustrationAlt: "Patient breathing easier after pulmonary rehabilitation",
  },
  {
    quote:
      "My personal experience with Dr. Deepali Shah: I have been associated with Dr. Deepali Shah online over the last 2-3 months. I suffer from an auto-immune disease & the lung exercises & other exercises with weights / water bottles, theraband, & body movement exercises are helping me in my day-to-day living activities. I have gotten to know her as a genuine physiotherapist who will not fleece people. She is very knowledgeable & a very confident doctor. The instructions given during her sessions are very clear. When I have a personal query regarding my health she has always addressed them & has never put them off. I wish Dr. Deepali the very best & pray for God's blessings on her & her family.",
    name: "Mrs. Mary Mathews",
    role: "Patient",
    city: "India",
    program: "Tele-Rehab",
    rating: 5,
    illustration: ILLUSTRATIONS.onlineDoctor,
    illustrationAlt: "Supervised tele-rehabilitation session from home",
  },
  {
    quote:
      "I was immensely benefited from the guidance of Dr Deepali Shah. She was always helpful, approachable and could able to understand my issues well. Her positive feedbacks always encouraged and motivated me to move ahead towards my health goals.",
    name: "Deepa Wagle",
    role: "Patient",
    city: "India",
    program: "Pulmonary Rehab",
    rating: 5,
    illustration: ILLUSTRATIONS.elderlyAmico,
    illustrationAlt: "Patient supported through guided pulmonary rehabilitation",
  },
  {
    quote:
      "Dr. Deepali is a very good physiotherapist. She doesn't only have physiotherapy knowledge but deeply looks into ECG and all the medical reports. Understands all your problems and aims at your perfect good cardio health. She is very dedicated and result giving doctor. I had angioplasty and was under her PT and she not only gave me my confidence back but also good cardiac health.",
    name: "Seema Adhav",
    role: "Patient",
    city: "India",
    program: "Cardiac Rehab",
    rating: 5,
    illustration: ILLUSTRATIONS.cardiologistRafiki,
    illustrationAlt: "Cardiac rehabilitation with thorough medical review",
  },
  {
    quote:
      "One of the things I appreciated most about Deepali Shah was how comfortable she made me feel during every session. She listens without rushing, encourages you to openly share any discomfort or concerns, and adjusts the treatment accordingly. The exercises were explained thoroughly, and she made sure I understood the purpose behind each one. Her guidance and encouragement kept me motivated throughout my recovery.",
    name: "Sahana Deshpande",
    role: "Patient",
    city: "India",
    program: "Physiotherapy",
    rating: 5,
    illustration: ILLUSTRATIONS.cardiologistBro,
    illustrationAlt: "Comfortable one-on-one physiotherapy session",
  },
  {
    quote:
      "I have a lung problem. And due to my allergic condition, I get sick easily. But since I started physiotherapy under Dr. Deepali ji, there has been a lot of difference. Our sessions are online but the doctor always explains each exercise step by step, guides us according to our condition, it never feels like she is not in front of us. She guides very well and is also helpful. She is attentive to the time, and since we treat online, it is easy for us and she also clarifies our doubts. With her guidance, my stamina has increased, my breathing is also better than before. Dr Deepali is friendly and very kind physiotherapist. I would recommend you 100%. Thank you mam for your support and guidance!",
    name: "Archita Raktade",
    role: "Patient",
    city: "India",
    program: "Tele-Rehab",
    rating: 5,
    illustration: ILLUSTRATIONS.onlineDoctor,
    illustrationAlt: "Online pulmonary rehabilitation session from home",
  },
] as const;

function StarRating({
  rating,
  size = "md",
  className = "",
}: {
  rating: number;
  size?: "sm" | "md" | "card";
  className?: string;
}) {
  const clamped = Math.min(5, Math.max(0, rating));
  const iconClass =
    size === "sm" ? "h-3 w-3" : size === "card" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`${clamped} out of 5 stars`}
    >
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.min(Math.max(clamped - index, 0), 1);
        return (
          <span key={index} className="relative inline-flex shrink-0">
            <Star className={`${iconClass} text-brand/25`} strokeWidth={2} aria-hidden />
            {fill > 0 ? (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
                aria-hidden
              >
                <Star className={`${iconClass} fill-brand text-brand`} strokeWidth={2} />
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

function getPreview(quote: string) {
  if (quote.length <= PREVIEW_LENGTH) {
    return { preview: quote, hasMore: false };
  }
  const cut = quote.slice(0, PREVIEW_LENGTH).replace(/\s+\S*$/, "");
  return { preview: `${cut}…`, hasMore: true };
}

function ReviewPopover({
  open,
  onOpenChange,
  quote,
  name,
  program,
  rating,
  trigger,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quote: string;
  name: string;
  program: string;
  rating: number;
  trigger: ReactNode;
}) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={10}
        collisionPadding={20}
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="flex w-[min(26rem,calc(100vw-1.5rem))] max-w-none flex-col gap-0 overflow-hidden rounded-2xl border border-border/80 bg-background p-0 shadow-[0_20px_56px_-24px_rgba(30,46,61,0.38)]"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-border/70 bg-soft/40 px-4 py-4 sm:px-5">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
              Patient review
            </p>
            <p className="mt-1 font-display text-base font-bold leading-snug text-navy sm:text-lg">
              {name}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StarRating rating={rating} size="sm" />
              <span className="font-sans-brand text-xs font-medium text-navy/70">
                {rating} / 5
              </span>
              <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                {program}
              </span>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close review"
            onClick={() => onOpenChange(false)}
            className="shrink-0 rounded-lg border border-border/70 bg-background p-1.5 text-muted-foreground transition-colors hover:border-brand/30 hover:bg-soft hover:text-navy"
          >
            <X className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </div>

        <div className="relative min-h-0 flex-1">
          <div
            className="max-h-[min(58vh,24rem)] touch-pan-y overflow-y-auto overscroll-y-contain px-4 py-4 sm:px-5 sm:py-5 [scrollbar-color:rgba(192,81,106,0.35)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand/30 [&::-webkit-scrollbar-track]:bg-transparent"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <Quote className="mb-3 h-7 w-7 text-brand/20" strokeWidth={1.5} />
            <blockquote className="pr-1 font-sans-brand text-[16px] font-normal leading-[1.85] text-navy sm:text-[17px]">
              &ldquo;{quote}&rdquo;
            </blockquote>
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background via-background/80 to-transparent"
          />
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-border/70 bg-background px-4 py-3 sm:px-5">
          <p className="text-sm text-navy/70">Scroll to read the full review</p>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="text-[15px] font-semibold text-brand transition-colors hover:text-brand/80"
          >
            Close
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
  city,
  program,
  rating,
  illustration,
  illustrationAlt,
}: (typeof testimonials)[number]) {
  const { preview, hasMore } = getPreview(quote);
  const [open, setOpen] = useState(false);

  return (
    <article className="motion-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/90 shadow-sm backdrop-blur-sm">
      <div className="border-b border-border bg-soft/30 px-4 py-4">
        <SectionIllustration
          src={illustration}
          alt={illustrationAlt}
          className="mx-auto w-full max-w-[160px]"
          imgClassName="max-h-[120px] w-full object-contain"
          animateOnScroll={false}
        />
      </div>
      <div className="relative flex flex-1 flex-col p-6">
        <Quote className="absolute right-4 top-4 h-10 w-10 text-brand/10 transition-transform duration-500 group-hover:scale-110" />
        <StarRating rating={rating} size="card" />
        <blockquote className="mt-4 flex-1 font-sans-brand text-[17px] font-normal leading-[1.75] text-navy sm:text-[18px]">
          &ldquo;{preview}&rdquo;
        </blockquote>

        {hasMore ? (
          <ReviewPopover
            open={open}
            onOpenChange={setOpen}
            quote={quote}
            name={name}
            program={program}
            rating={rating}
            trigger={
              <button
                type="button"
                aria-expanded={open}
                className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-md text-[15px] font-semibold text-brand transition-colors hover:text-brand/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                {open ? "Close" : "Read more"}
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
                  strokeWidth={2.25}
                />
              </button>
            }
          />
        ) : null}

        <div className="mt-6 border-t border-border pt-5">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-soft font-display text-sm font-bold text-brand">
              {name.split(" ").slice(-1)[0][0]}
            </div>
            <div>
              <p className="font-sans-brand text-base font-semibold text-navy">{name}</p>
              <p className="font-sans-brand text-sm leading-snug text-navy/80">
                {role} · {city}
              </p>
            </div>
          </div>
          <span className="mt-3 inline-flex items-center rounded-full bg-brand/10 px-3 py-1 font-sans-brand text-[11px] font-bold uppercase tracking-[0.14em] text-brand">
            {program}
          </span>
        </div>
      </div>
    </article>
  );
}

function TestimonialsCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState<number>(testimonials.length);

  const onSelect = useCallback((embla: CarouselApi) => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
    setSnapCount(embla.scrollSnapList().length);
  }, []);

  useEffect(() => {
    if (!api) return;

    const frame = window.requestAnimationFrame(() => onSelect(api));
    api.on("reInit", onSelect);
    api.on("select", onSelect);

    return () => {
      window.cancelAnimationFrame(frame);
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  return (
    <div className="relative mx-auto mt-12 max-w-4xl lg:max-w-6xl">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start", containScroll: "trimSnaps" }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 sm:-ml-4">
          {testimonials.map((item) => (
            <CarouselItem
              key={item.name}
              className="basis-full pl-3 sm:basis-[48%] sm:pl-4 lg:basis-1/3"
            >
              <div className="group h-full">
                <TestimonialCard {...item} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-6 flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: snapCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to review ${index + 1}`}
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
            aria-label="Previous reviews"
            onClick={() => api?.scrollPrev()}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-sm transition-colors hover:border-navy/20 hover:bg-navy/[0.03]"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next reviews"
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

type TestimonialsProps = {
  mode?: "teaser" | "full";
};

export function Testimonials({ mode = "teaser" }: TestimonialsProps) {
  return (
    <section
      className={`relative overflow-hidden bg-background ${
        mode === "full" ? "py-20 lg:py-28" : "py-20 lg:py-24"
      }`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <BackgroundBlob variant={1} cover opacity={0.1} className="object-[60%_40%]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(55% 45% at 15% 20%, rgba(58,143,163,0.07), transparent 65%), radial-gradient(45% 40% at 85% 80%, rgba(192,81,106,0.06), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <StaggerReveal className="mx-auto max-w-2xl text-center" itemVariant="fadeUp">
          <StaggerItem>
            <span className="pill">Patient Voices</span>
          </StaggerItem>
          <StaggerItem>
            <h2 className="heading-display mt-6">
              Real recoveries, <span className="font-display italic text-brand">real people.</span>
            </h2>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-5 flex items-center justify-center gap-3">
              <StarRating rating={AGGREGATE_RATING} />
              <span className="text-sm font-medium text-navy/70">
                {AGGREGATE_RATING} / 5 patient rating
              </span>
            </div>
          </StaggerItem>
        </StaggerReveal>

        <TestimonialsCarousel />

        <div className="mt-10 text-center">
          <SectionPageLink href={ENQUIRY_HREF} className="justify-center">
            Start your recovery journey
          </SectionPageLink>
        </div>
      </div>
    </section>
  );
}
