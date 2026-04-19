import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { YandexMetrika } from "@/components/analytics/yandex-metrika";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://librachat.ai"),
  title: {
    default: "Librachat — ИИ-ассистент нового поколения",
    template: "%s | Librachat",
  },
  description:
    "Librachat — мощный ИИ-ассистент для работы, обучения и творчества. Попробуйте бесплатно.",
  keywords: ["ИИ", "AI", "чат-бот", "ассистент", "нейросеть", "Librachat"],
  authors: [{ name: "Librachat" }],
  creator: "Librachat",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://librachat.ai",
    siteName: "Librachat",
    title: "Librachat — ИИ-ассистент нового поколения",
    description: "Мощный ИИ-ассистент для работы, обучения и творчества.",
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
    title: "Librachat — ИИ-ассистент нового поколения",
    description: "Мощный ИИ-ассистент для работы, обучения и творчества.",
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
