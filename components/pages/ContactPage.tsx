import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { CONTACT_FLOW } from "@/components/pulse-landing/journey-content";
import { CLINIC_ADDRESS, PHONE, WHATSAPP, EMAIL } from "@/components/pulse-landing/constants";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/pulse-landing/motion";

const contactMethods = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Fastest way to reach Dr. Deepali",
    href: WHATSAPP,
    external: true,
    primary: true,
    action: "Message on WhatsApp",
  },
  {
    icon: Phone,
    label: "Call",
    value: `+91 ${PHONE}`,
    href: `tel:${PHONE}`,
    external: false,
    primary: false,
    action: "Call now",
  },
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    external: false,
    primary: false,
    action: "Send email",
  },
  {
    icon: MapPin,
    label: "Location",
    value: CLINIC_ADDRESS,
    href: undefined,
    external: false,
    primary: false,
    action: "Mon–Sat · 8 AM – 8 PM IST",
  },
];

export function ContactPage() {
  return (
    <>
      <PageHero
        pill="Take the First Step"
        title={
          <>
            Start with a <span className="font-display italic text-brand">free</span> assessment
          </>
        }
        description="A genuine conversation with Dr. Deepali about your condition, your challenges, and what a program could look like for you. No cost. No obligation. No pressure."
      />

      <PageSection variant="section">
        <Reveal variant="fadeUp">
          <span className="section-label">Reach Dr. Deepali</span>
          <h2 className="heading-display mt-4 text-2xl sm:text-3xl">
            Choose how you&apos;d like to <span className="italic text-brand">connect</span>
          </h2>
        </Reveal>
        <StaggerReveal className="mt-10 grid gap-4 sm:grid-cols-2" itemVariant="fadeUp">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            const content = (
              <div
                className={`motion-card h-full rounded-xl border p-6 ${method.primary
                    ? "border-brand/30 bg-[var(--primary-soft)]/30"
                    : "border-border/80 bg-white/90"
                  }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background ring-1 ring-border/80">
                  <Icon className="h-5 w-5 text-brand" strokeWidth={2.25} />
                </div>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  {method.label}
                </p>
                <p className="mt-2 font-display text-lg font-bold text-navy">{method.value}</p>
                <p className="mt-3 text-sm font-semibold text-brand">{method.action}</p>
              </div>
            );

            return (
              <StaggerItem key={method.label}>
                {method.href ? (
                  <a
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className="block h-full transition-transform hover:-translate-y-0.5"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="h-full">
                    {content}
                    <p className="mt-2 flex items-center gap-2 px-6 pb-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      Mon–Sat · 8 AM – 8 PM IST
                    </p>
                  </div>
                )}
              </StaggerItem>
            );
          })}
        </StaggerReveal>
      </PageSection>

      <PageSection variant="background">
        <Reveal variant="fadeUp">
          <span className="section-label">What Happens Next</span>
          <h2 className="heading-display mt-4 text-2xl sm:text-3xl">
            After you <span className="italic text-brand">reach out</span>
          </h2>
          <p className="mt-4 max-w-2xl text-[var(--body-text)]">
            No forms, no call centres, no sales scripts. Just a direct line to Dr. Deepali.
          </p>
        </Reveal>
        <StaggerReveal className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" itemVariant="fadeUp">
          {CONTACT_FLOW.map((item) => (
            <StaggerItem key={item.step}>
              <div className="motion-card relative rounded-xl border border-border/80 bg-white/90 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {item.step}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--body-text)]">{item.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </PageSection>

      <PageSection variant="background" className="border-t border-border/60 py-10">
        <Reveal variant="fadeUp">
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-muted-foreground">
            PulseBreath Physiotherapy is not an emergency service. Always consult your cardiologist
            or pulmonologist before starting any rehabilitation program. If you experience severe
            symptoms, contact your nearest hospital immediately.
          </p>
          <p className="mt-4 text-center text-sm text-navy/70">
            Prefer to read first?{" "}
            <Link href="/faqs" className="font-semibold text-brand hover:underline">
              Browse our FAQs <ArrowRight className="inline h-3.5 w-3.5" />
            </Link>
          </p>
        </Reveal>
      </PageSection>
    </>
  );
}
