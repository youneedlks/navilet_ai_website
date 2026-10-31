import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import RegisterCta from "@/components/seo/RegisterCta";
import { ChevronDown, ChevronRight, ArrowRight, MessageSquare, Code2, BellRing, Hand, BookOpen } from "lucide-react";
import { FeatureCard, StatCard } from "@/components/ui/Cards";
import { jsonLdScript } from "@/lib/schema";
import { pricingPlans, priceFromLabel, reqVersionPublished } from "@/lib/content";

export const metadata: Metadata = {
  title: {
    absolute: `ИИ для небольшого турагентства и частного турагента — от ${priceFromLabel}/мес`,
  },
  description: `Один агент или 2–5 менеджеров? ИИ-ассистент отвечает туристам 24/7 на сайте и в MAX, собирает заявку, с Tourvisor подбирает туры. От ${priceFromLabel}/мес, месяц бесплатно.`,
  keywords: [
    "ИИ для турагента",
    "ИИ для небольшого турагентства",
    "чат-бот для турагента",
    "ИИ-ассистент для турагентства",
    "ИИ для менеджера турагентства",
    "автоматизация небольшого турагентства",
    "ИИ-помощник турагенту",
  ],
  alternates: { canonical: "/dlya-turagentstv" },
  openGraph: {
    title: "ИИ для небольшого турагентства и частного турагента — «Навылет! AI»",
    description:
      "Ассистент отвечает туристам вечером и в выходные, собирает заявку и подбирает туры. Для агентств от 1 до 5 человек. Первый месяц бесплатно.",
    url: "https://navilet.ru/dlya-turagentstv",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ИИ для небольшого турагентства — «Навылет! AI»",
    description:
      "Заявки 24/7 на сайте и в MAX без расширения штата. От 790 ₽/мес, первый месяц бесплатно.",
    images: ["/og-image.png"],
  },
};

const siteUrl = "https://navilet.ru";

const rub = (value: number) => `${value.toLocaleString("ru-RU")} ₽`;

const plan = (id: string) => pricingPlans.find((p) => p.id === id)!;
const lite = plan("lite");
const start = plan("start");

/** Сценарии: какая версия и какой тариф — цены из единого прайса (content.ts). */
const scenarios = [
  {
    title: "Частный турагент или один менеджер",
    pain: "Днём — встречи и бронирования, вечером нет сил отвечать в чатах. Запросы приходят ночью и в выходные, а к утру турист уже нашёл другого агента.",
    does: "Ассистент отвечает сразу, уточняет направление, даты, состав и бюджет, берёт контакт. Утром у вас готовая заявка — остаётся подобрать и забронировать.",
    version: "«Лид» с Турвизором или «Заявка» без него",
    tariff: `Тариф «Лайт»: 40 диалогов — около одного обращения в день. ${
      reqVersionPublished && lite.req ? `«Заявка» — ${rub(lite.req.price)}/мес, ` : ""
    }«Лид» — ${rub(lite.lid!.price)}/мес.`,
  },
  {
    title: "Агентство на 2–5 менеджеров",
    pain: "В сезон очередь в чатах: пока менеджер считает тур одному клиенту, другие ждут ответа. Многие вопросы повторяются изо дня в день.",
    does: "Ассистент берёт на себя первичный подбор и типовые вопросы, отдаёт менеджерам готовые заявки. «Про» ещё и консультирует по отелям без ограничений и возвращает замолчавших клиентов в MAX.",
    version: "«Лид» или «Про»",
    tariff: `Тариф «Старт»: 80 диалогов — 2–3 обращения в день. «Лид» — ${rub(
      start.lid!.price
    )}/мес, «Про» — ${rub(start.price)}/мес.`,
  },
  {
    title: "Без Турвизора или со своим подбором",
    pain: "Вы бронируете напрямую у туроператоров, продаёте авторские и экскурсионные туры или подбираете вручную — готовой выдачи с ценами нет.",
    does: "Версия «Заявка» не подбирает туры, а собирает запрос в сводку — куда, когда, на сколько ночей, кто едет, бюджет, пожелания — и контакт. Менеджер садится сразу за подбор.",
    version: "«Заявка»",
    tariff: reqVersionPublished && lite.req
      ? `От ${rub(lite.req.price)}/мес за 40 диалогов. Турвизор не нужен.`
      : "Турвизор не нужен.",
    href: "/blog/ii-assistent-bez-tourvisor",
    hrefLabel: "Ассистент без Турвизора — подробно",
  },
  {
    title: "Без сайта — клиенты пишут в мессенджер",
    pain: "Сайта нет или он почти без трафика: клиенты приходят из соцсетей, по рекомендациям и пишут в мессенджер.",
    does: "Ассистент работает ботом агентства в MAX: ссылку на него можно дать в соцсетях, на визитке, в подписи письма. Сайт не нужен.",
    version: "любая версия",
    tariff: "Канал MAX — на любом тарифе, подключение 0 ₽.",
    href: "/max",
    hrefLabel: "Ассистент в MAX",
  },
];

/** Подсказка «сколько диалогов нужно»: диалог — обращение одного посетителя (оферта, п. 1.9). */
const volumeGuide = ["lite", "start", "standart", "biznes"].map((id, i) => {
  const p = plan(id);
  const perDay = ["около 1", "2–3", "около 5", "около 8"][i];
  return {
    name: p.name,
    dialogs: p.lid!.dialogs,
    perDay,
    req: reqVersionPublished && p.req ? rub(p.req.price) : null,
    lid: rub(p.lid!.price),
    pro: rub(p.price),
    proDialogs: p.dialogs,
    popular: p.popular,
  };
});

const comparison = [
  {
    option: "Форма «оставьте заявку»",
    night: "принимает, но молчит",
    request: "имя и телефон",
    price: "бесплатно",
  },
  {
    option: "Конструктор ботов с кнопками",
    night: "да, по сценарию",
    request: "ответы на вопросы анкеты",
    price: "от 899 ₽/мес плюс ваше время на сборку",
  },
  {
    option: "Ещё один сотрудник",
    night: "только в рабочие часы",
    request: "зависит от человека",
    price: "от 40 000 ₽/мес плюс налоги",
  },
  {
    option: "ИИ-ассистент «Навылет! AI»",
    night: "да, 24/7",
    request: "сводка запроса, контакт, переписка; с «Лидом» — выбранный тур",
    price: `от ${priceFromLabel}/мес, месяц бесплатно`,
    highlight: true,
  },
];

const essentials = [
  {
    icon: Code2,
    title: "Подключение без программиста",
    text: "Одна строка кода на сайт — Tilda, WordPress, 1С-Битрикс и другие — или токен бота MAX в кабинете. Доступ приходит в течение рабочего дня.",
    href: "/vidzhet",
    label: "Установка виджета",
  },
  {
    icon: BellRing,
    title: "Заявки — туда, где вы их увидите",
    text: "На почту, в U‑ON, в Telegram и MAX: в общий чат менеджеров или вам лично. С кнопкой «Открыть диалог».",
    href: "/blog/uvedomleniya-o-zayavkah-telegram-max",
    label: "Как работают уведомления",
  },
  {
    icon: Hand,
    title: "Можно ответить самому",
    text: "Турист просит живого человека — менеджер перехватывает диалог в кабинете и пишет в том же чате, ассистент в это время молчит.",
    href: "/dashboard",
    label: "Личный кабинет",
  },
  {
    icon: BookOpen,
    title: "Отвечает по вашим условиям",
    text: "Часы работы, офис, оплата, рассрочка, документы — в базе знаний кабинета. Ассистент отвечает по ним, а не придумывает.",
    href: "/faq",
    label: "Частые вопросы",
  },
];

const faq = [
  {
    q: "Нужен ли сайт?",
    a: "Нет. Ассистент может работать ботом агентства в мессенджере MAX — ссылку на бота дают в соцсетях, на визитке, в подписи письма. Если сайт есть — ставится виджет одной строкой кода; оба канала сразу — надстройка «Второй канал».",
  },
  {
    q: "У нас нет Турвизора. Подойдёт?",
    a: "Да, версия «Заявка»: ассистент собирает запрос и контакт, а тур подбирает ваш менеджер. «Лид» и «Про» подбирают туры из Турвизора, подключение к нему — на нашей стороне, свои ключи агентству не нужны.",
  },
  {
    q: "Сколько времени занимает подключение?",
    a: "Регистрация — три коротких экрана. Доступ в кабинет и код виджета приходят на почту в течение рабочего дня; бот в MAX подключаем за один рабочий день.",
  },
  {
    q: "Что ответит ассистент, если турист спросит про визу или цену?",
    a: "Про визы, оплату и документы — коротко, по базе знаний вашего агентства. Цены туров «Лид» и «Про» показывают из Турвизора на момент запроса; «Заявка» цен не называет — их посчитает менеджер.",
  },
  {
    q: "Как платить?",
    a: "Ежемесячно по счёту, банковским переводом, без автосписаний. НДС не облагается — разработчик участник проекта «Сколково». Первый месяц — 30 дней с первого диалога и до 200 диалогов — бесплатно, карта не нужна.",
  },
  {
    q: "Можно ли отключить?",
    a: "Да, в любой момент: оплата помесячная, договор — публичная оферта, разовых платежей нет, подключение — 0 ₽.",
  },
];

const audienceJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/dlya-turagentstv#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Для турагентств",
          item: `${siteUrl}/dlya-turagentstv`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/dlya-turagentstv#webpage`,
      url: `${siteUrl}/dlya-turagentstv`,
      name: "ИИ для небольшого турагентства и частного турагента — «Навылет! AI»",
      description:
        "ИИ-ассистент для турагентств на 1–5 человек: ответы туристам 24/7 на сайте и в MAX, сбор заявки, подбор туров по Tourvisor, выбор версии и тарифа по потоку обращений.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/dlya-turagentstv#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
      primaryImageOfPage: { "@id": `${siteUrl}/#logo` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/dlya-turagentstv#service`,
      name: "ИИ-ассистент «Навылет! AI» для небольших турагентств",
      serviceType: "ИИ-ассистент для турагентства",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: { "@type": "Country", name: "Россия" },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Небольшие турагентства и частные турагенты",
      },
      description:
        "Ассистент на сайте или в MAX отвечает туристам 24/7, собирает запрос и контакт, с Tourvisor подбирает туры и передаёт заявку менеджеру на почту, в U‑ON, Telegram и MAX. Подключение без программиста.",
      offers: { "@id": `${siteUrl}/#product` },
    },
  ],
};

export default function ForAgenciesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(audienceJsonLd) }}
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
              Для турагентств
            </li>
          </ol>
        </nav>

        {/* Hero: ответ первым экраном */}
        <section className="mx-auto max-w-4xl px-5 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
          <p className="mb-3 text-sm font-semibold text-accent">Для агентств от 1 до 5 человек</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            <span className="whitespace-nowrap text-accent">ИИ-ассистент</span> для небольшого
            турагентства: заявки 24/7 без расширения штата
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-body sm:text-lg">
            Ассистент отвечает туристам на сайте и в MAX, пока вы заняты или спите: уточняет запрос, берёт контакт и передаёт
            готовую заявку — на почту, в U‑ON, Telegram или MAX. С Турвизором он ещё и подбирает туры с ценами. От{"\u00A0"}
            <span className="whitespace-nowrap">{priceFromLabel}/мес</span>, первые 30 дней — бесплатно.
          </p>
          <div className="mt-8 flex justify-center">
            <RegisterCta source="dlya_turagentstv_hero" />
          </div>
        </section>

        {/* Сценарии */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Узнайте своё агентство
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-body">
                Четыре типичные ситуации небольшого агентства. Нажмите на свою — что делает ассистент, какая версия подходит и сколько это стоит.
              </p>
            </div>
            <ul className="mx-auto mt-10 max-w-3xl divide-y divide-blue-subtle/50 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
              {scenarios.map((s) => (
                <li key={s.title}>
                  <details className="group">
                    <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-x-4 px-5 py-4 transition-colors hover:bg-blue-ice/40 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                      <h3 className="font-display text-base font-bold text-heading sm:text-lg">{s.title}</h3>
                      <ChevronDown
                        className="row-span-2 h-5 w-5 text-muted transition-transform group-open:rotate-180"
                        aria-hidden
                      />
                      <span className="mt-0.5 text-sm text-body">Версия: {s.version}</span>
                    </summary>
                    <div className="border-t border-blue-subtle/40 bg-surface-alt/60 px-5 pb-5 pt-4 sm:px-6">
                      <p className="text-sm leading-relaxed text-body">{s.pain}</p>
                      <p className="mt-3 text-sm leading-relaxed text-heading">{s.does}</p>
                      <p className="mt-3 text-sm font-semibold text-heading">{s.tariff}</p>
                      {s.href && (
                        <Link
                          href={s.href}
                          className="mt-2 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
                        >
                          {s.hrefLabel}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Примеры диалогов */}
        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Как это выглядит для туриста
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-body">
              Слева — «Лид» с подбором туров по Турвизору, справа — «Заявка», которая собирает запрос для менеджера.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                label: "«Лид»: подбор туров",
                demo: "/demo?v=lid",
                lines: [
                  { from: "client", text: "Хотим в Турцию в июле на двоих, всё включено, до 200 тысяч" },
                  { from: "bot", text: "С удовольствием подберу. Из какого города вылет и на сколько ночей?" },
                  { from: "client", text: "Из Москвы, на 7 ночей" },
                  { from: "bot", text: "Вот варианты на июль, 7 ночей, всё включено, в пределах бюджета — с фото, питанием и ценой на сейчас. Какой понравился? Оставьте телефон — менеджер забронирует." },
                ],
              },
              {
                label: "«Заявка»: сводка для менеджера",
                demo: "/demo?v=req",
                lines: [
                  { from: "client", text: "Здравствуйте! Хотим в Турцию в мае" },
                  { from: "bot", text: "С удовольствием помогу собрать запрос. С какой даты и на сколько ночей планируете?" },
                  { from: "client", text: "С 10 мая, на 7 ночей. Нас двое, из Москвы, до 200 тысяч" },
                  { from: "bot", text: "Все данные по вашему запросу собрал: Турция, 10 мая, 7 ночей, вылет из Москвы, 2 взрослых, до 200 000 ₽. Подборку составит менеджер — оставьте, пожалуйста, имя и телефон." },
                ],
              },
            ].map((d) => (
              <figure
                key={d.label}
                className="flex flex-col rounded-2xl border border-blue-subtle/50 bg-surface-alt p-5"
              >
                <figcaption className="mb-4 flex items-center gap-2 font-display text-sm font-bold text-heading">
                  <MessageSquare className="h-4 w-4 text-accent" />
                  {d.label}
                </figcaption>
                <div className="space-y-3">
                  {d.lines.map((l, i) => (
                    <p
                      key={i}
                      className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        l.from === "client"
                          ? "ml-auto rounded-br-md bg-accent text-white"
                          : "rounded-bl-md border border-blue-subtle/50 bg-white text-body"
                      }`}
                    >
                      {l.text}
                    </p>
                  ))}
                </div>
                <Link
                  href={d.demo}
                  className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-accent hover:text-accent-hover"
                >
                  Попробовать в демо
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </figure>
            ))}
          </div>
        </section>

        {/* Сколько диалогов нужно */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Сколько диалогов нужно небольшому агентству
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-body">
                Диалог — обращение одного туриста, сколько бы сообщений в нём ни было. Прикиньте, сколько обращений у вас в день
                вместе с вечерними и выходными.
              </p>
            </div>
            <div className="mt-10 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
              <table className="block w-full text-left text-sm sm:table">
                <thead className="hidden bg-surface-alt text-heading sm:table-header-group">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Тариф</th>
                    <th className="px-5 py-3 font-semibold">Обращений в день</th>
                    {reqVersionPublished && <th className="px-5 py-3 font-semibold">«Заявка»</th>}
                    <th className="px-5 py-3 font-semibold">«Лид»</th>
                    <th className="px-5 py-3 font-semibold">«Про»</th>
                  </tr>
                </thead>
                <tbody className="block sm:table-row-group">
                  {volumeGuide.map((r) => (
                    <tr
                      key={r.name}
                      className="grid grid-cols-3 gap-x-3 gap-y-1 border-t border-blue-subtle/30 px-4 py-3 first:border-t-0 sm:table-row sm:px-0 sm:py-0 sm:first:border-t"
                    >
                      <td className="col-span-3 block font-medium text-heading sm:table-cell sm:px-5 sm:py-3">
                        {r.name}
                        {r.popular && <span className="font-normal text-accent"> · выбирают чаще</span>}
                      </td>
                      <td className="col-span-3 -mt-1 mb-1 block text-xs text-muted sm:m-0 sm:table-cell sm:px-5 sm:py-3 sm:text-sm sm:text-body">
                        {r.perDay}
                        <span className="sm:hidden"> в день</span> · {r.dialogs} в мес.
                      </td>
                      {reqVersionPublished && (
                        <td className="block text-body sm:table-cell sm:px-5 sm:py-3">
                          <span className="block text-[11px] text-muted sm:hidden">«Заявка»</span>
                          {r.req}
                        </td>
                      )}
                      <td className="block text-body sm:table-cell sm:px-5 sm:py-3">
                        <span className="block text-[11px] text-muted sm:hidden">«Лид»</span>
                        {r.lid}
                      </td>
                      <td className="block text-body sm:table-cell sm:px-5 sm:py-3">
                        <span className="block text-[11px] text-muted sm:hidden">«Про» · {r.proDialogs} диал.</span>
                        {r.pro}
                        <span className="hidden sm:inline"> ({r.proDialogs} диал.)</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-sm text-muted">
              Цены в месяц; «Про» включает меньше диалогов, потому что ведёт клиента до брони. Не угадали с объёмом —
              тариф меняется в кабинете.{" "}
              <Link href="/tarify" className="font-semibold text-accent underline decoration-accent/30 underline-offset-2">
                Все тарифы
              </Link>
            </p>
          </div>
        </section>

        {/* Сравнение */}
        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Форма, конструктор, сотрудник или ассистент
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-body">
              Что выбирают небольшие агентства, чтобы не терять обращения. Конкретные продукты с ценами — в{"\u00A0"}
              <Link href="/blog/ii-assistenty-dlya-turagentstv-2026" className="font-semibold text-accent underline decoration-accent/30 underline-offset-2">
                подборке решений 2026
              </Link>
              . Цены здесь — рыночные оценки, как в нашем{" "}
              <Link href="/sravnenie" className="font-semibold text-accent underline decoration-accent/30 underline-offset-2">
                сравнении решений
              </Link>
              .
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl border border-blue-subtle/50">
            <table className="block w-full text-left text-sm sm:table">
              <thead className="hidden bg-surface-alt text-heading sm:table-header-group">
                <tr>
                  <th className="px-5 py-3 font-semibold">Вариант</th>
                  <th className="px-5 py-3 font-semibold">Ночью и в выходные</th>
                  <th className="px-5 py-3 font-semibold">Что получает менеджер</th>
                  <th className="px-5 py-3 font-semibold">Сколько стоит</th>
                </tr>
              </thead>
              <tbody className="block sm:table-row-group">
                {comparison.map((c) => (
                  <tr
                    key={c.option}
                    className={`block border-t border-blue-subtle/30 px-4 py-3 first:border-t-0 sm:table-row sm:px-0 sm:py-0 sm:first:border-t ${c.highlight ? "bg-blue-ice/40" : "bg-white"}`}
                  >
                    <td className={`block sm:table-cell sm:px-5 sm:py-3 ${c.highlight ? "font-semibold text-heading" : "font-medium text-heading"}`}>
                      {c.option}
                    </td>
                    <td className="mt-1 block text-body sm:mt-0 sm:table-cell sm:px-5 sm:py-3">
                      <span className="text-muted sm:hidden">Ночью и в выходные: </span>
                      {c.night}
                    </td>
                    <td className="block text-body sm:table-cell sm:px-5 sm:py-3">
                      <span className="text-muted sm:hidden">Менеджер получает: </span>
                      {c.request}
                    </td>
                    <td className="block text-body sm:table-cell sm:px-5 sm:py-3">
                      <span className="text-muted sm:hidden">Стоимость: </span>
                      {c.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Что важно маленькому агентству */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
              Что важно, когда в агентстве мало людей
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {essentials.map((e) => (
                <FeatureCard key={e.title} icon={e.icon} title={e.title} titleAs="p" stackFrom="never">
                  <p>{e.text}</p>
                  <Link
                    href={e.href}
                    className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-hover"
                  >
                    {e.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </FeatureCard>
              ))}
            </div>
          </div>
        </section>

        {/* Доказательства */}
        <section className="mx-auto max-w-5xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
            Работает в крупнейшей сети — доступно одиночному офису
          </h2>
          <dl className="mt-10 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
            {[
              { value: "41,4%", label: "обращений приходят вне рабочего времени", note: "данные сети «Навылет! AI», лето 2026" },
              { value: "11–14%", label: "диалогов становятся квалифицированной заявкой", note: "данные сети «Навылет! AI», лето 2026" },
              { value: "396", label: "офисов «Сети магазинов горящих путёвок»", note: "стратегический партнёр с 2025 года" },
            ].map((s) => (
              <StatCard key={s.label} value={s.value} label={s.label} center>
                <span className="text-xs text-muted">{s.note}</span>
              </StatCard>
            ))}
          </dl>
          <p className="mx-auto mt-8 max-w-3xl text-center text-base text-body">
            Каждый офис сети МГП — отдельная точка продаж со своими менеджерами. Ассистент закрывает вечерние и выходные
            обращения и первичный подбор, менеджер подключается, когда клиент готов бронировать.{" "}
            <Link href="/keisy/mgp" className="font-semibold text-accent underline decoration-accent/30 underline-offset-2">
              Кейс МГП
            </Link>
            . У вас сеть или франшиза — смотрите{" "}
            <Link href="/dlya-setey-agentstv" className="font-semibold text-accent underline decoration-accent/30 underline-offset-2">
              решение для сетей
            </Link>
            .
          </p>
        </section>

        {/* FAQ — видимые вопросы, без отдельной разметки */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="text-center font-display text-3xl font-bold text-heading sm:text-4xl">
              Частые вопросы небольших агентств
            </h2>
            <div className="mt-10 space-y-3">
              {faq.map((f) => (
                <details key={f.q} className="group rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card sm:p-6">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display text-base font-bold text-heading">{f.q}</h3>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-body">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-muted">
              Чем отличаются версии —{" "}
              <Link href="/versii" className="font-semibold text-accent underline decoration-accent/30 underline-offset-2">
                «Заявка», «Лид» и «Про»
              </Link>
              ; все тарифы —{" "}
              <Link href="/tarify" className="font-semibold text-accent underline decoration-accent/30 underline-offset-2">
                на одной странице
              </Link>
              .
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Попробуйте в своём агентстве — 30 дней{" "}
            <span className="text-accent">бесплатно</span>
          </h2>
          <p className="mt-4 text-base text-body sm:text-lg">
            Без разовых платежей и программиста. Регистрация — три коротких экрана, доступ — в течение рабочего дня.
          </p>
          <div className="mt-8 flex justify-center">
            <RegisterCta source="dlya_turagentstv_bottom" />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
