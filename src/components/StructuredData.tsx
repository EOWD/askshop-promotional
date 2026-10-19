import { site } from "@/lib/site";
import { aiPlans, app } from "@/lib/pricing";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ---- Organization (site-wide) ----
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tapmerce",
  url: "https://tapmerce.com",
  logo: `${site.url}/logo.svg`,
  description:
    "AI shopping for nutrition brands on Shopify and other ecommerce platforms (supplements, infant formula, sports nutrition, healthy food): an AI shopping assistant for the website, branded iOS and Android apps, and AI marketplace listings.",
  foundingDate: "2025",
  founder: { "@type": "Person", name: site.founder.name },
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: site.contact.email,
  },
};

// ---- WebSite with SearchAction ----
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Tapmerce",
  url: "https://tapmerce.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://tapmerce.com/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// ---- SoftwareApplication ----
export const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Tapmerce",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web, iOS, Android",
  url: "https://tapmerce.com",
  description:
    "AI shopping assistant and branded mobile apps for nutrition brands on Shopify and other ecommerce platforms. Website AI chatbot, native iOS and Android apps, subscriptions, push notifications and native checkout.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: String(aiPlans[0].priceEur),
    highPrice: String(aiPlans[aiPlans.length - 1].priceEur),
    priceCurrency: "EUR",
    offerCount: aiPlans.length + 1,
  },
  featureList: [
    "AI Shopping Assistant built for your store",
    "Native Checkout (Shop Pay, Apple Pay, Google Pay)",
    "Push Notifications (orders, shipments, sales, support)",
    "Order Tracking and Buy Again",
    "App-Exclusive Discount",
    "Subscriptions (Shopify selling plans)",
    "Product Reviews with Photos",
    "Live Support Chat",
    "White-Label iOS and Android Builds",
    "Analytics and AI Attribution",
    "AI Marketplace",
  ],
};

// ---- Pricing page offers (from src/lib/pricing.ts) ----
export function buildPricingSchemas() {
  const appOffer = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: `Tapmerce ${app.name}`,
    description: `${app.summary} One-time setup of €${app.setupEur.toLocaleString("en-US")}, waived on annual billing.`,
    price: String(app.monthlyEur),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(app.monthlyEur),
      priceCurrency: "EUR",
      billingDuration: "P1M",
      unitText: "month",
    },
    priceCurrency: "EUR",
    seller: { "@type": "Organization", name: site.name },
    url: `${site.url}/pricing`,
    availability: "https://schema.org/InStock",
  };
  const planOffers = aiPlans.map((plan) => ({
    "@context": "https://schema.org",
    "@type": "Offer",
    name: `Tapmerce AI ${plan.name}`,
    description: `${plan.blurb} Includes ${plan.conversations.toLocaleString("en-US")} AI shopper conversations per month.`,
    price: String(plan.priceEur),
    priceCurrency: "EUR",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(plan.priceEur),
      priceCurrency: "EUR",
      billingDuration: "P1M",
      unitText: "month",
    },
    seller: { "@type": "Organization", name: site.name },
    url: `${site.url}/pricing`,
    availability: "https://schema.org/InStock",
  }));
  return [appOffer, ...planOffers];
}

// ---- FAQ page schema ----
export function buildFaqSchema(
  faqs: { q: string; a: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

// ---- Blog article schema ----
export function buildArticleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://tapmerce.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Tapmerce",
      url: "https://tapmerce.com",
      logo: { "@type": "ImageObject", url: `${site.url}/logo.svg` },
    },
    mainEntityOfPage: `https://tapmerce.com/blog/${post.slug}`,
    articleSection: post.category,
    wordCount: Math.round(parseInt(post.readTime) * 250),
    url: `https://tapmerce.com/blog/${post.slug}`,
  };
}

// ---- Blog listing (CollectionPage) ----
export function buildBlogListSchema(
  posts: { title: string; slug: string; excerpt: string; date: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tapmerce Blog",
    description: "Guides, tips, and insights on mobile commerce, AI shopping, and growing your Shopify store.",
    url: "https://tapmerce.com/blog",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://tapmerce.com/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };
}

// ---- Comparison page schema ----
export function buildComparisonSchema(competitor: {
  name: string;
  slug: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Tapmerce vs ${competitor.name} — Comparison`,
    description: `Compare Tapmerce and ${competitor.name} for building a Shopify mobile app. Features, pricing, and which is right for your store.`,
    url: `https://tapmerce.com/compare/${competitor.slug}`,
    mainEntity: {
      "@type": "ItemList",
      name: `Tapmerce vs ${competitor.name} Feature Comparison`,
      numberOfItems: 2,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "SoftwareApplication",
            name: "Tapmerce",
            applicationCategory: "BusinessApplication",
            url: "https://tapmerce.com",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "SoftwareApplication",
            name: competitor.name,
            applicationCategory: "BusinessApplication",
          },
        },
      ],
    },
  };
}

// ---- BreadcrumbList ----
export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
