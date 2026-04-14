"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { UserPlus, MessageCircle, Sparkles, ArrowRight } from "lucide-react";

export function StepsSection({ texts = {} }: { texts?: Record<string, string> }) {
  const badge = texts["steps.badge"] ?? "3 ПРОСТЫХ ШАГА";
  const title = texts["steps.title"] ?? "Начни работу за 2 минуты";
  const subtitle =
    texts["steps.subtitle"] ?? "Никаких сложных настроек — просто зайди и начни";
  const STEPS = [
    {
      number: "1",
      Icon: UserPlus,
      title: texts["steps.1.title"] ?? "Зарегистрируйтесь",
      desc:
        texts["steps.1.desc"] ??
        "Создайте аккаунт за 30 секунд. Никаких данных карты — просто email и пароль.",
    },
    {
      number: "2",
      Icon: MessageCircle,
      title: texts["steps.2.title"] ?? "Задайте вопрос",
      desc:
        texts["steps.2.desc"] ??
        "Напишите любой вопрос на русском — я понимаю контекст и отвечаю сразу.",
    },
    {
      number: "3",
      Icon: Sparkles,
      title: texts["steps.3.title"] ?? "Получите результат",
      desc:
        texts["steps.3.desc"] ??
        "Деловой текст, код, анализ или перевод — готово мгновенно.",
    },
  ];
  return (
    <section
      style={{
        padding: "120px 0",
        background: "#07060e",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container-site">
        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          style={{ textAlign: "center", marginBottom: "80px" }}
        >
          <div className="section-badge" style={{ marginBottom: "16px" }}>
            <span className="badge-dot" />
            {badge}
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 3vw, 46px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#f2f0ff",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              marginTop: "14px",
              fontSize: "16px",
              color: "#a89ec0",
              maxWidth: "360px",
              margin: "14px auto 0",
              lineHeight: 1.65,
            }}
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Шаги */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
            gap: "40px",
            position: "relative",
          }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.14 }}
              className="step-col"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
              }}
            >
              {/* Иконка + номер — вместе */}
              <div style={{ position: "relative", zIndex: 1, marginBottom: "28px" }}>
                {/* Кружок с иконкой */}
                <div
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "50%",
                    background: "rgba(101,88,224,0.12)",
                    border: "1.5px solid rgba(101,88,224,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 24px rgba(101,88,224,0.08)",
                  }}
                >
                  <step.Icon size={28} color="#9b8ff8" strokeWidth={1.5} />
                </div>

                {/* Номер — маленький бейдж снизу-справа */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "-4px",
                    right: "-4px",
                    width: "22px",
                    height: "22px",
                    borderRadius: "50%",
                    background: "#6558e0",
                    border: "2px solid #07060e",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  {step.number}
                </div>
              </div>

              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#f2f0ff",
                  marginBottom: "10px",
                  lineHeight: 1.3,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.75,
                  color: "#7a7490",
                  maxWidth: "220px",
                }}
              >
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          style={{ textAlign: "center", marginTop: "60px" }}
        >
          <Link
            href="https://librachat.kz/auth"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "14px 32px",
              borderRadius: "999px",
              background: "#6558e0",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 4px 24px rgba(101,88,224,0.4)",
            }}
          >
            Начать бесплатно <ArrowRight size={16} />
          </Link>
          <p style={{ marginTop: "12px", fontSize: "13px", color: "#4a4560" }}>
            30 секунд · Без карты · Без VPN
          </p>
        </motion.div>
      </div>
    </section>
  );
}
