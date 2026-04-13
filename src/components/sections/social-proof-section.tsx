"use client";

import { motion, useInView, useMotionValue, animate } from "motion/react";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { StrapiTestimonial } from "@/lib/strapi";

function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(count, to, {
      duration: 1.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      onUpdate(v) {
        if (ref.current)
          ref.current.textContent = Math.round(v).toLocaleString("ru") + suffix;
      },
    });
    return c.stop;
  }, [inView, to, suffix, count]);
  return <span ref={ref}>0{suffix}</span>;
}

const STATIC_TESTIMONIALS = [
  {
    name: "Юлия Шишакова",
    role: "ИП, Магазин отделочных материалов из дерева",
    content:
      "LibraChat — это не просто чат-бот, это напарник, который понимает задачи реального бизнеса. Помог взглянуть на магазин со стороны и внедрить практики, о которых я раньше только читала.",
    result: "Стратегия за один вечер вместо месяца",
    photo: "/case-shishakova.jpg",
    photoPos: "center 40%",
    initials: "ЮШ",
    href: "/learn/keys-shishakova",
  },
  {
    name: "Василий Ожерельев",
    role: "Компания «Вуди», e-commerce",
    content:
      "С LibraChat мы перестали гадать, «зайдёт» товар или нет. Я просто даю ему данные, а он выдаёт готовую стратегию: от SEO-описания до рекламных связок.",
    result: "Запуск нового товара в 5 раз быстрее",
    photo: "/case-ozherelyev.jpg",
    photoPos: "center 15%",
    initials: "ВО",
    href: "/learn/keys-ozherelyev",
  },
  {
    name: "Марианна Базаркулова",
    role: "Профессиональный маркетолог",
    content:
      "Либрачат — первый сервис, который не врёт, не тупит и помнит всё о моих клиентах благодаря разделению на проекты. Теперь это мой главный инструмент для аналитики.",
    result: "Десятки клиентов в одном окне без хаоса",
    photo: "/case-bazarkulova.jpg",
    photoPos: "center 20%",
    initials: "МБ",
    href: "/learn/keys-bazarkulova",
  },
];

const STATS = [
  {
    el: <AnimatedCounter to={1480} suffix="+" />,
    label: "тестировщиков подтвердили преимущества",
  },
  { el: <span>4.9 / 5</span>, label: "средняя оценка пользователей" },
  { el: <span>30 сек</span>, label: "среднее время регистрации" },
];

function StarRow() {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#c9920a">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function SocialProofSection({
  testimonials,
}: {
  testimonials?: StrapiTestimonial[];
}) {
  const items =
    testimonials && testimonials.length > 0
      ? testimonials.map((t) => ({
          name: t.name,
          role: t.role,
          content: t.content,
          result: t.result,
          photo: t.photo?.url ?? null,
          photoPos: t.photoPos ?? "center top",
          initials: t.initials,
          href: t.href,
        }))
      : STATIC_TESTIMONIALS;

  return (
    <section
      style={{
        padding: "120px 0",
        background: "#100f1d",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <div className="section-badge" style={{ marginBottom: "16px" }}>
            НАМ ДОВЕРЯЮТ
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 3vw, 44px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              color: "#f0eeff",
            }}
          >
            Те, кто уже <span className="text-gradient">со мной</span>
          </h2>
        </motion.div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {items.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42, delay: i * 0.08 }}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "20px",
                overflow: "hidden",
                background: "rgba(14,13,25,0.84)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="case-photo-wrap"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  background: "rgba(14,13,25,0.92)",
                  flexShrink: 0,
                }}
              >
                {t.photo && (
                  <Image
                    src={t.photo}
                    alt={t.name}
                    fill
                    style={{ objectFit: "cover", objectPosition: t.photoPos }}
                  />
                )}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, transparent 40%, rgba(12,12,16,0.9))",
                  }}
                />
              </div>
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  flex: 1,
                }}
              >
                <StarRow />
                <p
                  style={{
                    fontSize: "14px",
                    lineHeight: 1.75,
                    color: "#a89ec0",
                    flex: 1,
                    fontStyle: "italic",
                  }}
                >
                  «{t.content}»
                </p>
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#9b8ff8",
                    background: "rgba(101,88,224,0.08)",
                    border: "1px solid rgba(101,88,224,0.18)",
                  }}
                >
                  ↑ {t.result}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        flexShrink: 0,
                        border: "2px solid rgba(101,88,224,0.3)",
                      }}
                    >
                      {t.photo ? (
                        <Image
                          src={t.photo}
                          alt={t.name}
                          width={40}
                          height={40}
                          style={{ objectFit: "cover", width: "100%", height: "100%" }}
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            background: "#6558e0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#fff",
                          }}
                        >
                          {t.initials}
                        </div>
                      )}
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: 600, color: "#f0eeff" }}>
                        {t.name}
                      </p>
                      <p style={{ fontSize: "12px", color: "#a89ec0", marginTop: "2px" }}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={t.href}
                    style={{
                      fontSize: "12px",
                      color: "#6558e0",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Читать кейс →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
