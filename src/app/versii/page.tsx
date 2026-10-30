import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import VersionRows from "@/components/sections/VersionRows";
import VersionVideos from "@/components/video/VersionVideos";
import RegisterCta from "@/components/seo/RegisterCta";
import OpenDetailsOnHash from "@/components/ui/OpenDetailsOnHash";
import {
  assistantVersions,
  versionCompareGroups,
  versionCompareMaxNote,
  versiiFaqItems,
  reqVersionPublished,
} from "@/lib/content";
import { ArrowRight, Check, ChevronDown, ChevronRight, Minus } from "lucide-react";
import { jsonLdScript } from "@/lib/schema";
import { versionIcons } from "@/lib/version-icons";

const siteUrl = "https://navilet.ru";

const LidIcon = versionIcons.lid;
const ProIcon = versionIcons.pro;
const ReqIcon = versionIcons.req;
const minVersionPrice = Math.min(...assistantVersions.map((v) => v.priceFrom));

export const metadata: Metadata = {
  title: {
    absolute:
      reqVersionPublished
        ? "Версии «Заявка», «Лид», «Про»: сравнение и цены от 790 ₽ | Навылет! AI"
        : "Версии «Лид» и «Про»: сравнение и цены от 990 ₽ | Навылет! AI",
  },
  description:
    reqVersionPublished
      ? "Три версии ИИ-ассистента: «Заявка» — запрос без подбора от 790 ₽/мес, «Лид» — подбор туров и заявка от 990 ₽, «Про» — консультации от 1 990 ₽."
      : "Две версии ИИ-ассистента для турагентства: «Лид» — заявки менеджеру от 990 ₽/мес, «Про» — консультации и возврат клиентов от 1 990 ₽/мес. Сравнение в таблице.",
  keywords: [
    "версии ИИ-ассистента",
    "ИИ лидогенерация турагентство",
    "сравнение версий Навылет AI",
    "ИИ-ассистент Лид",
    "ИИ-ассистент Про",
    "чат-бот сбор заявок турагентство",
    "ИИ для менеджеров турагентства",
  ],
  alternates: { canonical: "/versii" },
  openGraph: {
    title: reqVersionPublished
      ? "Версии ИИ-ассистента «Заявка», «Лид» и «Про» — какое решение для вашего агентства"
      : "Версии ИИ-ассистента «Лид» и «Про» — какое решение для вашего агентства",
    description:
      reqVersionPublished
        ? "«Заявка» собирает запрос и контакт от 790 ₽/мес, «Лид» подбирает туры и передаёт заявку от 990 ₽, «Про» консультирует и возвращает клиентов. Сравните версии."
        : "«Лид» собирает готовые заявки для менеджеров от 990 ₽/мес. «Про» консультирует, сопровождает и возвращает клиентов. Сравните и попробуйте обе версии в демо.",
    url: `${siteUrl}/versii`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: reqVersionPublished
      ? "Версии ИИ-ассистента «Заявка», «Лид» и «Про» — сравнение"
      : "Версии ИИ-ассистента «Лид» и «Про» — сравнение",
    description:
      reqVersionPublished
        ? "«Заявка» — от 790 ₽/мес, «Лид» — от 990 ₽, «Про» — от 1 990 ₽. Первый месяц бесплатно."
        : "«Лид» — заявки менеджерам от 990 ₽/мес. «Про» — консультации и возврат клиентов. Первый месяц бесплатно.",
    images: ["/og-image.png"],
  },
};

const versiiJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/versii#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Версии ассистента",
          item: `${siteUrl}/versii`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/versii#webpage`,
      url: `${siteUrl}/versii`,
      name: reqVersionPublished
        ? "Версии ИИ-ассистента «Заявка», «Лид» и «Про» — сравнение"
        : "Версии ИИ-ассистента «Лид» и «Про» — сравнение",
      description: reqVersionPublished
        ? "Сравнение трёх версий ИИ-ассистента «Навылет! AI»: «Заявка» собирает запрос без подбора туров, «Лид» — для лидогенерации, «Про» — для полного сопровождения клиентов."
        : "Сравнение двух версий ИИ-ассистента «Навылет! AI»: «Лид» для лидогенерации и «Про» для полного сопровождения клиентов.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/versii#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      // Страница сравнивает два платных предложения, поэтому цены
      // размечены прямо здесь: Яндекс собирает из lowPrice сниппет
      // «от 990 ₽», а ИИ-поиск получает цену вместе с описанием версий.
      "@type": "Product",
      "@id": `${siteUrl}/versii#product`,
      name: reqVersionPublished
        ? "ИИ-ассистент «Навылет! AI»: версии «Заявка», «Лид» и «Про»"
        : "ИИ-ассистент «Навылет! AI»: версии «Лид» и «Про»",
      description: `${reqVersionPublished ? "Три версии ИИ-ассистента для турагентства: «Заявка» — сбор запроса и контакта без подбора туров, тур подбирает менеджер; " : "Две версии ИИ-ассистента для турагентства на одном движке: "}«Лид» — лидогенерация и готовые заявки менеджеру, «Про» — консультации без ограничений, проверка цен в диалоге и возврат клиентов в MAX.`,
      brand: { "@id": `${siteUrl}/#organization` },
      category: "B2B SaaS / TravelTech",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "RUB",
        lowPrice: String(minVersionPrice),
        highPrice: "7990",
        offerCount: assistantVersions.length,
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/tarify`,
        offers: assistantVersions.map((v) => ({
          "@type": "Offer",
          name: v.fullName,
          description: v.tagline,
          price: String(v.priceFrom),
          priceCurrency: "RUB",
          availability: "https://schema.org/InStock",
          url: `${siteUrl}/versii`,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(v.priceFrom),
            priceCurrency: "RUB",
            unitText: "MONTHLY",
            billingDuration: 1,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/versii#faq`,
      mainEntity: versiiFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

/** Ячейка сравнительной таблицы: ✓ / — / текст */
function CompareCell({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10">
          <Check className="h-3 w-3 text-accent" aria-hidden />
        </span>
        <span className="sr-only">да</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center text-muted">
        <Minus className="h-4 w-4" aria-hidden />
        <span className="sr-only">нет</span>
      </span>
    );
  }
  return <span className="text-body">{value}</span>;
}

export default function VersiiPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(versiiJsonLd) }}
      />
      <Navigation />
      <main>
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
              Версии ассистента
            </li>
          </ol>
        </nav>

        {/* Первый экран: версии строками — ситуация агентства, версия и цена;
            по нажатию — полный список возможностей и действия версии */}
        <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
              {reqVersionPublished ? "Три версии ассистента:" : "Две версии ассистента:"}{" "}
              <span className="text-accent">
                {reqVersionPublished ? "«Заявка», «Лид» и «Про»" : "«Лид» и «Про»"}
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-body sm:text-lg">
              {reqVersionPublished ? "Все три" : "Обе"} работают на сайте и в MAX. Первый месяц бесплатно на любой
              версии, сменить её можно в кабинете в любой момент.
            </p>
          </div>

          <div className="mt-8 sm:mt-10">
            <VersionRows source="versii" />
          </div>
        </section>

        {/* Ролики: как работает каждая версия на одном и том же запросе туриста */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
              Посмотрите каждую версию в деле
            </h2>
            <p className="mx-auto mt-4 mb-8 max-w-2xl text-center text-base text-body sm:mb-10">
              Один и тот же турист хочет в Турцию в июне. Переключайте версии — увидите, что делает ассистент
              и с чем к менеджеру приходит заявка.
            </p>
            <VersionVideos />
          </div>
        </section>

        {/* Сравнение: главное — абзацем, полная таблица — по нажатию
            (в <details> она остаётся в HTML для поиска и ИИ) */}
        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
            Чем отличаются версии
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-body">
            {reqVersionPublished && "«Заявка» собирает запрос, а тур подбирает менеджер. "}
            Это разные инструменты на одном движке: «Лид» ловит заявку и передаёт её живому менеджеру, «Про» сам сопровождает клиента до брони и возвращает ушедших.
          </p>

          <dl className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-5 text-center sm:grid-cols-3">
            {[
              { stat: "100%", text: "диалогов в «Лиде» — с контактом клиента: телефон известен с первого сообщения" },
              { stat: "107", text: "живых диалогов клиентов — проверка «Лида», ноль сбоев после доработок" },
              { stat: "до 40%", text: "замолчавших клиентов возвращаются в диалог в MAX. В «Про» входит, в «Лиде» — опцией" },
            ].map((item) => (
              <div key={item.stat}>
                <dt className="font-display text-3xl font-bold text-accent">{item.stat}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-body">{item.text}</dd>
              </div>
            ))}
          </dl>

          <details id="sravnenie" className="group mt-10 scroll-mt-24 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-display text-base font-bold text-heading transition-colors hover:bg-blue-ice/40 sm:px-6 sm:text-lg [&::-webkit-details-marker]:hidden">
              Полное сравнение версий — таблица
              <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            {/* На узких экранах таблица разворачивается в стек: название функции
                строкой, под ней колонки со значениями версий. */}
            <div className="border-t border-blue-subtle/40">
              <div className="sm:overflow-x-auto">
                <table className={`block w-full text-sm sm:table ${reqVersionPublished ? "sm:min-w-[820px]" : "sm:min-w-[640px]"}`}>
                  <thead className="hidden sm:table-header-group">
                    <tr className="bg-surface-alt">
                      <th className={`${reqVersionPublished ? "w-[31%]" : "w-[40%]"} px-4 py-3.5 text-left font-semibold text-heading sm:px-5`}>
                        Возможность
                      </th>
                      {reqVersionPublished && (
                        <th className="w-[23%] px-4 py-3.5 text-left sm:px-5">
                          <span className="flex items-center gap-2 font-display font-bold text-heading">
                            <ReqIcon className="h-4 w-4 text-accent" />
                            «Заявка»
                          </span>
                          <span className="mt-0.5 block text-xs font-medium text-accent">
                            от 790 ₽/мес
                          </span>
                        </th>
                      )}
                      <th className={`${reqVersionPublished ? "w-[23%]" : "w-[30%]"} px-4 py-3.5 text-left sm:px-5`}>
                        <span className="flex items-center gap-2 font-display font-bold text-heading">
                          <LidIcon className="h-4 w-4 text-accent" />
                          «Лид»
                        </span>
                        <span className="mt-0.5 block text-xs font-medium text-accent">
                          от 990 ₽/мес
                        </span>
                      </th>
                      <th className={`${reqVersionPublished ? "w-[23%]" : "w-[30%]"} px-4 py-3.5 text-left sm:px-5`}>
                        <span className="flex items-center gap-2 font-display font-bold text-heading">
                          <ProIcon className="h-4 w-4 text-accent" />
                          «Про»
                        </span>
                        <span className="mt-0.5 block text-xs font-medium text-accent">
                          от 1 990 ₽/мес
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="block sm:table-row-group">
                    {versionCompareGroups.map((group) => (
                      <Fragment key={group.title}>
                        <tr className="block bg-blue-ice/40 sm:table-row">
                          <td
                            colSpan={reqVersionPublished ? 4 : 3}
                            className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-accent sm:table-cell sm:px-5"
                          >
                            {group.title}
                          </td>
                        </tr>
                        {group.rows.map((row) => (
                          <tr
                            key={row.feature}
                            className={`grid ${reqVersionPublished ? "grid-cols-3 gap-x-2 text-[13px] hyphens-auto sm:text-sm sm:hyphens-manual" : "grid-cols-2 gap-x-3"} border-t border-blue-subtle/30 bg-white px-4 py-3.5 sm:table-row sm:px-0 sm:py-0 sm:align-top sm:hover:bg-blue-ice/15`}
                          >
                            <td className={`${reqVersionPublished ? "col-span-3 text-sm hyphens-manual" : "col-span-2"} block font-medium text-heading sm:table-cell sm:px-5 sm:py-3`}>
                              {row.feature}
                            </td>
                            {reqVersionPublished && (
                              <td className="mt-2 block sm:mt-0 sm:table-cell sm:px-5 sm:py-3">
                                <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-muted sm:hidden">
                                  Заявка
                                </span>
                                <CompareCell value={row.req ?? "—"} />
                              </td>
                            )}
                            <td className="mt-2 block sm:mt-0 sm:table-cell sm:px-5 sm:py-3">
                              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-muted sm:hidden">
                                Лид
                              </span>
                              <CompareCell value={row.lid} />
                            </td>
                            <td className="mt-2 block sm:mt-0 sm:table-cell sm:px-5 sm:py-3">
                              <span className="mb-1 block text-[11px] font-bold uppercase tracking-wide text-muted sm:hidden">
                                Про
                              </span>
                              <CompareCell value={row.pro} />
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="border-t border-blue-subtle/40 px-5 py-4 text-xs leading-relaxed text-muted sm:px-6">
              {versionCompareMaxNote}
            </p>
          </details>

          <div className="mt-6 text-center">
            <Link
              href="/tarify"
              className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              {reqVersionPublished ? "Смотреть тарифы всех версий" : "Смотреть тарифы обеих версий"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="mb-8 text-center font-display text-3xl font-bold text-heading sm:text-4xl">
            Вопросы про версии
          </h2>
          <div className="space-y-4">
            {versiiFaqItems.map((item) => (
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
        </section>

        {/* CTA */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              {reqVersionPublished ? "Попробуйте любую версию бесплатно" : "Попробуйте обе версии бесплатно"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-body sm:text-lg">
              Первый месяц бесплатно на любой версии, подключение — 0 ₽.
            </p>
            <div className="mt-8 flex justify-center">
              <RegisterCta source="versii_cta" compact />
            </div>
          </div>
        </section>
        <OpenDetailsOnHash />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
