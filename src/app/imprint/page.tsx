import type { Metadata } from "next";
import { site, mailto } from "@/lib/site";
import { JsonLd, buildBreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Imprint — Legal Notice",
  description:
    "Legal notice (Impressum) for askshop.app: who operates the site, how to reach them, and who is responsible for its content.",
};

/** Imprint / Impressum. Operator details come from src/lib/site.ts — the street
 *  address renders only once `site.legal.address` is filled in. */
export default function ImprintPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Imprint", url: `${site.url}/imprint` },
        ])}
      />
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Imprint</h1>
          <p className="mt-4 text-sm text-muted">Legal notice pursuant to § 5 DDG</p>

          <div className="mt-12 space-y-8 text-sm text-muted leading-relaxed">
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Operator</h2>
              <p className="text-foreground font-medium">{site.legal.operator}</p>
              <p>
                {site.name} is the trade name under which {site.legal.operator} develops and
                operates mobile commerce software for Shopify stores.
              </p>
              {site.legal.address && <p className="mt-2 whitespace-pre-line">{site.legal.address}</p>}
              <p className="mt-2">{site.legal.country}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Contact</h2>
              <p>
                Email:{" "}
                <a href={mailto("Hello AskShop")} className="text-primary hover:text-primary-dark">
                  {site.contact.email}
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Responsible for content</h2>
              <p>{site.legal.operator}</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Liability for content</h2>
              <p>
                The contents of this site were created with care. We cannot, however, guarantee
                that all content is accurate, complete or current. Product figures, plans and
                timelines describe the platform as planned and may change before launch.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Liability for links</h2>
              <p>
                This site links to external websites over which we have no control. The
                respective operators are responsible for the content of linked pages. Links are
                checked for legal violations when they are placed; if we become aware of
                violations we will remove the link.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">Copyright</h2>
              <p>
                The software, design and content of {site.name} are the intellectual property of{" "}
                {site.legal.operator}. Third-party marks, including Shopify, Apple and Google,
                belong to their respective owners.
              </p>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
