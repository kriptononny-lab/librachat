"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Check, X, Minus } from "lucide-react";
import type { StrapiPlan, StrapiFaq } from "@/lib/strapi";

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

const COMPARISON = [
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

function fmt(n: number) {
  return n === 0 ? "0 ₽" : n.toLocaleString("ru-RU") + " ₽";
}

function CellValue({ value }: { value: string | boolean }) {
  if (value === true)
    return (
      <Check size={15} color="#22c55e" style={{ margin: "0 auto", display: "block" }} />
    );
  if (value === false)
    return (
      <Minus size={15} color="#3a3650" style={{ margin: "0 auto", display: "block" }} />
    );
  return (
    <span
      style={{
        display: "block",
        textAlign: "center",
        fontSize: "13px",
        color: "#a89ec0",
      }}
    >
      {value as string}
    </span>
  );
}

const heading = {
  fontSize: "clamp(28px, 3vw, 44px)",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  lineHeight: 1.15,
  color: "#f0eeff",
} as React.CSSProperties;

export function PricingClient({
  plans,
  faqs,
}: {
  plans?: StrapiPlan[];
  faqs?: StrapiFaq[];
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
        style={{ padding: "100px 0 80px", background: "#07060e", textAlign: "center" }}
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
          <div className="section-badge">✦ ТАРИФНЫЕ ПЛАНЫ</div>
          <h1
            style={{ ...heading, fontSize: "clamp(36px, 5vw, 64px)", maxWidth: "600px" }}
          >
            Выберите подходящий
            <br />
            <span style={{ color: "#f0eeff" }}>тариф для вас</span>
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#a89ec0",
              maxWidth: "400px",
              lineHeight: 1.7,
            }}
          >
            Начните бесплатно — обновите план когда будете готовы. Без скрытых платежей.
          </p>
          <div
            style={{
              display: "inline-flex",
              padding: "4px",
              borderRadius: "999px",
              gap: "4px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
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
                    background: active ? "rgba(101,88,224,0.18)" : "transparent",
                    color: active ? "#f0eeff" : "#a89ec0",
                    outline: active ? "1px solid rgba(101,88,224,0.35)" : "none",
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
                        background: "rgba(34,197,94,0.15)",
                        color: "#22c55e",
                        border: "1px solid rgba(34,197,94,0.25)",
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
          background: "#100f1d",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container-site">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div className="section-badge" style={{ marginBottom: "16px" }}>
              ТАРИФЫ
            </div>
            <h2 style={heading}>
              Выбери <span style={{ color: "#f0eeff" }}>свой результат</span>
            </h2>
            <p style={{ fontSize: "16px", color: "#a89ec0", marginTop: "12px" }}>
              Тарифы — один инструмент для всех задач. Расти вместе с ним.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
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
                    background: plan.isPopular
                      ? "rgba(101,88,224,0.07)"
                      : "rgba(14,13,25,0.88)",
                    border: plan.isPopular
                      ? "1px solid rgba(101,88,224,0.45)"
                      : "1px solid rgba(255,255,255,0.08)",
                    boxShadow: plan.isPopular ? "0 0 40px rgba(101,88,224,0.1)" : "none",
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
                        background: "#6558e0",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {plan.highlight}
                    </div>
                  )}
                  <p style={{ fontSize: "12px", color: "#a89ec0", marginBottom: "6px" }}>
                    {plan.subtitle}
                  </p>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#f0eeff",
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
                          color: "#f0eeff",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {fmt(price)}
                      </motion.span>
                    </AnimatePresence>
                    {price > 0 && (
                      <span style={{ fontSize: "14px", color: "#a89ec0" }}>/ мес</span>
                    )}
                  </div>
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      marginBottom: "28px",
                      flex: 1,
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
                        }}
                      >
                        {f.ok ? (
                          <Check size={15} color="#22c55e" style={{ flexShrink: 0 }} />
                        ) : (
                          <X size={15} color="#3a3650" style={{ flexShrink: 0 }} />
                        )}
                        <span style={{ color: f.ok ? "#a89ec0" : "#3a3650" }}>
                          {f.label}
                        </span>
                      </li>
                    ))}
                  </ul>
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
                      background: plan.isPopular ? "#6558e0" : "transparent",
                      color: plan.isPopular ? "#fff" : "#f0eeff",
                      border: plan.isPopular
                        ? "none"
                        : "1px solid rgba(255,255,255,0.16)",
                      boxShadow: plan.isPopular
                        ? "0 4px 20px rgba(101,88,224,0.4)"
                        : "none",
                    }}
                  >
                    {plan.ctaLabel}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ТАБЛИЦА ── */}
      <section
        style={{
          padding: "120px 0",
          background: "#07060e",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container-site">
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div className="section-badge" style={{ marginBottom: "16px" }}>
              СРАВНЕНИЕ
            </div>
            <h2 style={heading}>Что входит в каждый план</h2>
            <p style={{ fontSize: "16px", color: "#a89ec0", marginTop: "12px" }}>
              Подробное сравнение всех возможностей
            </p>
          </div>
          <div className="pricing-table-wrap">
            <table
              style={{ width: "100%", minWidth: "560px", borderCollapse: "collapse" }}
            >
              <thead>
                <tr
                  style={{
                    background: "rgba(14,13,25,0.97)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <th
                    style={{
                      textAlign: "left",
                      padding: "16px 20px",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#a89ec0",
                      width: "40%",
                    }}
                  >
                    ФУНКЦИИ
                  </th>
                  {["Бесплатно", "ПРО", "Команда"].map((col, i) => (
                    <th
                      key={col}
                      style={{
                        textAlign: "center",
                        padding: "16px",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: i === 1 ? "#9b8ff8" : "#a89ec0",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((group) => (
                  <>
                    <tr
                      key={`g-${group.group}`}
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        borderTop: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <td
                        colSpan={4}
                        style={{
                          padding: "10px 20px",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          color: "#4a4560",
                        }}
                      >
                        {group.group}
                      </td>
                    </tr>
                    {group.rows.map((row, ri) => (
                      <tr
                        key={`${group.group}-${ri}`}
                        style={{
                          borderTop: "1px solid rgba(255,255,255,0.04)",
                          background: ri % 2 === 0 ? "rgba(20,19,28,0.5)" : "transparent",
                        }}
                      >
                        <td
                          style={{
                            padding: "14px 20px",
                            fontSize: "14px",
                            color: "#a89ec0",
                          }}
                        >
                          {row.label}
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <CellValue value={row.free} />
                        </td>
                        <td
                          style={{
                            padding: "14px 16px",
                            background: "rgba(108,92,231,0.04)",
                          }}
                        >
                          <CellValue value={row.pro} />
                        </td>
                        <td style={{ padding: "14px 16px" }}>
                          <CellValue value={row.team} />
                        </td>
                      </tr>
                    ))}
                  </>
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
          background: "#100f1d",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="container-site" style={{ maxWidth: "780px" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <div className="section-badge" style={{ marginBottom: "16px" }}>
              ЧАСТО ЗАДАЮТ
            </div>
            <h2 style={heading}>Остались вопросы?</h2>
            <p style={{ fontSize: "16px", color: "#a89ec0", marginTop: "12px" }}>
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
                      openFaq === i ? "rgba(108,92,231,0.06)" : "rgba(14,13,25,0.75)",
                  }}
                >
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 600,
                      color: "#f0eeff",
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
                      background: "rgba(101,88,224,0.12)",
                      border: "1px solid rgba(101,88,224,0.25)",
                      color: "#9b8ff8",
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
                          color: "#a89ec0",
                          borderTop: "1px solid rgba(255,255,255,0.06)",
                          background: "rgba(8,7,16,0.55)",
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
          background: "#07060e",
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
              background: "rgba(14,13,25,0.97)",
              border: "1px solid rgba(101,88,224,0.2)",
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
                  "linear-gradient(90deg,transparent,rgba(108,92,231,0.6),transparent)",
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
              <div className="section-badge">НАЧНИТЕ УЖЕ СЕГОДНЯ</div>
              <h2 style={{ ...heading, fontSize: "clamp(32px, 4vw, 56px)" }}>
                14 дней бесплатно
                <br />
                <span style={{ color: "#f0eeff" }}>на любом тарифе</span>
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#a89ec0",
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
                  href="https://librachat.kz/auth"
                  style={{
                    padding: "14px 32px",
                    borderRadius: "999px",
                    background: "#6558e0",
                    color: "#fff",
                    fontSize: "15px",
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(101,88,224,0.4)",
                    flex: "1 1 auto",
                    textAlign: "center",
                    minWidth: "200px",
                    maxWidth: "280px",
                  }}
                >
                  Начать бесплатно
                </Link>
                <Link
                  href="/contact?type=demo"
                  style={{
                    padding: "14px 32px",
                    borderRadius: "999px",
                    background: "transparent",
                    color: "#f0eeff",
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
