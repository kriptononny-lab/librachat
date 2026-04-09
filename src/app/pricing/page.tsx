import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PricingClient } from "@/components/sections/pricing-client";

export const metadata: Metadata = {
  title: "Тарифы",
  description:
    "Выберите подходящий тариф LibraChat. Начните бесплатно — обновите план когда будете готовы. Без скрытых платежей.",
  openGraph: {
    title: "Тарифы | LibraChat",
    description: "14 дней бесплатно на любом тарифе. Карта не нужна.",
  },
};

export default function PricingPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main style={{ flex: 1, paddingTop: "68px" }}>
        <PricingClient />
      </main>
      <Footer />
    </div>
  );
}
