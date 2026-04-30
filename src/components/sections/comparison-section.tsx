"use client";

import { motion } from "motion/react";
import { Check, X } from "lucide-react";

const DEFAULT_ROWS = [
  {
    feature: "Работает без VPN",
    libra: { ok: true, text: "Да, в России и СНГ" },
    other: { ok: false, text: "Нужен VPN" },
  },
  {
    feature: "Галлюцинации",
    libra: { ok: true, text: "Строго по данным" },
    other: { ok: false, text: "Выдумывает факты" },
  },
  {
    feature: "Работа с файлами",
    libra: { ok: true, text: "До 50 МБ, Excel, PDF" },
    other: { ok: false, text: "Ограничено или платно" },
  },
  {
    feature: "Помнит контекст",
    libra: { ok: true, text: "В рамках проекта" },
    other: { ok: false, text: "Теряет через 1 чат" },
  },
  {
    feature: "Интерфейс на русском",
    libra: { ok: true, text: "Полностью" },
    other: { ok: false, text: "Частично или нет" },
  },
  {
    feature: "Понимает бизнес-реалии РФ",
    libra: { ok: true, text: "WB, Ozon, российский рынок" },
    other: { ok: false, text: "Западный контекст" },
  },
];

type CompRow = {
  feature: string;
  libraOk: boolean;
  libraText: string;
  otherOk: boolean;
  otherText: string;
};

export function ComparisonSection({ texts = {} }: { texts?: Record<string, unknown> }) {
  const rawRows = texts["comparisonRows"];
  const ROWS: {
    feature: string;
    libra: { ok: boolean; text: string };
    other: { ok: boolean; text: string };
  }[] = Array.isArray(rawRows)
    ? (rawRows as CompRow[]).map((r) => ({
        feature: r.feature,
        libra: { ok: r.libraOk, text: r.libraText },
        other: { ok: r.otherOk, text: r.otherText },
      }))
    : DEFAULT_ROWS;
  const badge = (texts["comparisonBadge"] as string) ?? "СРАВНЕНИЕ";
  const title = (texts["comparisonTitle"] as string) ?? "LibraChat vs обычный ИИ";
  const subtitle =
    (texts["comparisonSubtitle"] as string) ??
    "Не все ИИ одинаковы. Вот почему мы другие.";
  const colFeature = (texts["comparisonColFeature"] as string) ?? "ФУНКЦИЯ";
  const colOther = (texts["comparisonColOther"] as string) ?? "Обычный ИИ";

  return (
    <section
      style={{
        background: "#040408",
        padding: "80px 0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{ textAlign: "center", marginBottom: "48px" }}
        >
          <div className="section-badge" style={{ marginBottom: "16px" }}>
            <span className="badge-dot" />
            {badge}
          </div>
          <h2
            style={{
              fontFamily: "var(--font-unbounded, 'Unbounded', sans-serif)",
              fontSize: "clamp(24px, 3vw, 40px)",
              fontWeight: 800,
              color: "#F0EEFF",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: "12px",
            }}
          >
            {title.split(" vs ")[0]}
            {" vs "}
            <span
              style={{
                background: "linear-gradient(135deg,#7B2FBE,#A78BFA,#F472B6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {title.split(" vs ")[1] ?? "обычный ИИ"}
            </span>
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "#9CA3B8",
              maxWidth: "480px",
              margin: "0 auto",
            }}
          >
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            maxWidth: "820px",
            margin: "0 auto",
          }}
        >
          {/* ── Desktop: таблица 3 колонки ── */}
          <div
            className="comp-desktop"
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                background: "rgba(13,13,26,0.97)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  padding: "16px 20px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#6B7280",
                  letterSpacing: "0.06em",
                }}
              >
                {colFeature}
              </div>
              <div
                style={{
                  padding: "16px 20px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#C4B5FD",
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(167,139,250,0.06)",
                  textAlign: "center",
                }}
              >
                LibraChat ✦
              </div>
              <div
                style={{
                  padding: "16px 20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#6B7280",
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center",
                }}
              >
                {colOther}
              </div>
            </div>

            {/* Rows */}
            {ROWS.map((row, i) => (
              <div
                key={row.feature}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  borderBottom:
                    i < ROWS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  background: i % 2 === 0 ? "rgba(13,13,26,0.5)" : "transparent",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    fontSize: "14px",
                    color: "#9CA3B8",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {row.feature}
                </div>
                <div
                  style={{
                    padding: "16px 20px",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(167,139,250,0.04)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Check size={14} color="#F472B6" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", color: "#C4B5FD" }}>
                    {row.libra.text}
                  </span>
                </div>
                <div
                  style={{
                    padding: "16px 20px",
                    borderLeft: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    opacity: 1,
                  }}
                >
                  <X size={14} color="#9CA3B8" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: "13px", color: "#9CA3B8" }}>
                    {row.other.text}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Mobile: карточки по фичам ── */}
          <div className="comp-mobile">
            {ROWS.map((row) => (
              <div
                key={row.feature}
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(13,13,26,0.84)",
                  overflow: "hidden",
                }}
              >
                {/* Заголовок фичи */}
                <div
                  style={{
                    padding: "14px 16px",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#F0EEFF",
                    background: "rgba(13,13,26,0.97)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {row.feature}
                </div>

                {/* LibraChat */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "12px 16px",
                    background: "rgba(167,139,250,0.06)",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <Check
                    size={16}
                    color="#F472B6"
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#C4B5FD",
                        letterSpacing: "0.04em",
                        marginBottom: "2px",
                      }}
                    >
                      LIBRACHAT ✦
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#F0EEFF",
                        lineHeight: 1.45,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {row.libra.text}
                    </div>
                  </div>
                </div>

                {/* Обычный ИИ */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "12px 16px",
                  }}
                >
                  <X
                    size={16}
                    color="#9CA3B8"
                    style={{ flexShrink: 0, marginTop: "2px" }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "#6B7280",
                        letterSpacing: "0.04em",
                        marginBottom: "2px",
                      }}
                    >
                      {colOther.toUpperCase()}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#9CA3B8",
                        lineHeight: 1.45,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {row.other.text}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
