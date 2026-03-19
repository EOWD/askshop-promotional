"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquare,
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
  DollarSign,
  Users,
  Target,
  LineChart,
  Mail,
} from "lucide-react";
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
                  The Future of E-Commerce is Here
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.95]"
              >
                <span className="block text-white/70 font-light text-2xl sm:text-3xl lg:text-4xl mb-2">
                  Shop with
                </span>
                <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                  AI Intelligence
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                  className="h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-transparent rounded-full mt-3"
                />
              </motion.h1>

              <motion.p variants={fadeUp} className="mt-6 text-base sm:text-lg text-white/50 max-w-xl leading-relaxed">
                A global AI marketplace where customers discover products across thousands of stores through natural conversation. The next generation of mobile commerce.
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
                  <span className="relative z-10">Join the Waitlist</span>
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
                Launching Q2 2026 &middot; Free for first 100 merchants &middot; Plans from $99/mo
              </motion.p>
            </motion.div>


          </div>
        </div>
      </section>

      {/* ===== TRUSTED / STATS MARQUEE ===== */}
      <AnimatedSection className="py-20 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            <AnimatedStat value="12.3%" label="AI Chat Conversion Rate" sublabel="vs 3.1% without AI" />
            <AnimatedStat value="90%" label="Push Notification Opens" sublabel="vs 20% email" />
            <AnimatedStat value="3.5x" label="More Purchases Per Year" sublabel="from app customers" />
            <AnimatedStat value="$0" label="Success Fees" sublabel="no commissions, ever" />
          </div>
        </div>
      </AnimatedSection>

      {/* ===== TWO PRODUCTS ===== */}
      <AnimatedSection className="py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Two experiences.{" "}
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
                    "Smart recommendations (+47% AOV)",
                    "In-chat product cards with add-to-cart",
                    "Conversational checkout",
                    "3.2x higher conversion than browse-and-buy",
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
              See it{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                in action
              </span>
            </h2>
            <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto">
              Real app screens. Real AI conversations. Real product discovery.
            </p>
          </motion.div>

          {/* 3 Phone Mockups */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-10">

            {/* Phone 1: AI Chat conversation */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0 }}
              className="flex flex-col items-center"
            >
              <div className="w-[260px] sm:w-[280px] rounded-[2.5rem] border-[3px] border-white/10 bg-gradient-to-b from-[#0f0d1a] to-[#0a0913] p-3 shadow-2xl shadow-indigo-500/10">
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 pt-2 pb-3 text-[10px] text-white/40">
                  <span>9:41</span>
                  <div className="w-20 h-5 rounded-full bg-black mx-auto" />
                  <span>100%</span>
                </div>
                {/* Header */}
                <div className="px-3 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">AskShop AI</div>
                      <div className="text-[10px] text-green-400">Online</div>
                    </div>
                  </div>
                </div>
                {/* Chat messages */}
                <div className="py-3 px-1 space-y-2.5 min-h-[300px]">
                  <div className="flex justify-end">
                    <div className="rounded-2xl rounded-br-sm bg-indigo-600 px-3 py-2 text-[11px] text-white max-w-[85%]">
                      Looking for running shoes under $120, size 10
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-[11px] text-white/80 max-w-[85%]">
                      I found 3 great options from Nike and Adidas in your size! Here are the top picks:
                    </div>
                  </div>
                  {/* Product cards in chat */}
                  <div className="flex gap-2 overflow-hidden pl-1">
                    {[
                      { name: "Nike Air Zoom", price: "$109.99", color: "from-indigo-500/20 to-violet-500/20" },
                      { name: "Adidas Ultra", price: "$119.99", color: "from-cyan-500/20 to-blue-500/20" },
                    ].map((p) => (
                      <div key={p.name} className="w-[110px] shrink-0 rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
                        <div className={`h-[70px] bg-gradient-to-br ${p.color} flex items-center justify-center`}>
                          <Smartphone className="w-6 h-6 text-white/30" />
                        </div>
                        <div className="p-2">
                          <div className="text-[10px] font-medium text-white truncate">{p.name}</div>
                          <div className="text-[10px] font-bold text-indigo-400">{p.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-[11px] text-white/80 max-w-[85%]">
                      Want me to add any of these to your cart?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="rounded-2xl rounded-br-sm bg-indigo-600 px-3 py-2 text-[11px] text-white max-w-[85%]">
                      Add the Nike Air Zoom please!
                    </div>
                  </div>
                </div>
                {/* Input bar */}
                <div className="flex items-center gap-2 border-t border-white/5 pt-2 px-2">
                  <div className="flex-1 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] text-white/30">
                    Ask anything...
                  </div>
                  <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm font-medium text-white/60 text-center">AI Chat Shopping</p>
              <p className="text-xs text-white/30 text-center">Natural conversation to cart</p>
            </motion.div>

            {/* Phone 2: Product recommendation cards */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col items-center"
            >
              <div className="w-[260px] sm:w-[280px] rounded-[2.5rem] border-[3px] border-white/10 bg-gradient-to-b from-[#0f0d1a] to-[#0a0913] p-3 shadow-2xl shadow-violet-500/10">
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 pt-2 pb-3 text-[10px] text-white/40">
                  <span>9:41</span>
                  <div className="w-20 h-5 rounded-full bg-black mx-auto" />
                  <span>100%</span>
                </div>
                {/* Header */}
                <div className="px-3 pb-3 border-b border-white/5">
                  <div className="text-sm font-bold text-white">Recommended For You</div>
                  <div className="text-[10px] text-white/40 mt-0.5">Based on your style</div>
                </div>
                {/* Product grid */}
                <div className="py-3 px-1 space-y-3 min-h-[300px]">
                  {[
                    { name: "Merino Wool Sweater", price: "$89.00", badge: "Trending", badgeColor: "bg-violet-500/80", gradient: "from-violet-500/20 to-purple-500/20" },
                    { name: "Leather Crossbody Bag", price: "$129.00", badge: "-20%", badgeColor: "bg-red-500/80", gradient: "from-amber-500/20 to-orange-500/20" },
                    { name: "Ceramic Vase Set", price: "$45.00", badge: "New", badgeColor: "bg-emerald-500/80", gradient: "from-emerald-500/20 to-teal-500/20" },
                  ].map((p) => (
                    <div key={p.name} className="flex gap-3 items-center rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                      <div className={`w-16 h-16 shrink-0 rounded-lg bg-gradient-to-br ${p.gradient} flex items-center justify-center relative`}>
                        <ShoppingCart className="w-5 h-5 text-white/30" />
                        <span className={`absolute -top-1 -right-1 ${p.badgeColor} text-[8px] font-bold text-white px-1.5 py-0.5 rounded-full`}>
                          {p.badge}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] font-medium text-white truncate">{p.name}</div>
                        <div className="text-[11px] font-bold text-indigo-400 mt-0.5">{p.price}</div>
                        <div className="flex gap-1 mt-1">
                          {[1,2,3,4,5].map((s) => (
                            <svg key={s} className="w-2.5 h-2.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-indigo-600/20 flex items-center justify-center shrink-0">
                        <ArrowRight className="w-3 h-3 text-indigo-400" />
                      </div>
                    </div>
                  ))}
                  {/* AI suggestion banner */}
                  <div className="rounded-xl bg-gradient-to-r from-indigo-600/10 to-violet-600/10 border border-indigo-500/20 p-3 flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-indigo-400 shrink-0" />
                    <div>
                      <div className="text-[10px] font-semibold text-indigo-300">AI Picked For You</div>
                      <div className="text-[9px] text-white/40">Based on your browsing history</div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm font-medium text-white/60 text-center">Smart Recommendations</p>
              <p className="text-xs text-white/30 text-center">AI-powered product discovery</p>
            </motion.div>

            {/* Phone 3: Store browsing / product detail */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="w-[260px] sm:w-[280px] rounded-[2.5rem] border-[3px] border-white/10 bg-gradient-to-b from-[#0f0d1a] to-[#0a0913] p-3 shadow-2xl shadow-cyan-500/10">
                {/* Status bar */}
                <div className="flex items-center justify-between px-4 pt-2 pb-3 text-[10px] text-white/40">
                  <span>9:41</span>
                  <div className="w-20 h-5 rounded-full bg-black mx-auto" />
                  <span>100%</span>
                </div>
                {/* Product image area */}
                <div className="rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-white/5 h-[160px] flex items-center justify-center relative overflow-hidden mb-3">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0913] via-transparent to-transparent" />
                  <Smartphone className="w-12 h-12 text-white/15" />
                  {/* Dot indicators */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  </div>
                  {/* Wishlist */}
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                {/* Product info */}
                <div className="px-2 space-y-2 min-h-[140px]">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">Premium Canvas Sneakers</div>
                      <div className="text-[10px] text-white/40">Urban Street Co.</div>
                    </div>
                    <div className="text-sm font-bold text-indigo-400">$84.00</div>
                  </div>
                  {/* Size selector */}
                  <div>
                    <div className="text-[9px] text-white/40 mb-1.5 uppercase tracking-wider">Size</div>
                    <div className="flex gap-1.5">
                      {["8", "9", "10", "11"].map((s, i) => (
                        <div key={s} className={`w-8 h-8 rounded-lg border text-[10px] font-medium flex items-center justify-center ${i === 2 ? "border-indigo-500 bg-indigo-500/20 text-indigo-300" : "border-white/10 text-white/40"}`}>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Color selector */}
                  <div>
                    <div className="text-[9px] text-white/40 mb-1.5 uppercase tracking-wider">Color</div>
                    <div className="flex gap-2">
                      <div className="w-5 h-5 rounded-full bg-white border-2 border-indigo-500" />
                      <div className="w-5 h-5 rounded-full bg-gray-800 border border-white/10" />
                      <div className="w-5 h-5 rounded-full bg-blue-900 border border-white/10" />
                    </div>
                  </div>
                  {/* Add to cart */}
                  <div className="pt-1">
                    <div className="w-full rounded-xl bg-indigo-600 py-2.5 text-center text-[11px] font-bold text-white">
                      Add to Cart
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm font-medium text-white/60 text-center">Product Experience</p>
              <p className="text-xs text-white/30 text-center">Native feel, instant checkout</p>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ===== BENTO GRID FEATURES ===== */}
      <AnimatedSection className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold">
              Everything for{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                mobile commerce
              </span>
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
              description="Apple Pay, Google Pay, and Shop Pay. One-tap checkout that converts 35% better than mobile web."
              gradient="bg-gradient-to-br from-violet-600/10 to-transparent"
            />
            <BentoCard
              icon={Bell}
              title="Push Notifications"
              description="90% open rates. Abandoned cart recovery, back-in-stock alerts, and personalized recommendations."
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
              description="Track installs, active users, push performance, and revenue attribution — all inside Shopify admin."
              gradient="bg-gradient-to-br from-emerald-600/10 to-transparent"
            />
            <BentoCard
              icon={Network}
              title="AI Marketplace"
              description="Multi-store discovery. Customers explore across thousands of stores through a single AI-powered app."
              gradient="bg-gradient-to-br from-pink-600/10 to-transparent"
            />
            <BentoCard
              icon={Shield}
              title="Enterprise Security"
              description="End-to-end encryption, SOC 2 compliant, GDPR ready. Your customer data is always protected."
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
              Live in the App Store in{" "}
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                under a week
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
                A global{" "}
                <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  commerce network
                </span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-white/40 mb-10 leading-relaxed">
                The AskShop universal marketplace connects customers to stores worldwide.
                AI-powered discovery means your products are found by the right shoppers, no matter where they are.
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

      {/* ===== INVEST IN ASKSHOP ===== */}
      <AnimatedSection className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-950/10 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300 mb-6">
                  <DollarSign className="w-4 h-4" />
                  Investment Opportunity
                </span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold mb-6">
                Invest in the{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  future of commerce
                </span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-white/50 mb-8 leading-relaxed">
                AskShop is building the infrastructure layer for AI-powered mobile commerce.
                We&apos;re raising our pre-seed round and looking for strategic investors who believe
                in the next generation of e-commerce.
              </motion.p>
              <motion.div variants={stagger} className="space-y-4 mb-10">
                {[
                  { icon: Target, text: "$1.2T mobile commerce market growing 25% YoY" },
                  { icon: TrendingUp, text: "AI commerce expected to be $200B+ by 2030" },
                  { icon: Users, text: "5.7M+ Shopify merchants — massive addressable market" },
                  { icon: LineChart, text: "SaaS model: recurring revenue, zero transaction fees" },
                ].map((item) => (
                  <motion.div
                    key={item.text}
                    variants={fadeUp}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <p className="text-sm text-white/60">{item.text}</p>
                  </motion.div>
                ))}
              </motion.div>
              <motion.a
                variants={fadeUp}
                href="mailto:invest@askshop.app"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16,185,129,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-500/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Mail className="relative z-10 w-5 h-5" />
                <span className="relative z-10">Get the Investor Deck</span>
                <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>

            {/* Metrics cards */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "TAM", value: "$1.2T", desc: "Mobile commerce market", gradient: "from-emerald-500/20 to-cyan-500/20", border: "border-emerald-500/20" },
                { label: "SAM", value: "$28B", desc: "Shopify mobile commerce", gradient: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/20" },
                { label: "Merchants", value: "5.7M+", desc: "Shopify stores worldwide", gradient: "from-violet-500/20 to-indigo-500/20", border: "border-violet-500/20" },
                { label: "ARPU Target", value: "$249", desc: "Average revenue per user/mo", gradient: "from-indigo-500/20 to-purple-500/20", border: "border-indigo-500/20" },
                { label: "Gross Margin", value: "85%+", desc: "Pure SaaS economics", gradient: "from-emerald-500/20 to-emerald-500/10", border: "border-emerald-500/20" },
                { label: "Moat", value: "AI+Data", desc: "Network effects compound", gradient: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/20" },
              ].map((m) => (
                <motion.div
                  key={m.label}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className={`rounded-2xl border ${m.border} bg-gradient-to-br ${m.gradient} p-5 backdrop-blur-sm`}
                >
                  <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider mb-1">{m.label}</div>
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{m.value}</div>
                  <div className="text-xs text-white/40">{m.desc}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* ===== PRE-LAUNCH CTA ===== */}
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
            Pre-Launch — Coming Soon
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Be first to{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              experience the future
            </span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto mb-10">
            We&apos;re building something extraordinary. Join the waitlist for early access
            and launch pricing. Limited spots for founding merchants.
          </p>

          {/* Email signup */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto mb-6">
            <input
              type="email"
              placeholder="you@yourstore.com"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-4 text-base text-white placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30"
            />
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,102,241,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 text-base font-bold text-white shadow-xl shadow-indigo-500/20 overflow-hidden shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10">Join Waitlist</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
          <p className="text-sm text-white/30">
            Free forever for the first 100 merchants &middot; No credit card required
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white/30">
            <span className="flex items-center gap-2"><Users className="w-4 h-4 text-indigo-400/60" /> 847 on waitlist</span>
            <span className="flex items-center gap-2"><Rocket className="w-4 h-4 text-violet-400/60" /> Launching Q2 2026</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-400/60" /> Backed by Shopify Partners</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
