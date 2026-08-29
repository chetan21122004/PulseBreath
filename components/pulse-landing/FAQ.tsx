'use client';

import { useState } from "react";
import { Phone, Send } from "lucide-react";
import { BackgroundBlob } from "./BackgroundBlob";
import { ENQUIRY_HREF, PHONE, WHATSAPP } from "./constants";
import { HOMEPAGE_FAQS, FAQ_REASSURANCE } from "./faq-data";
import { FaqAccordionItem } from "@/components/pages/FaqAccordion";
import { Reveal } from "./motion";
import { SectionPageLink } from "./SectionPageLink";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function FAQ() {
  const [openId, setOpenId] = useState(HOMEPAGE_FAQS[0]?.id ?? "");

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
              {FAQ_REASSURANCE.map((point) => (
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
                  href={ENQUIRY_HREF}
                  className="motion-btn inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:bg-soft/40"
                >
                  <Send className="h-4 w-4 text-brand" strokeWidth={2.25} />
                  Send enquiry
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

            <SectionPageLink href="/faqs" className="mt-6">
              See all FAQs
            </SectionPageLink>
          </Reveal>

          <Reveal variant="fadeUp" delay={0.12}>
            <div className="overflow-hidden rounded-2xl border border-border/80 bg-background shadow-[0_20px_56px_-32px_rgba(30,46,61,0.16)]">
              <div
                aria-hidden
                className="h-1 bg-gradient-to-r from-teal via-brand to-teal opacity-80"
              />
              <div className="border-b border-border/70 px-5 py-4 sm:px-6">
                <p className="font-sans-brand text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {HOMEPAGE_FAQS.length} questions answered
                </p>
              </div>

              <div>
                {HOMEPAGE_FAQS.map((item, index) => (
                  <FaqAccordionItem
                    key={item.id}
                    item={item}
                    index={index}
                    open={openId === item.id}
                    onToggle={() => setOpenId(openId === item.id ? "" : item.id)}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
