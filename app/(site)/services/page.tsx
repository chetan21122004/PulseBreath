import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Services & Programs | PulseBreath Physiotherapy",
  description:
    "Complete catalogue of cardiac, pulmonary, and metabolic rehabilitation programs — supervised by Dr. Deepali Shah, cardiopulmonary specialist.",
};

export default function Services() {
  return <ServicesPage />;
}
