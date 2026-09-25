import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import RegisterCta from "@/components/seo/RegisterCta";
import {
  demandIndex as d,
  fmtPct,
  fmtPp,
  fmtRub,
  fmtRubK,
  fmtRubShort,
  fmtDays,
} from "@/lib/seo/demand-index";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";
const path = "/indeks-sprosa";
const o = d.overall;
const top = d.countries.slice(0, 5);
const eg = d.countries.find((c) => c.name === "Египет")!;
const monthCountries = ["Турция", "Египет", "Вьетнам", "Россия", "Таиланд"] as const;
const firstMonth = d.bySearchMonth[0];
const lastMonth = d.bySearchMonth[d.bySearchMonth.length - 1];
const nov = d.byDepartureMonth.find((m) => m.month === "Ноябрь")!;

const title = `Индекс спроса на туры — ${d.edition.toLowerCase()}: куда хотят туристы`;
const description = `Доли направлений в поисках туров, тренды, бюджеты и глубина бронирования по данным диалогов туристов с ИИ-ассистентами турагентств. Выпуск «${d.edition}».`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "индекс спроса на туры",
    "спрос на туры статистика 2026",
    "куда едут туристы осенью 2026",
    "популярные направления туризм 2026",
    "спрос на египет",
    "бюджет туриста на тур",
    "глубина бронирования туров",
  ],
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: `${siteUrl}${path}`,
    type: "article",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

const faq = [
  {
    question: "Какое направление самое популярное у туристов осенью 2026 года?",
    answer: `Турция: ${fmtPct(top[0].sharePct)} поисков тура за период ${d.periodLabel}. Но Египет быстро догоняет: в сентябре на него пришлось ${lastMonth.shares["Египет"]}% поисков против ${lastMonth.shares["Турция"]}% у Турции, а среди туров с вылетом в ноябре Египет — лидер с ${nov.top[0].pct}%.`,
  },
  {
    question: "Сколько туристы готовы тратить на тур?",
    answer: `Медианный бюджет, который турист сам называет при подборе, — ${fmtRubShort(o.budgetMedian)} за тур. У половины туристов бюджет от ${fmtRubK(o.budgetP25)} до ${fmtRubK(o.budgetP75)}. Самый высокий бюджет — на Мальдивы, самый низкий — на отдых в России и Абхазии.`,
  },
  {
    question: "За сколько до поездки туристы ищут тур?",
    answer: `В среднем за ${fmtDays(o.horizonDays)} до вылета. ${o.soonPct}% туристов ищут вылет в ближайшие две недели, ${o.farPct}% — больше чем через два месяца. Быстрее всех решают по России и Турции, дольше всех планируют Таиланд и Шри-Ланку.`,
  },
  {
    question: "Откуда эти данные?",
    answer:
      "Из обезличенных диалогов туристов с ИИ-ассистентами турагентств — клиентов «Навылет! AI»: на сайтах агентств и в мессенджерах. Учитывается последний, самый уточнённый поиск тура в каждом диалоге. Индекс обновляется раз в месяц.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}${path}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Индекс спроса на туры",
          item: `${siteUrl}${path}`,
        },
      ],
    },
    {
      "@type": "Article",
      "@id": `${siteUrl}${path}#article`,
      headline: `Индекс спроса на туры — ${d.edition.toLowerCase()}`,
      description,
      inLanguage: "ru-RU",
      datePublished: d.published,
      dateModified: d.published,
      author: { "@id": `${siteUrl}/#organization` },
      publisher: { "@id": `${siteUrl}/#organization` },
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntityOfPage: `${siteUrl}${path}`,
      image: `${siteUrl}/og-image.png`,
      about: { "@id": `${siteUrl}${path}#dataset` },
    },
    {
      "@type": "Dataset",
      "@id": `${siteUrl}${path}#dataset`,
      name: "Индекс спроса на туры «Навылет! AI»",
      description:
        "Обезличенная статистика поисков туров в диалогах туристов с ИИ-ассистентами турагентств: доли направлений, тренды, медианный бюджет, состав группы, длительность, глубина бронирования. Обновляется ежемесячно.",
      url: `${siteUrl}${path}`,
      inLanguage: "ru-RU",
      creator: { "@id": `${siteUrl}/#organization` },
      temporalCoverage: `${d.periodFrom}/${d.periodTo}`,
      spatialCoverage: "Россия",
      dateModified: d.published,
      measurementTechnique:
        "Последний поиск тура в каждом диалоге; параметры, которые подставляет ассистент по умолчанию, исключены",
      variableMeasured: [
        ...d.countries.map((c) => ({
          "@type": "PropertyValue",
          name: `Доля в поисках туров: ${c.name}`,
          value: fmtPct(c.sharePct),
        })),
        {
          "@type": "PropertyValue",
          name: "Медианный бюджет туриста за тур",
          value: fmtRub(o.budgetMedian),
        },
        {
          "@type": "PropertyValue",
          name: "Доля запросов с детьми",
          value: `${o.kidsPct}%`,
        },
        {
          "@type": "PropertyValue",
          name: "Медиана дней от запроса до вылета",
          value: o.horizonDays,
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}${path}#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

const card =
  "rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card sm:p-6";
const h2 = "font-display text-2xl font-bold text-heading sm:text-3xl";

function Trend({ v }: { v: number }) {
  const Icon = v > 0 ? TrendingUp : v < 0 ? TrendingDown : Minus;
  const color =
    v > 0 ? "text-emerald-600" : v < 0 ? "text-amber-600" : "text-muted";
  return (
    <span className={`inline-flex items-center gap-0.5 font-semibold ${color}`}>
      <Icon className="h-3.5 w-3.5" />
      {fmtPp(v)}
    </span>
  );
}

export default function DemandIndexPage() {
  const maxShare = Math.max(...d.countries.map((c) => c.sharePct));

  const findings = [
    {
      title: "Египет догоняет Турцию",
      text: `Доля Египта в поисках растёт каждый месяц: ${firstMonth.shares["Египет"]}% в июне, ${lastMonth.shares["Египет"]}% в сентябре (${fmtPp(eg.trendPp)}). Турция — ${lastMonth.shares["Турция"]}%.`,
    },
    {
      title: `На ноябрь — ${nov.top[0].pct}% Египта`,
      text: `Среди туров с вылетом в ноябре Египет почти вчетверо обгоняет Турцию. На декабрь в тройке — Египет, Таиланд и Вьетнам.`,
    },
    {
      title: `Бюджет — ${fmtRubK(o.budgetMedian)}`,
      text: `Медиана за тур, которую называет сам турист. Бюджет указывают в ${o.budgetStatedPct}% диалогов — ассистент сразу фильтрует выдачу.`,
    },
    {
      title: `Каждый третий — «на ближайшие две недели»`,
      text: `${o.soonPct}% ищут вылет в ближайшие 14 дней, в среднем тур ищут за ${fmtDays(o.horizonDays)} до вылета. Кто ответил первым, тот и продал.`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Navigation />
      <main>
        {/* Hero + капсула ответа */}
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
          <div className="relative mx-auto max-w-3xl px-5 pt-28 pb-10 sm:px-6 sm:pt-32 lg:px-8">
            <nav
              className="mb-5 flex text-xs text-muted"
              aria-label="Хлебные крошки"
            >
              <Link href="/" className="hover:text-accent">
                Главная
              </Link>
              <ChevronRight className="mx-1 h-4 w-4" />
              <span className="text-body">Индекс спроса на туры</span>
            </nav>
            <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
              Индекс спроса на туры:{" "}
              <span className="text-accent">{d.edition.toLowerCase()}</span>
            </h1>
            <p className="mt-6 rounded-2xl border border-accent/15 bg-blue-ice/40 p-5 text-base leading-relaxed text-body sm:text-lg">
              Турция остаётся лидером спроса — {fmtPct(top[0].sharePct)} поисков
              тура, но Египет быстро догоняет: {lastMonth.shares["Египет"]}% в
              сентябре против {firstMonth.shares["Египет"]}% в июне, а на ноябрь
              он уже лидер. Медианный бюджет — {fmtRubShort(o.budgetMedian)} за
              тур, {o.kidsPct}% запросов — с детьми, тур ищут в среднем за{" "}
              {fmtDays(o.horizonDays)} до вылета.
            </p>
            <p className="mt-4 text-sm text-muted">
              Выпуск «{d.edition}» · {d.periodLabel} · обновляется раз в месяц ·{" "}
              <a href="#metodika" className="underline hover:text-accent">
                методика
              </a>
            </p>
          </div>
        </section>

        {/* Главное */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className={h2}>Главное в выпуске</h2>
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {findings.map((f) => (
                <div key={f.title} className={card}>
                  <h3 className="font-display text-lg font-bold text-heading">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Рейтинг направлений */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className={h2}>Куда хотят туристы: доли направлений</h2>
            <p className="mt-3 text-sm text-muted">
              Доля направления в поисках туров за {d.periodLabel} · тренд:{" "}
              {d.trendLabel}
            </p>
            <div className={`${card} mt-6 space-y-3`}>
              {d.countries.map((c) => {
                const slug = "slug" in c ? c.slug : undefined;
                const row = (
                  <>
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`text-sm font-semibold text-heading ${slug ? "transition-colors group-hover:text-accent" : ""}`}
                      >
                        {c.name}
                      </span>
                      <span className="flex items-center gap-3 text-sm">
                        <Trend v={c.trendPp} />
                        <span className="w-12 text-right font-bold text-heading">
                          {fmtPct(c.sharePct)}
                        </span>
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-blue-ice">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#0062EF] to-[#00CCF5]"
                        style={{ width: `${(c.sharePct / maxShare) * 100}%` }}
                      />
                    </div>
                  </>
                );
                return slug ? (
                  <Link key={c.name} href={`/spros/${slug}`} className="group block">
                    {row}
                  </Link>
                ) : (
                  <div key={c.name}>{row}</div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Динамика по месяцам */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className={h2}>Как менялся спрос по месяцам</h2>
            <p className="mt-3 text-base leading-relaxed text-body">
              Доля направления среди поисков, сделанных в этом месяце. Египет —
              единственное крупное направление, которое росло каждый месяц.
            </p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-blue-subtle/40 bg-white shadow-card">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-blue-subtle/40 text-left text-[11px] uppercase tracking-wide text-muted sm:text-xs">
                    <th className="px-2.5 py-3 sm:px-4 font-semibold">Страна</th>
                    {d.bySearchMonth.map((m) => (
                      <th key={m.month} className="px-2.5 py-3 sm:px-4 text-right font-semibold">
                        <span className="sm:hidden">{m.month.slice(0, 3)}</span>
                        <span className="hidden sm:inline">{m.month}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {monthCountries.map((name) => (
                    <tr
                      key={name}
                      className={`border-b border-blue-subtle/20 last:border-0 ${name === "Египет" ? "bg-blue-ice/40" : ""}`}
                    >
                      <td className="px-2.5 py-3 sm:px-4 font-semibold text-heading">{name}</td>
                      {d.bySearchMonth.map((m) => (
                        <td key={m.month} className="px-2.5 py-3 sm:px-4 text-right text-body">
                          {m.shares[name]}%
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Куда полетят */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className={h2}>Куда полетят: спрос по месяцу вылета</h2>
            <p className="mt-3 text-base leading-relaxed text-body">
              Три самых востребованных направления среди туров с вылетом в
              этом месяце. Более поздние месяцы появятся в следующих выпусках,
              когда по ним наберётся достаточно поисков.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {d.byDepartureMonth.map((m) => (
                <div key={m.month} className={card}>
                  <h3 className="font-display text-lg font-bold text-heading">
                    {m.month}
                  </h3>
                  <ol className="mt-3 space-y-2 text-sm">
                    {m.top.map((c, i) => (
                      <li key={c.name} className="flex justify-between gap-2">
                        <span className="text-body">
                          {i + 1}. {c.name}
                        </span>
                        <span className="font-bold text-heading">{c.pct}%</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Портрет запроса */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className={h2}>Портрет запроса: что указывает турист</h2>
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className={card}>
                <h3 className="font-display text-base font-bold text-heading">
                  Бюджет
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Медиана — <strong>{fmtRub(o.budgetMedian)}</strong> за тур.
                  У половины туристов бюджет от {fmtRub(o.budgetP25)} до{" "}
                  {fmtRub(o.budgetP75)}. Бюджет называют сами в{" "}
                  {o.budgetStatedPct}% диалогов.
                </p>
              </div>
              <div className={card}>
                <h3 className="font-display text-base font-bold text-heading">
                  Кто едет
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  <strong>{o.kidsPct}%</strong> запросов — с детьми,{" "}
                  {o.twoAdultsPct}% — двое взрослых без детей, {o.soloPct}% —
                  в одиночку.
                </p>
              </div>
              <div className={card}>
                <h3 className="font-display text-base font-bold text-heading">
                  Сколько ночей
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Чаще всего — <strong>{o.nightsTop[0].nights} ночей</strong> (
                  {o.nightsTop[0].pct}% запросов), дальше{" "}
                  {o.nightsTop[1].nights} ({o.nightsTop[1].pct}%) и{" "}
                  {o.nightsTop[2].nights} ({o.nightsTop[2].pct}%). По Вьетнаму
                  и Таиланду медиана — 9 ночей.
                </p>
              </div>
              <div className={card}>
                <h3 className="font-display text-base font-bold text-heading">
                  Питание
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  <strong>{o.allInclusivePct}%</strong> туристов сами просят
                  «всё включено». По Турции и Египту — больше половины.
                </p>
              </div>
              <div className={`${card} sm:col-span-2`}>
                <h3 className="font-display text-base font-bold text-heading">
                  Когда ищут
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  В среднем за <strong>{fmtDays(o.horizonDays)}</strong> до вылета.{" "}
                  {o.soonPct}% ищут вылет в ближайшие 14 дней, {o.farPct}% —
                  больше чем через два месяца. Про перелёт, рейсы и пересадки
                  спрашивают в {o.flightQuestionsPct}% диалогов — в зависимости
                  от направления.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* По направлениям */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className={h2}>Сравнение направлений</h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-blue-subtle/40 bg-white shadow-card">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-blue-subtle/40 text-left text-[11px] uppercase tracking-wide text-muted sm:text-xs">
                    <th className="px-2.5 py-3 sm:px-4 font-semibold">Страна</th>
                    <th className="px-2.5 py-3 sm:px-4 text-right font-semibold">Бюджет</th>
                    <th className="px-2.5 py-3 sm:px-4 text-right font-semibold">Дети</th>
                    <th className="px-2.5 py-3 sm:px-4 text-right font-semibold">Ночей</th>
                    <th className="px-2.5 py-3 sm:px-4 text-right font-semibold">
                      До вылета, дн.
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {d.countries
                    .filter((c) => c.budgetMedian)
                    .map((c) => (
                      <tr
                        key={c.name}
                        className="border-b border-blue-subtle/20 last:border-0"
                      >
                        <td className="px-2.5 py-3 sm:px-4 font-semibold text-heading">
                          {"slug" in c && c.slug ? (
                            <Link href={`/spros/${c.slug}`} className="hover:text-accent">
                              {c.name}
                            </Link>
                          ) : (
                            c.name
                          )}
                        </td>
                        <td className="whitespace-nowrap px-2.5 py-3 sm:px-4 text-right text-body">
                          {fmtRubK(c.budgetMedian!)}
                        </td>
                        <td className="px-2.5 py-3 sm:px-4 text-right text-body">{c.kidsPct}%</td>
                        <td className="px-2.5 py-3 sm:px-4 text-right text-body">{c.nights}</td>
                        <td className="px-2.5 py-3 sm:px-4 text-right text-body">
                          {Math.round(c.horizonDays)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted">
              Медианы. Бюджет — за тур, как его называет турист. Направления,
              где данных для медианы пока мало, в таблицу не включены.
            </p>
          </div>
        </section>

        {/* Что это значит для агентства */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className={h2}>Что это значит для турагентства</h2>
            <div className="mt-6 space-y-4">
              <p className="rounded-2xl border-l-4 border-accent bg-white p-5 text-sm leading-relaxed text-body shadow-card sm:text-base">
                <strong>Перестройте витрину на Египет и зимнюю экзотику.</strong>{" "}
                Тур ищут в среднем за месяц до вылета: осенние запросы — это
                вылеты в октябре–декабре, а на ноябрь и декабрь лидируют Египет,
                Таиланд и Вьетнам.
              </p>
              <p className="rounded-2xl border-l-4 border-accent bg-white p-5 text-sm leading-relaxed text-body shadow-card sm:text-base">
                <strong>Отвечайте быстро.</strong> Каждый третий турист ищет
                вылет в ближайшие две недели — он выберет того, кто ответил
                первым. Особенно вечером и в выходные:{" "}
                <Link
                  href="/resheniya/nochnye-zayavki"
                  className="font-semibold text-accent hover:underline"
                >
                  что делать с ночными заявками
                </Link>
                .
              </p>
              <p className="rounded-2xl border-l-4 border-accent bg-white p-5 text-sm leading-relaxed text-body shadow-card sm:text-base">
                <strong>Не заставляйте заполнять форму.</strong> Турист пишет
                бюджет, состав и питание одним сообщением. ИИ-ассистент
                разбирает такой запрос сам и сразу показывает туры — менеджер
                получает готовую заявку.
              </p>
            </div>
            <div className="mt-8">
              <RegisterCta source="indeks_sprosa_mid" />
            </div>
          </div>
        </section>

        {/* Методика */}
        <section id="metodika" className="scroll-mt-24 bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className={h2}>Методика</h2>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-body sm:text-base">
              <li>
                <strong>Источник.</strong> Обезличенные диалоги туристов с
                ИИ-ассистентами турагентств — клиентов «Навылет! AI» на сайтах
                и в мессенджерах. Демо-ассистенты на navilet.ru не учитываются.
              </li>
              <li>
                <strong>Единица счёта.</strong> Диалог с подбором тура. Берётся
                последний поиск в диалоге — самый уточнённый запрос туриста.
              </li>
              <li>
                <strong>Период.</strong> {d.periodLabel}. Тренд — {d.trendLabel},
                в процентных пунктах.
              </li>
              <li>
                <strong>Проверка параметров.</strong> Учитываем только то, что
                турист называет сам: бюджет, дети и длительность поездки
                подтверждаются текстом его сообщений в 77–98% диалогов.
                Звёздность отеля ассистент часто подставляет по умолчанию,
                поэтому её в индексе нет.
              </li>
              <li>
                <strong>Ограничения.</strong> Это не весь рынок, а запросы в
                ассистенты агентств-клиентов; большинство — с вылетом из Москвы.
                Абсолютные объёмы и данные отдельных компаний не публикуются.
              </li>
              <li>
                <strong>Как ссылаться.</strong> «Индекс спроса «Навылет! AI»,{" "}
                {d.edition.toLowerCase()}, navilet.ru/indeks-sprosa».
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className={h2}>Частые вопросы</h2>
            <div className="mt-6 space-y-4">
              {faq.map((item) => (
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
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link
                href="/spros"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Разборы по направлениям <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/prognozy"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Барометр спроса по вашим диалогам в личном кабинете{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #001229 0%, #002152 30%, #0062EF 70%, #0097F5 100%)",
          }}
        >
          <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
          <div className="relative mx-auto max-w-3xl px-5 py-14 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Этот спрос уже приходит на сайты агентств
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              ИИ-ассистент отвечает туристам на сайте и в мессенджерах 24/7 и
              передаёт менеджеру готовые заявки. Регистрация за 2 минуты.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source="indeks_sprosa_bottom" compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
