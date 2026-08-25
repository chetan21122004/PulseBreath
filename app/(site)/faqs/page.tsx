import type { Metadata } from "next";
import { FaqsPage } from "@/components/pages/FaqsPage";
import { FAQS } from "@/components/pulse-landing/faq-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Honest answers about cost, safety, sessions, equipment, family involvement, and tele-rehabilitation with PulseBreath.",
  path: "/faqs",
});

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/faqs#faq`,
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function Faqs() {
  return (
    <>
      <JsonLd data={faqLd} />
      <FaqsPage />
    </>
  );
}
