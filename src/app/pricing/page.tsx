import type { Metadata } from "next";
import { ServerHeader } from "@/components/layout/server-header";
import { Footer } from "@/components/layout/footer";
import { PricingClient } from "@/components/sections/pricing-client";
import { fetchStrapiPlans, fetchStrapiFaqs, fetchPricingPage } from "@/lib/strapi";
import {
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  productJsonLd,
  jsonLdScript,
} from "@/lib/seo";

const FALLBACK_TITLE = "Тарифы и планы подписки — выбери подходящий";
const FALLBACK_DESC =
  "Выберите подходящий тариф LibraChat. Начните бесплатно на 14 дней — обновите план когда будете готовы. Без скрытых платежей и обязательств.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await fetchPricingPage();
  return buildMetadata({
    seo: page?.seo,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: FALLBACK_DESC,
    url: "https://librachat.ai/pricing",
    type: "website",
  });
}

const PRICING_BREADCRUMBS = breadcrumbJsonLd([
  { name: "Главная", url: "https://librachat.ai" },
  { name: "Тарифы", url: "https://librachat.ai/pricing" },
]);

export default async function PricingPage() {
  const [plans, faqs, page] = await Promise.all([
    fetchStrapiPlans(),
    fetchStrapiFaqs("pricing"),
    fetchPricingPage(),
  ]);

  const faqLd =
    faqs.length > 0
      ? faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answer })))
      : null;

  const productLd =
    plans.length > 0
      ? productJsonLd(
          plans.map((p) => ({
            name: p.name,
            description: p.subtitle ?? "",
            priceMonthly: p.priceMonthly,
            url: "https://librachat.ai/pricing",
          }))
        )
      : null;

  return (
    <div className="flex min-h-dvh flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(PRICING_BREADCRUMBS)}
      />
      {productLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(productLd)}
        />
      )}
      {faqLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(faqLd)}
        />
      )}
      <ServerHeader />
      <main style={{ flex: 1, paddingTop: "68px" }}>
        <PricingClient plans={plans} faqs={faqs} page={page} />
      </main>
      <Footer />
    </div>
  );
}
