const logo = "/assets/pulsebreath-logo.png";

export function Logo() {
  return (
    <a
      href="#"
      className="group flex min-w-0 items-center gap-3 sm:gap-4 motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:scale-[1.02]"
    >
      {/* Transform scale only affects painting; h-14 layout box keeps navbar height stable */}
      <span className="relative mr-7 shrink-0 origin-left scale-[1.5] motion-safe:will-change-transform">
        <span
          className="pointer-events-none absolute -inset-2 rounded-full bg-gradient-to-br from-[var(--brand-teal)]/35 via-[var(--brand-pink)]/15 to-transparent opacity-80 blur-md motion-safe:transition-opacity motion-safe:duration-300 group-hover:opacity-100"
          aria-hidden
        />
        <img
          src={logo}
          alt=""
          width={152}
          height={152}
          className="relative h-14 w-14 rounded-full bg-white object-cover ring-[3px] ring-white shadow-[0_14px_32px_-8px_rgba(30,46,61,0.5),0_6px_16px_rgba(176,64,96,0.22),inset_0_1px_0_rgba(255,255,255,0.55)] sm:ring-[4px]"
        />
      </span>
      <div className="min-w-0 leading-tight">
        <div className="font-display text-xl font-bold tracking-tight sm:text-2xl sm:tracking-tighter">
          <span className="text-brand">PULSE</span>
          <span className="text-navy">BREATH</span>
        </div>
        <div className="text-[9px] font-bold tracking-[0.28em] text-navy/65 sm:text-[10px] sm:tracking-[0.26em]">
          PHYSIOTHERAPY
        </div>
      </div>
      <span className="sr-only">PulseBreath Physiotherapy -  Home</span>
    </a>
  );
}
