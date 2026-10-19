import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Baby,
  Bell,
  Database,
  FileCheck2,
  Headset,
  MessageCircle,
  Pill,
  Repeat,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { site } from "@/lib/site";
import { aiPlans, app, appSetupPrice, formatEur, overagePerConversationEur, formatEurCents } from "@/lib/pricing";
import { StoreBadges } from "@/components/StoreBadges";
import { JsonLd, buildFaqSchema } from "@/components/StructuredData";
import { Reveal } from "@/components/home/Reveal";
import { DemoRequestForm } from "@/components/home/DemoRequestForm";
import { HeroField } from "@/components/home/HeroField";
import { AssistantDemo } from "@/components/home/AssistantDemo";
import { ServicesSwitcher, type Service } from "@/components/home/ServicesSwitcher";
import { PlanPicker } from "@/components/home/PlanPicker";
import { SectionDock } from "@/components/home/SectionDock";
import { Lifestyles } from "@/components/home/Lifestyles";
import { BrandLogo, SAMPLE_BRANDS } from "@/components/home/SampleBrands";

const flagship = site.customers[0];
const shot = (key: string) => flagship.screenshots.find((s) => s.src.includes(key))!;

// ---------- Content ----------

const questions = [
  "Is this safe while breastfeeding?",
  "Can I take iron and magnesium together?",
  "Which protein has no stevia?",
  "Is the vitamin D3 from lichen or lanolin?",
  "My toddler is 14 months. Which formula stage?",
  "Do you ship to Canada?",
  "What's the difference between your two collagens?",
  "Can I pause my subscription for a month?",
  "Is this granola nut free?",
  "How much protein per serving?",
  "Is the fish oil tested for heavy metals?",
  "Which creatine dissolves best?",
];

const services: Service[] = [
  {
    id: "website",
    tab: "Your website",
    title: "An AI chatbot for your online store",
    body: "A shopping assistant on every page of your site, trained on your catalog, ingredient lists, FAQs and policies. It answers in your brand's voice, shows products as cards and adds them to the shopper's real cart. Shopify or any other ecommerce platform.",
    points: [
      "Guided finders that narrow by goal, diet and allergens",
      "Ingredient, dosage and sourcing answers from your product data",
      "Order status from the customer's real orders",
      "Hand-off to your support team in the same chat",
      "Styled in your logo, colors, fonts and voice",
    ],
  },
  {
    id: "app",
    tab: "Your app",
    title: "Your own app, with AI shopping built in",
    body: "An iOS and Android app in your brand, published under your name, with the AI shopping assistant in its own tab. Shoppers ask, compare and add to cart in a conversation, and since formula, protein and vitamins run out every few weeks, the reorder is one tap away.",
    points: [
      "An Ask AI tab: the same assistant as your website, in your brand's voice",
      "Subscribe & Save from your subscription plans",
      "Buy again, order tracking and shipping push notifications",
      "An app-only discount applied automatically at checkout",
    ],
  },
  {
    id: "marketplace",
    tab: "AI marketplace",
    title: "Found by AI shopping agents",
    body: "More shoppers now ask an AI what to buy. The Tapmerce marketplace lists your store for shoppers who describe what they need, and we're building on the Universal Commerce Protocol so agents beyond our app can find you too.",
    points: [
      "A store page with your logo, products and story",
      "Your catalog structured so AI agents can read it",
      "Checkout stays on your store; you stay the merchant of record",
    ],
  },
];

const guardrails = [
  {
    icon: FileCheck2,
    title: "Your approved claims only",
    body: "It uses the wording your brand already uses and never promises to treat, cure or prevent anything.",
  },
  {
    icon: Stethoscope,
    title: "Medical questions go to a professional",
    body: "Pregnancy, medication, children's health and symptoms get a careful answer and a pointer to a doctor or pharmacist.",
  },
  {
    icon: Database,
    title: "Answers come from your data",
    body: "Catalog, metafields and policies. When the data doesn't have the answer, it says so instead of guessing.",
  },
  {
    icon: Headset,
    title: "A person when it matters",
    body: "Any conversation can move to your support team in the same chat, history attached.",
  },
];

const steps = [
  { when: "Week 1", title: "Connect and brief", body: "Connect your store, share your brand, approved claims and your support team's most common questions." },
  { when: "Week 2", title: "Train and review", body: "We set up the assistant on your catalog and build your app. You test both before anything goes live." },
  { when: "Week 3", title: "Go live", body: "The assistant goes live on your site and your apps go to the App Store and Google Play." },
  { when: "After launch", title: "Learn and improve", body: "See what shoppers ask, which answers lead to orders, and where product pages need more detail." },
];

const faqs = [
  {
    q: "Can I use the AI assistant on my website without the mobile app?",
    a: "Yes. The website assistant, the mobile app and the marketplace listing are separate services. Most brands start with the assistant on their online store and add the app when they want more repeat orders.",
  },
  {
    q: "Will the AI make health claims about my products?",
    a: "No. It uses your approved product wording, explains ingredients and how customers use a product, and refers medical questions, including pregnancy, medication and children's health, to a doctor or pharmacist.",
  },
  {
    q: "Where does the assistant get its answers?",
    a: "From your product catalog, product attributes such as ingredients and allergens, your FAQs, articles and store policies. It recommends only products you sell, at your prices and stock levels.",
  },
  {
    q: "Which ecommerce platforms do you support?",
    a: "Shopify and other ecommerce platforms. The assistant connects to your catalog, orders, subscriptions and policies wherever your store runs. Tell us your platform when you book a demo.",
  },
  {
    q: "Does it work with subscriptions?",
    a: "Yes. It reads your subscription plans, so shoppers can choose Subscribe & Save frequencies in the chat, on product pages and in the cart.",
  },
  {
    q: "Is Tapmerce only for nutrition brands?",
    a: "It's built for nutrition brands first: supplements and vitamins, infant formula, sports nutrition and healthy food, because their shoppers ask the most questions before buying. It works for any online store.",
  },
  {
    q: "How much does it cost?",
    a: `The AI assistant starts at ${formatEur(aiPlans[0].priceEur)} a month for ${aiPlans[0].conversations} shopper conversations, then ${formatEurCents(overagePerConversationEur)} per extra conversation. Your branded iOS and Android app is a one-time build of ${appSetupPrice}, then ${formatEur(app.monthlyEur)} a month for hosting, push and updates. No commission on your sales, ever.`,
  },
];


const plans = aiPlans.map((p) => ({
  id: p.id,
  name: p.name,
  blurb: p.blurb,
  price: formatEur(p.priceEur),
  conversations: p.conversations.toLocaleString("en-US"),
}));

// ---------- Shared bits ----------

const h2 = "display text-[2.5rem] font-bold leading-[1.04] tracking-[-0.022em] text-ink sm:text-6xl";
const cardShadow = "shadow-[0_30px_60px_-45px_rgba(60,40,20,0.5)]";

function Bubble({ from, children }: { from: "user" | "ai"; children: React.ReactNode }) {
  return from === "user" ? (
    <div className="flex justify-end">
      <p className="max-w-[85%] rounded-[18px] rounded-br-md bg-ink px-3.5 py-2.5 text-[14px] leading-snug text-card">{children}</p>
    </div>
  ) : (
    <div className="flex justify-start">
      <p className="max-w-[88%] rounded-[18px] rounded-bl-md bg-card px-3.5 py-2.5 text-[14px] leading-snug text-ink">{children}</p>
    </div>
  );
}

function QuestionRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const loop = [...items, ...items];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <ul className={`flex shrink-0 gap-3 pr-3 hover:[animation-play-state:paused] ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {loop.map((q, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length || undefined}
            className="flex shrink-0 items-center gap-2.5 rounded-full bg-card px-5 py-3 text-[16px] text-ink shadow-[0_8px_20px_-16px_rgba(60,40,20,0.6)]"
          >
            <MessageCircle className="h-4 w-4 text-ink-3" strokeWidth={1.75} />
            {q}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------- Service visuals ----------

function FinderPreview() {
  return (
    <div className="rounded-[22px] bg-stone p-5 sm:p-7">
      <div className="rounded-[18px] bg-card p-5">
        <div className="flex items-baseline justify-between">
          <div className="text-[16px] font-semibold text-ink">Find your magnesium</div>
          <div className="text-[13px] tabular-nums text-ink-3">Step 2 of 3</div>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-stone">
          <div className="h-full w-2/3 rounded-full bg-ink" />
        </div>
        <div className="mt-5 text-[15px] text-ink">What matters most to you?</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Evening routine", "Muscle recovery", "Gentle on stomach", "Vegan", "No fillers"].map((c, i) => (
            <span
              key={c}
              className={`rounded-full border px-3.5 py-1.5 text-[14px] ${
                i === 0 || i === 3 ? "border-ink bg-ink font-medium text-card" : "border-line text-ink-2"
              }`}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-4 rounded-[14px] bg-stone p-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-card">
            <Pill className="h-6 w-6 text-ink-2" strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[15px] font-semibold text-ink">Magnesium Glycinate 400</div>
            <div className="text-[13px] text-ink-3">Vegan, 90 capsules, in stock</div>
          </div>
          <span className="rounded-full bg-action px-3.5 py-1.5 text-[13px] font-semibold text-ink">Add</span>
        </div>
      </div>
      <p className="mt-4 text-center text-[13px] text-ink-2">Sample products. Every pick is checked against your product data.</p>
    </div>
  );
}

function AppPreview() {
  return (
    <div className="relative flex items-end justify-center gap-4 overflow-hidden rounded-[22px] bg-stone px-6 pt-10">
      {["ai-chat", "home"].map((key, i) => {
        const s = shot(key);
        return (
          <div
            key={key}
            className={`w-[44%] max-w-[210px] overflow-hidden rounded-t-[26px] border-[6px] border-b-0 border-ink bg-ink ${i === 1 ? "translate-y-6" : ""}`}
          >
            <Image src={s.src} alt={s.alt} width={640} height={1385} sizes="210px" className="h-auto w-full" />
          </div>
        );
      })}
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-card px-3 py-2 text-[13px] font-medium text-ink shadow-sm sm:left-6 sm:top-6">
        <Bell className="h-4 w-4 text-ink" strokeWidth={2} />
        Built by Tapmerce: the {flagship.name} app
      </div>
    </div>
  );
}

function MarketplacePreview() {
  return (
    <div className="rounded-[22px] bg-stone p-5 sm:p-7">
      <div className="space-y-3">
        <Bubble from="user">Unflavoured plant protein without stevia, under €40</Bubble>
        <Bubble from="ai">Three stores sell one that matches. The best rated:</Bubble>
        {[
          { store: "Your store", name: "Pea & Rice Protein, Unflavoured", price: "€34.90", you: true },
          { store: "Another store", name: "Organic Pea Protein 1 kg", price: "€38.50", you: false },
        ].map((r) => (
          <div
            key={r.name}
            className={`flex items-center gap-3 rounded-[14px] bg-card p-3 ${r.you ? "ring-2 ring-ink" : ""}`}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-stone">
              <Pill className="h-5 w-5 text-ink-2" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[12px] text-ink-3">{r.store}</div>
              <div className="truncate text-[14px] font-semibold text-ink">{r.name}</div>
            </div>
            <div className="text-[14px] font-semibold tabular-nums text-ink">{r.price}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-[13px] text-ink-2">
        UCP support is in development.{" "}
        <Link href="/blog" className="font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
          Read about agentic commerce
        </Link>
      </p>
    </div>
  );
}

// ---------- Page ----------

export default function HomePage() {
  return (
    <div className="home-world overflow-x-clip bg-stone text-ink">
      <JsonLd data={buildFaqSchema(faqs)} />
      <SectionDock />

      {/* ===== HERO + LIVE DEMO ===== */}
      <section className="relative isolate">
        <HeroField className="absolute inset-0 -z-10 h-full w-full" />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(ellipse_70%_52%_at_50%_40%,rgba(239,234,228,0.94)_0%,rgba(239,234,228,0.78)_45%,rgba(239,234,228,0)_100%)]"
          aria-hidden
        />
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 text-center sm:px-6 sm:pt-14 lg:px-8 lg:pb-28">
          <Reveal>
            <h1 className="display mx-auto max-w-5xl text-[3.1rem] font-extrabold leading-[0.95] tracking-[-0.035em] text-ink sm:text-7xl lg:text-[5.25rem]">
              AI shopping for nutrition brands
            </h1>
            <p className="mx-auto mt-5 max-w-[40rem] text-[17px] leading-relaxed sm:text-[19px] text-ink-2">
              A branded AI assistant for your online store and your own app that answers supplement, formula and food questions.
            </p>
            <div id="hero-cta" className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <a
                href="#demo"
                className="group inline-flex items-center gap-2 rounded-full bg-action px-8 py-4 text-[17px] font-semibold text-ink shadow-[0_16px_30px_-14px_rgba(240,74,16,0.9)] transition-all duration-200 hover:bg-action-press active:scale-[0.98]"
              >
                Book a demo
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </a>
              <a
                href="#case-study"
                className="text-[17px] font-medium text-ink underline decoration-ink/25 decoration-2 underline-offset-[6px] transition-colors hover:decoration-ink"
              >
                See what we built for {flagship.name}
              </a>
            </div>
          </Reveal>

          <div id="try" className="mx-auto mt-10 max-w-3xl scroll-mt-28 sm:mt-12">
            <Reveal delay={0.15}>
              <AssistantDemo />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== PROOF ===== */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 rounded-[28px] bg-card/70 px-6 py-4 text-center backdrop-blur sm:flex-row sm:justify-between sm:rounded-full sm:text-left">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-1.5 ring-1 ring-line">
              <Image src={flagship.logo} alt={`${flagship.name} logo`} width={34} height={34} className="object-contain" />
            </div>
            <p className="text-[15px] text-ink-2">
              We built <span className="font-semibold text-ink">{flagship.name}</span> its AI shopping assistant and its
              own app.
            </p>
          </div>
          <StoreBadges appStoreUrl={flagship.appStore.url} playStoreUrl={flagship.googlePlay.url} size="sm" />
        </div>
      </section>

      {/* ===== THE QUESTIONS ===== */}
      <section className="py-16 sm:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-20 lg:px-8">
          <Reveal className="order-2 lg:order-1">
            <div className={`overflow-hidden rounded-[28px] ${cardShadow}`}>
              <Image
                src="/home/kitchen.webp"
                alt="A woman in her kitchen reading a supplement bottle and asking a question on her phone"
                width={1600}
                height={1067}
                sizes="(min-width: 1024px) 620px, 100vw"
                className="aspect-[5/4] h-auto w-full object-cover object-[60%_center]"
              />
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <h2 className={h2}>Nutrition shoppers ask before they buy</h2>
            <p className="mt-6 max-w-[32rem] text-[17px] leading-relaxed sm:text-[19px] text-ink-2">
              What&apos;s in it, does it suit my diet, is it right for my baby. Product pages answer some of it. Your
              support inbox answers the rest, hours later, after the shopper has gone.
            </p>
            <p className="mt-4 max-w-[32rem] text-[17px] leading-relaxed sm:text-[19px] text-ink-2">
              Your assistant answers while they&apos;re still on the page, and puts the right product in their cart.
            </p>
          </Reveal>
        </div>
        <div className="mt-12 space-y-3 sm:mt-20" aria-label="Questions nutrition shoppers ask">
          <QuestionRow items={questions.slice(0, 6)} />
          <QuestionRow items={questions.slice(6)} reverse />
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="scroll-mt-24 px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-8 max-w-3xl sm:mb-12">
            <h2 className={h2}>One AI shopping assistant, on your website and in your app</h2>
            <p className="mt-6 max-w-[36rem] text-[17px] leading-relaxed sm:text-[19px] text-ink-2">
              Start with the assistant on your online store. Add a branded app for repeat buyers and a listing where
              shoppers ask AI what to buy. Trained once, the same everywhere.
            </p>
          </Reveal>
          <Reveal>
            <ServicesSwitcher
              services={services}
              visuals={{ website: <FinderPreview />, app: <AppPreview />, marketplace: <MarketplacePreview /> }}
            />
          </Reveal>
        </div>
      </section>

      {/* ===== YOUR BRAND EVERYWHERE ===== */}
      <section className="pb-16 sm:pb-32">
        <Reveal className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={`${h2} max-w-3xl`}>Every piece ships in your brand</h2>
          <p className="mt-6 max-w-[38rem] text-[17px] leading-relaxed sm:text-[19px] text-ink-2">
            The assistant on your website, the app on your shoppers&apos; phones and your marketplace store page all carry
            your logo, colors, fonts and tone of voice. On your site and in your app, shoppers only ever see you.
          </p>
        </Reveal>

        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:scroll-px-6 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-8 lg:pb-10 [&::-webkit-scrollbar]:hidden">
          {Object.values(SAMPLE_BRANDS).map((b, i) => (
            <article
              key={b.id}
              className={`flex min-h-[470px] w-[78vw] max-w-[320px] shrink-0 snap-start flex-col rounded-[28px] p-6 text-white lg:w-auto lg:max-w-none ${
                i % 2 === 1 ? "lg:translate-y-10" : ""
              }`}
              style={{ background: b.color, ["--brand-cut" as string]: b.color } as React.CSSProperties}
            >
              <div className="flex items-start justify-between gap-3">
                <BrandLogo id={b.id} color="#ffffff" size={24} />
                <span className="pt-1 text-[12px] font-medium text-white/75">{b.category}</span>
              </div>

              <div className="mt-8 flex items-end justify-between">
                <span
                  className="text-[72px] leading-[0.85] text-white"
                  style={{ fontFamily: b.font.family, fontWeight: b.font.weight, fontStyle: b.font.style, fontVariationSettings: b.font.settings }}
                >
                  Aa
                </span>
                <div className="flex -space-x-2 pb-1">
                  {b.palette.map((c) => (
                    <span key={c} className="h-7 w-7 rounded-full ring-2 ring-white/90" style={{ background: c }} />
                  ))}
                </div>
              </div>
              <div className="mt-2 text-[12px] text-white/70">{b.font.label}</div>

              <div className="mt-auto space-y-2.5 pt-8" style={{ ["--brand-cut" as string]: "#ffffff" } as React.CSSProperties}>
                <p className="rounded-[18px] rounded-bl-md bg-white px-3.5 py-3 text-[14px] leading-snug text-ink">
                  <span
                    className="mb-1 flex items-center gap-1.5 text-[12px] font-semibold"
                    style={{ color: b.color, fontFamily: b.font.family, fontStyle: b.font.style, fontVariationSettings: b.font.settings }}
                  >
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                    {b.ask}
                  </span>
                  {b.answer}
                </p>
                <div className="flex items-center gap-2.5 rounded-full bg-white/95 py-1.5 pl-1.5 pr-1.5">
                  <Image src={b.product.img} alt="" width={80} height={80} className="h-9 w-9 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[12px] font-semibold text-ink">{b.product.name}</div>
                    <div className="text-[12px] tabular-nums text-ink-2">{b.product.price}</div>
                  </div>
                  <span className="shrink-0 rounded-full px-3 py-2 text-[11px] font-semibold text-white" style={{ background: b.color }}>
                    Add to cart
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-7xl px-4 text-[13px] text-ink-2 sm:px-6 lg:mt-8 lg:px-8">
          Sample brands designed to show the range. Yours ships with your own logo, colors, fonts and voice.
        </p>
      </section>

      {/* ===== LIFESTYLES ===== */}
      <section id="lifestyles" className="scroll-mt-24 pb-16 sm:pb-32">
        <Reveal className="mx-auto mb-4 max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className={`${h2} max-w-3xl`}>A nutrition app and AI assistant for every shopper</h2>
          <p className="mt-6 max-w-[38rem] text-[17px] leading-relaxed sm:text-[19px] text-ink-2">
            Lifters, new parents, women planning a pregnancy, families cooking from scratch. Each asks different
            questions, and each brand gets an assistant and an app in its own identity.
          </p>
        </Reveal>
        <Lifestyles />
      </section>

      {/* ===== SAFETY ===== */}
      <section id="safety" className="scroll-mt-24 px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div className={`mx-auto grid max-w-7xl gap-12 rounded-[28px] bg-card p-6 sm:p-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:p-16 ${cardShadow}`}>
          <Reveal>
            <h2 className={h2}>An ecommerce AI chatbot that stays within your approved claims</h2>
            <p className="mt-6 max-w-[32rem] text-[17px] leading-relaxed sm:text-[19px] text-ink-2">
              A generic chatbot will happily tell a shopper a product treats anxiety. Yours describes products the way
              your brand and its regulators expect.
            </p>
            <div className="mt-10 max-w-md space-y-3 rounded-[22px] bg-stone p-5">
              <Bubble from="user">Will this cure my anxiety?</Bubble>
              <Bubble from="ai">
                I can&apos;t say it treats any condition. I can tell you what&apos;s in it and how customers use it in
                their evening routine. For anxiety, a doctor or pharmacist is the right person to ask.
              </Bubble>
            </div>
          </Reveal>
          <ul className="divide-y divide-line self-center">
            {guardrails.map((g) => (
              <li key={g.title} className="flex gap-5 py-7 first:pt-0 last:pb-0">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-stone">
                  <g.icon className="h-6 w-6 text-ink" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-[19px] font-semibold text-ink">{g.title}</h3>
                  <p className="mt-1.5 text-[16px] leading-relaxed text-ink-2">{g.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== CASE STUDY ===== */}
      <section id="case-study" className="scroll-mt-24 px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 [&>*]:min-w-0">
          <Reveal className="self-center">
            <h2 className={h2}>We built {flagship.name}&apos;s AI assistant and its app</h2>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed sm:text-[19px] text-ink-2">
              {`${flagship.name} ships HiPP, Holle, Kendamil and other European organic baby formulas to parents worldwide. We built both: Organic's Best AI on their website, and their iOS and Android app with the same assistant inside. It answers from doctor-reviewed guides and live store data, and tells parents to check with their pediatrician on medical questions.`}
            </p>

            <div className="mt-8">
              <p className="text-[14px] font-medium text-ink-2">Parents start with</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {flagship.aiPrompts.map((q) => (
                  <li key={q}>
                    <a
                      href={flagship.aiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border border-line bg-card px-4 py-2 text-[15px] text-ink transition-colors hover:border-ink/30 hover:bg-white"
                    >
                      {q}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {flagship.results.length > 0 && (
              <dl className="mt-10 grid grid-cols-2 gap-6">
                {flagship.results.map((r) => (
                  <div key={r.label}>
                    <dt className="text-[15px] text-ink-2">{r.label}</dt>
                    <dd className="display text-5xl font-bold tracking-[-0.03em] tabular-nums text-ink">{r.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {[
                { icon: MessageCircle, text: "Organic's Best AI, built for organicsbestshop.com" },
                { icon: Repeat, text: "Their own app, with subscriptions and buy again" },
                { icon: Headset, text: "Hand-off to the human team in the same chat" },
                { icon: Baby, text: "Formula, feeding and order questions answered" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-[16px] text-ink">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ink-2" strokeWidth={1.75} />
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <StoreBadges appStoreUrl={flagship.appStore.url} playStoreUrl={flagship.googlePlay.url} />
              <a
                href={flagship.aiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[16px] font-medium text-ink underline decoration-ink/25 decoration-2 underline-offset-[6px] transition-colors hover:decoration-ink"
              >
                Try the assistant on their site <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden rounded-[28px] bg-stone-deep px-6 py-12 sm:min-h-[560px]">
              <div className="absolute left-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white p-1.5 shadow-sm">
                <Image src={flagship.logo} alt={`${flagship.name} logo`} width={36} height={36} className="object-contain" />
              </div>
              {["ai-chat", "home", "cart"].map((key, i) => {
                const s = shot(key);
                const pose = ["-rotate-[7deg] translate-x-[18%] translate-y-4", "z-10 -translate-y-3", "rotate-[7deg] -translate-x-[18%] translate-y-4"][i];
                return (
                  <figure key={key} className={`w-[36%] max-w-[210px] transition-transform duration-500 hover:-translate-y-6 ${pose}`}>
                    <div className="overflow-hidden rounded-[26px] border-[6px] border-ink bg-ink shadow-[0_40px_60px_-30px_rgba(29,29,31,0.7)]">
                      <Image src={s.src} alt={s.alt} width={640} height={1385} sizes="(min-width: 1024px) 210px, 36vw" className="h-auto w-full" />
                    </div>
                    <figcaption className="sr-only">{s.caption}</figcaption>
                  </figure>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <h2 className={h2}>From kickoff to live in three weeks</h2>
            <p className="mt-6 max-w-[36rem] text-[17px] leading-relaxed sm:text-[19px] text-ink-2">
              Your app is submitted to both stores within 21 days of kickoff, {site.guarantee.remedy}.
            </p>
          </Reveal>
          <ol className={`mt-12 grid overflow-hidden rounded-[28px] bg-card sm:grid-cols-2 lg:grid-cols-4 ${cardShadow}`}>
            {steps.map((step) => (
              <li
                key={step.when}
                className="border-line p-6 sm:p-8 [&:not(:first-child)]:border-t sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(even)]:border-l lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-t-0"
              >
                <div className="display text-[1.6rem] font-bold tracking-[-0.03em] text-ink sm:text-[2rem]">{step.when}</div>
                <h3 className="mt-4 text-[19px] font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-3xl text-[13px] leading-relaxed text-ink-2">{site.guarantee.conditions}</p>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="pricing" className="scroll-mt-24 px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div className={`mx-auto grid max-w-7xl overflow-hidden rounded-[28px] bg-card lg:grid-cols-[1.2fr_1fr] ${cardShadow}`}>
          <Reveal className="p-6 sm:p-12 lg:p-16">
            <h2 className={h2}>Simple pricing, no commission</h2>
            <p className="mt-5 max-w-[30rem] text-[17px] leading-relaxed sm:text-[19px] text-ink-2">
              The website assistant is priced by the number of shopper conversations each month.
            </p>
            <div className="mt-10">
              <PlanPicker plans={plans} initial={aiPlans.find((p) => p.highlighted)?.id ?? plans[0].id} />
            </div>
          </Reveal>
          <div className="flex flex-col justify-between gap-10 bg-stone-deep/60 p-6 sm:p-12 lg:p-16">
            <div>
              <h3 className="text-[19px] font-semibold text-ink">Add your own app</h3>
              <div className="mt-4 flex items-end gap-2">
                <span className="display text-5xl font-bold tracking-[-0.035em] tabular-nums text-ink sm:text-6xl">{appSetupPrice}</span>
                <span className="pb-2 text-[17px] text-ink-2">one-time</span>
              </div>
              <p className="mt-2 text-[16px] text-ink-2">
                iOS and Android in your brand, AI built in. Then {formatEur(app.monthlyEur)} a month for hosting, push and updates.
              </p>
            </div>
            <ul className="space-y-3 text-[16px] text-ink">
              <li>No success fees or commission on your sales</li>
              <li>AI marketplace listing included with every plan</li>
              <li>Live in three weeks or the build fee back</li>
            </ul>
            <Link
              href="/pricing"
              className="inline-flex w-fit items-center gap-1.5 text-[16px] font-semibold text-ink underline decoration-ink/25 decoration-2 underline-offset-[6px] hover:decoration-ink"
            >
              See full pricing <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <h2 className={h2}>Questions from nutrition brands</h2>
          </Reveal>
          <div className="mt-8 columns-1 gap-5 sm:mt-12 md:columns-2">
            {faqs.map((f) => (
              <div key={f.q} className="mb-4 break-inside-avoid rounded-[24px] bg-card p-6 sm:mb-5 sm:p-8">
                <h3 className="text-[17px] font-semibold leading-snug text-ink sm:text-[19px]">{f.q}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-2">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOOK A DEMO ===== */}
      <section id="demo" className="scroll-mt-24 px-4 pb-28 sm:px-6 sm:pb-36 lg:px-8">
        <div className={`relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#d9d2c8] ${cardShadow}`}>
          <Image
            src="/home/capsules.webp"
            alt=""
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-[#e9e3dc]/90 lg:bg-transparent lg:bg-gradient-to-r lg:from-[#e9e3dc] lg:via-[#e9e3dc]/70 lg:to-transparent" />
          <div className="relative max-w-2xl p-6 py-14 sm:p-14 lg:p-20">
            <h2 className={h2}>See the assistant answer your customers</h2>
            <p className="mt-5 max-w-[32rem] text-[17px] leading-relaxed sm:text-[19px] text-ink-2">
              Send us your store. We&apos;ll set the assistant up on a sample of your catalog and show you how it answers
              the questions your support team gets every day. The founder replies personally.
            </p>
            <div className="mt-9">
              <DemoRequestForm />
            </div>
            <p className="mt-5 text-[14px] text-ink-2">
              Prefer email?{" "}
              <a href={`mailto:${site.contact.email}`} className="font-medium text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
                {site.contact.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
