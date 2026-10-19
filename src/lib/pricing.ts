/**
 * Pricing model: every price on the site is derived here from what Tapmerce
 * actually costs to run, plus a target gross margin. Change an assumption and
 * every price recalculates; nothing else hard-codes a number.
 *
 * The AI cost base uses the published per-token rates of the model the live
 * assistant runs on (main answers + a small model for the post-chat memory
 * update; rates as listed 2026-09-03, re-check when the model changes). The
 * provider and model are internal and are never shown on the site.
 *
 * Market check (2026-10-19): sales-assistant chatbots charge ~€0.15-0.35 per
 * conversation (Zipchat, CartChat), help-desk AI ~€0.85-0.95 per resolution
 * (Gorgias, Intercom Fin); app builders run €120-2,850/month with no real AI
 * shopping assistant. Tapmerce sits at the affordable end of AI pricing and
 * well under app builders, with the app and assistant sold together.
 */
export const pricingAssumptions = {
  currency: "EUR",
  /** USD → EUR conversion used for the cost base. Review quarterly. */
  fxUsdToEur: 0.86,
  /** Per-token rates in USD per 1M tokens. Internal only. */
  rates: {
    main: { input: 5.0, cachedInput: 0.5, output: 30.0 },
    small: { input: 0.15, output: 0.6 },
  },
  /** One shopper conversation with the assistant. */
  conversation: {
    turns: 6,
    inputTokensPerTurn: 7_000, // system prompt + tools + catalog context + history
    cachedInputShare: 0.7, // the system prompt and catalog sit behind a prompt-cache breakpoint
    outputTokensPerTurn: 350,
    memoryInputTokens: 3_000, // post-chat memory/profile update on the small model
    memoryOutputTokens: 300,
  },
  /** Hosting, database, monitoring and the support bridge per store, per month. */
  infraPerStoreEur: 8,
  /** Website AI assistant tiers. Margin is gross margin on (tokens + infra). */
  tiers: [
    { id: "starter", name: "Starter", conversations: 250, margin: 0.45, blurb: "For brands launching their first AI assistant." },
    { id: "growth", name: "Growth", conversations: 1_000, margin: 0.5, blurb: "For growing brands with steady daily questions." },
    { id: "scale", name: "Scale", conversations: 4_000, margin: 0.5, blurb: "For high-volume brands and multi-market stores." },
  ] as const,
  /** Gross margin on conversations beyond the plan allowance. */
  overageMargin: 0.5,
  /** Branded iOS + Android app, sold as an add-on to any AI plan. */
  app: {
    /** One-time: configuration, branding, store listings and submission (~20 hours). */
    setupHours: 20,
    hourlyCostEur: 60,
    setupMargin: 0.2,
    /** Monthly: app backend, push delivery, OS updates and store resubmissions. */
    hostingEur: 15,
    maintenanceHours: 2,
    monthlyMargin: 0.3,
  },
  /** Annual billing: this many months free, and the app setup fee is waived. */
  annualFreeMonths: 2,
} as const;

const A = pricingAssumptions;

/** Token cost of one shopper conversation, in USD. */
export function tokenCostPerConversationUsd(): number {
  const c = A.conversation;
  const m = A.rates.main;
  const s = A.rates.small;
  const inputPerTurn = c.inputTokensPerTurn * ((1 - c.cachedInputShare) * m.input + c.cachedInputShare * m.cachedInput);
  const outputPerTurn = c.outputTokensPerTurn * m.output;
  const turns = (c.turns * (inputPerTurn + outputPerTurn)) / 1_000_000;
  const memory = (c.memoryInputTokens * s.input + c.memoryOutputTokens * s.output) / 1_000_000;
  return turns + memory;
}

export function tokenCostPerConversationEur(): number {
  return tokenCostPerConversationUsd() * A.fxUsdToEur;
}

/** Round to a "charm" price: nearest 10 minus 1 (€69, €249), nearest 100 minus 10 from €1,000 up (€1,490). */
function charm(value: number): number {
  if (value >= 1000) return Math.max(990, Math.round(value / 100) * 100 - 10);
  return Math.max(9, Math.round(value / 10) * 10 - 1);
}

const withMargin = (cost: number, margin: number) => cost / (1 - margin);

export interface AiPlan {
  id: string;
  name: string;
  blurb: string;
  conversations: number;
  priceEur: number;
  /** Underlying monthly cost in EUR (tokens + infra), before margin. */
  costEur: number;
  /** Effective price per included conversation. */
  perConversationEur: number;
  highlighted: boolean;
}

export const aiPlans: AiPlan[] = A.tiers.map((tier, i) => {
  const costEur = tier.conversations * tokenCostPerConversationEur() + A.infraPerStoreEur;
  const priceEur = charm(withMargin(costEur, tier.margin));
  return {
    id: tier.id,
    name: tier.name,
    blurb: tier.blurb,
    conversations: tier.conversations,
    priceEur,
    costEur,
    perConversationEur: priceEur / tier.conversations,
    highlighted: i === 1,
  };
});

/** Price per conversation beyond the plan allowance, in EUR, rounded to the cent. */
export const overagePerConversationEur =
  Math.ceil(withMargin(tokenCostPerConversationEur(), A.overageMargin) * 100) / 100;

/** The branded app add-on. */
export const app = (() => {
  const a = A.app;
  const setupEur = charm(withMargin(a.setupHours * a.hourlyCostEur, a.setupMargin));
  const monthlyEur = charm(withMargin(a.hostingEur + a.maintenanceHours * a.hourlyCostEur, a.monthlyMargin));
  return {
    name: "Branded app",
    setupEur,
    monthlyEur,
    summary: "Your own iOS and Android app in your brand, published under your accounts, with the AI shopping assistant built in.",
    includes: [
      "Native iOS and Android apps in your logo, colors and fonts",
      "Ask AI tab: the same assistant as your website",
      "Subscribe & Save, buy again and order tracking",
      "Push notifications and an app-only discount",
      "Apple Pay, Google Pay and Shop Pay checkout",
      "OS updates and store resubmissions handled for you",
    ],
  } as const;
})();

/** Annual price for a monthly price: pay for 12 minus the free months. */
export const annualPrice = (monthlyEur: number) => monthlyEur * (12 - A.annualFreeMonths);

const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const eurCents = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });

/** "€249" */
export const formatEur = (value: number) => eur.format(value);
/** "€0.25" */
export const formatEurCents = (value: number) => eurCents.format(value);
/** "€69/mo" — the cheapest AI plan, for hero and comparison copy. */
export const aiPlanFrom = `${formatEur(aiPlans[0].priceEur)}/mo`;
/** "+€199/mo" — the app add-on. */
export const appFrom = `+${formatEur(app.monthlyEur)}/mo`;
/** "€1,490" — the one-time app setup. */
export const appSetupPrice = formatEur(app.setupEur);
