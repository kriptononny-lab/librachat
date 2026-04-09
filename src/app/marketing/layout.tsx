import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/**
 * Лейаут для маркетинговых страниц:
 * шапка + основной контент + подвал
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1 pt-[68px]">{children}</main>
      <Footer />
    </div>
  );
}
