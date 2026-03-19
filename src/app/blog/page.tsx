import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { JsonLd, buildBlogListSchema, buildBreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Blog — Mobile Commerce Insights & Guides",
  description:
    "Learn about mobile commerce, AI shopping, push notification strategies, and how to grow your Shopify store with a native mobile app.",
};

export default function BlogPage() {
  return (
    <>
    <JsonLd data={buildBreadcrumbSchema([
      { name: "Home", url: "https://askshop.app" },
      { name: "Blog", url: "https://askshop.app/blog" },
    ])} />
    <JsonLd data={buildBlogListSchema(blogPosts)} />
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Blog
          </h1>
          <p className="mt-4 text-lg text-muted">
            Insights on mobile commerce, AI shopping, and growing your Shopify store with a
            native mobile app.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-xl border border-border bg-surface overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted mb-3">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <span>&middot;</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-lg font-semibold text-foreground line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted line-clamp-3">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  Read more
                  <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
