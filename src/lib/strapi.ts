import type { ArticleCard, ArticleType } from "./articles";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://librachat-cms.onrender.com";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// ── Типы Strapi v4 ─────────────────────────────────

interface StrapiMedia {
  data: {
    attributes: {
      url: string;
    };
  } | null;
}

interface StrapiArticleAttributes {
  title: string;
  slug: string;
  excerpt: string | null;
  content: unknown;
  author: string | null;
  authorRole: string | null;
  type: ArticleType | null;
  readTime: number | null;
  views: string | null;
  tags: string[] | null;
  featured: boolean | null;
  gradient: string | null;
  photoPos: string | null;
  photo: StrapiMedia | null;
  publishedAt: string | null;
}

interface StrapiArticle {
  id: number;
  attributes: StrapiArticleAttributes;
}

interface StrapiResponse<T> {
  data: T;
  meta?: unknown;
}

// ── Хелперы ────────────────────────────────────────

function getPhotoUrl(photo: StrapiMedia | null): string | undefined {
  if (!photo?.data?.attributes?.url) return undefined;
  const url = photo.data.attributes.url;
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
}

function mapToArticleCard(item: StrapiArticle): ArticleCard {
  const a = item.attributes;
  return {
    slug: a.slug,
    type: a.type ?? "статья",
    title: a.title,
    excerpt: a.excerpt ?? "",
    author: a.author ?? "LibraChat",
    authorRole: a.authorRole ?? undefined,
    photo: getPhotoUrl(a.photo ?? null),
    photoPos: a.photoPos ?? undefined,
    readTime: a.readTime ?? 5,
    views: a.views ?? "500",
    tags: Array.isArray(a.tags) ? a.tags : [],
    featured: a.featured ?? false,
    gradient: a.gradient ?? undefined,
  };
}

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  return headers;
}

// ── Запросы ────────────────────────────────────────

/**
 * Получить список всех опубликованных статей.
 * При ошибке возвращает пустой массив (fallback на статику).
 */
export async function fetchStrapiArticles(): Promise<ArticleCard[]> {
  try {
    const url = `${STRAPI_URL}/api/articles?populate=photo&sort=createdAt:desc&pagination[pageSize]=100`;
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: 60 }, // ISR — обновлять раз в минуту
    });

    if (!res.ok) {
      console.error(`[Strapi] fetchArticles failed: ${res.status}`);
      return [];
    }

    const json: StrapiResponse<StrapiArticle[]> = await res.json();
    return (json.data ?? []).map(mapToArticleCard);
  } catch (err) {
    console.error("[Strapi] fetchArticles error:", err);
    return [];
  }
}

/**
 * Получить одну статью по slug.
 */
export async function fetchStrapiArticleBySlug(
  slug: string
): Promise<(ArticleCard & { rawContent: unknown }) | null> {
  try {
    const url = `${STRAPI_URL}/api/articles?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=photo`;
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`[Strapi] fetchArticleBySlug failed: ${res.status}`);
      return null;
    }

    const json: StrapiResponse<StrapiArticle[]> = await res.json();
    const item = json.data?.[0];
    if (!item) return null;

    return {
      ...mapToArticleCard(item),
      rawContent: item.attributes.content,
    };
  } catch (err) {
    console.error("[Strapi] fetchArticleBySlug error:", err);
    return null;
  }
}
