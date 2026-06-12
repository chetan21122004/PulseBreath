import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";

export const metadata: Metadata = {
  title: "About Dr. Deepali Shah | PulseBreath Physiotherapy",
  description:
    "Meet Dr. Deepali Shah (PT), MPT Cardiopulmonary Sciences Gold Medalist — founder of PulseBreath. Specialist in supervised cardiac and pulmonary tele-rehabilitation across India.",
};

export default function About() {
  return <AboutPage />;
}
