import { useId } from "react";

/** Four-point AI sparkle centred on (cx, cy). */
function sparkPath(cx: number, cy: number, r: number) {
  const k = r * 0.18;
  return `M${cx} ${cy - r} C${cx + k} ${cy - k} ${cx + k} ${cy - k} ${cx + r} ${cy} C${cx + k} ${cy + k} ${cx + k} ${cy + k} ${cx} ${cy + r} C${cx - k} ${cy + k} ${cx - k} ${cy + k} ${cx - r} ${cy} C${cx - k} ${cy - k} ${cx - k} ${cy - k} ${cx} ${cy - r}Z`;
}

/** The Tapmerce mark: a two-tone capsule that is also a chat bubble, with an AI sparkle. */
export function LogoMark({
  size = 32,
  tone = "light",
  className = "",
}: {
  size?: number;
  /** "light" for light grounds (ink half), "dark" for dark grounds (cream half). */
  tone?: "light" | "dark";
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const half = tone === "light" ? "#1d1d1f" : "#fffdfa";
  const cut = tone === "light" ? "#fffdfa" : "#1d1d1f";
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <clipPath id={`${id}l`}>
          <rect x="0" y="0" width="32" height="64" />
        </clipPath>
        <clipPath id={`${id}r`}>
          <rect x="32" y="0" width="32" height="64" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}l)`}>
        <rect x="4" y="14" width="56" height="30" rx="15" fill="#ff5a1f" />
        <path d="M14 40 L10 54 L26 43 Z" fill="#ff5a1f" />
      </g>
      <rect x="4" y="14" width="56" height="30" rx="15" fill={half} clipPath={`url(#${id}r)`} />
      <path d={sparkPath(44, 29, 7)} fill={cut} />
    </svg>
  );
}

/** Mark plus the lowercase wordmark, set in the display face. */
export function Logo({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={32} tone={tone} />
      <span
        className={`font-[family-name:var(--font-bricolage)] text-[22px] font-extrabold leading-none tracking-[-0.035em] ${
          tone === "light" ? "text-[#1d1d1f]" : "text-[#fffdfa]"
        }`}
        style={{ fontVariationSettings: '"opsz" 96' }}
      >
        tapmerce
      </span>
    </span>
  );
}
