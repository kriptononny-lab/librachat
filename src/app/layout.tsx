import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { YandexMetrika } from "@/components/analytics/yandex-metrika";
import "@/styles/globals.css";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
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
    images: ["https://librachat.ai/og-image.png"],
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
          .mobile-cta-btn { display: none; }
          .desktop-nav { display: flex; }
          .desktop-nav-right { display: flex; }
          @media (max-width: 768px) {
            .mobile-burger-btn { display: flex !important; }
            .desktop-nav { display: none !important; }
            .desktop-nav-right { display: none !important; }
            .mobile-cta-btn { display: flex !important; }
          }
        `,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "LibraChat",
              url: "https://librachat.ai",
              description:
                "LibraChat — мощный ИИ-ассистент для работы, учёбы и творчества. Работает без VPN в России и СНГ.",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web, iOS, Android",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "RUB",
                description: "14 дней бесплатно",
              },
              publisher: {
                "@type": "Organization",
                name: "LibraChat",
                url: "https://librachat.ai",
                logo: {
                  "@type": "ImageObject",
                  url: "https://librachat.ai/og-image.png",
                },
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "LibraChat",
              url: "https://librachat.ai",
              description: "ИИ-ассистент без VPN для России и СНГ",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://librachat.ai/learn?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "LibraChat",
              url: "https://librachat.ai",
              logo: "https://librachat.ai/logo.png",
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                email: "support@librachat.kz",
                contactType: "customer support",
                availableLanguage: "Russian",
              },
            }),
          }}
        />
        <GoogleAnalytics />
        <YandexMetrika />
        {children}
      </body>
    </html>
  );
}
