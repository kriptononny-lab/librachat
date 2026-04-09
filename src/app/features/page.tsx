import type { Metadata } from "next";
import Link from "next/link";
import {
  MessageSquare, FileText, Languages, PenLine,
  Code2, Shield, Puzzle, Smartphone, Check, ArrowRight, Lock, Eye, Server,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Возможности",
  description: "Всё что нужно для работы и жизни — в одном чате. LibraChat отвечает на вопросы, анализирует файлы и думает вместе с тобой.",
};

const ALL_FEATURES = [
  { Icon: MessageSquare, title: "Умный диалог",         desc: "Запоминает контекст и отвечает с учётом предыдущих сообщений." },
  { Icon: FileText,      title: "Работа с файлами",     desc: "PDF, таблицы, презентации — анализирует и даёт точные ответы." },
  { Icon: Languages,     title: "Переводчик",           desc: "Точный перевод на 50+ языков с сохранением стиля текста." },
  { Icon: PenLine,       title: "Генерация текста",     desc: "Письма, посты, статьи — любой стиль и объём за секунды." },
  { Icon: Code2,         title: "Помощь с кодом",       desc: "Пишет, объясняет, дебажит — любой язык программирования." },
  { Icon: Shield,        title: "Безопасность",         desc: "Данные зашифрованы и не передаются третьим лицам." },
  { Icon: Puzzle,        title: "Интеграции",           desc: "API, Slack, Teams, Notion, 1C и другие корпоративные системы." },
  { Icon: Smartphone,    title: "Мобильное приложение", desc: "iOS и Android — всегда рядом, без VPN и без настроек." },
];

const SECURITY = [
  { Icon: Lock,   title: "Шифрование данных",          desc: "Все переданные данные шифруются по стандарту AES-256. Никто, кроме тебя, не имеет доступа к переписке." },
  { Icon: Eye,    title: "Мы не обучаемся на твоих данных", desc: "Твои запросы и файлы не используются для обучения модели. Это зафиксировано в договоре." },
  { Icon: Server, title: "Данные хранятся в России",   desc: "Серверы расположены на территории России, что соответствует требованиям 152-ФЗ о персональных данных." },
  { Icon: Shield, title: "Без передачи третьим лицам", desc: "Мы не продаём и не передаём твои данные рекламным сетям, аналитическим платформам или другим компаниям." },
];

function ChatMockup() {
  return (
    <div style={{ borderRadius:"20px", padding:"20px", background:"rgba(14,13,25,0.97)", border:"1px solid rgba(101,88,224,0.2)", boxShadow:"0 0 40px rgba(101,88,224,0.1)", width:"100%", maxWidth:"380px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"16px", paddingBottom:"12px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ width:"24px", height:"24px", borderRadius:"50%", background:"#6558e0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:700, color:"#fff" }}>L</div>
        <span style={{ fontSize:"14px", fontWeight:500, color:"#fff" }}>LibraChat</span>
        <span style={{ marginLeft:"auto", fontSize:"11px", padding:"2px 8px", borderRadius:"999px", background:"rgba(34,197,94,0.15)", color:"#22c55e" }}>онлайн</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
        <div style={{ display:"flex", justifyContent:"flex-end" }}>
          <div style={{ maxWidth:"80%", padding:"10px 14px", borderRadius:"16px 16px 4px 16px", fontSize:"13px", color:"#fff", background:"rgba(101,88,224,0.3)" }}>
            Составь КП для нового клиента
          </div>
        </div>
        <div style={{ display:"flex", gap:"8px", alignItems:"flex-start" }}>
          <div style={{ width:"24px", height:"24px", borderRadius:"50%", background:"#6558e0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:700, color:"#fff", flexShrink:0 }}>L</div>
          <div style={{ maxWidth:"80%", padding:"10px 14px", borderRadius:"4px 16px 16px 16px", fontSize:"13px", color:"#a89ec0", background:"rgba(255,255,255,0.05)" }}>
            Конечно! Уточни: для какой сферы клиент, какой продукт и бюджет?
          </div>
        </div>
      </div>
      <div style={{ marginTop:"14px", padding:"10px 14px", borderRadius:"12px", fontSize:"12px", color:"#4a4560", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)" }}>
        Напишите сообщение...
      </div>
    </div>
  );
}

function FilesMockup() {
  return (
    <div style={{ borderRadius:"20px", padding:"20px", background:"rgba(14,13,25,0.97)", border:"1px solid rgba(101,88,224,0.2)", boxShadow:"0 0 40px rgba(101,88,224,0.1)", width:"100%", maxWidth:"380px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"16px", paddingBottom:"12px", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ width:"24px", height:"24px", borderRadius:"50%", background:"#6558e0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:700, color:"#fff" }}>L</div>
        <span style={{ fontSize:"14px", fontWeight:500, color:"#fff" }}>LibraChat</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:"8px", marginBottom:"12px" }}>
        {[
          { name:"Отчёт_Q2_2024.pdf", size:"4.3 МБ", color:"#ef4444" },
          { name:"Продажи_итог.xlsx",  size:"1.2 МБ", color:"#22c55e" },
        ].map(f => (
          <div key={f.name} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"10px 12px", borderRadius:"12px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:f.color+"22", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <FileText size={15} color={f.color} />
            </div>
            <div>
              <p style={{ fontSize:"12px", fontWeight:500, color:"#fff" }}>{f.name}</p>
              <p style={{ fontSize:"11px", color:"#a89ec0" }}>{f.size}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding:"10px 14px", borderRadius:"12px", fontSize:"13px", color:"#a89ec0", background:"rgba(101,88,224,0.08)", border:"1px solid rgba(101,88,224,0.2)", lineHeight:1.6 }}>
        📈 Рост выручки на 23% в Q2. Основные драйверы: продуктовая линейка B и расширение в регионы...
      </div>
    </div>
  );
}

const S = {
  sec: (bg = "#07060e") => ({ padding:"100px 0", background:bg, borderTop:"1px solid rgba(255,255,255,0.06)" } as React.CSSProperties),
  h2:  { fontSize:"clamp(26px, 3vw, 42px)", fontWeight:800, letterSpacing:"-0.02em", lineHeight:1.15, color:"#f2f0ff" } as React.CSSProperties,
  sub: { fontSize:"16px", color:"#a89ec0", lineHeight:1.65, maxWidth:"480px", margin:"12px auto 0" } as React.CSSProperties,
};

export default function FeaturesPage() {
  return (
    <div style={{ display:"flex", minHeight:"100dvh", flexDirection:"column", background:"#07060e" }}>
      <Header />
      <main style={{ flex:1, paddingTop:"68px" }}>

        {/* Hero */}
        <section style={{ padding:"80px 0 60px", textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%) translateY(-40%)", width:"700px", height:"500px", borderRadius:"50%", background:"radial-gradient(circle,rgba(101,88,224,0.12),transparent 70%)", pointerEvents:"none" }} />
          <div className="container-site" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"24px", position:"relative" }}>
            <div className="section-badge"><span className="badge-dot"/>ОБЗОР ПРОДУКТА</div>
            <h1 style={{ fontSize:"clamp(32px, 5vw, 60px)", fontWeight:800, letterSpacing:"-0.02em", lineHeight:1.1, color:"#f2f0ff", maxWidth:"700px" }}>
              Всё что нужно для работы и жизни —{" "}
              <span className="text-gradient">в одном чате</span>
            </h1>
            <p style={{ fontSize:"18px", color:"#a89ec0", maxWidth:"500px", lineHeight:1.7 }}>
              LibraChat отвечает на вопросы, анализирует файлы, переводит, пишет и думает вместе с тобой. Без переключений между сервисами.
            </p>
            <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", justifyContent:"center" }}>
              <Link href="https://librachat.kz/auth" style={{ padding:"13px 28px", borderRadius:"999px", background:"#6558e0", color:"#fff", fontSize:"15px", fontWeight:600, textDecoration:"none", boxShadow:"0 4px 20px rgba(101,88,224,0.4)" }}>
                Попробовать
              </Link>
              <Link href="/contact" style={{ padding:"13px 28px", borderRadius:"999px", background:"transparent", color:"#f2f0ff", fontSize:"15px", fontWeight:600, textDecoration:"none", border:"1px solid rgba(255,255,255,0.16)" }}>
                Запросить демо
              </Link>
            </div>
            {/* Статистика */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 140px), 1fr))", width:"100%", maxWidth:"560px", borderTop:"1px solid rgba(255,255,255,0.07)", marginTop:"8px" }}>
              {[
                { value:"1 480+", label:"тестировщиков" },
                { value:"4.9 / 5", label:"средняя оценка" },
                { value:"30 сек", label:"время регистрации" },
              ].map((s, i) => (
                <div key={s.label} style={{ padding:"20px 8px", textAlign:"center", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <p style={{ fontSize:"22px", fontWeight:800, color:"#c9920a", letterSpacing:"-0.02em" }}>{s.value}</p>
                  <p style={{ fontSize:"12px", color:"#a89ec0", marginTop:"4px" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Глубокие возможности */}
        <section style={S.sec("#100f1d")}>
          <div className="container-site">
            <div style={{ textAlign:"center", marginBottom:"72px" }}>
              <div className="section-badge" style={{ marginBottom:"14px" }}>ТВОЙ ИИ-ПОМОЩНИК</div>
              <h2 style={S.h2}>Ваш ИИ-помощник <span className="text-gradient">на каждый день</span></h2>
              <p style={S.sub}>Один инструмент для сотни задач</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"96px" }}>
              {[
                { badge:"УМНЫЙ ДИАЛОГ", title:"Отвечает на любые вопросы — понятно и точно", desc:"LibraChat понимает контекст, помнит историю диалога и адаптирует ответы. Подаёт знания на трёх уровнях сложности. Объясняет сложное просто, а простое — подробно.", points:["Поддерживает контекст до 200 000 токенов","Объясняет сложные термины понятным языком","Отвечает на русском, английском и 50+ языках"], mockup:"chat" },
                { badge:"РАБОТА С ФАЙЛАМИ", title:"Анализирует документы и данные за секунды", desc:"Загрузи PDF, таблицу или презентацию — LibraChat прочитает, выделит главное, ответит на вопросы по содержимому и создаст резюме.", points:["PDF, Word, Excel, PowerPoint, CSV","Автоматическое извлечение ключевых данных","Работа с несколькими файлами одновременно"], mockup:"files" },
              ].map((feat, i) => (
                <div key={feat.badge} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap:"40px", alignItems:"start" }}>
                  <div style={{ order: i % 2 === 1 ? 2 : 1, display:"flex", justifyContent:"center" }}>
                    {feat.mockup === "chat" ? <ChatMockup /> : <FilesMockup />}
                  </div>
                  <div style={{ order: i % 2 === 1 ? 1 : 2, display:"flex", flexDirection:"column", gap:"20px" }}>
                    <div className="section-badge" style={{ width:"fit-content" }}>{feat.badge}</div>
                    <h3 style={{ fontSize:"clamp(22px, 2.5vw, 32px)", fontWeight:800, lineHeight:1.25, color:"#f2f0ff" }}>{feat.title}</h3>
                    <p style={{ fontSize:"15px", color:"#a89ec0", lineHeight:1.75 }}>{feat.desc}</p>
                    <ul style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                      {feat.points.map(pt => (
                        <li key={pt} style={{ display:"flex", alignItems:"flex-start", gap:"10px", fontSize:"14px", color:"#a89ec0", lineHeight:1.6, listStyle:"none" }}>
                          <Check size={15} color="#22c55e" style={{ flexShrink:0, marginTop:"3px" }} />{pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Все возможности — сетка */}
        <section style={S.sec()}>
          <div className="container-site">
            <div style={{ textAlign:"center", marginBottom:"52px" }}>
              <div className="section-badge" style={{ marginBottom:"14px" }}>КЛЮЧЕВЫЕ ФУНКЦИИ</div>
              <h2 style={S.h2}>Всё в <span style={{ color:"#f2f0ff" }}>одном окне</span></h2>
              <p style={S.sub}>8 инструментов — не нужно переключаться между сервисами</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:"16px" }}>
              {ALL_FEATURES.map(({ Icon, title, desc }) => (
                <div key={title} className="card-hover" style={{ display:"flex", flexDirection:"column", gap:"16px", padding:"24px", borderRadius:"16px", background:"rgba(14,13,25,0.75)", border:"1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ width:"40px", height:"40px", borderRadius:"12px", background:"rgba(101,88,224,0.1)", border:"1px solid rgba(101,88,224,0.18)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Icon size={20} color="#9b8ff8" />
                  </div>
                  <div>
                    <h3 style={{ fontSize:"15px", fontWeight:600, color:"#f2f0ff", marginBottom:"6px" }}>{title}</h3>
                    <p style={{ fontSize:"13px", color:"#a89ec0", lineHeight:1.65 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Как во мне защищены данные — из PDF */}
        <section style={S.sec("#100f1d")}>
          <div className="container-site">
            <div style={{ textAlign:"center", marginBottom:"56px" }}>
              <div className="section-badge" style={{ marginBottom:"14px" }}><span className="badge-dot"/>БЕЗОПАСНОСТЬ</div>
              <h2 style={S.h2}>Как во мне <span className="text-gradient">защищены данные</span></h2>
              <p style={S.sub}>Твои файлы и запросы — только твои. Никаких компромиссов.</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:"16px" }}>
              {SECURITY.map(({ Icon, title, desc }) => (
                <div key={title} style={{ display:"flex", flexDirection:"column", gap:"16px", padding:"28px 24px", borderRadius:"20px", background:"rgba(14,13,25,0.88)", border:"1px solid rgba(101,88,224,0.15)" }}>
                  <div style={{ width:"44px", height:"44px", borderRadius:"14px", background:"rgba(101,88,224,0.1)", border:"1px solid rgba(101,88,224,0.22)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <Icon size={20} color="#9b8ff8" />
                  </div>
                  <div>
                    <h3 style={{ fontSize:"15px", fontWeight:700, color:"#f2f0ff", marginBottom:"8px", lineHeight:1.3 }}>{title}</h3>
                    <p style={{ fontSize:"14px", color:"#a89ec0", lineHeight:1.7 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:"32px", padding:"24px 32px", borderRadius:"16px", background:"rgba(101,88,224,0.06)", border:"1px solid rgba(101,88,224,0.18)", textAlign:"center" }}>
              <p style={{ fontSize:"14px", color:"#a89ec0", lineHeight:1.7 }}>
                Соответствует требованиям <strong style={{ color:"#f2f0ff" }}>152-ФЗ</strong> о персональных данных. Подробнее —{" "}
                <Link href="/privacy" style={{ color:"#9b8ff8", textDecoration:"none" }}>в политике конфиденциальности</Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Сферы применения */}
        <section style={S.sec()}>
          <div className="container-site">
            <div style={{ textAlign:"center", marginBottom:"52px" }}>
              <div className="section-badge" style={{ marginBottom:"14px" }}>ДЛЯ КОГО</div>
              <h2 style={S.h2}>Решает задачи <span className="text-gradient">любой сферы</span></h2>
              <p style={S.sub}>Настроен под разные рабочие сценарии</p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))", gap:"16px" }}>
              {[
                { icon:<MessageSquare size={20} color="#9b8ff8"/>, title:"Анализ и отчёты",       desc:"Загружай документы — LibraChat анализирует и создаёт профессиональные отчёты за секунды." },
                { icon:<PenLine       size={20} color="#9b8ff8"/>, title:"Переписка и документы", desc:"Деловые письма, контракты, презентации — создавай профессиональные тексты с нужным стилем." },
                { icon:<Puzzle        size={20} color="#9b8ff8"/>, title:"Поддержка клиентов",    desc:"Автоматизирует ответы на повторяющиеся вопросы и освобождает команду для сложных задач." },
              ].map(card => (
                <div key={card.title} className="card-hover" style={{ display:"flex", flexDirection:"column", gap:"16px", padding:"24px", borderRadius:"16px", background:"rgba(14,13,25,0.75)", border:"1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ width:"40px", height:"40px", borderRadius:"12px", background:"rgba(101,88,224,0.1)", border:"1px solid rgba(101,88,224,0.18)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize:"15px", fontWeight:600, color:"#f2f0ff", marginBottom:"6px" }}>{card.title}</h3>
                    <p style={{ fontSize:"13px", color:"#a89ec0", lineHeight:1.65, marginBottom:"12px" }}>{card.desc}</p>
                    <Link href="/business" style={{ fontSize:"13px", fontWeight:500, color:"#6558e0", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                      Подробнее <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding:"80px 0 100px", background:"#07060e" }}>
          <div className="container-site">
            <div className="cta-inner" style={{ position:"relative", overflow:"hidden", borderRadius:"24px", padding:"72px 48px", textAlign:"center", background:"rgba(14,13,25,0.97)", border:"1px solid rgba(101,88,224,0.2)" }}>
              <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,rgba(101,88,224,0.6),transparent)" }} />
              <div style={{ position:"relative", display:"flex", flexDirection:"column", alignItems:"center", gap:"20px" }}>
                <div className="section-badge">14 ДНЕЙ БЕСПЛАТНО</div>
                <h2 style={{ fontSize:"clamp(28px, 3.5vw, 48px)", fontWeight:800, letterSpacing:"-0.02em", lineHeight:1.15, color:"#f2f0ff" }}>
                  Готов попробовать LibraChat?
                </h2>
                <p style={{ fontSize:"16px", color:"#a89ec0", maxWidth:"380px", lineHeight:1.7 }}>
                  Начни прямо сейчас — бесплатно. Без карты и сложных настроек.
                </p>
                <div style={{ display:"flex", gap:"12px", flexWrap:"wrap", justifyContent:"center" }}>
                  <Link href="https://librachat.kz/auth" style={{ padding:"14px 32px", borderRadius:"999px", background:"#6558e0", color:"#fff", fontSize:"15px", fontWeight:600, textDecoration:"none", boxShadow:"0 4px 20px rgba(101,88,224,0.4)" }}>
                    Начать бесплатно
                  </Link>
                  <Link href="/contact" style={{ padding:"14px 32px", borderRadius:"999px", background:"transparent", color:"#f2f0ff", fontSize:"15px", fontWeight:600, textDecoration:"none", border:"1px solid rgba(255,255,255,0.16)" }}>
                    Запросить демо
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
