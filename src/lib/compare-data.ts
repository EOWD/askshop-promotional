import { aiPlanFrom, appFrom } from "./pricing";

const TAPMERCE_PRICE = `AI from ${aiPlanFrom}, app ${appFrom}`;

export interface Competitor {
  slug: string;
  name: string;
  tagline: string;
  priceFrom: string;
  description: string;
  features: Record<string, [boolean | string, boolean | string]>; // [competitor, tapmerce]
  tapmerceAdvantages: string[];
  competitorAdvantages: string[];
  verdict: string;
}

export const competitors: Record<string, Competitor> = {
  tapcart: {
    slug: "tapcart",
    name: "Tapcart",
    tagline: "Market leader in Shopify mobile app building",
    priceFrom: "~$200/mo",
    description:
      "Tapcart is one of the most established Shopify mobile app builders with a large customer base and extensive integration ecosystem. They offer solid mobile apps with good customization options.",
    features: {
      "AI Chat Shopping": ["No", "Yes"],
      "Traditional Store App": ["Yes", "Yes"],
      "Starting Price": ["~$200/mo", TAPMERCE_PRICE],
      "Success Fees": ["2.5% of in-app sales", "No"],
      "Push Notifications": ["Yes", "Yes"],
      "Native Checkout (Shop Pay)": ["Yes", "Yes"],
      "Custom Branding": ["Full", "Full"],
      "Two App Experiences": ["No", "Yes"],
      "Dedicated App Builds": ["Yes", "Yes"],
      "AR Try-On": ["Yes", "Planned"],
      "Built-in Loyalty": ["Yes", "Via Shopify"],
      "Integration Ecosystem": ["Extensive", "Growing"],
    },
    tapmerceAdvantages: [
      "AI-powered conversational shopping (unique feature)",
      "No monthly platform fee and no success fees — one-time build plus a usage-based AI plan",
      "No success fees (Tapcart charges 2.5% of in-app sales)",
      "Two distinct app experiences (AI Chat + Classic)",
      "Modern tech stack (React Native + Expo SDK 55)",
    ],
    competitorAdvantages: [
      "Longer market presence with more case studies",
      "Larger integration ecosystem",
      "AR try-on features available now",
      "Built-in loyalty program",
    ],
    verdict:
      "Choose Tapcart if you need an established platform with extensive integrations. Choose Tapmerce if you want AI shopping capabilities, lower pricing, and the flexibility of two app experiences.",
  },
  shopney: {
    slug: "shopney",
    name: "Shopney",
    tagline: "Design-focused Shopify mobile app builder",
    priceFrom: "~$149/mo",
    description:
      "Shopney focuses on design flexibility and includes in-app chat features. They offer competitive pricing and good customization options for Shopify merchants.",
    features: {
      "AI Chat Shopping": ["No", "Yes"],
      "Traditional Store App": ["Yes", "Yes"],
      "Starting Price": ["~$149/mo", TAPMERCE_PRICE],
      "Push Notifications": ["Yes", "Yes"],
      "Native Checkout": ["Yes", "Yes"],
      "Custom Branding": ["Good", "Full"],
      "In-App Chat (Support)": ["Yes", "Via AI"],
      "Two App Experiences": ["No", "Yes"],
      "Design Flexibility": ["Good", "Good"],
      "Revenue Attribution": ["Limited", "Yes"],
    },
    tapmerceAdvantages: [
      "AI-powered product recommendations and chat shopping",
      "No monthly platform fee and no success fees — one-time build plus a usage-based AI plan",
      "Two app experiences instead of one",
      "AI replaces need for live chat support staff",
    ],
    competitorAdvantages: [
      "Human in-app chat support features",
      "More design templates available",
      "Established market presence",
    ],
    verdict:
      "Choose Shopney if you want human-powered in-app chat and more design templates. Choose Tapmerce if you want AI-driven shopping, lower pricing, and two distinct app experiences.",
  },
  vajro: {
    slug: "vajro",
    name: "Vajro",
    tagline: "Mobile app builder with live video shopping",
    priceFrom: "~$99/mo",
    description:
      "Vajro differentiates with live video shopping features and built-in loyalty programs. They offer an affordable entry point and unique engagement features.",
    features: {
      "AI Chat Shopping": ["No", "Yes"],
      "Traditional Store App": ["Yes", "Yes"],
      "Starting Price": ["~$99/mo", TAPMERCE_PRICE],
      "Push Notifications": ["Yes", "Yes"],
      "Native Checkout": ["Yes", "Yes"],
      "Live Video Shopping": ["Yes", "No"],
      "Built-in Loyalty": ["Yes", "Via Shopify"],
      "Two App Experiences": ["No", "Yes"],
      "Custom Branding": ["Moderate", "Full"],
      "Analytics": ["Basic", "Advanced"],
    },
    tapmerceAdvantages: [
      "AI-powered conversational shopping",
      "Full custom branding (vs moderate)",
      "Two app experiences (AI Chat + Classic)",
      "Advanced analytics with revenue attribution",
    ],
    competitorAdvantages: [
      "Live video shopping features",
      "Built-in loyalty program",
      "Gamification features",
    ],
    verdict:
      "Choose Vajro if live video shopping is critical for your brand. Choose Tapmerce if you want AI shopping, better branding control, and more advanced analytics.",
  },
  magenative: {
    slug: "magenative",
    name: "MageNative",
    tagline: "Budget-friendly Shopify mobile app builder",
    priceFrom: "~$49/mo",
    description:
      "MageNative offers the most affordable entry point in the Shopify mobile app builder market. Good for basic mobile app needs with essential features covered.",
    features: {
      "AI Chat Shopping": ["No", "Yes"],
      "Traditional Store App": ["Yes", "Yes"],
      "Starting Price": ["~$49/mo", TAPMERCE_PRICE],
      "Push Notifications": ["Yes", "Yes"],
      "Native Checkout": ["Yes", "Yes"],
      "Custom Branding": ["Limited", "Full"],
      "Two App Experiences": ["No", "Yes"],
      "Advanced Analytics": ["No", "Yes"],
      "Push Segmentation": ["Basic", "Advanced"],
      "Build Quality": ["Basic", "Premium"],
    },
    tapmerceAdvantages: [
      "AI-powered shopping experience (unique)",
      "Full custom branding vs limited customization",
      "Premium build quality with modern tech stack",
      "Advanced push segmentation and analytics",
      "Two app experiences",
    ],
    competitorAdvantages: [
      "Lower upfront cost ($49/month, no build fee)",
      "Good for stores with very basic needs",
    ],
    verdict:
      "Choose MageNative if budget is your primary concern and you need only basic features. Choose Tapmerce if you want a premium experience with AI capabilities and full customization.",
  },
  appbrew: {
    slug: "appbrew",
    name: "Appbrew",
    tagline: "Accel-backed Shopify mobile app builder",
    priceFrom: "~$499/mo",
    description:
      "Appbrew is a well-funded (Accel-backed) Shopify mobile app builder that has been aggressively building comparison and SEO content. They focus on performance and deep Shopify integration.",
    features: {
      "AI Chat Shopping": ["No", "Yes"],
      "Traditional Store App": ["Yes", "Yes"],
      "Starting Price": ["~$499/mo", TAPMERCE_PRICE],
      "Success Fees": ["Yes (1-2%)", "No"],
      "Push Notifications": ["Yes", "Yes"],
      "Native Checkout": ["Yes", "Yes"],
      "Custom Branding": ["Full", "Full"],
      "Two App Experiences": ["No", "Yes"],
      "Dedicated App Builds": ["Yes", "Yes"],
      "Analytics": ["Advanced", "Advanced"],
    },
    tapmerceAdvantages: [
      "AI-powered conversational shopping (unique feature)",
      "No monthly platform fee and no success fees — one-time build plus a usage-based AI plan",
      "No success fees or commissions (Appbrew charges 1-2%)",
      "Two distinct app experiences (AI Chat + Classic)",
    ],
    competitorAdvantages: [
      "Well-funded with Accel backing",
      "Larger team and faster feature development",
      "Extensive comparison/SEO content driving organic traffic",
      "More third-party integrations",
    ],
    verdict:
      "Choose Appbrew if you want a well-funded platform with extensive integrations and don't mind the higher price + success fees. Choose Tapmerce if you want AI shopping, transparent pricing without commissions, and the flexibility of two app experiences at a fraction of the cost.",
  },
  plobal: {
    slug: "plobal",
    name: "Plobal Apps",
    tagline: "Built for Shopify certified mobile app builder",
    priceFrom: "~$199/mo",
    description:
      "Plobal Apps carries the official 'Built for Shopify' badge and offers a drag-and-drop builder with white-glove service. They focus on enterprise-grade features with AI-powered push personalization.",
    features: {
      "AI Chat Shopping": ["No", "Yes"],
      "Traditional Store App": ["Yes", "Yes"],
      "Starting Price": ["~$199/mo", TAPMERCE_PRICE],
      "Push Notifications": ["Yes", "Yes"],
      "Native Checkout": ["Yes", "Yes"],
      "Built for Shopify Badge": ["Yes", "Pending"],
      "Custom Branding": ["Full", "Full"],
      "Two App Experiences": ["No", "Yes"],
      "Success Fees": ["On Enterprise (1%)", "No"],
      "Analytics": ["Advanced", "Advanced"],
    },
    tapmerceAdvantages: [
      "AI-powered conversational shopping (unique feature)",
      "No monthly platform fee and no success fees — one-time build plus a usage-based AI plan",
      "No success fees on any plan",
      "Two distinct app experiences (AI Chat + Classic)",
      "True native builds (not iframe-based)",
    ],
    competitorAdvantages: [
      "Official 'Built for Shopify' certification",
      "Longer market presence with more integrations",
      "White-glove onboarding service",
      "Deeper Klaviyo/Yotpo/Recharge integrations",
    ],
    verdict:
      "Choose Plobal Apps if you value the 'Built for Shopify' badge and need deep integrations with specific third-party tools. Choose Tapmerce if you want AI shopping, lower pricing, and true native app builds without iframe workarounds.",
  },
};

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors[slug];
}

export function getAllCompetitorSlugs(): string[] {
  return Object.keys(competitors);
}
