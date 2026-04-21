"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Eye,
  BookOpen,
  Search,
  TrendingUp,
  FileText,
  Lightbulb,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TYPE_COLOR } from "@/lib/articles";
import type { ArticleCard } from "@/lib/articles";

// ── Карточка ─────────────────────────────────────────
function Card({ article, large = false }: { article: ArticleCard; large?: boolean }) {
  const tc = TYPE_COLOR[article.type];
  return (
    <Link
      href={`/learn/${article.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        overflow: "hidden",
        background: "rgba(13,13,26,0.85)",
        border: "1px solid rgba(255,255,255,0.08)",
        textDecoration: "none",
        height: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          height: large ? "180px" : "120px",
          background: article.gradient ?? "rgba(13,13,26,0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {article.photo ? (
          <Image
            src={article.photo}
            alt={article.title}
            fill
            style={{
              objectFit: "cover",
              objectPosition: article.photo?.includes("bazarkulova")
                ? "center 20%"
                : "center top",
            }}
          />
        ) : (
          <BookOpen size={large ? 32 : 22} color="rgba(255,255,255,0.15)" />
        )}
        {article.photo && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 50%, rgba(4,4,8,0.7))",
            }}
          />
        )}
        <span
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            fontSize: "11px",
            fontWeight: 600,
            padding: "3px 10px",
            borderRadius: "999px",
            background: tc.bg,
            color: tc.text,
            border: `1px solid ${tc.border}`,
            zIndex: 1,
          }}
        >
          {article.type.toUpperCase()}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "16px 18px",
          flex: 1,
        }}
      >
        <h3
          style={{
            fontSize: large ? "15px" : "13px",
            fontWeight: 600,
            color: "#F0EEFF",
            lineHeight: 1.4,
          }}
        >
          {article.title}
        </h3>
        {large && (
          <p style={{ fontSize: "13px", color: "#9CA3B8", lineHeight: 1.6 }}>
            {article.excerpt}
          </p>
        )}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginTop: "auto",
            paddingTop: "8px",
          }}
        >
          {article.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "11px",
                padding: "2px 8px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.05)",
                color: "#9CA3B8",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#7B2FBE,#A78BFA)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "8px",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {article.author[0]}
            </div>
            <span>{article.author}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <Clock size={11} />
            <span>{article.readTime} мин</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "3px",
              marginLeft: "auto",
            }}
          >
            <Eye size={11} />
            <span>{article.views}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Типы фильтров ─────────────────────────────────────
const FILTERS = [
  { key: "все", label: "Все", icon: null },
  { key: "статья", label: "Статьи", icon: <FileText size={13} /> },
  { key: "кейс", label: "Кейсы", icon: <TrendingUp size={13} /> },
  { key: "гайд", label: "Гайды", icon: <Lightbulb size={13} /> },
];

// ── Главный компонент ─────────────────────────────────
export function LearnClient({ articles: ARTICLES }: { articles: ArticleCard[] }) {
  const [activeFilter, setActiveFilter] = useState("все");
  const [search, setSearch] = useState("");

  const realCases = ARTICLES.filter((a) => a.slug.startsWith("keys-"));
  const featured = ARTICLES.filter((a) => a.featured).slice(0, 5);

  const filteredArticles = ARTICLES.filter((a) => {
    const matchType = activeFilter === "все" || a.type === activeFilter;
    const matchSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchType && matchSearch;
  });

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
        {/* Hero */}
        <section
          style={{
            padding: "80px 0 60px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%) translateY(-33%)",
              width: "600px",
              height: "400px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(167,139,250,0.12),transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            className="container-site"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div className="section-badge">
              <span className="badge-dot" />
              ОБУЧЕНИЕ И КЕЙСЫ
            </div>
            <h1
              style={{
                fontSize: "clamp(32px, 5vw, 60px)",
                fontWeight: 800,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "#F0EEFF",
                maxWidth: "700px",
              }}
            >
              Учитесь быстрее
              <br />
              <span className="text-gradient">с реальными примерами</span>
            </h1>
            <p
              style={{
                fontSize: "16px",
                color: "#9CA3B8",
                maxWidth: "480px",
                lineHeight: 1.7,
              }}
            >
              Статьи, гайды и кейсы от команды LibraChat и реальных пользователей.
            </p>

            {/* Счётчики */}
            <div style={{ display: "flex", gap: "40px" }}>
              {[
                { value: `${ARTICLES.length}`, label: "материалов" },
                { value: "3", label: "реальных кейса" },
                { value: "50K+", label: "читателей" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "22px",
                      fontWeight: 800,
                      color: "#A78BFA",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.value}
                  </p>
                  <p style={{ fontSize: "12px", color: "#9CA3B8", marginTop: "4px" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Поиск */}
            <div style={{ width: "100%", maxWidth: "560px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 18px",
                  borderRadius: "16px",
                  background: "rgba(13,13,26,0.9)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Search size={18} color="#6B7280" style={{ flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Найти статью или кейс..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontSize: "15px",
                    color: "#F0EEFF",
                  }}
                />
              </div>
            </div>

            {/* Фильтры */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "6px 16px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 150ms ease",
                    border: "none",
                    background:
                      activeFilter === f.key ? "rgba(167,139,250,0.2)" : "transparent",
                    color: activeFilter === f.key ? "#C4B5FD" : "#9CA3B8",
                    outline:
                      activeFilter === f.key
                        ? "1px solid rgba(167,139,250,0.4)"
                        : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {f.icon} {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Реальные кейсы — только если нет активного фильтра или фильтр "кейс" */}
        {(activeFilter === "все" || activeFilter === "кейс") && !search && (
          <section
            style={{
              padding: "80px 0",
              background: "#080810",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="container-site">
              <div style={{ marginBottom: "40px" }}>
                <div className="section-badge" style={{ marginBottom: "14px" }}>
                  <span className="badge-dot" />
                  РЕАЛЬНЫЕ ИСТОРИИ
                </div>
                <h2
                  style={{
                    fontSize: "clamp(26px, 3vw, 40px)",
                    fontWeight: 800,
                    color: "#F0EEFF",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Как клиенты используют <span className="text-gradient">LibraChat</span>
                </h2>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "20px",
                }}
              >
                {realCases.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/learn/${article.slug}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "20px",
                      overflow: "hidden",
                      background: "rgba(13,13,26,0.85)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      textDecoration: "none",
                    }}
                  >
                    <div
                      style={{
                        height: "200px",
                        position: "relative",
                        overflow: "hidden",
                        background: article.gradient ?? "rgba(13,13,26,0.9)",
                      }}
                    >
                      {article.photo && (
                        <Image
                          src={article.photo}
                          alt={article.title}
                          fill
                          style={{
                            objectFit: "cover",
                            objectPosition: article.photo?.includes("bazarkulova")
                              ? "center 20%"
                              : "center top",
                          }}
                        />
                      )}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to bottom, transparent 40%, rgba(4,4,8,0.85))",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "14px",
                          left: "14px",
                          fontSize: "11px",
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: "999px",
                          background: TYPE_COLOR["кейс"].bg,
                          color: TYPE_COLOR["кейс"].text,
                          border: `1px solid ${TYPE_COLOR["кейс"].border}`,
                        }}
                      >
                        КЕЙС
                      </span>
                    </div>
                    <div
                      style={{
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            overflow: "hidden",
                            flexShrink: 0,
                            border: "2px solid rgba(167,139,250,0.25)",
                          }}
                        >
                          {article.photo ? (
                            <Image
                              src={article.photo}
                              alt={article.author}
                              width={36}
                              height={36}
                              style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                background: "#A78BFA",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "12px",
                                fontWeight: 700,
                                color: "#fff",
                              }}
                            >
                              {article.author[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <p
                            style={{
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#F0EEFF",
                            }}
                          >
                            {article.author}
                          </p>
                          <p style={{ fontSize: "11px", color: "#9CA3B8" }}>
                            {(article as { authorRole?: string }).authorRole}
                          </p>
                        </div>
                      </div>
                      <h3
                        style={{
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#F0EEFF",
                          lineHeight: 1.4,
                        }}
                      >
                        {article.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "13px",
                          color: "#9CA3B8",
                          lineHeight: 1.6,
                          flex: 1,
                        }}
                      >
                        {article.excerpt}
                      </p>
                      <div style={{ fontSize: "13px", color: "#A78BFA" }}>
                        Читать кейс →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Избранные — только без фильтра */}
        {activeFilter === "все" && !search && (
          <section
            style={{
              padding: "80px 0",
              background: "#040408",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="container-site">
              <div style={{ marginBottom: "32px" }}>
                <div className="section-badge" style={{ marginBottom: "14px" }}>
                  <span className="badge-dot" />
                  РЕДАКЦИЯ РЕКОМЕНДУЕТ
                </div>
                <h2
                  style={{
                    fontSize: "clamp(26px, 3vw, 40px)",
                    fontWeight: 800,
                    color: "#F0EEFF",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Избранные материалы
                </h2>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "16px",
                }}
              >
                {featured.map((article) => (
                  <Card key={article.slug} article={article} large />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Все материалы — с фильтром */}
        <section
          style={{
            padding: "80px 0",
            background: activeFilter === "все" && !search ? "#080810" : "#040408",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="container-site">
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "12px",
                marginBottom: "32px",
              }}
            >
              <div style={{ marginRight: "auto" }}>
                <h2
                  style={{
                    fontSize: "clamp(22px, 2.5vw, 34px)",
                    fontWeight: 800,
                    color: "#F0EEFF",
                  }}
                >
                  {activeFilter === "все"
                    ? "Все материалы"
                    : activeFilter === "статья"
                      ? "Статьи"
                      : activeFilter === "кейс"
                        ? "Кейсы"
                        : "Гайды"}
                </h2>
                <p style={{ fontSize: "13px", color: "#6B7280", marginTop: "4px" }}>
                  Найдено {filteredArticles.length}{" "}
                  {filteredArticles.length === 1 ? "материал" : "материалов"}
                </p>
              </div>
            </div>

            {filteredArticles.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "16px",
                }}
              >
                {filteredArticles.map((article) => (
                  <Card key={article.slug} article={article} large />
                ))}
              </div>
            ) : (
              <div
                style={{ textAlign: "center", padding: "60px 20px", color: "#6B7280" }}
              >
                <BookOpen size={40} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
                <p style={{ fontSize: "16px" }}>По запросу ничего не найдено</p>
                <button
                  onClick={() => {
                    setActiveFilter("все");
                    setSearch("");
                  }}
                  style={{
                    marginTop: "12px",
                    fontSize: "13px",
                    color: "#A78BFA",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Сбросить фильтры
                </button>
              </div>
            )}

            {/* Пагинация — только 1 страница */}
            {filteredArticles.length > 0 && (
              <div
                style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    background: "rgba(167,139,250,0.2)",
                    color: "#C4B5FD",
                    border: "1px solid rgba(167,139,250,0.4)",
                  }}
                >
                  1
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: "80px 0",
            background: "#040408",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="container-site">
            <div
              className="cta-inner"
              style={{
                borderRadius: "24px",
                padding: "72px 40px",
                textAlign: "center",
                background: "rgba(13,13,26,0.97)",
                border: "1px solid rgba(167,139,250,0.18)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(90deg,transparent,rgba(167,139,250,0.6),transparent)",
                }}
              />
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div className="section-badge">
                  <span className="badge-dot" />
                  14 ДНЕЙ БЕСПЛАТНО
                </div>
                <h2
                  style={{
                    fontSize: "clamp(26px, 3vw, 44px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: "#F0EEFF",
                  }}
                >
                  Попробуйте сами — <span className="text-gradient">бесплатно</span>
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#9CA3B8",
                    maxWidth: "380px",
                    lineHeight: 1.7,
                  }}
                >
                  Начните работу за 30 секунд. Карта не нужна.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    href="https://librachat.kz/auth"
                    style={{
                      padding: "14px 32px",
                      borderRadius: "999px",
                      background: "#A78BFA",
                      color: "#fff",
                      fontSize: "15px",
                      fontWeight: 600,
                      textDecoration: "none",
                      boxShadow: "0 4px 20px rgba(167,139,250,0.4)",
                    }}
                  >
                    Начать бесплатно
                  </Link>
                  <Link
                    href="/pricing"
                    style={{
                      padding: "14px 32px",
                      borderRadius: "999px",
                      background: "transparent",
                      color: "#F0EEFF",
                      fontSize: "15px",
                      fontWeight: 600,
                      textDecoration: "none",
                      border: "1px solid rgba(167,139,250,0.25)",
                    }}
                  >
                    Смотреть тарифы
                  </Link>
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
