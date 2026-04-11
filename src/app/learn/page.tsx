import type { Metadata } from "next";
import { LearnClient } from "./learn-client";
import { fetchStrapiArticles } from "@/lib/strapi";
import { ALL_ARTICLES as STATIC_ARTICLES } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Обучение и кейсы",
  description:
    "Статьи, гайды и кейсы от команды LibraChat. Учитесь быстрее с реальными примерами.",
};

export default async function LearnPage() {
  // Тянем статьи из Strapi; если CMS недоступна — показываем статику
  const strapiArticles = await fetchStrapiArticles();
  const articles = strapiArticles.length > 0 ? strapiArticles : STATIC_ARTICLES;

  return <LearnClient articles={articles} />;
}
