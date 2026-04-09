"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const FAQ = [
  { q: "Работает без VPN?", a: "Да. Я работаю в России напрямую — никаких VPN, дополнительных настроек и задержек. Просто открыл и работаешь." },
  { q: "Я придумываю факты или работаю по данным?", a: "Строго по данным. Если ты загружаешь файл или документ — я отвечаю только на основе его содержимого. Никаких галлюцинаций и выдуманных цифр." },
  { q: "Чем ты отличаешься от ChatGPT?", a: "Я понимаю российский менталитет и бизнес-реалии. Работаю без VPN. Помню контекст в рамках проекта — не нужно заново объяснять кто ты и что продаёшь. Интерфейс и поддержка на русском." },
  { q: "Можно ли использовать для работы с большими файлами?", a: "Да. Загружай Excel на 900 строк, PDF-отчёты, презентации — я проанализирую и выдам выводы с 100% точностью без выдумок." },
  { q: "Как начать? Нужна ли карта?", a: "Нет. Регистрация занимает 30 секунд — только email и пароль. Карта не нужна. 14 дней пробного периода бесплатно на любом тарифе." },
  { q: "Есть мобильное приложение?", a: "Да, есть приложения для iOS и Android. Работают без VPN — так же, как веб-версия." },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section style={{ padding: "120px 0", background: "#100f1d", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth:"780px", margin:"0 auto", paddingLeft:"clamp(16px, 4vw, 48px)", paddingRight:"clamp(16px, 4vw, 48px)" }}>

        {/* Заголовок */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <div className="section-badge" style={{ marginBottom: "16px" }}>ЧАСТО СПРАШИВАЮТ</div>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#f0eeff" }}>
            Остались вопросы?
          </h2>
          <p style={{ marginTop: "14px", fontSize: "16px", color: "#a89ec0", lineHeight: 1.6 }}>
            Ответы на самые популярные вопросы
          </p>
        </div>

        {/* Аккордеон */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {FAQ.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Кнопка вопроса */}
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                  gap: "16px", padding: "20px 24px", textAlign: "left", cursor: "pointer", border: "none",
                  background: open === i ? "rgba(101,88,224,0.07)" : "rgba(14,13,25,0.84)",
                  transition: "background 150ms ease",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: 600, color: "#f0eeff", lineHeight: 1.4, flex: 1 }}>
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    flexShrink: 0, width: "30px", height: "30px", borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "20px", fontWeight: 300, lineHeight: 1,
                    background: "rgba(101,88,224,0.12)",
                    border: "1px solid rgba(101,88,224,0.25)",
                    color: "#8a7cf8",
                  }}
                >
                  +
                </motion.span>
              </button>

              {/* Ответ */}
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <p style={{
                      padding: "20px 24px",
                      fontSize: "15px", lineHeight: 1.8, color: "#a89ec0",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      background: "rgba(8,7,16,0.55)",
                    }}>
                      {item.a}
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
