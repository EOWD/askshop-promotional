import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Database, HeartHandshake, Repeat, Search, ShieldCheck, Smartphone } from "lucide-react";
import { site, mailto, founderInitials } from "@/lib/site";
import { JsonLd, buildBreadcrumbSchema } from "@/components/StructuredData";
import { Reveal } from "@/components/home/Reveal";
import { StoreBadges } from "@/components/StoreBadges";

export const metadata: Metadata = {
  title: "About Tapmerce: AI Shopping for Nutrition Brands",
  description:
    "Tapmerce is a founder-led company building AI shopping assistants and branded apps for nutrition brands. We built Organic's Best's assistant and app.",
};

const flagship = site.customers[0];
const shot = (key: string) => flagship.screenshots.find((s) => s.src.includes(key))!;

const h2 = "display text-[2.3rem] font-bold leading-[1.04] tracking-[-0.022em] text-ink sm:text-5xl lg:text-6xl";
const lead = "text-[17px] leading-relaxed text-ink-2 sm:text-[19px]";
const cardShadow = "shadow-[0_30px_60px_-45px_rgba(60,40,20,0.5)]";

const whyNutrition = [
  {
    icon: Search,
    title: "Shoppers ask before they buy",
    body: "Ingredients, diet, allergens, dosage, age or stage, shipping. A product grid can't answer those; a good assistant can.",
  },
  {
    icon: ShieldCheck,
    title: "Claims have to be right",
    body: "Supplements, formula and food sit close to health. The assistant keeps to the brand's approved wording and sends medical questions to a professional.",
  },
  {
    icon: Repeat,
    title: "Customers come back every few weeks",
    body: "Formula, protein and vitamins run out. An app with Subscribe & Save and buy again makes the next order one tap.",
  },
];

const beliefs = [
  { icon: Database, title: "Answers come from the brand's data", body: "Never an invented product, fact or claim. When the data doesn't say, the assistant says so." },
  { icon: ShieldCheck, title: "Safety is part of the product", body: "Approved claims and careful medical hand-offs are shown to shoppers, not hidden." },
  { icon: Smartphone, title: "Website first, app second", body: "The assistant on your site is the place to start. The app earns the repeat orders." },
  { icon: HeartHandshake, title: "Your brand, not ours", body: "Your logo, colors, fonts and voice on every surface. Shoppers talk to you." },
];

const steps = [
  { when: "Week 1", title: "Connect and brief", body: "Connect your store and share your brand, approved claims and your team's most common questions." },
  { when: "Week 2", title: "Train and review", body: "We set up the assistant on your catalog and build your app. You test both before anything goes live." },
  { when: "Week 3", title: "Go live", body: "The assistant goes live on your site and your apps go to the App Store and Google Play." },
];

export default function AboutPage() {
  return (
    <div className="home-world overflow-x-clip bg-stone text-ink">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "About", url: `${site.url}/about` },
        ])}
      />

      {/* ===== HERO ===== */}
      <section className="px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <h1 className="display text-[2.8rem] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              We build AI shopping for nutrition brands
            </h1>
            <p className={`mt-6 max-w-[40rem] ${lead}`}>
              Tapmerce makes AI shopping assistants for brand websites, branded iOS and Android apps with the assistant
              inside, and an AI marketplace. We work with supplement, vitamin, infant formula, sports nutrition and
              healthy food brands on Shopify and other ecommerce platforms.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FOUNDER ===== */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <Reveal className={`mx-auto grid max-w-7xl gap-10 rounded-[28px] bg-card p-6 sm:p-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:p-16 ${cardShadow}`}>
          <div>
            <h2 className={h2}>Founder-led, start to finish</h2>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <span className="display flex h-16 w-16 shrink-0 items-center justify-center rounded-[18px] bg-ink text-[1.5rem] font-bold text-card">
                {founderInitials}
              </span>
              <div>
                <div className="text-[19px] font-semibold">{site.founder.name}</div>
                <div className="text-[15px] text-ink-2">{site.founder.role}</div>
              </div>
            </div>
            <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink-2">
              <p>
                Tapmerce is designed, engineered and run by its founder. The platform grew out of building the{" "}
                {flagship.name} app, now live on the App Store and Google Play. The native apps, the admin and the AI
                assistant are all built in-house.
              </p>
              <p>When you book a demo, you talk to the person who builds the product.</p>
            </div>
            <a
              href={mailto("Hello Tapmerce")}
              className="mt-6 inline-flex items-center gap-1 text-[16px] font-medium text-ink underline decoration-ink/25 decoration-2 underline-offset-[6px] transition-colors hover:decoration-ink"
            >
              {site.contact.email}
            </a>
          </div>
        </Reveal>
      </section>

      {/* ===== WHY NUTRITION ===== */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <h2 className={h2}>Why nutrition</h2>
            <p className={`mt-6 max-w-[38rem] ${lead}`}>
              Nutrition is where a shopping assistant does the most good, and where it has to be the most careful.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-4 sm:mt-12 md:grid-cols-3">
            {whyNutrition.map(({ icon: Icon, title, body }) => (
              <li key={title} className="rounded-[24px] bg-card p-6 sm:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-stone">
                  <Icon className="h-6 w-6 text-ink" strokeWidth={1.75} />
                </span>
                <h3 className="mt-5 text-[19px] font-semibold leading-snug">{title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== ORGANIC'S BEST ===== */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16 [&>*]:min-w-0">
          <Reveal className="self-center">
            <h2 className={h2}>What we built for {flagship.name}</h2>
            <p className={`mt-6 max-w-[34rem] ${lead}`}>
              {flagship.name} ships HiPP, Holle, Kendamil and other European organic baby formulas to parents
              worldwide. We built Organic&apos;s Best AI on their website and their iOS and Android app with the same
              assistant inside. It answers from doctor-reviewed guides and live store data, and tells parents to check
              with their pediatrician on medical questions.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <StoreBadges appStoreUrl={flagship.appStore.url} playStoreUrl={flagship.googlePlay.url} />
              <a
                href={flagship.aiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[16px] font-medium text-ink underline decoration-ink/25 decoration-2 underline-offset-[6px] transition-colors hover:decoration-ink"
              >
                Try Organic&apos;s Best AI <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[28px] bg-stone-deep px-6 py-12 sm:min-h-[520px]">
              <div className="absolute left-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white p-1.5 shadow-sm">
                <Image src={flagship.logo} alt={`${flagship.name} logo`} width={36} height={36} className="object-contain" />
              </div>
              {["ai-chat", "home", "order"].map((key, i) => {
                const s = shot(key);
                const pose = ["-rotate-[7deg] translate-x-[18%] translate-y-4", "z-10 -translate-y-3", "rotate-[7deg] -translate-x-[18%] translate-y-4"][i];
                return (
                  <figure key={key} className={`w-[36%] max-w-[200px] ${pose}`}>
                    <div className="overflow-hidden rounded-[26px] border-[6px] border-ink bg-ink shadow-[0_40px_60px_-30px_rgba(29,29,31,0.7)]">
                      <Image src={s.src} alt={s.alt} width={640} height={1385} sizes="(min-width: 1024px) 200px, 36vw" className="h-auto w-full" />
                    </div>
                    <figcaption className="sr-only">{s.caption}</figcaption>
                  </figure>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== HOW WE WORK ===== */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <h2 className={h2}>How we work</h2>
            <p className={`mt-6 max-w-[38rem] ${lead}`}>
              {site.guarantee.promise}, {site.guarantee.remedy}.
            </p>
          </Reveal>
          <ol className={`mt-10 grid overflow-hidden rounded-[28px] bg-card sm:mt-12 md:grid-cols-3 ${cardShadow}`}>
            {steps.map((step) => (
              <li key={step.when} className="border-line p-6 sm:p-8 [&:not(:first-child)]:border-t md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-t-0">
                <div className="display text-[1.6rem] font-bold tracking-[-0.03em] tabular-nums sm:text-[2rem]">{step.when}</div>
                <h3 className="mt-4 text-[19px] font-semibold">{step.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-3xl text-[13px] leading-relaxed text-ink-2">{site.guarantee.conditions}</p>
        </div>
      </section>

      {/* ===== BELIEFS ===== */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <h2 className={h2}>What we hold to</h2>
          </Reveal>
          <ul className="mt-10 grid gap-x-10 gap-y-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {beliefs.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <Icon className="h-6 w-6 text-ink" strokeWidth={1.75} />
                <h3 className="mt-4 text-[19px] font-semibold leading-snug">{title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-2">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-32 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[32px] bg-ink p-8 text-card sm:p-14 lg:flex-row lg:items-center">
          <div>
            <h2 className="display text-[2.2rem] font-bold leading-[1.04] tracking-[-0.022em] sm:text-5xl">Get in touch</h2>
            <p className="mt-3 max-w-xl text-[17px] text-card/75">
              Questions about Tapmerce? Email{" "}
              <a href={mailto("Hello Tapmerce")} className="font-semibold text-card underline decoration-card/30 underline-offset-4 hover:decoration-card">
                {site.contact.email}
              </a>{" "}
              or book a demo. Tapmerce is operated by {site.legal.operator}, {site.legal.country}.{" "}
              <Link href="/imprint" className="text-card underline decoration-card/30 underline-offset-4 hover:decoration-card">
                Imprint
              </Link>
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
