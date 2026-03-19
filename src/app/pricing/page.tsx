import type { Metadata } from "next";
import { JsonLd, buildFaqSchema, buildPricingSchemas, buildBreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Pricing — Plans Starting at $99/month",
  description:
    "AskShop pricing: Starter ($99/mo), Growth ($249/mo), and Enterprise ($599/mo). All plans include a 14-day free trial. Build a native mobile app for your Shopify store.",
};

const plans = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "For stores getting started with mobile commerce.",
    features: [
      "Classic Store App OR AI Chat App",
      "iOS + Android builds",
      "Push notifications (up to 5,000/month)",
      "Custom branding (colors, logo, fonts)",
      "Home screen editor",
      "Basic analytics",
      "No success fees or commissions",
      "Email support",
    ],
    cta: "Join Waitlist",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$249",
    period: "/month",
    description: "For growing stores that want the full mobile experience.",
    features: [
      "Classic Store App AND AI Chat App",
      "iOS + Android builds",
      "Unlimited push notifications",
      "Advanced push segmentation",
      "Custom branding + custom fonts",
      "Priority build queue",
      "Advanced analytics + revenue attribution",
      "Priority support",
      "No success fees or commissions",
      "Automated order notifications",
    ],
    cta: "Join Waitlist",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$599",
    period: "/month",
    description: "For high-volume stores with custom requirements.",
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "Custom AI training on your catalog",
      "Custom integrations",
      "SLA guarantees",
      "Quarterly app performance reviews",
      "White-glove App Store submission",
      "DPA included",
      "No success fees or commissions",
      "Phone + Slack support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Is there a free trial?",
    a: "Yes! All plans include a 14-day free trial. No credit card required. You can explore the admin, customize your app, and preview it before committing.",
  },
  {
    q: "Can I switch between plans?",
    a: "Absolutely. Upgrade or downgrade at any time through the Shopify billing system. Changes take effect at your next billing cycle.",
  },
  {
    q: "Do I need separate developer accounts for App Store and Play Store?",
    a: "Yes. You'll need an Apple Developer account ($99/year) and a Google Play Developer account ($25 one-time). We guide you through setup.",
  },
  {
    q: "How long does it take to publish my app?",
    a: "After you submit your build request, we typically have your app ready within 3-5 business days. App Store review adds 1-2 additional days.",
  },
  {
    q: "Do I own the app?",
    a: "The app is published under your developer accounts, so your brand owns the listing. The app is powered by AskShop technology and requires an active subscription.",
  },
  {
    q: "What happens if I cancel?",
    a: "Your app will continue to function for the remainder of your billing period. After that, the app will stop receiving updates and push notifications will be disabled.",
  },
  {
    q: "Do I need a rebuild for every change?",
    a: "No! Branding changes (colors, fonts, sections, logos) are fetched at runtime and update instantly. Only structural changes (app name, icon, bundle ID) require a rebuild.",
  },
  {
    q: "Is the AI Chat App available on the Starter plan?",
    a: "Yes — on Starter you choose either the AI Chat App or the Classic Store App. On Growth and Enterprise, you get both.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: "https://askshop.app" },
        { name: "Pricing", url: "https://askshop.app/pricing" },
      ])} />
      <JsonLd data={buildFaqSchema(faqs)} />
      {buildPricingSchemas().map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              All plans include a 14-day free trial. No credit card required. No success fees
              or commissions on your sales — ever. Billed through Shopify so everything stays
              in one place.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? "bg-primary text-white ring-2 ring-primary shadow-lg scale-105"
                    : "bg-surface border border-border"
                }`}
              >
                <h3
                  className={`text-lg font-semibold ${
                    plan.highlighted ? "text-white" : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span
                    className={`text-4xl font-bold ${
                      plan.highlighted ? "text-white" : "text-foreground"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.highlighted ? "text-primary-light" : "text-muted"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
                <p
                  className={`mt-2 text-sm ${
                    plan.highlighted ? "text-primary-light" : "text-muted"
                  }`}
                >
                  {plan.description}
                </p>

                <a
                  href="https://apps.shopify.com"
                  className={`mt-6 block w-full rounded-lg py-2.5 text-center text-sm font-medium transition-colors ${
                    plan.highlighted
                      ? "bg-white text-indigo-600 hover:bg-gray-100"
                      : "bg-primary text-white hover:bg-primary-dark"
                  }`}
                >
                  {plan.cta}
                </a>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <svg
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          plan.highlighted ? "text-primary-light" : "text-primary"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className={plan.highlighted ? "text-white/90" : "text-muted"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-surface-dark">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Frequently asked questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <h3 className="text-base font-semibold text-foreground">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
