"use client";

import { motion } from "motion/react";
import Link from "next/link";

export function CtaSection({ texts = {} }: { texts?: Record<string, string> }) {
  const badge = texts["cta.badge"] ?? "14 ДНЕЙ БЕСПЛАТНО";
  const title = texts["cta.title"] ?? "Попробуй LibraChat для твоих задач";
  return (
    <section
      style={{
        padding: "120px 0",
        background: "#040408",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: "28px",
            padding: "80px 48px",
            textAlign: "center",
            background: "rgba(13,13,26,0.97)",
            border: "1px solid rgba(167,139,250,0.2)",
          }}
        >
          {/* Линия свечения сверху */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(167,139,250,0.6), transparent)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div className="section-badge">{badge}</div>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 56px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: "#F0EEFF",
                maxWidth: "600px",
              }}
            >
              {title}
            </h2>

            <p
              style={{
                fontSize: "16px",
                color: "#9CA3B8",
                maxWidth: "380px",
                lineHeight: 1.7,
              }}
            >
              14 дней бесплатно — без карты, без обязательств. Отмена в любой момент.
            </p>

            <div
              className="btn-pair"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "12px",
                marginTop: "8px",
              }}
            >
              <Link
                href="https://librachat.kz/auth"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 36px",
                  borderRadius: "999px",
                  background: "#A78BFA",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 4px 24px rgba(167,139,250,0.45)",
                  transition: "transform 150ms ease",
                }}
              >
                Начать бесплатно
              </Link>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 36px",
                  borderRadius: "999px",
                  background: "transparent",
                  color: "#F0EEFF",
                  fontSize: "16px",
                  fontWeight: 600,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.18)",
                  transition: "border-color 150ms ease",
                }}
              >
                Запросить демо
              </Link>
            </div>

            <p style={{ fontSize: "13px", color: "#4B556A", marginTop: "4px" }}>
              Уже более 1 480 пользователей доверяют LibraChat · Поддержка 24/7
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
