import { Phone, Mail, MapPin } from "lucide-react";
import { CLINIC_ADDRESS, PHONE, WHATSAPP, EMAIL } from "./constants";
import { Reveal, StaggerItem, StaggerReveal } from "./motion";
import { SectionIllustration } from "./SectionIllustration";
import { SectionPageLink } from "./SectionPageLink";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ILLUSTRATIONS } from "./visual-assets";

export function CTASection() {
  return (
    <section id="contact" className="bg-section py-12 lg:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <StaggerReveal itemVariant="fadeUp">
          <StaggerItem>
            <span className="pill">Take the First Step</span>
          </StaggerItem>
          <StaggerItem>
            <h2 className="heading-display mt-6">
              Start with a <span className="text-brand">free </span> assessment.
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-5 max-w-lg text-[var(--body-text)]">
              A genuine conversation with Dr. Deepali about your condition, your challenges, and what
              a program could look like for you. No cost. No obligation.
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={WHATSAPP} target="_blank" rel="noopener" className="btn-whatsapp motion-btn">
                <WhatsAppIcon className="h-5 w-5" /> Book on WhatsApp
              </a>
              <a href={`tel:${PHONE}`} className="btn-secondary motion-btn">
                <Phone className="mr-2 h-4 w-4" /> Call {PHONE}
              </a>
            </div>
            <SectionPageLink href="/contact" className="mt-5">
              View contact details
            </SectionPageLink>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-6 border-l-2 border-brand pl-4 italic text-navy/80">
              &ldquo;We will never recommend a program that isn&apos;t right for you.&rdquo;
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-8 space-y-2 text-[15px] text-navy/80">
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand" /> {EMAIL}
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {CLINIC_ADDRESS}
              </p>
            </div>
          </StaggerItem>
        </StaggerReveal>

        <Reveal variant="fadeLeft">
          <div className="relative p-6 sm:p-10">
            <div className="absolute inset-0 m-auto h-[88%] w-[88%] rounded-3xl bg-soft" aria-hidden />
            <div className="motion-card relative overflow-hidden rounded-2xl border border-white/70 bg-white/60 p-8 shadow-[0_24px_64px_-24px_rgba(30,46,61,0.25)] backdrop-blur-sm sm:p-10">
              <SectionIllustration
                src={ILLUSTRATIONS.onlineDoctor}
                alt="Book a virtual consultation with a specialist"
                className="mx-auto max-w-sm"
                animateOnScroll={false}
              />
              <p className="mt-6 text-center font-sans-brand text-sm font-medium text-navy/75">
                Book your free virtual assessment - from anywhere in India.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
