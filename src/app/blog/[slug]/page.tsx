import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/blog-data";
import { JsonLd, buildArticleSchema, buildBreadcrumbSchema } from "@/components/StructuredData";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
    <JsonLd data={buildArticleSchema(post)} />
    <JsonLd data={buildBreadcrumbSchema([
      { name: "Home", url: "https://askshop.app" },
      { name: "Blog", url: "https://askshop.app/blog" },
      { name: post.title, url: `https://askshop.app/blog/${post.slug}` },
    ])} />
    <article className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          <svg className="mr-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>

        <div className="mb-8">
          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted">
          <span>{post.author}</span>
          <span>&middot;</span>
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

        <div className="mt-12 prose prose-lg max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2 key={i} className="text-2xl font-bold text-foreground mt-10 mb-4">
                  {paragraph.replace("## ", "")}
                </h2>
              );
            }
            if (paragraph.startsWith("### ")) {
              return (
                <h3 key={i} className="text-xl font-semibold text-foreground mt-8 mb-3">
                  {paragraph.replace("### ", "")}
                </h3>
              );
            }
            if (paragraph.startsWith("- ")) {
              return (
                <ul key={i} className="list-disc pl-6 space-y-1 text-muted my-4">
                  {paragraph.split("\n").map((item, j) => (
                    <li key={j}>{item.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            if (paragraph.startsWith("| ")) {
              return null; // Skip markdown tables in simple renderer
            }
            return (
              <p key={i} className="text-muted leading-relaxed my-4">
                {paragraph.split("**").map((part, j) =>
                  j % 2 === 1 ? (
                    <strong key={j} className="text-foreground font-semibold">
                      {part}
                    </strong>
                  ) : (
                    part
                  )
                )}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-8 text-center">
          <h3 className="text-xl font-bold text-foreground">
            Ready to build your mobile app?
          </h3>
          <p className="mt-2 text-sm text-muted">
            Start your 14-day free trial. No credit card required.
          </p>
          <a
            href="https://apps.shopify.com"
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Join Waitlist
          </a>
        </div>
      </div>
    </article>
    </>
  );
}
