import type { Metadata } from "next";
import { HowItWorksPage } from "@/components/pages/HowItWorksPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "How Tele-Rehabilitation Works",
  description:
    "Four simple steps from free assessment to confident recovery - live supervised tele-rehab with Dr. Deepali Shah, cardiopulmonary specialist.",
  path: "/how-it-works",
});

export default function HowItWorks() {
  return <HowItWorksPage />;
}
