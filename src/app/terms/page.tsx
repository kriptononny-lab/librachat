import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
  description: "Условия использования сервиса LibraChat.",
};

const SECTIONS = [
  {
    num: "1",
    title: "Общие положения",
    content:
      "LibraChat предоставляет доступ к ИИ-ассистенту на условиях настоящего соглашения. Сервис доступен пользователям, достигшим возраста 18 лет или имеющим согласие законного представителя.",
  },
  {
    num: "2",
    title: "Регистрация и аккаунт",
    content:
      "Для использования полного функционала необходима регистрация. Ты несёшь ответственность за сохранность своих учётных данных и все действия, совершённые под твоим аккаунтом.",
  },
  {
    num: "3",
    title: "Правила использования",
    content:
      "Запрещается использовать LibraChat для создания вредоносного контента, нарушения прав третьих лиц, обхода ограничений сервиса или автоматизированного доступа без разрешения.",
  },
  {
    num: "4",
    title: "Оплата и возврат",
    content:
      "Платные тарифы оплачиваются авансом. Возврат средств возможен в течение 7 дней после первой оплаты при условии минимального использования сервиса.",
  },
  {
    num: "5",
    title: "Интеллектуальная собственность",
    content:
      "Контент, созданный с помощью LibraChat, принадлежит тебе. LibraChat сохраняет права на платформу, модели и технологии. Копирование или реверс-инжиниринг сервиса запрещён.",
  },
  {
    num: "6",
    title: "Ограничение ответственности",
    content:
      "LibraChat предоставляется «как есть». Мы не гарантируем абсолютную точность ответов ИИ. Рекомендуем проверять критически важную информацию через независимые источники.",
  },
  {
    num: "7",
    title: "Изменение условий",
    content:
      "Мы вправе изменять условия соглашения, уведомляя пользователей за 30 дней до вступления изменений в силу через email или уведомление в сервисе.",
  },
  {
    num: "8",
    title: "Контакты",
    content:
      "По вопросам соглашения: support@librachat.kz. Коммерческие предложения: business@librachat.kz",
  },
];

export default function TermsPage() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100dvh",
        flexDirection: "column",
        background: "#040408",
      }}
    >
      <Header />
      <main style={{ flex: 1, paddingTop: "68px" }}>
        <section style={{ padding: "60px 0 80px" }}>
          <div className="container-site" style={{ maxWidth: "760px" }}>
            <div
              className="section-badge"
              style={{ marginBottom: "16px", width: "fit-content" }}
            >
              <span className="badge-dot" />
              ПРАВОВАЯ ИНФОРМАЦИЯ
            </div>
            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: "#F0EEFF",
                marginBottom: "10px",
              }}
            >
              Пользовательское соглашение
            </h1>
            <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "48px" }}>
              Обновлено: 14 апреля 2024 · Версия 2.0
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {SECTIONS.map((section) => (
                <div key={section.num} style={{ display: "flex", gap: "20px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#C4B5FD",
                      background: "rgba(167,139,250,0.12)",
                      border: "1px solid rgba(167,139,250,0.25)",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {section.num}
                  </div>
                  <div>
                    <h2
                      style={{
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "#F0EEFF",
                        marginBottom: "8px",
                      }}
                    >
                      {section.title}
                    </h2>
                    <p style={{ fontSize: "14px", color: "#9CA3B8", lineHeight: 1.8 }}>
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "48px",
                paddingTop: "24px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Link
                href="/privacy"
                style={{ fontSize: "13px", color: "#9CA3B8", textDecoration: "none" }}
              >
                Политика конфиденциальности
              </Link>
              <Link
                href="/contact"
                style={{
                  fontSize: "13px",
                  color: "#9CA3B8",
                  textDecoration: "none",
                  marginLeft: "auto",
                }}
              >
                Написать в поддержку
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
