const careMonitoring = "/assets/care-monitoring.jpg";
const careAdherence = "/assets/care-adherence.jpg";
const careAwareness = "/assets/care-awareness.jpg";

export function ServiceCategories() {
  const items = [
    { i: careMonitoring, t: "Cardiac Rehabilitation", d: "Post CABG, Post PTCA/Angioplasty, Heart Failure, Post Valve Replacement, Reduced Functional Capacity." },
    { i: careAdherence, t: "Pulmonary Rehabilitation", d: "COPD, asthma, bronchiectasis, ILD, pulmonary hypertension, occupational lung diseases, and post lobectomy pathways." },
    { i: careAwareness, t: "Metabolic & Lifestyle Programs", d: "Diabetes, Obesity, and Thyroid exercise programs -medically safe, evidence-based, condition-specific." },
  ];
  return (
    <section className="bg-section py-8">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <span className="pill">Specialised Programs</span>
        <h2 className="heading-display mt-6">Three core areas of <span className="text-brand">expert care</span></h2>
        <p className="mt-5 text-[var(--body-text)] max-w-3xl mx-auto">
          Each program is condition-specific and supervised. Not a gym routine -a medically guided rehabilitation pathway.
        </p>
      </div>
      <div className="mt-14 mx-auto max-w-7xl px-6 grid md:grid-cols-3 gap-6">
        {items.map(it => (
          <div key={it.t} className="relative overflow-hidden rounded-2xl aspect-square group">
            <img src={it.i} alt={it.t} loading="lazy" width={700} height={800} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" style={{ background: "linear-gradient(to top, var(--brand-dark), rgba(44,62,80,0.4), transparent)" }} />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-white font-bold font-display text-2xl drop-shadow-lg">{it.t}</p>
              <p className="text-white/90 text-sm mt-2 leading-relaxed">{it.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
