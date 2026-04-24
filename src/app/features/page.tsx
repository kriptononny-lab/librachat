import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquare,
  FileText,
  Languages,
  PenLine,
  Code2,
  Shield,
  Puzzle,
  Smartphone,
  Check,
  ArrowRight,
  Lock,
  Eye,
  Server,
  Rocket,
  TrendingUp,
  Lightbulb,
  BarChart2,
  Globe,
} from "lucide-react";
import { ServerHeader } from "@/components/layout/server-header";
import { Footer } from "@/components/layout/footer";
import {
  fetchStrapiFeatures,
  fetchFeaturesPage,
  fetchStrapiFeatureBlocks,
} from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Возможности LibraChat — 8 инструментов в одном чате",
  description:
    "Всё что нужно для работы и жизни — в одном чате. Анализ файлов, написание текстов, перевод, код и многое другое — без переключений между десятками сервисов.",
  openGraph: {
    title: "Возможности LibraChat — 8 инструментов в одном чате",
    description: "Анализ файлов, тексты, перевод, код — всё в одном окне без VPN.",
    url: "https://librachat.ai/features",
    siteName: "LibraChat",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "https://librachat.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "LibraChat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Возможности LibraChat — 8 инструментов в одном чате",
    description: "Анализ файлов, тексты, перевод, код — всё в одном окне без VPN.",
    images: ["https://librachat.ai/og-image.png"],
  },
  alternates: {
    canonical: "https://librachat.ai/features",
  },
};

const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare,
  FileText,
  Languages,
  PenLine,
  Code2,
  Shield,
  Puzzle,
  Smartphone,
  Lock,
  Eye,
  Server,
};

const STATIC_FEATURES = [
  {
    icon: "MessageSquare",
    title: "Умный диалог",
    desc: "Запоминает контекст и отвечает с учётом предыдущих сообщений.",
    section: "main",
  },
  {
    icon: "FileText",
    title: "Работа с файлами",
    desc: "PDF, таблицы, презентации — анализирует и даёт точные ответы.",
    section: "main",
  },
  {
    icon: "Languages",
    title: "Переводчик",
    desc: "Точный перевод на 50+ языков с сохранением стиля текста.",
    section: "main",
  },
  {
    icon: "PenLine",
    title: "Генерация текста",
    desc: "Письма, посты, статьи — любой стиль и объём за секунды.",
    section: "main",
  },
  {
    icon: "Code2",
    title: "Помощь с кодом",
    desc: "Пишет, объясняет, дебажит — любой язык программирования.",
    section: "main",
  },
  {
    icon: "Shield",
    title: "Безопасность",
    desc: "Данные зашифрованы и не передаются третьим лицам.",
    section: "main",
  },
  {
    icon: "Puzzle",
    title: "Интеграции",
    desc: "API, Slack, Teams, Notion, 1C и другие корпоративные системы.",
    section: "main",
  },
  {
    icon: "Smartphone",
    title: "Мобильное приложение",
    desc: "iOS и Android — всегда рядом, без VPN и без настроек.",
    section: "main",
  },
  {
    icon: "Lock",
    title: "Шифрование данных",
    desc: "Все переданные данные шифруются по стандарту AES-256. Никто, кроме тебя, не имеет доступа к переписке.",
    section: "security",
  },
  {
    icon: "Eye",
    title: "Мы не обучаемся на твоих данных",
    desc: "Твои запросы и файлы не используются для обучения модели. Это зафиксировано в договоре.",
    section: "security",
  },
  {
    icon: "Server",
    title: "Данные хранятся в России",
    desc: "Серверы расположены на территории России, что соответствует требованиям 152-ФЗ о персональных данных.",
    section: "security",
  },
  {
    icon: "Shield",
    title: "Без передачи третьим лицам",
    desc: "Мы не продаём и не передаём твои данные рекламным сетям, аналитическим платформам или другим компаниям.",
    section: "security",
  },
];

function ChatMockup() {
  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "20px",
        background: "rgba(13,13,26,0.97)",
        border: "1px solid rgba(255,255,255,0.08)",
        width: "100%",
        maxWidth: "380px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
          paddingBottom: "12px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "#A78BFA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          L
        </div>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#fff" }}>
          LibraChat
        </span>
        <span
          style={{
            marginLeft: "auto",
            fontSize: "11px",
            padding: "2px 8px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.06)",
            color: "#9CA3B8",
          }}
        >
          онлайн
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              maxWidth: "80%",
              padding: "10px 14px",
              borderRadius: "16px 16px 4px 16px",
              fontSize: "13px",
              color: "#fff",
              background: "rgba(167,139,250,0.18)",
            }}
          >
            Составь КП для нового клиента
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: "#A78BFA",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 700,
              color: "#fff",
              flexShrink: 0,
            }}
          >
            L
          </div>
          <div
            style={{
              maxWidth: "80%",
              padding: "10px 14px",
              borderRadius: "4px 16px 16px 16px",
              fontSize: "13px",
              color: "#9CA3B8",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            Конечно! Уточни: для какой сферы клиент, какой продукт и бюджет?
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "14px",
          padding: "10px 14px",
          borderRadius: "12px",
          fontSize: "12px",
          color: "#6B7280",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        Напишите сообщение...
      </div>
    </div>
  );
}

function FilesMockup() {
  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "20px",
        background: "rgba(13,13,26,0.97)",
        border: "1px solid rgba(255,255,255,0.08)",
        width: "100%",
        maxWidth: "380px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
          paddingBottom: "12px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "#A78BFA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          L
        </div>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#fff" }}>
          LibraChat
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        {[
          { name: "Отчёт_Q2_2024.pdf", size: "4.3 МБ", color: "#A78BFA" },
          { name: "Продажи_итог.xlsx", size: "1.2 МБ", color: "#A78BFA" },
        ].map((f) => (
          <div
            key={f.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 12px",
              borderRadius: "12px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "8px",
                background: f.color + "22",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <FileText size={15} color={f.color} />
            </div>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 500, color: "#fff" }}>{f.name}</p>
              <p style={{ fontSize: "11px", color: "#9CA3B8" }}>{f.size}</p>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "10px 14px",
          borderRadius: "12px",
          fontSize: "13px",
          color: "#9CA3B8",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          lineHeight: 1.6,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <TrendingUp size={13} color="#A78BFA" style={{ flexShrink: 0 }} /> Рост выручки
          на 23% в Q2. Основные драйверы: продуктовая линейка B и расширение в регионы...
        </span>
      </div>
    </div>
  );
}

function ContentMockup() {
  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "20px",
        background: "rgba(13,13,26,0.97)",
        border: "1px solid rgba(255,255,255,0.08)",
        width: "100%",
        maxWidth: "380px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "16px",
          paddingBottom: "12px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "#A78BFA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "11px",
            fontWeight: 700,
            color: "#fff",
          }}
        >
          L
        </div>
        <span style={{ fontSize: "14px", fontWeight: 500, color: "#fff" }}>
          LibraChat
        </span>
      </div>
      <div
        style={{
          padding: "10px 14px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.08)",
          marginBottom: "10px",
          fontSize: "13px",
          color: "#F0EEFF",
          alignSelf: "flex-end",
          marginLeft: "auto",
          display: "inline-block",
        }}
      >
        Напиши пост про запуск нового продукта
      </div>
      <div
        style={{
          padding: "12px 14px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          fontSize: "13px",
          color: "#9CA3B8",
          lineHeight: 1.7,
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            marginBottom: "4px",
          }}
        >
          <Rocket size={14} color="#A78BFA" />{" "}
          <strong style={{ color: "#F0EEFF" }}>Мы запустили!</strong>
        </span>
        <br />
        Наш новый продукт уже доступен. Мы долго шли к этому — и вот он здесь. Попробуй
        первым и расскажи что думаешь.
      </div>
    </div>
  );
}

function CodeMockup() {
  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "20px",
        background: "rgba(8,8,16,0.99)",
        border: "1px solid rgba(255,255,255,0.08)",
        width: "100%",
        maxWidth: "380px",
        fontFamily: "monospace",
      }}
    >
      <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
        {[
          "rgba(255,255,255,0.35)",
          "rgba(255,255,255,0.18)",
          "rgba(255,255,255,0.08)",
        ].map((c) => (
          <div
            key={c}
            style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }}
          />
        ))}
      </div>
      {[
        { text: "function getTotal(items) {", color: "#C4B5FD" },
        { text: "  return items.reduce((sum, i)", color: "#9CA3B8" },
        { text: "    => sum + i.price, 0);", color: "#9CA3B8" },
        { text: "}", color: "#C4B5FD" },
      ].map((line, i) => (
        <div key={i} style={{ fontSize: "12px", color: line.color, lineHeight: 1.8 }}>
          {line.text}
        </div>
      ))}
      <div
        style={{
          marginTop: "12px",
          padding: "8px 12px",
          borderRadius: "8px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          fontSize: "12px",
          color: "#9CA3B8",
        }}
      >
        ✓ Функция корректна. Можно добавить проверку на пустой массив...
      </div>
    </div>
  );
}

function TranslateMockup() {
  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "20px",
        background: "rgba(13,13,26,0.97)",
        border: "1px solid rgba(255,255,255,0.08)",
        width: "100%",
        maxWidth: "380px",
      }}
    >
      <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
        {["Русский", "English"].map((lang, i) => (
          <div
            key={lang}
            style={{
              padding: "4px 12px",
              borderRadius: "999px",
              fontSize: "12px",
              fontWeight: 500,
              background: i === 0 ? "rgba(255,255,255,0.08)" : "transparent",
              color: i === 0 ? "#F0EEFF" : "#6B7280",
              border: `1px solid ${i === 0 ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            {lang}
          </div>
        ))}
      </div>
      <div
        style={{
          padding: "12px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.04)",
          marginBottom: "8px",
          fontSize: "13px",
          color: "#9CA3B8",
          lineHeight: 1.6,
        }}
      >
        Коммерческое предложение для вашей компании...
      </div>
      <div
        style={{
          padding: "12px",
          borderRadius: "10px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
          fontSize: "13px",
          color: "#F0EEFF",
          lineHeight: 1.6,
        }}
      >
        Commercial proposal for your company...
      </div>
    </div>
  );
}

function DataMockup() {
  return (
    <div
      style={{
        borderRadius: "20px",
        padding: "20px",
        background: "rgba(13,13,26,0.97)",
        border: "1px solid rgba(255,255,255,0.08)",
        width: "100%",
        maxWidth: "380px",
      }}
    >
      <div
        style={{
          marginBottom: "14px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "13px",
          fontWeight: 600,
          color: "#F0EEFF",
        }}
      >
        <BarChart2 size={14} color="#A78BFA" /> Анализ продаж Q2
      </div>
      {[
        { label: "Выручка", val: "+23%", w: "85%" },
        { label: "Конверсия", val: "+8%", w: "60%" },
        { label: "Возвраты", val: "−5%", w: "35%" },
      ].map((r) => (
        <div key={r.label} style={{ marginBottom: "10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "4px",
              fontSize: "12px",
              color: "#9CA3B8",
            }}
          >
            <span>{r.label}</span>
            <span style={{ color: r.val.startsWith("+") ? "#A78BFA" : "#F472B6" }}>
              {r.val}
            </span>
          </div>
          <div
            style={{
              height: "6px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.06)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: r.w,
                borderRadius: "999px",
                background: "linear-gradient(90deg,#7B2FBE,#A78BFA)",
              }}
            />
          </div>
        </div>
      ))}
      <div
        style={{
          marginTop: "12px",
          padding: "8px 12px",
          borderRadius: "8px",
          background: "rgba(255,255,255,0.04)",
          fontSize: "12px",
          color: "#9CA3B8",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <Lightbulb size={13} color="#A78BFA" style={{ flexShrink: 0 }} /> Основной
          драйвер роста — регион Сибирь и продукт B
        </span>
      </div>
    </div>
  );
}

const S = {
  sec: (bg = "#040408") =>
    ({
      padding: "100px 0",
      background: bg,
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }) as React.CSSProperties,
  h2: {
    fontSize: "clamp(26px, 3vw, 42px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1.15,
    color: "#F0EEFF",
  } as React.CSSProperties,
  sub: {
    fontSize: "16px",
    color: "#9CA3B8",
    lineHeight: 1.65,
    maxWidth: "480px",
    margin: "12px auto 0",
  } as React.CSSProperties,
};

export default async function FeaturesPage() {
  const [strapiFeatures, page, featureBlocks] = await Promise.all([
    fetchStrapiFeatures(),
    fetchFeaturesPage(),
    fetchStrapiFeatureBlocks("features"),
  ]);
  const features =
    strapiFeatures.length > 0
      ? strapiFeatures.map((f) => ({
          icon: f.icon,
          title: f.title,
          desc: f.desc,
          section: f.section,
        }))
      : STATIC_FEATURES;

  const ALL_FEATURES = features.filter((f) => f.section === "main");
  const SECURITY = features.filter((f) => f.section === "security");
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100dvh",
        flexDirection: "column",
        background: "#040408",
      }}
    >
      <ServerHeader />
      <main style={{ flex: 1, paddingTop: "68px" }}>
        {/* Hero */}
        <section
          style={{
            padding: "80px 0 60px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%) translateY(-40%)",
              width: "700px",
              height: "500px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(167,139,250,0.12),transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            className="container-site"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
              position: "relative",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 60px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "#F0EEFF",
                maxWidth: "800px",
                width: "100%",
                textAlign: "center",
              }}
            >
              Всё что нужно для работы и жизни —{" "}
              <span className="text-gradient">в одном чате</span>
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: "#9CA3B8",
                maxWidth: "640px",
                width: "100%",
                lineHeight: 1.7,
                textAlign: "center",
              }}
            >
              LibraChat отвечает на вопросы, анализирует файлы, переводит, пишет и думает
              вместе с тобой. Без переключений между сервисами.
            </p>
            <div
              className="btn-pair"
              style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                justifyContent: "center",
                width: "100%",
                padding: "0 16px",
              }}
            >
              <Link
                href={page?.ctaBtnUrl ?? "https://librachat.kz/auth"}
                style={{
                  padding: "13px 28px",
                  borderRadius: "999px",
                  background: "#A78BFA",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 20px rgba(167,139,250,0.4)",
                  flex: "1 1 auto",
                  textAlign: "center",
                  minWidth: "180px",
                  maxWidth: "260px",
                }}
              >
                Попробовать
              </Link>
            </div>
          </div>
        </section>

        {/* Глубокие возможности */}
        <section style={S.sec("#080810")}>
          <div className="container-site">
            <div style={{ textAlign: "center", marginBottom: "72px" }}>
              <div className="section-badge" style={{ marginBottom: "14px" }}>
                <span className="badge-dot" />
                {page?.deepBadge ?? "ТВОЙ ИИ-ПОМОЩНИК"}
              </div>
              <h2 style={S.h2}>{page?.featuresTitle ?? "Всё в одном окне"}</h2>
              <p style={S.sub}>
                {page?.featuresSubtitle ??
                  "8 инструментов — не нужно переключаться между сервисами"}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "96px" }}>
              {(featureBlocks.length > 0
                ? featureBlocks.map((fb) => ({
                    badge: fb.badge ?? "",
                    title: fb.title ?? "",
                    desc: fb.subtitle ?? "",
                    points: Array.isArray(fb.bullets) ? (fb.bullets as string[]) : [],
                    mockup: fb.mockup ?? "chat",
                  }))
                : ([
                    {
                      badge: page?.feat1Badge ?? "УМНЫЙ ДИАЛОГ",
                      title:
                        page?.feat1Title ?? "Отвечает на любые вопросы — понятно и точно",
                      desc:
                        page?.feat1Subtitle ??
                        "LibraChat понимает контекст, помнит историю диалога и адаптирует ответы.",
                      points: Array.isArray(page?.feat1Bullets)
                        ? (page.feat1Bullets as string[])
                        : [],
                      mockup: "chat",
                    },
                    {
                      badge: page?.feat2Badge ?? "РАБОТА С ФАЙЛАМИ",
                      title:
                        page?.feat2Title ?? "Анализирует документы и данные за секунды",
                      desc:
                        page?.feat2Subtitle ??
                        "Загрузи PDF, таблицу или презентацию — LibraChat прочитает, выделит главное.",
                      points: Array.isArray(page?.feat2Bullets)
                        ? (page.feat2Bullets as string[])
                        : [],
                      mockup: "files",
                    },
                    {
                      badge: page?.feat3Badge ?? "ГЕНЕРАЦИЯ КОНТЕНТА",
                      title:
                        page?.feat3Title ??
                        "Пишет тексты любого формата — быстро и по делу",
                      desc:
                        page?.feat3Subtitle ??
                        "Посты, статьи, письма, сценарии — LibraChat создаёт контент с нужным тоном.",
                      points: Array.isArray(page?.feat3Bullets)
                        ? (page.feat3Bullets as string[])
                        : [],
                      mockup: "content",
                    },
                    {
                      badge: page?.feat4Badge ?? "КОД И РАЗРАБОТКА",
                      title: page?.feat4Title ?? "Помогает с кодом на любом языке",
                      desc:
                        page?.feat4Subtitle ??
                        "Пишет, объясняет, исправляет и оптимизирует код.",
                      points: Array.isArray(page?.feat4Bullets)
                        ? (page.feat4Bullets as string[])
                        : [],
                      mockup: "code",
                    },
                    {
                      badge: page?.feat5Badge ?? "ПЕРЕВОД",
                      title:
                        page?.feat5Title ?? "Переводит точно и сохраняет стиль текста",
                      desc:
                        page?.feat5Subtitle ??
                        "Не просто переводит слова — передаёт смысл, тон и контекст.",
                      points: Array.isArray(page?.feat5Bullets)
                        ? (page.feat5Bullets as string[])
                        : [],
                      mockup: "translate",
                    },
                    {
                      badge: page?.feat6Badge ?? "АНАЛИЗ ДАННЫХ",
                      title: page?.feat6Title ?? "Превращает таблицы в понятные выводы",
                      desc:
                        page?.feat6Subtitle ??
                        "Загрузи Excel или CSV — LibraChat найдёт закономерности и тренды.",
                      points: Array.isArray(page?.feat6Bullets)
                        ? (page.feat6Bullets as string[])
                        : [],
                      mockup: "data",
                    },
                  ] as {
                    badge: string;
                    title: string;
                    desc: string;
                    points: string[];
                    mockup: string;
                  }[])
              ).map((feat, i) => (
                <div
                  key={feat.badge}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                    gap: "40px",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      order: i % 2 === 1 ? 2 : 1,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {feat.mockup === "chat" ? (
                      <ChatMockup />
                    ) : feat.mockup === "files" ? (
                      <FilesMockup />
                    ) : feat.mockup === "content" ? (
                      <ContentMockup />
                    ) : feat.mockup === "code" ? (
                      <CodeMockup />
                    ) : feat.mockup === "translate" ? (
                      <TranslateMockup />
                    ) : (
                      <DataMockup />
                    )}
                  </div>
                  <div
                    style={{
                      order: i % 2 === 1 ? 1 : 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                    }}
                  >
                    <div className="section-badge" style={{ width: "fit-content" }}>
                      <span className="badge-dot" />
                      {feat.badge}
                    </div>
                    <h3
                      style={{
                        fontSize: "clamp(22px, 2.5vw, 32px)",
                        fontWeight: 800,
                        lineHeight: 1.25,
                        color: "#F0EEFF",
                      }}
                    >
                      {feat.title}
                    </h3>
                    <p style={{ fontSize: "15px", color: "#9CA3B8", lineHeight: 1.75 }}>
                      {feat.desc}
                    </p>
                    <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {feat.points.map((pt) => (
                        <li
                          key={pt}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            fontSize: "14px",
                            color: "#9CA3B8",
                            lineHeight: 1.6,
                            listStyle: "none",
                          }}
                        >
                          <Check
                            size={15}
                            color="#F472B6"
                            style={{ flexShrink: 0, marginTop: "3px" }}
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Как во мне защищены данные — из PDF */}
        <section style={S.sec("#080810")}>
          <div className="container-site">
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div className="section-badge" style={{ marginBottom: "14px" }}>
                <span className="badge-dot" />
                БЕЗОПАСНОСТЬ
              </div>
              <h2 style={S.h2}>{page?.securityTitle ?? "Как во мне защищены данные"}</h2>
              <p style={S.sub}>
                {page?.securitySubtitle ??
                  "Твои файлы и запросы — только твои. Никаких компромиссов."}
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "16px",
              }}
            >
              {SECURITY.map(({ icon, title, desc }) => {
                const Icon = ICON_MAP[icon] ?? Shield;
                return (
                  <div
                    key={title}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      padding: "28px 24px",
                      borderRadius: "20px",
                      background: "rgba(13,13,26,0.88)",
                      border: "1px solid rgba(167,139,250,0.15)",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "14px",
                        background: "rgba(167,139,250,0.1)",
                        border: "1px solid rgba(167,139,250,0.22)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={20} color="#C4B5FD" />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: "15px",
                          fontWeight: 700,
                          color: "#F0EEFF",
                          marginBottom: "8px",
                          lineHeight: 1.3,
                        }}
                      >
                        {title}
                      </h3>
                      <p style={{ fontSize: "14px", color: "#9CA3B8", lineHeight: 1.7 }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              style={{
                marginTop: "32px",
                padding: "24px 32px",
                borderRadius: "16px",
                background: "rgba(167,139,250,0.06)",
                border: "1px solid rgba(167,139,250,0.18)",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "14px", color: "#9CA3B8", lineHeight: 1.7 }}>
                Соответствует требованиям{" "}
                <strong style={{ color: "#F0EEFF" }}>152-ФЗ</strong> о персональных
                данных. Подробнее —{" "}
                <Link
                  href="/privacy"
                  style={{ color: "#C4B5FD", textDecoration: "none" }}
                >
                  в политике конфиденциальности
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Сферы применения */}
        <section style={S.sec()}>
          <div className="container-site">
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <div className="section-badge" style={{ marginBottom: "14px" }}>
                <span className="badge-dot" />
                {page?.usecasesBadge ?? "ДЛЯ КОГО"}
              </div>
              <h2 style={S.h2}>{page?.usecasesTitle ?? "Решает задачи любой сферы"}</h2>
              <p style={S.sub}>
                {page?.usecasesSubtitle ?? "Настроен под разные рабочие сценарии"}
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              {[
                {
                  icon: <MessageSquare size={20} color="#C4B5FD" />,
                  title: page?.usecase1Title ?? "Анализ и отчёты",
                  desc:
                    page?.usecase1Desc ??
                    "Загружай документы — LibraChat анализирует и создаёт профессиональные отчёты за секунды.",
                  stat: page?.usecase1Stat ?? "Экономия: 3–4 часа",
                  href: page?.usecase1Href ?? "/business",
                },
                {
                  icon: <PenLine size={20} color="#C4B5FD" />,
                  title: page?.usecase2Title ?? "Переписка и документы",
                  desc:
                    page?.usecase2Desc ??
                    "Деловые письма, контракты, презентации — создавай профессиональные тексты с нужным стилем.",
                  stat: page?.usecase2Stat ?? "Скорость: x5",
                  href: page?.usecase2Href ?? "/business",
                },
                {
                  icon: <Puzzle size={20} color="#C4B5FD" />,
                  title: page?.usecase3Title ?? "Поддержка клиентов",
                  desc:
                    page?.usecase3Desc ??
                    "Автоматизируйте типовые обращения, обучайте операторов в реальном времени.",
                  stat: page?.usecase3Stat ?? "Снижение нагрузки −40%",
                  href: page?.usecase3Href ?? "/business",
                },
                {
                  icon: <MessageSquare size={20} color="#C4B5FD" />,
                  title: page?.usecase4Title ?? "Перевод и локализация",
                  desc:
                    page?.usecase4Desc ??
                    "Профессиональные переводы маркетинговых материалов с сохранением стиля.",
                  stat: page?.usecase4Stat ?? "50+ языков",
                  href: page?.usecase4Href ?? "/business",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="card-hover"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    padding: "24px",
                    borderRadius: "16px",
                    background: "rgba(13,13,26,0.75)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: "rgba(167,139,250,0.1)",
                      border: "1px solid rgba(167,139,250,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#F0EEFF",
                        marginBottom: "6px",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#9CA3B8",
                        lineHeight: 1.65,
                        marginBottom: "12px",
                      }}
                    >
                      {card.desc}
                    </p>
                    <Link
                      href={card.href ?? "/business"}
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#A78BFA",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        cursor: "pointer",
                        transition: "color 150ms ease",
                      }}
                    >
                      Подробнее <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "80px 0 100px", background: "#040408" }}>
          <div className="container-site">
            <div
              className="cta-inner"
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "24px",
                padding: "72px 48px",
                textAlign: "center",
                background: "rgba(13,13,26,0.97)",
                border: "1px solid rgba(167,139,250,0.2)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(90deg,transparent,rgba(167,139,250,0.6),transparent)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div className="section-badge">
                  <span className="badge-dot" />
                  14 ДНЕЙ БЕСПЛАТНО
                </div>
                <h2
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 48px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: "#F0EEFF",
                  }}
                >
                  {page?.ctaTitle ?? "Готов попробовать LibraChat?"}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#9CA3B8",
                    maxWidth: "380px",
                    lineHeight: 1.7,
                  }}
                >
                  Начни прямо сейчас — бесплатно. Без карты и сложных настроек.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    href={page?.ctaBtnUrl ?? "https://librachat.kz/auth"}
                    style={{
                      padding: "14px 32px",
                      borderRadius: "999px",
                      background: "#A78BFA",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: 600,
                      textDecoration: "none",
                      boxShadow: "0 4px 20px rgba(167,139,250,0.4)",
                    }}
                  >
                    Начать бесплатно
                  </Link>
                  <Link
                    href="/contact"
                    style={{
                      padding: "14px 32px",
                      borderRadius: "999px",
                      background: "transparent",
                      color: "#F0EEFF",
                      fontSize: "15px",
                      fontWeight: 600,
                      textDecoration: "none",
                      border: "1px solid rgba(255,255,255,0.16)",
                    }}
                  >
                    Запросить демо
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
