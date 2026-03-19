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
  name: "AskShop",
  url: "https://askshop.app",
  logo: "https://askshop.app/logo.png",
  description:
    "Turn your Shopify store into a native mobile app with AI-powered chat shopping or a classic store experience.",
  foundingDate: "2025",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "support@askshop.app",
  },
};

// ---- WebSite with SearchAction ----
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "AskShop",
  url: "https://askshop.app",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://askshop.app/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

// ---- SoftwareApplication ----
export const softwareAppSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AskShop",
  applicationCategory: "BusinessApplication",
  operatingSystem: "iOS, Android",
  url: "https://askshop.app",
  description:
    "Build a dedicated native mobile app for your Shopify store. AI chat shopping or classic store experience. Push notifications, native checkout, white-label builds.",
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "99",
    highPrice: "599",
    priceCurrency: "USD",
    offerCount: 3,
  },
  featureList: [
    "AI Chat Shopping",
    "Native Checkout (Apple Pay, Google Pay, Shop Pay)",
    "Push Notifications",
    "White-Label Builds",
    "Full Shopify Integration",
    "Analytics Dashboard",
    "AI Marketplace",
    "Multi-Store Discovery",
  ],
};

// ---- Pricing page offers ----
export function buildPricingSchemas() {
  const plans = [
    { name: "Starter", price: "99", desc: "For stores getting started with mobile commerce. Classic Store App OR AI Chat App, iOS + Android builds, push notifications." },
    { name: "Growth", price: "249", desc: "For growing stores. Classic Store App AND AI Chat App, unlimited push, advanced analytics, priority support." },
    { name: "Enterprise", price: "599", desc: "For high-volume stores. Everything in Growth plus dedicated account manager, custom AI training, SLA, custom integrations." },
  ];

  return plans.map((plan) => ({
    "@context": "https://schema.org",
    "@type": "Offer",
    name: `AskShop ${plan.name}`,
    description: plan.desc,
    price: plan.price,
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: plan.price,
      priceCurrency: "USD",
      billingDuration: "P1M",
      unitText: "month",
    },
    seller: { "@type": "Organization", name: "AskShop" },
    url: "https://askshop.app/pricing",
    availability: "https://schema.org/InStock",
  }));
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
      url: "https://askshop.app",
    },
    publisher: {
      "@type": "Organization",
      name: "AskShop",
      url: "https://askshop.app",
      logo: { "@type": "ImageObject", url: "https://askshop.app/logo.png" },
    },
    mainEntityOfPage: `https://askshop.app/blog/${post.slug}`,
    articleSection: post.category,
    wordCount: Math.round(parseInt(post.readTime) * 250),
    url: `https://askshop.app/blog/${post.slug}`,
  };
}

// ---- Blog listing (CollectionPage) ----
export function buildBlogListSchema(
  posts: { title: string; slug: string; excerpt: string; date: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AskShop Blog",
    description: "Guides, tips, and insights on mobile commerce, AI shopping, and growing your Shopify store.",
    url: "https://askshop.app/blog",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://askshop.app/blog/${post.slug}`,
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
    name: `AskShop vs ${competitor.name} — Comparison`,
    description: `Compare AskShop and ${competitor.name} for building a Shopify mobile app. Features, pricing, and which is right for your store.`,
    url: `https://askshop.app/compare/${competitor.slug}`,
    mainEntity: {
      "@type": "ItemList",
      name: `AskShop vs ${competitor.name} Feature Comparison`,
      numberOfItems: 2,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "SoftwareApplication",
            name: "AskShop",
            applicationCategory: "BusinessApplication",
            url: "https://askshop.app",
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
