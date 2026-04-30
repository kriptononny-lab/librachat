import type { MetadataRoute } from "next";
import { fetchStrapiArticlesForSitemap } from "@/lib/strapi";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://librachat.ai";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Статические страницы
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    {
      url: `${BASE}/features`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/pricing`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE}/business`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/learn`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/download`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Динамические страницы статей из Strapi с реальными датами обновления.
  // Это важно для SEO: Google переобходит только реально изменившиеся страницы.
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const articles = await fetchStrapiArticlesForSitemap();
    articlePages = articles.map((a) => {
      // Приоритет: updatedAt → publishedAt → текущая дата
      const lastModified = a.updatedAt
        ? new Date(a.updatedAt)
        : a.publishedAt
          ? new Date(a.publishedAt)
          : new Date();
      return {
        url: `${BASE}/learn/${a.slug}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    });
  } catch {
    // fallback — без статей
  }

  return [...staticPages, ...articlePages];
}
