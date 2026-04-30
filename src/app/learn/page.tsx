import type { Metadata } from "next";
import { LearnClient } from "./learn-client";
import { fetchStrapiArticles, fetchLearnPage } from "@/lib/strapi";
import { ALL_ARTICLES as STATIC_ARTICLES } from "@/lib/articles";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

const FALLBACK_TITLE = "Статьи, гайды и кейсы по работе с ИИ-ассистентом";
const FALLBACK_DESC =
  "Практические статьи, пошаговые гайды и реальные кейсы от команды LibraChat. Узнайте как работать с ИИ-ассистентом быстрее и эффективнее — без лишних слов.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchLearnPage();
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESC,
    url: "https://librachat.ai/learn",
    type: "website",
  });
}

const LEARN_BREADCRUMBS = breadcrumbJsonLd([
  { name: "Главная", url: "https://librachat.ai" },
  { name: "Обучение", url: "https://librachat.ai/learn" },
]);

export default async function LearnPage() {
  // Тянем статьи из Strapi; если CMS недоступна — показываем статику
  const [strapiArticles, learnPage] = await Promise.all([
    fetchStrapiArticles(),
    fetchLearnPage(),
  ]);
  const articles = strapiArticles.length > 0 ? strapiArticles : STATIC_ARTICLES;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(LEARN_BREADCRUMBS)}
      />
      <LearnClient articles={articles} learnPage={learnPage} />
    </>
  );
}
