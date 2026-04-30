import type { Metadata } from "next";

// ─── Типы ──────────────────────────────────────────────────────────────────

/**
 * SEO-данные из shared.seo компонента Strapi.
 * Все поля опциональны — если пусто, используются fallback-значения.
 */
export interface StrapiSeo {
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: { url: string } | null;
  canonicalUrl?: string | null;
  noIndex?: boolean | null;
}

/**
 * Параметры для buildMetadata.
 * fallback* — значения по умолчанию, если в CMS пусто.
 * url — канонический URL страницы.
 * type — тип OG (website для обычных страниц, article для статей).
 */
export interface BuildMetadataInput {
  seo?: StrapiSeo | null;
  fallbackTitle: string;
  fallbackDescription: string;
  url: string;
  type?: "website" | "article";
  /** Дополнительные ключи (необязательно) — например, заголовок статьи как fallback для seoTitle. */
  contentTitle?: string | null;
  contentDescription?: string | null;
  contentImage?: string | null;
}

// ─── Константы ─────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://librachat.ai";
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "https://librachat-cms.onrender.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

// ─── Хелперы ───────────────────────────────────────────────────────────────

/**
 * Превращает относительный URL картинки из Strapi в абсолютный.
 */
function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * Берёт первое непустое значение из списка кандидатов.
 */
function firstNonEmpty(...candidates: (string | null | undefined)[]): string | undefined {
  for (const c of candidates) {
    if (c && c.trim().length > 0) return c.trim();
  }
  return undefined;
}

// ─── Основная функция ─────────────────────────────────────────────────────

/**
 * Собирает Next.js-объект Metadata из SEO-данных Strapi с умными fallback'ами.
 *
 * Приоритет полей:
 *   title:       seo.seoTitle → contentTitle → fallbackTitle
 *   description: seo.seoDescription → contentDescription → fallbackDescription
 *   ogTitle:     seo.ogTitle → seo.seoTitle → contentTitle → fallbackTitle
 *   ogDesc:      seo.ogDescription → seo.seoDescription → contentDescription → fallbackDescription
 *   ogImage:     seo.ogImage → contentImage → DEFAULT_OG_IMAGE
 *   canonical:   seo.canonicalUrl → url
 *   noIndex:     seo.noIndex → false
 *
 * @example
 *   export async function generateMetadata(): Promise<Metadata> {
 *     const page = await fetchHomePage();
 *     return buildMetadata({
 *       seo: page?.seo,
 *       fallbackTitle: "LibraChat — ИИ-ассистент без VPN",
 *       fallbackDescription: "Анализ файлов, тексты, перевод, код...",
 *       url: "https://librachat.ai",
 *     });
 *   }
 */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    seo,
    fallbackTitle,
    fallbackDescription,
    url,
    type = "website",
    contentTitle,
    contentDescription,
    contentImage,
  } = input;

  // Title
  const title =
    firstNonEmpty(seo?.seoTitle, contentTitle, fallbackTitle) ?? fallbackTitle;

  // Description
  const description =
    firstNonEmpty(seo?.seoDescription, contentDescription, fallbackDescription) ??
    fallbackDescription;

  // OG title / description (могут отличаться от seo*)
  const ogTitle =
    firstNonEmpty(seo?.ogTitle, seo?.seoTitle, contentTitle, fallbackTitle) ?? title;
  const ogDescription =
    firstNonEmpty(
      seo?.ogDescription,
      seo?.seoDescription,
      contentDescription,
      fallbackDescription
    ) ?? description;

  // OG image
  const ogImageFromCms = resolveImageUrl(seo?.ogImage?.url);
  const ogImage = ogImageFromCms ?? contentImage ?? DEFAULT_OG_IMAGE;

  // Canonical
  const canonical = firstNonEmpty(seo?.canonicalUrl, url) ?? url;

  // Keywords
  const keywords = seo?.seoKeywords
    ? seo.seoKeywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    : undefined;

  // noindex
  const robots = seo?.noIndex
    ? { index: false, follow: false }
    : { index: true, follow: true };

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    robots,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: "LibraChat",
      locale: "ru_RU",
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
  };
}

// ─── JSON-LD хелперы ──────────────────────────────────────────────────────

/**
 * Article schema для статей и кейсов.
 * Используется в /learn/[slug].
 */
export function articleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  image?: string | null;
  author: string;
  authorRole?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: opts.image ?? DEFAULT_OG_IMAGE,
    datePublished: opts.datePublished ?? new Date().toISOString(),
    dateModified: opts.dateModified ?? opts.datePublished ?? new Date().toISOString(),
    author: {
      "@type": "Person",
      name: opts.author,
      ...(opts.authorRole && { jobTitle: opts.authorRole }),
    },
    publisher: {
      "@type": "Organization",
      name: "LibraChat",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": opts.url,
    },
  };
}

/**
 * FAQPage schema — для страниц с FAQ-блоком.
 * Даёт rich snippets в Google (раскрывающиеся вопросы прямо в выдаче).
 */
export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/**
 * BreadcrumbList schema — для всех внутренних страниц.
 */
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Product / Offer schema для тарифов на /pricing.
 * Помогает Google показать цену прямо в выдаче.
 */
export function productJsonLd(
  plans: {
    name: string;
    description: string;
    priceMonthly: number;
    url: string;
  }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "LibraChat — ИИ-ассистент",
    description: "ИИ-ассистент для работы, учёбы и творчества. Работает без VPN.",
    brand: {
      "@type": "Brand",
      name: "LibraChat",
    },
    offers: plans.map((p) => ({
      "@type": "Offer",
      name: p.name,
      description: p.description,
      price: p.priceMonthly.toString(),
      priceCurrency: "RUB",
      url: p.url,
      availability: "https://schema.org/InStock",
    })),
  };
}

/**
 * Удобный компонент-обёртка для вывода JSON-LD в JSX.
 * Используется так:
 *   <JsonLd data={articleJsonLd({...})} />
 */
export function jsonLdScript(data: unknown): { __html: string } {
  return { __html: JSON.stringify(data) };
}
