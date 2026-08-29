import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact & Free Assessment",
  description:
    "Send an enquiry to Dr. Deepali Shah, or reach her via WhatsApp, phone, or email. Book your free assessment - no cost, no obligation, available across India.",
  path: "/contact",
});

export default function Contact() {
  return <ContactPage />;
}
