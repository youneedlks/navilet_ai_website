import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import DashboardHero from "@/components/dashboard/DashboardHero";
import DashboardAnalyticsShowcase from "@/components/dashboard/DashboardAnalyticsShowcase";
import DashboardWidgetShowcase from "@/components/dashboard/DashboardWidgetShowcase";
import DashboardKabinetTour from "@/components/dashboard/DashboardKabinetTour";
import DashboardCTA from "@/components/dashboard/DashboardCTA";
import CabinetVideo from "@/components/video/CabinetVideo";
import { jsonLdScript } from "@/lib/schema";
import { cardClass } from "@/components/ui/Cards";
import { priceFromLabel } from "@/lib/content";

export const metadata = {
  title: { absolute: "Личный кабинет ИИ-ассистента | Навылет! AI" },
  description:
    "Личный кабинет ИИ-ассистента: диалоги и ответ менеджера, аналитика и прогнозы, база знаний, заявки в Telegram и MAX — всё на lk.navilet.ru.",
  keywords: [
    "личный кабинет турагентства",
    "аналитика ИИ турагентство",
    "управление ИИ-виджетом",
    "мониторинг диалогов турагентство",
    "Навылет! AI личный кабинет",
    "lk.navilet.ru",
  ],
  alternates: { canonical: "/dashboard" },
  openGraph: {
    title: "Личный кабинет ИИ-ассистента — Навылет! AI",
    description:
      "Диалоги и ответ менеджера, аналитика и прогнозы, база знаний, интеграции с почтой, U‑ON, Telegram и MAX — в одном кабинете.",
    url: "https://navilet.ru/dashboard",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Личный кабинет ИИ-ассистента — Навылет! AI",
    description:
      "Диалоги, аналитика, база знаний и заявки в Telegram и MAX.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://navilet.ru/dashboard#breadcrumb",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Главная",
      item: "https://navilet.ru/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Личный кабинет",
      item: "https://navilet.ru/dashboard",
    },
  ],
};

export default function DashboardPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbLd) }}
      />
      <Navigation />
      <main>
        <DashboardHero />
        {/* Ролик: путь заявки в кабинете — от уведомления до ответа менеджера */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
              Заявка в кабинете — за 20 секунд
            </h2>
            <p className="mx-auto mt-4 mb-8 max-w-2xl text-center text-base text-body sm:mb-10">
              Так менеджер видит заявку от ассистента: уведомление, переписка, контакт и сводка запроса — и ответ клиенту
              одной кнопкой.
            </p>
            <CabinetVideo />
          </div>
        </section>
        <DashboardKabinetTour />
        <DashboardAnalyticsShowcase />
        <DashboardWidgetShowcase />
        {/* Куда дальше — карточками-ссылками: страница не тупик ни для посетителя, ни для поиска */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8 lg:py-14">
            <h2 className="text-center font-display text-xl font-bold text-heading sm:text-2xl">Что посмотреть дальше</h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {[
                { href: "/dlya-turagentstv", label: "ИИ для турагентства", text: "Как ассистент обрабатывает заявки 24/7" },
                { href: "/tarify", label: `Тарифы от ${priceFromLabel}/мес`, text: "Цены всех версий и что входит в подписку" },
                { href: "/integraciya-tourvisor", label: "Интеграция с Tourvisor", text: "Подбор туров по реальной базе" },
                { href: "/blog", label: "Блог: гайды и кейсы", text: "Как агентства работают с ИИ" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`${cardClass} group flex h-full items-center gap-3 p-4 transition-colors hover:border-accent/40 sm:p-5`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-base font-bold text-heading transition-colors group-hover:text-accent">
                        {l.label}
                      </span>
                      <span className="mt-1 block text-sm text-body">{l.text}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <DashboardCTA />
      </main>
      <Footer />
    </>
  );
}
