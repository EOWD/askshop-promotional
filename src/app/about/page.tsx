import type { Metadata } from "next";
import { JsonLd, buildBreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "About — The Team Behind AskShop",
  description:
    "AskShop is built by a team of mobile commerce specialists, Shopify experts, and AI engineers. Learn about our mission to democratize mobile commerce.",
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: "https://askshop.app" },
        { name: "About", url: "https://askshop.app/about" },
      ])} />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Making mobile commerce accessible to{" "}
              <span className="text-primary">every Shopify store</span>
            </h1>
            <p className="mt-6 text-lg text-muted">
              We believe every merchant deserves a dedicated mobile app — not a cookie-cutter
              PWA, but a true native experience published under their brand. AskShop makes that
              possible without the $50k+ development cost.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">Our story</h2>
          <div className="max-w-3xl space-y-6 text-muted">
            <p>
              We started AskShop after watching Shopify merchants struggle with the same problem:
              mobile traffic was growing every year, but mobile conversion rates stayed flat.
              The gap between desktop and mobile conversion was costing merchants millions in
              lost revenue.
            </p>
            <p>
              The existing mobile app builders were either too expensive for small stores or
              too limited for growing ones. And none of them were thinking about how AI could
              transform the shopping experience.
            </p>
            <p>
              So we built AskShop — a platform that gives every Shopify merchant two powerful
              options: a conversational AI shopping app that feels like chatting with a personal
              shopper, and a classic store app that&apos;s fast, beautiful, and native. Both published
              under the merchant&apos;s brand, with their own App Store listing.
            </p>
            <p>
              We&apos;re a small, focused team that cares deeply about merchant success. Every feature
              we build is driven by one question: will this help our merchants sell more on
              mobile?
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">What we believe</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Mobile-first is not enough",
                description:
                  "A responsive website is table stakes. The merchants winning in 2026 have dedicated native apps with push notifications, native checkout, and AI-powered experiences.",
              },
              {
                title: "AI changes everything",
                description:
                  "Browsing product grids was the best we had in 2015. In 2026, customers expect to tell a store what they want and get instant, personalized answers.",
              },
              {
                title: "Every store deserves its own app",
                description:
                  "Not a shared shell with a different logo. A dedicated build with its own bundle ID, its own App Store listing, and its own identity.",
              },
            ].map((belief) => (
              <div key={belief.title}>
                <h3 className="text-lg font-semibold text-foreground">{belief.title}</h3>
                <p className="mt-2 text-sm text-muted">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">Our tech stack</h2>
          <p className="text-muted max-w-2xl mb-8">
            We use modern, battle-tested technologies to ensure your app is fast, reliable,
            and maintainable.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "React Native + Expo", description: "True native apps for iOS and Android from a single codebase" },
              { name: "Shopify Storefront API", description: "Real-time product, inventory, and cart sync" },
              { name: "Shopify Checkout Sheet Kit", description: "Native Shop Pay, Apple Pay, and Google Pay" },
              { name: "Remix + Polaris", description: "Admin app embedded in Shopify for seamless merchant experience" },
            ].map((tech) => (
              <div key={tech.name} className="rounded-xl bg-surface p-6 border border-border">
                <h3 className="text-sm font-semibold text-foreground">{tech.name}</h3>
                <p className="mt-1 text-xs text-muted">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground">Get in touch</h2>
          <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
            Questions about AskShop? Want to discuss an Enterprise plan? We&apos;d love to hear from
            you.
          </p>
          <a
            href="mailto:hello@askshop.app"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary-dark transition-colors"
          >
            hello@askshop.app
          </a>
        </div>
      </section>
    </>
  );
}
