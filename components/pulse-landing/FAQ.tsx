'use client';

import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { BackgroundBlob } from "./BackgroundBlob";
import { PHONE, WHATSAPP } from "./constants";
import { Reveal, StaggerItem, StaggerReveal } from "./motion";
import { WhatsAppIcon } from "./WhatsAppIcon";

type FaqItem = {
  id: string;
  q: string;
  a: string;
  featured?: boolean;
};

const faqs: FaqItem[] = [
  {
    id: "cost",
    q: "How much does the program cost?",
    a: "Pricing is discussed during your free assessment. Dr. Deepali will recommend a program suited to your condition - there is no obligation to join after the call.",
    featured: true,
  },
  {
    id: "family",
    q: "Can a family member join the call?",
    a: "Absolutely. Family members are welcome in the assessment call and in the sessions. Many of Dr. Deepali's patients are elderly, and their family members are actively involved in their recovery.",
    featured: true,
  },
  {
    id: "online-effective",
    q: "Is online rehabilitation as effective as in-person?",
    a: "Yes. Multiple studies confirm supervised tele-rehabilitation produces outcomes comparable to in-person programs for cardiac and pulmonary patients. The key word is supervised - sessions with Dr. Deepali are real-time, not pre-recorded videos.",
  },
  {
    id: "outside-noida",
    q: "Can I join if I am outside Noida?",
    a: "Absolutely. The tele-rehabilitation program is available to patients across India. All you need is a smartphone or computer and a stable internet connection.",
  },
  {
    id: "vs-discharge",
    q: "How is this different from the exercises my doctor gave me?",
    a: "Discharge exercises provide a valuable starting point for recovery. Rehabilitation, however, is far more individualized. At PulseBreath, every program is tailored to your specific diagnosis, symptoms, functional capacity, heart rate response, oxygen levels, and personal goals. Your exercises are continuously monitored and progressed based on how your body responds, ensuring that you improve safely and effectively over time. Rather than following a fixed exercise sheet, you receive a structured rehabilitation plan that evolves with your recovery journey.",
  },
  {
    id: "equipment",
    q: "What equipment do I need at home?",
    a: "For most programs, no equipment is needed. Some exercises may use a chair, a resistance band, or light weights - all of which Dr. Deepali will guide you on before the program begins.",
  },
  {
    id: "duration",
    q: "How long is a typical program?",
    a: "Most rehabilitation programs are designed for 8-12 weeks, with sessions typically conducted 2-3 times per week. The exact duration depends on your diagnosis, current functional capacity, rehabilitation goals, and how you progress throughout the program. During your initial assessment, Dr. Deepali will evaluate your condition and recommend a personalized rehabilitation plan, including the expected duration and frequency of sessions.",
  },
  {
    id: "safety",
    q: "Is it safe to exercise with my condition?",
    a: "When supervised by a specialist, yes - and it is essential. Structured, supervised exercise significantly improves outcomes for cardiac and pulmonary patients. The risk comes from exercising incorrectly or without guidance - which is exactly what Dr. Deepali's programs prevent.",
  },
];

const reassurancePoints = [
  "Free assessment - no obligation",
  "Family members welcome on every call",
  "Supervised sessions across India",
];

function FaqAccordionItem({
  item,
  index,
  open,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <StaggerItem
      as="div"
      className={`border-b border-border/70 last:border-b-0 ${open ? "bg-soft/25" : "bg-transparent"}`}
    >
      <button
        type="button"
        id={`faq-trigger-${item.id}`}
        aria-expanded={open}
        aria-controls={`faq-panel-${item.id}`}
        onClick={onToggle}
        className="flex w-full items-start gap-4 px-5 py-5 text-left transition-colors hover:bg-soft/15 sm:px-6 sm:py-5"
      >
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-background text-[11px] font-bold text-brand ring-1 ring-border/80">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className="font-sans-brand text-[15px] font-semibold leading-snug text-navy sm:text-base">
              {item.q}
            </span>
            {item.featured ? (
              <span className="rounded-full bg-[var(--primary-soft)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-brand">
                Common
              </span>
            ) : null}
          </span>
        </span>
        <ChevronDown
          className={`mt-1 h-5 w-5 shrink-0 text-brand transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          strokeWidth={2.25}
        />
      </button>
      <div
        id={`faq-panel-${item.id}`}
        role="region"
        aria-labelledby={`faq-trigger-${item.id}`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 pl-16 text-[14px] leading-[1.75] text-[var(--body-text)] sm:px-6 sm:pb-6 sm:pl-[4.25rem] sm:text-[15px]">
            {item.a}
          </p>
        </div>
      </div>
    </StaggerItem>
  );
}

export function FAQ() {
  const [openId, setOpenId] = useState(faqs[0]?.id ?? "");

  return (
    <section id="faqs" className="relative overflow-hidden bg-section py-14 lg:py-20">
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

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:gap-14 xl:gap-16">
          <Reveal
            variant="fadeUp"
            className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start"
          >
            <span className="pill">FAQs</span>
            <h2 className="heading-display mt-6">
              Your questions,{" "}
              <span className="font-display italic text-brand">answered honestly.</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-[var(--body-text)]">
              Clear answers about cost, safety, family involvement, and how supervised tele-rehab
              works with PulseBreath.
            </p>

            <ul className="mt-8 space-y-3">
              {reassurancePoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-snug text-navy/85">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-border/70 bg-background/80 p-5 backdrop-blur-sm">
              <p className="font-sans-brand text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                Still have a question?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-navy/85">
                Book a free call with Dr. Deepali - no obligation.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener"
                  className="motion-btn inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand/90"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={`tel:${PHONE}`}
                  className="motion-btn inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:bg-soft/40"
                >
                  <Phone className="h-4 w-4 text-brand" strokeWidth={2.25} />
                  Call
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.12}>
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-background shadow-[0_20px_56px_-32px_rgba(30,46,61,0.16)]">
              <div
                aria-hidden
                className="h-1 bg-gradient-to-r from-teal via-brand to-teal opacity-80"
              />
              <div className="border-b border-border/70 px-5 py-4 sm:px-6">
                <p className="font-sans-brand text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {faqs.length} questions answered
                </p>
              </div>

              <StaggerReveal as="div" itemVariant="fadeUp" amount={0.08}>
                {faqs.map((item, index) => (
                  <FaqAccordionItem
                    key={item.id}
                    item={item}
                    index={index}
                    open={openId === item.id}
                    onToggle={() => setOpenId(openId === item.id ? "" : item.id)}
                  />
                ))}
              </StaggerReveal>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
