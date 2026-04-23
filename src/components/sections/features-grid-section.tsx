"use client";

import {
  Shield,
  MessageSquare,
  FileText,
  PenLine,
  Code2,
  Languages,
  BarChart2,
  Users,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Shield,
  MessageSquare,
  FileText,
  PenLine,
  Code2,
  Languages,
  BarChart2,
  Users,
};

const FEATURES = [
  {
    icon: "MessageSquare",
    title: "Умный диалог",
    desc: "Понимает контекст и отвечает с учётом предыдущих сообщений.",
  },
  {
    icon: "FileText",
    title: "Анализ документов",
    desc: "Загружайте файлы и задавайте вопросы по содержимому.",
  },
  {
    icon: "PenLine",
    title: "Генерация контента",
    desc: "Тексты, идеи, переводы любого формата и объёма.",
  },
  {
    icon: "Code2",
    title: "Код и разработка",
    desc: "Помощь с программированием на 20+ языках.",
  },
  {
    icon: "Languages",
    title: "Перевод",
    desc: "Точный перевод на 50+ языков с сохранением стиля текста.",
  },
  {
    icon: "BarChart2",
    title: "Анализ данных",
    desc: "Загружайте отчёты — получайте инсайты и рекомендации.",
  },
  {
    icon: "Shield",
    title: "Безопасность",
    desc: "Шифрование данных, соответствие GDPR и ФЗ-152.",
  },
  {
    icon: "Users",
    title: "Команда",
    desc: "Добавляйте сотрудников, управляйте доступами и ролями.",
  },
];

export function FeaturesGridSection() {
  return (
    <section
      style={{
        padding: "80px 0 100px",
        background: "#040408",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container-site">
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <div className="section-badge" style={{ marginBottom: "14px" }}>
            <span className="badge-dot" />
            КЛЮЧЕВЫЕ ФУНКЦИИ
          </div>
          <h2
            style={{
              fontFamily: "var(--font-unbounded, 'Unbounded', sans-serif)",
              fontSize: "clamp(24px, 3vw, 40px)",
              fontWeight: 800,
              color: "#F0EEFF",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            Всё в одном окне
          </h2>
          <p style={{ fontSize: "16px", color: "#9CA3B8", marginTop: "12px" }}>
            8 инструментов — не нужно переключаться между сервисами
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "16px",
          }}
        >
          {FEATURES.map(({ icon, title, desc }) => {
            const Icon = ICON_MAP[icon] ?? Shield;
            return (
              <div
                key={title}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  padding: "24px",
                  borderRadius: "16px",
                  background: "rgba(13,13,26,0.75)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  transition: "border-color 200ms ease, transform 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(167,139,250,0.3)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "translateY(0)";
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
                  <Icon size={20} color="#C4B5FD" />
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
                    {title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "#9CA3B8", lineHeight: 1.65 }}>
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
