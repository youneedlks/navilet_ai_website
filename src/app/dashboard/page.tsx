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
        {/* Куда дальше — строкой ссылок: страница не тупик ни для посетителя, ни для поиска */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-12 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-xl font-bold text-heading sm:text-2xl">Что посмотреть дальше</h2>
            <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-semibold sm:text-base">
              {[
                { href: "/dlya-turagentstv", label: "ИИ для турагентства" },
                { href: "/tarify", label: `Тарифы от ${priceFromLabel}/мес` },
                { href: "/integraciya-tourvisor", label: "Интеграция с Tourvisor" },
                { href: "/blog", label: "Блог: гайды и кейсы" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-10 items-center gap-1.5 text-accent hover:underline">
                    {l.label}
                    <ArrowRight className="h-4 w-4" />
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
