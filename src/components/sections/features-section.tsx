"use client";

import { motion } from "motion/react";
import {
  MessageSquare,
  FileText,
  Languages,
  PenLine,
  Code2,
  Shield,
  Puzzle,
  Smartphone,
} from "lucide-react";

const FEATURES = [
  {
    Icon: MessageSquare,
    title: "Умный диалог",
    desc: "Запоминает контекст — не нужно объяснять заново кто ты и что продаёшь.",
  },
  {
    Icon: FileText,
    title: "Работа с файлами",
    desc: "PDF, Excel, Word — анализирую и отвечаю строго по данным. Без выдумок.",
  },
  {
    Icon: Languages,
    title: "Переводчик",
    desc: "Точный перевод на 50+ языков с адаптацией под российский менталитет.",
  },
  {
    Icon: PenLine,
    title: "Генерация текста",
    desc: "Посты, письма, статьи, описания товаров — любой стиль за секунды.",
  },
  {
    Icon: Code2,
    title: "Помощь с кодом",
    desc: "Пишу, объясняю, дебажу. Любой язык, любая задача.",
  },
  {
    Icon: Shield,
    title: "Безопасность",
    desc: "Данные зашифрованы и не передаются третьим лицам. Работаю в России.",
  },
  {
    Icon: Puzzle,
    title: "Интеграции",
    desc: "API, Slack, Teams, Notion, 1C — подключаюсь к твоим системам.",
  },
  {
    Icon: Smartphone,
    title: "Без VPN",
    desc: "Работаю в России напрямую, без танцев с настройками. Просто открыл — и работаешь.",
  },
];

const cardStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "28px 24px",
  borderRadius: "16px",
  background: "rgba(28,25,23,0.92)",
  border: "1px solid rgba(255,255,255,0.07)",
  transition: "border-color 220ms ease, transform 220ms ease, background 220ms ease",
  cursor: "default",
};

const iconWrapStyle: React.CSSProperties = {
  width: "48px",
  height: "48px",
  borderRadius: "14px",
  background: "rgba(212,165,116,0.12)",
  border: "1px solid rgba(212,165,116,0.22)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

export function FeaturesSection() {
  return (
    <section
      style={{
        padding: "120px 0",
        background: "#131009",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <div className="section-badge" style={{ marginBottom: "16px" }}>
            ВСЁ В ОДНОМ ОКНЕ
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#FAF5EE",
            }}
          >
            Посмотри, что я могу <span className="text-gradient">сделать для тебя</span>
          </h2>
          <p
            style={{
              marginTop: "14px",
              fontSize: "16px",
              color: "#C8B89A",
              maxWidth: "440px",
              margin: "14px auto 0",
              lineHeight: 1.6,
            }}
          >
            Это лишь несколько идей. Но я могу больше.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {FEATURES.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              style={cardStyle}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(212,165,116,0.35)";
                el.style.background = "rgba(35,30,18,0.98)";
                el.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = "rgba(255,255,255,0.07)";
                el.style.background = "rgba(28,25,23,0.92)";
                el.style.transform = "translateY(0)";
              }}
            >
              <div style={iconWrapStyle}>
                <Icon size={22} color="#E8C49A" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#FAF5EE",
                    lineHeight: 1.3,
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#C8B89A" }}>
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
