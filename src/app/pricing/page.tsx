import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Coins, Server, Sparkles } from "lucide-react";
import { JsonLd, buildFaqSchema, buildPricingSchemas, buildBreadcrumbSchema } from "@/components/StructuredData";
import { site, mailto } from "@/lib/site";
import {
  aiPlans,
  app,
  aiPlanFrom,
  appFrom,
  appSetupPrice,
  overagePerConversationEur,
  formatEur,
  formatEurCents,
  pricingAssumptions,
} from "@/lib/pricing";
import { PricingPlans, type PlanCard } from "@/components/pricing/PricingPlans";

export const metadata: Metadata = {
  title: `Pricing: AI Shopping Assistant from ${aiPlanFrom}, Branded App ${appFrom}`,
  description: `AI shopping assistant from ${aiPlanFrom}, priced per conversation. Branded iOS and Android app with AI built in ${appFrom}. Marketplace listing included, 0% commission.`,
};

const common = [
  "AI assistant on your website",
  "Trained on your catalog, ingredients and policies",
  "Stays within your approved claims",
  "Order status and hand-off to your team",
  "Your logo, colors, fonts and voice",
];

const extras: Record<string, string[]> = {
  starter: ["Email support", "Monthly insights report"],
  growth: ["Guided product finders", "Priority support", "Quarterly assistant tuning"],
  scale: ["Custom training on your guides and articles", "Dedicated contact", "SLA on the AI backend"],
};

const plans: PlanCard[] = aiPlans.map((p) => ({
  id: p.id,
  name: p.name,
  blurb: p.blurb,
  monthly: p.priceEur,
  conversations: p.conversations,
  perConversation: formatEurCents(p.perConversationEur),
  features: [...common, ...(extras[p.id] ?? [])],
  highlighted: p.highlighted,
}));

const market = [
  { what: "Help-desk AI agents", unit: "per resolved ticket", price: "about €0.80 to €0.90", note: "Billed per resolution, plus seats" },
  { what: "Ecommerce sales chatbots", unit: "per conversation", price: "about €0.15 to €0.55", note: "Generic answers, no claims guardrails" },
  { what: "Mobile app builders", unit: "per month", price: "about €100 to €2,400", note: "AI usually extra; some take up to 3% of app sales" },
];

const perConvRange = `${formatEurCents(aiPlans[aiPlans.length - 1].perConversationEur)} to ${formatEurCents(aiPlans[0].perConversationEur)}`;

const faqs = [
  {
    q: "What counts as a conversation?",
    a: "One shopper's chat session with the assistant, however many questions they ask in it, typically a handful of messages each way. Visits where nobody opens the chat cost nothing.",
  },
  {
    q: "What happens if I go over my conversations?",
    a: `Nothing breaks. Extra conversations are ${formatEurCents(overagePerConversationEur)} each, and you can move up a plan at any time.`,
  },
  {
    q: "Can I start with the website assistant only?",
    a: `Yes. Most brands start with the assistant on their store and add the app later. The app adds ${formatEur(app.monthlyEur)} a month to any plan, plus a ${appSetupPrice} one-time setup that is waived on annual billing.`,
  },
  {
    q: "Do you take a commission on sales?",
    a: "No. There are no success fees or revenue share on anything: website, app or marketplace.",
  },
  {
    q: "How do annual plans work?",
    a: `Pay for ${12 - pricingAssumptions.annualFreeMonths} months and get 12, and the app setup fee is waived.`,
  },
  {
    q: "What does the 3-week guarantee cover?",
    a: `${site.guarantee.promise}, ${site.guarantee.remedy}. ${site.guarantee.conditions}`,
  },
  {
    q: "Which ecommerce platforms do you support?",
    a: "Shopify and other ecommerce platforms. Tell us yours when you book a demo.",
  },
  {
    q: "Do I need Apple and Google developer accounts?",
    a: "For the app, yes: Apple charges $99 a year and Google $25 once. The apps are published under your own accounts, so your brand owns the listings and the customer relationship. We handle the submissions.",
  },
  {
    q: "Are prices including VAT?",
    a: "Prices are in euros and exclude VAT, which is added where applicable.",
  },
];

const h2 = "display text-[2.3rem] font-bold leading-[1.04] tracking-[-0.022em] text-ink sm:text-5xl";

export default function PricingPage() {
  return (
    <div className="home-world overflow-x-clip bg-stone text-ink">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Pricing", url: `${site.url}/pricing` },
        ])}
      />
      <JsonLd data={buildFaqSchema(faqs)} />
      {buildPricingSchemas().map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}

      {/* ===== HEADER + PLANS ===== */}
      <section className="px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="display text-[2.8rem] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              Affordable AI shopping, no commission
            </h1>
            <p className="mx-auto mt-5 max-w-[36rem] text-[17px] leading-relaxed text-ink-2 sm:text-[19px]">
              Start with the AI assistant on your store from {aiPlanFrom}. Add your own branded app when you&apos;re
              ready. You never pay a share of your sales.
            </p>
          </div>
          <div className="mt-10 sm:mt-12">
            <PricingPlans
              plans={plans}
              freeMonths={pricingAssumptions.annualFreeMonths}
              overage={formatEurCents(overagePerConversationEur)}
              app={{ monthly: app.monthlyEur, setup: app.setupEur, includes: app.includes }}
            />
          </div>
          <p className="mt-6 text-center text-[14px] text-ink-2">
            More than {aiPlans[aiPlans.length - 1].conversations.toLocaleString("en-US")} conversations a month?{" "}
            <a href={mailto("Tapmerce volume pricing")} className="font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
              Ask for volume pricing
            </a>
            . Prices in euros, excluding VAT.
          </p>
        </div>
      </section>

      {/* ===== MARKET ===== */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className={`${h2} max-w-3xl`}>How it compares to what the market charges</h2>
          <p className="mt-5 max-w-[38rem] text-[17px] leading-relaxed text-ink-2 sm:text-[19px]">
            {`Typical published prices, October 2026. Tapmerce costs ${perConvRange} per conversation and includes the app's AI, with no commission.`}
          </p>
          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {market.map((m) => (
              <div key={m.what} className="rounded-[24px] bg-card p-6">
                <div className="text-[15px] font-semibold text-ink">{m.what}</div>
                <div className="display mt-4 text-[1.7rem] font-bold leading-tight tracking-[-0.02em] tabular-nums">{m.price}</div>
                <div className="text-[14px] text-ink-2">{m.unit}</div>
                <p className="mt-4 text-[14px] leading-relaxed text-ink-2">{m.note}</p>
              </div>
            ))}
            <div className="rounded-[24px] bg-ink p-6 text-card">
              <div className="text-[15px] font-semibold">Tapmerce</div>
              <div className="display mt-4 text-[1.7rem] font-bold leading-tight tracking-[-0.02em] tabular-nums">{perConvRange}</div>
              <div className="text-[14px] text-card/70">per conversation, app {appFrom}</div>
              <p className="mt-4 text-[14px] leading-relaxed text-card/75">
                Nutrition-safe answers, your brand everywhere, 0% commission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW WE PRICE ===== */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 rounded-[28px] bg-card p-6 sm:p-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:p-16">
          <div>
            <h2 className={h2}>How we set our prices</h2>
            <p className="mt-5 max-w-[30rem] text-[17px] leading-relaxed text-ink-2 sm:text-[19px]">
              Every plan is built up from what it really costs to run your assistant, plus a fair margin. When AI gets
              cheaper, so do your plans.
            </p>
          </div>
          <ol className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: "The AI itself",
                body: "Each conversation reads your catalog and policies and writes answers. We pay for that by the word, so we price by the conversation.",
              },
              {
                icon: Server,
                title: "Running your store",
                body: "Hosting, the hand-off to your support team, monitoring and, for the app, push delivery and store updates.",
              },
              {
                icon: Coins,
                title: "A fair margin",
                body: "On top of cost, enough to keep improving the product and supporting you. Never a cut of your sales.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone">
                  <Icon className="h-6 w-6 text-ink" strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-[18px] font-semibold">{title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className={`${h2} max-w-3xl`}>Pricing questions</h2>
          <div className="mt-8 columns-1 gap-5 sm:mt-12 md:columns-2">
            {faqs.map((f) => (
              <div key={f.q} className="mb-4 break-inside-avoid rounded-[24px] bg-card p-6 sm:mb-5 sm:p-8">
                <h3 className="text-[17px] font-semibold leading-snug sm:text-[19px]">{f.q}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-32 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[32px] bg-ink p-8 text-card sm:p-14 lg:flex-row lg:items-center">
          <div>
            <h2 className="display text-[2.2rem] font-bold leading-[1.04] tracking-[-0.022em] sm:text-5xl">Not sure which plan fits?</h2>
            <p className="mt-3 max-w-xl text-[17px] text-card/75">
              Tell us your monthly traffic and we&apos;ll show you the assistant on your products and the plan that fits.
            </p>
          </div>
          <Link
            href="/#demo"
            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-action px-7 text-[17px] font-semibold text-ink transition-all duration-200 hover:bg-action-press active:scale-[0.98]"
          >
            Book a demo <ArrowRight className="h-5 w-5" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}
