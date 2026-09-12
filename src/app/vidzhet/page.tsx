import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Clock,
  Palette,
  Globe,
  LayoutGrid,
  Info,
  Plane,
  Link2,
  Send,
  Check,
} from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import RegisterCta from "@/components/seo/RegisterCta";
import { platformPages } from "@/lib/seo/platform-pages";
import { integrationCode } from "@/lib/integrationSnippet";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";

export const metadata: Metadata = {
  title: {
    absolute: "Виджет подбора туров на сайт — установка на любую платформу",
  },
  description:
    "ИИ-виджет подбора туров для сайта турагентства: диалог вместо формы, туры с ценами Tourvisor, заявка в CRM. Установка на Tilda, WordPress, Битрикс за 10 минут.",
  keywords: [
    "виджет подбора туров на сайт",
    "виджет поиска туров",
    "чат виджет турагентство",
    "модуль поиска туров для сайта",
    "виджет туров для сайта турагентства",
    "поиск туров на сайте",
  ],
  alternates: { canonical: "/vidzhet" },
  openGraph: {
    title: "Виджет подбора туров на сайт — любая платформа",
    description:
      "Инструкции установки ИИ-виджета подбора туров: Tilda, WordPress, Битрикс, Wix и другие. Одна строка кода.",
    url: `${siteUrl}/vidzhet`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Виджет подбора туров на сайт — любая платформа",
    description:
      "Инструкции установки ИИ-виджета подбора туров: Tilda, WordPress, Битрикс, Wix и другие.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const faqItems = [
  {
    question: "Чем ИИ-виджет отличается от модуля поиска туров на сайте?",
    answer:
      "Модуль поиска — это форма с фильтрами: турист сам выбирает страну, даты, звёзды и получает выдачу. ИИ-виджет ведёт диалог: понимает запрос одной фразой, уточняет пожелания, показывает 3–6 подходящих туров карточками, отвечает на вопросы про отель и перелёт и забирает контакт в разговоре. Данные в обоих случаях из Tourvisor, разница — в конверсии: форма заявки даёт 1–2%, диалог с ассистентом — 11–14% по сети «Навылет! AI».",
  },
  {
    question: "Виджет замедлит сайт?",
    answer:
      "Нет. Скрипт загружается асинхронно после основного контента и живёт в изолированном контейнере: он не блокирует отрисовку страницы, не конфликтует с попапами, формами и анимациями конструкторов. На страницах Tilda, WordPress и Битрикс это проверено на действующих сайтах партнёров.",
  },
  {
    question: "Можно ли поставить ИИ-виджет рядом с уже установленным модулем поиска туров?",
    answer:
      "Да, технически они не мешают друг другу: модуль остаётся для тех, кто привык к фильтрам, виджет встречает тех, кому нужен совет. На практике часть агентств через месяц убирает форму, потому что диалог приносит больше заявок, но это решение остаётся за вами.",
  },
  {
    question: "Сколько стоит виджет подбора туров?",
    answer:
      "Виджет входит в подписку на ассистента: версия «Лид» — от 990 ₽/мес за 40 диалогов, версия «Про» — от 1 990 ₽/мес за 30 диалогов. Установка и настройка бесплатные, разовых платежей нет. Первый месяц — 30 дней и до 200 диалогов — бесплатно, карта не нужна.",
  },
  {
    question: "Нужен ли программист для установки?",
    answer:
      "Нет. Виджет ставится одной строкой кода перед закрывающим тегом </body> — как счётчик Метрики. Для Tilda, WordPress, 1С-Битрикс, Wix, Craftum, uKit, Nethouse, Joomla и Flexbe есть пошаговые инструкции с нюансами платформы. Если сайт делал подрядчик, ему хватит ссылки на инструкцию.",
  },
  {
    question: "Виджет работает от имени моего агентства?",
    answer:
      "Да. В личном кабинете настраиваются название, логотип, аватар, цвета, приветствие и тон общения. Сторонних упоминаний в окне чата нет: турист общается с ассистентом вашего бренда, а подборки по ссылке открываются с вашим логотипом, телефоном и сайтом.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/vidzhet#webpage`,
      url: `${siteUrl}/vidzhet`,
      name: "Виджет подбора туров на сайт — установка на любую платформу",
      isPartOf: { "@id": `${siteUrl}/#website` },
      inLanguage: "ru-RU",
      breadcrumb: { "@id": `${siteUrl}/vidzhet#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/vidzhet#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Виджет на сайт",
          item: `${siteUrl}/vidzhet`,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/vidzhet#list`,
      itemListElement: platformPages.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.h1,
        url: `${siteUrl}/vidzhet/${p.slug}`,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/vidzhet#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

/** Что делает ИИ-виджет в отличие от формы поиска. */
const widgetFeatures = [
  {
    icon: Globe,
    title: "Подбор по базе Tourvisor",
    text: "50+ стран, 500+ курортов, все туроператоры одновременно. Цены и наличие — на момент запроса, а не из кэша недельной давности.",
  },
  {
    icon: LayoutGrid,
    title: "Карточки туров в чате",
    text: "Отель, звёзды, рейтинг, питание, даты, цена и фото — витрина прямо в диалоге, без перехода на страницу выдачи.",
  },
  {
    icon: Info,
    title: "Консультация по отелю",
    text: "Пляж, бассейн, детская инфраструктура, что входит в питание — ассистент отвечает по данным отеля, а не общими словами.",
  },
  {
    icon: Plane,
    title: "Перелёт в том же окне",
    text: "Авиакомпания, время вылета, аэропорты и пересадки подгружаются заранее — турист получает ответ мгновенно.",
  },
  {
    icon: Link2,
    title: "Подборка одной страницей",
    text: "Кнопки «Смотреть подборку» и «Поделиться»: клиент пересылает варианты семье, вы видите в кабинете, что открыли и какой тур смотрели дольше.",
  },
  {
    icon: Send,
    title: "Заявка в CRM и менеджеру",
    text: "Имя, телефон, запрос и выбранный тур уходят в U-ON CRM, Telegram менеджеров и на почту вместе с историей диалога.",
  },
];

/** Классический модуль поиска (форма с фильтрами) против диалогового виджета. */
const compareRows: { feature: string; form: string; ai: string }[] = [
  {
    feature: "Интерфейс для туриста",
    form: "Форма: страна, курорт, даты, звёзды, питание — заполнить самому",
    ai: "Диалог: «Турция на двоих в сентябре до 200 тысяч» одной фразой",
  },
  {
    feature: "Если турист не знает, чего хочет",
    form: "Выдача из сотен вариантов без подсказки",
    ai: "Уточняет пожелания и предлагает 3–6 подходящих туров",
  },
  {
    feature: "Вопросы про отель, пляж, визу",
    form: "Нет — турист ищет ответы в других вкладках",
    ai: "Отвечает в том же окне по данным отеля",
  },
  {
    feature: "Контакт клиента",
    form: "Отдельная форма «оставьте заявку», конверсия 1–2%",
    ai: "Запрашивается в диалоге; 11–14% диалогов становятся заявкой",
  },
  {
    feature: "Ночью и в выходные",
    form: "Выдача работает, консультации нет",
    ai: "Полный цикл: подбор, ответы, заявка менеджеру к утру",
  },
  {
    feature: "Оформление",
    form: "Стандартный вид модуля, настройка под бренд ограничена",
    ai: "White-label: ваш логотип, цвета, приветствие, без сторонних упоминаний",
  },
  {
    feature: "Что видит агентство",
    form: "Счётчик поисков",
    ai: "Диалоги, телефоны, воронка «подборки → клики → заявки», спрос по направлениям",
  },
];

const settings = [
  "Название, логотип и аватар ассистента",
  "Фирменные цвета и стиль окна",
  "Приветствие и тон общения",
  "Позиция кнопки на странице",
  "Кнопки-подсказки под вопросами ассистента",
  "База знаний агентства: акции, условия, контакты офисов",
  "Каналы заявок: CRM, Telegram, почта",
  "Версия ассистента «Лид» или «Про» — переключается без правок кода",
];

const highlights = [
  {
    icon: Code2,
    title: "Одна строка кода",
    text: "Как счётчик Метрики: вставили перед </body> — работает. Без SDK и программиста.",
  },
  {
    icon: Clock,
    title: "10–15 минут",
    text: "Столько занимает установка на любой платформе — от Tilda до самописного сайта.",
  },
  {
    icon: Palette,
    title: "Ваш бренд",
    text: "Логотип, цвета и приветствие настраиваются в кабинете — виджет white-label.",
  },
];

export default function VidzhetHubPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Navigation />
      <main>
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
          <div className="relative mx-auto max-w-3xl px-5 pt-28 pb-10 text-center sm:px-6 sm:pt-32 lg:px-8">
            <h1 className="font-display text-3xl font-bold leading-[1.12] text-heading sm:text-4xl lg:text-5xl">
              Виджет подбора туров на сайт —{" "}
              <span className="text-accent">любая платформа</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
              ИИ-виджет «Навылет! AI» — это не форма с фильтрами, а диалог:
              турист описывает поездку одной фразой, ассистент подбирает туры по
              базе Tourvisor с живыми ценами, отвечает про отели и перелёты и
              передаёт менеджеру заявку с контактом. Подключается одной строкой
              кода на любую платформу — внутри пошаговые инструкции с нюансами.
            </p>
            <div className="mt-7 flex justify-center">
              <RegisterCta source="vidzhet_hub_hero" />
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="mx-auto max-w-4xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <h.icon className="h-5 w-5 text-accent" />
                </div>
                <h2 className="font-display text-base font-bold text-heading">
                  {h.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-body">
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Что умеет */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Что делает ИИ-виджет подбора туров
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Один виджет закрывает весь путь туриста на сайте: от «куда бы
              поехать» до заявки менеджеру. Ничего дополнительно подключать не
              нужно — Tourvisor и каналы заявок уже настроены.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {widgetFeatures.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
                    <f.icon className="h-4.5 w-4.5 text-accent" />
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-heading">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Форма поиска vs диалог */}
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Модуль поиска туров или ИИ-виджет: в чём разница
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Классический модуль агрегатора — форма с фильтрами и выдача. Он
              хорош для туриста, который точно знает, чего хочет. ИИ-виджет
              нужен остальным: тем, кто пришёл с вопросом, а не с готовыми
              параметрами.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
              <div className="hidden grid-cols-[1fr_1.2fr_1.2fr] gap-4 border-b border-blue-subtle/30 bg-surface-alt px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted sm:grid">
                <span>Критерий</span>
                <span>Форма поиска с фильтрами</span>
                <span className="text-accent">ИИ-виджет «Навылет! AI»</span>
              </div>
              {compareRows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[1fr_1.2fr_1.2fr] sm:gap-4 ${
                    i > 0 ? "border-t border-blue-subtle/30" : ""
                  }`}
                >
                  <div className="font-semibold text-heading">{row.feature}</div>
                  <div className="text-sm text-muted">
                    <span className="mr-1 font-semibold text-muted sm:hidden">
                      Форма:
                    </span>
                    {row.form}
                  </div>
                  <div className="text-sm text-body">
                    <span className="mr-1 font-semibold text-accent sm:hidden">
                      ИИ-виджет:
                    </span>
                    {row.ai}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-muted">
              Оба инструмента могут работать на одном сайте. Как устроен подбор
              по базе Tourvisor и почему цены живые —{" "}
              <Link
                href="/integraciya-tourvisor"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                на странице интеграции
              </Link>
              . Полное сравнение с другими вариантами —{" "}
              <Link
                href="/sravnenie"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                в сравнительной таблице
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Platform grid */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Инструкции по платформам
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {platformPages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/vidzhet/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <h3 className="font-display text-base font-bold text-heading transition-colors group-hover:text-accent">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-body">
                    {p.description.split(":")[0]}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Инструкция
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted">
              Вашей платформы нет в списке? Виджет работает на любом сайте, где
              можно вставить строку кода —{" "}
              <Link href="/vidzhet/svoy-sait" className="font-semibold text-accent hover:underline">
                общая инструкция здесь
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Код и настройки */}
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
                  Вся установка — одна строка
                </h2>
                <p className="mt-3 text-base leading-relaxed text-body">
                  Персональный <code>data-assistant-id</code> выдаётся в личном
                  кабинете после регистрации. Код вставляется перед закрывающим
                  тегом <code>&lt;/body&gt;</code>; ни SDK, ни серверной
                  интеграции, ни ключей Tourvisor от вас не нужно — агрегатор
                  подключён на нашей стороне.
                </p>
                <pre className="mt-4 overflow-x-auto rounded-xl bg-[#001229] p-4 text-xs leading-relaxed text-white/90">
                  <code>{integrationCode}</code>
                </pre>
                <p className="mt-3 text-sm text-muted">
                  Тариф, версия и настройки меняются в кабинете — код на сайте
                  остаётся тем же.
                </p>
              </div>
              <div className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card">
                <h3 className="font-display text-lg font-bold text-heading">
                  Что настраивается без правок кода
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {settings.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2.5 text-sm text-body"
                    >
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <Check className="h-3 w-3 text-accent" />
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted">
                  Тот же ассистент работает и в мессенджере MAX — для агентств,
                  которым нужен возврат клиентов.{" "}
                  <Link
                    href="/max"
                    className="font-medium text-accent hover:underline"
                  >
                    Подробнее о канале MAX
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Вопросы про виджет подбора туров
            </h2>
            <div className="mt-7 space-y-4">
              {faqItems.map((item) => (
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
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link
                href="/chat-bot-dlya-turagentstva"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Чат-бот для турагентства <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/podborki"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Подборки туров по ссылке <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Попробовать виджет в демо <ArrowRight className="h-3.5 w-3.5" />
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
              Попробуйте на своём сайте — бесплатно
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              30 дней теста, подключение 0 ₽. Установка за 10 минут по инструкции.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source="vidzhet_hub_bottom" compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
