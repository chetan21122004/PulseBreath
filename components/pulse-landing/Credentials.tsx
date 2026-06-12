export function Credentials() {
  const items = ["MPT Cardiopulmonary Sciences", "Gold Medalist", "Ex-Cipla Pulmonary Rehab Faculty", "Specialist -Cardiac & Lung Rehab", "Tele-Rehab Across India", "Personalised Programs"];
  return (
    <section className="py-14 bg-background">
      <p className="text-center text-xs font-bold tracking-[0.25em] text-muted-foreground">CREDENTIALS & EXPERTISE</p>
      <div className="mt-8 overflow-hidden">
        <div className="flex animate-[scroll_35s_linear_infinite] gap-12 whitespace-nowrap text-xl md:text-2xl font-display italic text-navy/40">
          {[...items, ...items].map((o, i) => <span key={i} className="flex items-center gap-12">{o} <span className="text-brand">•</span></span>)}
        </div>
      </div>
      <style>{`@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}
