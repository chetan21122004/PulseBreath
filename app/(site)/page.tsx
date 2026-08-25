import type { Metadata } from "next";
import { PulseLandingPage } from "@/components/pulse-landing/PulseLandingPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  CLINIC_ADDRESS,
  EMAIL,
  LINKEDIN,
  PHONE,
} from "@/components/pulse-landing/constants";
import {
  createPageMetadata,
  DEFAULT_DESCRIPTION,
  HOME_TITLE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: HOME_TITLE,
  description: DEFAULT_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

const homeLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "MedicalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/assets/pulsebreath-logo.png`,
      image: `${SITE_URL}/assets/bg_hero.jpeg`,
      description: DEFAULT_DESCRIPTION,
      telephone: `+91${PHONE}`,
      email: EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Noida",
        addressRegion: "Uttar Pradesh",
        addressCountry: "IN",
        name: CLINIC_ADDRESS,
      },
      areaServed: { "@type": "Country", name: "India" },
      sameAs: [LINKEDIN],
      founder: { "@id": `${SITE_URL}/about#dr-deepali-shah` },
      medicalSpecialty: ["Cardiovascular", "Pulmonary"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/about#dr-deepali-shah`,
      name: "Dr. Deepali Shah",
      jobTitle: "Cardiopulmonary Physiotherapist",
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}/assets/dr_deepali/Dr_Deepali.png`,
      sameAs: [LINKEDIN],
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={homeLd} />
      <PulseLandingPage />
    </>
  );
}
