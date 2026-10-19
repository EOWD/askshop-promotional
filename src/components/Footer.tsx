import Link from "next/link";
import { site, mailto } from "@/lib/site";
import { Logo } from "@/components/Logo";

const footerLinks = {
  Product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Website AI assistant", href: "/#services" },
    { name: "Mobile app", href: "/#services" },
    { name: "AI marketplace", href: "/#services" },
    { name: "Organic's Best case study", href: "/#case-study" },
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
    { name: "Contact", href: mailto("Hello Tapmerce") },
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
    <footer className="bg-[#1d1d1f] text-[#fffdfa]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo tone="dark" className="mb-4" />
            <p className="text-sm text-white/55">
              {site.tagline}. An AI assistant for your website, your own iOS and Android app, and an AI marketplace listing.
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
                      className="text-sm text-white/65 hover:text-white transition-colors"
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
          <p className="text-sm text-white/60">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <a href={mailto("Hello Tapmerce")} className="text-sm text-white/60 hover:text-white transition-colors">
            {site.contact.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
