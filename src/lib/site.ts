/**
 * Site identity and contact — the one place to edit when AskShop gets its own
 * mailboxes (MX records) or a registered address. Everything on the site that
 * names a person, an email address or the brand reads from here.
 */
export const site = {
  name: "AskShop",
  domain: "askshop.app",
  url: "https://askshop.app",
  tagline: "Mobile AI commerce platform for Shopify stores",
  founder: {
    name: "Eiad Oraby",
    role: "Founder & developer",
  },
  contact: {
    // TEMPORARY: the @askshop.app mailboxes do not exist yet (the domain has no
    // MX records), so every contact link points at the founder's inbox. Swap this
    // for hello@askshop.app once mail is set up — nothing else needs to change.
    email: "eiadoraby@gmail.com",
  },
  legal: {
    operator: "Eiad Oraby",
    // Street address for the Imprint (§ 5 DDG). Required before the site serves
    // EU visitors in production. While empty, the Imprint renders no address line.
    address: "" as string,
    country: "Germany",
  },
  /** Merchants with a live AskShop app. First entry is featured on the home page. */
  customers: [
    {
      slug: "organics-best",
      name: "Organic's Best",
      tagline: "European organic baby formula, shipped worldwide",
      description:
        "A Shopify retailer of HiPP, Holle, Kendamil and other EU-organic formulas. Their AskShop app pairs a branded store with an AI shopping assistant, live human support, subscriptions and order tracking.",
      url: "https://organicsbestshop.com",
      logo: "/customers/organics-best/logo.webp",
      appStore: {
        name: "Organic's Best Shop",
        url: "https://apps.apple.com/us/app/organics-best-shop/id6799952533",
      },
      googlePlay: {
        name: "Organic's Best: Baby Formula",
        url: "https://play.google.com/store/apps/details?id=com.organicsbestshop.app",
      },
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
