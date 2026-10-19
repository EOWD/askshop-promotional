"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { site, mailto } from "@/lib/site";
import { Logo } from "@/components/Logo";

const navigation = [
  { name: "Website AI", href: "/#services" },
  { name: "Mobile app", href: "/#services" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Home and pricing use the light app-surface world; other pages keep the dark theme until redesigned.
  const light = ["/", "/pricing"].includes(usePathname());

  const t = light
    ? {
        bar: "bg-[#efeae4]/85 border-[#e2dbd2]",
        link: "text-[#55524e] hover:text-[#1d1d1f]",
        contact: "text-[#55524e] hover:text-[#1d1d1f]",
        cta: "bg-[#ff5a1f] text-[#1d1d1f] hover:bg-[#f04a10]",
        icon: "text-[#1d1d1f]",
        sheet: "border-[#e2dbd2]",
        ghost: "border-[#e2dbd2] text-[#1d1d1f]",
        announce: "bg-[#1d1d1f] text-[#fffdfa] hover:bg-black",
      }
    : {
        bar: "bg-[#17171a]/95 border-white/[0.06]",
        link: "text-white/60 hover:text-white",
        contact: "text-white/60 hover:text-white",
        cta: "bg-[#ff5a1f] text-[#1d1d1f] hover:bg-[#f04a10]",
        icon: "text-white",
        sheet: "border-white/10",
        ghost: "border-white/10 text-white",
        announce: "bg-[#ff5a1f] text-[#1d1d1f] hover:bg-[#f04a10]",
      };

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${t.bar}`}>
      {/* Announcement bar: the launch guarantee, straight to the demo form */}
      <Link href="/#demo" className={`block px-4 py-2 text-center text-xs font-medium transition-colors sm:text-sm ${t.announce}`}>
        <span className="font-semibold">{site.guarantee.short}</span>
        <span className="hidden sm:inline">, {site.guarantee.remedy}</span>
        <span aria-hidden className="ml-2">→</span>
      </Link>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" aria-label="Tapmerce home">
            <Logo tone={light ? "light" : "dark"} />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className={`text-sm font-medium transition-colors ${t.link}`}>
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-5 md:flex">
            <a href={mailto("Hello Tapmerce")} className={`text-sm font-medium transition-colors ${t.contact}`}>
              Contact
            </a>
            <Link
              href="/#demo"
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] ${t.cta}`}
            >
              Book a demo
            </Link>
          </div>

          <button
            className="cursor-pointer p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className={`h-6 w-6 ${t.icon}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`overflow-hidden border-t md:hidden ${t.sheet}`}
            >
              <div className="py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block py-2.5 text-[15px] font-medium ${t.link}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <a href={mailto("Hello Tapmerce")} className={`rounded-full border px-4 py-2.5 text-center text-sm font-medium ${t.ghost}`}>
                    Contact
                  </a>
                  <Link
                    href="/#demo"
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-full px-4 py-2.5 text-center text-sm font-semibold ${t.cta}`}
                  >
                    Book a demo
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
