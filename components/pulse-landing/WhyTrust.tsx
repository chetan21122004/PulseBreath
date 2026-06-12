import { Award, ShieldCheck, Heart, Video, Calendar } from "lucide-react";
import { WHATSAPP } from "./constants";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhyTrust() {
  const features = [
    { Icon: Award, t: "Gold-Medalist Specialist", d: "MPT in Cardiopulmonary Sciences -postgraduate specialist, not a general physio." },
    { Icon: ShieldCheck, t: "Evidence-Based Programs", d: "Built on clinical guidelines for cardiac and pulmonary rehabilitation." },
    { Icon: Heart, t: "Truly Personalised", d: "Programs designed around your exact condition, capacity, and goals." },
    { Icon: Video, t: "Real-Time Supervision", d: "Live tele-rehab -never pre-recorded, never unsupervised." },
  ];
  return (
    <section className="bg-section py-8">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="pill">Why Patients Choose PulseBreath</span>
          <h2 className="heading-display mt-6">Specialist care, <span className="text-brand">human delivery.</span></h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-8">
            {features.map(({ Icon, t, d }) => (
              <div key={t} className="flex gap-4">
                <div className="h-11 w-11 shrink-0 rounded-full flex items-center justify-center bg-soft">
                  <Icon className="h-5 w-5 text-brand" />
                </div>
                <div>
                  <h3 className="font-bold text-navy">{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-background border border-border p-8 md:p-10 shadow-sm">
          <div className="flex items-center gap-2 text-brand">
            <Calendar className="h-5 w-5" />
            <span className="text-xs font-bold tracking-[0.18em] uppercase">Free Assessment</span>
          </div>
          <h3 className="mt-4 font-display text-3xl font-bold text-navy">A genuine conversation -not a sales call.</h3>
          <p className="mt-4 text-[var(--body-text)]">
            Dr. Deepali will understand your condition, explain what a program could look like for you,
            and answer every question you have. Zero pressure to join.
          </p>
          <p className="mt-4 italic text-navy/80 border-l-2 border-brand pl-4">
            "We will never recommend a program that isn't right for you."
          </p>
          <a href={WHATSAPP} target="_blank" rel="noopener" className="btn-whatsapp mt-7">
            <WhatsAppIcon className="h-5 w-5" /> Book Free Assessment on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
