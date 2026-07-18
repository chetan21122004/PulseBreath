import type { Metadata } from "next";
import { NewBatchPage } from "@/components/pages/NewBatchPage";

export const metadata: Metadata = {
  title: "Upcoming Batches — 8-Week Pulmonary Rehabilitation | PulseBreath Physiotherapy",
  description:
    "New group sessions starting 27th July 2026. Choose your track and book a free clinical assessment for specialist-led pulmonary rehabilitation.",
};

export default function NewBatch() {
  return <NewBatchPage />;
}
