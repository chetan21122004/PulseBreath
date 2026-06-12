'use client';

import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/components/pulse-landing/faq-data";
import { StaggerItem, StaggerReveal } from "@/components/pulse-landing/motion";

export function FaqAccordionItem({
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

export function FaqAccordion({
  items,
  openId,
  onToggle,
}: {
  items: FaqItem[];
  openId: string;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-background shadow-[0_20px_56px_-32px_rgba(30,46,61,0.16)]">
      <div
        aria-hidden
        className="h-1 bg-gradient-to-r from-teal via-brand to-teal opacity-80"
      />
      <div className="border-b border-border/70 px-5 py-4 sm:px-6">
        <p className="font-sans-brand text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {items.length} questions answered
        </p>
      </div>

      <StaggerReveal as="div" itemVariant="fadeUp" amount={0.08}>
        {items.map((item, index) => (
          <FaqAccordionItem
            key={item.id}
            item={item}
            index={index}
            open={openId === item.id}
            onToggle={() => onToggle(openId === item.id ? "" : item.id)}
          />
        ))}
      </StaggerReveal>
    </div>
  );
}
