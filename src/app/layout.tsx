import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { YandexMetrika } from "@/components/analytics/yandex-metrika";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://librachat.ai"),
  title: {
    default: "LibraChat — первый российский ИИ-ассистент без VPN",
    template: "%s | LibraChat",
  },
  description:
    "LibraChat — мощный ИИ-ассистент для работы, учёбы и творчества. Анализирует файлы, пишет тексты, переводит и программирует. Работает без VPN. Попробуй бесплатно 14 дней.",
  keywords: [
    "ИИ",
    "AI",
    "ИИ-ассистент",
    "чат-бот",
    "нейросеть",
    "LibraChat",
    "без VPN",
    "искусственный интеллект",
  ],
  authors: [{ name: "Librachat" }],
  creator: "Librachat",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://librachat.ai",
    siteName: "LibraChat",
    title: "LibraChat — первый российский ИИ-ассистент без VPN",
    description:
      "Анализ файлов, тексты, перевод, код — всё в одном чате без VPN. 14 дней бесплатно.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Librachat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LibraChat — первый российский ИИ-ассистент без VPN",
    description:
      "Анализ файлов, тексты, перевод, код — всё в одном чате без VPN. 14 дней бесплатно.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .mobile-burger-btn { display: none !important; }
          .desktop-nav { display: flex; }
          .desktop-nav-right { display: flex; }
          @media (max-width: 768px) {
            .mobile-burger-btn { display: flex !important; }
            .desktop-nav { display: none !important; }
            .desktop-nav-right { display: none !important; }
          }
        `,
          }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <YandexMetrika />
        {children}
      </body>
    </html>
  );
}
