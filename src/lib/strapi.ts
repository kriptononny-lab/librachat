import type { ArticleCard, ArticleType } from "./articles";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "https://librachat-cms.onrender.com";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

// ── Типы Strapi v5 (без обёртки attributes) ────────

interface StrapiMediaV5 {
  url: string;
}

interface StrapiArticleV5 {
  id: number;
  documentId: string;
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
  photo: StrapiMediaV5 | null;
  publishedAt: string | null;
}

interface StrapiResponse<T> {
  data: T;
  meta?: unknown;
}

// ── Хелперы ────────────────────────────────────────

function getPhotoUrl(photo: StrapiMediaV5 | null): string | undefined {
  if (!photo?.url) return undefined;
  return photo.url.startsWith("http") ? photo.url : `${STRAPI_URL}${photo.url}`;
}

function mapToArticleCard(item: StrapiArticleV5): ArticleCard {
  return {
    slug: item.slug,
    type: item.type ?? "статья",
    title: item.title,
    excerpt: item.excerpt ?? "",
    author: item.author ?? "LibraChat",
    authorRole: item.authorRole ?? undefined,
    photo: getPhotoUrl(item.photo ?? null),
    photoPos: item.photoPos ?? undefined,
    readTime: item.readTime ?? 5,
    views: item.views ?? "500",
    tags: Array.isArray(item.tags) ? item.tags : [],
    featured: item.featured ?? false,
    gradient: item.gradient ?? undefined,
  };
}

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (STRAPI_TOKEN) headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  return headers;
}

// ── Запросы ────────────────────────────────────────

export async function fetchStrapiArticles(): Promise<ArticleCard[]> {
  try {
    const url = `${STRAPI_URL}/api/articles?populate=photo&sort=createdAt:desc&pagination[pageSize]=100`;
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(`[Strapi] fetchArticles failed: ${res.status}`);
      return [];
    }

    const json: StrapiResponse<StrapiArticleV5[]> = await res.json();
    return (json.data ?? []).map(mapToArticleCard);
  } catch (err) {
    console.error("[Strapi] fetchArticles error:", err);
    return [];
  }
}

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

    const json: StrapiResponse<StrapiArticleV5[]> = await res.json();
    const item = json.data?.[0];
    if (!item) return null;

    return {
      ...mapToArticleCard(item),
      rawContent: item.content,
    };
  } catch (err) {
    console.error("[Strapi] fetchArticleBySlug error:", err);
    return null;
  }
}

// ── Типы для остальных коллекций ──────────────────

export interface StrapiTestimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  result: string;
  photo: { url: string } | null;
  photoPos: string | null;
  initials: string;
  href: string;
  order: number;
}

export interface StrapiFaq {
  id: number;
  question: string;
  answer: string;
  page: "home" | "pricing" | "both";
  order: number;
}

export interface StrapiFeature {
  id: number;
  title: string;
  desc: string;
  icon: string;
  section: "main" | "security";
  order: number;
}

export interface StrapiPlan {
  id: number;
  planId: string;
  name: string;
  subtitle: string;
  priceMonthly: number;
  priceAnnual: number;
  isPopular: boolean;
  highlight: string | null;
  ctaLabel: string;
  ctaHref: string;
  features: { label: string; ok: boolean }[];
  order: number;
}

async function fetchCollection<T>(endpoint: string): Promise<T[]> {
  try {
    const url = `${STRAPI_URL}/api/${endpoint}?sort=order:asc&pagination[pageSize]=100`;
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.error(`[Strapi] fetch ${endpoint} failed: ${res.status}`);
      return [];
    }
    const json = await res.json();
    return (json.data ?? []) as T[];
  } catch (err) {
    console.error(`[Strapi] fetch ${endpoint} error:`, err);
    return [];
  }
}

export async function fetchStrapiTestimonials(): Promise<StrapiTestimonial[]> {
  const items = await fetchCollection<StrapiTestimonial>("testimonials?populate=photo");
  return items.map((t: any) => ({
    ...t,
    photo: t.photo
      ? {
          url: t.photo.url?.startsWith("http")
            ? t.photo.url
            : `${STRAPI_URL}${t.photo.url}`,
        }
      : null,
  }));
}

export async function fetchStrapiFaqs(page?: "home" | "pricing"): Promise<StrapiFaq[]> {
  const filter = page ? `&filters[page][$in][0]=${page}&filters[page][$in][1]=both` : "";
  try {
    const url = `${STRAPI_URL}/api/faqs?sort=order:asc&pagination[pageSize]=100${filter}`;
    const res = await fetch(url, { headers: buildHeaders(), next: { revalidate: 60 } });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data ?? []) as StrapiFaq[];
  } catch {
    return [];
  }
}

export async function fetchStrapiFeatures(): Promise<StrapiFeature[]> {
  return fetchCollection<StrapiFeature>("features");
}

export async function fetchStrapiPlans(): Promise<StrapiPlan[]> {
  return fetchCollection<StrapiPlan>("plans");
}

// ── SiteText ───────────────────────────────────────

export interface StrapiSiteText {
  id: number;
  key: string;
  value: string | null;
  valueJson: unknown;
  page: string | null;
}

export async function fetchStrapiSiteTexts(
  page?: string
): Promise<Record<string, string>> {
  try {
    const filter = page ? `&filters[page][$eq]=${page}` : "";
    const url = `${STRAPI_URL}/api/site-texts?pagination[pageSize]=200${filter}`;
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};
    const json = await res.json();
    const map: Record<string, string> = {};
    for (const item of json.data ?? []) {
      if (item.key && item.value) map[item.key] = item.value;
    }
    return map;
  } catch {
    return {};
  }
}

// ── Single Types ───────────────────────────────────

export interface StrapiHomePage {
  heroBadge: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroStat1Value: string | null;
  heroStat1Label: string | null;
  heroStat2Value: string | null;
  heroStat2Label: string | null;
  heroStat3Value: string | null;
  heroStat3Label: string | null;
  heroPhrase1: string | null;
  heroPhrase2: string | null;
  heroPhrase3: string | null;
  heroPhrase4: string | null;
  heroPhrase5: string | null;
  heroPhrase6: string | null;
  facetsBadge: string | null;
  facetsTitle: string | null;
  facetsSubtitle: string | null;
  stepsBadge: string | null;
  stepsTitle: string | null;
  stepsSubtitle: string | null;
  step1Title: string | null;
  step1Desc: string | null;
  step2Title: string | null;
  step2Desc: string | null;
  step3Title: string | null;
  step3Desc: string | null;
  socialBadge: string | null;
  socialTitle: string | null;
  faqBadge: string | null;
  faqTitle: string | null;
  faqSubtitle: string | null;
  ctaBadge: string | null;
  ctaTitle: string | null;
}

export interface StrapiFeaturesPage {
  heroBadge: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  deepBadge: string | null;
  deepTitle: string | null;
  deepSubtitle: string | null;
  featuresTitle: string | null;
  featuresSubtitle: string | null;
  securityBadge: string | null;
  securityTitle: string | null;
  securitySubtitle: string | null;
  usecasesBadge: string | null;
  usecasesTitle: string | null;
  usecasesSubtitle: string | null;
  ctaTitle: string | null;
  ctaSubtitle: string | null;
}

export interface StrapiPricingPage {
  heroTitle: string | null;
  heroSubtitle: string | null;
  plansTitle: string | null;
  plansSubtitle: string | null;
  comparisonTitle: string | null;
  faqTitle: string | null;
  faqSubtitle: string | null;
  ctaTitle: string | null;
  ctaSubtitle: string | null;
}

export interface StrapiBusinessPage {
  heroBadge: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  stat1Value: string | null;
  stat1Label: string | null;
  stat2Value: string | null;
  stat2Label: string | null;
  stat3Value: string | null;
  stat3Label: string | null;
  ctaTitle: string | null;
  ctaSubtitle: string | null;
}

async function fetchSingleType<T>(endpoint: string): Promise<T | null> {
  try {
    const url = `${STRAPI_URL}/api/${endpoint}`;
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as T;
  } catch {
    return null;
  }
}

export const fetchHomePage = () => fetchSingleType<StrapiHomePage>("home-page");
export const fetchFeaturesPage = () =>
  fetchSingleType<StrapiFeaturesPage>("features-page");
export const fetchPricingPage = () => fetchSingleType<StrapiPricingPage>("pricing-page");
export const fetchBusinessPage = () =>
  fetchSingleType<StrapiBusinessPage>("business-page");

// ── Business page specific fetches ────────────────

export async function fetchStrapiBusinessFeatures(): Promise<StrapiFeature[]> {
  return fetchCollection<StrapiFeature>("features?filters[page][$eq]=business-features");
}

export async function fetchStrapiBusinessCases(): Promise<StrapiFeature[]> {
  return fetchCollection<StrapiFeature>("features?filters[page][$eq]=business-cases");
}

export async function fetchStrapiBusinessTestimonials(): Promise<StrapiTestimonial[]> {
  try {
    const url = `${STRAPI_URL}/api/testimonials?populate=photo&filters[page][$eq]=business&sort=order:asc&pagination[pageSize]=100`;
    const res = await fetch(url, {
      headers: buildHeaders(),
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json.data ?? []).map((t: any) => ({
      ...t,
      photo: t.photo
        ? {
            url: t.photo.url?.startsWith("http")
              ? t.photo.url
              : `${STRAPI_URL}${t.photo.url}`,
          }
        : null,
    }));
  } catch {
    return [];
  }
}
