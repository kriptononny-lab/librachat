import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Eye, BookOpen, ArrowRight, Check, TrendingUp, Quote } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ALL_ARTICLES as STATIC_ARTICLES, TYPE_COLOR } from "@/lib/articles";
import { fetchStrapiArticles, fetchStrapiArticleBySlug } from "@/lib/strapi";

// Новые slug-и из Strapi рендерятся на лету — без редеплоя
export const dynamicParams = true;

export async function generateStaticParams() {
  const strapiArticles = await fetchStrapiArticles();
  const allSlugs = new Set([
    ...strapiArticles.map((a) => a.slug),
    ...STATIC_ARTICLES.map((a) => a.slug),
  ]);
  return Array.from(allSlugs).map((slug) => ({ slug }));
}

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://librachat.ai";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const strapi = await fetchStrapiArticleBySlug(slug);
  const article = strapi ?? STATIC_ARTICLES.find((a) => a.slug === slug);
  if (!article) return { title: "Статья не найдена" };
  const url = `${BASE}/learn/${slug}`;
  const image = article.photo ?? "/og-image.png";
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt ?? "",
      url,
      siteName: "LibraChat",
      locale: "ru_RU",
      type: "article",
      images: [{ url: image, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt ?? "",
      images: [image],
    },
  };
}

// ─── Переиспользуемые блоки ────────────────────────

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "8px" }}>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#F0EEFF",
          marginBottom: "14px",
          lineHeight: 1.3,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          fontSize: "15px",
          lineHeight: 1.85,
          color: "#9CA3B8",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "10px",
        fontSize: "15px",
        color: "#9CA3B8",
        lineHeight: 1.7,
        listStyle: "none",
      }}
    >
      <Check size={15} color="#A78BFA" style={{ flexShrink: 0, marginTop: "4px" }} />
      <span>{children}</span>
    </li>
  );
}

function CaseBlockquote({
  text,
  author,
  role,
}: {
  text: string;
  author: string;
  role: string;
}) {
  return (
    <div
      style={{
        padding: "24px 20px",
        borderRadius: "16px",
        background: "rgba(167,139,250,0.07)",
        borderLeft: "3px solid #A78BFA",
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}
    >
      <Quote
        size={22}
        color="rgba(167,139,250,0.3)"
        style={{ position: "absolute", top: "16px", right: "20px" }}
      />
      <p
        style={{
          fontSize: "16px",
          lineHeight: 1.8,
          color: "#9CA3B8",
          fontStyle: "italic",
          marginBottom: "16px",
        }}
      >
        «{text}»
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#A78BFA",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 700,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {author[0]}
        </div>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#F0EEFF" }}>{author}</p>
          <p style={{ fontSize: "12px", color: "#9CA3B8", marginTop: "2px" }}>{role}</p>
        </div>
      </div>
    </div>
  );
}

function CaseSteps({ items }: { items: { title: string; desc: string }[] }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "8px" }}
    >
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "rgba(167,139,250,0.15)",
              border: "1px solid rgba(167,139,250,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: 700,
              color: "#C4B5FD",
              flexShrink: 0,
            }}
          >
            {i + 1}
          </div>
          <div>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#F0EEFF",
                marginBottom: "6px",
              }}
            >
              {item.title}
            </p>
            <p style={{ fontSize: "14px", lineHeight: 1.75, color: "#9CA3B8" }}>
              {item.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CaseResults({
  items,
}: {
  items: { label: string; value: string; color: string }[];
}) {
  return (
    <div
      style={{
        padding: "24px",
        borderRadius: "16px",
        background: "rgba(13,13,26,0.84)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        <TrendingUp size={18} color="#C4B5FD" />
        <span style={{ fontSize: "16px", fontWeight: 700, color: "#F0EEFF" }}>
          Результаты
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${items.length}, 1fr)`,
          gap: "12px",
        }}
      >
        {items.map((s) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "20px 12px",
              borderRadius: "14px",
              textAlign: "center",
              background: "rgba(4,4,8,0.6)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                fontWeight: 800,
                color: s.color,
                letterSpacing: "-0.02em",
              }}
            >
              {s.value}
            </span>
            <span style={{ fontSize: "12px", lineHeight: 1.4, color: "#9CA3B8" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Контент реальных кейсов ───────────────────────

function CaseShishakova() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
      <Section title="Контекст: малый бизнес, большие задачи">
        <p>
          Юлия — предприниматель, которая сама глубоко вовлечена во все процессы: от
          закупки ассортимента до оформления торгового зала. В 2026 году перед бизнесом
          встал список задач, которые нужно было решать «ещё вчера» — важна была скорость
          и точность.
        </p>
        <ul>
          {[
            "Разработка рекламных кампаний и стратегии развития",
            "Создание упаковки продуктов",
            "Анализ конкурентов и мировых практик продаж",
            "Оптимизация выкладки (мерчандайзинг) и улучшение эстетики зала",
          ].map((i) => (
            <Li key={i}>{i}</Li>
          ))}
        </ul>
        <p>Решением стал LibraChat как «единое окно» для управления маркетингом.</p>
      </Section>

      <CaseBlockquote
        text="Предложили поучаствовать в тестировании нового продукта. В итоге LibraChat стал для меня тем самым «адекватным напарником», который понимает менталитет малого бизнеса."
        author="Юлия Шишакова"
        role="ИП, Магазин отделочных материалов из дерева"
      />

      <Section title="Что было сделано через LibraChat">
        <CaseSteps
          items={[
            {
              title: "Аналитика и стратегия",
              desc: "ИИ проанализировал текущий рынок и предложил план развития на основе «лучших в мире практик». Ушли от интуитивных решений к рыночным данным.",
            },
            {
              title: "Креатив и упаковка",
              desc: "Разработаны концепции рекламных кампаний и визуальные решения для упаковки товаров, которые выделяют магазин на фоне конкурентов.",
            },
            {
              title: "Визуальный мерчандайзинг",
              desc: "На основе анализа торгового зала ИИ выдал конкретные рекомендации по оптимизации выкладки: зонирование, освещение, «путь клиента».",
            },
            {
              title: "Работа с ассортиментом",
              desc: "LibraChat помог систематизировать позиции и выделить наиболее маржинальные группы товаров.",
            },
          ]}
        />
      </Section>

      <CaseResults
        items={[
          { label: "Стратегия за один вечер", value: "✓", color: "#C4B5FD" },
          { label: "Задач решается в 1 окне", value: "4+", color: "#A78BFA" },
          { label: "Уровень федеральных сетей", value: "↑", color: "#A78BFA" },
        ]}
      />
    </div>
  );
}

function CaseOzherelyev() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
      <Section title="Задача: сложный цикл запуска нового продукта">
        <p>
          Василий занимается высокоуровневым e-com: находит успешные товары на западных
          рынках (Amazon) и адаптирует их под российского покупателя. Этот процесс
          включает огромный пласт аналитической и творческой работы:
        </p>
        <ul>
          {[
            "Анализ сотен карточек и отзывов на Amazon",
            "Разработка упаковки и дизайна с нуля",
            "Написание SEO-текстов для WB/Ozon",
            "Построение стратегии продвижения и оптимизация рекламы",
          ].map((i) => (
            <Li key={i}>{i}</Li>
          ))}
        </ul>
        <p>LibraChat стал мостом между глобальными рынками и локальными продажами.</p>
      </Section>

      <CaseBlockquote
        text="С LibraChat мы перестали гадать, «зайдёт» товар или нет. Я просто даю ему данные, а он выдаёт готовую стратегию: от SEO-описания до рекламных связок. Это освободило мне руки для главного — масштабирования бизнеса."
        author="Василий Ожерельев"
        role="Компания «Вуди», e-commerce"
      />

      <Section title="Как LibraChat помог компании «Вуди»">
        <CaseSteps
          items={[
            {
              title: "Аналитика «под ключ»",
              desc: "Василий загружал ссылки или данные по товарам с Amazon. LibraChat делал выжимку: почему этот товар покупают, какие у него слабые места и что нужно изменить для успеха в России.",
            },
            {
              title: "Контент-завод",
              desc: "На основе анализа ИИ создавал ТЗ для дизайнеров карточек, писал SEO-оптимизированные описания, которые сразу выводили товары в топ выдачи.",
            },
            {
              title: "Работа с репутацией",
              desc: "LibraChat взял на себя ответы на отзывы. Каждый покупатель получает «человеческий» ответ, который повышает лояльность к бренду.",
            },
            {
              title: "Рекламный стратег",
              desc: "ИИ помог оптимизировать рекламные кампании, анализируя показатели и предлагая гипотезы по увеличению CTR и снижению стоимости лида.",
            },
          ]}
        />
      </Section>

      <CaseResults
        items={[
          { label: "Быстрее запуск товара", value: "5×", color: "#C4B5FD" },
          { label: "Снижение ДРР", value: "−30%", color: "#A78BFA" },
          { label: "Этапов автоматизировано", value: "4/4", color: "#A78BFA" },
        ]}
      />
    </div>
  );
}

function CaseBazarkulova() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
      <Section title="Профиль: продвинутый пользователь ИИ">
        <p>
          Марианна — опытный специалист, который использует нейросети ежедневно. Основные
          сложности в других сервисах:
        </p>
        <ul>
          {[
            "Неточность: необходимость перепроверять каждое слово из-за склонности ИИ «выдумывать» факты",
            "Потеря контекста: каждый новый чат — долгое объяснение «кто мы, что продаём и для кого»",
            "Технические барьеры: постоянные включения/выключения VPN, которые прерывают рабочий поток",
          ].map((i) => (
            <Li key={i}>{i}</Li>
          ))}
        </ul>
      </Section>

      <CaseBlockquote
        text="Либрачат — это первый сервис, который не врёт, особо не тупит и помнит всё о моих клиентах благодаря разделению на проекты. Это теперь мой главный инструмент для аналитики и стратегий."
        author="Марианна Базаркулова"
        role="Профессиональный маркетолог"
      />

      <Section title="Ключевые фишки, изменившие рабочий процесс">
        <CaseSteps
          items={[
            {
              title: "Работа с данными без «выдумок»",
              desc: "Либрачат выдаёт выводы строго на основе предоставленных данных, экономя время на проверку гипотез. Ни одного выдуманного факта.",
            },
            {
              title: "Разделение на проекты",
              desc: "Марианна создаёт отдельное пространство под каждого заказчика. Контекст, файлы и история задач сохраняются — больше не нужно заново обучать ИИ.",
            },
            {
              title: "Бесшовный доступ",
              desc: "Работа фоном в браузере и приложении без VPN — никаких технических настроек и прерываний рабочего потока.",
            },
          ]}
        />
      </Section>

      <Section title="Что именно делает Марианна в LibraChat">
        <ul>
          {[
            "Стратегические сессии: мозговые штурмы по развитию брендов, разработка уникальных офферов",
            "Deep Data Analysis: анализ больших баз данных и рыночных показателей — ИИ находит закономерности за минуты",
            "Быстрое переключение между разными нишами клиентов без потери глубины проработки",
          ].map((i) => (
            <Li key={i}>{i}</Li>
          ))}
        </ul>
      </Section>

      <CaseResults
        items={[
          { label: "Клиентов в одном окне", value: "10+", color: "#C4B5FD" },
          { label: "Переделок и правок", value: "≈ 0", color: "#A78BFA" },
          { label: "Работа без VPN", value: "100%", color: "#A78BFA" },
        ]}
      />
    </div>
  );
}

function GenericContent({ article }: { article: (typeof STATIC_ARTICLES)[number] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
      <Section title="Введение">
        <p>{article.excerpt}</p>
        <p>
          В этом материале мы подробно разберём все аспекты темы, дадим практические
          рекомендации и покажем реальные примеры использования LibraChat.
        </p>
      </Section>
      <Section title="Основные возможности">
        <ul>
          {[
            "Анализ данных и файлов без галлюцинаций",
            "Работа без VPN — напрямую из России",
            "Сохранение контекста между сессиями",
            "Интеграция с популярными инструментами",
          ].map((i) => (
            <Li key={i}>{i}</Li>
          ))}
        </ul>
      </Section>
      <CaseBlockquote
        text="LibraChat — это не просто чат-бот. Это инструмент, который реально меняет рабочие процессы и экономит часы каждый день."
        author="Редакция LibraChat"
        role="Команда LibraChat"
      />
    </div>
  );
}

const REAL_CASES: Record<string, React.ReactNode> = {
  "keys-shishakova": <CaseShishakova />,
  "keys-ozherelyev": <CaseOzherelyev />,
  "keys-bazarkulova": <CaseBazarkulova />,
};

// ─── Рендерер Strapi Blocks ────────────────────────

type BlockNode =
  | { type: "paragraph"; children: InlineNode[] }
  | { type: "heading"; level: number; children: InlineNode[] }
  | {
      type: "list";
      format: "ordered" | "unordered";
      children: { type: "list-item"; children: InlineNode[] }[];
    }
  | { type: "quote"; children: InlineNode[] }
  | { type: "code"; children: InlineNode[] };

interface InlineNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
}

function renderInline(nodes: InlineNode[]): React.ReactNode {
  return nodes.map((n, i) => {
    let el: React.ReactNode = n.text;
    if (n.bold)
      el = (
        <strong key={i} style={{ color: "#F0EEFF" }}>
          {el}
        </strong>
      );
    if (n.italic) el = <em key={i}>{el}</em>;
    if (n.code)
      el = (
        <code
          key={i}
          style={{
            background: "rgba(167,139,250,0.15)",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "13px",
            color: "#C4B5FD",
          }}
        >
          {el}
        </code>
      );
    return <span key={i}>{el}</span>;
  });
}

function StrapiBlocks({ blocks }: { blocks: unknown }) {
  if (!Array.isArray(blocks) || blocks.length === 0) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {(blocks as BlockNode[]).map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} style={{ fontSize: "15px", lineHeight: 1.85, color: "#9CA3B8" }}>
                {renderInline(block.children as InlineNode[])}
              </p>
            );
          case "heading":
            return (
              <h2
                key={i}
                style={{
                  fontSize: block.level <= 2 ? "20px" : "17px",
                  fontWeight: 700,
                  color: "#F0EEFF",
                  lineHeight: 1.3,
                  marginTop: "8px",
                }}
              >
                {renderInline(block.children as InlineNode[])}
              </h2>
            );
          case "list":
            return (
              <ul
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  paddingLeft: 0,
                }}
              >
                {block.children.map((item, j) => (
                  <Li key={j}>{renderInline(item.children as InlineNode[])}</Li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                style={{
                  padding: "16px 20px",
                  borderLeft: "3px solid #A78BFA",
                  background: "rgba(167,139,250,0.07)",
                  borderRadius: "0 12px 12px 0",
                  fontSize: "15px",
                  fontStyle: "italic",
                  color: "#9CA3B8",
                  lineHeight: 1.75,
                }}
              >
                {renderInline(block.children as InlineNode[])}
              </blockquote>
            );
          case "code":
            return (
              <pre
                key={i}
                style={{
                  background: "rgba(4,4,8,0.8)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "12px",
                  padding: "16px 20px",
                  fontSize: "13px",
                  color: "#C4B5FD",
                  overflowX: "auto",
                  lineHeight: 1.7,
                }}
              >
                <code>{renderInline(block.children as InlineNode[])}</code>
              </pre>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

// ─── Основная страница ─────────────────────────────

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Пробуем Strapi
  const strapiData = await fetchStrapiArticleBySlug(slug);

  // 2. Фолбэк на статику
  const staticArticle = STATIC_ARTICLES.find((a) => a.slug === slug);

  const article = strapiData ?? staticArticle;
  if (!article) notFound();

  const tc = TYPE_COLOR[article.type];

  // Список "Читать также" — тоже из Strapi или статики
  const allArticles = strapiData
    ? await fetchStrapiArticles().then((arr) => (arr.length > 0 ? arr : STATIC_ARTICLES))
    : STATIC_ARTICLES;
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 3);

  // Контент: приоритет — хардкод реальных кейсов, затем Strapi blocks, затем заглушка
  const realContent = REAL_CASES[slug];

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
        {/* Шапка */}
        <section style={{ padding: "60px 0 40px" }}>
          <div className="container-site" style={{ maxWidth: "900px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                color: "#6B7280",
                marginBottom: "24px",
              }}
            >
              <Link href="/" style={{ color: "#6B7280", textDecoration: "none" }}>
                Главная
              </Link>
              <span>/</span>
              <Link href="/learn" style={{ color: "#6B7280", textDecoration: "none" }}>
                Обучение
              </Link>
              <span>/</span>
              <span style={{ color: tc.text }}>{article.type}</span>
            </div>

            <span
              style={{
                display: "inline-flex",
                fontSize: "12px",
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: "999px",
                marginBottom: "20px",
                background: tc.bg,
                color: tc.text,
                border: `1px solid ${tc.border}`,
              }}
            >
              {article.type.toUpperCase()}
            </span>

            <h1
              style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                color: "#F0EEFF",
                marginBottom: "20px",
              }}
            >
              {article.title}
            </h1>

            <p
              style={{
                fontSize: "18px",
                lineHeight: 1.75,
                color: "#9CA3B8",
                marginBottom: "32px",
                maxWidth: "700px",
              }}
            >
              {article.excerpt}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                    border: "2px solid rgba(167,139,250,0.3)",
                  }}
                >
                  {article.photo ? (
                    <Image
                      src={article.photo}
                      alt={article.author}
                      width={48}
                      height={48}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
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
                        fontWeight: 700,
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    >
                      {article.author[0]}
                    </div>
                  )}
                </div>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#F0EEFF" }}>
                    {article.author}
                  </p>
                  <p style={{ fontSize: "12px", color: "#9CA3B8" }}>
                    {article.authorRole ?? "LibraChat"}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  fontSize: "12px",
                  color: "#6B7280",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={12} />
                  <span>{article.readTime} мин чтения</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <Eye size={12} />
                  <span>{article.views} просмотров</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Обложка */}
        <div
          className="container-site"
          style={{ maxWidth: "900px", paddingBottom: "40px" }}
        >
          <div
            style={{
              width: "100%",
              borderRadius: "20px",
              height: "380px",
              overflow: "hidden",
              position: "relative",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {article.photo ? (
              <Image
                src={article.photo}
                alt={article.title}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: article.photoPos ?? "center top",
                }}
                priority
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: article.gradient ?? "rgba(13,13,26,0.92)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "18px",
                      background: "rgba(167,139,250,0.15)",
                      border: "1px solid rgba(167,139,250,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BookOpen size={26} color="#C4B5FD" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Контент + сайдбар */}
        <section style={{ paddingBottom: "80px" }}>
          <div className="container-site" style={{ maxWidth: "900px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 500px), 1fr))",
                gap: "48px",
                alignItems: "start",
              }}
            >
              <article style={{ minWidth: 0, width: "100%" }}>
                {realContent ? (
                  realContent
                ) : strapiData?.rawContent ? (
                  <StrapiBlocks blocks={strapiData.rawContent} />
                ) : (
                  <GenericContent article={article} />
                )}

                {/* Теги */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    paddingTop: "28px",
                    marginTop: "28px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "12px",
                        padding: "5px 12px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.04)",
                        color: "#9CA3B8",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              {/* Сайдбар — скрыт через inline max-width на мобильном */}
              <aside
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  width: "100%",
                  maxWidth: "260px",
                }}
              >
                <div
                  style={{
                    borderRadius: "16px",
                    padding: "20px",
                    background: "#080810",
                    border: "1px solid rgba(167,139,250,0.25)",
                    position: "sticky",
                    top: "88px",
                  }}
                >
                  <div
                    className="section-badge"
                    style={{ marginBottom: "12px", fontSize: "10px" }}
                  >
                    <span className="badge-dot" />
                    14 ДНЕЙ БЕСПЛАТНО
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#F0EEFF",
                      marginBottom: "8px",
                      lineHeight: 1.4,
                    }}
                  >
                    Попробуйте LibraChat
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#9CA3B8",
                      marginBottom: "16px",
                      lineHeight: 1.6,
                    }}
                  >
                    Без карты. Отмена в любой момент.
                  </p>
                  <Link
                    href="https://librachat.kz/auth"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "12px",
                      borderRadius: "999px",
                      background: "#A78BFA",
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: 600,
                      textDecoration: "none",
                      boxShadow: "0 4px 16px rgba(167,139,250,0.4)",
                    }}
                  >
                    Начать бесплатно
                  </Link>
                </div>

                <div
                  style={{
                    borderRadius: "16px",
                    padding: "20px",
                    background: "rgba(13,13,26,0.84)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#fff",
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      marginBottom: "16px",
                    }}
                  >
                    Читать также
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    {related.map((rel) => (
                      <Link
                        key={rel.slug}
                        href={`/learn/${rel.slug}`}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "4px",
                          textDecoration: "none",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 500,
                            color: "#9CA3B8",
                            lineHeight: 1.4,
                          }}
                        >
                          {rel.title}
                        </span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontSize: "11px",
                            color: "#6B7280",
                          }}
                        >
                          <Clock size={10} />
                          <span>{rel.readTime} мин</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Похожие материалы */}
        <section
          style={{
            padding: "80px 0",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "#080810",
          }}
        >
          <div className="container-site">
            <div
              className="section-badge"
              style={{
                marginBottom: "16px",
                display: "flex",
                justifyContent: "center",
                width: "fit-content",
                margin: "0 auto 16px",
              }}
            >
              <span className="badge-dot" />
              ДРУГИЕ МАТЕРИАЛЫ
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 800,
                color: "#F0EEFF",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              Решает задачи любой сферы
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "16px",
              }}
            >
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/learn/${rel.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    padding: "24px",
                    borderRadius: "16px",
                    background: "rgba(13,13,26,0.84)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    textDecoration: "none",
                    transition: "border-color 200ms ease",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: "rgba(167,139,250,0.1)",
                      border: "1px solid rgba(167,139,250,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BookOpen size={18} color="#C4B5FD" />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        color: TYPE_COLOR[rel.type].text,
                        marginBottom: "6px",
                        textTransform: "uppercase",
                      }}
                    >
                      {rel.type}
                    </p>
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#F0EEFF",
                        lineHeight: 1.4,
                      }}
                    >
                      {rel.title}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "13px",
                      color: "#A78BFA",
                      marginTop: "auto",
                    }}
                  >
                    Читать <ArrowRight size={13} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Финальный CTA */}
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
                position: "relative",
                overflow: "hidden",
                borderRadius: "24px",
                padding: "72px 40px",
                textAlign: "center",
                background: "rgba(13,13,26,0.97)",
                border: "1px solid rgba(167,139,250,0.18)",
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
                  ПОЛУЧИТЕ ТЕ ЖЕ РЕЗУЛЬТАТЫ
                </div>
                <span className="badge-dot" />
                <h2
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 48px)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: "#F0EEFF",
                  }}
                >
                  Попробуйте LibraChat
                  <br />
                  <span style={{ color: "#F0EEFF" }}>для твоих задач</span>
                </h2>
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
