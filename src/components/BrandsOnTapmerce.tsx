import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Plus } from "lucide-react";
import { site } from "@/lib/site";
import { StoreBadges } from "@/components/StoreBadges";

/** One-line proof strip for the top of the page: who is live, with small badges. */
export function BrandsStrip() {
  return (
    <section className="py-8 border-y border-white/5 bg-white/[0.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10 text-center md:text-left">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-white/40">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Live on the App Store &amp; Google Play
        </div>
        {site.customers.map((customer) => (
          <div key={customer.slug} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <a
              href={customer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3"
            >
              <div className="w-9 h-9 shrink-0 rounded-xl bg-white p-1 flex items-center justify-center">
                <Image src={customer.logo} alt={`${customer.name} logo`} width={30} height={30} className="object-contain" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">{customer.name}</div>
                <div className="text-xs text-white/40">{customer.tagline}</div>
              </div>
            </a>
            <StoreBadges appStoreUrl={customer.appStore.url} playStoreUrl={customer.googlePlay.url} size="sm" />
          </div>
        ))}
        <Link href="#brands" className="text-sm font-semibold text-indigo-300 hover:text-white transition-colors whitespace-nowrap">
          See the app →
        </Link>
      </div>
    </section>
  );
}

/** Ecommerce brands with a live Tapmerce app, plus an open slot for the next one.
 *  Data comes from site.customers — add an entry there to add a brand here. */
export function BrandsOnTapmerce() {
  return (
    <section id="brands" className="py-24 sm:py-32 relative overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Live on the App Store and Google Play
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold">
            Ecommerce brands{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              running on Tapmerce
            </span>
          </h2>
          <p className="mt-6 text-lg text-white/40 max-w-2xl mx-auto">
            Shopify stores with their own mobile AI shopping app in the stores today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {site.customers.map((customer) => (
            <article
              key={customer.slug}
              className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 flex flex-col"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white p-2 flex items-center justify-center">
                  <Image src={customer.logo} alt={`${customer.name} logo`} width={48} height={48} className="object-contain" />
                </div>
                <div>
                  <a
                    href={customer.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-semibold text-white hover:text-indigo-300 transition-colors"
                  >
                    {customer.name}
                  </a>
                  <p className="text-sm text-white/50">{customer.tagline}</p>
                </div>
              </div>

              <p className="mt-6 text-white/50 leading-relaxed">{customer.description}</p>

              <ul className="mt-6 space-y-2.5">
                {customer.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                    <CheckCircle2 className="w-4.5 h-4.5 shrink-0 text-emerald-400 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Real screens from the live app */}
              <div className="mt-8 flex justify-center gap-3 sm:gap-4">
                {customer.screenshots.slice(0, 3).map((shot) => (
                  <figure key={shot.src} className="w-[96px] sm:w-[130px]">
                    <div className="rounded-[1.4rem] border-2 border-white/10 overflow-hidden bg-[#0a0913] shadow-xl shadow-emerald-500/5">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={640}
                        height={1385}
                        sizes="(min-width: 640px) 130px, 96px"
                        className="w-full h-auto"
                      />
                    </div>
                    <figcaption className="mt-2 text-center text-[11px] text-white/40 leading-tight">{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>

              <StoreBadges
                appStoreUrl={customer.appStore.url}
                playStoreUrl={customer.googlePlay.url}
                className="mt-8 justify-center"
              />
            </article>
          ))}

          {/* Open slot */}
          <Link
            href="/#demo"
            className="group rounded-3xl border border-dashed border-indigo-500/30 bg-indigo-500/[0.04] p-8 flex flex-col items-center justify-center text-center min-h-[320px] hover:border-indigo-400/60 hover:bg-indigo-500/[0.08] transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-5 group-hover:bg-indigo-600/30 transition-colors">
              <Plus className="w-7 h-7 text-indigo-300" />
            </div>
            <h3 className="text-xl font-semibold text-white">Your brand next</h3>
            <p className="mt-3 text-white/40 max-w-xs">
              A native app with an AI shopping assistant, in your customers&apos; pockets in weeks.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 group-hover:text-white transition-colors">
              Join the waitlist →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
