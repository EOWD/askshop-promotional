import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, buildBreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Shopify Mobile App Features & AI Shopping Assistant",
  description:
    "AskShop features: an AI shopping assistant that knows your catalog, a classic native store app, Shopify push notifications, native checkout with Apple Pay and Google Pay, and white-label builds.",
};

const aiFeatures = [
  { title: "Natural Language Search", description: "Customers describe what they want in plain English. The AI finds the perfect products from your catalog." },
  { title: "Smart Recommendations", description: "Suggestions come from your own catalog and each shopper's stated preferences — no generic upsells." },
  { title: "In-Chat Product Cards", description: "Products appear inline with images, prices, variants, and add-to-cart — no context switching." },
  { title: "Conversational Checkout", description: "Customers can complete their purchase right in the conversation flow." },
  { title: "Memory & Personalization", description: "The AI remembers previous conversations and purchases to personalize future interactions." },
  { title: "Brand Voice Training", description: "Train the AI to speak in your brand's tone — casual, professional, playful, or premium." },
  { title: "Agent-Ready (UCP)", description: "Being built on the Universal Commerce Protocol, the open standard from Google and Shopify, so AI agents in your app and beyond can discover, buy, and support." },
];

const classicFeatures = [
  { title: "Dynamic Home Screen", description: "Configure hero banners, featured collections, product carousels, and announcements from your admin." },
  { title: "Collection Browsing", description: "Beautiful grid layouts with infinite scroll, sorting, and filtering. Powered by FlashList for buttery performance." },
  { title: "Product Detail Pages", description: "Image galleries, variant selectors, size guides, reviews, and product recommendations." },
  { title: "Smart Cart", description: "Real-time cart with discount codes, gift cards, shipping estimates, and quantity controls." },
  { title: "Predictive Search", description: "Instant results as customers type. Products, collections, and pages indexed for fast search." },
  { title: "Customer Accounts", description: "OAuth-based login, order history, order tracking, saved addresses, and wishlists." },
];

const sharedFeatures = [
  { title: "Push Notification Campaigns", description: "Build and schedule push campaigns from your Shopify admin. Segment by behavior, location, or purchase history.", icon: "bell" },
  { title: "Native Checkout", description: "Shop Pay, Apple Pay, and Google Pay. One-tap checkout with Shopify's Checkout Sheet Kit.", icon: "card" },
  { title: "White-Label Builds", description: "Your brand, your App Store listing. Custom bundle ID, icon, splash screen, and app name.", icon: "paint" },
  { title: "Real-Time Sync", description: "Products, inventory, prices, and collections sync automatically via the Storefront API.", icon: "bolt" },
  { title: "Analytics", description: "Track app installs, active users, push performance, and revenue attribution in your admin.", icon: "chart" },
  { title: "Automated Notifications", description: "Order confirmations, shipping updates, and delivery notifications push automatically.", icon: "bell" },
];

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: "https://askshop.app" },
        { name: "Features", url: "https://askshop.app/features" },
      ])} />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Every feature your{" "}
              <span className="text-primary">Shopify mobile app</span> needs
            </h1>
            <p className="mt-6 text-lg text-muted">
              Whether your customers prefer chatting with AI or browsing product grids, AskShop
              has the experience they want — built natively, published under your brand.
            </p>
          </div>
        </div>
      </section>

      {/* AI Chat App */}
      <section className="py-24 bg-surface-dark" id="ai-chat">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              NEW
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            AI Shopping Assistant App
          </h2>
          <p className="text-lg text-muted max-w-2xl mb-12">
            A personal shopping assistant for every customer. Powered by AI that knows your
            entire catalog and speaks your brand&apos;s language.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feature) => (
              <div key={feature.title} className="rounded-xl bg-surface p-6 border border-indigo-500/10">
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classic Store App */}
      <section className="py-24" id="classic">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Classic Mobile Store App
          </h2>
          <p className="text-lg text-muted max-w-2xl mb-12">
            The traditional mobile shopping experience, perfected. Fast, beautiful, and built
            with the best native technologies.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classicFeatures.map((feature) => (
              <div key={feature.title} className="rounded-xl bg-surface-dark p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shared Features */}
      <section className="py-24 bg-surface-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Push notifications, native checkout and more — in every app
          </h2>
          <p className="text-lg text-muted max-w-2xl mb-12">
            Core features that power both app experiences.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sharedFeatures.map((feature) => (
              <div key={feature.title} className="rounded-xl bg-surface p-6 border border-border">
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground">See it in action</h2>
          <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
            Join the waitlist and we&apos;ll walk you through both experiences with your own products.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#waitlist"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary-dark transition-colors"
            >
              Join Waitlist
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-base font-medium text-foreground hover:bg-surface-dark transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
