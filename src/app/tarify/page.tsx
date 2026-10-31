import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import TariffPicker from "@/components/sections/TariffPicker";
import ManagerFormButton from "@/components/ui/ManagerFormButton";
import OpenDetailsOnHash from "@/components/ui/OpenDetailsOnHash";
import FloatingCTA from "@/components/ui/FloatingCTA";
import {
  pricingPlans,
  crossChannelAddons,
  tarifyFaqItems,
  reqVersionPublished,
  lidAddons,
  priceFromLabel,
} from "@/lib/content";
import { ChevronRight, Check, Package, Search } from "lucide-react";
import { IconTile, cardClass } from "@/components/ui/Cards";
import { jsonLdScript } from "@/lib/schema";
import { publicVersions, aggregateOfferJsonLd } from "@/lib/public-offers";

/** Минимальная цена для заголовков: «Заявка» от 790 ₽, без неё — «Лид» от 990 ₽. */
const minPriceLabel = priceFromLabel;

/** Версии и цены «от» — одной строкой для описаний; «Заявка» — по выключателю. */
const versionsLine = reqVersionPublished
  ? "«Заявка» от 790 ₽, «Лид» от 990 ₽, «Про» от 1 990 ₽ в месяц"
  : "«Лид» от 990 ₽, «Про» от 1 990 ₽ в месяц";

export const metadata: Metadata = {
  title: { absolute: `Тарифы ИИ-ассистента — от ${minPriceLabel}/мес | Навылет! AI` },
  description:
    `Тарифы ИИ-ассистента для турагентств: ${versionsLine}. Сайт или MAX, подключение 0 ₽, месяц бесплатно.`,
  keywords: [
    "тарифы ИИ-ассистент",
    "стоимость ИИ-ассистент для турагентства",
    "цена чат-бот турагентство",
    "ИИ виджет цена",
    "Навылет! AI тарифы",
    "подключить ИИ-ассистент",
    "виджет подбора туров цена",
    "автоматизация турагентства стоимость",
    "MAX‑мессенджер для турагентства",
    "ИИ лидогенерация цена",
  ],
  alternates: { canonical: "/tarify" },
  openGraph: {
    title: `Тарифы ИИ-ассистента «Навылет! AI» — от ${minPriceLabel}/мес`,
    description:
      `${versionsLine}. Прозрачная цена за диалог, без скрытых платежей, НДС не облагается.`,
    url: "https://navilet.ru/tarify",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Тарифы ИИ-ассистента «Навылет! AI» — от ${minPriceLabel}/мес`,
    description:
      `${versionsLine}. Первый месяц бесплатно.`,
    images: ["/og-image.png"],
  },
};

const siteUrl = "https://navilet.ru";

const fmt = (n: number) => n.toLocaleString("ru-RU");

/** «Что входит в подписку»: общее для всех версий и то, чего нет у «Заявки». */
const includedGroups = [
  {
    title: "Во всех версиях",
    items: [
      "ИИ-ассистент 24/7 на сайте или в MAX",
      "Виджет под ваш бренд, без чужих логотипов",
      "База знаний агентства — ведёте сами в кабинете",
      "Заявки на почту, в U‑ON, Telegram и MAX",
      "Ответ менеджера клиенту прямо из кабинета",
      "Кабинет с аналитикой и воронкой",
      "Поддержка в кабинете и на support@navilet.ru",
      "Обработка данных по 152-ФЗ",
    ],
  },
  {
    title: reqVersionPublished
      ? "В «Лиде» и «Про» — ещё и подбор туров"
      : "Подбор туров",
    items: [
      "Подбор туров по базе Tourvisor",
      "Цены и наличие на момент запроса",
      "Карточки туров с фото, ценами и перелётами",
      "Горящие туры и спецпредложения",
      "Подборка туров одной ссылкой под брендом агентства",
    ],
  },
];

/** Версии в таблицах и разметке — общие с главной и /skolko-stoit. */
const tableVersions = publicVersions;

const tarifyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/tarify#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Главная",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Тарифы",
          item: `${siteUrl}/tarify`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/tarify#webpage`,
      url: `${siteUrl}/tarify`,
      name: "Тарифы ИИ-ассистента «Навылет! AI»",
      description:
        `Тарифы ИИ-ассистента: ${versionsLine}. Web‑виджет или MAX‑мессенджер. Надстройка «Второй канал».`,
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/tarify#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Product",
      "@id": `${siteUrl}/tarify#product`,
      name: "Навылет! AI — ИИ-ассистент (подписка)",
      description:
        `ИИ-ассистент для турагентств и туроператоров. ${reqVersionPublished ? "«Заявка» — собирает запрос и контакт, тур подбирает менеджер; " : ""}«Лид» — лидогенерация и заявки менеджерам; «Про» — консультации, сопровождение и возврат клиентов. Работает в Web‑виджете или MAX‑мессенджере.`,
      brand: { "@id": `${siteUrl}/#organization` },
      category: "B2B SaaS / TravelTech",
      image: `${siteUrl}/og-image.png`,
      offers: aggregateOfferJsonLd(`${siteUrl}/tarify#offers`),
    },
    {
      // Опции «Лида» — отдельным продуктом: в общий диапазон цен тарифов они не входят.
      "@type": "Product",
      "@id": `${siteUrl}/tarify#lid-addons`,
      name: "Дополнительные подключения версии «Лид»",
      description:
        "Функции версии «Лид» в MAX‑канале: «Вернём клиента» и «Следим за ценой». В версии «Про» входят в тариф.",
      brand: { "@id": `${siteUrl}/#organization` },
      category: "B2B SaaS / TravelTech",
      offers: [
        { key: "reoutreach", name: lidAddons.reoutreach.name, price: lidAddons.reoutreach.price, about: lidAddons.reoutreach.about },
        { key: "subscriptions", name: lidAddons.subscriptions.name, price: lidAddons.subscriptions.price, about: lidAddons.subscriptions.about },
        { key: "bundle", name: "Обе опции", price: lidAddons.bundle, about: `«${lidAddons.reoutreach.name}» и «${lidAddons.subscriptions.name}» вместе — вместо ${lidAddons.bundleInstead} ₽.` },
      ].map((o) => ({
        "@type": "Offer",
        "@id": `${siteUrl}/tarify#addon-${o.key}`,
        name: o.name,
        price: String(o.price),
        priceCurrency: "RUB",
        url: `${siteUrl}/tarify#opcii`,
        description: o.about,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: String(o.price),
          priceCurrency: "RUB",
          unitText: "MONTHLY",
        },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/tarify#faq`,
      mainEntity: tarifyFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function TarifyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(tarifyJsonLd) }}
      />
      <Navigation />
      <main>
        <OpenDetailsOnHash />
        {/* Breadcrumbs */}
        <nav
          aria-label="Хлебные крошки"
          className="mx-auto max-w-7xl px-5 pt-24 sm:px-6 lg:px-8 lg:pt-28"
        >
          <ol className="flex items-center gap-1 text-sm text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-accent">
                Главная
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" aria-hidden />
            </li>
            <li aria-current="page" className="font-semibold text-heading">
              Тарифы
            </li>
          </ol>
        </nav>

        {/* Первый экран: заголовок для поиска прежний, вместо вступления на 120 слов — одна строка;
            цены — сразу ниже, на первом экране телефона */}
        <section className="mx-auto max-w-4xl px-5 pb-5 pt-6 text-center sm:px-6 sm:pt-12 lg:px-8">
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Тарифы <span className="whitespace-nowrap text-accent">ИИ-ассистента</span>{" "}
            «Навылет! AI»
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-body">
            <span className="whitespace-nowrap">Первый месяц бесплатно</span> ·{" "}
            <span className="whitespace-nowrap">подключение 0 ₽</span> ·{" "}
            <span className="whitespace-nowrap">без НДС</span> ·{" "}
            <span className="whitespace-nowrap">отмена в любой момент</span>
          </p>
        </section>

        {/* Тарифы строками: версия → объём → регистрация с этим тарифом */}
        <section className="px-5 pb-14 sm:px-6 lg:px-8 lg:pb-16">
          <TariffPicker />
        </section>

        {/* Что входит в подписку */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
              Что входит в подписку
            </h2>

            <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
              {includedGroups.map((group, gi) => (
                <div key={group.title} className={`${cardClass} p-5 sm:p-7`}>
                  <div className="mb-5 flex items-center gap-3">
                    <IconTile icon={gi === 0 ? Package : Search} />
                    <h3 className="font-display text-lg font-bold text-heading">
                      {group.title}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {group.items.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                          <Check className="h-3 w-3 text-accent" />
                        </span>
                        <span className="text-sm text-body sm:text-base">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Дополнительно: всё, что нужно не каждому, — свёрнуто, но остаётся в HTML для поиска.
            Якоря #cross-channel и #opcii раскрывают нужный блок (OpenDetailsOnHash). */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl space-y-3 px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="mb-6 text-center font-display text-3xl font-bold text-heading sm:text-4xl">
              Дополнительно
            </h2>
          <details id="cross-channel" className="group scroll-mt-28 rounded-2xl border border-blue-subtle/50 bg-white">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-base font-bold text-heading sm:text-lg">Сайт и MAX одновременно — «Второй канал»</h3>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 transition-transform duration-200 group-open:rotate-180">
                <ChevronRight className="h-4 w-4 rotate-90 text-accent" />
              </span>
            </summary>
            <div className="border-t border-blue-subtle/40 px-5 pb-6 pt-5 sm:px-6">
              <p className="mb-6 text-sm leading-relaxed text-body sm:text-base">
                Тариф работает в одном канале — на сайте или в MAX. Нужны оба сразу — добавьте к тарифу «Второй канал»:
                отдельный лимит диалогов во втором канале по льготной цене.
              </p>
              {tableVersions.map((version) => (
                <div key={`addon-${version.id}`}>
                  <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wide text-muted">
                    «Второй канал» в версии {version.label} — Web и MAX
                    одновременно
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-blue-subtle/50">
                    <div className="scroll-shadow-x">
                      <table className="min-w-full text-sm">
                        <thead className="bg-surface-alt">
                          <tr>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-heading">
                              Тариф
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                              Доплата
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                              +Диалоги
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                              Итого/мес
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                              Итого диалогов
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                              Сверхлимит во 2-м канале
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-subtle/30">
                          {crossChannelAddons.filter((a) => a.planId !== "set").map((a) => {
                            const plan = pricingPlans.find(
                              (p) => p.id === a.planId
                            )!;
                            const v =
                              version.id === "lid"
                                ? a.lid
                                : version.id === "req"
                                ? a.req
                                : a;
                            if (!v) return null;
                            return (
                              <tr
                                key={a.planId}
                                className="hover:bg-blue-ice/20"
                              >
                                <td className="px-4 py-3 font-display font-semibold text-heading">
                                  {plan.name}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-right text-body">
                                  +{fmt(v.addonPrice)} ₽
                                </td>
                                <td className="px-4 py-3 text-right text-body">
                                  +{v.extraDialogs}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                                  {fmt(v.totalPrice)} ₽
                                </td>
                                <td className="px-4 py-3 text-right text-body">
                                  {v.totalDialogs}
                                </td>
                                <td className="whitespace-nowrap px-4 py-3 text-right text-body">
                                  {v.extraDialogPrice} ₽
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </details>
          <details id="opcii" className="group scroll-mt-28 rounded-2xl border border-blue-subtle/50 bg-white">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-base font-bold text-heading sm:text-lg">Опции версии «Лид» в MAX — от {lidAddons.reoutreach.price} ₽/мес</h3>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 transition-transform duration-200 group-open:rotate-180">
                <ChevronRight className="h-4 w-4 rotate-90 text-accent" />
              </span>
            </summary>
            <div className="border-t border-blue-subtle/40 px-5 pb-6 pt-5 sm:px-6">
              <p className="text-sm leading-relaxed text-body sm:text-base">
                В «Про» возврат клиентов входит в тариф. В «Лиде» его можно подключить опциями — в кабинете, в любой момент.
              </p>
              <ul className="mt-4 divide-y divide-blue-subtle/40 rounded-xl border border-blue-subtle/50">
                {[
                  { title: `«${lidAddons.reoutreach.name}»`, price: lidAddons.reoutreach.price, text: lidAddons.reoutreach.about },
                  { title: `«${lidAddons.subscriptions.name}»`, price: lidAddons.subscriptions.price, text: lidAddons.subscriptions.about },
                  { title: "Обе опции", price: lidAddons.bundle, text: `Вместо ${lidAddons.bundleInstead} ₽ — выгоднее, чем по отдельности.` },
                ].map((o) => (
                  <li key={o.title} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3">
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-heading">{o.title}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-body">{o.text}</span>
                    </span>
                    <span className="whitespace-nowrap font-display text-lg font-bold text-heading">{o.price} ₽/мес</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 space-y-1.5 text-sm text-body">
                {[
                  "Работают в канале MAX — подключаются, когда MAX подключён.",
                  "Включаются и выключаются в кабинете в любой момент; в счёт входят со следующего периода.",
                  "На пробном периоде не подключаются. Цена одна для всех тарифов «Лида».",
                  `В «Про» обе функции входят в тариф${reqVersionPublished ? "; в «Заявке» входит «Вернём клиента», «Следим за ценой» нет" : ""}.`,
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm">
                <Link href="/vozvrat-klientov" className="font-semibold text-accent hover:underline">
                  Как ассистент возвращает клиентов
                </Link>
              </p>
            </div>
          </details>
          <details className="group scroll-mt-28 rounded-2xl border border-blue-subtle/50 bg-white">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-base font-bold text-heading sm:text-lg">Сравнить все тарифы в таблице</h3>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 transition-transform duration-200 group-open:rotate-180">
                <ChevronRight className="h-4 w-4 rotate-90 text-accent" />
              </span>
            </summary>
            <div className="border-t border-blue-subtle/40 px-5 pb-6 pt-5 sm:px-6">
              {tableVersions.map((version, vi) => (
                <div key={version.id}>
                  <h3
                    className={`mb-3 text-sm font-semibold uppercase tracking-wide text-muted ${
                      vi > 0 ? "mt-8" : ""
                    }`}
                  >
                    {version.title}
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-blue-subtle/50">
                    <div className="scroll-shadow-x">
                      <table className="min-w-full text-sm">
                        <thead className="bg-surface-alt">
                          <tr>
                            <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-heading">
                              Тариф
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                              Цена/мес
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                              Диалогов
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                              Сверхлимит
                            </th>
                            <th className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                              Подключение
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-subtle/30">
                          {pricingPlans.map((p) => {
                            const v = version.pick(p);
                            return (
                              <tr
                                key={p.id}
                                className="hover:bg-blue-ice/20"
                              >
                                <td className="px-4 py-3 font-display font-semibold text-heading">
                                  {p.name}
                                  {p.popular && (
                                    <span className="ml-2 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
                                      популярный
                                    </span>
                                  )}
                                </td>
                                {p.custom || !v ? (
                                  <td
                                    colSpan={3}
                                    className="whitespace-nowrap px-4 py-3 text-left text-body"
                                  >
                                    Индивидуально, по заявке
                                  </td>
                                ) : (
                                  <>
                                    <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-heading">
                                      {fmt(v.price)} ₽
                                    </td>
                                    <td className="px-4 py-3 text-right text-body">
                                      {v.dialogs}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-right text-body">
                                      {v.extraDialog} ₽
                                    </td>
                                  </>
                                )}
                                <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-accent">
                                  0 ₽
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
              <p className="mt-5 text-center text-sm text-muted">
                Подключение MAX‑канала бесплатное — разовых платежей нет. Цены
                окончательные: НДС не облагается (участник проекта «Сколково»).
              </p>
            </div>
          </details>
          <details className="group scroll-mt-28 rounded-2xl border border-blue-subtle/50 bg-white">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 sm:px-6 [&::-webkit-details-marker]:hidden">
              <h3 className="font-display text-base font-bold text-heading sm:text-lg">Подключение, оплата и НДС</h3>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 transition-transform duration-200 group-open:rotate-180">
                <ChevronRight className="h-4 w-4 rotate-90 text-accent" />
              </span>
            </summary>
            <div className="border-t border-blue-subtle/40 px-5 pb-6 pt-5 sm:px-6">
              <ul className="space-y-3 text-sm leading-relaxed text-body sm:text-base">
                {[
                  ["Подключение — 0 ₽", "Разовых платежей нет ни на одном тарифе: виджет в вашем стиле, установка одной строкой кода, Tourvisor уже подключён."],
                  ["MAX — тоже 0 ₽", "Создайте бота на платформе «MAX для партнёров» и передайте токен в кабинете — подключим за 1 рабочий день."],
                  ["Заявки", "На почту, в U‑ON, Telegram и MAX. U‑ON подключаете сами в кабинете, Битрикс24 и amoCRM — по заявке."],
                  ["Оплата", "Ежемесячно по счёту, банковским переводом, без автосписаний с карты."],
                  ["НДС", "Не облагается: разработчик — участник проекта «Сколково». Цена в тарифе итоговая."],
                ].map(([t, d]) => (
                  <li key={t}>
                    <span className="font-semibold text-heading">{t}.</span> {d}
                  </li>
                ))}
              </ul>
            </div>
          </details>
          </div>
        </section>

        {/* FAQ про механику тарифов: как считается диалог, что при
            перерасходе, как менять тариф. Вопросы уникальны для этой
            страницы — общий FAQ живёт на /faq и /voprosy. */}
        <section className="mx-auto max-w-3xl px-5 pb-14 sm:px-6 lg:px-8 lg:pb-16">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-heading sm:text-4xl">
            Как работает подписка
          </h2>
          <div className="space-y-4">
            {tarifyFaqItems.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card sm:p-6"
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 font-display text-base font-bold text-heading [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/skolko-stoit"
              className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              Сколько стоит ИИ-ассистент: расчёт окупаемости и сравнение
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Финал: не уверены — подберём вместе */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Не уверены, какой тариф подойдёт?
            </h2>
            <p className="mt-4 text-base text-body sm:text-lg">
              Расскажите об агентстве — подберём тариф и подключим сами. Первый месяц бесплатно.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
              <ManagerFormButton source="tarify_final" />
              <p className="text-sm text-body">
                <a href="tel:+79637997977" className="whitespace-nowrap font-semibold text-heading hover:text-accent">
                  +7 (963) 799-79-77
                </a>
                {" · "}
                <a href="mailto:office@aimpact.ru" className="font-semibold text-heading hover:text-accent">
                  office@aimpact.ru
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
