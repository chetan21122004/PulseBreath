import { HeartPulse } from "lucide-react";

export function Reach() {
  const stats = [
    { v: "Pan-India", l: "Patients served via tele-rehab" },
    { v: "12+", l: "Conditions specifically treated" },
    { v: "1:1", l: "Supervision throughout your program" },
  ];
  return (
    <section className="py-8 bg-background relative overflow-hidden">
      <HeartPulse className="absolute right-10 top-10 h-72 w-72 text-soft" style={{ color: "var(--primary-soft)" }} />
      <div className="mx-auto max-w-7xl px-6 text-center relative">
        <span className="pill">Across India</span>
        <h2 className="heading-display mt-6">Specialist rehab, <span className="text-brand">wherever you are.</span></h2>
        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {stats.map(s => (
            <div key={s.v} className="rounded-2xl border border-border p-10 bg-section">
              <div className="font-display text-4xl md:text-5xl font-bold text-brand">{s.v}</div>
              <p className="mt-3 text-navy/80 font-medium">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
