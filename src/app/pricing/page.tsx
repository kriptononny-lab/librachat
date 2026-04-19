import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PricingClient } from "@/components/sections/pricing-client";
import { fetchStrapiPlans, fetchStrapiFaqs, fetchPricingPage } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Тарифы и планы подписки — выбери подходящий",
  description:
    "Выберите подходящий тариф LibraChat. Начните бесплатно на 14 дней — обновите план когда будете готовы. Без скрытых платежей и обязательств.",
  openGraph: {
    title: "Тарифы LibraChat — начни бесплатно",
    description: "14 дней бесплатно на любом тарифе. Карта не нужна.",
    url: "https://librachat.ai/pricing",
    siteName: "LibraChat",
    locale: "ru_RU",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "LibraChat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Тарифы LibraChat — начни бесплатно",
    description: "14 дней бесплатно на любом тарифе. Карта не нужна.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://librachat.ai/pricing",
  },
};

export default async function PricingPage() {
  const [plans, faqs, page] = await Promise.all([
    fetchStrapiPlans(),
    fetchStrapiFaqs("pricing"),
    fetchPricingPage(),
  ]);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main style={{ flex: 1, paddingTop: "68px" }}>
        <PricingClient plans={plans} faqs={faqs} page={page} />
      </main>
      <Footer />
    </div>
  );
}
