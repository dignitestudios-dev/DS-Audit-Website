import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const newest = new Date(articles.map((a) => a.date).sort().at(-1)!);
  return [
    { url: `${SITE_URL}/`, lastModified: newest, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/news`, lastModified: newest, changeFrequency: "daily", priority: 0.8 },
    ...articles.map((a) => ({
      url: `${SITE_URL}/news/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
