import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulseBreath Physiotherapy - Adding Life to your Years",
  description:
    "Specialist cardiac and pulmonary rehabilitation by Dr. Deepali Shah (PT), MPT Cardiopulmonary Sciences (Gold Medalist). Personalised, supervised programs — online and in-person across India.",
  openGraph: {
    title: "PulseBreath Physiotherapy - Adding Life to your Years",
    description:
      "Specialist cardiac and pulmonary rehabilitation by Dr. Deepali Shah (PT). Personalised, supervised, evidence-based recovery programs.",
    type: "website",
    locale: "en_IN",
    siteName: "PulseBreath Physiotherapy",
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
