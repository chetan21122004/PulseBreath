import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { PageSection } from "@/components/pages/PageSection";
import { CONTACT_FLOW } from "@/components/pulse-landing/journey-content";
import { CLINIC_ADDRESS, PHONE, WHATSAPP, EMAIL } from "@/components/pulse-landing/constants";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/pulse-landing/motion";
import { WhatsAppIcon } from "@/components/pulse-landing/WhatsAppIcon";
import { cn } from "@/lib/utils";

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

function MobileFlowTimeline() {
  return (
    <ol className="md:hidden">
      {CONTACT_FLOW.map((item, index) => (
        <li key={item.step} className="relative flex gap-3 pb-5 last:pb-0">
          {index < CONTACT_FLOW.length - 1 ? (
            <span
              aria-hidden
              className="absolute bottom-0 left-4 top-8 w-px bg-gradient-to-b from-brand/35 to-brand/10"
            />
          ) : null}
          <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white shadow-[0_4px_12px_-4px_rgba(192,81,106,0.45)]">
            {item.step}
          </span>
          <div className="min-w-0 flex-1 rounded-xl border border-border/70 bg-white/90 px-3.5 py-3">
            <h3 className="font-display text-[15px] font-bold leading-snug text-navy">{item.title}</h3>
            <p className="mt-1 text-[13px] leading-snug text-[var(--body-text)]">{item.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function DesktopFlowGrid() {
  return (
    <StaggerReveal
      className="hidden gap-6 md:grid sm:grid-cols-2 lg:grid-cols-4"
      itemVariant="fadeUp"
    >
      {CONTACT_FLOW.map((item) => (
        <StaggerItem key={item.step}>
          <div className="motion-card relative h-full rounded-xl border border-border/80 bg-white/90 p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
              {item.step}
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-navy">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--body-text)]">{item.detail}</p>
          </div>
        </StaggerItem>
      ))}
    </StaggerReveal>
  );
}

function MobileContactActions() {
  const secondary = contactMethods.filter((m) => m.label === "Email" || m.label === "Location");

  return (
    <div className="space-y-3 md:hidden">
      <ul className="overflow-hidden rounded-xl border border-border/80 bg-white/95 divide-y divide-border/70">
        {secondary.map((method) => {
          const Icon = method.icon;
          const inner = (
            <>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--primary-soft)]/40 ring-1 ring-border/60">
                <Icon className="h-4 w-4 text-brand" strokeWidth={2.25} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {method.label}
                </span>
                <span className="mt-0.5 block text-[14px] font-semibold leading-snug text-navy">
                  {method.label === "Location" ? "Noida · Tele-rehab across India" : method.value}
                </span>
                {method.label === "Location" ? (
                  <span className="mt-1 block text-[12px] leading-snug text-navy/65">{method.value}</span>
                ) : null}
              </span>
              {method.href ? (
                <ChevronRight className="h-4 w-4 shrink-0 text-brand/70" strokeWidth={2.25} />
              ) : (
                <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" strokeWidth={2.25} />
              )}
            </>
          );

          return (
            <li key={method.label}>
              {method.href ? (
                <a
                  href={method.href}
                  className="flex min-h-[4.25rem] items-center gap-3 px-3.5 py-3 transition-colors active:bg-soft/60"
                >
                  {inner}
                </a>
              ) : (
                <div className="flex min-h-[4.25rem] items-start gap-3 px-3.5 py-3">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
      <p className="flex items-center justify-center gap-1.5 text-center text-[12px] text-muted-foreground">
        <Clock className="h-3.5 w-3.5" strokeWidth={2.25} />
        Mon–Sat · 8 AM – 8 PM IST
      </p>
    </div>
  );
}

function DesktopContactGrid() {
  return (
    <StaggerReveal className="hidden gap-4 md:grid sm:grid-cols-2" itemVariant="fadeUp">
      {contactMethods.map((method) => {
        const Icon = method.icon;
        const content = (
          <div
            className={cn(
              "motion-card h-full rounded-xl border p-6",
              method.primary
                ? "border-brand/30 bg-[var(--primary-soft)]/30"
                : "border-border/80 bg-white/90",
            )}
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
              <div className="h-full">{content}</div>
            )}
          </StaggerItem>
        );
      })}
    </StaggerReveal>
  );
}

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
        className="pb-8 sm:pb-14"
      >
        <div className="mt-5 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp motion-btn w-full justify-center sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Message on WhatsApp
          </a>
          <a href={`tel:${PHONE}`} className="btn-secondary motion-btn w-full justify-center sm:w-auto">
            <Phone className="h-4 w-4" />
            Call +91 {PHONE}
          </a>
        </div>
        <p className="mt-3 flex items-center gap-1.5 text-[13px] text-muted-foreground sm:text-sm">
          <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
          Replies Mon–Sat · 8 AM – 8 PM IST
        </p>
      </PageHero>

      <PageSection variant="background" className="py-8 sm:py-12 lg:py-20">
        <Reveal variant="fadeUp">
          <span className="section-label">What Happens Next</span>
          <h2 className="heading-display mt-3 text-[1.65rem] sm:mt-4 sm:text-3xl">
            After you <span className="italic text-brand">reach out</span>
          </h2>
          <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[var(--body-text)] sm:mt-4 sm:text-base">
            <span className="md:hidden">No forms or call centres - just Dr. Deepali, personally.</span>
            <span className="hidden md:inline">
              No forms, no call centres, no sales scripts. Just a direct line to Dr. Deepali.
            </span>
          </p>
        </Reveal>
        <div className="mt-6 sm:mt-10">
          <MobileFlowTimeline />
          <DesktopFlowGrid />
        </div>
      </PageSection>

      <PageSection variant="section" className="py-8 sm:py-12 lg:py-20">
        <Reveal variant="fadeUp">
          <span className="section-label">Reach Dr. Deepali</span>
          <h2 className="heading-display mt-3 text-[1.65rem] sm:mt-4 sm:text-3xl">
            <span className="md:hidden">Email & </span>
            <span className="italic text-brand">location</span>
            <span className="hidden md:inline">Choose how you&apos;d like to </span>
            <span className="hidden italic text-brand md:inline">connect</span>
          </h2>
          <p className="mt-2 text-[14px] text-muted-foreground sm:mt-3 sm:text-base md:hidden">
            WhatsApp and call are in the banner above - use these for email or clinic details.
          </p>
        </Reveal>
        <div className="mt-5 sm:mt-10">
          <MobileContactActions />
          <DesktopContactGrid />
        </div>
      </PageSection>

      <PageSection variant="background" className="border-t border-border/60 py-8 sm:py-10">
        <Reveal variant="fadeUp">
          <p className="mx-auto max-w-3xl text-center text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
            PulseBreath Physiotherapy is not an emergency service. Always consult your cardiologist
            or pulmonologist before starting any rehabilitation program. If you experience severe
            symptoms, contact your nearest hospital immediately.
          </p>
          <p className="mt-3 text-center text-[13px] text-navy/70 sm:mt-4 sm:text-sm">
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
