import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import RegisterCta from "@/components/seo/RegisterCta";
import {
  pricingPlans,
  crossChannelAddons,
  costAlternatives,
  costPaybackPoints,
  costPaybackFootnote,
  skolkoStoitFaqItems,
  trial,
  reqVersionPublished,
  priceFrom,
  priceFromLabel,
  priceSelectionNote,
} from "@/lib/content";
import { ChevronDown, ChevronRight, Check, ArrowRight } from "lucide-react";
import { IconTile, StatCard, cardClass } from "@/components/ui/Cards";
import { jsonLdScript } from "@/lib/schema";
import { lastModified } from "@/lib/seo/page-dates";
import { aggregateOfferJsonLd, publicPlans } from "@/lib/public-offers";
import { versionIcons } from "@/lib/version-icons";

const siteUrl = "https://navilet.ru";

const ReqIcon = versionIcons.req;
const LidIcon = versionIcons.lid;
const ProIcon = versionIcons.pro;

/** Дата последней проверки цен — показываем на странице и в разметке. */
const priceCheckedAt = "2026-10-15";
const priceCheckedLabel = "15 октября 2026";

/** Цена с неразрывными пробелами: «1 990 ₽» не рвётся по строкам. */
const rub = (value: number) => `${value.toLocaleString("ru-RU")}\u00A0₽`;

// «Сеть» — индивидуально, в таблицах и «до … ₽» её нет.
const reqPlans = publicPlans.flatMap((p) =>
  p.req
    ? [
        {
          name: p.name,
          price: p.req.price,
          dialogs: p.req.dialogs,
          extraDialog: p.req.extraDialog,
          perDialog: p.req.effectivePerDialog,
        },
      ]
    : []
);

const lidPlans = publicPlans.map((p) => ({
  name: p.name,
  price: p.lid.price,
  dialogs: p.lid.dialogs,
  extraDialog: p.lid.extraDialog,
  perDialog: p.lid.effectivePerDialog,
}));

const proPlans = publicPlans.map((p) => ({
  name: p.name,
  price: p.price,
  dialogs: p.dialogs,
  extraDialog: p.extraDialog,
  perDialog: p.effectivePerDialog,
}));

const minLid = Math.min(...lidPlans.map((p) => p.price));
const maxLid = Math.max(...lidPlans.map((p) => p.price));
const minPro = Math.min(...proPlans.map((p) => p.price));
const maxPro = Math.max(...proPlans.map((p) => p.price));
const minReq = Math.min(...reqPlans.map((p) => p.price));
const maxReq = Math.max(...reqPlans.map((p) => p.price));
const maxDialogs = Math.max(...lidPlans.map((p) => p.dialogs));
const planCountWord =
  ({ 3: "три", 4: "четыре" } as Record<number, string>)[publicPlans.length] ??
  String(publicPlans.length);

export const metadata: Metadata = {
  title: {
    absolute:
      `Сколько стоит ИИ для турагентства — от ${priceFromLabel}/мес | Навылет! AI`,
  },
  description:
    `Сколько стоит ИИ-ассистент для турагентства: от ${priceFromLabel}/мес${priceSelectionNote}. Сравнение с ботом на заказ и наймом менеджера, расчёт окупаемости.`,
  keywords: [
    "сколько стоит ИИ для турагентства",
    "сколько стоит чат-бот для турагентства",
    "ИИ-ассистент для турагентства цена",
    "чат-бот для турагентства цена",
    "стоимость автоматизации турагентства",
    "недорогой чат-бот для турагентства",
    "ИИ-ассистент от 990 рублей",
    "окупаемость ИИ в турагентстве",
  ],
  alternates: { canonical: "/skolko-stoit" },
  openGraph: {
    title:
      `Сколько стоит ИИ-ассистент для турагентства — от ${priceFromLabel}/мес`,
    description:
      `Полный разбор стоимости: тарифы ${reqVersionPublished ? "всех" : "обеих"} версий, цена диалога, сравнение с разработкой бота и наймом менеджера, расчёт окупаемости. Подключение 0 ₽, первый месяц бесплатно.`,
    url: `${siteUrl}/skolko-stoit`,
    type: "article",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Сколько стоит ИИ-ассистент для турагентства — от ${priceFromLabel}/мес`,
    description:
      `Тарифы ${reqVersionPublished ? "всех" : "обеих"} версий, цена за диалог, сравнение с альтернативами и расчёт окупаемости. Первый месяц бесплатно.`,
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/skolko-stoit#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Сколько стоит",
          item: `${siteUrl}/skolko-stoit`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/skolko-stoit#webpage`,
      url: `${siteUrl}/skolko-stoit`,
      name: "Сколько стоит ИИ-ассистент для турагентства",
      description:
        `Стоимость ИИ-ассистента для турагентства: тарифы версий ${reqVersionPublished ? "«Заявка», «Лид» и «Про»" : "«Лид» и «Про»"}, цена за диалог, сравнение с разработкой бота и наймом менеджера, расчёт окупаемости.`,
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/skolko-stoit#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
      datePublished: "2026-08-13",
      dateModified: lastModified("/skolko-stoit", priceCheckedAt),
    },
    {
      // AggregateOffer с lowPrice даёт Яндексу сниппет «от 990 ₽»
      // и отвечает LLM на вопрос «сколько стоит» одной строкой.
      "@type": "Product",
      "@id": `${siteUrl}/skolko-stoit#product`,
      name: "ИИ-ассистент «Навылет! AI» для турагентств",
      description:
        `Подписка на ИИ-ассистента для турагентства: подбор туров по базе Tourvisor, живой диалог на сайте и в MAX, готовая заявка менеджеру. ${reqVersionPublished ? "Три версии — «Заявка», «Лид» и «Про»." : "Две версии — «Лид» и «Про»."}`,
      brand: { "@id": `${siteUrl}/#organization` },
      category: "Программное обеспечение для турагентств",
      url: `${siteUrl}/skolko-stoit`,
      offers: aggregateOfferJsonLd(),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/skolko-stoit#faq`,
      mainEntity: skolkoStoitFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

const included = [
  "Виджет в вашем фирменном стиле: логотип, цвет, название агентства",
  "Интеграция с базой туров Tourvisor — 50+ стран и 500+ курортов",
  "База знаний агентства — ведёте сами в кабинете: условия, рассрочка, ответы и документы",
  "Передача заявок на почту, в U‑ON, Telegram и MAX",
  "Личный кабинет: диалоги, заявки, аналитика, подборки",
  "Обновления продукта и поддержка — без отдельной оплаты",
];

/** Таблица тарифов одной версии. На телефоне разворачивается в стек. */
function PlanTable({
  plans,
  versionName,
  accentIcon,
}: {
  plans: typeof lidPlans;
  versionName: string;
  accentIcon: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-blue-subtle/50">
      <div className="flex items-center gap-2 bg-surface-alt px-4 py-3 sm:px-5">
        {accentIcon}
        <span className="font-display text-base font-bold text-heading">
          Версия «{versionName}»
        </span>
      </div>
      <div className="sm:overflow-x-auto">
        <table className="block w-full text-sm sm:table sm:min-w-[560px]">
          <thead className="hidden sm:table-header-group">
            <tr className="bg-blue-ice/40">
              <th className="px-4 py-3 text-left font-semibold text-heading sm:px-5">
                Тариф
              </th>
              <th className="px-4 py-3 text-left font-semibold text-heading sm:px-5">
                Цена в месяц
              </th>
              <th className="px-4 py-3 text-left font-semibold text-heading sm:px-5">
                Диалогов
              </th>
              <th className="px-4 py-3 text-left font-semibold text-heading sm:px-5">
                Цена диалога
              </th>
              <th className="px-4 py-3 text-left font-semibold text-heading sm:px-5">
                Сверх лимита
              </th>
            </tr>
          </thead>
          <tbody className="block sm:table-row-group">
            {plans.map((p) => (
              // На телефоне — две строки: «тариф … цена», ниже мелко диалоги, цена диалога и сверхлимит.
              // Ширины первой строки в сумме 100%, поэтому остальные ячейки уходят на вторую.
              <tr
                key={p.name}
                className="flex flex-wrap items-baseline border-t border-blue-subtle/30 bg-white px-4 py-3 sm:table-row sm:px-0 sm:py-0"
              >
                <td className="w-[calc(100%-7.5rem)] font-semibold text-heading sm:table-cell sm:w-auto sm:px-5 sm:py-3 sm:font-medium">
                  {p.name}
                </td>
                <td className="w-[7.5rem] text-right sm:table-cell sm:w-auto sm:px-5 sm:py-3 sm:text-left">
                  <span className="font-semibold text-accent">{rub(p.price)}</span>
                  <span className="text-xs text-muted sm:hidden">/мес</span>
                </td>
                <td className="mr-3 mt-0.5 text-xs text-muted sm:table-cell sm:mr-0 sm:mt-0 sm:px-5 sm:py-3 sm:text-sm sm:text-body">
                  {p.dialogs}
                  <span className="sm:hidden"> диалогов</span>
                </td>
                <td className="mr-3 mt-0.5 text-xs text-muted sm:table-cell sm:mr-0 sm:mt-0 sm:px-5 sm:py-3 sm:text-sm sm:text-body">
                  ≈ {rub(p.perDialog)}
                  <span className="sm:hidden"> за диалог</span>
                </td>
                <td className="mt-0.5 text-xs text-muted sm:table-cell sm:mt-0 sm:px-5 sm:py-3 sm:text-sm sm:text-body">
                  <span className="sm:hidden">сверх лимита </span>
                  {rub(p.extraDialog)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SkolkoStoitPage() {
  const liteLid = pricingPlans[0].lid;
  const liteAddonLid = crossChannelAddons[0].lid;
  const liteAddonReq = crossChannelAddons[0].req;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
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
              Сколько стоит
            </li>
          </ol>
        </nav>

        {/* Ответ первым экраном: короткий факт, который можно процитировать */}
        <section className="mx-auto max-w-4xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Сколько стоит <span className="whitespace-nowrap">ИИ-ассистент</span> для
            турагентства
          </h1>
          <p className="mt-3 text-sm text-muted">Цены проверены {priceCheckedLabel}</p>

          <div className={`${cardClass} mt-6 p-5 sm:p-7`}>
            <p className="text-lg font-semibold leading-relaxed text-heading sm:text-xl">
              От {rub(priceFrom)} в месяц.
            </p>
            <p className="mt-3 text-base leading-relaxed text-body sm:text-lg">
              {reqVersionPublished ? (
                <>
                  За эти деньги агентство получает ассистента, который
                  круглосуточно ведёт живой диалог на сайте или в MAX, собирает
                  запрос — куда, когда, кто едет, бюджет — и контакт клиента, а тур подбирает ваш менеджер. С подбором туров по реальной базе
                  с ценами и наличием — версия «Лид», от {rub(minLid)} в месяц.
                </>
              ) : (
                <>
                  За эти деньги агентство получает ассистента, который
                  круглосуточно ведёт живой диалог на сайте или в MAX, подбирает
                  туры по реальной базе с ценами и наличием и передаёт менеджеру
                  готовую заявку с контактом клиента.
                </>
              )} Подключение — 0 ₽, первый месяц бесплатно.
              Дальше цена зависит только от числа диалогов: на старших
              тарифах — {maxDialogs} диалогов в месяц. Для сетей — тариф «Сеть»,
              условия индивидуальные.
            </p>
          </div>

          <dl className="mt-4 grid grid-cols-3 gap-2 sm:gap-4">
            {[
              {
                value: rub(priceFrom),
                label: "цена входа в месяц",
                note: reqVersionPublished
                  ? "версия «Заявка», 40 диалогов"
                  : "версия «Лид», 40 диалогов",
              },
              {
                value: "0 ₽",
                label: "подключение и настройка",
                note: "на всех тарифах, без договора на внедрение",
              },
              {
                value: `${trial.days} дней`,
                label: "бесплатно на старте",
                note: `${trial.fromLabel}, ${trial.capLabel}`,
              },
            ].map((item) => (
              <StatCard key={item.label} value={item.value} label={item.label} compact>
                {item.note}
              </StatCard>
            ))}
          </dl>

          <RegisterCta source="skolko_stoit_hero" compact className="mt-8 sm:items-start" />
        </section>

        {/* Тарифы обеих версий */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              {reqVersionPublished
                ? `Сколько стоят тарифы: три версии, по ${planCountWord} тарифа в каждой`
                : `Сколько стоят тарифы: две версии, по ${planCountWord} тарифа в каждой`}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-body">
              Ассистент выпускается в {reqVersionPublished ? "трёх" : "двух"}{" "}
              версиях.{" "}
              {reqVersionPublished && (
                <>
                  «Заявка» собирает запрос и контакт клиента, а тур подбирает
                  ваш менеджер, — от {rub(minReq)} до {rub(maxReq)} в месяц.{" "}
                </>
              )}
              <Link
                href="/versii"
                className="font-semibold text-accent hover:text-accent-hover"
              >
                «Лид»
              </Link>{" "}
              сам подбирает туры и передаёт готовую заявку менеджеру — от{"\u00A0"}
              {rub(minLid)} до{"\u00A0"}
              {rub(maxLid)} в месяц. «Про» сам консультирует клиента, проверяет
              цены в диалоге и возвращает ушедших — от {rub(minPro)} до{"\u00A0"}
              {rub(maxPro)} в месяц. Внутри версии цена растёт только вместе с числом диалогов: чем больше пакет, тем дешевле один диалог. Для сетей с центральным сайтом и многими офисами — тариф «Сеть»:
              объём и цена считаются индивидуально.
            </p>

            <div className="mt-9 space-y-6">
              {reqVersionPublished && (
                <PlanTable
                  plans={reqPlans}
                  versionName="Заявка"
                  accentIcon={<ReqIcon className="h-4 w-4 text-accent" />}
                />
              )}
              <PlanTable
                plans={lidPlans}
                versionName="Лид"
                accentIcon={<LidIcon className="h-4 w-4 text-accent" />}
              />
              <PlanTable
                plans={proPlans}
                versionName="Про"
                accentIcon={<ProIcon className="h-4 w-4 text-accent" />}
              />
            </div>

            <div className="mt-8 border-t border-blue-subtle/50 pt-6">
              <h3 className="font-display text-lg font-bold text-heading">
                Сколько стоит работать сразу на сайте и в MAX
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-body sm:text-base">
                Базовый тариф работает в одном канале на выбор. Второй канал —
                надстройка с льготным лимитом диалогов: доплата от{"\u00A0"}
                {reqVersionPublished && liteAddonReq && (
                  <>
                    {rub(liteAddonReq.addonPrice)} в месяц в версии «Заявка»,
                    от{"\u00A0"}
                  </>
                )}
                {rub(liteAddonLid.addonPrice)} в месяц в версии «Лид» и от{"\u00A0"}
                {rub(crossChannelAddons[0].addonPrice)} в версии «Про».
                Например, Лайт «Лид» с двумя каналами — это{" "}
                {rub(liteAddonLid.totalPrice)} в месяц и{"\u00A0"}
                {liteAddonLid.totalDialogs} диалогов вместо {liteLid.dialogs}.
              </p>
              <Link
                href="/tarify"
                className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                Полные тарифы со всеми условиями
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Сравнение с альтернативами */}
        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Почему 990 ₽ с подбором туров — это мало для такой задачи
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-body">
            Сравнивать подписку честно нужно не с ценой, а с задачей: клиент
            пишет ночью «хочу в Турцию на неделю, бюджет 200 тысяч» — и должен
            получить конкретные варианты с ценами, а агентство — заявку с контактом. Такую задачу решает «Лид» — версия с подбором туров{reqVersionPublished ? <>; «Заявка» за {rub(minReq)} туры не подбирает, их подбирает ваш менеджер</> : null}. Вот сколько стоят другие способы закрыть эту задачу — нажмите на строку, чтобы увидеть, чего каждому не хватает.
          </p>

          <ul className="mt-9 divide-y divide-blue-subtle/50 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
            {costAlternatives.map((alt) => (
              <li key={alt.title} className={alt.highlight ? "bg-accent/5" : ""}>
                <details className="group">
                  {/* Заголовок — прямой потомок <summary>, раскладка сеткой: на телефоне цена под названием, на ПК справа */}
                  <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-x-3 px-5 py-4 transition-colors hover:bg-blue-ice/40 sm:grid-cols-[1fr_auto_auto] sm:gap-x-4 sm:px-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="col-start-1 row-start-1 font-display text-base font-bold text-heading sm:text-lg">{alt.title}</h3>
                    <span className="col-start-1 row-start-2 mt-0.5 font-display text-base font-bold text-accent sm:col-start-2 sm:row-start-1 sm:mt-0 sm:text-lg">
                      {alt.price}
                    </span>
                    <span className="col-start-1 row-start-3 mt-0.5 text-xs text-muted sm:row-start-2">{alt.priceNote}</span>
                    <ChevronDown
                      className="col-start-2 row-span-3 row-start-1 h-5 w-5 text-muted transition-transform group-open:rotate-180 sm:col-start-3 sm:row-span-2"
                      aria-hidden
                    />
                  </summary>
                  <p className="px-5 pb-4 text-sm leading-relaxed text-body sm:px-6">{alt.limits}</p>
                </details>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-relaxed text-muted">
            Цены альтернатив — рыночные оценки по открытым прайсам и публичным
            расценкам студий на август 2026 года. Здесь мы называем категории
            решений, а не бренды. Подробная таблица с конкретными сервисами,
            модулем поиска Tourvisor и ссылками на их прайсы —{" "}
            <Link
              href="/sravnenie"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
            >
              на странице сравнения
            </Link>
            .
          </p>
        </section>

        {/* Что входит */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Что уже входит в подписку и не требует доплат
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">
              В подписке нет скрытых частей: разовых платежей за внедрение,
              оплаты за интеграцию с агрегатором и отдельного счёта за расходы
              на ИИ-модель не существует.
            </p>
            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {included.map((item) => (
                <li key={item} className={`${cardClass} flex items-start gap-3 p-4 text-sm leading-relaxed text-body`}>
                  <IconTile icon={Check} size="sm" />
                  <span className="pt-1">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Окупаемость */}
        <section className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Когда подписка окупается
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-body">
            Подписка на ассистента — это не расход на инструмент, а цена лида.
            Поэтому считать окупаемость проще всего так: сколько стоил один
            квалифицированный лид и что приносит одна бронь. Считаем на данных сети партнёров.
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            {costPaybackPoints.map((item) => (
              <StatCard key={item.label} value={item.stat} label={item.label}>
                {item.text}
              </StatCard>
            ))}
          </dl>

          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted">
            {costPaybackFootnote}
          </p>
        </section>

        {/* От чего зависит цена */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              От чего зависит итоговая цена
            </h2>
            <div className={`${cardClass} mt-8 divide-y divide-blue-subtle/50 px-5 sm:px-6`}>
              {[
                {
                  title: "Число диалогов в месяц",
                  text: "Единственный счётчик в подписке. Диалог — это обращение одного посетителя сайта или пользователя MAX к ассистенту, а не сообщение: сколько бы реплик человек ни написал, считается один диалог. Начинать разумно с тарифа под текущий трафик сайта: пересчитать пакет можно в любой момент.",
                },
                {
                  title: "Версия ассистента",
                  text: `${reqVersionPublished ? "«Заявка» — самая доступная: ассистент собирает запрос и контакт, а тур подбирает ваш менеджер, поэтому подбора туров и подборок в ней нет. " : ""}«Лид» дешевле «Про», потому что решает более узкую задачу: подобрать туры, довести человека до заявки и передать её менеджеру. «Про» стоит дороже, потому что консультирует без ограничений, проверяет цены в диалоге и возвращает клиентов в MAX.`,
                },
                {
                  title: "Количество каналов",
                  text: "Сайт и MAX‑мессенджер считаются отдельными каналами. Один канал уже включён в тариф, второй подключается надстройкой с дополнительным лимитом диалогов по льготной цене.",
                },
                {
                  title: "Диалоги сверх лимита",
                  text: `Если поток вырос, ассистент не отключается: сверхлимитные диалоги считаются по фиксированной цене — от\u00A0${rub(pricingPlans[0].lid.extraDialog)} на тарифе Лайт до ${rub(publicPlans[publicPlans.length - 1].lid.extraDialog)} на тарифе «${publicPlans[publicPlans.length - 1].name}» в версии «Лид».`,
                },
              ].map((item) => (
                <details key={item.title} className="group">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 py-3 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-lg font-bold text-heading">{item.title}</h3>
                    <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-body sm:text-base">{item.text}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="mb-8 font-display text-3xl font-bold text-heading sm:text-4xl">
            Частые вопросы про стоимость
          </h2>
          <div className="space-y-4">
            {skolkoStoitFaqItems.map((item) => (
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

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/tarify"
              className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              Все тарифы и условия
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/versii"
              className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              {reqVersionPublished ? "Сравнение версий «Заявка», «Лид» и «Про»" : "Сравнение версий «Лид» и «Про»"}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/voprosy"
              className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              Другие вопросы про ИИ в турагентстве
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Проверьте цену на своих клиентах
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-body sm:text-lg">
              Первый месяц ничего не стоит — {trial.capLabel}. А после теста в личном
              кабинете уже видно, сколько диалогов у вас реально бывает — и какой
              тариф нужен. Дальше от {rub(priceFrom)} в месяц.
            </p>
            <div className="mt-8 flex justify-center">
              <RegisterCta source="skolko_stoit_cta" compact />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
