// ===================================================
// Librachat — Глобальные типы
// ===================================================

// --- Навигация ---
export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string; // lucide icon name
  children?: NavItem[];
  isExternal?: boolean;
}

// --- Тарифы ---
export type PlanId = "free" | "pro" | "business";

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  price: {
    monthly: number;
    annual: number;
  };
  features: PlanFeature[];
  cta: {
    label: string;
    href: string;
  };
  isPopular?: boolean;
  isEnterprise?: boolean;
}

export interface PlanFeature {
  label: string;
  included: boolean;
  note?: string;
}

// --- Возможности продукта ---
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  href?: string;
}

// --- Статья / Кейс ---
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  readTime: number;
  category: string;
  author?: Author;
}

export interface Author {
  name: string;
  avatar?: string;
}

// --- Отзыв ---
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  content: string;
  rating?: number;
}

// --- Форма обратной связи ---
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

// --- API-ответы ---
export interface ApiResponse<T = unknown> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: {
    status: number;
    name: string;
    message: string;
  };
}

// --- Общие ---
export type Locale = "ru" | "en";

export interface SeoMeta {
  title: string;
  description: string;
  ogImage?: string;
  noIndex?: boolean;
}
