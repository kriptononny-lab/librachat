"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import type { StrapiPlan } from "@/lib/strapi";

const STATIC_PLANS = [
  {
    planId: "free",
    name: "Бесплатно",
    subtitle: "Попробовать без риска",
    priceMonthly: 0,
    priceAnnual: 0,
    isPopular: false,
    ctaLabel: "Начать бесплатно",
    ctaHref: "https://librachat.kz/auth",
    features: [
      { label: "20 сообщений в день", ok: true },
      { label: "Базовый диалог", ok: true },
      { label: "5 загрузок файлов", ok: true },
    ],
  },
  {
    planId: "pro",
    name: "Pro",
    subtitle: "Полная мощность без ограничений",
    priceMonthly: 990,
    priceAnnual: 790,
    isPopular: true,
    ctaLabel: "Попробовать Pro",
    ctaHref: "https://librachat.kz/auth",
    features: [
      { label: "Безлимитные запросы", ok: true },
      { label: "Файлы до 50 МБ", ok: true },
      { label: "Анализ документов", ok: true },
      { label: "Работа без VPN", ok: true },
      { label: "Приоритетный ИИ", ok: true },
    ],
  },
  {
    planId: "team",
    name: "Бизнес",
    subtitle: "Маркетинг-отдел для команды",
    priceMonthly: 1990,
    priceAnnual: 1590,
    isPopular: false,
    ctaLabel: "Связаться с нами",
    ctaHref: "/contact?type=business",
    features: [
      { label: "Всё из Pro плана", ok: true },
      { label: "Управление командой", ok: true },
      { label: "Приоритетная поддержка", ok: true },
      { label: "Корпоративный биллинг", ok: true },
    ],
  },
];

function fmt(n: number) {
  return n === 0 ? "0 ₽" : n.toLocaleString("ru-RU") + " ₽";
}

export function PricingPreviewSection({ plans }: { plans?: StrapiPlan[] }) {
  const items = plans && plans.length > 0 ? plans : STATIC_PLANS;

  return (
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
            ТАРИФЫ
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#F0EEFF",
            }}
          >
            Ты хочешь <span className="text-gradient">такой результат?</span>
          </h2>
          <p
            style={{
              marginTop: "14px",
              fontSize: "16px",
              color: "#9CA3B8",
              lineHeight: 1.6,
            }}
          >
            14 дней бесплатно — без карты, без обязательств
          </p>
        </div>

        {/* 3 карточки рядом */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            alignItems: "stretch",
          }}
        >
          {items.map((plan) => (
            <div
              key={plan.planId}
              style={{
                background: plan.isPopular ? "rgba(167,139,250,0.07)" : "#0D0D1A",
                border: plan.isPopular
                  ? "2px solid #A78BFA"
                  : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "24px 20px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "none";
              }}
            >
              {plan.isPopular && (
                <div
                  style={{
                    position: "absolute",
                    top: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "linear-gradient(135deg,#7B2FBE,#A78BFA,#F472B6)",
                    color: "#ffffff",
                    fontSize: "9px",
                    fontWeight: 700,
                    padding: "3px 13px",
                    borderRadius: "999px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 3px 10px rgba(167,139,250,0.25)",
                  }}
                >
                  ПОПУЛЯРНЫЙ
                </div>
              )}

              <div
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.4)",
                  marginBottom: "10px",
                }}
              >
                {plan.name}
              </div>

              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  color: "#F0EEFF",
                  lineHeight: 1,
                  marginBottom: "4px",
                }}
              >
                {fmt(plan.priceMonthly)}
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.3)",
                  }}
                >
                  /мес
                </span>
              </div>

              <div style={{ height: "16px", marginBottom: "20px" }} />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  flexGrow: 1,
                  marginBottom: "20px",
                }}
              >
                {(plan.features ?? [])
                  .filter((f) => f.ok)
                  .map((f) => (
                    <div
                      key={f.label}
                      style={{
                        fontSize: "13px",
                        color: "#9CA3B8",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Check size={13} color="#A78BFA" style={{ flexShrink: 0 }} />
                      {f.label}
                    </div>
                  ))}
              </div>

              <Link
                href={plan.ctaHref}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center",
                  borderRadius: "999px",
                  padding: "12px",
                  fontSize: "13px",
                  fontWeight: plan.isPopular ? 800 : 700,
                  textDecoration: "none",
                  background: plan.isPopular
                    ? "linear-gradient(135deg,#7B2FBE,#A78BFA,#F472B6)"
                    : "transparent",
                  color: plan.isPopular ? "#ffffff" : "rgba(255,255,255,0.5)",
                  border: plan.isPopular ? "none" : "1px solid rgba(255,255,255,0.10)",
                  boxShadow: plan.isPopular
                    ? "0 4px 14px rgba(167,139,250,0.25)"
                    : "none",
                }}
              >
                {plan.ctaLabel}
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <Link
            href="/pricing"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              border: "1px solid rgba(255,255,255,0.10)",
              color: "rgba(255,255,255,0.35)",
              borderRadius: "999px",
              padding: "10px 24px",
              fontSize: "13px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Сравнить все тарифы подробно →
          </Link>
        </div>
      </div>
    </section>
  );
}
