"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { StrapiFaq } from "@/lib/strapi";

const STATIC_FAQ = [
  {
    question: "Работает без VPN?",
    answer:
      "Да. Я работаю в России напрямую — никаких VPN, дополнительных настроек и задержек. Просто открыл и работаешь.",
  },
  {
    question: "Я придумываю факты или работаю по данным?",
    answer:
      "Строго по данным. Если ты загружаешь файл или документ — я отвечаю только на основе его содержимого. Никаких галлюцинаций и выдуманных цифр.",
  },
  {
    question: "Чем ты отличаешься от ChatGPT?",
    answer:
      "Я понимаю российский менталитет и бизнес-реалии. Работаю без VPN. Помню контекст в рамках проекта — не нужно заново объяснять кто ты и что продаёшь. Интерфейс и поддержка на русском.",
  },
  {
    question: "Можно ли использовать для работы с большими файлами?",
    answer:
      "Да. Загружай Excel на 900 строк, PDF-отчёты, презентации — я проанализирую и выдам выводы с 100% точностью без выдумок.",
  },
  {
    question: "Как начать? Нужна ли карта?",
    answer:
      "Нет. Регистрация занимает 30 секунд — только email и пароль. Карта не нужна. 14 дней пробного периода бесплатно на любом тарифе.",
  },
  {
    question: "Есть мобильное приложение?",
    answer:
      "Да, есть приложения для iOS и Android. Работают без VPN — так же, как веб-версия.",
  },
];

export function FaqSection({
  faqs,
  texts = {},
}: {
  faqs?: StrapiFaq[];
  texts?: Record<string, string>;
}) {
  const badge = texts["faq.badge"] ?? "ЧАСТО СПРАШИВАЮТ";
  const title = texts["faq.title"] ?? "Остались вопросы?";
  const subtitle = texts["faq.subtitle"] ?? "Ответы на самые популярные вопросы";
  const [open, setOpen] = useState<number | null>(null);

  const items =
    faqs && faqs.length > 0
      ? faqs.map((f) => ({ question: f.question, answer: f.answer }))
      : STATIC_FAQ;

  return (
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
            {badge}
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
            {title}
          </h2>
          <p
            style={{
              marginTop: "14px",
              fontSize: "16px",
              color: "#9CA3B8",
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                  padding: "20px 24px",
                  textAlign: "left",
                  cursor: "pointer",
                  border: "none",
                  background:
                    open === i ? "rgba(167,139,250,0.07)" : "rgba(13,13,26,0.84)",
                  transition: "background 150ms ease",
                }}
              >
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#F0EEFF",
                    lineHeight: 1.4,
                    flex: 1,
                  }}
                >
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    flexShrink: 0,
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: 300,
                    lineHeight: 1,
                    background: "rgba(167,139,250,0.12)",
                    border: "1px solid rgba(167,139,250,0.25)",
                    color: "#A78BFA",
                  }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      style={{
                        padding: "20px 24px",
                        fontSize: "15px",
                        lineHeight: 1.8,
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
