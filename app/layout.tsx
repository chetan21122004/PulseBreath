import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { DEFAULT_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  authors: [{ name: "Dr. Deepali Shah (PT)", url: `${SITE_URL}/about` }],
  creator: "Dr. Deepali Shah (PT)",
  publisher: SITE_NAME,
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
