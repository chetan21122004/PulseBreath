import type { Metadata } from "next";
import { FaqsPage } from "@/components/pages/FaqsPage";

export const metadata: Metadata = {
  title: "FAQs | PulseBreath Physiotherapy",
  description:
    "Honest answers about cost, safety, sessions, equipment, family involvement, and tele-rehabilitation with PulseBreath.",
};

export default function Faqs() {
  return <FaqsPage />;
}
