import type { Metadata } from "next";
import { ServicesPage } from "@/components/pages/ServicesPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Rehabilitation Services & Programs",
  description:
    "Complete catalogue of cardiac, pulmonary, and metabolic rehabilitation programs - supervised by Dr. Deepali Shah, cardiopulmonary specialist.",
  path: "/services",
});

export default function Services() {
  return <ServicesPage />;
}
