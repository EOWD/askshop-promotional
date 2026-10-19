import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import { site } from "@/lib/site";
import { JsonLd, buildBlogListSchema, buildBreadcrumbSchema } from "@/components/StructuredData";
import { Reveal } from "@/components/home/Reveal";

export const metadata: Metadata = {
  title: "Blog: AI Shopping Assistants and Ecommerce Mobile Apps",
  description:
    "Guides on AI shopping assistants, agentic commerce, push notifications, retention and branded mobile apps for nutrition brands and online stores.",
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

function Meta({ category, date, readTime, className = "" }: { category: string; date: string; readTime: string; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-ink-2 ${className}`}>
      <span className="font-medium text-ink">{category}</span>
      <span aria-hidden>·</span>
      <time dateTime={date} className="tabular-nums">{formatDate(date)}</time>
      <span aria-hidden>·</span>
      <span className="tabular-nums">{readTime}</span>
    </p>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <div className="home-world overflow-x-clip bg-stone text-ink">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Blog", url: `${site.url}/blog` },
        ])}
      />
      <JsonLd data={buildBlogListSchema(blogPosts)} />

      <section className="px-4 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="display max-w-4xl text-[2.8rem] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
            Notes on AI shopping and mobile commerce
          </h1>
          <p className="mt-6 max-w-[40rem] text-[17px] leading-relaxed text-ink-2 sm:text-[19px]">
            Guides on AI shopping assistants, agentic commerce, push notifications, retention and running your own app,
            for brands that sell online.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured && (
              <li className="md:col-span-2">
                <Reveal className="h-full">
                  <article className="group relative flex h-full flex-col justify-between gap-10 rounded-[28px] bg-card p-6 shadow-[0_30px_60px_-45px_rgba(60,40,20,0.5)] transition-colors hover:bg-white sm:p-10 lg:p-12">
                    <div>
                      <Meta category={featured.category} date={featured.date} readTime={featured.readTime} />
                      <h2 className="display mt-5 max-w-[22ch] text-[2rem] font-bold leading-[1.04] tracking-[-0.022em] sm:text-5xl">
                        <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0 after:rounded-[28px]">
                          {featured.title}
                        </Link>
                      </h2>
                    </div>
                    <div>
                      <p className="max-w-[40rem] text-[17px] leading-relaxed text-ink-2 sm:text-[19px]">{featured.excerpt}</p>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-[16px] font-semibold text-ink underline decoration-ink/25 decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-ink">
                        Read the article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                      </span>
                    </div>
                  </article>
                </Reveal>
              </li>
            )}
            {rest.map((post) => (
              <li key={post.slug}>
                <article className="group relative flex h-full flex-col rounded-[24px] bg-card p-6 transition-colors hover:bg-white sm:p-8">
                  <Meta category={post.category} date={post.date} readTime={post.readTime} />
                  <h2 className="display mt-4 text-[1.5rem] font-bold leading-[1.12] tracking-[-0.015em]">
                    <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:rounded-[24px]">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 line-clamp-3 text-[16px] leading-relaxed text-ink-2">{post.excerpt}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-semibold text-ink">
                    Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                  </span>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
