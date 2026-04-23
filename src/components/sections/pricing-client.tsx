"use client";

import { useState, Fragment } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Check } from "lucide-react";
import type { StrapiPlan, StrapiFaq, StrapiPricingPage } from "@/lib/strapi";

const STATIC_PLANS: StrapiPlan[] = [
  {
    id: 1,
    planId: "free",
    subtitle: "Хочу попробовать",
    name: "Первые шаги без риска",
    priceMonthly: 0,
    priceAnnual: 0,
    ctaLabel: "Начать бесплатно",
    ctaHref: "https://librachat.kz/auth",
    isPopular: false,
    highlight: null,
    order: 1,
    features: [
      { label: "20 сообщений в день", ok: true },
      { label: "Базовый диалог", ok: true },
      { label: "5 загрузок файлов в день", ok: true },
      { label: "Приоритетный ИИ", ok: false },
      { label: "Расширенные модели", ok: false },
      { label: "API-доступ", ok: false },
    ],
  },
  {
    id: 2,
    planId: "pro",
    subtitle: "Хочу этот результат",
    name: "Полная мощность без ограничений",
    priceMonthly: 990,
    priceAnnual: 790,
    ctaLabel: "Начать бесплатно",
    ctaHref: "https://librachat.kz/auth",
    isPopular: true,
    highlight: "Лучший выбор",
    order: 2,
    features: [
      { label: "Безлимитные запросы", ok: true },
      { label: "Файлы до 50 МБ", ok: true },
      { label: "Анализ документов и таблиц", ok: true },
      { label: "Работа без VPN", ok: true },
      { label: "Приоритетный ИИ", ok: true },
      { label: "API-доступ", ok: false },
    ],
  },
  {
    id: 3,
    planId: "team",
    subtitle: "Помогите такой команде",
    name: "Маркетинг-отдел для вашей команды",
    priceMonthly: 1990,
    priceAnnual: 1590,
    ctaLabel: "Обсудить команду",
    ctaHref: "/contact?type=business",
    isPopular: false,
    highlight: null,
    order: 3,
    features: [
      { label: "Всё из Pro плана", ok: true },
      { label: "Управление командой", ok: true },
      { label: "Корпоративный биллинг", ok: true },
      { label: "Приоритетная поддержка", ok: true },
      { label: "Выделенные мощности", ok: true },
      { label: "API-доступ + Webhook", ok: true },
    ],
  },
];

const STATIC_FAQ = [
  {
    question: "Можно ли сменить тариф в любое время?",
    answer:
      "Да, вы можете перейти на более высокий тариф немедленно. При переходе на более низкий изменения вступят в силу в следующем расчётном периоде.",
  },
  {
    question: "Что происходит после окончания пробного периода?",
    answer:
      "Аккаунт автоматически переходит на бесплатный тариф. Данные сохраняются. Никаких списаний без вашего подтверждения.",
  },
  {
    question: "Какие способы оплаты принимаются?",
    answer:
      "Банковские карты Visa, Mastercard, МИР, а также ЮКасса. Безналичная оплата для юрлиц доступна по запросу.",
  },
  {
    question: "Есть ли скидки для студентов и НКО?",
    answer:
      "Да, скидка 50% для студентов, преподавателей и некоммерческих организаций. Для получения обратитесь в поддержку.",
  },
  {
    question: "Можно ли получить возврат средств?",
    answer:
      "Полный возврат в течение 7 дней после оплаты при отсутствии активного использования.",
  },
  {
    question: "Как работает тариф для команды?",
    answer:
      "Оплачивается за количество участников. Минимум — 3 участника. Администратор управляет командой и правами доступа.",
  },
];

function fmt(n: number) {
  return n === 0 ? "0 ₽" : n.toLocaleString("ru-RU") + " ₽";
}

const heading = {
  fontSize: "clamp(28px, 3vw, 44px)",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  lineHeight: 1.15,
  color: "#F0EEFF",
} as React.CSSProperties;

type CompRow = {
  label: string;
  free: string | boolean;
  pro: string | boolean;
  team: string | boolean;
};
type CompGroup = { group: string; rows: CompRow[] };

const DEFAULT_COMPARISON: CompGroup[] = [
  {
    group: "ДИАЛОГ",
    rows: [
      { label: "Сообщений в день", free: "20", pro: "∞", team: "∞" },
      { label: "История диалогов", free: "7 дней", pro: "90 дней", team: "Бесконечно" },
      { label: "Приоритетный доступ", free: false, pro: false, team: true },
    ],
  },
  {
    group: "ФАЙЛЫ",
    rows: [
      { label: "Загрузка файлов", free: "1/день", pro: "150/день", team: "Без лимита" },
      { label: "Размер файла", free: "5 МБ", pro: "50 МБ", team: "500 МБ" },
    ],
  },
  {
    group: "КОМАНДА",
    rows: [
      { label: "Общее пространство", free: false, pro: false, team: true },
      { label: "Управление ролями", free: false, pro: false, team: true },
    ],
  },
  {
    group: "ИНТЕГРАЦИИ И API",
    rows: [
      { label: "API-доступ", free: false, pro: false, team: false },
      { label: "Webhook-интеграции", free: false, pro: false, team: true },
    ],
  },
];

export function PricingClient({
  plans,
  faqs,
  page,
}: {
  plans?: StrapiPlan[];
  faqs?: StrapiFaq[];
  page?: StrapiPricingPage | null;
}) {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const PLANS = plans && plans.length > 0 ? plans : STATIC_PLANS;
  const FAQ =
    faqs && faqs.length > 0
      ? faqs.map((f) => ({ question: f.question, answer: f.answer }))
      : STATIC_FAQ;

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{ padding: "100px 0 80px", background: "#040408", textAlign: "center" }}
      >
        <div
          className="container-site"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div className="section-badge">
            <span className="badge-dot" />
            {page?.plansBadge ?? "ТАРИФНЫЕ ПЛАНЫ"}
          </div>
          <h1
            style={{ ...heading, fontSize: "clamp(36px, 5vw, 64px)", maxWidth: "600px" }}
          >
            {page?.heroTitle ?? "Выберите подходящий тариф для вас"}
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#9CA3B8",
              maxWidth: "400px",
              lineHeight: 1.7,
            }}
          >
            {page?.heroSubtitle ??
              "Начните бесплатно — обновите план когда будете готовы. Без скрытых платежей."}
          </p>
          <div
            style={{
              display: "inline-flex",
              padding: "4px",
              borderRadius: "999px",
              gap: "8px",
              background: "none",
              border: "none",
              marginTop: "8px",
            }}
          >
            {["Ежемесячно", "Ежегодно"].map((label, i) => {
              const active = annual === (i === 1);
              return (
                <button
                  key={label}
                  onClick={() => setAnnual(i === 1)}
                  style={{
                    position: "relative",
                    padding: "8px 20px",
                    borderRadius: "999px",
                    fontSize: "14px",
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                    background: active ? "rgba(167,139,250,0.18)" : "transparent",
                    color: active ? "#F0EEFF" : "#9CA3B8",
                    outline: active ? "1px solid rgba(167,139,250,0.35)" : "none",
                    transition: "all 200ms ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {label}
                  {i === 1 && (
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "2px 7px",
                        borderRadius: "999px",
                        background: "rgba(167,139,250,0.15)",
                        color: "#A78BFA",
                        border: "1px solid rgba(167,139,250,0.25)",
                      }}
                    >
                      −20%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── КАРТОЧКИ ── */}
      <section
        style={{
          padding: "80px 0 120px",
          background: "#080810",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container-site">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div className="section-badge" style={{ marginBottom: "16px" }}>
              <span className="badge-dot" />
              {page?.previewBadge ?? "ТАРИФЫ"}
            </div>
            <h2 style={heading}>
              {page?.plansTitle ?? page?.plansTitle2 ?? "Выбери свой результат"}
            </h2>
            <p style={{ fontSize: "16px", color: "#9CA3B8", marginTop: "12px" }}>
              {page?.plansSubtitle ??
                "Тарифы — один инструмент для всех задач. Расти вместе с ним."}
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {PLANS.map((plan) => {
              const price = annual ? plan.priceAnnual : plan.priceMonthly;
              const planKey = plan.planId ?? String(plan.id);
              return (
                <div
                  key={planKey}
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    padding: "28px",
                    borderRadius: "20px",
                    background: plan.isPopular ? "rgba(167,139,250,0.07)" : "#0D0D1A",
                    border: plan.isPopular
                      ? "1px solid rgba(167,139,250,0.45)"
                      : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: plan.isPopular ? "0 0 40px rgba(167,139,250,0.1)" : "none",
                  }}
                >
                  {plan.isPopular && plan.highlight && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-14px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "4px 16px",
                        borderRadius: "999px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#fff",
                        background: "linear-gradient(135deg,#7B2FBE,#A78BFA,#F472B6)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {plan.highlight}
                    </div>
                  )}
                  <p style={{ fontSize: "12px", color: "#9CA3B8", marginBottom: "6px" }}>
                    {plan.subtitle}
                  </p>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#F0EEFF",
                      lineHeight: 1.35,
                      marginBottom: "20px",
                    }}
                  >
                    {plan.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "8px",
                      marginBottom: "24px",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${planKey}-${annual}`}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.16 }}
                        style={{
                          fontSize: "clamp(32px, 3vw, 44px)",
                          fontWeight: 800,
                          color: "#F0EEFF",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {fmt(price)}
                      </motion.span>
                    </AnimatePresence>
                    {price > 0 && (
                      <span style={{ fontSize: "14px", color: "#9CA3B8" }}>/ мес</span>
                    )}
                  </div>
                  <Link
                    href={plan.ctaHref}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "13px",
                      borderRadius: "999px",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                      marginBottom: "24px",
                      background: plan.isPopular
                        ? "linear-gradient(135deg,#7B2FBE,#A78BFA,#F472B6)"
                        : "transparent",
                      color: plan.isPopular ? "#fff" : "#F0EEFF",
                      border: plan.isPopular
                        ? "none"
                        : "1px solid rgba(167,139,250,0.25)",
                      boxShadow: plan.isPopular
                        ? "0 4px 20px rgba(167,139,250,0.4)"
                        : "none",
                    }}
                  >
                    {plan.ctaLabel}
                  </Link>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {(plan.features ?? []).map((f) => (
                      <li
                        key={f.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          fontSize: "14px",
                          opacity: f.ok ? 1 : 0.35,
                        }}
                      >
                        <Check
                          size={15}
                          color={f.ok ? "#F472B6" : "#6B7280"}
                          style={{ flexShrink: 0 }}
                        />
                        <span style={{ color: "#F0EEFF" }}>{f.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── СРАВНЕНИЕ ПЛАНОВ ── */}
      <section
        style={{
          padding: "80px 0",
          background: "#080810",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container-site">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="section-badge" style={{ marginBottom: "16px" }}>
              <span className="badge-dot" />
              {page?.comparisonTitle ?? "СРАВНЕНИЕ"}
            </div>
            <h2 style={heading}>Что входит в каждый план</h2>
            <p style={{ fontSize: "16px", color: "#a89ec0", marginTop: "12px" }}>
              {page?.comparisonSubtitle ?? "Подробное сравнение всех возможностей"}
            </p>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      color: "#6B7280",
                      fontSize: "13px",
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    ФУНКЦИИ
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                      color: "#9CA3B8",
                      fontSize: "13px",
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    Бесплатно
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                      color: "#C4B5FD",
                      fontSize: "13px",
                      fontWeight: 600,
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    ПРО
                  </th>
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "center",
                      color: "#F0EEFF",
                      fontSize: "13px",
                      fontWeight: 500,
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    Команда
                  </th>
                </tr>
              </thead>
              <tbody>
                {(Array.isArray(page?.comparisonRows)
                  ? (page.comparisonRows as CompGroup[])
                  : DEFAULT_COMPARISON
                ).map((group) => (
                  <Fragment key={group.group}>
                    <tr>
                      <td
                        colSpan={4}
                        style={{
                          padding: "16px 16px 8px",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#6B7280",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {group.group}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr
                        key={row.label}
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                      >
                        <td
                          style={{
                            padding: "10px 16px",
                            fontSize: "14px",
                            color: "#9CA3B8",
                          }}
                        >
                          {row.label}
                        </td>
                        {(["free", "pro", "team"] as const).map((plan) => (
                          <td
                            key={plan}
                            style={{ padding: "10px 16px", textAlign: "center" }}
                          >
                            {typeof row[plan] === "boolean" ? (
                              row[plan] ? (
                                <span style={{ color: "#A78BFA", fontSize: "16px" }}>
                                  ✓
                                </span>
                              ) : (
                                <span style={{ color: "#374151", fontSize: "14px" }}>
                                  —
                                </span>
                              )
                            ) : (
                              <span
                                style={{
                                  fontSize: "13px",
                                  color: plan === "pro" ? "#C4B5FD" : "#9CA3B8",
                                }}
                              >
                                {String(row[plan])}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        style={{
          padding: "120px 0",
          background: "#080810",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container-site" style={{ maxWidth: "780px" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div className="section-badge" style={{ marginBottom: "16px" }}>
              <span className="badge-dot" />
              {page?.faqBadge ?? "ЧАСТО ЗАДАЮТ"}
            </div>
            <h2 style={heading}>Остались вопросы?</h2>
            <p style={{ fontSize: "16px", color: "#9CA3B8", marginTop: "12px" }}>
              Ответы на самые популярные вопросы о тарифах и оплате
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "12px",
            }}
          >
            {FAQ.map((item, i) => (
              <div
                key={i}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "12px",
                    padding: "18px 20px",
                    textAlign: "left",
                    cursor: "pointer",
                    border: "none",
                    background:
                      openFaq === i ? "rgba(167,139,250,0.06)" : "rgba(13,13,26,0.75)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#F0EEFF",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 45 : 0 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      flexShrink: 0,
                      width: "26px",
                      height: "26px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "18px",
                      background: "rgba(167,139,250,0.12)",
                      border: "1px solid rgba(167,139,250,0.25)",
                      color: "#C4B5FD",
                    }}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          padding: "16px 20px",
                          fontSize: "14px",
                          lineHeight: 1.75,
                          color: "#9CA3B8",
                          borderTop: "1px solid rgba(255,255,255,0.06)",
                          background: "rgba(4,4,8,0.55)",
                        }}
                      >
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ФИНАЛЬНЫЙ CTA ── */}
      <section
        style={{
          padding: "80px 0",
          background: "#040408",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container-site">
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "24px",
              padding: "clamp(40px, 6vw, 80px) clamp(20px, 4vw, 40px)",
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
                НАЧНИТЕ УЖЕ СЕГОДНЯ
              </div>
              <h2 style={{ ...heading, fontSize: "clamp(32px, 4vw, 56px)" }}>
                {page?.ctaTitle ?? "14 дней бесплатно на любом тарифе"}
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#9CA3B8",
                  maxWidth: "360px",
                  lineHeight: 1.7,
                }}
              >
                Попробуйте все возможности LibraChat без ограничений. Карта не нужна.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginTop: "8px",
                  width: "100%",
                  padding: "0 16px",
                }}
              >
                <Link
                  href={page?.ctaBtnPrimaryUrl ?? "https://librachat.kz/auth"}
                  style={{
                    padding: "14px 32px",
                    borderRadius: "999px",
                    background: "linear-gradient(135deg,#7B2FBE,#A78BFA,#F472B6)",
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(167,139,250,0.4)",
                    flex: "1 1 auto",
                    textAlign: "center",
                    minWidth: "200px",
                    maxWidth: "280px",
                  }}
                >
                  {page?.ctaBtnPrimaryText ?? "Начать бесплатно"}
                </Link>
                <Link
                  href={page?.ctaBtnSecondaryUrl ?? "/contact?type=demo"}
                  style={{
                    padding: "14px 32px",
                    borderRadius: "999px",
                    background: "transparent",
                    color: "#F0EEFF",
                    fontSize: "15px",
                    fontWeight: 600,
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.16)",
                    flex: "1 1 auto",
                    textAlign: "center",
                    minWidth: "200px",
                    maxWidth: "280px",
                  }}
                >
                  Для продаж
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
