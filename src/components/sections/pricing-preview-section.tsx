"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Check } from "lucide-react";

const PLANS = [
  {
    id: "free",
    label: "Попробовать без риска",
    price: "0 ₽",
    period: "навсегда бесплатно",
    points: ["20 сообщений в день", "Базовый диалог", "5 загрузок файлов"],
    cta: { label: "Начать бесплатно", href: "https://librachat.kz/auth" },
    highlight: false,
  },
  {
    id: "pro",
    label: "Полная мощность без ограничений",
    price: "990 ₽",
    period: "в месяц",
    points: ["Безлимитные запросы", "Файлы до 50 МБ", "Анализ документов", "Работа без VPN"],
    cta: { label: "Начать бесплатно", href: "https://librachat.kz/auth" },
    highlight: true,
  },
  {
    id: "team",
    label: "Маркетинг-отдел для команды",
    price: "1 990 ₽",
    period: "в месяц",
    points: ["Всё из Pro плана", "Управление командой", "Приоритетная поддержка", "Корпоративный биллинг"],
    cta: { label: "Обсудить команду", href: "/contact?type=business" },
    highlight: false,
  },
];

export function PricingPreviewSection() {
  const [active, setActive] = useState("pro");
  const plan = PLANS.find(p => p.id === active)!;

  return (
    <section style={{ padding: "120px 0", background: "#07060e", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth:"780px", margin:"0 auto", paddingLeft:"clamp(16px, 4vw, 48px)", paddingRight:"clamp(16px, 4vw, 48px)" }}>

        {/* Заголовок */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <div className="section-badge" style={{ marginBottom: "16px" }}>ТАРИФЫ</div>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#f0eeff" }}>
            Ты хочешь <span className="text-gradient">такой результат?</span>
          </h2>
          <p style={{ marginTop: "14px", fontSize: "16px", color: "#a89ec0", lineHeight: 1.6 }}>
            Выбери — и сразу увидишь разницу
          </p>
        </div>

        {/* Переключатели */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
          {PLANS.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p.id)}
              style={{
                padding: "14px 20px",
                borderRadius: "14px",
                fontSize: "15px",
                fontWeight: 500,
                textAlign: "left",
                cursor: "pointer",
                border: active === p.id ? "1px solid rgba(108,92,231,0.5)" : "1px solid rgba(255,255,255,0.07)",
                background: active === p.id ? "rgba(101,88,224,0.1)" : "rgba(20,19,28,0.5)",
                color: active === p.id ? "#f0eeff" : "#a89ec0",
                transition: "all 180ms ease",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Активная карточка */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            style={{
              borderRadius: "20px",
              padding: "36px",
              background: plan.highlight ? "rgba(101,88,224,0.07)" : "rgba(14,13,25,0.92)",
              border: plan.highlight ? "1px solid rgba(101,88,224,0.4)" : "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "32px" }}>

              {/* Цена и опции */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                    <span style={{ fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 800, color: "#f0eeff", letterSpacing: "-0.02em" }}>{plan.price}</span>
                    <span style={{ fontSize: "15px", color: "#a89ec0" }}>{plan.period}</span>
                  </div>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {plan.points.map((pt) => (
                    <li key={pt} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#a89ec0" }}>
                      <Check size={16} color="#22c55e" style={{ flexShrink: 0 }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", flexShrink: 0 }}>
                <Link
                  href={plan.cta.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "14px 32px",
                    borderRadius: "999px",
                    fontSize: "15px",
                    fontWeight: 600,
                    textDecoration: "none",
                    background: plan.highlight ? "#6558e0" : "transparent",
                    color: plan.highlight ? "#fff" : "#f0eeff",
                    border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.18)",
                    boxShadow: plan.highlight ? "0 4px 20px rgba(101,88,224,0.4)" : "none",
                    transition: "all 180ms ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {plan.cta.label}
                </Link>
                <Link href="/pricing" style={{ fontSize: "13px", textAlign: "center", color: "#4a4560", textDecoration: "none" }}>
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
