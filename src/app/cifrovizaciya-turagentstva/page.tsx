import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import LostLeadsCalculator from "@/components/seo/LostLeadsCalculator";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import RegisterCta from "@/components/seo/RegisterCta";
import {
  digitalBlocks,
  roadmapSteps,
  readinessChecklist,
  glossary,
  commonMistakes,
  pillarFaq,
  pillarSources,
  pricesCheckedAt,
} from "@/lib/seo/digital-pillar";
import { networkResults } from "@/lib/content";
import {
  ChevronRight,
  ArrowRight,
  Check,
  Square,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";
const path = "/cifrovizaciya-turagentstva";

export const metadata: Metadata = {
  title: {
    absolute: "Цифровизация турагентства: с чего начать — гид 2026",
  },
  description:
    "Шесть процессов турагентства, которые переводят в цифру: порядок внедрения, чеклист готовности, цены на входе и глоссарий терминов. Данные на сентябрь 2026.",
  keywords: [
    "цифровизация турагентства",
    "цифровизация в туризме",
    "автоматизация турагентства с чего начать",
    "digital трансформация турагентства",
    "какие программы нужны турагентству",
    "внедрение ИИ в турагентстве",
    "цифровые инструменты турагентства",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: "Цифровизация турагентства: с чего начать — гид 2026",
    description:
      "Шесть процессов, порядок внедрения, чеклист готовности, цены и глоссарий. Без общих слов: что даёт результат в первую неделю, а что можно отложить.",
    url: `${siteUrl}${path}`,
    type: "article",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Цифровизация турагентства: с чего начать — гид 2026",
    description:
      "Шесть процессов, порядок внедрения, чеклист, цены и глоссарий терминов.",
    images: ["/og-image.png"],
  },
};

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
          name: "Цифровизация турагентства",
          item: `${siteUrl}${path}`,
        },
      ],
    },
    {
      "@type": "Article",
      "@id": `${siteUrl}${path}#article`,
      headline: "Цифровизация турагентства: с чего начать",
      description:
        "Какие процессы турагентства переводят в цифру, в каком порядке внедрять, сколько это стоит и как проверить результат.",
      inLanguage: "ru-RU",
      datePublished: "2026-09-13",
      dateModified: "2026-09-13",
      author: { "@id": `${siteUrl}/#organization` },
      publisher: { "@id": `${siteUrl}/#organization` },
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntityOfPage: `${siteUrl}${path}`,
      image: `${siteUrl}/og-image.png`,
      citation: pillarSources.map((s) => s.href),
    },
    {
      "@type": "HowTo",
      "@id": `${siteUrl}${path}#howto`,
      name: "Порядок цифровизации турагентства",
      description:
        "Четыре шага в том порядке, в котором они дают результат: приём обращений, единая система заявок, повторные продажи, аналитика.",
      inLanguage: "ru-RU",
      step: roadmapSteps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.title,
        text: s.text,
      })),
    },
    {
      "@type": "DefinedTermSet",
      "@id": `${siteUrl}${path}#glossary`,
      name: "Глоссарий цифровизации турагентства",
      inLanguage: "ru-RU",
      hasDefinedTerm: glossary.map((t) => ({
        "@type": "DefinedTerm",
        name: t.term,
        description: t.definition,
        inDefinedTermSet: { "@id": `${siteUrl}${path}#glossary` },
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}${path}#faq`,
      mainEntity: pillarFaq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function DigitalPillarPage() {
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
              <span className="text-body">Цифровизация турагентства</span>
            </nav>
            <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
              Цифровизация турагентства:{" "}
              <span className="text-accent">с чего начать</span>
            </h1>
            <p className="mt-6 rounded-2xl border border-accent/15 bg-blue-ice/40 p-5 text-base leading-relaxed text-body sm:text-lg">
              Цифровизация турагентства — это перевод шести процессов из ручного
              режима в цифровой: приём обращений, подбор туров, заявки и CRM,
              документы, работа с базой клиентов и аналитика. Начинать нужно с
              приёма обращений: этот шаг стоит дешевле всех и даёт результат в
              первую неделю.
            </p>
            <p className="mt-5 text-base leading-relaxed text-body">
              Ниже — что именно переводят в цифру и сколько это стоит на рынке,
              в каком порядке внедрять, чеклист готовности из десяти пунктов,
              частые ошибки и глоссарий терминов. Цены сторонних сервисов
              проверены {pricesCheckedAt}; данные по обращениям — обезличенная
              статистика сети «Навылет! AI» за летний сезон 2026, источники
              внизу страницы.
            </p>
          </div>
        </section>

        {/* Зачем сейчас */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Почему это перестало быть необязательным
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">
              Агентский канал сжимается. По оценке, прозвучавшей на конференции
              АТОР «ТрЭволюция» в сентябре 2026 года, доля продаж через агентов
              упала с 95% в 2023 году до 85% в первом полугодии 2026-го, а онлайн
              забирает уже 14–15% пакетных туров. Турист привык к скорости
              маркетплейса и сравнивает агентство с ней, а не с соседним офисом.
            </p>
            <p className="mt-4 text-base leading-relaxed text-body">
              При этом полностью уходить в автоматику рынок не готов: доверить
              бронирование искусственному интеллекту согласны около 2%
              туристов. То есть выигрывает не тот, кто заменит людей машиной, а
              тот, у кого машина снимет рутину и оставит менеджеру решение.
              Практический вывод простой: цифровизация нужна там, где сейчас
              теряются деньги, и не нужна там, где просто «принято
              автоматизировать».
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { stat: "1–2%", label: "посетителей сайта заполняют форму заявки" },
                {
                  stat: `${networkResults.stats[2].value}%`,
                  label: "обращений приходят вне рабочего времени",
                },
                { stat: "15–40 мин", label: "уходит у менеджера на один подбор" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-blue-subtle/50 bg-white px-4 py-5 shadow-card"
                >
                  <p className="font-display text-2xl font-bold text-accent">
                    {s.stat}
                  </p>
                  <p className="mt-1 text-sm leading-snug text-muted">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Шесть блоков */}
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Шесть процессов, которые переводят в цифру
            </h2>
            <p className="mt-3 max-w-2xl text-base text-body">
              По каждому: что болит без цифры, что обычно ставят и порядок цен на
              рынке. Там, где задачу закрывает наш ассистент, это отмечено
              отдельно — в остальных случаях нужны другие инструменты, и мы это
              честно говорим.
            </p>
            <div className="mt-9 space-y-4">
              {digitalBlocks.map((b, i) => (
                <Fragment key={b.id}>
                <div
                  id={b.id}
                  className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-sm font-bold text-muted">
                      {i + 1}
                    </span>
                    <h3 className="font-display text-lg font-bold text-heading">
                      {b.title}
                    </h3>
                  </div>
                  <dl className="mt-4 space-y-3">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                        Что болит
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-body">
                        {b.pain}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                        Что ставят
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-body">
                        {b.tools}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
                        Порядок цен
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed text-body">
                        {b.price}
                      </dd>
                    </div>
                  </dl>
                  {b.ours && (
                    <div className="mt-4 rounded-xl bg-blue-ice/50 px-4 py-3">
                      <p className="text-sm leading-relaxed text-heading">
                        <span className="font-semibold">Наша часть: </span>
                        {b.ours.text}.{" "}
                        <Link
                          href={b.ours.href}
                          className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
                        >
                          {b.ours.label}
                        </Link>
                      </p>
                    </div>
                  )}
                </div>
                {/* Калькулятор сразу после боли, которую он измеряет: здесь
                    читатель уже согласен, что ночные обращения — проблема. */}
                {b.id === "obrashcheniya" && (
                  <LostLeadsCalculator source="calculator_digital" />
                )}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Порядок внедрения */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              В каком порядке внедрять
            </h2>
            <p className="mt-3 text-base text-body">
              Порядок важнее набора инструментов. Каждый следующий шаг опирается
              на предыдущий, поэтому у каждого есть признак, по которому видно,
              что можно двигаться дальше.
            </p>
            <ol className="mt-9 space-y-4">
              {roadmapSteps.map((s, i) => (
                <li
                  key={s.title}
                  className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card"
                >
                  <div className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 font-display text-sm font-bold text-accent">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-heading">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-body">
                        {s.text}
                      </p>
                      <p className="mt-3 flex items-start gap-2 text-sm text-heading">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>
                          <span className="font-semibold">Шаг закрыт: </span>
                          {s.done}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Чеклист */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Чеклист: насколько агентство уже в цифре
            </h2>
            <p className="mt-3 text-base text-body">
              Десять утверждений. Отмечайте те, что верны для вашего агентства
              сегодня: незакрытые пункты и есть план работ, причём в том же
              порядке, в котором они идут в списке.
            </p>
            <ul className="mt-8 space-y-2.5">
              {readinessChecklist.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-blue-subtle/40 bg-white px-4 py-3.5"
                >
                  <Square className="mt-0.5 h-4 w-4 shrink-0 text-muted" aria-hidden />
                  <span className="text-sm leading-relaxed text-body">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Меньше пяти отметок — начинайте с первого шага и не распыляйтесь.
              Семь и больше — узкое место, скорее всего, не в инструментах, а в
              скорости обработки заявок; смотрите{" "}
              <Link
                href="/resheniya"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                разборы типовых проблем
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Сколько стоит */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Сколько стоит начать
            </h2>
            <p className="mt-3 text-base text-body">
              Минимальный рабочий набор для одного офиса. Это не «полная
              цифровизация», а первые два шага, после которых перестают теряться
              обращения и появляются данные.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
              {[
                {
                  what: "ИИ-ассистент на сайте",
                  price: "от 990 ₽/мес",
                  note: "подключение 0 ₽, первый месяц бесплатно",
                },
                {
                  what: "Отраслевая CRM",
                  price: "примерно от 900 ₽/мес",
                  note: "за пользователя, дешевле при годовой оплате",
                },
                {
                  what: "Веб-аналитика и цели",
                  price: "0 ₽",
                  note: "стоит только времени на настройку",
                },
                {
                  what: "Бот в мессенджере",
                  price: "0 ₽ за подключение",
                  note: "платите за ассистента, канал бесплатный",
                },
              ].map((row, i) => (
                <div
                  key={row.what}
                  className={`grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[1.2fr_auto_1.4fr] sm:items-center sm:gap-4 ${
                    i > 0 ? "border-t border-blue-subtle/30" : ""
                  }`}
                >
                  <div className="font-semibold text-heading">{row.what}</div>
                  <div className="font-display text-sm font-bold text-accent sm:text-right">
                    {row.price}
                  </div>
                  <div className="text-sm text-muted">{row.note}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Итого порядка двух тысяч рублей в месяц. Для сравнения: разработка
              собственного бота на заказ стоит 80 000–250 000 ₽ разово плюс
              10 000–20 000 ₽/мес поддержки и оправдана только при нетиповых
              процессах. Подробный расчёт окупаемости — на странице{" "}
              <Link
                href="/skolko-stoit"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                «Сколько стоит ИИ-ассистент»
              </Link>
              , сравнение вариантов —{" "}
              <Link
                href="/sravnenie"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                в таблице
              </Link>
              .
            </p>
            <div className="mt-9 flex justify-center">
              <RegisterCta source="pillar_digital_mid" />
            </div>
          </div>
        </section>

        {/* Ошибки */}
        <section className="bg-surface">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Пять ошибок, которые съедают бюджет
            </h2>
            <div className="mt-8 space-y-3">
              {commonMistakes.map((m) => (
                <div
                  key={m.title}
                  className="flex gap-4 rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <AlertTriangle className="h-4 w-4 text-accent" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-heading">
                      {m.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-body">
                      {m.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Глоссарий */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Глоссарий: термины, которые встретятся в разговоре
            </h2>
            <p className="mt-3 text-base text-body">
              Двенадцать понятий, которые чаще всего звучат от поставщиков. Знать
              их полезно ровно для одного: чтобы задавать правильные вопросы на
              демонстрации.
            </p>
            <dl className="mt-8 space-y-4">
              {glossary.map((t) => (
                <div
                  key={t.term}
                  className="rounded-2xl border border-blue-subtle/40 bg-white p-5"
                >
                  <dt className="font-display text-base font-bold text-heading">
                    {t.term}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-body">
                    {t.definition}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
              Частые вопросы
            </h2>
            <div className="mt-7 space-y-4">
              {pillarFaq.map((item) => (
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
                href="/blog/kak-uvelichit-prodazhi-turagentstva"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Как увеличить продажи агентства{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/blog/ii-v-turizme-2026"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Гайд: ИИ в туризме в 2026 <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/keisy/mgp"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Кейс сети МГП <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Источники */}
            <div className="mt-12 rounded-2xl border border-blue-subtle/40 bg-surface-alt p-5">
              <h3 className="font-display text-sm font-bold text-heading">
                Источники
              </h3>
              <ol className="mt-3 space-y-2">
                {pillarSources.map((s, i) => (
                  <li key={s.href} className="flex gap-2 text-xs text-muted">
                    <span className="shrink-0 font-semibold">{i + 1}.</span>
                    <span>
                      {s.label} —{" "}
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 font-medium text-accent hover:underline"
                      >
                        {s.name}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-xs text-muted">
                Показатели по обращениям, подбору и конверсии в заявку — данные
                сети «Навылет! AI» за летний сезон 2026, обезличенно.
              </p>
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
              Начните с первого шага — он бесплатный
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              Ассистент на сайте закрывает приём обращений: 30 дней и до 200
              диалогов без карты. Через месяц у вас будут свои цифры вместо
              оценок из этого гида.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source="pillar_digital_bottom" compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
