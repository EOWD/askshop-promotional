import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompetitor, getAllCompetitorSlugs } from "@/lib/compare-data";
import { JsonLd, buildComparisonSchema, buildBreadcrumbSchema } from "@/components/StructuredData";

export function generateStaticParams() {
  return getAllCompetitorSlugs().map((slug) => ({ competitor: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ competitor: string }>;
}): Promise<Metadata> {
  const { competitor: slug } = await params;
  const comp = getCompetitor(slug);
  if (!comp) return { title: "Not Found" };
  return {
    title: `AskShop vs ${comp.name} — Shopify Mobile App Builder Comparison`,
    description: `Compare AskShop and ${comp.name} as Shopify mobile app builders: features, pricing, AI shopping assistant, and which is right for your store.`,
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  const { competitor: slug } = await params;
  const comp = getCompetitor(slug);
  if (!comp) notFound();

  const allSlugs = getAllCompetitorSlugs();

  return (
    <>
      <JsonLd data={buildComparisonSchema(comp)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: "Home", url: "https://askshop.app" },
        { name: "Compare", url: "https://askshop.app/compare/tapcart" },
        { name: `vs ${comp.name}`, url: `https://askshop.app/compare/${comp.slug}` },
      ])} />
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Nav between comparisons */}
          <div className="flex flex-wrap gap-2 mb-12">
            {allSlugs.map((s) => {
              const c = getCompetitor(s)!;
              return (
                <Link
                  key={s}
                  href={`/compare/${s}`}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    s === slug
                      ? "bg-primary text-white"
                      : "bg-surface-dark text-muted hover:text-foreground"
                  }`}
                >
                  vs {c.name}
                </Link>
              );
            })}
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            AskShop vs {comp.name}
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl">
            {comp.description}
          </p>

          {/* Pricing comparison */}
          <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-2xl">
            <div className="rounded-xl border border-border p-6">
              <h3 className="text-sm font-medium text-muted">{comp.name}</h3>
              <div className="mt-2 text-3xl font-bold text-foreground">
                {comp.priceFrom}
              </div>
              <p className="text-sm text-muted">starting price</p>
            </div>
            <div className="rounded-xl border border-primary/20 bg-indigo-500/10 p-6">
              <h3 className="text-sm font-medium text-primary">AskShop</h3>
              <div className="mt-2 text-3xl font-bold text-foreground">$99/mo</div>
              <p className="text-sm text-muted">starting price</p>
            </div>
          </div>

          {/* Feature comparison table */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Feature comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse max-w-3xl">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-3 pr-4 font-semibold text-foreground">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">
                      {comp.name}
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-primary">
                      AskShop
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(comp.features).map(([feature, [compVal, askVal]]) => (
                    <tr key={feature} className="border-b border-border">
                      <td className="py-3 pr-4 text-muted">{feature}</td>
                      <td className="py-3 px-4 text-center">
                        {compVal === "Yes" ? (
                          <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : compVal === "No" ? (
                          <svg className="w-5 h-5 text-red-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <span className="text-muted">{compVal}</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {askVal === "Yes" ? (
                          <svg className="w-5 h-5 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : askVal === "No" ? (
                          <svg className="w-5 h-5 text-red-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        ) : (
                          <span className="text-foreground font-medium">{askVal}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pros */}
          <div className="mt-16 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Why choose AskShop
              </h3>
              <ul className="space-y-3">
                {comp.askshopAdvantages.map((adv) => (
                  <li key={adv} className="flex items-start gap-2 text-sm text-muted">
                    <svg className="w-5 h-5 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Why choose {comp.name}
              </h3>
              <ul className="space-y-3">
                {comp.competitorAdvantages.map((adv) => (
                  <li key={adv} className="flex items-start gap-2 text-sm text-muted">
                    <svg className="w-5 h-5 text-muted-light shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Verdict */}
          <div className="mt-16 rounded-2xl bg-surface-dark border border-border p-8">
            <h3 className="text-xl font-bold text-foreground mb-3">The verdict</h3>
            <p className="text-muted">{comp.verdict}</p>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-foreground">Try AskShop free for 14 days</h3>
            <p className="mt-2 text-muted">No credit card required. See the difference for yourself.</p>
            <Link
              href="/#waitlist"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-white hover:bg-primary-dark transition-colors"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
