import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact & Free Assessment | PulseBreath Physiotherapy",
  description:
    "Reach Dr. Deepali Shah via WhatsApp, phone, or email. Book your free assessment — no cost, no obligation, available across India.",
};

export default function Contact() {
  return <ContactPage />;
}
