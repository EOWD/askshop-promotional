import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  BookOpen,
  Database,
  FileCheck2,
  Fingerprint,
  Headset,
  MessageCircle,
  Palette,
  Percent,
  Repeat,
  ShoppingBag,
  Star,
  Stethoscope,
  Store,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { JsonLd, buildBreadcrumbSchema } from "@/components/StructuredData";
import { Reveal } from "@/components/home/Reveal";
import { site } from "@/lib/site";
import { aiPlanFrom, appFrom, appSetupPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "AI Shopping Assistant and App Features for Nutrition Brands",
  description:
    "An AI shopping assistant for your store, a branded iOS and Android app with AI built in, and an AI marketplace listing. Built for nutrition brands.",
};

const flagship = site.customers[0];
const shot = (key: string) => flagship.screenshots.find((s) => s.src.includes(key))!;

const h2 = "display text-[2.3rem] font-bold leading-[1.04] tracking-[-0.022em] text-ink sm:text-5xl lg:text-6xl";
const lead = "text-[17px] leading-relaxed text-ink-2 sm:text-[19px]";
const cardShadow = "shadow-[0_30px_60px_-45px_rgba(60,40,20,0.5)]";

const jump = [
  { id: "ai-chat", label: "AI shopping assistant" },
  { id: "safety", label: "Safe answers" },
  { id: "mobile-app", label: "Branded app" },
  { id: "marketplace", label: "AI marketplace" },
  { id: "branding", label: "Your brand" },
  { id: "admin", label: "Admin" },
];

const assistant = [
  { title: "Answers from your store's data", body: "Your live catalog, product details such as ingredients and allergens, shipping and return policies, FAQs and articles. It never invents a product you don't sell." },
  { title: "Product cards and add to cart", body: "Recommendations appear as cards with live prices. Shoppers add to their real cart from the conversation, Subscribe & Save included." },
  { title: "Guided product finders", body: "Step-by-step questions that narrow by goal, diet, allergens or age, the way a good shop assistant would." },
  { title: "Order tracking in the chat", body: "\"Where is my delivery?\" answered from the customer's real orders, with an estimate for the next one." },
  { title: "Remembers each customer", body: "Needs and preferences are remembered across visits with the shopper's consent, so nobody repeats themselves." },
  { title: "Hand-off to your team", body: "When a person is needed, the conversation moves to your support team in the same chat, history attached." },
];

const guardrails = [
  { icon: FileCheck2, title: "Your approved claims only", body: "It uses the wording your brand already uses and never promises to treat, cure or prevent anything." },
  { icon: Stethoscope, title: "Medical questions go to a professional", body: "Pregnancy, medication, children's health and symptoms get a careful answer and a pointer to a doctor, pharmacist or pediatrician." },
  { icon: Database, title: "Answers come from your data", body: "When your catalog and policies don't have the answer, it says so instead of guessing." },
  { icon: Fingerprint, title: "Privacy by design", body: "A clear consent screen before the first message, no training on customer conversations, and deletion on request." },
];

type AppFeature = { id: string; icon: LucideIcon; title: string; points: string[] };

const appFeatures: AppFeature[] = [
  {
    id: "subscriptions",
    icon: Repeat,
    title: "Subscribe & Save subscriptions",
    points: [
      "Your subscription plans in the buy box, with frequencies and per-variant pricing",
      "Subscription lines badged in the cart with their frequency and saving",
      "Customers reach their subscription portal from the account tab",
    ],
  },
  {
    id: "push",
    icon: Bell,
    title: "Push notifications",
    points: [
      "Order confirmations and shipping milestones, sent to the customer they concern",
      "Sale broadcasts to every app customer from your admin",
      "A push when your support team replies, opening the right screen",
    ],
  },
  {
    id: "discount",
    icon: Percent,
    title: "An app-only discount",
    points: [
      "Applied automatically at checkout to app orders and nowhere else",
      "No codes to leak to the web; you set the percentage and the rules",
    ],
  },
  {
    id: "reviews",
    icon: Star,
    title: "Reviews with photos",
    points: [
      "Ratings on product cards and a full review section on the product page",
      "Customers write reviews with photos from their phone, moderated before they publish",
    ],
  },
  {
    id: "support",
    icon: Headset,
    title: "Live chat with your team",
    points: [
      "Connected to your helpdesk, so your team answers from the tools they use",
      "Business hours shown honestly, with click-to-call",
    ],
  },
  {
    id: "content",
    icon: BookOpen,
    title: "Articles and expert guides",
    points: [
      "Your blog as native screens with categories and a table of contents",
      "Expert and reviewer profiles, FAQs and product videos next to the buy button",
    ],
  },
];

function Phone({ src, alt, className = "", sizes }: { src: string; alt: string; className?: string; sizes: string }) {
  return (
    <div className={`overflow-hidden rounded-[30px] border-[6px] border-ink bg-ink shadow-[0_40px_60px_-30px_rgba(29,29,31,0.7)] ${className}`}>
      <Image src={src} alt={alt} width={640} height={1385} sizes={sizes} className="h-auto w-full" />
    </div>
  );
}

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-stone">
      <Icon className="h-6 w-6 text-ink" strokeWidth={1.75} />
    </span>
  );
}

export default function FeaturesPage() {
  const chat = shot("ai-chat");
  const home = shot("home");
  const cart = shot("cart");
  const order = shot("order");

  return (
    <div className="home-world overflow-x-clip bg-stone text-ink">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Features", url: `${site.url}/features` },
        ])}
      />

      {/* ===== HERO ===== */}
      <section className="px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <h1 className="display text-[2.8rem] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              Features for AI shopping, on your site and in your app
            </h1>
            <p className={`mt-6 max-w-[40rem] ${lead}`}>
              An AI shopping assistant for your website, your own iOS and Android app with the same assistant inside,
              and a listing in the Tapmerce AI marketplace. Built for nutrition brands on Shopify and other ecommerce
              platforms, and all of it in your brand.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href="/#demo"
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-action px-7 text-[17px] font-semibold text-ink shadow-[0_16px_30px_-14px_rgba(240,74,16,0.9)] transition-all duration-200 hover:bg-action-press active:scale-[0.98]"
              >
                Book a demo <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
              </Link>
              <Link
                href="/pricing"
                className="text-[16px] font-medium text-ink underline decoration-ink/25 decoration-2 underline-offset-[6px] transition-colors hover:decoration-ink"
              >
                See pricing
              </Link>
            </div>
          </div>

          <nav aria-label="Feature sections" className="mt-12">
            <ul className="flex flex-wrap gap-2">
              {jump.map((j) => (
                <li key={j.id}>
                  <a
                    href={`#${j.id}`}
                    className="inline-flex min-h-10 items-center rounded-full border border-line bg-card px-4 text-[14px] font-medium text-ink transition-colors hover:border-ink/30 hover:bg-white"
                  >
                    {j.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* ===== AI SHOPPING ASSISTANT ===== */}
      <section id="ai-chat" className="scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className={`mx-auto grid max-w-7xl gap-12 rounded-[28px] bg-card p-6 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:p-16 [&>*]:min-w-0 ${cardShadow}`}>
          <Reveal>
            <h2 className={h2}>An AI shopping assistant for your online store</h2>
            <p className={`mt-6 max-w-[36rem] ${lead}`}>
              An AI chatbot for ecommerce that works like your best shop assistant. It answers detailed questions about
              ingredients, dosage, stages and shipping, recommends only what you sell and adds it to the cart. It runs
              as a Shopify chatbot or on your other ecommerce platform, and you can use it on its own, without the app.
            </p>
            <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {assistant.map((f) => (
                <li key={f.title}>
                  <h3 className="text-[18px] font-semibold leading-snug text-ink">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="flex items-center justify-center rounded-[22px] bg-stone px-6 py-10 sm:py-12">
            <figure className="w-[62%] max-w-[260px]">
              <Phone src={chat.src} alt={chat.alt} sizes="(min-width: 1024px) 260px, 62vw" />
              <figcaption className="mt-4 text-center text-[13px] text-ink-2">
                Ask AI in the {flagship.name} app, which we built
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ===== SAFETY ===== */}
      <section id="safety" className="scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <h2 className={h2}>Careful answers for supplements, formula and food</h2>
            <p className={`mt-6 max-w-[38rem] ${lead}`}>
              Nutrition shoppers ask about pregnancy, children and medication. The assistant knows where its job ends.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {guardrails.map((g) => (
              <li key={g.title} className="rounded-[24px] bg-card p-6 sm:p-7">
                <IconTile icon={g.icon} />
                <h3 className="mt-5 text-[18px] font-semibold leading-snug">{g.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{g.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== BRANDED APP ===== */}
      <section id="mobile-app" className="scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 [&>*]:min-w-0">
            <Reveal className="self-center">
              <h2 className={h2}>Your own ecommerce mobile app, AI built in</h2>
              <p className={`mt-6 max-w-[36rem] ${lead}`}>
                Native iOS and Android apps in your brand, published under your own App Store and Google Play accounts.
                The assistant lives in its own Ask AI tab, and the reorder is one tap away for products that run out
                every few weeks. No mobile app builder to learn: we build it, submit it and keep it updated.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { icon: MessageCircle, text: "Ask AI tab: the same assistant as your website" },
                  { icon: ShoppingBag, text: "Native checkout with Apple Pay, Google Pay and Shop Pay" },
                  { icon: Fingerprint, text: "Passwordless sign-in, guest mode and in-app account deletion" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3 text-[16px] text-ink">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-ink-2" strokeWidth={1.75} />
                    {text}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[28px] bg-stone-deep px-6 py-12 sm:min-h-[520px]">
                {[home, cart].map((s, i) => (
                  <figure key={s.src} className={`w-[40%] max-w-[220px] ${i === 0 ? "-rotate-[5deg] translate-x-[6%]" : "z-10 rotate-[5deg] -translate-x-[6%] translate-y-6"}`}>
                    <Phone src={s.src} alt={s.alt} sizes="(min-width: 1024px) 220px, 40vw" />
                    <figcaption className="sr-only">{s.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Order tracking: the feature with its own screen */}
          <Reveal className="mt-5">
            <div id="orders" className={`grid scroll-mt-28 gap-8 overflow-hidden rounded-[28px] bg-card p-6 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16 lg:p-16 [&>*]:min-w-0 ${cardShadow}`}>
              <div>
                <IconTile icon={Truck} />
                <h3 className="display mt-6 text-[1.9rem] font-bold leading-[1.06] tracking-[-0.018em] sm:text-[2.6rem]">
                  Order tracking and one-tap reorders
                </h3>
                <p className="mt-4 max-w-[34rem] text-[16px] leading-relaxed text-ink-2 sm:text-[17px]">
                  The questions that fill your inbox, answered in the app before they&apos;re asked.
                </p>
                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {[
                    "Ordered, shipped, in transit, delivered, per package",
                    "Order history with items, prices and status",
                    "Buy again from past purchases on the home screen",
                    "Product guides attached to the order",
                  ].map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-ink">
                      <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[13px] text-ink-2">Carrier integrations are added per store.</p>
              </div>
              <div className="flex justify-center rounded-[22px] bg-stone px-6 pt-10">
                <div className="w-[60%] max-w-[230px] translate-y-6">
                  <Phone src={order.src} alt={order.alt} sizes="(min-width: 1024px) 230px, 60vw" />
                </div>
              </div>
            </div>
          </Reveal>

          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {appFeatures.map((f) => (
              <li key={f.id} id={f.id} className="scroll-mt-28 rounded-[24px] bg-card p-6 sm:p-7">
                <IconTile icon={f.icon} />
                <h3 className="mt-5 text-[19px] font-semibold leading-snug">{f.title}</h3>
                <ul className="mt-3 space-y-2">
                  {f.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                      <span aria-hidden className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink-3" />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== MARKETPLACE ===== */}
      <section id="marketplace" className="scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 [&>*]:min-w-0">
          <Reveal>
            <h2 className={h2}>Found by AI shopping agents</h2>
            <p className={`mt-6 max-w-[34rem] ${lead}`}>
              More shoppers ask an AI what to buy. The Tapmerce marketplace app lists your store for shoppers who
              describe what they need, and it&apos;s included with every plan.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-3">
              {[
                { icon: Store, title: "A branded store page", body: "Your logo, products and story inside the Tapmerce AI marketplace." },
                { icon: Database, title: "A catalog AI agents can read", body: "Your products structured for AI shopping agents. Universal Commerce Protocol support is in development." },
                { icon: ShoppingBag, title: "Checkout stays on your store", body: "You stay the merchant of record, with 0% commission on marketplace orders." },
              ].map(({ icon, title, body }) => (
                <li key={title} className="flex gap-5 rounded-[22px] bg-card p-5 sm:p-6">
                  <IconTile icon={icon} />
                  <div>
                    <h3 className="text-[18px] font-semibold leading-snug">{title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ===== BRANDING ===== */}
      <section id="branding" className="scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className={`mx-auto max-w-7xl rounded-[28px] bg-card p-6 sm:p-12 lg:p-16 ${cardShadow}`}>
          <Reveal className="max-w-3xl">
            <h2 className={h2}>Everything ships in your brand</h2>
            <p className={`mt-6 max-w-[38rem] ${lead}`}>
              Shoppers talk to your brand, not to us. The website assistant and the app are fully white-label.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Palette, title: "Logo, colors and fonts", body: "The assistant widget and every app screen use your identity." },
              { icon: MessageCircle, title: "Your tone of voice", body: "Caring, expert, playful or premium, written for your store with clear boundaries." },
              { icon: Fingerprint, title: "Your store listings", body: "Your app name, icon and splash screen, under your own App Store and Google Play accounts." },
              { icon: Store, title: "Your marketplace page", body: "In the Tapmerce marketplace app, your products sit on a page in your brand." },
            ].map(({ icon, title, body }) => (
              <li key={title} className="rounded-[22px] bg-stone p-5 sm:p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-card">
                  {(() => {
                    const Icon = icon;
                    return <Icon className="h-5 w-5 text-ink" strokeWidth={1.75} />;
                  })()}
                </span>
                <h3 className="mt-4 text-[17px] font-semibold leading-snug">{title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== ADMIN ===== */}
      <section id="admin" className="scroll-mt-28 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <h2 className={h2}>Run it from your admin</h2>
            <p className={`mt-6 max-w-[38rem] ${lead}`}>
              On Shopify, Tapmerce is an embedded app in your Shopify admin. No new logins and no separate dashboard.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[28px] bg-line sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Mobile content", body: "Home-screen banners, popups and announcement bars, live in the app when you save." },
              { title: "Send a notification", body: "Write a sale broadcast and send it to every app customer." },
              { title: "Analytics", body: "Mobile sales and share of revenue, iOS versus Android, AI-assisted revenue and push device counts." },
              { title: "Customers and demand", body: "Shopper profiles with needs and interests, and the products customers asked for that you don't stock yet." },
              { title: "Mobile discounts", body: "Create, adjust, activate or pause the app-only discount." },
              { title: "Chat quality", body: "Flag and review assistant answers to keep quality high." },
            ].map((f) => (
              <li key={f.title} className="bg-card p-6 sm:p-8">
                <h3 className="text-[18px] font-semibold">{f.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== PRICING STRIP ===== */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <h2 className={h2}>Simple pricing, no commission</h2>
          </Reveal>
          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "AI shopping assistant", value: aiPlanFrom, note: "Priced by shopper conversations" },
              { label: "Branded iOS and Android app", value: appSetupPrice, note: `One-time build, then ${appFrom.replace("+", "")} for hosting, push and updates` },
              { label: "AI marketplace listing", value: "Included", note: "With every plan" },
              { label: "Commission on your sales", value: "0%", note: "Website, app and marketplace" },
            ].map((p) => (
              <div key={p.label} className="rounded-[24px] bg-card p-6">
                <dt className="text-[15px] font-semibold text-ink">{p.label}</dt>
                <dd className="display mt-4 text-[2rem] font-bold leading-tight tracking-[-0.02em] tabular-nums">{p.value}</dd>
                <dd className="mt-1 text-[14px] text-ink-2">{p.note}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/pricing"
            className="mt-6 inline-flex items-center gap-1 text-[16px] font-medium text-ink underline decoration-ink/25 decoration-2 underline-offset-[6px] transition-colors hover:decoration-ink"
          >
            See plans and what&apos;s included <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-32 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[32px] bg-ink p-8 text-card sm:p-14 lg:flex-row lg:items-center">
          <div>
            <h2 className="display text-[2.2rem] font-bold leading-[1.04] tracking-[-0.022em] sm:text-5xl">See it on your own products</h2>
            <p className="mt-3 max-w-xl text-[17px] text-card/75">
              Book a demo and we&apos;ll show you the assistant answering your shoppers&apos; questions. {site.guarantee.short}.
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
