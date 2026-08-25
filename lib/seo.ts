import type { Metadata } from "next";

export const SITE_NAME = "PulseBreath Physiotherapy";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pulsebreathphysiotherapy.in"
).replace(/\/$/, "");
export const HOME_TITLE = "PulseBreath Physiotherapy – Adding Life to Your Years";
export const DEFAULT_DESCRIPTION =
  "Specialist cardiac and pulmonary rehabilitation with Dr. Deepali Shah (PT), through supervised online and in-person programs across India.";

const SOCIAL_IMAGE = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "PulseBreath Physiotherapy — specialist cardiac and pulmonary rehabilitation",
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  absoluteTitle?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
};

function absoluteUrl(path: string) {
  return new URL(path || "/", `${SITE_URL}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
  publishedTime,
  modifiedTime,
}: PageMetadataOptions): Metadata {
  const canonical = absoluteUrl(path);
  const socialTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          title: socialTitle,
          description,
          type: "article",
          url: canonical,
          locale: "en_IN",
          siteName: SITE_NAME,
          images: [SOCIAL_IMAGE],
          publishedTime,
          modifiedTime,
          authors: [`${SITE_URL}/about`],
        }
      : {
          title: socialTitle,
          description,
          type: "website",
          url: canonical,
          locale: "en_IN",
          siteName: SITE_NAME,
          images: [SOCIAL_IMAGE],
        };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}

