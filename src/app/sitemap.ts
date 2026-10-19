import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { getAllCompetitorSlugs } from "@/lib/compare-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tapmerce.ai";

  const staticPages = [
    { url: baseUrl, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${baseUrl}/features`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/pricing`, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${baseUrl}/privacy`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/dpa`, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${baseUrl}/imprint`, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comparePages = getAllCompetitorSlugs().map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages, ...comparePages];
}
