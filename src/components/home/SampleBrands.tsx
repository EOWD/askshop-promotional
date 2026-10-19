/**
 * Fictional sample brands used to show white-label output. Each has its own mark,
 * wordmark type, palette and voice. Labeled as samples wherever they appear.
 */

export type SampleBrandId = "forge" | "littleoat" | "verra" | "goodfield";

export type SampleBrand = {
  id: SampleBrandId;
  name: string;
  category: string;
  color: string;
  palette: [string, string, string];
  font: { family: string; label: string; weight: number; transform?: "uppercase" | "lowercase"; tracking: string; style?: "italic"; settings?: string };
  ask: string;
  answer: string;
  product: { name: string; price: string; img: string };
};

export const SAMPLE_BRANDS: Record<SampleBrandId, SampleBrand> = {
  forge: {
    id: "forge",
    name: "FORGE",
    category: "Sports nutrition",
    color: "#1f3b5c",
    palette: ["#1f3b5c", "#d9e1ea", "#e0875e"],
    font: { family: "var(--font-bricolage)", label: "Bricolage Condensed", weight: 800, transform: "uppercase", tracking: "0.06em", settings: '"wdth" 75, "opsz" 96' },
    ask: "Ask FORGE",
    answer: "Post-workout? The Whey Isolate mixes clean with water or milk.",
    product: { name: "Whey Isolate 2 kg", price: "€54.90", img: "/home/products/whey.webp" },
  },
  littleoat: {
    id: "littleoat",
    name: "little oat",
    category: "Infant formula",
    color: "#5f8a6b",
    palette: ["#5f8a6b", "#e3ece4", "#f3d9b8"],
    font: { family: "var(--font-figtree)", label: "Figtree Rounded", weight: 700, transform: "lowercase", tracking: "-0.02em" },
    ask: "Ask little oat",
    answer: "For 6 to 12 months, most parents choose Stage 2.",
    product: { name: "Organic Stage 2, 800 g", price: "€29.70", img: "/home/products/formula.webp" },
  },
  verra: {
    id: "verra",
    name: "Verra",
    category: "Women's health",
    color: "#8a4a68",
    palette: ["#8a4a68", "#f1e4ea", "#c9a46a"],
    font: { family: "Georgia, 'Times New Roman', serif", label: "Georgia Italic", weight: 400, tracking: "0.01em", style: "italic" },
    ask: "Ask Verra",
    answer: "Both prenatals use methylfolate and are vegan.",
    product: { name: "Prenatal Daily", price: "€27.50", img: "/home/products/prenatal.webp" },
  },
  goodfield: {
    id: "goodfield",
    name: "Good Field",
    category: "Healthy food",
    color: "#6b7a2e",
    palette: ["#6b7a2e", "#eef0dd", "#46548f"],
    font: { family: "var(--font-geist-sans)", label: "Geist Semibold", weight: 600, tracking: "-0.03em" },
    ask: "Ask Good Field",
    answer: "This granola contains almonds. Here's a nut-free one.",
    product: { name: "Oat & Seed Granola", price: "€6.90", img: "/home/products/oatseed.webp" },
  },
};

/** The brand's mark, drawn in `color` (use white on the brand color, brand color on light). */
export function BrandMark({ id, color, size = 28 }: { id: SampleBrandId; color: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 32 32", "aria-hidden": true } as const;
  switch (id) {
    case "forge":
      // Hexagon with a lightning cut.
      return (
        <svg {...common}>
          <path d="M16 2 28 9v14l-12 7L4 23V9z" fill={color} />
          <path d="M17.5 8 11 17.5h4.5L14 24l7-10h-4.6z" fill="var(--brand-cut, #fff)" />
        </svg>
      );
    case "littleoat":
      // A single oat grain, tilted, with its seam.
      return (
        <svg {...common}>
          <g transform="rotate(35 16 16)">
            <ellipse cx="16" cy="16" rx="7.5" ry="12.5" fill={color} />
            <path d="M16 6.5v19" stroke="var(--brand-cut, #fff)" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        </svg>
      );
    case "verra":
      // A crescent holding a leaf.
      return (
        <svg {...common}>
          <path d="M20 3.5A12.5 12.5 0 1 0 28.5 22 10 10 0 1 1 20 3.5z" fill={color} />
          <path d="M19 11c4.5 0 6.5 2.5 6.5 6.5-4.5 0-6.5-2.5-6.5-6.5z" fill={color} />
        </svg>
      );
    case "goodfield":
      // Sun rising over three field rows.
      return (
        <svg {...common}>
          <path d="M8 17a8 8 0 0 1 16 0z" fill={color} />
          <rect x="4" y="19.5" width="24" height="2.6" rx="1.3" fill={color} />
          <rect x="7" y="24" width="18" height="2.6" rx="1.3" fill={color} />
          <rect x="10.5" y="28.4" width="11" height="2.4" rx="1.2" fill={color} />
        </svg>
      );
  }
}

/** Mark plus wordmark set in the brand's own type. */
export function BrandLogo({ id, color, size = 22 }: { id: SampleBrandId; color: string; size?: number }) {
  const b = SAMPLE_BRANDS[id];
  return (
    <span className="inline-flex items-center gap-1.5" style={{ color }}>
      <BrandMark id={id} color={color} size={size * 1.15} />
      <span
        style={{
          fontFamily: b.font.family,
          fontWeight: b.font.weight,
          letterSpacing: b.font.tracking,
          fontStyle: b.font.style,
          fontVariationSettings: b.font.settings,
          fontSize: size,
          lineHeight: 1,
        }}
      >
        {b.name}
      </span>
    </span>
  );
}
