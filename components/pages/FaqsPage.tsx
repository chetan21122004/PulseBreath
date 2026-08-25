'use client';

import { useState } from "react";
import { Phone } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { FaqAccordion } from "@/components/pages/FaqAccordion";
import {
  FAQ_CATEGORIES,
  getFaqsByCategory,
  type FaqCategory,
} from "@/components/pulse-landing/faq-data";
import { PHONE, WHATSAPP } from "@/components/pulse-landing/constants";
import { Reveal } from "@/components/pulse-landing/motion";
import { WhatsAppIcon } from "@/components/pulse-landing/WhatsAppIcon";
import { cn } from "@/lib/utils";

export function FaqsPage() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("general");
  const [openId, setOpenId] = useState("");
  const categoryFaqs = getFaqsByCategory(activeCategory);

  return (
    <>
      <PageHero
        pill="FAQs"
        title={
          <>
            Your questions,{" "}
            <span className="font-display italic text-brand">answered honestly.</span>
          </>
        }
        description="Clear answers about cost, safety, family involvement, and how supervised tele-rehab works with PulseBreath."
      >
      </PageHero>

      <PageSection variant="section">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] lg:gap-14">
          <Reveal variant="fadeUp" className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:self-start">
            <p className="section-label mb-4">Browse by topic</p>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-1">
              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setOpenId("");
                  }}
                  className={cn(
                    "rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors",
                    activeCategory === cat.id
                      ? "bg-brand text-white shadow-[0_8px_24px_-8px_rgba(176,64,96,0.45)]"
                      : "bg-background text-navy ring-1 ring-border/80 hover:bg-soft/40",
                  )}
                >
                  {cat.label}
                  <span className="ml-2 text-xs opacity-70">
                    ({getFaqsByCategory(cat.id).length})
                  </span>
                </button>
              ))}
            </div>

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
            <FaqAccordion
              key={activeCategory}
              items={categoryFaqs}
              openId={openId}
              onToggle={setOpenId}
            />
          </Reveal>
        </div>
      </PageSection>
    </>
  );
}
