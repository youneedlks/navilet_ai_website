import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import RegisterCta from "@/components/seo/RegisterCta";
import OpenDetailsOnHash from "@/components/ui/OpenDetailsOnHash";
import {
  crossChannelAddons,
  pricingPlans,
  assistantVersions,
  networkResults,
  priceFrom,
  priceFromLabel,
  priceSelectionNote,
  reqVersionPublished,
} from "@/lib/content";
import { ChevronDown, ChevronRight, Check, Smartphone, Globe, ArrowRight, QrCode, ExternalLink, MessageSquare, Search, Link2, Send, RotateCcw, TrendingDown, Users, Briefcase, MessageCircleReply } from "lucide-react";
import { FeatureCard, StatCard, StepCard } from "@/components/ui/Cards";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";
const path = "/max";

const rub = (value: number) => `${value.toLocaleString("ru-RU")}\u00A0₽`;

/**
 * Бот в MAX подключаем мы: агентству нужен бизнес-аккаунт и передача токена.
 * Поэтому кнопка ведёт сразу в заявку менеджеру, минуя саморегистрацию,
 * и канал MAX в ней уже выбран.
 */
const maxFormPreset = { channelId: "max", path: "request" } as const;

const liteAddon = crossChannelAddons.find((a) => a.planId === "lite")!;
const litePlan = pricingPlans.find((p) => p.id === "lite")!;

export const metadata: Metadata = {
  title: {
    absolute: "ИИ-ассистент турагентства в MAX: бот подбирает туры | Навылет! AI",
  },
  description:
    `Бот турагентства в MAX: подбор туров по Tourvisor в диалоге, подборка и возврат клиентов. Подключение 0 ₽, от ${priceFromLabel}/мес${priceSelectionNote}.`,
  keywords: [
    "ИИ-ассистент в MAX",
    "бот для турагентства в MAX",
    "чат-бот MAX для бизнеса туризм",
    "мессенджер MAX турагентство",
    "MAX для бизнеса чат-бот",
    "бот подбора туров в мессенджере",
    "возврат клиентов в мессенджере",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: "ИИ-ассистент турагентства в MAX — подбор туров и возврат клиентов",
    description:
      `Тот же ассистент, что на сайте, — в чате национального мессенджера. Карточки туров, подборка одной страницей, напоминание замолчавшим и подписка на цену. От ${priceFromLabel}/мес.`,
    url: `${siteUrl}${path}`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ИИ-ассистент турагентства в MAX",
    description:
      `Подбор туров и возврат клиентов в мессенджере MAX. Подключение 0 ₽, от ${priceFromLabel}/мес.`,
    images: ["/og-image.png"],
  },
};

/** Внешние факты о MAX — с источниками внизу страницы. */
const sources = [
  {
    id: 1,
    label:
      "Mediascope, июнь 2026: месячная аудитория MAX в России — 86,2 млн человек старше 12 лет (70% населения), среднесуточная — 69 млн; первое место среди мессенджеров",
    href: "https://www.kommersant.ru/doc/8924412",
    name: "Коммерсантъ, 03.09.2026",
  },
  {
    id: 2,
    label:
      "VK, результаты II квартала 2026: месячная аудитория MAX превысила 108 млн человек, ежедневная за август — 88 млн",
    href: "https://corp.vkcdn.ru/media/files/rus_results_presentation_q2_2026.pdf",
    name: "VK, презентация",
  },
  {
    id: 3,
    label:
      "Федеральный закон № 156-ФЗ от 24.06.2025 о многофункциональном сервисе обмена информацией; распоряжение Правительства № 1880-р: сервис создаётся на базе MAX",
    href: "http://publication.pravo.gov.ru/document/0001202506240021",
    name: "pravo.gov.ru",
  },
  {
    id: 4,
    label:
      "Распоряжение Правительства № 2240-р от 19.08.2025: с 1 сентября 2025 года MAX входит в перечень программ, обязательных для предустановки на смартфоны в России",
    href: "https://ria.ru/20250901/max-2038723229.html",
    name: "РИА Новости",
  },
  {
    id: 5,
    label:
      "Более 150 000 чат-ботов создано в MAX к весне 2026; спрос бизнеса на сложные боты вырос на 35% с начала года",
    href: "https://www.cnews.ru/news/line/2026-05-07_spros_biznesa_na_chat-boty",
    name: "CNews, 07.05.2026",
  },
  {
    id: 6,
    label:
      "Платформа MAX для бизнеса: подключение доступно юрлицам, ИП и самозанятым — резидентам РФ; верификацию проходит руководитель; бот проходит модерацию, лимит — 5 ботов на юрлицо",
    href: "https://dev.max.ru/docs/maxbusiness/connection",
    name: "dev.max.ru",
  },
  {
    id: 7,
    label:
      "Туркомпании в MAX: бот Coral Travel «Коралина», боты и каналы франчайзи Слетать.ру, бот Tourvisor для агентств",
    href: "https://www.coral.ru/news/napravleniya/my-na-svyazi-v-max/",
    name: "Coral Travel",
  },
];

const faqItems = [
  {
    question: "Что такое MAX и зачем турагентству бот именно там?",
    answer:
      "MAX — национальный мессенджер от VK, запущенный в марте 2025 года; по закону № 156-ФЗ на его базе создан многофункциональный сервис обмена информацией, а с 1 сентября 2025 года он предустанавливается на все смартфоны, продаваемые в России. По данным Mediascope, в июне 2026 года им пользовались 86,2 млн россиян в месяц — больше, чем любым другим мессенджером в стране. Для агентства это канал, где клиент уже есть, и где ассистент может написать ему первым: напомнить о подборке или сообщить, что цена на тур упала. В веб-виджете такой возможности нет.",
  },
  {
    question: "Что умеет ИИ-ассистент в MAX?",
    answer:
      "То же, что на сайте: понимает запрос свободным текстом, подбирает туры по базе Tourvisor, показывает карточки с ценами, отвечает про отели и перелёты, собирает контакт и передаёт заявку менеджеру на почту, в U‑ON, Telegram и MAX. Плюс возможности мессенджера: кнопка «Подборка одной страницей» под ответом, а также напоминание замолчавшим и подписка на снижение цены (в «Про» входят обе, в «Лиде» — опциями; в «Заявке» входит напоминание).",
  },
  {
    question: "Как подключить ассистента к MAX и сколько это стоит?",
    answer:
      "Подключение — 0 ₽ на всех тарифах. От агентства нужен аккаунт на платформе MAX для бизнеса: она доступна юрлицам, ИП и самозанятым — резидентам РФ, верификацию проходит руководитель. Созданный там чат-бот принадлежит вам и проходит модерацию платформы, дальше мы подключаем его к ассистенту сами. Любой тариф работает в одном канале на выбор — сайт или MAX; оба вместе подключаются надстройкой «Второй канал»: например, Лайт версии «Лид» с сайтом и MAX стоит 1 480 ₽/мес за 60 диалогов.",
  },
  {
    question: "Как клиенты попадают в бот агентства в MAX?",
    answer:
      "По ссылке или QR-коду: на сайте, в подписи менеджера, на визитке, в рекламе, в офисе. Клиент открывает чат и сразу пишет запрос. Ещё один вход — страница подборки: когда ссылка на подборку истекает, она предлагает вернуться в диалог или написать боту в MAX.",
  },
  {
    question: "Почему возврат клиентов работает только в MAX, а не на сайте?",
    answer:
      "Потому что в мессенджере у ассистента остаётся диалог, куда можно написать: клиент ушёл — чат никуда не делся. В веб-виджете после закрытия вкладки написать некуда. Поэтому напоминание замолчавшим и подписка на снижение цены живут в MAX: в «Про» они входят, в «Лиде» — опциями, в «Заявке» входит напоминание. Это не рассылка по базе: ассистент пишет только в диалог, который клиент сам начал, а подписка на цену включается по его кнопке. Защита от спама встроена: максимум 3 предложения без ответа, стоп перед вылетом, отписка одним словом.",
  },
  {
    question: "А как же Telegram и WhatsApp?",
    answer:
      "Клиентские каналы ассистента — сайт и MAX. В Telegram и MAX приходят и заявки для менеджеров — до 5 чатов в каждом мессенджере, с историей диалога. Мы сосредоточились на MAX как на канале с самой большой аудиторией в России, предустановкой на смартфоны и официальной платформой для бизнеса. Крупные игроки уже там: у Coral Travel в MAX работает бот «Коралина», франчайзи Слетать.ру ведут каналы с ботами подбора, Tourvisor предлагает агентствам бота для сбора заявок.",
  },
  {
    question: "Считается ли диалог в MAX отдельно от сайта?",
    answer:
      "Да, лимит диалогов у каждого канала свой: базовый тариф даёт лимит в одном канале, надстройка «Второй канал» добавляет отдельный лимит во втором по льготной цене. Диалог — обращение одного посетителя к ассистенту (оферта, п. 1.9), сколько бы сообщений в нём ни было.",
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
          name: "Ассистент в MAX",
          item: `${siteUrl}${path}`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}${path}#webpage`,
      url: `${siteUrl}${path}`,
      name: "ИИ-ассистент турагентства в мессенджере MAX",
      description:
        "Бот турагентства в MAX: подбор туров по Tourvisor, подборка одной страницей, возврат замолчавших клиентов. Подключение 0 ₽.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}${path}#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
      citation: sources.map((s) => s.href),
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}${path}#service`,
      name: "ИИ-ассистент турагентства в мессенджере MAX",
      serviceType: "Чат-бот для подбора туров и возврата клиентов в MAX",
      description:
        "Канал MAX ИИ-ассистента «Навылет! AI»: подбор туров по API Tourvisor в диалоге, карточки и подборка одной страницей, заявка менеджеру, а также напоминание замолчавшим и подписка на снижение цены (в «Про» входят обе, в «Лиде» — опциями; в «Заявке» входит напоминание).",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "RU",
      audience: {
        "@type": "BusinessAudience",
        name: "Турагентства и сети агентств",
      },
      isRelatedTo: { "@id": `${siteUrl}/#product` },
      offers: {
        "@type": "Offer",
        price: String(priceFrom),
        priceCurrency: "RUB",
        description:
          `Любой тариф от ${priceFromLabel}/мес работает в MAX как в основном канале. Подключение бота 0 ₽, первый месяц бесплатно.`,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}${path}#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

const maxFeatures = [
  {
    icon: MessageSquare,
    title: "Диалог как с менеджером",
    text: "Клиент пишет в чат свободным текстом — «Египет в ноябре на троих до 250 тысяч». Ассистент уточняет недостающее и не переспрашивает то, что уже сказано.",
    versions: reqVersionPublished ? "все версии" : "обе версии",
  },
  {
    icon: Search,
    title: "Подбор по Tourvisor",
    text: "Поиск по всем туроператорам в реальном времени, карточки с фото, звёздами, питанием и ценой на момент запроса прямо в мессенджере.",
    versions: reqVersionPublished ? "«Лид» и «Про»" : "обе версии",
  },
  {
    icon: Link2,
    title: "Кнопка «Подборка одной страницей»",
    text: "Под ответом ассистента — кнопка, открывающая страницу с турами под брендом агентства: галерея отеля, вкладка «Перелёт», «Обновить цены», «Забронировать».",
    versions: reqVersionPublished ? "«Лид» и «Про»" : "обе версии",
  },
  {
    icon: Send,
    title: "Заявка менеджеру",
    text: "Контакт, запрос и выбранный тур уходят на почту, в U‑ON, Telegram и MAX с историей чата. Клиент остаётся в диалоге, а менеджер может перехватить его и ответить сам прямо из кабинета.",
    versions: reqVersionPublished ? "все версии" : "обе версии",
  },
  {
    icon: RotateCcw,
    title: "Возврат замолчавших",
    text: "Получил подборку и пропал — через сутки ассистент один раз напомнит о себе и предложит обновлённую подборку (~28% отвечают).",
    versions: reqVersionPublished
      ? "«Заявка» и «Про» — входит, «Лид» — 290 ₽/мес"
      : "«Про» — входит, «Лид» — опция 290 ₽/мес",
  },
  {
    icon: TrendingDown,
    title: "Подписка на снижение цены",
    text: "Клиент нажимает кнопку — ассистент следит за туром и пишет, когда цена упала на 5% и больше или появился подходящий отель. Помнит весь запрос из разговора.",
    versions: "«Про» — входит, «Лид» — 490 ₽/мес",
  },
];

const scenario = [
  {
    step: "Вход",
    text: "Клиентка сканирует QR-код на визитке менеджера и пишет в бот агентства: «Турция в октябре, вдвоём, спокойный пляж, до 180 тысяч».",
  },
  {
    step: "Подбор",
    text: "Ассистент уточняет город вылета и ночи, показывает 5 карточек 5★ в Сиде и Белеке и кнопку «Подборка одной страницей». Клиентка пересылает страницу мужу.",
  },
  {
    step: "Пауза",
    text: "Ответа нет сутки. Ассистент пишет один раз: спрашивает, что смущает, и предлагает посмотреть варианты с другими датами. Клиентка отвечает: «Дорого, подождём».",
  },
  {
    step: "Подписка",
    text: "Ассистент предлагает следить за ценой. Через пять дней отель из подборки дешевеет на 8% — клиентка получает одно сообщение с новой ценой.",
  },
  {
    step: "Заявка",
    text: "Она отвечает «берём», оставляет телефон, и заявка с выбранным туром и всей историей уходит менеджеру в CRM. Менеджер звонит и оформляет бронь.",
  },
];

const channelRows = [
  {
    feature: "Где живёт клиент",
    web: "На сайте агентства, пока открыта вкладка",
    max: "В своём мессенджере, чат остаётся навсегда",
  },
  {
    feature: "Ассистент может написать первым",
    web: "Нет",
    max: "Да: напоминание замолчавшим, подписка на цену",
  },
  {
    feature: "Подборка одной страницей",
    web: "Кнопки «Смотреть подборку» и «Поделиться»",
    max: "Кнопка под ответом ассистента",
  },
  {
    feature: "Откуда трафик",
    web: "Поиск, карты, реклама на сайт",
    max: "QR и ссылки: офис, визитки, рассылки, соцсети, сайт",
  },
  {
    feature: "Подключение",
    web: "Одна строка кода",
    max: "Бизнес-аккаунт MAX, дальше подключаем мы",
  },
  {
    feature: "Стоимость",
    web: `Любой тариф от ${priceFromLabel}/мес`,
    max: `Любой тариф от ${priceFromLabel}/мес; вторым каналом — от +${reqVersionPublished ? 390 : 490} ₽/мес`,
  },
];

const connectSteps = [
  {
    title: "Заведите аккаунт на платформе MAX для бизнеса",
    text: "Бот должен принадлежать агентству, а не нам: так клиентская база и история диалогов остаются у вас. Платформа открыта юрлицам, ИП и самозанятым из РФ, верификацию проходит руководитель или лицо с правом подписи. Созданный бот проходит модерацию MAX.",
  },
  {
    title: "Мы подключаем бота к ассистенту",
    text: "Передаёте токен бота — мы связываем его с вашим ассистентом в личном кабинете. Разработчик не нужен, интеграция с Tourvisor и каналами заявок уже настроена.",
  },
  {
    title: "Настраиваете бренд и запускаете",
    text: "Название и аватар бота задаёте на платформе MAX, а приветствие, тон общения, контакты офисов и логотип — в кабинете. Ссылку и QR-код на бота размещаете там, где клиенты вас видят.",
  },
];

export default function MaxPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Navigation />
      <main>
        {/* Hero */}
        <section className="bg-white">
          <div className="mx-auto max-w-4xl px-5 pt-28 pb-12 text-center sm:px-6 sm:pt-32 lg:px-8">
            <nav
              className="mb-5 flex justify-center text-xs text-muted"
              aria-label="Хлебные крошки"
            >
              <Link href="/" className="hover:text-accent">
                Главная
              </Link>
              <ChevronRight className="mx-1 h-4 w-4" />
              <span className="text-body">Ассистент в MAX</span>
            </nav>
            <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
              ИИ-ассистент турагентства в MAX:{" "}
              <span className="text-accent">
                подбор туров и возврат клиентов в мессенджере
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-body sm:text-lg">
              Тот же ассистент «Навылет! AI», что работает на сайте, — в чате
              национального мессенджера. Понимает запрос свободным текстом,
              подбирает туры по базе Tourvisor, отдаёт подборку одной страницей
              и передаёт заявку менеджеру. А главное — может написать клиенту
              первым: напомнить о подборке или сообщить, что цена упала.
              Работает во всех версиях ассистента. Подключение 0 ₽, любой тариф
              от {priceFromLabel}/мес{priceSelectionNote}.
            </p>

            <dl className="mx-auto mt-9 grid max-w-2xl grid-cols-3 gap-2 sm:gap-3">
              {[
                {
                  stat: "86,2 млн",
                  label: "россиян в месяц пользуются MAX¹",
                },
                {
                  stat: "до 40%",
                  label: "замолчавших возвращаются в диалог",
                },
                {
                  stat: `${networkResults.stats[2].value?.toLocaleString("ru-RU")}%`,
                  label: "обращений — вне рабочего времени",
                },
              ].map((s) => (
                <StatCard key={s.label} value={s.stat} label={s.label} compact />
              ))}
            </dl>
            <p className="mt-3 text-xs text-muted">
              ¹ Mediascope, июнь 2026 —{" "}
              <a href="#istochniki" className="underline decoration-muted/40 underline-offset-2 hover:text-accent">
                источники внизу страницы
              </a>
              . Отклик и доля
              ночных обращений — данные сети «Навылет! AI», летний сезон 2026.
            </p>
            <div className="mt-8 flex justify-center">
              <RegisterCta
                source="max_hero"
                primaryLabel="Подключить бота в MAX"
                formPreset={maxFormPreset}
              />
            </div>
          </div>
        </section>

        {/* Почему MAX */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Почему турагентству нужен бот в MAX
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
              <FeatureCard icon={Users} title="Клиенты уже там" stackFrom="lg">
                  В июне 2026 года MAX впервые обошёл все мессенджеры в России
                  по месячной аудитории: 86,2 млн человек, 70% населения старше
                  12 лет, среднесуточно — 69 млн¹. По данным VK, месячная
                  аудитория превысила 108 млн, ежедневная в августе — 88 млн².
                  С 1 сентября 2025 года мессенджер предустанавливается на все
                  смартфоны, продаваемые в стране⁴. Турист, которому вы хотите
                  написать, с высокой вероятностью уже здесь.
              </FeatureCard>
              <FeatureCard icon={Briefcase} title="Турбизнес уже переезжает" stackFrom="lg">
                  К весне 2026 года в MAX создано более 150 000 чат-ботов, а спрос компаний на сложные боты вырос на 35% с начала года⁵.
                  В туризме первыми пришли крупные: бот Coral Travel
                  «Коралина», каналы и боты подбора у франчайзи Слетать.ру, бот
                  Tourvisor для агентств⁷. Платформа для бизнеса открыта
                  юрлицам, ИП и самозанятым⁶ — то есть любому агентству.
              </FeatureCard>
              <FeatureCard icon={MessageCircleReply} title="Мессенджер даёт то, чего нет у сайта" stackFrom="lg">
                  На сайте диалог заканчивается вместе с вкладкой. В MAX чат
                  остаётся, и ассистент может вернуться к клиенту сам:
                  до 40% замолчавших возвращаются в диалог, на напоминание через
                  сутки отвечают около 28%. Это данные наших ассистентов, а не теория.
              </FeatureCard>
            </div>
          </div>
        </section>

        {/* Что умеет */}
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Что делает ассистент в чате MAX
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Один ИИ-движок для сайта и мессенджера: логика подбора, база
              Tourvisor и заявки менеджеру одни и те же. Мессенджер добавляет
              кнопки и возможность написать клиенту первым.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {maxFeatures.map((f) => (
                <FeatureCard key={f.title} icon={f.icon} title={f.title} stackFrom="lg">
                  <p className="text-xs font-semibold text-accent">{f.versions}</p>
                  <p className="mt-1.5">{f.text}</p>
                </FeatureCard>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-muted">
              Все механики возврата с правилами защиты от спама —{" "}
              <Link
                href="/vozvrat-klientov"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                на странице «Возврат клиентов»
              </Link>
              , устройство подборок —{" "}
              <Link
                href="/podborki"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                на странице «Подборки»
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Сценарий */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Как это выглядит для клиента
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Один типичный путь от первого сообщения до брони. Цены условные,
              механика — рабочая.
            </p>
            <ol className="mt-8 space-y-3">
              {scenario.map((s, i) => (
                <li key={s.step}>
                  <StepCard n={i + 1} title={s.step} titleAs="p">
                    {s.text}
                  </StepCard>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Сайт или MAX */}
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Виджет на сайте или бот в MAX: что выбрать
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Сайт ловит тех, кто пришёл из поиска и рекламы. MAX удерживает тех,
              кто уже с вами общался. Агентствам с базой клиентов обычно нужны
              оба — для этого есть надстройка «Второй канал».
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
              <div className="hidden grid-cols-[1fr_1.2fr_1.2fr] gap-4 border-b border-blue-subtle/30 bg-surface-alt px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted sm:grid">
                <span>Критерий</span>
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" /> Виджет на сайте
                </span>
                <span className="inline-flex items-center gap-1.5 text-accent">
                  <Smartphone className="h-3.5 w-3.5" /> Бот в MAX
                </span>
              </div>
              {channelRows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[1fr_1.2fr_1.2fr] sm:gap-4 ${
                    i > 0 ? "border-t border-blue-subtle/30" : ""
                  }`}
                >
                  <div className="font-semibold text-heading">{row.feature}</div>
                  <div className="text-sm text-muted">
                    <span className="mr-1 font-semibold sm:hidden">Сайт:</span>
                    {row.web}
                  </div>
                  <div className="text-sm text-body">
                    <span className="mr-1 font-semibold text-accent sm:hidden">
                      MAX:
                    </span>
                    {row.max}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Подключение и цена */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
                  Как подключить бота в MAX
                </h2>
                <ol className="mt-6 space-y-3">
                  {connectSteps.map((s, i) => (
                    <li key={s.title}>
                      <StepCard n={i + 1} title={s.title}>
                        {s.text}
                      </StepCard>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 flex items-start gap-2 text-sm text-muted">
                  <QrCode className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Совет: разместите QR-код бота на визитках, у кассы и в подписи писем. Клиент, который однажды написал в MAX,
                    остаётся у вас в чатах: ассистент напомнит о его подборке
                    и сообщит, если цена на выбранный тур упадёт.
                  </span>
                </p>
                <p className="mt-3 text-sm text-body">
                  Как завести бота на платформе MAX для партнёров, пройти
                  верификацию и модерацию — по шагам в{"\u00A0"}
                  <Link
                    href="/blog/bot-turagentstva-v-max"
                    className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
                  >
                    инструкции
                  </Link>
                  . Как получать заявки и просьбы позвать менеджера в чаты Telegram и MAX — в{"\u00A0"}
                  <Link
                    href="/blog/uvedomleniya-o-zayavkah-telegram-max"
                    className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
                  >
                    статье про уведомления
                  </Link>
                  .
                </p>
              </div>

              <div className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card">
                <h2 className="font-display text-xl font-bold text-heading">
                  Сколько стоит MAX‑канал
                </h2>
                <p className="mt-2 text-sm text-body">
                  Подключение бота — 0 ₽. Любой тариф работает в MAX как в основном канале:
                </p>
                <div className="mt-4 space-y-2">
                  {assistantVersions.map((v) => (
                    <div
                      key={v.id}
                      className="flex items-baseline justify-between rounded-xl bg-surface-alt px-4 py-2.5 text-sm"
                    >
                      <span className="font-semibold text-heading">
                        {v.fullName}
                      </span>
                      <span className="font-semibold text-accent">
                        от {rub(v.priceFrom)}/мес
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-body">
                  Нужны и сайт, и MAX — добавьте «Второй канал». На тарифе Лайт:{" "}
                  {reqVersionPublished && litePlan.req && liteAddon.req && (
                    <>
                      «Заявка» — {rub(litePlan.req.price)} + {rub(liteAddon.req.addonPrice)} ={" "}
                      <span className="font-semibold text-heading">
                        {rub(liteAddon.req.totalPrice)}/мес за{"\u00A0"}
                        {liteAddon.req.totalDialogs} диалогов
                      </span>
                      ;{" "}
                    </>
                  )}
                  «Лид» — {rub(litePlan.lid.price)} + {rub(liteAddon.lid.addonPrice)} ={" "}
                  <span className="font-semibold text-heading">
                    {rub(liteAddon.lid.totalPrice)}/мес за{"\u00A0"}
                    {liteAddon.lid.totalDialogs} диалогов
                  </span>{" "}
                  ({litePlan.lid.dialogs} на сайте + {liteAddon.lid.extraDialogs} в MAX); «Про» —{" "}
                  {rub(litePlan.price)} + {rub(liteAddon.addonPrice)} = {rub(liteAddon.totalPrice)}/мес за{"\u00A0"}
                  {liteAddon.totalDialogs} диалогов.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-body">
                  {[
                    "Первый месяц бесплатно: 30 дней с первого диалога, до 200 диалогов",
                    "Версия и тариф меняются в кабинете в любой момент",
                    "Заявки — на почту, в U‑ON, Telegram и MAX",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <Check className="h-3 w-3 text-accent" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/tarify"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                >
                  Все тарифы и надстройка «Второй канал»{" "}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <RegisterCta
                source="max_mid"
                primaryLabel="Подключить бота в MAX"
                formPreset={maxFormPreset}
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Вопросы про ассистента в MAX
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
                href="/vozvrat-klientov"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Возврат клиентов подробно <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/versii"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                {reqVersionPublished ? "Версии «Заявка», «Лид» и «Про»" : "Версии «Лид» и «Про»"}{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/chat-bot-dlya-turagentstva"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Чат-бот для турагентства <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Источники */}
            <details id="istochniki" className="group mt-12 scroll-mt-24 rounded-2xl border border-blue-subtle/40 bg-surface-alt p-5">
              <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-sm font-bold text-heading">Источники данных о MAX</h3>
                <ChevronDown className="h-4 w-4 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <ol className="mt-3 space-y-2">
                {sources.map((s) => (
                  <li key={s.id} className="flex gap-2 text-xs text-muted">
                    <span className="shrink-0 font-semibold">{s.id}.</span>
                    <span>
                      {s.label} —{" "}
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 py-1 font-medium text-accent hover:underline"
                      >
                        {s.name}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-xs text-muted">
                Показатели отклика и доли ночных обращений — данные сети
                «Навылет! AI» за летний сезон 2026, обезличенно.
              </p>
            </details>
          </div>
        </section>

        {/* Final CTA */}
        <section
          style={{
            background:
              "linear-gradient(135deg, #001229 0%, #002152 30%, #0062EF 70%, #0097F5 100%)",
          }}
        >
          <div className="mx-auto max-w-3xl px-5 py-14 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Заведите ассистента там, где ваши клиенты
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              Подключение бота в MAX — 0 ₽. Первый месяц бесплатно, без карты.
              Возврат клиентов: в «Про» — входит, в «Лиде» — опцией от 290 ₽/мес, в «Заявке» входит
              напоминание замолчавшим.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta
                source="max_bottom"
                primaryLabel="Подключить бота в MAX"
                formPreset={maxFormPreset}
                compact
                dark
              />
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
