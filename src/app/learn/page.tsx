import type { Metadata } from "next";
import { LearnClient } from "./learn-client";
import { fetchStrapiArticles } from "@/lib/strapi";
import { ALL_ARTICLES as STATIC_ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Статьи и кейсы LibraChat",
  description:
    "Статьи, гайды и кейсы от команды LibraChat. Учитесь работать с ИИ быстрее на реальных примерах.",
  openGraph: {
    title: "Статьи и кейсы LibraChat",
    description: "Гайды, кейсы и обучающие материалы по работе с ИИ-ассистентом.",
    url: "https://librachat.ai/learn",
    siteName: "LibraChat",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "LibraChat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Статьи и кейсы LibraChat",
    description: "Гайды, кейсы и обучающие материалы по работе с ИИ-ассистентом.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://librachat.ai/learn",
  },
};

export default async function LearnPage() {
  // Тянем статьи из Strapi; если CMS недоступна — показываем статику
  const strapiArticles = await fetchStrapiArticles();
  const articles = strapiArticles.length > 0 ? strapiArticles : STATIC_ARTICLES;

  return <LearnClient articles={articles} />;
}
