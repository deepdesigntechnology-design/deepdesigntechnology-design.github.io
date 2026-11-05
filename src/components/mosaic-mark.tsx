export function MosaicMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect x="4" y="4" width="56" height="56" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="10" width="44" height="44" stroke="currentColor" strokeWidth="1" opacity="0.55" />
      <path
        d="M32 16c6 6 10 10 10 16s-4 10-10 16c-6-6-10-10-10-16s4-10 10-16Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M16 16c6 4 10 8 16 8s10-4 16-8" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <path d="M16 48c6-4 10-8 16-8s10 4 16 8" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <circle cx="16" cy="16" r="2.2" fill="currentColor" />
      <circle cx="48" cy="16" r="2.2" fill="currentColor" />
      <circle cx="16" cy="48" r="2.2" fill="currentColor" />
      <circle cx="48" cy="48" r="2.2" fill="currentColor" />
    </svg>
  );
}

export function FrameDiagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 240" className={className} role="img" aria-label="ترکیب‌بندی کلاسیک: ترنج، لچک، حاشیه">
      <rect x="8" y="8" width="304" height="224" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="22" y="22" width="276" height="196" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <path
        d="M160 52c28 22 46 38 46 68s-18 46-46 68c-28-22-46-38-46-68s18-46 46-68Z"
        fill="currentColor"
        opacity="0.12"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M22 22c28 18 46 28 70 28" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M298 22c-28 18-46 28-70 28" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M22 218c28-18 46-28 70-28" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <path d="M298 218c-28-18-46-28-70-28" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <text x="160" y="126" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="Vazirmatn, sans-serif">
        ترنج
      </text>
      <text x="52" y="48" fontSize="10" fill="currentColor" fontFamily="Vazirmatn, sans-serif" opacity="0.85">
        لچک
      </text>
      <text x="160" y="18" textAnchor="middle" fontSize="10" fill="currentColor" fontFamily="Vazirmatn, sans-serif" opacity="0.85">
        حاشیه
      </text>
    </svg>
  );
}

export function PitchOrnament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" className={className} aria-hidden="true" fill="none">
      {Array.from({ length: 14 }).map((_, i) => {
        const x = 10 + i * 13.5;
        const flip = i % 2 === 0 ? 1 : -1;
        return (
          <path
            key={i}
            d={`M${x} 40 c ${6 * flip} -18 12 -18 12 0 c 0 16 -6 18 -12 0`}
            stroke="currentColor"
            strokeWidth="1.4"
            opacity={0.45 + (i % 3) * 0.15}
          />
        );
      })}
    </svg>
  );
}
