/**
 * Site identity and contact — the one place to edit when Tapmerce gets its own
 * mailboxes (MX records) or a registered address. Everything on the site that
 * names a person, an email address or the brand reads from here.
 */
export const site = {
  name: "Tapmerce",
  domain: "tapmerce.ai",
  url: "https://tapmerce.ai",
  tagline: "AI shopping and mobile apps for nutrition brands",
  founder: {
    name: "Eiad Oraby",
    role: "Founder & developer",
  },
  contact: {
    // TEMPORARY: the @tapmerce.ai mailboxes do not exist yet (the domain has no
    // MX records), so every contact link points at the founder's inbox. Swap this
    // for hello@tapmerce.ai once mail is set up — nothing else needs to change.
    email: "eiadoraby@gmail.com",
  },
  legal: {
    operator: "Eiad Oraby",
    // Street address for the Imprint (§ 5 DDG). Required before the site serves
    // EU visitors in production. While empty, the Imprint renders no address line.
    address: "" as string,
    country: "Germany",
  },
  /** The launch guarantee — every mention on the site reads from here.
   *  "Live" means submitted to both stores; review time is excluded (see conditions). */
  guarantee: {
    weeks: 3,
    days: 21,
    headline: "Your store app live within 3 weeks. Guaranteed.",
    short: "Live in 3 weeks, guaranteed",
    promise: "Your iOS and Android apps submitted to the App Store and Google Play within 21 days of kickoff",
    remedy: "or your setup fee back",
    conditions:
      "The 21 days count from kickoff, once your brand assets and your Apple and Google developer accounts are in place. Store review typically adds a few days and is outside our control. If we miss the date, the app setup fee is refunded in full.",
    reasons: [
      "The platform is already built — your app is a configuration, not a software project",
      "The first Tapmerce app is live in both stores today",
      "We handle both store submissions and any reviewer questions",
    ],
  },
  /** Merchants with a live Tapmerce app. First entry is featured on the home page. */
  customers: [
    {
      slug: "organics-best",
      name: "Organic's Best",
      tagline: "European organic baby formula, shipped worldwide",
      description:
        "A Shopify retailer of HiPP, Holle, Kendamil and other EU-organic formulas. Their Tapmerce app pairs a branded store with an AI shopping assistant, live human support, subscriptions and order tracking.",
      url: "https://organicsbestshop.com",
      /** Their live AI shopping assistant page. */
      aiUrl: "https://organicsbestshop.com/pages/organics-best-ai",
      /** Starter questions shown on their live assistant (copied from the page, 2026-10-19). */
      aiPrompts: ["Find the right formula", "I'm switching formulas", "Is this gentle on tummies?", "Goat or cow milk formula?"],
      logo: "/customers/organics-best/logo.webp",
      appStore: {
        name: "Organic's Best Shop",
        url: "https://apps.apple.com/us/app/organics-best-shop/id6799952533",
      },
      googlePlay: {
        name: "Organic's Best: Baby Formula",
        url: "https://play.google.com/store/apps/details?id=com.organicsbestshop.app",
      },
      /** Real results supplied by the merchant. The home page renders these only when present;
       *  never add estimates. Example: { value: "18.4%", label: "of revenue from AI-assisted orders" } */
      results: [] as { value: string; label: string }[],
      highlights: [
        "Ask AI shopping assistant with hand-off to live human support",
        "Subscribe & Save, one-tap buy-again and an app-only discount",
        "Order tracking, shipment push notifications and expert articles",
      ],
      /** 640×1385 WebP exports of the App Store screenshots. */
      screenshots: [
        { src: "/customers/organics-best/ai-chat.webp", alt: "Ask AI shopping assistant in the Organic's Best mobile app", caption: "AI shopping assistant" },
        { src: "/customers/organics-best/home.webp", alt: "Branded home screen of the Organic's Best Shopify mobile app", caption: "Branded home screen" },
        { src: "/customers/organics-best/cart.webp", alt: "Cart with formula subscriptions in the Organic's Best mobile app", caption: "Subscriptions in the cart" },
        { src: "/customers/organics-best/order.webp", alt: "Order tracking screen in the Organic's Best mobile app", caption: "Order tracking" },
      ],
    },
  ],
} as const;

/** mailto: link to the site contact, with optional pre-filled subject and body. */
export function mailto(subject?: string, body?: string): string {
  const parts: string[] = [];
  if (subject) parts.push(`subject=${encodeURIComponent(subject)}`);
  if (body) parts.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${site.contact.email}${parts.length ? `?${parts.join("&")}` : ""}`;
}

/** "Eiad Oraby" → "EO", for avatar tiles. */
export const founderInitials = site.founder.name
  .split(/\s+/)
  .filter(Boolean)
  .map((part) => part[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();
