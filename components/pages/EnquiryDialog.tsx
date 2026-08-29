"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContactForm } from "@/components/pages/ContactForm";

const ENQUIRY_HASH = "#enquiry";

function hasEnquiryHash() {
  return window.location.hash === ENQUIRY_HASH;
}

function setEnquiryHash() {
  if (hasEnquiryHash()) return;
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${window.location.search}${ENQUIRY_HASH}`,
  );
}

function clearEnquiryHash() {
  if (!hasEnquiryHash()) return;
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}

function isEnquiryHref(href: string | null) {
  if (!href) return false;
  return href === ENQUIRY_HASH || href.endsWith(ENQUIRY_HASH);
}

export function EnquiryDialog() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  function openDialog() {
    setFormKey((key) => key + 1);
    setOpen(true);
    setEnquiryHash();
  }

  useEffect(() => {
    if (hasEnquiryHash()) {
      setOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    function onHashChange() {
      if (hasEnquiryHash()) {
        setFormKey((key) => key + 1);
        setOpen(true);
      } else {
        setOpen(false);
      }
    }

    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor || !isEnquiryHref(anchor.getAttribute("href"))) return;
      event.preventDefault();
      openDialog();
    }

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next) {
      setFormKey((key) => key + 1);
      setEnquiryHash();
      return;
    }
    clearEnquiryHash();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[min(92vh,840px)] w-[calc(100%-1.25rem)] max-w-xl flex-col gap-4 overflow-y-auto rounded-2xl border-border/80 p-5 sm:p-6">
        <DialogHeader className="space-y-2 pr-8 text-left">
          <p className="section-label">Enquiry form</p>
          <DialogTitle className="font-display text-2xl font-bold text-navy">
            Send Dr. Deepali a message
          </DialogTitle>
          <DialogDescription className="text-[14px] leading-relaxed text-[var(--body-text)]">
            Share a little about your condition. She replies personally during clinic hours.
          </DialogDescription>
        </DialogHeader>
        <ContactForm key={formKey} variant="dialog" />
      </DialogContent>
    </Dialog>
  );
}
