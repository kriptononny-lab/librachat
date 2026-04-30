import type { Metadata } from "next";
import Link from "next/link";
import { ServerHeader } from "@/components/layout/server-header";
import { Footer } from "@/components/layout/footer";
import { Mail, Phone, MessageSquare, Building2, Users, Send } from "lucide-react";
import { fetchStrapiContactMethods, fetchStrapiContactReasons } from "@/lib/strapi";
import { buildMetadata, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";

const FALLBACK_TITLE = "Контакты и запрос демо LibraChat";
const FALLBACK_DESC =
  "Свяжитесь с командой LibraChat — запросите персональное демо, задайте технический вопрос или обсудите корпоративное решение для вашей компании.";

// На странице Контакты пока нет Single Type в CMS, поэтому SEO статичный.
// Когда появится — поменять на await fetchContactPage() и передать seo.
export const metadata: Metadata = buildMetadata({
  fallbackTitle: FALLBACK_TITLE,
  fallbackDescription: FALLBACK_DESC,
  url: "https://librachat.ai/contact",
  type: "website",
});

const CONTACT_BREADCRUMBS = breadcrumbJsonLd([
  { name: "Главная", url: "https://librachat.ai" },
  { name: "Контакты", url: "https://librachat.ai/contact" },
]);

const FALLBACK_CONTACTS = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@librachat.ai",
    href: "mailto:hello@librachat.ai",
  },
  {
    icon: MessageSquare,
    label: "Telegram",
    value: "@librachat_support",
    href: "https://t.me/librachat_support",
  },
  {
    icon: Phone,
    label: "Телефон",
    value: "+7 (800) 000-00-00",
    href: "tel:+78000000000",
  },
];

const FALLBACK_REASONS = [
  {
    icon: Send,
    title: "Запросить демо",
    desc: "Персональная демонстрация под задачи вашего бизнеса. Менеджер свяжется в течение 2 часов.",
  },
  {
    icon: Building2,
    title: "Корпоративное решение",
    desc: "Обсудить тарифы для команды, интеграции и условия корпоративного договора.",
  },
  {
    icon: Users,
    title: "Партнёрство",
    desc: "Стать партнёром LibraChat — реферальные программы, White Label и OEM.",
  },
];

// Маппинги иконок для CMS-значений
const CONTACT_ICON_MAP = {
  Mail: Mail,
  MessageSquare: MessageSquare,
  Phone: Phone,
} as const;

const REASON_ICON_MAP = {
  Send: Send,
  Building2: Building2,
  Users: Users,
} as const;

export default async function ContactPage() {
  const [cmsContacts, cmsReasons] = await Promise.all([
    fetchStrapiContactMethods(),
    fetchStrapiContactReasons(),
  ]);

  const CONTACTS =
    cmsContacts.length > 0
      ? cmsContacts.map((c) => ({
          icon: c.icon ? CONTACT_ICON_MAP[c.icon] : Mail,
          label: c.label ?? "",
          value: c.value ?? "",
          href: c.href ?? "#",
        }))
      : FALLBACK_CONTACTS;

  const REASONS =
    cmsReasons.length > 0
      ? cmsReasons.map((r) => ({
          icon: r.icon ? REASON_ICON_MAP[r.icon] : Send,
          title: r.title ?? "",
          desc: r.description ?? "",
        }))
      : FALLBACK_REASONS;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100dvh",
        flexDirection: "column",
        background: "#040408",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(CONTACT_BREADCRUMBS)}
      />
      <ServerHeader />
      <main style={{ flex: 1, paddingTop: "68px" }}>
        {/* Hero */}
        <section style={{ padding: "80px 0 60px", textAlign: "center" }}>
          <div className="container-site" style={{ maxWidth: "680px" }}>
            <div className="section-badge" style={{ marginBottom: "20px" }}>
              <span className="badge-dot" />
              СВЯЗАТЬСЯ С НАМИ
            </div>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "#F0EEFF",
                marginBottom: "20px",
              }}
            >
              Мы на связи
            </h1>
            <p style={{ fontSize: "18px", color: "#9CA3B8", lineHeight: 1.7 }}>
              Ответим на любой вопрос — от технической интеграции до индивидуального
              тарифа
            </p>
          </div>
        </section>

        {/* Основной контент */}
        <section style={{ padding: "0 0 120px" }}>
          <div className="container-site">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                gap: "32px",
                alignItems: "start",
              }}
            >
              {/* Форма */}
              <div
                style={{
                  borderRadius: "20px",
                  padding: "32px",
                  background: "rgba(13,13,26,0.92)",
                  border: "1px solid rgba(167,139,250,0.18)",
                }}
              >
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#F0EEFF",
                    marginBottom: "8px",
                  }}
                >
                  Запросить демо
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#9CA3B8",
                    marginBottom: "28px",
                    lineHeight: 1.6,
                  }}
                >
                  Оставьте заявку — наш менеджер свяжется в течение 2 часов
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                      gap: "12px",
                    }}
                  >
                    {["Ваше имя", "Должность"].map((pl) => (
                      <input
                        key={pl}
                        type="text"
                        placeholder={pl}
                        style={{
                          padding: "13px 16px",
                          borderRadius: "12px",
                          fontSize: "14px",
                          color: "#F0EEFF",
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          outline: "none",
                          width: "100%",
                        }}
                      />
                    ))}
                  </div>
                  {[
                    "Email для связи",
                    "Телефон (необязательно)",
                    "Название компании",
                  ].map((pl) => (
                    <input
                      key={pl}
                      type="text"
                      placeholder={pl}
                      style={{
                        padding: "13px 16px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        color: "#F0EEFF",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        outline: "none",
                        width: "100%",
                      }}
                    />
                  ))}
                  <select
                    style={{
                      padding: "13px 16px",
                      borderRadius: "12px",
                      fontSize: "14px",
                      color: "#9CA3B8",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      outline: "none",
                    }}
                  >
                    <option value="">Размер команды</option>
                    <option>1–5 человек</option>
                    <option>6–20 человек</option>
                    <option>21–100 человек</option>
                    <option>100+ человек</option>
                  </select>
                  <textarea
                    placeholder="Расскажите о своей задаче (необязательно)"
                    rows={3}
                    style={{
                      padding: "13px 16px",
                      borderRadius: "12px",
                      fontSize: "14px",
                      color: "#F0EEFF",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      outline: "none",
                      resize: "none",
                      fontFamily: "inherit",
                    }}
                  />

                  <Link
                    href="https://librachat.kz/auth"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "15px",
                      borderRadius: "999px",
                      background: "#A78BFA",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: 600,
                      textDecoration: "none",
                      boxShadow: "0 4px 24px rgba(167,139,250,0.4)",
                      marginTop: "4px",
                    }}
                  >
                    <Send size={16} />
                    Отправить заявку
                  </Link>
                  <p style={{ fontSize: "12px", textAlign: "center", color: "#6B7280" }}>
                    Нажимая кнопку, вы принимаете{" "}
                    <Link
                      href="/privacy"
                      style={{ color: "#C4B5FD", textDecoration: "none" }}
                    >
                      политику конфиденциальности
                    </Link>
                  </p>
                </div>
              </div>

              {/* Правая колонка */}
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {/* Контакты */}
                <div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#F0EEFF",
                      marginBottom: "20px",
                    }}
                  >
                    Прямые контакты
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {CONTACTS.map(({ icon: Icon, label, value, href }) => (
                      <Link
                        key={label}
                        href={href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "16px",
                          padding: "16px 20px",
                          borderRadius: "16px",
                          background: "rgba(13,13,26,0.88)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          textDecoration: "none",
                          transition: "border-color 200ms ease",
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "12px",
                            background: "rgba(167,139,250,0.12)",
                            border: "1px solid rgba(167,139,250,0.22)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={18} color="#C4B5FD" />
                        </div>
                        <div>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#9CA3B8",
                              marginBottom: "2px",
                            }}
                          >
                            {label}
                          </p>
                          <p
                            style={{
                              fontSize: "15px",
                              fontWeight: 600,
                              color: "#F0EEFF",
                            }}
                          >
                            {value}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Причины обратиться */}
                <div>
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#F0EEFF",
                      marginBottom: "20px",
                    }}
                  >
                    Чем можем помочь
                  </h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {REASONS.map(({ icon: Icon, title, desc }) => (
                      <div
                        key={title}
                        style={{
                          display: "flex",
                          gap: "14px",
                          padding: "16px 20px",
                          borderRadius: "16px",
                          background: "rgba(13,13,26,0.88)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: "rgba(167,139,250,0.1)",
                            border: "1px solid rgba(167,139,250,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Icon size={16} color="#C4B5FD" />
                        </div>
                        <div>
                          <p
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                              color: "#F0EEFF",
                              marginBottom: "4px",
                            }}
                          >
                            {title}
                          </p>
                          <p
                            style={{
                              fontSize: "13px",
                              color: "#9CA3B8",
                              lineHeight: 1.6,
                            }}
                          >
                            {desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
