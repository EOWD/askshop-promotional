import type { Metadata } from "next";
import { site, mailto, founderInitials } from "@/lib/site";
import { JsonLd, buildBreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "About — Who Builds Tapmerce",
  description:
    "Tapmerce is designed and built by founder Eiad Oraby: dedicated native apps and an AI shopping marketplace for Shopify stores. Learn about the mission and how to get in touch.",
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: "https://tapmerce.ai" },
        { name: "About", url: "https://tapmerce.ai/about" },
      ])} />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              The mobile commerce platform for{" "}
              <span className="text-primary">every Shopify store</span>
            </h1>
            <p className="mt-6 text-lg text-muted">
              We believe every merchant deserves a dedicated mobile app — not a cookie-cutter
              PWA, but a true native experience published under their brand. Tapmerce makes that
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
              We started Tapmerce after watching Shopify merchants struggle with the same problem:
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
              So we built Tapmerce — a platform that gives every Shopify merchant two powerful
              options: a conversational AI shopping app that feels like chatting with a personal
              shopper, and a classic store app that&apos;s fast, beautiful, and native. Both published
              under the merchant&apos;s brand, with their own App Store listing.
            </p>
            <p>
              Tapmerce is founder-built and founder-run. Every feature is driven by one question:
              will this help merchants sell more on mobile?
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-12">Who builds Tapmerce</h2>
          <div className="max-w-3xl rounded-2xl bg-surface border border-border p-8 flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-primary flex items-center justify-center text-white text-xl font-bold">
              {founderInitials}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">{site.founder.name}</h3>
              <p className="mt-1 text-sm text-primary-light">{site.founder.role}</p>
              <p className="mt-4 text-muted">
                Tapmerce is designed, engineered and run by its founder. The platform grew out of
                building the Organic&apos;s Best app — a European organic baby-formula retailer —
                now live on the App Store and Google Play. Every part of it — the native apps, the
                Shopify admin, and the AI assistant — is built in-house.
              </p>
              <a
                href={mailto("Hello Tapmerce")}
                className="mt-6 inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-surface-dark transition-colors"
              >
                {site.contact.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-dark">
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

      <section className="py-24">
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
      <section className="py-24 bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground">Get in touch</h2>
          <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
            Questions about Tapmerce? Want to discuss an Enterprise plan? We&apos;d love to hear from
            you.
          </p>
          <a
            href={mailto("Hello Tapmerce")}
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary-dark transition-colors"
          >
            {site.contact.email}
          </a>
        </div>
      </section>
    </>
  );
}
