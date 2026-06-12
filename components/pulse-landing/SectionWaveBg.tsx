type SectionWaveBgProps = {
  idPrefix?: string;
};

export function SectionWaveBg({ idPrefix = "wave" }: SectionWaveBgProps) {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-45"
      viewBox="0 0 1440 700"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`${idPrefix}-rose`} x1="0" x2="1">
          <stop offset="0%" stopColor="hsl(var(--brand) / 0)" />
          <stop offset="50%" stopColor="hsl(var(--brand) / 0.55)" />
          <stop offset="100%" stopColor="hsl(var(--brand) / 0)" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-teal`} x1="0" x2="1">
          <stop offset="0%" stopColor="hsl(180 45% 45% / 0)" />
          <stop offset="50%" stopColor="hsl(180 45% 45% / 0.55)" />
          <stop offset="100%" stopColor="hsl(180 45% 45% / 0)" />
        </linearGradient>
        <linearGradient id={`${idPrefix}-navy`} x1="0" x2="1">
          <stop offset="0%" stopColor="hsl(var(--navy) / 0)" />
          <stop offset="50%" stopColor="hsl(var(--navy) / 0.35)" />
          <stop offset="100%" stopColor="hsl(var(--navy) / 0)" />
        </linearGradient>
      </defs>
      {Array.from({ length: 14 }).map((_, i) => {
        const grads = [`url(#${idPrefix}-teal)`, `url(#${idPrefix}-rose)`, `url(#${idPrefix}-navy)`];
        const y = 300 + i * 8;
        const amp = 70 + i * 4;
        return (
          <path
            key={i}
            d={`M -50 ${y} C 300 ${y - amp}, 600 ${y + amp}, 900 ${y - amp * 0.7} S 1500 ${y + amp * 0.5}, 1500 ${y}`}
            fill="none"
            stroke={grads[i % 3]}
            strokeWidth={i % 4 === 0 ? 1.4 : 0.8}
            opacity={0.55 - i * 0.025}
          />
        );
      })}
      {Array.from({ length: 30 }).map((_, i) => (
        <circle
          key={`d${i}`}
          cx={(i * 137) % 1440}
          cy={150 + ((i * 53) % 450)}
          r={i % 5 === 0 ? 2.2 : 1.2}
          fill={i % 2 ? "hsl(var(--brand) / 0.35)" : "hsl(180 45% 45% / 0.35)"}
        />
      ))}
    </svg>
  );
}
