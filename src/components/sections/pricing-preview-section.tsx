"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Check } from "lucide-react";
import type { StrapiPlan } from "@/lib/strapi";

const STATIC_PLANS = [
  {
    planId: "free",
    name: "Первые шаги без риска",
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
    name: "Полная мощность без ограничений",
    subtitle: "Полная мощность без ограничений",
    priceMonthly: 990,
    priceAnnual: 790,
    isPopular: true,
    ctaLabel: "Начать бесплатно",
    ctaHref: "https://librachat.kz/auth",
    features: [
      { label: "Безлимитные запросы", ok: true },
      { label: "Файлы до 50 МБ", ok: true },
      { label: "Анализ документов", ok: true },
      { label: "Работа без VPN", ok: true },
    ],
  },
  {
    planId: "team",
    name: "Маркетинг-отдел для вашей команды",
    subtitle: "Маркетинг-отдел для команды",
    priceMonthly: 1990,
    priceAnnual: 1590,
    isPopular: false,
    ctaLabel: "Обсудить команду",
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
  const [active, setActive] = useState(
    items.find((p) => p.isPopular)?.planId ?? items[0]?.planId ?? "pro"
  );
  const plan = items.find((p) => p.planId === active) ?? items[0];

  return (
    <section
      style={{
        padding: "120px 0",
        background: "#07060e",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container-site" style={{ maxWidth: "780px" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <div className="section-badge" style={{ marginBottom: "16px" }}>
            ТАРИФЫ
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#f0eeff",
            }}
          >
            Ты хочешь <span className="text-gradient">такой результат?</span>
          </h2>
          <p
            style={{
              marginTop: "14px",
              fontSize: "16px",
              color: "#a89ec0",
              lineHeight: 1.6,
            }}
          >
            Выбери — и сразу увидишь разницу
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "28px",
          }}
        >
          {items.map((p) => (
            <button
              key={p.planId}
              onClick={() => setActive(p.planId)}
              style={{
                padding: "14px 20px",
                borderRadius: "14px",
                fontSize: "15px",
                fontWeight: 500,
                textAlign: "left",
                cursor: "pointer",
                border:
                  active === p.planId
                    ? "1px solid rgba(108,92,231,0.5)"
                    : "1px solid rgba(255,255,255,0.07)",
                background:
                  active === p.planId ? "rgba(101,88,224,0.1)" : "rgba(20,19,28,0.5)",
                color: active === p.planId ? "#f0eeff" : "#a89ec0",
                transition: "all 180ms ease",
              }}
            >
              {p.subtitle || p.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              borderRadius: "20px",
              padding: "36px",
              background: plan.isPopular
                ? "rgba(101,88,224,0.07)"
                : "rgba(14,13,25,0.92)",
              border: plan.isPopular
                ? "1px solid rgba(101,88,224,0.4)"
                : "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "32px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                  <span
                    style={{
                      fontSize: "clamp(36px, 4vw, 52px)",
                      fontWeight: 800,
                      color: "#f0eeff",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {fmt(plan.priceMonthly)}
                  </span>
                  {plan.priceMonthly > 0 && (
                    <span style={{ fontSize: "15px", color: "#a89ec0" }}>в месяц</span>
                  )}
                  {plan.priceMonthly === 0 && (
                    <span style={{ fontSize: "15px", color: "#a89ec0" }}>
                      навсегда бесплатно
                    </span>
                  )}
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {(plan.features ?? [])
                    .filter((f) => f.ok)
                    .map((f) => (
                      <li
                        key={f.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          fontSize: "15px",
                          color: "#a89ec0",
                        }}
                      >
                        <Check size={16} color="#22c55e" style={{ flexShrink: 0 }} />
                        {f.label}
                      </li>
                    ))}
                </ul>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  flexShrink: 0,
                }}
              >
                <Link
                  href={plan.ctaHref}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "14px 32px",
                    borderRadius: "999px",
                    fontSize: "15px",
                    fontWeight: 600,
                    textDecoration: "none",
                    background: plan.isPopular ? "#6558e0" : "transparent",
                    color: plan.isPopular ? "#fff" : "#f0eeff",
                    border: plan.isPopular ? "none" : "1px solid rgba(255,255,255,0.18)",
                    boxShadow: plan.isPopular
                      ? "0 4px 20px rgba(101,88,224,0.4)"
                      : "none",
                    whiteSpace: "nowrap",
                  }}
                >
                  {plan.ctaLabel}
                </Link>
                <Link
                  href="/pricing"
                  style={{
                    fontSize: "13px",
                    textAlign: "center",
                    color: "#4a4560",
                    textDecoration: "none",
                  }}
                >
                  Сравнить все тарифы →
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
