import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pulsebreathphysiotherapy.in"),
  title: {
    default: "PulseBreath Physiotherapy – Adding Life to your Years",
    template: "%s | PulseBreath Physiotherapy",
  },
  description:
    "Specialist cardiac and pulmonary rehabilitation by Dr. Deepali Shah (PT), MPT Cardiopulmonary Sciences (Gold Medalist). Personalised, supervised programs – online and in-person across India.",
  keywords: [
    "cardiac rehabilitation",
    "pulmonary rehabilitation",
    "cardiopulmonary physiotherapy",
    "tele-rehabilitation India",
    "Dr. Deepali Shah",
    "heart failure rehabilitation",
    "COPD rehabilitation",
    "physiotherapy online India",
    "metabolic rehabilitation",
  ],
  alternates: {
    canonical: "https://www.pulsebreathphysiotherapy.in",
  },
  openGraph: {
    title: "PulseBreath Physiotherapy – Adding Life to your Years",
    description:
      "Specialist cardiac and pulmonary rehabilitation by Dr. Deepali Shah (PT). Personalised, supervised, evidence-based recovery programs.",
    type: "website",
    url: "https://www.pulsebreathphysiotherapy.in",
    locale: "en_IN",
    siteName: "PulseBreath Physiotherapy",
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseBreath Physiotherapy – Adding Life to your Years",
    description:
      "Specialist cardiac and pulmonary rehabilitation by Dr. Deepali Shah (PT). Personalised, supervised, evidence-based.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
