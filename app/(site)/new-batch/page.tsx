import type { Metadata } from "next";
import { NewBatchPage } from "@/components/pages/NewBatchPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "8-Week Pulmonary Rehabilitation — Upcoming Batch",
  description:
    "Enquiry open for the upcoming group session. Choose your track and book a free clinical assessment for specialist-led pulmonary rehabilitation.",
  path: "/new-batch",
});

export default function NewBatch() {
  return <NewBatchPage />;
}
