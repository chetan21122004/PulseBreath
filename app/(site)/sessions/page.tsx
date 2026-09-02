import type { Metadata } from "next";
import { SessionsPage } from "@/components/pages/SessionsPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sessions — 1-on-1 and Small-Group Rehabilitation",
  description:
    "At PulseBreath Physiotherapy, rehabilitation is offered in two formats: personalised 1-on-1 sessions and small-group sessions of 5–7 participants. Every participant begins with an assessment.",
  path: "/sessions",
});

export default function Sessions() {
  return <SessionsPage />;
}
