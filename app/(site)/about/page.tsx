import type { Metadata } from "next";
import { AboutPage } from "@/components/pages/AboutPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { createPageMetadata, SITE_URL } from "@/lib/seo";

const description =
  "Meet Dr. Deepali Shah (PT), MPT Cardiopulmonary Sciences Gold Medalist and founder of PulseBreath, providing supervised rehabilitation across India.";

export const metadata: Metadata = createPageMetadata({
  title: "About Dr. Deepali Shah",
  path: "/about",
  description,
});

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/about#dr-deepali-shah`,
  name: "Dr. Deepali Shah",
  honorificPrefix: "Dr.",
  jobTitle: "Cardiopulmonary Physiotherapist",
  description,
  url: `${SITE_URL}/about`,
  image: `${SITE_URL}/assets/dr_deepali/Dr_Deepali.png`,
  sameAs: ["https://www.linkedin.com/in/dr-deepali-shah-pt-29396b200/"],
  worksFor: { "@id": `${SITE_URL}/#organization` },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "MPT — Cardiopulmonary Sciences (Gold Medalist)",
      credentialCategory: "degree",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "MP Paramedical Registration No. 54685/2023",
      credentialCategory: "professional registration",
    },
  ],
};

export default function About() {
  return (
    <>
      <JsonLd data={personLd} />
      <AboutPage />
    </>
  );
}
