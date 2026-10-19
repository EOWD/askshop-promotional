import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/blog-data";
import { site } from "@/lib/site";
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

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

// ---------- Minimal markdown renderer for blog-data content ----------
// Supports ## and ### headings, paragraphs, - and 1. lists, | tables |, **bold**, [links](url) and `code`.

const INLINE = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|`[^`]+`)/g;

function inline(text: string): ReactNode[] {
  return text.split(INLINE).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const cls = "font-medium text-ink underline decoration-ink/25 decoration-2 underline-offset-4 hover:decoration-ink";
      return href.startsWith("/") ? (
        <Link key={i} href={href} className={cls}>
          {label}
        </Link>
      ) : (
        <a key={i} href={href} className={cls} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
      return (
        <code key={i} className="rounded-md bg-stone-deep px-1.5 py-0.5 font-mono text-[0.9em] text-ink">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

type Block =
  | { type: "h2" | "h3" | "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

const cells = (line: string) =>
  line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());

function parse(content: string): Block[] {
  const blocks: Block[] = [];
  const lines = content.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (!line) {
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4) });
      i++;
    } else if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3) });
      i++;
    } else if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const row = cells(lines[i]);
        if (!row.every((c) => /^:?-+:?$/.test(c))) rows.push(row);
        i++;
      }
      const [head = [], ...body] = rows;
      blocks.push({ type: "table", head, rows: body });
    } else if (/^- /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^- /.test(lines[i].trim())) items.push(lines[i++].trim().slice(2));
      blocks.push({ type: "ul", items });
    } else if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) items.push(lines[i++].trim().replace(/^\d+\. /, ""));
      blocks.push({ type: "ol", items });
    } else {
      const text: string[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        if (!l || /^(#{2,3} |\||- |\d+\. )/.test(l)) break;
        text.push(l);
        i++;
      }
      blocks.push({ type: "p", text: text.join(" ") });
    }
  }
  return blocks;
}

function ArticleBody({ content }: { content: string }) {
  return (
    <div className="text-[18px] leading-[1.75] text-ink-2">
      {parse(content).map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="display mt-14 text-[1.9rem] font-bold leading-[1.08] tracking-[-0.018em] text-ink first:mt-0 sm:text-[2.3rem]">
                {inline(b.text)}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-10 text-[20px] font-semibold leading-snug text-ink">
                {inline(b.text)}
              </h3>
            );
          case "ul":
            return (
              <ul key={i} className="my-6 space-y-2.5">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3">
                    <span aria-hidden className="mt-[13px] h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                    <span>{inline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="my-6 space-y-3">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-card text-[14px] font-semibold tabular-nums text-ink">
                      {j + 1}
                    </span>
                    <span>{inline(item)}</span>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div key={i} className="my-8 overflow-x-auto rounded-[22px] bg-card">
                <table className="w-full min-w-[520px] border-collapse text-left text-[15px] leading-snug">
                  <thead>
                    <tr className="border-b border-line">
                      {b.head.map((h, j) => (
                        <th key={j} scope="col" className="px-4 py-3.5 font-semibold text-ink first:pl-5">
                          {inline(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, r) => (
                      <tr key={r} className="border-b border-line last:border-0">
                        {row.map((c, j) => (
                          <td key={j} className={`px-4 py-3 tabular-nums first:pl-5 ${j === 0 ? "font-medium text-ink" : "text-ink-2"}`}>
                            {inline(c)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          default:
            return (
              <p key={i} className="my-5">
                {inline(b.text)}
              </p>
            );
        }
      })}
    </div>
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="home-world overflow-x-clip bg-stone text-ink">
      <JsonLd data={buildArticleSchema(post)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Blog", url: `${site.url}/blog` },
          { name: post.title, url: `${site.url}/blog/${post.slug}` },
        ])}
      />

      <article className="px-4 pb-16 pt-10 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8">
        <div className="mx-auto max-w-[44rem]">
          <Link
            href="/blog"
            className="inline-flex min-h-10 items-center gap-1.5 text-[15px] font-medium text-ink-2 transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} /> All posts
          </Link>

          <h1 className="display mt-6 text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[3.4rem]">{post.title}</h1>
          <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-ink-2">
            <span className="font-medium text-ink">{post.category}</span>
            <span aria-hidden>·</span>
            <span>{post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date} className="tabular-nums">{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span className="tabular-nums">{post.readTime}</span>
          </p>
          <p className="mt-8 border-t border-line pt-8 text-[19px] leading-relaxed text-ink sm:text-[21px]">{post.excerpt}</p>

          <div className="mt-10 max-w-[68ch]">
            <ArticleBody content={post.content} />
          </div>

          <aside className="mt-16 rounded-[28px] bg-ink p-7 text-card sm:p-10">
            <h2 className="display text-[1.9rem] font-bold leading-[1.06] tracking-[-0.018em] sm:text-[2.3rem]">
              See an AI shopping assistant on your products
            </h2>
            <p className="mt-3 text-[17px] leading-relaxed text-card/75">
              Tapmerce builds AI shopping assistants and branded apps for nutrition brands. Book a demo and we&apos;ll
              show you yours answering real shopper questions.
            </p>
            <Link
              href="/#demo"
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-full bg-action px-7 text-[17px] font-semibold text-ink transition-all duration-200 hover:bg-action-press active:scale-[0.98]"
            >
              Book a demo <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </Link>
          </aside>
        </div>
      </article>

      {more.length > 0 && (
        <section className="px-4 pb-20 sm:px-6 sm:pb-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="display text-[2.1rem] font-bold leading-[1.04] tracking-[-0.022em] sm:text-5xl">More from the blog</h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {more.map((p) => (
                <li key={p.slug}>
                  <article className="group relative flex h-full flex-col rounded-[24px] bg-card p-6 transition-colors hover:bg-white sm:p-8">
                    <p className="text-[14px] text-ink-2">
                      <span className="font-medium text-ink">{p.category}</span> · <span className="tabular-nums">{p.readTime}</span>
                    </p>
                    <h3 className="display mt-3 text-[1.4rem] font-bold leading-[1.15] tracking-[-0.015em]">
                      <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 after:rounded-[24px]">
                        {p.title}
                      </Link>
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-semibold text-ink">
                      Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2} />
                    </span>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
