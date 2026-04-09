import type { ApiResponse } from "@/types";

// ===================================================
// Клиент для работы со Strapi CMS
// ===================================================

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions extends RequestInit {
  tags?: string[];
  revalidate?: number;
}

/**
 * Базовый fetch для Strapi REST API
 */
async function strapiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const { tags, revalidate, ...fetchOptions } = options;

  const url = `${STRAPI_URL}/api${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
      ...fetchOptions.headers,
    },
    next: {
      ...(tags && { tags }),
      ...(revalidate !== undefined && { revalidate }),
    },
    ...fetchOptions,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error?.error?.message ?? `Strapi fetch failed: ${response.status} ${url}`
    );
  }

  return response.json() as Promise<ApiResponse<T>>;
}

// ===================================================
// API-методы
// ===================================================

/** Получить список статей */
export async function getArticles(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}) {
  const qs = new URLSearchParams();
  if (params?.page) qs.set("pagination[page]", String(params.page));
  if (params?.pageSize) qs.set("pagination[pageSize]", String(params.pageSize));
  if (params?.category) qs.set("filters[category][$eq]", params.category);
  qs.set("populate", "coverImage,author");
  qs.set("sort", "publishedAt:desc");

  return strapiFetch(`/articles?${qs}`, {
    tags: ["articles"],
    revalidate: 3600, // 1 час
  });
}

/** Получить одну статью по slug */
export async function getArticle(slug: string) {
  return strapiFetch(`/articles?filters[slug][$eq]=${slug}&populate=*`, {
    tags: [`article-${slug}`],
    revalidate: 3600,
  });
}

/** Получить тарифные планы из CMS */
export async function getPlans() {
  return strapiFetch("/plans?populate=features", {
    tags: ["plans"],
    revalidate: 86400, // 24 часа
  });
}

/** Получить страницу возможностей */
export async function getFeatures() {
  return strapiFetch("/features?populate=icon", {
    tags: ["features"],
    revalidate: 86400,
  });
}

/** Инвалидация кэша (вызывается из webhook Strapi) */
export async function revalidateTag(tag: string) {
  const response = await fetch(`/api/revalidate?tag=${tag}`, {
    method: "POST",
  });
  return response.json();
}

export { strapiFetch };
