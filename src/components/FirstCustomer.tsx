import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";
import { StoreBadges } from "@/components/StoreBadges";

/** "Live in the stores" — the first merchant running an AskShop app. */
export function FirstCustomer() {
  const customer = site.customers[0];
  const shot = customer.screenshots[3];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              Live on the App Store and Google Play
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold">
              The first AskShop app is{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                in the stores
              </span>
            </h2>

            <div className="mt-8 flex items-center gap-4">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-white p-2 flex items-center justify-center">
                <Image src={customer.logo} alt={`${customer.name} logo`} width={48} height={48} className="object-contain" />
              </div>
              <div>
                <a
                  href={customer.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-white hover:text-indigo-300 transition-colors"
                >
                  {customer.name}
                </a>
                <p className="text-sm text-white/50">{customer.tagline}</p>
              </div>
            </div>

            <p className="mt-6 text-lg text-white/50 leading-relaxed">{customer.description}</p>

            <ul className="mt-8 space-y-3">
              {customer.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <StoreBadges
              appStoreUrl={customer.appStore.url}
              playStoreUrl={customer.googlePlay.url}
              className="mt-10"
            />
          </div>

          <div className="flex justify-center lg:justify-end">
            <figure className="w-[260px] sm:w-[300px]">
              <div className="rounded-[2.5rem] border-[3px] border-white/10 overflow-hidden shadow-2xl shadow-emerald-500/10 bg-[#0a0913]">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={640}
                  height={1385}
                  sizes="(min-width: 640px) 300px, 260px"
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="mt-4 text-center text-sm text-white/40">{shot.caption}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
