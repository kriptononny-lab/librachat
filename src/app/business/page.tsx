import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Shield, Users, Zap, BarChart2, Headphones, Puzzle, FileText, Globe, Check, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Для бизнеса",
  description: "LibraChat для корпораций и команд — безопасность данных, управление доступом, интеграции и выделенная поддержка.",
};

const FEATURES = [
  { num: "01", Icon: Shield,     title: "Безопасность данных",    desc: "Шифрованные рабочие пространства, соответствие GDPR и ФЗ‑152‑ФЗ. Ваши данные не используются для обучения наших моделей." },
  { num: "02", Icon: Users,      title: "Управление командой",    desc: "Добавляйте сотрудников по ролям: Участник, Менеджер, Администратор. Просматривайте историю использования по сотрудникам." },
  { num: "03", Icon: Zap,        title: "Приоритетная скорость",  desc: "Корпоративные клиенты получают ответы за приоритетным SLA 99 %. Обработка очереди — в первую очередь." },
  { num: "04", Icon: Puzzle,     title: "Интеграции",             desc: "API, вебхуки, коннекторы к Slack, Teams, Notion, 1C и другим корпоративным инструментам." },
  { num: "05", Icon: BarChart2,  title: "Аналитика и отчёты",    desc: "Дашборды использования, контроль затрат, экспорт данных. Понимайте как команда использует ИИ как точку роста." },
  { num: "06", Icon: Headphones, title: "Выделенная поддержка",   desc: "Персональный менеджер команды, обращения со связью приоритетной технической поддержкой в режиме 24/7." },
];

const USE_CASES = [
  { Icon: FileText,   title: "Подготовка документов",  desc: "От отчётов до предложений — LibraChat создаёт профессиональные документы по твоим шаблонам за минуты.",                                          badge: "Экономия: 3–4 часа",      badgeColor: "#6558e0" },
  { Icon: Headphones, title: "Поддержка клиентов",      desc: "Автоматизируйте типовые обращения, обучайте операторов в реальном времени, формирование базы знаний.",                                          badge: "Снижение нагрузки −40%",  badgeColor: "#22c55e" },
  { Icon: BarChart2,  title: "Анализ данных",            desc: "Загружайте отчёты — получайте инсайты, выдвигайте гипотезы для развития бизнеса без работы с формулами.",                                        badge: "Анализ за минуты: до 50м", badgeColor: "#c9920a" },
  { Icon: Globe,      title: "Перевод и локализация",   desc: "Профессиональные переводы маркетинговых материалов с сохранением стиля под разные рынки и аудитории.",                                          badge: "50+ языков",               badgeColor: "#3b82f6" },
];

const TESTIMONIALS = [
  { content: "Внедрили LibraChat для отдела продаж — скорость подготовки КП выросла в 3 раза. Менеджеры теперь тратят время на клиентов, а не на документы.", name: "Алексей Козлов",  role: "Директор по продажам, TechStart" },
  { content: "Служба поддержки обрабатывает на 40% больше обращений при той же команде. LibraChat помогает операторам отвечать быстро и точно.",              name: "Мария Соколова",  role: "Руководитель поддержки, RetailPro" },
  { content: "Аналитики получили инструмент, который за 10 минут делает то, на что раньше уходил день. ROI от LibraChat окупился за первый месяц.",           name: "Дмитрий Попов",   role: "Финансовый директор, FinGroup" },
];

const STATS = [
  { value: "500+",  label: "корпоративных клиентов" },
  { value: "3 ч",   label: "экономия на сотрудника в день" },
  { value: "99.9%", label: "время безотказной работы" },
];

const S = {
  section:   (bg = "#07060e") => ({ padding: "120px 0", background: bg, borderTop: "1px solid rgba(255,255,255,0.06)" } as React.CSSProperties),
  h2:        { fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#f0eeff" } as React.CSSProperties,
  sub:       { fontSize: "16px", color: "#a89ec0", lineHeight: 1.6, marginTop: "12px" } as React.CSSProperties,
  card:      { display: "flex", flexDirection: "column", gap: "16px", padding: "28px", borderRadius: "20px", background: "rgba(14,13,25,0.88)", border: "1px solid rgba(255,255,255,0.07)" } as React.CSSProperties,
  iconWrap:  { width: "48px", height: "48px", borderRadius: "14px", background: "rgba(101,88,224,0.12)", border: "1px solid rgba(101,88,224,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } as React.CSSProperties,
};

function StarRow() {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#c9920a">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

export default function BusinessPage() {
  return (
    <div style={{ display: "flex", minHeight: "100dvh", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1, paddingTop: "68px" }}>

        {/* ── HERO ── */}
        <section style={{ padding: "100px 0 80px", background: "#07060e" }}>
          <div className="container-site">
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap:"48px", alignItems:"start" }}>

              {/* Текст */}
              <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                <div className="section-badge" style={{ width: "fit-content" }}>✦ РЕШЕНИЯ ДЛЯ БИЗНЕСА</div>
                <h1 style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.1, color: "#f0eeff" }}>
                  Помогаю<br />
                  твоей<br />
                  <span className="text-gradient">команде</span>
                </h1>
                <p style={{ fontSize: "16px", lineHeight: 1.655, color: "#a89ec0", maxWidth: "420px" }}>
                  Масштабируй работу команды с LibraChat — корпоративный ИИ с безопасностью данных, управлением доступом и интеграциями под твои процессы.
                </p>
                <div className="btn-pair" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                  <Link href="/contact?type=demo" style={{ display: "inline-flex", alignItems: "center", padding: "14px 28px", borderRadius: "999px", background: "#6558e0", color: "#fff", fontSize: "15px", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 20px rgba(101,88,224,0.4)" }}>
                    Запросить демо
                  </Link>
                  <Link href="/contact?type=sales" style={{ display: "inline-flex", alignItems: "center", padding: "14px 28px", borderRadius: "999px", background: "transparent", color: "#f0eeff", fontSize: "15px", fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.16)" }}>
                    Связаться с продажами
                  </Link>
                </div>
                {/* Статистика */}
                <div style={{ display: "flex", gap: "32px", paddingTop: "8px" }}>
                  {STATS.map(s => (
                    <div key={s.label}>
                      <p style={{ fontSize: "24px", fontWeight: 800, color: "#c9920a", letterSpacing: "-0.02em" }}>{s.value}</p>
                      <p style={{ fontSize: "12px", color: "#a89ec0", marginTop: "4px", lineHeight: 1.4 }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Панель */}
              <div style={{ borderRadius: "20px", padding: "24px", display: "flex", flexDirection: "column", gap: "16px", background: "rgba(14,13,25,0.97)", border: "1px solid rgba(101,88,224,0.22)", boxShadow: "0 0 60px rgba(101,88,224,0.1)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>Панель управления командой</p>
                  <span style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "999px", background: "rgba(101,88,224,0.15)", color: "#9b8ff8", border: "1px solid rgba(101,88,224,0.3)" }}>Business Pro</span>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 110px), 1fr))", gap:"10px" }}>
                  {[{ value: "47", label: "Участников" }, { value: "1 240", label: "Запросов сегодня" }, { value: "98%", label: "Удовлетворённость" }].map(s => (
                    <div key={s.label} style={{ padding: "14px 10px", borderRadius: "14px", textAlign: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <p style={{ fontSize: "20px", fontWeight: 800, color: "#fff" }}>{s.value}</p>
                      <p style={{ fontSize: "11px", color: "#a89ec0", marginTop: "4px" }}>{s.label}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { name: "Алексей Козлов", role: "Администратор", status: "Активен",  color: "#22c55e" },
                    { name: "Мария Соколова", role: "Менеджер",      status: "Активен",  color: "#22c55e" },
                    { name: "Дмитрий Попов",  role: "Администратор", status: "Офлайн",   color: "#a89ec0" },
                  ].map(u => (
                    <div key={u.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#6558e0,#6558e0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                          {u.name.split(" ").map(w => w[0]).join("")}
                        </div>
                        <div>
                          <p style={{ fontSize: "13px", fontWeight: 500, color: "#fff" }}>{u.name}</p>
                          <p style={{ fontSize: "11px", color: "#a89ec0" }}>{u.role}</p>
                        </div>
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: 500, color: u.color }}>{u.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Логотипы */}
        <div style={{ padding: "28px 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#07060e" }}>
          <div className="container-site">
            <p style={{ textAlign: "center", fontSize: "11px", color: "#4a4560", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "18px" }}>НАМ ДОВЕРЯЮТ ЛИДЕРЫ РЫНКА</p>
            <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px" }}>
              {["Компания А","Компания Б","Компания В","Компания Г","Компания Д","Компания Е"].map(n => (
                <div key={n} style={{ padding: "6px 18px", borderRadius: "999px", fontSize: "13px", color: "#4a4560", border: "1px solid rgba(255,255,255,0.07)" }}>{n}</div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 6 ПРЕИМУЩЕСТВ ── */}
        <section style={S.section("#100f1d")}>
          <div className="container-site">
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div className="section-badge" style={{ marginBottom: "16px" }}>ПОЧЕМУ LIBRACHAT ДЛЯ БИЗНЕСА</div>
              <h2 style={S.h2}>Инструмент, который растёт <span style={{ color: "#c9920a" }}>вместе с вами</span></h2>
              <p style={S.sub}>Корпоративные возможности без корпоративной сложности</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
              {FEATURES.map(({ num, Icon, title, desc }) => (
                <div key={num} style={S.card}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={S.iconWrap}><Icon size={22} color="#9b8ff8" /></div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#4a4560" }}>{num}</span>
                  </div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#f0eeff", lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#a89ec0" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── КЕЙСЫ ── */}
        <section style={S.section("#07060e")}>
          <div className="container-site">
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div className="section-badge" style={{ marginBottom: "16px" }}>ПРИМЕНЕНИЕ</div>
              <h2 style={S.h2}>Как бизнес использует LibraChat</h2>
              <p style={S.sub}>Реальные задачи — реальные результаты</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
              {USE_CASES.map(({ Icon, title, desc, badge, badgeColor }) => (
                <div key={title} style={S.card}>
                  <div style={S.iconWrap}><Icon size={22} color="#9b8ff8" /></div>
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#f0eeff", lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#a89ec0", flex: 1 }}>{desc}</p>
                  <span style={{ display: "inline-flex", width: "fit-content", fontSize: "12px", fontWeight: 600, padding: "5px 12px", borderRadius: "999px", background: `${badgeColor}18`, color: badgeColor, border: `1px solid ${badgeColor}33` }}>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ОТЗЫВЫ ── */}
        <section style={S.section("#100f1d")}>
          <div className="container-site">
            <div style={{ textAlign: "center", marginBottom: "56px" }}>
              <div className="section-badge" style={{ marginBottom: "16px" }}>КЛИЕНТЫ О НАС</div>
              <h2 style={S.h2}>Результаты <span style={{ color: "#f0eeff" }}>говорят сами</span></h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ ...S.card, border: "1px solid rgba(101,88,224,0.14)" }}>
                  <StarRow />
                  <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#a89ec0", fontStyle: "italic", flex: 1 }}>«{t.content}»</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg,#6558e0,#6558e0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                      {t.name.split(" ").map(w => w[0]).join("")}
                    </div>
                    <div>
                      <p style={{ fontSize: "15px", fontWeight: 600, color: "#fff" }}>{t.name}</p>
                      <p style={{ fontSize: "13px", color: "#a89ec0", marginTop: "2px" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA + ФОРМА ── */}
        <section style={{ padding: "120px 0", background: "#07060e", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="container-site">
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap:"32px", padding:"48px", borderRadius: "24px", background: "rgba(14,13,25,0.92)", border: "1px solid rgba(101,88,224,0.2)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center" }}>
                <h2 style={{ fontSize: "clamp(32px, 3vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#f0eeff" }}>
                  Готовы внедрить<br /><span className="text-gradient">ИИ в команду?</span>
                </h2>
                <p style={{ fontSize: "16px", lineHeight: 1.75, color: "#a89ec0", maxWidth: "360px" }}>
                  Оставьте заявку — наш менеджер свяжется в течение 2 часов и проведёт персональную демонстрацию под задачи вашего бизнеса.
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {["Персональная демонстрация", "Ответы на все технические вопросы", "Индивидуальное предложение по цене"].map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "15px", color: "#a89ec0" }}>
                      <Check size={15} color="#22c55e" style={{ flexShrink: 0 }} />{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ borderRadius: "18px", padding: "28px", display: "flex", flexDirection: "column", gap: "14px", background: "rgba(8,7,16,0.7)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p style={{ fontSize: "15px", fontWeight: 600, color: "#fff", marginBottom: "4px" }}>Запросить демо</p>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 180px), 1fr))", gap:"10px" }}>
                  {["Имя", "Должность", "Email", "Телефон"].map(pl => (
                    <input key={pl} type="text" placeholder={pl} style={{ padding: "12px 14px", borderRadius: "12px", fontSize: "14px", color: "#fff", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", outline: "none" }} />
                  ))}
                  {["Название компании", "Размер команды"].map(pl => (
                    <input key={pl} type="text" placeholder={pl} style={{ padding: "12px 14px", borderRadius: "12px", fontSize: "14px", color: "#fff", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", outline: "none" }} />
                  ))}
                </div>
                <Link href="/contact?type=demo" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "14px", borderRadius: "999px", background: "#6558e0", color: "#fff", fontSize: "15px", fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 20px rgba(101,88,224,0.4)", marginTop: "4px" }}>
                  Запросить демо
                </Link>
                <p style={{ fontSize: "12px", textAlign: "center", color: "#4a4560" }}>
                  Нажимая кнопку, вы принимаете{" "}
                  <Link href="/privacy" style={{ color: "#a89ec0", textDecoration: "underline" }}>политику конфиденциальности</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
