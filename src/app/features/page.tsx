import type { Metadata } from "next";
import Link from "next/link";
import {
  BrainCircuit,
  Bell,
  Truck,
  Percent,
  Repeat,
  Star,
  Headset,
  BookOpen,
  LayoutDashboard,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { JsonLd, buildBreadcrumbSchema } from "@/components/StructuredData";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shopify Mobile App Features: AI Chatbot, Push & Order Tracking",
  description:
    "Every feature in an Tapmerce Shopify mobile app, live today: an AI shopping assistant built for your store, push notifications, order tracking, app-only discounts, subscriptions, reviews with photos and live support chat.",
};

interface Feature {
  title: string;
  description: string;
}

interface Section {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  intro: string;
  features: Feature[];
  dark?: boolean;
}

const sections: Section[] = [
  {
    id: "ai-chat",
    icon: BrainCircuit,
    eyebrow: "Shopify AI assistant",
    title: "An AI shopping assistant built for your store",
    intro:
      "Not a generic chatbot. The assistant knows only your store: your catalog, your product data, your policies and your content, in your brand's voice. It sells, answers and hands off — inside your app.",
    features: [
      { title: "Grounded in your store's data", description: "Answers come from your live catalog, product details and ingredients, shipping and return policies, FAQs and articles. It never invents a product you don't sell." },
      { title: "Product cards, add to cart", description: "Search, best sellers and product details appear as cards in the chat. Shoppers add to their real Shopify cart from the conversation, subscriptions included." },
      { title: "Guided finders", description: "Step-by-step questions that narrow to the right product — the way a good salesperson would — with every recommendation checked against your product data." },
      { title: "Order help, instantly", description: "\"Where is my delivery?\" answered from the customer's real orders, with shipping estimates for the next one." },
      { title: "Remembers each customer", description: "Preferences, needs and context are remembered across visits with the shopper's consent, so nobody repeats themselves." },
      { title: "Hands off to your team", description: "When a human is needed, the assistant opens a live support conversation with your team in the same screen." },
      { title: "Your brand's voice", description: "Persona, tone and boundaries are written for your store — caring, expert, playful or premium." },
      { title: "Privacy by design", description: "An explicit consent screen before the first message, no training on customer conversations, deletion on request." },
    ],
  },
  {
    id: "push",
    icon: Bell,
    eyebrow: "Shopify push notifications",
    title: "Push notifications that bring customers back",
    intro:
      "Sent from your Shopify admin, delivered to the right customer's phone. No email open rates to hope for.",
    dark: true,
    features: [
      { title: "Order confirmations", description: "The moment an order is placed, the customer's phone knows — and a tap opens the order." },
      { title: "Shipment milestones", description: "Confirmed, shipped, out for delivery, delivered — pushed from carrier events, with the noisy in-transit scans filtered out." },
      { title: "Sale broadcasts", description: "Announce a sale or a drop to every app customer from one screen in your admin, with a banner and popup to match." },
      { title: "Support replies", description: "When your team answers a chat, the customer gets a push and lands straight back in the conversation." },
      { title: "Targeted, never noisy", description: "Order and support pushes go only to the customer they concern. Broadcasts are opt-in and one tap to leave." },
      { title: "Deep links that work", description: "Every push opens the right screen, even when the app was closed." },
    ],
  },
  {
    id: "orders",
    icon: Truck,
    eyebrow: "Shopify order tracking",
    title: "Order tracking and one-tap reorders",
    intro:
      "The questions that flood your inbox — where is it, when will it arrive, how do I reorder — answered in the app before they're asked.",
    features: [
      { title: "Live tracking stepper", description: "Ordered, shipped, in transit, delivered, with carrier and tracking number per package. Carrier integrations are added per store." },
      { title: "Order history", description: "Every order with items, prices and status, pulled from Shopify customer accounts." },
      { title: "Buy again", description: "Past purchases as one-tap reorders on the home screen — the fastest path to a repeat sale." },
      { title: "After-purchase guides", description: "Product-specific instructions attached to the order, such as preparation or care guides." },
    ],
  },
  {
    id: "discount",
    icon: Percent,
    eyebrow: "App-exclusive discount",
    title: "A discount only your app customers get",
    intro:
      "The reason to install and keep the app. An automatic discount that applies to app orders and nowhere else — no codes to leak to the web.",
    dark: true,
    features: [
      { title: "Automatic at checkout", description: "A Shopify Function recognises app carts and applies the discount at checkout. Web carts see nothing." },
      { title: "You set the rules", description: "Choose the percentage and whether it applies to all lines or one-time purchases only, from your admin." },
      { title: "Measured", description: "App-only orders and revenue show up in your analytics, so you can see what the discount earns." },
    ],
  },
  {
    id: "subscriptions",
    icon: Repeat,
    eyebrow: "Shopify subscriptions",
    title: "Subscribe & Save, native in the app",
    intro:
      "Your Shopify selling plans, presented the way a mobile buyer expects — recurring revenue without a separate subscription app in the way.",
    features: [
      { title: "Selling plans in the buy box", description: "One-time, subscribe and save, and starter bundles for new customers, with frequency options and per-variant pricing." },
      { title: "Plans that follow your rules", description: "Different plans for different variants, discounts and bonus units exactly as configured in Shopify." },
      { title: "Clear in the cart", description: "Subscription lines are badged with their frequency and saving, so nobody is surprised at checkout." },
      { title: "Managed from the account", description: "Customers reach their subscription portal and rewards from the account tab." },
    ],
  },
  {
    id: "reviews",
    icon: Star,
    eyebrow: "Shopify product reviews",
    title: "Reviews with photos, right where the decision happens",
    intro: "Ratings on every product card and a full review section on the product page, synced with your reviews platform.",
    dark: true,
    features: [
      { title: "Ratings everywhere", description: "Star ratings and review counts on product cards, collections and the product page." },
      { title: "Photos and filters", description: "Customer photos with a lightbox, rating histogram, and sort and filter controls." },
      { title: "Write a review in the app", description: "Customers submit reviews with photos from their phone. Submissions are moderated before they publish." },
    ],
  },
  {
    id: "support",
    icon: Headset,
    eyebrow: "Shopify live chat",
    title: "Live chat with your human support team",
    intro: "Connected to your helpdesk, so your team answers from the tools they already use and the customer stays in the app.",
    features: [
      { title: "Two-way live thread", description: "Customers message your team in the app; replies arrive in seconds with a push notification." },
      { title: "Hand-off from the AI", description: "The assistant opens the conversation with context when a question needs a person." },
      { title: "Business hours and call", description: "Availability shown honestly, with click-to-call and a ticket list for past conversations." },
    ],
  },
  {
    id: "content",
    icon: BookOpen,
    eyebrow: "Content that sells",
    title: "Articles, experts and FAQs — native, not a web view",
    intro: "Your blog and guidance rendered as native screens, so education and trust live next to the buy button.",
    dark: true,
    features: [
      { title: "Articles with categories", description: "Your blog with category filters, a featured article and a table of contents per post. Internal links open native screens." },
      { title: "Expert and reviewer profiles", description: "Bylines and reviewer credentials with photos and profile pages, mirrored from your site." },
      { title: "FAQs, videos and guarantees", description: "FAQ accordions, product videos, delivery estimates, free-shipping progress and trust guarantees on the product page." },
    ],
  },
  {
    id: "admin",
    icon: LayoutDashboard,
    eyebrow: "Merchant admin",
    title: "Run it all from inside Shopify",
    intro: "An embedded app in your Shopify admin. No new logins, no separate dashboard to check.",
    features: [
      { title: "Mobile content", description: "Home-screen banners, popups and announcement bars, live in the app the moment you save." },
      { title: "Send a notification", description: "Compose a sale broadcast and send it to every app customer." },
      { title: "Analytics", description: "Mobile sales and share of revenue, iOS versus Android, AI-assisted revenue attribution and push device counts." },
      { title: "Customers and demand", description: "AI-built shopper profiles with needs and interests, and a list of products customers asked for that you don't stock yet." },
      { title: "Mobile discounts", description: "Create, adjust, activate or pause the app-only discount." },
      { title: "Chat quality", description: "Flag and review assistant answers to keep quality high." },
    ],
  },
  {
    id: "native",
    icon: ShieldCheck,
    eyebrow: "Native and compliant",
    title: "Native iOS and Android, approved by the stores",
    intro: "Built with the same tools Shopify uses for its own apps, published under your accounts, and already through App Store and Google Play review.",
    dark: true,
    features: [
      { title: "Shopify's native checkout", description: "Checkout Sheet Kit with Shop Pay, Apple Pay and Google Pay. Payment, taxes and shipping stay on Shopify." },
      { title: "Passwordless sign-in", description: "Shopify customer accounts with one-time email codes, plus a guest mode that exposes the whole store." },
      { title: "Account deletion in-app", description: "Customers can delete their account and data from the app, as the stores require." },
      { title: "Your brand, your listing", description: "Custom app name, icon, splash video, colors and fonts. Your App Store and Google Play listing, your bundle id." },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "Features", url: `${site.url}/features` },
      ])} />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Every feature your{" "}
              <span className="text-primary">Shopify mobile app</span> needs
            </h1>
            <p className="mt-6 text-lg text-muted">
              Everything on this page is live today in the first Tapmerce app — not a roadmap. An AI
              shopping assistant built for your store, push notifications, order tracking, an
              app-only discount, subscriptions, reviews and live support, all native on iOS and Android.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/#demo"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary-dark transition-colors"
              >
                Get your app live in 3 weeks
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-base font-medium text-foreground hover:bg-surface-dark transition-colors"
              >
                See pricing
              </Link>
            </div>
          </div>

          {/* In-page nav */}
          <nav className="mt-12 flex flex-wrap gap-2" aria-label="Feature sections">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:border-primary/40 transition-colors"
              >
                {s.eyebrow}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`py-24 scroll-mt-24 ${section.dark ? "bg-surface-dark" : ""}`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <section.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">{section.eyebrow}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{section.title}</h2>
            <p className="text-lg text-muted max-w-2xl mb-12">{section.intro}</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.features.map((feature) => (
                <div
                  key={feature.title}
                  className={`rounded-xl p-6 border ${section.dark ? "bg-surface border-border" : "bg-surface-dark border-border"}`}
                >
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground">{site.guarantee.headline}</h2>
          <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
            {site.guarantee.promise}, {site.guarantee.remedy}. Join the waitlist and we&apos;ll walk you
            through every feature with your own products.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#demo"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary-dark transition-colors"
            >
              Claim your 3-week slot
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
