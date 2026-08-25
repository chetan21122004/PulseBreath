import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { EMAIL } from "@/components/pulse-landing/constants";
import { createPageMetadata } from "@/lib/seo";

const description =
  "How PulseBreath Physiotherapy handles enquiry, communication, and technical website data when you contact the practice.";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description,
  path: "/privacy",
});

const sections = [
  {
    title: "Information you choose to share",
    body: [
      "This website does not currently provide account registration or an on-site medical intake form. If you contact PulseBreath through WhatsApp, telephone, email, or LinkedIn, you choose what personal and health-related information to share through that service.",
      "Please do not send emergency information through these channels. PulseBreath is not an emergency service.",
    ],
  },
  {
    title: "How information is used",
    body: [
      "Information you provide is used to respond to your enquiry, arrange an assessment, determine whether a rehabilitation service may be suitable, coordinate care, and maintain necessary clinical or communication records.",
      "PulseBreath does not sell personal information or use enquiry details for unrelated advertising.",
    ],
  },
  {
    title: "Third-party communication services",
    body: [
      "WhatsApp, email, telephone networks, LinkedIn, and the website hosting provider process information under their own privacy and security terms. Review those providers' policies before sharing sensitive information.",
    ],
  },
  {
    title: "Technical website data",
    body: [
      "The hosting provider may process routine technical logs such as IP address, browser type, requested pages, timestamps, and security events to deliver and protect the website. If analytics or additional tracking tools are introduced, this policy should be updated before they are enabled.",
    ],
  },
  {
    title: "Retention and protection",
    body: [
      "Information is retained only as long as reasonably needed for communication, care coordination, legal obligations, record keeping, and dispute prevention. Reasonable safeguards are used, but no internet or messaging service can guarantee absolute security.",
    ],
  },
  {
    title: "Your choices",
    body: [
      "You may ask what information PulseBreath holds about you, request a correction, withdraw a non-clinical communication preference, or request deletion where retention is not legally or clinically required.",
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        pill="Privacy"
        title="Privacy policy"
        description={description}
      />
      <PageSection variant="background">
        <article className="mx-auto max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground">
            Effective date: 26 August 2026
          </p>
          <div className="mt-8 space-y-9">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-2xl font-bold text-navy">
                  {section.title}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="font-sans-brand text-[16px] leading-[1.8] text-[var(--body-text)]"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <section className="mt-10 rounded-2xl border border-border/80 bg-white/85 p-6">
            <h2 className="font-display text-2xl font-bold text-navy">Contact</h2>
            <p className="mt-3 leading-relaxed text-[var(--body-text)]">
              For a privacy question or request, email{" "}
              <Link className="font-semibold text-brand underline-offset-4 hover:underline" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </Link>
              .
            </p>
          </section>
        </article>
      </PageSection>
    </>
  );
}
