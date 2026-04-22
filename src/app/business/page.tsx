import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import {
  fetchBusinessPage,
  fetchStrapiBusinessFeatures,
  fetchStrapiBusinessCases,
  fetchStrapiBusinessTestimonials,
} from "@/lib/strapi";
import { Footer } from "@/components/layout/footer";
import {
  Shield,
  Users,
  Zap,
  BarChart2,
  Headphones,
  Puzzle,
  FileText,
  Globe,
  Check,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Shield,
  Users,
  Zap,
  BarChart2,
  Headphones,
  Puzzle,
  FileText,
  Globe,
};

export const metadata: Metadata = {
  title: "LibraChat для бизнеса — корпоративный ИИ-ассистент",
  description:
    "Корпоративный ИИ-ассистент без сложных настроек. Безопасность данных, управление командой по ролям, интеграции с вашими сервисами и выделенная поддержка 24/7.",
  openGraph: {
    title: "LibraChat для бизнеса — корпоративный ИИ",
    description:
      "Масштабируй команду с LibraChat. Безопасность данных, управление доступом, 24/7 поддержка.",
    url: "https://librachat.ai/business",
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
    title: "LibraChat для бизнеса — корпоративный ИИ",
    description:
      "Масштабируй команду с LibraChat. Безопасность данных, управление доступом, 24/7 поддержка.",
    images: ["https://librachat.ai/og-image.png"],
  },
  alternates: {
    canonical: "https://librachat.ai/business",
  },
};

const FEATURES = [
  {
    num: "01",
    Icon: Shield,
    title: "Безопасность данных",
    desc: "Шифрованные рабочие пространства, соответствие GDPR и ФЗ‑152‑ФЗ. Ваши данные не используются для обучения наших моделей.",
  },
  {
    num: "02",
    Icon: Users,
    title: "Управление командой",
    desc: "Добавляйте сотрудников по ролям: Участник, Менеджер, Администратор. Просматривайте историю использования по сотрудникам.",
  },
  {
    num: "03",
    Icon: Zap,
    title: "Приоритетная скорость",
    desc: "Корпоративные клиенты получают ответы за приоритетным SLA 99 %. Обработка очереди — в первую очередь.",
  },
  {
    num: "04",
    Icon: Puzzle,
    title: "Интеграции",
    desc: "API, вебхуки, коннекторы к Slack, Teams, Notion, 1C и другим корпоративным инструментам.",
  },
  {
    num: "05",
    Icon: BarChart2,
    title: "Аналитика и отчёты",
    desc: "Дашборды использования, контроль затрат, экспорт данных. Понимайте как команда использует ИИ как точку роста.",
  },
  {
    num: "06",
    Icon: Headphones,
    title: "Выделенная поддержка",
    desc: "Персональный менеджер команды, обращения со связью приоритетной технической поддержкой в режиме 24/7.",
  },
];

const USE_CASES = [
  {
    Icon: FileText,
    title: "Подготовка документов",
    desc: "От отчётов до предложений — LibraChat создаёт профессиональные документы по твоим шаблонам за минуты.",
    badge: "Экономия: 3–4 часа",
    badgeColor: "#A78BFA",
  },
  {
    Icon: Headphones,
    title: "Поддержка клиентов",
    desc: "Автоматизируйте типовые обращения, обучайте операторов в реальном времени, формирование базы знаний.",
    badge: "Снижение нагрузки −40%",
    badgeColor: "#A78BFA",
  },
  {
    Icon: BarChart2,
    title: "Анализ данных",
    desc: "Загружайте отчёты — получайте инсайты, выдвигайте гипотезы для развития бизнеса без работы с формулами.",
    badge: "Анализ за минуты: до 50м",
    badgeColor: "#A78BFA",
  },
  {
    Icon: Globe,
    title: "Перевод и локализация",
    desc: "Профессиональные переводы маркетинговых материалов с сохранением стиля под разные рынки и аудитории.",
    badge: "50+ языков",
    badgeColor: "#A78BFA",
  },
];

const TESTIMONIALS = [
  {
    content:
      "Внедрили LibraChat для отдела продаж — скорость подготовки КП выросла в 3 раза. Менеджеры теперь тратят время на клиентов, а не на документы.",
    name: "Алексей Козлов",
    role: "Директор по продажам, TechStart",
  },
  {
    content:
      "Служба поддержки обрабатывает на 40% больше обращений при той же команде. LibraChat помогает операторам отвечать быстро и точно.",
    name: "Мария Соколова",
    role: "Руководитель поддержки, RetailPro",
  },
  {
    content:
      "Аналитики получили инструмент, который за 10 минут делает то, на что раньше уходил день. ROI от LibraChat окупился за первый месяц.",
    name: "Дмитрий Попов",
    role: "Финансовый директор, FinGroup",
  },
];

const S = {
  section: (bg = "#040408") =>
    ({
      padding: "120px 0",
      background: bg,
      borderTop: "1px solid rgba(255,255,255,0.06)",
    }) as React.CSSProperties,
  h2: {
    fontSize: "clamp(28px, 3vw, 44px)",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    lineHeight: 1.15,
    color: "#F0EEFF",
  } as React.CSSProperties,
  sub: {
    fontSize: "16px",
    color: "#9CA3B8",
    lineHeight: 1.6,
    marginTop: "12px",
  } as React.CSSProperties,
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "28px",
    borderRadius: "20px",
    background: "rgba(13,13,26,0.88)",
    border: "1px solid rgba(255,255,255,0.07)",
  } as React.CSSProperties,
  iconWrap: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    background: "rgba(167,139,250,0.12)",
    border: "1px solid rgba(167,139,250,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } as React.CSSProperties,
};

function StarRow() {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#A78BFA">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default async function BusinessPage() {
  const [page, bizFeatures, bizCases, bizTestimonials] = await Promise.all([
    fetchBusinessPage(),
    fetchStrapiBusinessFeatures(),
    fetchStrapiBusinessCases(),
    fetchStrapiBusinessTestimonials(),
  ]);

  const STATS_DATA = [
    {
      value: page?.stat1Value ?? "500+",
      label: page?.stat1Label ?? "корпоративных клиентов",
    },
    {
      value: page?.stat2Value ?? "3 ч",
      label: page?.stat2Label ?? "экономия на сотрудника в день",
    },
    {
      value: page?.stat3Value ?? "99.9%",
      label: page?.stat3Label ?? "время безотказной работы",
    },
  ];

  const FEATURES_DATA =
    bizFeatures.length > 0
      ? bizFeatures.map((f, i) => ({
          num: String(i + 1).padStart(2, "0"),
          Icon: ICON_MAP[f.icon] ?? Shield,
          title: f.title,
          desc: f.desc,
        }))
      : FEATURES.map((f) => ({ ...f, Icon: f.Icon }));

  const USE_CASES_DATA =
    bizCases.length > 0
      ? bizCases.map((f, i) => ({
          Icon: ICON_MAP[f.icon] ?? FileText,
          title: f.title,
          desc: f.desc,
          badge: USE_CASES[i]?.badge ?? "",
          badgeColor: USE_CASES[i]?.badgeColor ?? "#A78BFA",
        }))
      : USE_CASES;

  const TESTIMONIALS_DATA =
    bizTestimonials.length > 0
      ? bizTestimonials.map((t) => ({ content: t.content, name: t.name, role: t.role }))
      : TESTIMONIALS;
  return (
    <div style={{ display: "flex", minHeight: "100dvh", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1, paddingTop: "68px" }}>
        {/* ── HERO ── */}
        <section style={{ padding: "100px 0 80px", background: "#040408" }}>
          <div className="container-site">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                gap: "48px",
                alignItems: "start",
              }}
            >
              {/* Текст */}
              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                <div className="section-badge" style={{ width: "fit-content" }}>
                  <span className="badge-dot" />
                  {page?.heroBadge ?? "РЕШЕНИЯ ДЛЯ БИЗНЕСА"}
                </div>
                <h1
                  style={{
                    fontSize: "clamp(40px, 5vw, 64px)",
                    fontWeight: 800,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    color: "#F0EEFF",
                  }}
                >
                  {page?.heroTitle ?? "Помогаю твоей команде"}
                </h1>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.655,
                    color: "#9CA3B8",
                    maxWidth: "420px",
                  }}
                >
                  {page?.heroSubtitle ??
                    "Масштабируй работу команды с LibraChat — корпоративный ИИ с безопасностью данных, управлением доступом и интеграциями под твои процессы."}
                </p>
                <div
                  className="btn-pair"
                  style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                >
                  <Link
                    href="/contact?type=demo"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "14px 28px",
                      borderRadius: "999px",
                      background: "#A78BFA",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: 600,
                      textDecoration: "none",
                      boxShadow: "0 4px 20px rgba(167,139,250,0.4)",
                    }}
                  >
                    Запросить демо
                  </Link>
                  <Link
                    href="/contact?type=sales"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "14px 28px",
                      borderRadius: "999px",
                      background: "transparent",
                      color: "#F0EEFF",
                      fontSize: "15px",
                      fontWeight: 600,
                      textDecoration: "none",
                      border: "1px solid rgba(255,255,255,0.16)",
                    }}
                  >
                    Для продаж
                  </Link>
                </div>
                {/* Статистика */}
                <div style={{ display: "flex", gap: "32px", paddingTop: "8px" }}>
                  {STATS_DATA.map((s) => (
                    <div key={s.label}>
                      <p
                        style={{
                          fontSize: "24px",
                          fontWeight: 800,
                          color: "#A78BFA",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {s.value}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#9CA3B8",
                          marginTop: "4px",
                          lineHeight: 1.4,
                        }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Панель */}
              <div
                style={{
                  borderRadius: "20px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  background: "rgba(13,13,26,0.97)",
                  border: "1px solid rgba(167,139,250,0.22)",
                  boxShadow: "0 0 60px rgba(167,139,250,0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>
                    Панель управления командой
                  </p>
                  <span
                    style={{
                      fontSize: "11px",
                      padding: "4px 10px",
                      borderRadius: "999px",
                      background: "rgba(167,139,250,0.15)",
                      color: "#C4B5FD",
                      border: "1px solid rgba(167,139,250,0.3)",
                    }}
                  >
                    Business Pro
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(min(100%, 110px), 1fr))",
                    gap: "10px",
                  }}
                >
                  {[
                    { value: "47", label: "Участников" },
                    { value: "1 240", label: "Запросов сегодня" },
                    { value: "98%", label: "Удовлетворённость" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      style={{
                        padding: "14px 10px",
                        borderRadius: "14px",
                        textAlign: "center",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <p style={{ fontSize: "20px", fontWeight: 800, color: "#fff" }}>
                        {s.value}
                      </p>
                      <p style={{ fontSize: "11px", color: "#9CA3B8", marginTop: "4px" }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    {
                      name: "Алексей Козлов",
                      role: "Администратор",
                      status: "Активен",
                      color: "#A78BFA",
                    },
                    {
                      name: "Мария Соколова",
                      role: "Менеджер",
                      status: "Активен",
                      color: "#A78BFA",
                    },
                    {
                      name: "Дмитрий Попов",
                      role: "Администратор",
                      status: "Офлайн",
                      color: "#9CA3B8",
                    },
                  ].map((u) => (
                    <div
                      key={u.name}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 14px",
                        borderRadius: "12px",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
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
                          {u.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </div>
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: 500, color: "#fff" }}>
                            {u.name}
                          </p>
                          <p style={{ fontSize: "11px", color: "#9CA3B8" }}>{u.role}</p>
                        </div>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 500, color: u.color }}>
                        {u.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Логотипы */}
        <div
          style={{
            padding: "28px 0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "#040408",
          }}
        >
          <div className="container-site">
            <p
              style={{
                textAlign: "center",
                fontSize: "11px",
                color: "#6B7280",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "18px",
              }}
            >
              НАМ ДОВЕРЯЮТ ЛИДЕРЫ РЫНКА
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {[
                "Компания А",
                "Компания Б",
                "Компания В",
                "Компания Г",
                "Компания Д",
                "Компания Е",
              ].map((n) => (
                <div
                  key={n}
                  style={{
                    padding: "6px 18px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    color: "#6B7280",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 6 ПРЕИМУЩЕСТВ ── */}
        <section style={S.section("#080810")}>
          <div className="container-site">
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div className="section-badge" style={{ marginBottom: "16px" }}>
                <span className="badge-dot" />
                ПОЧЕМУ LIBRACHAT ДЛЯ БИЗНЕСА
              </div>
              <h2 style={S.h2}>
                Инструмент, который растёт{" "}
                <span style={{ color: "#A78BFA" }}>вместе с вами</span>
              </h2>
              <p style={S.sub}>Корпоративные возможности без корпоративной сложности</p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              {FEATURES_DATA.map(({ num, Icon, title, desc }) => (
                <div key={num} style={S.card}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={S.iconWrap}>
                      <Icon size={22} color="#C4B5FD" />
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#6B7280" }}>
                      {num}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#F0EEFF",
                      lineHeight: 1.3,
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#9CA3B8" }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── КЕЙСЫ ── */}
        <section style={S.section("#040408")}>
          <div className="container-site">
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div className="section-badge" style={{ marginBottom: "16px" }}>
                <span className="badge-dot" />
                ПРИМЕНЕНИЕ
              </div>
              <h2 style={S.h2}>Как бизнес использует LibraChat</h2>
              <p style={S.sub}>Реальные задачи — реальные результаты</p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "16px",
              }}
            >
              {USE_CASES_DATA.map(({ Icon, title, desc, badge, badgeColor }) => (
                <div key={title} style={S.card}>
                  <div style={S.iconWrap}>
                    <Icon size={22} color="#C4B5FD" />
                  </div>
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#F0EEFF",
                      lineHeight: 1.3,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.75,
                      color: "#9CA3B8",
                      flex: 1,
                    }}
                  >
                    {desc}
                  </p>
                  <span
                    style={{
                      display: "inline-flex",
                      width: "fit-content",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "5px 12px",
                      borderRadius: "999px",
                      background: `${badgeColor}18`,
                      color: badgeColor,
                      border: `1px solid ${badgeColor}33`,
                    }}
                  >
                    {badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ОТЗЫВЫ ── */}
        <section style={S.section("#080810")}>
          <div className="container-site">
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div className="section-badge" style={{ marginBottom: "16px" }}>
                <span className="badge-dot" />
                КЛИЕНТЫ О НАС
              </div>
              <h2 style={S.h2}>
                Результаты <span style={{ color: "#F0EEFF" }}>говорят сами</span>
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "16px",
              }}
            >
              {TESTIMONIALS_DATA.map((t, i) => (
                <div
                  key={i}
                  style={{ ...S.card, border: "1px solid rgba(167,139,250,0.14)" }}
                >
                  <StarRow />
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.75,
                      color: "#9CA3B8",
                      fontStyle: "italic",
                      flex: 1,
                    }}
                  >
                    «{t.content}»
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginTop: "auto",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "#A78BFA",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      {t.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </div>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: "#fff" }}>
                        {t.name}
                      </p>
                      <p style={{ fontSize: "13px", color: "#9CA3B8", marginTop: "2px" }}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA + ФОРМА ── */}
        <section
          style={{
            padding: "120px 0",
            background: "#040408",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="container-site">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                gap: "32px",
                padding: "48px",
                borderRadius: "24px",
                background: "rgba(13,13,26,0.92)",
                border: "1px solid rgba(167,139,250,0.2)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  justifyContent: "center",
                }}
              >
                <h2
                  style={{
                    fontSize: "clamp(32px, 3vw, 48px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: "#F0EEFF",
                  }}
                >
                  {page?.ctaTitle ?? "Готовы внедрить ИИ в команду?"}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.75,
                    color: "#9CA3B8",
                    maxWidth: "360px",
                  }}
                >
                  {page?.ctaSubtitle ??
                    "Оставьте заявку — наш менеджер свяжется в течение 2 часов и проведёт персональную демонстрацию под задачи вашего бизнеса."}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    "Персональная демонстрация",
                    "Ответы на все технические вопросы",
                    "Индивидуальное предложение по цене",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "15px",
                        color: "#9CA3B8",
                      }}
                    >
                      <Check size={15} color="#F472B6" style={{ flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                style={{
                  borderRadius: "18px",
                  padding: "28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  background: "rgba(4,4,8,0.7)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#fff",
                    marginBottom: "4px",
                  }}
                >
                  Запросить демо
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                    gap: "10px",
                  }}
                >
                  {["Имя", "Должность", "Email", "Телефон"].map((pl) => (
                    <input
                      key={pl}
                      type="text"
                      placeholder={pl}
                      style={{
                        padding: "12px 14px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        color: "#fff",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        outline: "none",
                      }}
                    />
                  ))}
                  {["Название компании", "Размер команды"].map((pl) => (
                    <input
                      key={pl}
                      type="text"
                      placeholder={pl}
                      style={{
                        padding: "12px 14px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        color: "#fff",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        outline: "none",
                      }}
                    />
                  ))}
                </div>
                <Link
                  href="/contact?type=demo"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "14px",
                    borderRadius: "999px",
                    background: "#A78BFA",
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(167,139,250,0.4)",
                    marginTop: "4px",
                  }}
                >
                  Запросить демо
                </Link>
                <p style={{ fontSize: "12px", textAlign: "center", color: "#6B7280" }}>
                  Нажимая кнопку, вы принимаете{" "}
                  <Link
                    href="/privacy"
                    style={{ color: "#9CA3B8", textDecoration: "underline" }}
                  >
                    политику конфиденциальности
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
