"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Globe,
  Zap,
  ShoppingCart,
  Bell,
  Palette,
  BarChart3,
  Sparkles,
  ArrowRight,
  Store,
  BrainCircuit,
  Smartphone,
  Shield,
  TrendingUp,
  Network,
  Rocket,
  Heart,
  Eye,
  Repeat,
} from "lucide-react";
import Image from "next/image";
import { site, mailto } from "@/lib/site";
import { FirstCustomer } from "@/components/FirstCustomer";
import { ParticleNetwork } from "@/components/ParticleNetwork";
import { GlobeVisualization } from "@/components/GlobeVisualization";

// --- Animation variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
};

// --- Section wrapper with inView animation ---
function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay } },
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// --- Stats Counter ---
function AnimatedStat({ value, label, sublabel }: { value: string; label: string; sublabel: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      className="text-center group"
    >
      <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent group-hover:from-violet-400 group-hover:to-cyan-400 transition-all duration-500">
        {value}
      </div>
      <div className="mt-2 text-sm font-medium text-white/80">{label}</div>
      <div className="text-xs text-white/40">{sublabel}</div>
    </motion.div>
  );
}

// --- Bento Feature Card ---
function BentoCard({
  icon: Icon,
  title,
  description,
  className = "",
  gradient,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
  gradient: string;
}) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 ${className}`}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${gradient}`} />
      {/* Shine sweep */}
      <div className="absolute top-0 left-[-150%] h-full w-[50%] bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] skew-x-[-25deg] group-hover:left-[125%] transition-all duration-700 ease-in-out" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center mb-4 group-hover:border-indigo-400/40 transition-colors">
          <Icon className="w-6 h-6 text-indigo-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-white/50 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// ==================================================
// MAIN PAGE
// ==================================================
export default function HomePage() {
  // Waitlist: until a form backend exists, submitting opens a pre-filled email to
  // the site contact (src/lib/site.ts) so nothing is silently dropped.
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const submitWaitlist = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = mailto(
      "AskShop waitlist",
      `Please add me to the AskShop waitlist.\n\nEmail: ${waitlistEmail}\nStore: \nWhat I'm looking for: `
    );
  };

  return (
    <div className="bg-[#06050e] text-white overflow-hidden">

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        {/* Particle network background */}
        <div className="absolute inset-0 z-0">
          <ParticleNetwork />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06050e] via-transparent to-[#06050e] z-[1]" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] z-[1]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] z-[1]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Globe — on top for mobile, right side on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="flex items-center justify-center lg:order-2"
            >
              <div className="relative w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[460px] lg:h-[460px]">
                <div className="absolute inset-0 rounded-full border border-indigo-500/10 animate-pulse" />
                <div className="absolute -inset-3 rounded-full border border-violet-500/5" />
                <GlobeVisualization />
              </div>
            </motion.div>

            {/* Copy — below globe on mobile, left side on desktop */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="lg:order-1 text-center lg:text-left"
            >
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-sm mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400" />
                  </span>
                  Mobile AI commerce for Shopify stores
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]"
              >
                <span className="block text-white/70 font-light text-2xl sm:text-3xl lg:text-4xl mb-2">
                  Turn your Shopify store into
                </span>
                <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                  a mobile AI shopping app
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                  className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-transparent rounded-full mt-3"
                />
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-6 text-base sm:text-lg text-white/50 max-w-xl leading-relaxed">
                AskShop is the Shopify mobile app builder with an AI shopping assistant built in: a native app where your customers chat, discover and buy. Built on Shopify and designed for the Universal Commerce Protocol.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <motion.a
                  href="#waitlist"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-7 py-3.5 text-base font-semibold text-white shadow-xl shadow-indigo-500/20 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Rocket className="relative z-10 w-5 h-5" />
                  <span className="relative z-10">Get your mobile AI app</span>
                  <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/features"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-all"
                  >
                    <Sparkles className="w-5 h-5" />
                    See How It Works
                  </Link>
                </motion.div>
              </motion.div>

              <motion.p variants={fadeIn} className="mt-4 text-sm text-white/30">
                First merchant app live on iOS &amp; Android &middot; Plans from $99/mo &middot; No success fees
              </motion.p>
            </motion.div>


          </div>
        </div>
      </section>

      {/* ===== TRUSTED / STATS MARQUEE ===== */}
      <AnimatedSection className="py-20 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <AnimatedStat value="iOS + Android" label="Native Apps" sublabel="one codebase, both stores" />
            <AnimatedStat value="2" label="App Experiences" sublabel="AI chat and classic store" />
            <AnimatedStat value="$0" label="Success Fees" sublabel="no commissions, ever" />
            <AnimatedStat value="$99" label="Starting Price" sublabel="per month, billed via Shopify" />
          </div>
        </div>
      </AnimatedSection>

      {/* ===== OUTCOMES ===== */}
      <AnimatedSection className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold">
              AI ecommerce is here.{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Don&apos;t get left behind.
              </span>
            </h2>
            <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto leading-relaxed">
              Shoppers are moving from browsing to asking — on their phones today, through AI agents
              tomorrow. In times like these businesses evolve, and some fall behind. The stores that
              move now own the customer relationship; the rest keep renting it. AskShop gives you the
              three things that matter in the new age of ecommerce.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Heart,
                title: "Retention",
                desc: "An icon on the home screen, push notifications customers opt into, and an assistant that remembers each of them. Repeat purchases stop depending on paid re-acquisition.",
              },
              {
                icon: Eye,
                title: "AI visibility",
                desc: "When shoppers ask instead of search, your catalog has to be readable by AI. AskShop structures it for the agent in your app — and, through UCP, for the agent surfaces beyond it.",
              },
              {
                icon: Repeat,
                title: "Recurring revenue",
                desc: "Subscriptions, reorder reminders and one-tap buy-again turn one-off orders into predictable monthly revenue — MRR for physical goods.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ===== TWO PRODUCTS ===== */}
      <AnimatedSection className="py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Two mobile shopping experiences.{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                One platform.
              </span>
            </h2>
            <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto">
              Choose the experience that fits your customers — or offer both simultaneously.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* AI Chat App */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-indigo-500/[0.05] to-transparent p-8 sm:p-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] group-hover:bg-indigo-600/20 transition-colors duration-500" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300 uppercase tracking-wider mb-6">
                  <Sparkles className="w-3 h-3" /> NEW &mdash; AI Powered
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">AI Chat App</h3>
                <p className="text-white/50 mb-8 leading-relaxed">
                  A conversational shopping experience. Customers chat with an AI that knows your entire catalog,
                  understands preferences, and guides them to the perfect product.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Natural language product search",
                    "Smart recommendations from your own catalog",
                    "In-chat product cards with add-to-cart",
                    "Conversational checkout",
                    "Remembers preferences between visits",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Chat mockup */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <div className="rounded-2xl rounded-br-sm bg-indigo-600 px-4 py-2.5 text-sm text-white max-w-[80%]">
                        I need a gift for my mom who loves gardening, under $50
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="rounded-2xl rounded-bl-sm bg-white/10 px-4 py-2.5 text-sm text-white/80 max-w-[80%]">
                        Great choice! Here are 3 perfect picks for a gardening enthusiast under $50...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Classic Store App */}
            <motion.div
              variants={scaleIn}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent p-8 sm:p-10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/5 rounded-full blur-[80px] group-hover:bg-cyan-600/10 transition-colors duration-500" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-bold text-white/50 uppercase tracking-wider mb-6">
                  <Store className="w-3 h-3" /> Classic
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Dedicated Store App</h3>
                <p className="text-white/50 mb-8 leading-relaxed">
                  Your brand, your App Store listing. A traditional mobile shopping experience done right —
                  beautiful product grids, smooth navigation, and native checkout.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Customizable home screen sections",
                    "Collection browsing with infinite scroll",
                    "Full product pages with variant selection",
                    "Native cart with discount & gift cards",
                    "Apple Pay / Google Pay / Shop Pay",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                      <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Store mockup */}
                <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4">
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 flex items-center justify-center">
                        <Smartphone className="w-6 h-6 text-white/20" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 h-3 bg-white/5 rounded-full w-2/3" />
                  <div className="mt-2 h-2 bg-white/[0.03] rounded-full w-1/3" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ===== APP EXPERIENCE SHOWCASE ===== */}
      <AnimatedSection className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Your AI shopping assistant{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                in action
              </span>
            </h2>
            <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto">
              Real screens from Organic&apos;s Best, the first AskShop app — live on the App Store and Google Play.
            </p>
          </motion.div>

          {/* Real screens from the first live AskShop app (see site.customers) */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
            {site.customers[0].screenshots.slice(0, 3).map((shot, i) => (
              <motion.figure
                key={shot.src}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                className="flex flex-col items-center"
              >
                <div className="w-[260px] sm:w-[280px] rounded-[2.5rem] border-[3px] border-white/10 overflow-hidden shadow-2xl shadow-indigo-500/10 bg-[#0a0913]">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={640}
                    height={1385}
                    sizes="(min-width: 640px) 280px, 260px"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="mt-5 text-sm font-medium text-white/60 text-center">{shot.caption}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ===== BENTO GRID FEATURES ===== */}
      <AnimatedSection className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Everything a{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Shopify mobile app
              </span>{" "}
              needs
            </h2>
            <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto">
              Built on Shopify&apos;s Storefront API. Products, inventory, and orders stay perfectly in sync.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <BentoCard
              icon={BrainCircuit}
              title="AI Chat Shopping"
              description="Customers chat with an AI assistant to find products, get recommendations, and check out — all in natural conversation."
              gradient="bg-gradient-to-br from-indigo-600/10 to-transparent"
              className="sm:col-span-2 lg:col-span-1 lg:row-span-2"
            />
            <BentoCard
              icon={ShoppingCart}
              title="Native Checkout"
              description="Apple Pay, Google Pay, and Shop Pay through Shopify's Checkout Sheet Kit. Payment stays with Shopify."
              gradient="bg-gradient-to-br from-violet-600/10 to-transparent"
            />
            <BentoCard
              icon={Bell}
              title="Push Notifications"
              description="Order and shipping updates, back-in-stock alerts, and campaigns sent from your Shopify admin."
              gradient="bg-gradient-to-br from-purple-600/10 to-transparent"
            />
            <BentoCard
              icon={Palette}
              title="White-Label Builds"
              description="Your brand, your App Store listing. Custom icon, name, colors, and bundle ID — a fully dedicated app."
              gradient="bg-gradient-to-br from-cyan-600/10 to-transparent"
            />
            <BentoCard
              icon={Zap}
              title="Shopify Native"
              description="Built on Storefront API. Real-time inventory, discount codes, gift cards — everything just works."
              gradient="bg-gradient-to-br from-amber-600/10 to-transparent"
            />
            <BentoCard
              icon={BarChart3}
              title="Analytics Dashboard"
              description="Mobile sales, revenue attribution, and push performance — all inside your Shopify admin."
              gradient="bg-gradient-to-br from-emerald-600/10 to-transparent"
            />
            <BentoCard
              icon={Network}
              title="AI Marketplace"
              description="Multi-store discovery. Shoppers explore every participating store through one AI app — and, through UCP, from other agent surfaces."
              gradient="bg-gradient-to-br from-pink-600/10 to-transparent"
            />
            <BentoCard
              icon={Shield}
              title="Privacy by Design"
              description="Payments and customer accounts stay on Shopify. Data handling built for GDPR, with a DPA available."
              gradient="bg-gradient-to-br from-teal-600/10 to-transparent"
            />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* ===== HOW IT WORKS ===== */}
      <AnimatedSection className="py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold">
              How to turn your Shopify store into a{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                mobile app
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Install", description: "Add AskShop from the Shopify App Store. Connect your Storefront API token.", icon: Zap },
              { step: "02", title: "Customize", description: "Set brand colors, logo, fonts, and home screen. Preview changes in real time.", icon: Palette },
              { step: "03", title: "Submit", description: "Submit your build request. We review, build your dedicated app, and publish.", icon: Globe },
              { step: "04", title: "Grow", description: "Send push campaigns, track analytics, and watch mobile revenue grow.", icon: TrendingUp },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative text-center group"
              >
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-indigo-500/30 to-transparent" />
                )}

                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 flex items-center justify-center mx-auto mb-6 group-hover:border-indigo-400/40 transition-colors"
                >
                  <item.icon className="w-8 h-8 text-indigo-400" />
                </motion.div>
                <div className="text-xs font-bold text-indigo-400/60 uppercase tracking-widest mb-2">
                  Step {item.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ===== FIRST CUSTOMER ===== */}
      <FirstCustomer />

      {/* ===== GLOBAL NETWORK SECTION ===== */}
      <AnimatedSection className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/10 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl sm:text-5xl font-bold mb-6"
              >
                An AI shopping marketplace{" "}
                <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  for every store
                </span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-white/40 mb-10 leading-relaxed">
                The AskShop marketplace app brings participating stores into one AI-guided shopping
                experience, so your products are found by shoppers who simply describe what they need.
              </motion.p>
              <motion.div variants={stagger} className="space-y-6">
                {[
                  { icon: Globe, title: "Multi-Store Discovery", desc: "Customers explore products across all marketplace stores in one AI conversation." },
                  { icon: BrainCircuit, title: "Smart Matching", desc: "AI understands intent and matches customers with the perfect products from the right stores." },
                  { icon: ShoppingCart, title: "Per-Store Checkout", desc: "Multi-cart system with per-store native checkout via Shopify Checkout Sheet Kit." },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="flex gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover:border-indigo-400/40 transition-colors">
                      <item.icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-white/40">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex items-center justify-center"
            >
              <div className="relative w-full max-w-[500px] aspect-square">
                <div className="absolute inset-0 rounded-full border border-indigo-500/10 animate-pulse" />
                <GlobeVisualization />
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ===== AGENTIC COMMERCE / UCP ===== */}
      <AnimatedSection className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 mb-6">
              <Network className="w-4 h-4" />
              Universal Commerce Protocol (UCP)
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold">
              Built for{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                agentic commerce
              </span>
            </h2>
            <p className="mt-6 text-lg text-white/40 max-w-3xl mx-auto leading-relaxed">
              UCP is the open standard Google and Shopify introduced in January 2026 so AI agents can
              discover products, complete checkout and handle post-purchase support with any merchant.
              AskShop is being built on it: the AI in your app speaks the same protocol as the agents
              in Google, Gemini and beyond — and you stay the merchant of record.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Discover", desc: "Your catalog, structured for agents. Shoppers ask in plain language and get your products — in your app, or in any UCP-connected surface." },
              { icon: ShoppingCart, title: "Transact", desc: "Checkout runs on Shopify, so you keep your business logic, your payment providers and your role as merchant of record." },
              { icon: Shield, title: "Support", desc: "Order status, returns and questions handled in the same conversation, with a hand-off to your human team when it matters." },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={scaleIn}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/20 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.p variants={fadeIn} className="mt-10 text-center text-sm text-white/30">
            UCP support is in development. Read Google&apos;s{" "}
            <a
              href="https://developers.googleblog.com/under-the-hood-universal-commerce-protocol-ucp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-300 hover:text-white transition-colors"
            >
              protocol overview
            </a>
            .
          </motion.p>
        </div>
      </AnimatedSection>

      {/* ===== EARLY ACCESS CTA ===== */}
      <section id="waitlist" className="py-24 sm:py-32 relative scroll-mt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-600/10 to-transparent" />
        <div className="absolute inset-0">
          <ParticleNetwork />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-300 mb-6">
            <Rocket className="w-4 h-4" />
            Early access
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Step into the{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              new age of ecommerce
            </span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto mb-10">
            Businesses evolve, or they fall behind. The first AskShop app is live in both stores and
            the next founding merchants are onboarding now — join the waitlist for early access and
            founding-merchant pricing, and you&apos;ll hear back from the founder directly.
          </p>

          {/* Waitlist form — see submitWaitlist above. */}
          <form
            onSubmit={submitWaitlist}
            className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-6"
          >
            <input
              type="email"
              required
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              placeholder="you@yourstore.com"
              aria-label="Your email address"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/20 overflow-hidden shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">Join Waitlist</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>
          <p className="text-sm text-white/30">
            No credit card required &middot; Or email{" "}
            <a href={mailto("Hello AskShop")} className="text-indigo-300 hover:text-white transition-colors">
              {site.contact.email}
            </a>
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white/30">
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-indigo-400/60" /> Built on Shopify&apos;s Storefront API</span>
            <span className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-violet-400/60" /> Native iOS and Android</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400/60" /> No success fees</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
