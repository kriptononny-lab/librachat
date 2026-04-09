import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
  description: "Условия использования сервиса LibraChat.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1 pt-[68px]">
        <section className="pt-16 pb-24">
          <div className="container-site max-w-3xl">
            <div className="section-badge mb-4 w-fit">✦ ПРАВОВАЯ ИНФОРМАЦИЯ</div>
            <h1 className="text-4xl font-bold text-white mb-3">Пользовательское соглашение</h1>
            <p className="text-[#6b6480] text-sm mb-2">Обновлено: 14 апреля 2024 · Версия 2.0</p>
            <p className="text-[#a89ec0] text-sm leading-relaxed mb-12">
              Настоящее соглашение регулирует отношения между ООО «LibraChat» и пользователями сервиса. Используя LibraChat, вы принимаете условия данного соглашения.
            </p>

            <div className="flex flex-col gap-10">
              {[
                {
                  num: "1",
                  title: "Общие положения",
                  content: "LibraChat предоставляет доступ к ИИ-ассистенту на условиях настоящего соглашения. Сервис доступен пользователям, достигшим возраста 18 лет или имеющим согласие законного представителя.",
                },
                {
                  num: "2",
                  title: "Регистрация и аккаунт",
                  content: "Для использования полного функционала необходима регистрация. Вы несёте ответственность за сохранность своих учётных данных и все действия, совершённые под вашим аккаунтом.",
                },
                {
                  num: "3",
                  title: "Правила использования",
                  content: "Запрещается использовать LibraChat для создания вредоносного контента, нарушения прав третьих лиц, обхода ограничений сервиса или автоматизированного доступа без разрешения.",
                },
                {
                  num: "4",
                  title: "Оплата и возврат",
                  content: "Платные тарифы оплачиваются авансом. Возврат средств возможен в течение 7 дней после первой оплаты при условии минимального использования сервиса. Подробнее в политике возврата.",
                },
                {
                  num: "5",
                  title: "Интеллектуальная собственность",
                  content: "Контент, созданный с помощью LibraChat, принадлежит вам. LibraChat сохраняет права на платформу, модели и технологии. Вы не вправе копировать или реверс-инжинировать сервис.",
                },
                {
                  num: "6",
                  title: "Ограничение ответственности",
                  content: "LibraChat предоставляется «как есть». Мы не гарантируем абсолютную точность ответов ИИ. Рекомендуем проверять критически важную информацию через независимые источники.",
                },
                {
                  num: "7",
                  title: "Изменение условий",
                  content: "Мы вправе изменять условия соглашения, уведомляя пользователей за 30 дней до вступления изменений в силу через email или уведомление в сервисе.",
                },
                {
                  num: "8",
                  title: "Контакты",
                  content: "По вопросам соглашения: legal@librachat.ru. ООО «LibraChat», г. Москва.",
                },
              ].map((section) => (
                <div key={section.num} className="flex gap-5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white shrink-0 mt-0.5"
                    style={{ background: "rgba(108,92,231,0.2)", border: "1px solid rgba(108,92,231,0.3)" }}
                  >
                    {section.num}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-bold text-white">{section.title}</h2>
                    <p className="text-sm text-[#a89ec0] leading-relaxed">{section.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-16 flex flex-wrap items-center gap-4 pt-8"
              style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
            >
              <Link href="/privacy"  className="text-sm text-[#6b6480] hover:text-[#8b7cf8] transition-colors">Политика конфиденциальности</Link>
              <Link href="/cookies"  className="text-sm text-[#6b6480] hover:text-[#8b7cf8] transition-colors">Политика cookies</Link>
              <Link href="/contact"  className="text-sm text-[#6b6480] hover:text-[#8b7cf8] transition-colors ml-auto">Написать в поддержку</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
