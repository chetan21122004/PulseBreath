import { Phone, Mail, MapPin, Heart, Wind, ArrowUpRight, Award, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";
const logoIcon = "/assets/logo_n.png";
const logoText = "/assets/logo_text.png";
import { CLINIC_ADDRESS, PHONE, WHATSAPP, EMAIL } from "./constants";
import { FOOTER_ABOUT_LINKS, FOOTER_PROGRAM_LINKS } from "./nav-links";
import { Reveal, StaggerItem, StaggerReveal } from "./motion";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-white max-lg:pb-[calc(var(--bottom-nav-height)+env(safe-area-inset-bottom,0px))]"
      style={{ background: "var(--brand-dark)" }}
    >
      {/* Ambient blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-[0.18]" style={{ background: "var(--brand-pink)" }} />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-24 h-[24rem] w-[24rem] rounded-full blur-3xl opacity-[0.14]" style={{ background: "var(--brand-teal)" }} />
      {/* Grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* TOP -  bold marquee tagline */}
        <div className="pt-20 pb-14 border-b border-white/10">
        <Reveal variant="fadeUp">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-brand" />
            <span className="section-label !text-brand">PulseBreath Physiotherapy</span>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <h2 className="lg:col-span-8 font-display text-white text-[1.875rem] sm:text-5xl lg:text-[4rem] leading-[1.02] tracking-tight">
              Adding life <span className="italic text-brand">to your years.</span>
            </h2>
            <div className="lg:col-span-4 lg:text-right">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener"
                className="motion-link-arrow group inline-flex items-center gap-3 text-white font-semibold border-b-2 border-brand pb-2 hover:gap-5 transition-all"
              >
                Book your free assessment
                <ArrowUpRight className="motion-link-arrow-icon h-5 w-5 text-brand transition-transform group-hover:rotate-45" />
              </a>
              <p className="mt-3 text-xs tracking-[0.18em] uppercase text-white/40">
                Free assessment · No obligation
              </p>
            </div>
          </div>
        </Reveal>
        </div>

        {/* MIDDLE -  info grid */}
        <StaggerReveal className="py-16 grid lg:grid-cols-12 gap-12" itemVariant="fadeUp" amount={0.1}>
          <StaggerItem className="lg:col-span-4 space-y-6">
            <Link
              href="/"
              className="inline-flex w-full max-w-md items-center gap-4 rounded-2xl border border-white/15 bg-white px-5 py-4 shadow-[0_12px_32px_-14px_rgba(0,0,0,0.4)] sm:gap-5 sm:px-6 sm:py-5"
            >
              <img
                src={logoIcon}
                alt=""
                width={192}
                height={192}
                className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24"
              />
              <img
                src={logoText}
                alt="PulseBreath Physiotherapy — Adding life to your years"
                width={480}
                height={138}
                className="h-16 w-auto min-w-0 flex-1 object-contain object-left sm:h-20"
              />
            </Link>

            <p className="text-sm text-white/65 leading-relaxed max-w-sm">
              Specialist cardiac, pulmonary and metabolic rehabilitation -
              personalised, supervised, evidence-based. Online and in-person across India.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.16em] uppercase font-semibold text-brand bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                <Award className="h-3 w-3" /> Gold Medalist
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.16em] uppercase font-semibold text-white/70 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">
                <ShieldCheck className="h-3 w-3" /> Reg No. 54685/2023
              </span>
            </div>
          </StaggerItem>

          <StaggerItem className="lg:col-span-2">
            <p className="section-label !text-white/40 mb-5">Programs</p>
            <ul className="space-y-3 text-sm text-white/75">
              {FOOTER_PROGRAM_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="inline-flex items-center gap-1.5 py-2 -my-1 hover:text-brand transition-colors group">
                    <span className="h-px w-3 bg-white/20 group-hover:w-5 group-hover:bg-brand transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem className="lg:col-span-2">
            <p className="section-label !text-white/40 mb-5">About</p>
            <ul className="space-y-3 text-sm text-white/75">
              {FOOTER_ABOUT_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="inline-flex items-center gap-1.5 py-2 -my-1 hover:text-brand transition-colors group">
                    <span className="h-px w-3 bg-white/20 group-hover:w-5 group-hover:bg-brand transition-all" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem className="lg:col-span-4">
            <p className="section-label !text-white/40 mb-5">Reach Dr. Deepali</p>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 space-y-4">
              <a href={`tel:${PHONE}`} className="flex items-center gap-3 group">
                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-white/40">Call</p>
                  <p className="text-sm font-semibold text-white group-hover:text-brand transition-colors">+91 {PHONE}</p>
                </div>
              </a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 group">
                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand group-hover:border-brand transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-white/40">Email</p>
                  <p className="text-sm font-semibold text-white truncate group-hover:text-brand transition-colors">{EMAIL}</p>
                </div>
              </a>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-white/40">Based in</p>
                  <p className="text-sm font-semibold text-white">{CLINIC_ADDRESS}</p>
                </div>
              </div>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener"
                className="motion-btn mt-2 w-full inline-flex items-center justify-center gap-2 bg-brand hover:bg-[var(--brand-pink-deep)] transition-colors rounded-md py-3 text-sm font-bold tracking-[0.1em] uppercase text-white"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp Now
              </a>
            </div>
          </StaggerItem>
        </StaggerReveal>

        {/* Editorial divider line with pulse motif */}
        <div className="relative border-t border-white/10">
          <div className="absolute left-1/2 -translate-x-1/2 -top-3 flex items-center gap-2 px-4" style={{ background: "var(--brand-dark)" }}>
            <Wind className="h-3.5 w-3.5 text-brand" />
            <span className="font-display italic text-brand text-sm">breathe · move · reclaim</span>
            <Heart className="h-3.5 w-3.5 text-brand" />
          </div>
        </div>

        {/* BOTTOM -  legal */}
        <div className="space-y-4 py-8">
          <p className="max-w-3xl text-xs leading-relaxed text-white/50">
            PulseBreath Physiotherapy is not an emergency service. Always consult your cardiologist
            or pulmonologist before starting any rehabilitation program.
          </p>
          <div className="flex flex-col justify-between gap-4 text-xs text-white/45 md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} PulseBreath Physiotherapy · pulsebreathphysiotherapy.in</p>
            <p className="flex items-center gap-2">
              <Clock className="h-3 w-3" /> Mon-Sat · 8 AM - 8 PM IST
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/privacy" className="transition-colors hover:text-brand">
                Privacy Policy
              </Link>
              <p>Dr. Deepali Shah (PT) · MPT Cardiopulmonary Sciences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Giant decorative wordmark */}
      <div
        aria-hidden
        className="select-none pointer-events-none font-display font-bold text-white/[0.025] text-[20vw] leading-none tracking-tighter text-center -mt-12 pb-4"
      >
        PulseBreath
      </div>
    </footer>
  );
}
