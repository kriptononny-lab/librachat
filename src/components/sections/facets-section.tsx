"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ArrowRight, Zap, Briefcase, GraduationCap } from "lucide-react";

const TABS = [
  { id: "self",     label: "Для себя" },
  { id: "business", label: "Для бизнеса" },
  { id: "study",    label: "Для учёбы" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const CARDS: Record<TabId, { icon: React.ReactNode; badge: string; title: string; desc: string; superpower: string; href: string; }[]> = {
  self: [
    { icon: <Zap size={20} color="#9b8ff8" />, badge: "Контент-завод на автопилоте", title: "Со мной — без выгорания и бесконечной рутины", desc: "Сделаю за тебя сценарии для Reels, виральные посты и контент-планы за секунды.", superpower: "Креатив без тормозов. Мой разработчик убрал ограничения — теперь я иду дальше и глубже, чем другие.", href: "/features/content" },
    { icon: <Briefcase size={20} color="#9b8ff8" />, badge: "Маркетинг-отдел в одном окне", title: "Не хватает рук или бюджета?", desc: "Смотри, вот эта рутина вся на мне: от создания описаний товаров для маркетплейсов до анализа конкурентов и ответов клиентам. Ещё я знаю, как продать твой продукт дороже.", superpower: "Если ты дашь мне большой объём данных — отчёт на 900 строк — я проанализирую его со 100% точностью без выдумок.", href: "/features/marketing" },
    { icon: <GraduationCap size={20} color="#9b8ff8" />, badge: "Турбо-режим для учёбы", title: "Учись быстрее, делай больше", desc: "Я мгновенно делаю саммари из часовых лекций, помогаю разобраться в сложных темах и пишу качественные работы, которые проходят проверки.", superpower: "Пересказ 2-часового видео за 30 секунд. Загружай мне книги целиком — выдам готовую работу без галлюцинаций.", href: "/features/study" },
  ],
  business: [
    { icon: <Briefcase size={20} color="#9b8ff8" />, badge: "Помогаю твоей команде", title: "Масштабируй без раздувания штата", desc: "Я закрываю рутину целого маркетингового отдела: аналитика, документы, переписка, ответы клиентам — всё на мне.", superpower: "Анализирую отчёт на 900 строк со 100% точностью. Никаких выдумок — только данные.", href: "/business" },
    { icon: <Zap size={20} color="#9b8ff8" />, badge: "Контент-завод", title: "SEO, карточки, описания — за секунды", desc: "Пишу SEO-тексты для WB/Ozon, создаю ТЗ для дизайнеров, адаптирую западный контент под российский рынок.", superpower: "Один чат заменяет копирайтера, маркетолога и аналитика одновременно.", href: "/business" },
    { icon: <GraduationCap size={20} color="#9b8ff8" />, badge: "Аналитик под ключ", title: "Данные без выдумок", desc: "Загрузи любой файл — я выдаю выводы строго по данным. Никаких галлюцинаций, только факты.", superpower: "Разделение на проекты: каждый клиент — отдельное пространство с сохранённым контекстом.", href: "/business" },
  ],
  study: [
    { icon: <GraduationCap size={20} color="#9b8ff8" />, badge: "Умный репетитор 24/7", title: "Я первый, кто реально помогает освоить программу", desc: "Объясняю любые темы простым языком, помогаю с домашними заданиями, готовлю к экзаменам без шаблонных ответов.", superpower: "Загружай книги целиком — я выдам готовую работу на основе их контента без галлюцинаций.", href: "/features/study" },
    { icon: <Zap size={20} color="#9b8ff8" />, badge: "Саммари за секунды", title: "Пересказ 2-часового видео за 30 секунд", desc: "Загрузи лекцию или учебник — получишь структурированный конспект, ключевые тезисы и план подготовки.", superpower: "Курсовая без галлюцинаций. Я не очередной — я первый, кто работает честно.", href: "/features/study" },
    { icon: <Briefcase size={20} color="#9b8ff8" />, badge: "Работы и проекты", title: "Качественные работы, которые проходят проверки", desc: "Помогаю структурировать курсовую, нахожу источники, проверяю логику аргументов и оформление.", superpower: "Пишу на основе реальных данных — ни одного выдуманного факта.", href: "/features/study" },
  ],
};

export function FacetsSection() {
  const [activeTab, setActiveTab] = useState<TabId>("self");

  return (
    <section style={{ padding: "120px 0", background: "#07060e", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container-site">

        {/* Заголовок */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}
          style={{ textAlign: "center", marginBottom: "52px" }}
        >
          <div className="section-badge" style={{ marginBottom: "16px" }}>СДЕЛАЕТ МНОГОЕ ДЛЯ ТЕБЯ</div>
          <h2 style={{ fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#f0eeff" }}>
            Три грани <span className="text-gradient">одного инструмента</span>
          </h2>
          <p style={{ marginTop: "14px", fontSize: "16px", color: "#a89ec0", maxWidth: "440px", margin: "14px auto 0", lineHeight: 1.6 }}>
            Это не месячный план на каждого. Это для тебя — и только.
          </p>
        </motion.div>

        {/* Табы */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", padding: "4px", borderRadius: "999px", gap: "4px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  position: "relative",
                  padding: "8px 22px",
                  borderRadius: "999px",
                  fontSize: "15px",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  background: activeTab === tab.id ? "rgba(101,88,224,0.18)" : "transparent",
                  color: activeTab === tab.id ? "#f0eeff" : "#a89ec0",
                  outline: activeTab === tab.id ? "1px solid rgba(101,88,224,0.35)" : "none",
                  transition: "all 200ms ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Карточки */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}
          >
            {CARDS[activeTab].map((card, i) => (
              <Link
                key={card.badge}
                href={card.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  padding: "28px",
                  borderRadius: "20px",
                  background: "rgba(20,19,30,0.9)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  textDecoration: "none",
                  transition: "border-color 200ms ease, background 200ms ease, transform 200ms ease",
                }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "rgba(101,88,224,0.4)"; el.style.background = "rgba(26,25,40,0.98)"; el.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "rgba(255,255,255,0.07)"; el.style.background = "rgba(20,19,30,0.9)"; el.style.transform = "translateY(0)"; }}
              >
                {/* Иконка + бейдж */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: "rgba(101,88,224,0.12)", border: "1px solid rgba(101,88,224,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {card.icon}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: 600, background: "linear-gradient(135deg, #9b8ff8, #6558e0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {card.badge}
                  </span>
                </div>

                {/* Заголовок */}
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#f0eeff", lineHeight: 1.35 }}>
                  {card.title}
                </h3>

                {/* Описание */}
                <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#a89ec0", flex: 1 }}>
                  {card.desc}
                </p>

                {/* Супер-сила */}
                <div style={{ padding: "14px 16px", borderRadius: "14px", background: "rgba(101,88,224,0.07)", border: "1px solid rgba(101,88,224,0.16)", fontSize: "13px", lineHeight: 1.6, color: "#9b8ff8" }}>
                  <span style={{ fontWeight: 600 }}>Супер-сила: </span>
                  {card.superpower}
                </div>

                {/* Ссылка */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 500, color: "#6558e0" }}>
                  Попробовать
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
