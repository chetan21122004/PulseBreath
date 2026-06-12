import type { Metadata } from "next";
import { HowItWorksPage } from "@/components/pages/HowItWorksPage";

export const metadata: Metadata = {
  title: "How It Works | PulseBreath Physiotherapy",
  description:
    "Four simple steps from free assessment to confident recovery — live supervised tele-rehab with Dr. Deepali Shah, cardiopulmonary specialist.",
};

export default function HowItWorks() {
  return <HowItWorksPage />;
}
