import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ExternalLink } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Как LibraChat собирает, использует и защищает ваши персональные данные.",
};

const S = {
  p: { fontSize: "15px", color: "#9CA3B8", lineHeight: 1.8 } as React.CSSProperties,
  h2: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#F0EEFF",
    marginBottom: "14px",
  } as React.CSSProperties,
  li: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    fontSize: "14px",
    color: "#9CA3B8",
    lineHeight: 1.7,
    listStyle: "none",
  } as React.CSSProperties,
};

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        scrollMarginTop: "96px",
      }}
    >
      <h2 style={S.h2}>{title}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {children}
      </div>
    </section>
  );
}

function Callout({
  type,
  children,
}: {
  type: "info" | "warning" | "success";
  children: React.ReactNode;
}) {
  const styles = {
    info: { bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)" },
    warning: { bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)" },
    success: { bg: "rgba(167,139,250,0.08)", border: "rgba(167,139,250,0.25)" },
  }[type];
  const icons = { info: "ℹ️", warning: "⚠️", success: "✅" };
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "14px 18px",
        borderRadius: "14px",
        fontSize: "14px",
        color: "#9CA3B8",
        lineHeight: 1.7,
        background: styles.bg,
        border: `1px solid ${styles.border}`,
      }}
    >
      <span style={{ flexShrink: 0 }}>{icons[type]}</span>
      <div>{children}</div>
    </div>
  );
}

const sections = [
  { id: "data", label: "Данные которые мы собираем" },
  { id: "usage", label: "Как мы используем данные" },
  { id: "storage", label: "Хранение и защита" },
  { id: "cookies", label: "Cookies и трекеры" },
  { id: "rights", label: "Ваши права" },
  { id: "contacts", label: "Контакты" },
];

export default function PrivacyPage() {
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
        {/* Шапка */}
        <section style={{ padding: "60px 0 48px" }}>
          <div className="container-site">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
                gap: "40px",
              }}
            >
              <div>
                <div
                  className="section-badge"
                  style={{ marginBottom: "16px", width: "fit-content" }}
                >
                  ✦ ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
                </div>
                <h1
                  style={{
                    fontSize: "clamp(28px, 4vw, 48px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: "#F0EEFF",
                    marginBottom: "16px",
                  }}
                >
                  Как мы защищаем
                  <br />
                  ваши данные
                </h1>
                <p style={{ ...S.p, maxWidth: "480px", marginBottom: "20px" }}>
                  Мы серьёзно относимся к конфиденциальности. Этот документ объясняет
                  какие данные мы собираем, зачем и как их защищаем.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    fontSize: "13px",
                    color: "#4B556A",
                  }}
                >
                  <span>Обновлено: 14 апреля 2024</span>
                  <span>Версия: 2.1</span>
                  <span>Чтение: ~10 мин</span>
                </div>
              </div>

              <div
                style={{
                  borderRadius: "16px",
                  padding: "20px",
                  background: "rgba(13,13,26,0.84)",
                  border: "1px solid rgba(167,139,250,0.2)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "16px",
                  }}
                >
                  <Shield size={16} color="#C4B5FD" />
                  <p style={{ fontSize: "13px", fontWeight: 600, color: "#F0EEFF" }}>
                    Кратко о главном
                  </p>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {[
                    "Не продаём персональные данные третьим лицам",
                    "Данные хранятся на серверах в России",
                    "Вы можете удалить аккаунт в любое время",
                    "Соответствуем 152-ФЗ и GDPR",
                  ].map((t) => (
                    <li
                      key={t}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        fontSize: "13px",
                        color: "#9CA3B8",
                        lineHeight: 1.6,
                        listStyle: "none",
                      }}
                    >
                      <span style={{ color: "#22c55e", flexShrink: 0 }}>✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Контент + сайдбар */}
        <section
          style={{ paddingBottom: "80px", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="container-site"
            style={{ maxWidth: "1000px", paddingTop: "48px" }}
          >
            <div style={{ display: "grid", gap: "40px", alignItems: "start" }}>
              {/* Основной контент */}
              <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
                <Callout type="info">
                  <strong>Важно:</strong> Используя LibraChat, вы соглашаетесь с условиями
                  данного документа. Вопросы — на{" "}
                  <a href="mailto:support@librachat.kz" style={{ color: "#C4B5FD" }}>
                    support@librachat.kz
                  </a>
                </Callout>

                <Section id="data" title="Данные которые мы собираем">
                  <p style={S.p}>
                    В рамках работы LibraChat мы получаем только те данные, которые
                    необходимы для работы сервиса — без избыточного сбора информации.
                  </p>
                  <div
                    className="table-scroll"
                    style={{
                      borderRadius: "12px",
                      overflow: "auto",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <table
                      style={{
                        width: "100%",
                        fontSize: "13px",
                        borderCollapse: "collapse",
                      }}
                    >
                      <thead>
                        <tr
                          style={{
                            background: "rgba(13,13,26,0.92)",
                            borderBottom: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          {["Категория", "Что собираем", "Зачем"].map((h) => (
                            <th
                              key={h}
                              style={{
                                textAlign: "left",
                                padding: "12px 16px",
                                fontSize: "11px",
                                fontWeight: 600,
                                color: "#9CA3B8",
                                textTransform: "uppercase",
                                letterSpacing: "0.06em",
                              }}
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          ["Аккаунт", "Email, имя, аватар", "Идентификация пользователя"],
                          ["Диалоги", "Текст сообщений, файлы", "Обработка запросов ИИ"],
                          [
                            "Технические",
                            "IP, браузер, устройство",
                            "Безопасность и аналитика",
                          ],
                          ["Поддержка", "Переписка с командой", "Решение проблем"],
                        ].map(([cat, data, why], i) => (
                          <tr
                            key={cat}
                            style={{
                              borderTop: "1px solid rgba(255,255,255,0.05)",
                              background:
                                i % 2 === 0 ? "rgba(13,13,26,0.5)" : "transparent",
                            }}
                          >
                            <td
                              style={{
                                padding: "12px 16px",
                                fontWeight: 600,
                                color: "#F0EEFF",
                                fontSize: "13px",
                              }}
                            >
                              {cat}
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                color: "#9CA3B8",
                                fontSize: "13px",
                              }}
                            >
                              {data}
                            </td>
                            <td
                              style={{
                                padding: "12px 16px",
                                color: "#9CA3B8",
                                fontSize: "13px",
                              }}
                            >
                              {why}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Callout type="success">
                    Мы <strong>не продаём</strong> и не сдаём в аренду персональные данные
                    сторонним организациям или рекламным сетям. Никогда.
                  </Callout>
                </Section>

                <Section id="usage" title="Как мы используем данные">
                  <p style={S.p}>
                    Собранные данные используются строго в рамках предоставления и
                    улучшения сервиса:
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                      "Авторизация и идентификация пользователя",
                      "Обработка запросов к ИИ и формирование ответов",
                      "Синхронизация истории диалогов между устройствами",
                      "Отправка технических уведомлений",
                      "Предотвращение мошенничества и защита от злоупотреблений",
                    ].map((item) => (
                      <li key={item} style={S.li}>
                        <span style={{ color: "#A78BFA", flexShrink: 0 }}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Callout type="warning">
                    Диалог с LibraChat не передаётся третьим лицам. Обезличенные данные
                    могут использоваться для улучшения качества ответов — личная
                    информация при этом удаляется.
                  </Callout>
                </Section>

                <Section id="storage" title="Хранение и защита данных">
                  <p style={S.p}>
                    Все данные хранятся на защищённых серверах с шифрованием AES-256.
                    Доступ имеет только уполномоченный персонал в рамках служебных
                    обязанностей.
                  </p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                    }}
                  >
                    {[
                      ["Данные аккаунта", "До удаления"],
                      ["История диалогов", "7-90 дней"],
                      ["Платёжные данные", "6 лет (НК)"],
                      ["Технические логи", "90 дней"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        style={{
                          padding: "14px 16px",
                          borderRadius: "12px",
                          background: "rgba(13,13,26,0.75)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#4B556A",
                            marginBottom: "4px",
                          }}
                        >
                          {label}
                        </p>
                        <p
                          style={{ fontSize: "14px", fontWeight: 600, color: "#F0EEFF" }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </Section>

                <Section id="cookies" title="Cookies и трекеры">
                  <p style={S.p}>
                    LibraChat использует cookies для обеспечения работы сервиса. Рекламные
                    трекеры третьих сторон не используются.
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[
                      {
                        label: "Необходимые",
                        text: "Авторизация, безопасность сессии — нельзя отключить",
                        color: "#ef4444",
                      },
                      {
                        label: "Функциональные",
                        text: "Настройки языка и интерфейса — можно отключить",
                        color: "#A78BFA",
                      },
                      {
                        label: "Аналитические",
                        text: "Анонимная статистика посещаемости — можно отключить",
                        color: "#22c55e",
                      },
                    ].map((c) => (
                      <li key={c.label} style={{ ...S.li, alignItems: "center" }}>
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: c.color,
                            flexShrink: 0,
                          }}
                        />
                        <span>
                          <strong style={{ color: "#F0EEFF" }}>{c.label}</strong> —{" "}
                          {c.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Section>

                <Section id="rights" title="Ваши права">
                  <p style={S.p}>
                    В соответствии с 152-ФЗ и GDPR вы имеете следующие права:
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {[
                      "Право на доступ — получить копию всех данных",
                      "Право на исправление — обновить ошибочные данные",
                      "Право на удаление — запросить полное удаление аккаунта",
                      "Право на перенос — получить данные в машиночитаемом формате",
                      "Право на возражение — отказаться от обработки данных для обучения",
                    ].map((r) => (
                      <li key={r} style={S.li}>
                        <span style={{ color: "#C4B5FD", flexShrink: 0 }}>→</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  <p style={S.p}>
                    Для реализации прав обратитесь через форму в настройках аккаунта.
                    Запрос обрабатывается в течение 30 рабочих дней.
                  </p>
                </Section>

                <Section id="contacts" title="Контакты и вопросы">
                  <p style={S.p}>По вопросам конфиденциальности:</p>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                    }}
                  >
                    {[
                      ["Поддержка", "support@librachat.kz"],
                      ["Коммерческие вопросы", "business@librachat.kz"],
                      ["Телефон", "+7 747 870 37 83"],
                      ["Время работы", "Пн-Пт, 9:00-18:00 (GMT+6)"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        style={{
                          padding: "14px 16px",
                          borderRadius: "12px",
                          background: "rgba(13,13,26,0.75)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "12px",
                            color: "#4B556A",
                            marginBottom: "4px",
                          }}
                        >
                          {label}
                        </p>
                        <p
                          style={{ fontSize: "14px", fontWeight: 500, color: "#F0EEFF" }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>

              {/* Сайдбар */}
              <aside>
                <div
                  style={{
                    position: "sticky",
                    top: "88px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "16px",
                      padding: "20px",
                      background: "rgba(13,13,26,0.84)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#F0EEFF",
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        marginBottom: "14px",
                      }}
                    >
                      Содержание
                    </p>
                    <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      {sections.map((s, i) => (
                        <a
                          key={s.id}
                          href={`#${s.id}`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontSize: "12px",
                            padding: "7px 10px",
                            color: "#9CA3B8",
                            textDecoration: "none",
                            borderLeft: "2px solid rgba(255,255,255,0.06)",
                            transition: "color 150ms",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "11px",
                              color: "#4B556A",
                              fontFamily: "monospace",
                              flexShrink: 0,
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {s.label}
                        </a>
                      ))}
                    </nav>
                  </div>
                  <div
                    style={{
                      borderRadius: "16px",
                      padding: "20px",
                      background: "rgba(13,13,26,0.84)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#F0EEFF",
                        marginBottom: "8px",
                      }}
                    >
                      Появились вопросы?
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#9CA3B8",
                        marginBottom: "14px",
                        lineHeight: 1.6,
                      }}
                    >
                      Ответим в течение 24 часов в рабочие дни.
                    </p>
                    <Link
                      href="/contact"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px",
                        borderRadius: "999px",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#F0EEFF",
                        textDecoration: "none",
                        border: "1px solid rgba(255,255,255,0.16)",
                        background: "transparent",
                      }}
                    >
                      Поддержка
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Другие документы */}
        <section
          style={{ paddingBottom: "80px", borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="container-site"
            style={{ paddingTop: "48px", maxWidth: "700px" }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#F0EEFF",
                textAlign: "center",
                marginBottom: "24px",
              }}
            >
              Другие документы
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                {
                  title: "Пользовательское соглашение",
                  desc: "Правила использования сервиса",
                  href: "/terms",
                },
                { title: "Контакты", desc: "Связаться с поддержкой", href: "/contact" },
              ].map((doc) => (
                <Link
                  key={doc.title}
                  href={doc.href}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    padding: "20px",
                    borderRadius: "16px",
                    background: "rgba(13,13,26,0.75)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    textDecoration: "none",
                  }}
                >
                  <ExternalLink size={15} color="#4B556A" />
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#F0EEFF" }}>
                    {doc.title}
                  </p>
                  <p style={{ fontSize: "12px", color: "#9CA3B8" }}>{doc.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
