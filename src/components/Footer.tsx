import Link from "next/link";
import { site, mailto } from "@/lib/site";

const footerLinks = {
  Product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "AI Chat App", href: "/features#ai-chat" },
    { name: "Classic Store App", href: "/features#classic" },
  ],
  Compare: [
    { name: "vs Tapcart", href: "/compare/tapcart" },
    { name: "vs Shopney", href: "/compare/shopney" },
    { name: "vs Appbrew", href: "/compare/appbrew" },
    { name: "vs Plobal Apps", href: "/compare/plobal" },
    { name: "vs Vajro", href: "/compare/vajro" },
    { name: "vs MageNative", href: "/compare/magenative" },
  ],
  Resources: [
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: mailto("Hello AskShop") },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "DPA", href: "/dpa" },
    { name: "Imprint", href: "/imprint" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface text-white border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold">
                Ask<span className="text-indigo-400">Shop</span>
              </span>
            </div>
            <p className="text-sm text-white/40">
              {site.tagline}. Dedicated native apps and an AI shopping marketplace, built on Shopify.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold mb-4 text-white/80">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/30">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a href={mailto("Hello AskShop")} className="text-sm text-white/30 hover:text-white transition-colors">
            {site.contact.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
