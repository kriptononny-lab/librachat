import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Clock, Eye, BookOpen, Search, TrendingUp, FileText, Lightbulb } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ALL_ARTICLES as ARTICLES, ALL_TAGS, TYPE_COLOR } from "@/lib/articles";
import type { ArticleCard } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Обучение и кейсы",
  description: "Статьи, гайды и кейсы от команды LibraChat. Учитесь быстрее с реальными примерами.",
};

// ── Карточка статьи ───────────────────────────────
function Card({ article, large = false }: { article: ArticleCard; large?: boolean }) {
  const tc = TYPE_COLOR[article.type];
  return (
    <Link
      href={`/learn/${article.slug}`}
      style={{
        display: "flex", flexDirection: "column", borderRadius: "16px", overflow: "hidden",
        background: "rgba(14,13,25,0.88)", border: "1px solid rgba(255,255,255,0.08)",
        textDecoration: "none", height: "100%", transition: "border-color 200ms ease, transform 200ms ease",
      }}
    >
      {/* Превью */}
      <div style={{ position: "relative", height: large ? "180px" : "120px", background: article.gradient ?? "rgba(14,13,25,0.92)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>
        {article.photo
          ? <Image src={article.photo} alt={article.title} fill style={{ objectFit: "cover" }} />
          : <BookOpen size={large ? 32 : 22} color="rgba(255,255,255,0.15)" />
        }
        {article.photo && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(8,7,16,0.7))" }} />}
        <span style={{ position: "absolute", top: "12px", left: "12px", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px", background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`, zIndex: 1 }}>
          {article.type.toUpperCase()}
        </span>
      </div>

      {/* Контент */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "16px 18px", flex: 1 }}>
        <h3 style={{ fontSize: large ? "15px" : "13px", fontWeight: 600, color: "#f0eeff", lineHeight: 1.4 }}>
          {article.title}
        </h3>
        {large && <p style={{ fontSize: "13px", color: "#a89ec0", lineHeight: 1.6 }}>{article.excerpt}</p>}

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto", paddingTop: "8px" }}>
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "999px", background: "rgba(255,255,255,0.05)", color: "#a89ec0" }}>{tag}</span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "12px", color: "#4a4560" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "linear-gradient(135deg,#6558e0,#6558e0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", fontWeight: 700, color: "#fff" }}>
              {article.author[0]}
            </div>
            <span>{article.author}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}><Clock size={11} /><span>{article.readTime} мин</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: "3px", marginLeft: "auto" }}><Eye size={11} /><span>{article.views}</span></div>
        </div>
      </div>
    </Link>
  );
}

// ── Страница ──────────────────────────────────────
export default function LearnPage() {
  const featured   = ARTICLES.filter((a) => a.featured).slice(0, 5);
  const allArticles = ARTICLES;

  return (
    <div style={{ display: "flex", minHeight: "100dvh", flexDirection: "column", background: "#07060e" }}>
      <Header />
      <main style={{ flex: 1, paddingTop: "68px" }}>

        {/* ── HERO ── */}
        <section style={{ padding: "80px 0 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%) translateY(-33%)", width: "600px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle,rgba(101,88,224,0.15),transparent 70%)", pointerEvents: "none" }} />
          <div className="container-site" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
            <div className="section-badge">✦ ОБУЧЕНИЕ И КЕЙСЫ</div>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, color: "#f0eeff", maxWidth: "700px" }}>
              Учитесь быстрее<br /><span className="text-gradient">с реальными примерами</span>
            </h1>
            <p style={{ fontSize: "16px", color: "#a89ec0", maxWidth: "480px", lineHeight: 1.7 }}>
              Статьи, гайды и кейсы от команды LibraChat и реальных пользователей.
            </p>

            {/* Счётчики */}
            <div style={{ display: "flex", gap: "40px", marginTop: "8px" }}>
              {[{ value:"120+", label:"материалов" }, { value:"40+", label:"кейсов" }, { value:"25+", label:"гайдов" }, { value:"50K+", label:"читателей" }].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: "22px", fontWeight: 800, color: "#c9920a", letterSpacing: "-0.02em" }}>{s.value}</p>
                  <p style={{ fontSize: "12px", color: "#a89ec0", marginTop: "4px" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Поиск */}
            <div style={{ width: "100%", maxWidth: "560px", marginTop: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", borderRadius: "16px", background: "rgba(14,13,25,0.92)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <Search size={18} color="#4a4560" style={{ flexShrink: 0 }} />
                <input type="text" placeholder="Найти статью или кейс..." style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "15px", color: "#fff" }} />
              </div>
            </div>

            {/* Теги-фильтры */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px" }}>
              {ALL_TAGS.map((tag, i) => (
                <button key={tag} style={{ padding: "6px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 500, border: "none", cursor: "pointer", background: i === 0 ? "rgba(101,88,224,0.2)" : "transparent", color: i === 0 ? "#9b8ff8" : "#a89ec0", outline: i === 0 ? "1px solid rgba(101,88,224,0.4)" : "1px solid rgba(255,255,255,0.08)" }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── РЕАЛЬНЫЕ КЕЙСЫ ── */}
        <section style={{ padding: "80px 0", background: "#100f1d", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="container-site">
            <div style={{ marginBottom: "40px" }}>
              <div className="section-badge" style={{ marginBottom: "14px" }}>РЕАЛЬНЫЕ ИСТОРИИ</div>
              <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "#f0eeff", letterSpacing: "-0.02em" }}>
                Как клиенты используют <span className="text-gradient">LibraChat</span>
              </h2>
              <p style={{ fontSize: "16px", color: "#a89ec0", marginTop: "10px" }}>Реальные кейсы от первых тестировщиков</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
              {ARTICLES.filter(a => a.slug.startsWith("keys-")).map((article) => (
                <Link key={article.slug} href={`/learn/${article.slug}`} style={{ display: "flex", flexDirection: "column", borderRadius: "20px", overflow: "hidden", background: "rgba(14,13,25,0.88)", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none" }}>
                  {/* Фото */}
                  <div style={{ height: "200px", position: "relative", overflow: "hidden", background: article.gradient ?? "rgba(14,13,25,0.92)" }}>
                    {article.photo && (
                      <Image src={article.photo} alt={article.title} fill style={{ objectFit: "cover" }} />
                    )}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(12,12,16,0.85))" }} />
                    <span style={{ position: "absolute", top: "14px", left: "14px", fontSize: "11px", fontWeight: 600, padding: "3px 10px", borderRadius: "999px", background: TYPE_COLOR["кейс"].bg, color: TYPE_COLOR["кейс"].text, border: `1px solid ${TYPE_COLOR["кейс"].border}` }}>
                      КЕЙС
                    </span>
                  </div>
                  {/* Контент */}
                  <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid rgba(101,88,224,0.25)" }}>
                        {article.photo
                          ? <Image src={article.photo} alt={article.author} width={36} height={36} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                          : <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#6558e0,#6558e0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff" }}>{article.author[0]}</div>
                        }
                      </div>
                      <div>
                        <p style={{ fontSize: "13px", fontWeight: 600, color: "#f0eeff" }}>{article.author}</p>
                        <p style={{ fontSize: "11px", color: "#a89ec0" }}>{article.authorRole}</p>
                      </div>
                    </div>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#f0eeff", lineHeight: 1.4 }}>{article.title}</h3>
                    <p style={{ fontSize: "13px", color: "#a89ec0", lineHeight: 1.6, flex: 1 }}>{article.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "13px", color: "#6558e0", marginTop: "4px" }}>
                      Читать кейс →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── ИЗБРАННЫЕ ── */}
        <section style={{ padding: "80px 0", background: "#07060e", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="container-site">
            <div style={{ marginBottom: "32px" }}>
              <div className="section-badge" style={{ marginBottom: "14px" }}>РЕДАКЦИЯ РЕКОМЕНДУЕТ</div>
              <h2 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 800, color: "#f0eeff", letterSpacing: "-0.02em" }}>Избранные материалы</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {featured.map((article) => (
                <Card key={article.slug} article={article} large />
              ))}
            </div>
          </div>
        </section>

        {/* ── ВСЕ СТАТЬИ ── */}
        <section style={{ padding: "80px 0", background: "#100f1d", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="container-site">
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
              <div style={{ marginRight: "auto" }}>
                <h2 style={{ fontSize: "clamp(22px, 2.5vw, 34px)", fontWeight: 800, color: "#f0eeff" }}>Все материалы</h2>
                <p style={{ fontSize: "13px", color: "#4a4560", marginTop: "4px" }}>Показано {allArticles.length} материалов</p>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {[
                  { icon: <FileText size={13} />, label: "Статьи" },
                  { icon: <TrendingUp size={13} />, label: "Кейсы" },
                  { icon: <Lightbulb size={13} />, label: "Гайды" },
                ].map((f) => (
                  <button key={f.label} style={{ display: "flex", alignItems: "center", gap: "5px", padding: "6px 14px", borderRadius: "999px", fontSize: "13px", color: "#a89ec0", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}>
                    {f.icon} {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {allArticles.map((article) => (
                <Card key={article.slug} article={article} large />
              ))}
            </div>

            {/* Пагинация */}
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "48px" }}>
              {["←", "1", "2", "3", "→"].map((p, i) => (
                <button key={i} style={{ width: "40px", height: "40px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", cursor: "pointer", background: p === "1" ? "rgba(101,88,224,0.2)" : "transparent", color: p === "1" ? "#9b8ff8" : "#a89ec0", border: p === "1" ? "1px solid rgba(101,88,224,0.4)" : "1px solid rgba(255,255,255,0.07)" }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: "80px 0", background: "#07060e", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="container-site">
            <div style={{ borderRadius: "24px", padding: "72px 40px", textAlign: "center", background: "rgba(14,13,25,0.97)", border: "1px solid rgba(101,88,224,0.18)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,rgba(108,92,231,0.6),transparent)" }} />
              <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                <div className="section-badge">14 ДНЕЙ БЕСПЛАТНО</div>
                <h2 style={{ fontSize: "clamp(26px, 3vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#f0eeff" }}>
                  Попробуйте сами — <span style={{ color: "#f0eeff" }}>бесплатно</span>
                </h2>
                <p style={{ fontSize: "16px", color: "#a89ec0", maxWidth: "380px", lineHeight: 1.7 }}>Начните работу за 30 секунд. Карта не нужна.</p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                  <Link href="https://librachat.kz/auth" style={{ padding: "14px 32px", borderRadius: "999px", background: "#6558e0", color: "#fff", fontSize: "15px", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 20px rgba(101,88,224,0.4)" }}>
                    Начать бесплатно
                  </Link>
                  <Link href="/pricing" style={{ padding: "14px 32px", borderRadius: "999px", background: "transparent", color: "#f0eeff", fontSize: "15px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.16)" }}>
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
