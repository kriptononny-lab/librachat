import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Download, ExternalLink } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Как LibraChat собирает, использует и защищает ваши персональные данные.",
  robots: { index: true, follow: true },
};

// ───────────────────────────────────────────────────
// Компоненты документа
// ───────────────────────────────────────────────────
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="flex flex-col gap-4 scroll-mt-24">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <div className="flex flex-col gap-3 text-sm text-[#a89ec0] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function InfoTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
      <table className="w-full min-w-[480px] text-sm">
        <thead>
          <tr style={{ background: "rgba(20,19,28,0.9)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            {["Категория", "Что собираем", "Зачем"].map((h) => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#6b6480] uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([cat, data, why], i) => (
            <tr key={cat} style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 0 ? "rgba(20,19,28,0.5)" : "transparent" }}>
              <td className="px-4 py-3 font-semibold text-white">{cat}</td>
              <td className="px-4 py-3 text-[#a89ec0]">{data}</td>
              <td className="px-4 py-3 text-[#6b6480]">{why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Callout({ type, children }: { type: "info" | "warning" | "success"; children: React.ReactNode }) {
  const styles = {
    info:    { bg: "rgba(59,130,246,0.08)",  border: "rgba(59,130,246,0.25)",  icon: "ℹ️" },
    warning: { bg: "rgba(245,166,35,0.08)",  border: "rgba(245,166,35,0.25)",  icon: "⚠️" },
    success: { bg: "rgba(34,197,94,0.08)",   border: "rgba(34,197,94,0.25)",   icon: "✅" },
  }[type];

  return (
    <div className="flex gap-3 px-4 py-4 rounded-xl text-sm text-[#c8c0e0] leading-relaxed" style={{ background: styles.bg, border: `1px solid ${styles.border}` }}>
      <span className="shrink-0">{styles.icon}</span>
      <div>{children}</div>
    </div>
  );
}

// ───────────────────────────────────────────────────
// Страница
// ───────────────────────────────────────────────────
export default function PrivacyPage() {
  const sections = [
    { id: "data",     label: "Данные которые мы собираем" },
    { id: "usage",    label: "Как мы используем ваши данные" },
    { id: "storage",  label: "Хранение и защита данных" },
    { id: "cookies",  label: "Cookies и трекеры" },
    { id: "rights",   label: "Ваши права" },
    { id: "contacts", label: "Контакты и вопросы" },
  ];

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />

      <main className="flex-1 pt-[68px]">

        {/* ── ШАПКА ДОКУМЕНТА ─────────────────────── */}
        <section className="pt-16 pb-12">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">
              {/* Заголовок */}
              <div>
                <div className="section-badge mb-4 w-fit">✦ ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-5">
                  Как мы защищаем
                  <br />
                  ваши данные
                </h1>
                <p className="text-[#a89ec0] max-w-lg leading-relaxed mb-6">
                  Мы серьёзно относимся к конфиденциальности. Этот документ объясняет какие
                  данные мы собираем, зачем и как их защищаем.
                </p>
                <div className="flex items-center gap-6 text-sm text-[#6b6480]">
                  <span>Обновлено: 14 апреля 2024</span>
                  <span>Версия: 2.1</span>
                  <span>Язык: Русский</span>
                </div>
                <p className="text-xs text-[#4a4560] mt-2">Чтение: ~10 мин</p>
              </div>

              {/* Ключевые тезисы */}
              <div className="rounded-2xl p-5" style={{ background: "rgba(20,19,28,0.8)", border: "1px solid rgba(108,92,231,0.2)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Shield size={16} className="text-[#8b7cf8]" />
                  <p className="text-sm font-semibold text-white">Кратко о главном</p>
                </div>
                <ul className="flex flex-col gap-3">
                  {[
                    { text: "Не продаём персональные данные третьим лицам", ok: true },
                    { text: "Данные хранятся на серверах в России/ЕС", ok: true },
                    { text: "Вы можете удалить свой аккаунт в любое время", ok: true },
                    { text: "Соответствуем 152-ФЗ и GDPR", ok: true },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-2.5 text-sm text-[#c8c0e0]">
                      <span className="text-[#22c55e] shrink-0 mt-0.5">✓</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── КОНТЕНТ + САЙДБАР ───────────────────── */}
        <section className="pb-20" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="container-site max-w-5xl pt-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">

              {/* Основной контент */}
              <div className="flex flex-col gap-12">

                {/* Важная информация */}
                <Callout type="info">
                  <strong>Важная информация:</strong> Используя сервис LibraChat, вы соглашаетесь с условиями данного документа. Если у вас есть вопросы — напишите нам на{" "}
                  <a href="mailto:privacy@librachat.ru" className="text-[#8b7cf8] underline">privacy@librachat.ru</a>
                </Callout>

                {/* 01 - Данные */}
                <Section id="data" title="Данные которые мы собираем">
                  <p>
                    В рамках работы LibraChat мы получаем ряд данных, необходимых для корректной работы сервиса. Мы собираем только то, что действительно нужно — без избыточного сбора информации.
                  </p>
                  <InfoTable rows={[
                    ["Аккаунт",   "Email, имя, аватар",          "Идентификация пользователя"],
                    ["Диалоги",  "Текст сообщений, файлы",       "Обработка запросов ИИ"],
                    ["Технические", "IP, браузер, устройство",   "Безопасность и аналитика"],
                    ["Поддержка", "Переписка с командой",         "Решение проблем"],
                  ]} />
                  <Callout type="success">
                    Важно: мы <strong>не продаём</strong> и не сдаём в аренду ваши персональные данные сторонним организациям или рекламным сетям. Никогда.
                  </Callout>
                </Section>

                {/* 02 - Использование */}
                <Section id="usage" title="Как мы используем ваши данные">
                  <p>Собранные данные используются строго в рамках предоставления и улучшения сервиса:</p>
                  <ul className="flex flex-col gap-2">
                    {[
                      "Авторизация и идентификация пользователя в сервисе",
                      "Обработка запросов к ИИ и формирование ответов",
                      "Синхронизация истории диалогов между устройствами",
                      "Отправка технических уведомлений об изменениях",
                      "Улучшение качества моделей на обезличенных данных",
                      "Предотвращение мошенничества и защита от злоупотреблений",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="text-[#6c5ce7] shrink-0 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Callout type="warning">
                    Диалог с LibraChat не передаётся третьим лицам. Обезличенные данные могут использоваться для улучшения качества ответов — личная информация при этом удаляется.
                  </Callout>
                </Section>

                {/* 03 - Хранение */}
                <Section id="storage" title="Хранение и защита данных">
                  <p>Все данные хранятся на защищённых серверах с шифрованием AES-256. Доступ к данным имеет только уполномоченный персонал в рамках служебных обязанностей.</p>
                  <InfoTable rows={[
                    ["Данные аккаунта", "До удаления аккаунта",   "Россия / ЕС"],
                    ["История диалогов", "До 7-90 дней (тариф)",  "Россия / ЕС"],
                    ["Платёжные данные", "6 лет (требования НК)", "Платёжный оператор"],
                    ["Технические логи", "90 дней",               "Россия"],
                  ]} />
                </Section>

                {/* 04 - Cookies */}
                <Section id="cookies" title="Cookies и трекеры">
                  <p>LibraChat использует cookies для обеспечения работы сервиса. Мы не используем рекламные трекеры третьих сторон.</p>
                  <ul className="flex flex-col gap-2">
                    {[
                      { label: "Необходимые cookies", desc: "авторизация, безопасность сессии. Нельзя отключить.", color: "#ef4444" },
                      { label: "Функциональные cookies", desc: "настройки языка и интерфейса. Можно отключить.", color: "#e8952a" },
                      { label: "Аналитические cookies", desc: "анонимная статистика посещаемости. Можно отключить.", color: "#22c55e" },
                    ].map((cookie) => (
                      <li key={cookie.label} className="flex items-start gap-2.5">
                        <span className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: cookie.color }} />
                        <span><strong className="text-white">{cookie.label}</strong> — {cookie.desc}</span>
                      </li>
                    ))}
                  </ul>
                  <Callout type="info">
                    Вы можете управлять cookies через настройки браузера или через панель управления cookies в нижней части нашего сайта.
                  </Callout>
                </Section>

                {/* 05 - Права */}
                <Section id="rights" title="Ваши права">
                  <p>В соответствии с 152-ФЗ и GDPR вы имеете следующие права в отношении ваших персональных данных:</p>
                  <ul className="flex flex-col gap-2">
                    {[
                      "Право на доступ — получить копию всех данных о вас в системе",
                      "Право на исправление — обновить устаревшие или ошибочные данные",
                      "Право на удаление — запросить полное удаление аккаунта и данных",
                      "Право на перенос — получить данные в машиночитаемом формате",
                      "Право на возражение — отказаться от обработки данных для обучения",
                    ].map((right) => (
                      <li key={right} className="flex items-start gap-2.5">
                        <span className="text-[#8b7cf8] shrink-0 mt-0.5">→</span>
                        {right}
                      </li>
                    ))}
                  </ul>
                  <p>
                    Для реализации прав обратитесь через форму в настройках аккаунта. Мы обработаем запрос в течение 30 рабочих дней.
                  </p>
                </Section>

                {/* 06 - Контакты */}
                <Section id="contacts" title="Контакты и вопросы">
                  <p>Если у вас есть вопросы о конфиденциальности или вы хотите воспользоваться своими правами — свяжитесь с нами:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Общие вопросы DPO",     value: "privacy@librachat.ru" },
                      { label: "Юридический адрес",      value: "ООО «LibraChat», Москва" },
                      { label: "Email для жалоб",        value: "privacy@librachat.ru" },
                      { label: "Регулятор",              value: "Роскомнадзор / DPA" },
                    ].map((contact) => (
                      <div key={contact.label} className="p-4 rounded-xl" style={{ background: "rgba(20,19,28,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}>
                        <p className="text-xs text-[#6b6480] mb-1">{contact.label}</p>
                        <p className="text-sm font-medium text-white">{contact.value}</p>
                      </div>
                    ))}
                  </div>
                </Section>
              </div>

              {/* Сайдбар */}
              <aside className="flex flex-col gap-5">

                {/* Содержание */}
                <div className="rounded-2xl p-5 sticky top-24" style={{ background: "rgba(20,19,28,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Содержание</p>
                  <nav className="flex flex-col gap-1">
                    {sections.map((s, i) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        className="flex items-center gap-2.5 text-xs py-2 transition-colors hover:text-[#8b7cf8] group"
                        style={{ color: "#6b6480", borderLeft: "2px solid rgba(255,255,255,0.06)", paddingLeft: 10 }}
                      >
                        <span className="text-[#4a4560] font-mono">{String(i + 1).padStart(2, "0")}</span>
                        <span className="group-hover:text-[#8b7cf8] transition-colors">{s.label}</span>
                      </a>
                    ))}
                  </nav>

                  {/* Скачать PDF */}
                  <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                    <p className="text-xs text-[#6b6480] mb-3">Скачать документ</p>
                    <Button variant="secondary" size="sm" className="w-full gap-2">
                      <Download size={13} />
                      Скачать PDF
                    </Button>
                  </div>
                </div>

                {/* Поддержка */}
                <div className="rounded-2xl p-5" style={{ background: "rgba(20,19,28,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <p className="text-xs font-semibold text-white mb-3">Появились вопросы?</p>
                  <p className="text-xs text-[#6b6480] mb-4 leading-relaxed">Напишите нам — ответим в течение 24 часов в рабочие дни.</p>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/contact">Написать в поддержку</Link>
                  </Button>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ── ДРУГИЕ ДОКУМЕНТЫ ────────────────────── */}
        <section className="pb-24" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="container-site pt-16">
            <div className="section-badge mb-4 mx-auto w-fit">ПРАВОВАЯ ИНФОРМАЦИЯ</div>
            <h2 className="text-2xl font-bold text-center mb-10">Другие документы</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                { title: "Пользовательское соглашение",  desc: "Правила использования сервиса LibraChat", href: "/terms" },
                { title: "Политика cookies",             desc: "Как мы используем файлы cookie", href: "/cookies" },
                { title: "Политика возврата",            desc: "Условия возврата средств за подписку", href: "/refund" },
              ].map((doc) => (
                <Link
                  key={doc.title}
                  href={doc.href}
                  className="group flex flex-col gap-3 p-5 rounded-2xl transition-all hover:border-[rgba(108,92,231,0.3)]"
                  style={{ background: "rgba(20,19,28,0.7)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <ExternalLink size={16} className="text-[#4a4560] group-hover:text-[#8b7cf8] transition-colors" />
                  <h3 className="text-sm font-semibold text-white">{doc.title}</h3>
                  <p className="text-xs text-[#6b6480] leading-relaxed">{doc.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
