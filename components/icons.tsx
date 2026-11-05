const base = { viewBox: "0 0 24 24", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export function Shield({ size = 18, stroke = "#f15c20", sw = 2.2 }: { size?: number; stroke?: string; sw?: number }) {
  return (
    <svg {...base} width={size} height={size} stroke={stroke} strokeWidth={sw}>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </svg>
  );
}

export function Tick({ size = 12, stroke = "#ffffff", sw = 3.2 }: { size?: number; stroke?: string; sw?: number }) {
  return (
    <svg {...base} width={size} height={size} stroke={stroke} strokeWidth={sw}>
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export function AreaIcon({ k }: { k: string }) {
  return (
    <svg {...base} width={24} height={24} stroke="#f15c20" strokeWidth={2}>
      {k === "sec" && (<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></>)}
      {k === "flow" && (<><circle cx="5" cy="6" r="2" /><circle cx="19" cy="18" r="2" /><path d="M7 6h6a3 3 0 010 6H11a3 3 0 000 6h6" /></>)}
      {k === "speed" && <path d="M13 2L4 14h7l-1 8 9-12h-7z" />}
      {k === "device" && (<><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>)}
    </svg>
  );
}
