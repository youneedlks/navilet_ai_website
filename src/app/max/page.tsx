import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import RegisterCta from "@/components/seo/RegisterCta";
import {
  crossChannelAddons,
  pricingPlans,
  assistantVersions,
  networkResults,
} from "@/lib/content";
import {
  ChevronRight,
  Check,
  MessageSquare,
  Search,
  Link2,
  RotateCcw,
  TrendingDown,
  Send,
  Smartphone,
  Globe,
  ArrowRight,
  QrCode,
  ExternalLink,
} from "lucide-react";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";
const path = "/max";

const rub = (value: number) => `${value.toLocaleString("ru-RU")}\u00A0₽`;

const lid = assistantVersions.find((v) => v.id === "lid")!;
const pro = assistantVersions.find((v) => v.id === "pro")!;
const liteAddon = crossChannelAddons.find((a) => a.planId === "lite")!;
const litePlan = pricingPlans.find((p) => p.id === "lite")!;

export const metadata: Metadata = {
  title: {
    absolute: "ИИ-ассистент турагентства в MAX: бот подбирает туры | Навылет! AI",
  },
  description:
    "Бот турагентства в мессенджере MAX: подбор туров по Tourvisor в диалоге, подборка одной страницей, возврат замолчавших клиентов. Подключение 0 ₽, от 990 ₽/мес.",
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
    title: "ИИ-ассистент турагентства в MAX — подбор туров и возврат клиентов",
    description:
      "Тот же ассистент, что на сайте, — в чате национального мессенджера. Карточки туров, подборка одной страницей, догоняющие сообщения и подписка на цену. От 990 ₽/мес.",
    url: `${siteUrl}${path}`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ИИ-ассистент турагентства в MAX",
    description:
      "Подбор туров и возврат клиентов в мессенджере MAX. Подключение 0 ₽, от 990 ₽/мес.",
    images: ["/og-image.png"],
  },
};

/** Внешние факты о MAX — с источниками внизу страницы. */
const sources = [
  {
    id: 1,
    label:
      "Mediascope, июнь 2026: месячная аудитория MAX в России — 86,2 млн человек старше 12 лет (70% населения), среднесуточная — 69 млн; первое место среди мессенджеров",
    href: "https://www.kommersant.ru/doc/8924412",
    name: "Коммерсантъ, 03.09.2026",
  },
  {
    id: 2,
    label:
      "VK, результаты II квартала 2026: месячная аудитория MAX превысила 108 млн человек, ежедневная за август — 88 млн",
    href: "https://corp.vkcdn.ru/media/files/rus_results_presentation_q2_2026.pdf",
    name: "VK, презентация",
  },
  {
    id: 3,
    label:
      "Федеральный закон № 156-ФЗ от 24.06.2025 о многофункциональном сервисе обмена информацией; распоряжение Правительства № 1880-р: сервис создаётся на базе MAX",
    href: "http://publication.pravo.gov.ru/document/0001202506240021",
    name: "pravo.gov.ru",
  },
  {
    id: 4,
    label:
      "Распоряжение Правительства № 2240-р от 19.08.2025: с 1 сентября 2025 года MAX входит в перечень программ, обязательных для предустановки на смартфоны в России",
    href: "https://ria.ru/20250901/max-2038723229.html",
    name: "РИА Новости",
  },
  {
    id: 5,
    label:
      "Более 150 000 чат-ботов создано в MAX к весне 2026; спрос бизнеса на сложные боты вырос на 35% с начала года",
    href: "https://www.cnews.ru/news/line/2026-05-07_spros_biznesa_na_chat-boty",
    name: "CNews, 07.05.2026",
  },
  {
    id: 6,
    label:
      "Платформа MAX для бизнеса: подключение доступно юрлицам, ИП и самозанятым — резидентам РФ; верификацию проходит руководитель; бот проходит модерацию, лимит — 5 ботов на юрлицо",
    href: "https://dev.max.ru/docs/maxbusiness/connection",
    name: "dev.max.ru",
  },
  {
    id: 7,
    label:
      "Туркомпании в MAX: бот Coral Travel «Коралина», боты и каналы франчайзи Слетать.ру, бот Tourvisor для агентств",
    href: "https://www.coral.ru/news/napravleniya/my-na-svyazi-v-max/",
    name: "Coral Travel",
  },
];

const faqItems = [
  {
    question: "Что такое MAX и зачем турагентству бот именно там?",
    answer:
      "MAX — национальный мессенджер от VK, запущенный в марте 2025 года; по закону № 156-ФЗ на его базе создан многофункциональный сервис обмена информацией, а с 1 сентября 2025 года он предустанавливается на все смартфоны, продаваемые в России. По данным Mediascope, в июне 2026 года им пользовались 86,2 млн россиян в месяц — больше, чем любым другим мессенджером в стране. Для агентства это канал, где клиент уже есть, и где ассистент может написать ему первым: напомнить о подборке или сообщить, что цена на тур упала. В веб-виджете такой возможности нет.",
  },
  {
    question: "Что умеет ИИ-ассистент в MAX?",
    answer:
      "То же, что на сайте: понимает запрос свободным текстом, подбирает туры по базе Tourvisor, показывает карточки с ценами, отвечает про отели и перелёты, собирает контакт и передаёт заявку менеджеру в CRM, Telegram и на почту. Плюс возможности мессенджера: кнопка «Подборка одной страницей» под ответом, а в версии «Про» — догоняющие сообщения, напоминания и подписка на снижение цены.",
  },
  {
    question: "Как подключить ассистента к MAX и сколько это стоит?",
    answer:
      "Подключение — 0 ₽ на всех тарифах. От агентства нужен аккаунт на платформе MAX для бизнеса: она доступна юрлицам, ИП и самозанятым — резидентам РФ, верификацию проходит руководитель. Созданный там чат-бот принадлежит вам и проходит модерацию платформы, дальше мы подключаем его к ассистенту сами. Любой тариф работает в одном канале на выбор — сайт или MAX; оба вместе подключаются надстройкой «Второй канал»: например, Lite версии «Лид» с сайтом и MAX стоит 1 480 ₽/мес за 60 диалогов.",
  },
  {
    question: "Как клиенты попадают в бот агентства в MAX?",
    answer:
      "По ссылке или QR-коду: на сайте, в подписи менеджера, на визитке, в рекламе, в офисе. Клиент открывает чат и сразу пишет запрос. Ещё один вход — страница подборки: когда ссылка на подборку истекает, она предлагает вернуться в диалог или написать боту в MAX.",
  },
  {
    question: "Почему возврат клиентов работает только в MAX, а не на сайте?",
    answer:
      "Потому что в мессенджере у ассистента остаётся диалог, куда можно написать: клиент ушёл — чат никуда не делся. В веб-виджете после закрытия вкладки написать некуда. Поэтому догоняющие сообщения с откликом до 40%, напоминания через день и умные подписки живут в MAX. Это не рассылка по базе: ассистент пишет только в диалог, который клиент сам начал, а подписка на цену включается по его кнопке. Защита от спама встроена: пауза 3 дня, максимум 3 предложения без ответа, стоп перед вылетом, отписка одним словом.",
  },
  {
    question: "А как же Telegram и WhatsApp?",
    answer:
      "Клиентские каналы ассистента — сайт и MAX. Telegram используется для другого: туда менеджерам приходят готовые заявки с историей диалога. Мы сосредоточились на MAX как на канале с самой большой аудиторией в России, предустановкой на смартфоны и официальной платформой для бизнеса. Крупные игроки уже там: у Coral Travel в MAX работает бот «Коралина», франчайзи Слетать.ру ведут каналы с ботами подбора, Tourvisor предлагает агентствам бота для сбора заявок.",
  },
  {
    question: "Считается ли диалог в MAX отдельно от сайта?",
    answer:
      "Да, лимит диалогов у каждого канала свой: базовый тариф даёт лимит в одном канале, надстройка «Второй канал» добавляет отдельный лимит во втором по льготной цене. Один диалог — уникальная сессия с клиентом за сутки, независимо от числа сообщений.",
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
          name: "Ассистент в MAX",
          item: `${siteUrl}${path}`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}${path}#webpage`,
      url: `${siteUrl}${path}`,
      name: "ИИ-ассистент турагентства в мессенджере MAX",
      description:
        "Бот турагентства в MAX: подбор туров по Tourvisor, подборка одной страницей, возврат замолчавших клиентов. Подключение 0 ₽.",
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
      name: "ИИ-ассистент турагентства в мессенджере MAX",
      serviceType: "Чат-бот для подбора туров и возврата клиентов в MAX",
      description:
        "Канал MAX ИИ-ассистента «Навылет! AI»: подбор туров по API Tourvisor в диалоге, карточки и подборка одной страницей, заявка менеджеру, а в версии «Про» — догоняющие сообщения и подписка на снижение цены.",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "RU",
      audience: {
        "@type": "BusinessAudience",
        name: "Турагентства и сети агентств",
      },
      isRelatedTo: { "@id": `${siteUrl}/#product` },
      offers: {
        "@type": "Offer",
        price: String(lid.priceFrom),
        priceCurrency: "RUB",
        description:
          "Любой тариф от 990 ₽/мес работает в MAX как в основном канале. Подключение бота 0 ₽, первый месяц бесплатно.",
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
    title: "Диалог как с менеджером",
    text: "Клиент пишет в чат свободным текстом — «Египет в ноябре на троих до 250 тысяч». Ассистент уточняет недостающее и не переспрашивает то, что уже сказано.",
    versions: "обе версии",
  },
  {
    icon: Search,
    title: "Подбор по Tourvisor",
    text: "Поиск по всем туроператорам в реальном времени, карточки с фото, звёздами, питанием и ценой на момент запроса прямо в мессенджере.",
    versions: "обе версии",
  },
  {
    icon: Link2,
    title: "Кнопка «Подборка одной страницей»",
    text: "Под ответом ассистента — кнопка, открывающая страницу с турами под брендом агентства: галерея отеля, вкладка «Перелёт», «Обновить цены», «Забронировать».",
    versions: "обе версии",
  },
  {
    icon: Send,
    title: "Заявка менеджеру",
    text: "Контакт, запрос и выбранный тур уходят в CRM, Telegram менеджеров и на почту с историей чата. Клиент остаётся в диалоге и может продолжить.",
    versions: "обе версии",
  },
  {
    icon: RotateCcw,
    title: "Возврат замолчавших",
    text: "Получил подборку и пропал — через 15–120 минут догоняющее сообщение (отклик до 40%), через день напоминание с обновлённой подборкой (~28%).",
    versions: "версия «Про»",
  },
  {
    icon: TrendingDown,
    title: "Подписка на снижение цены",
    text: "Клиент нажимает кнопку — ассистент следит за туром и пишет, когда цена упала на 5% и больше или появился подходящий отель. Помнит весь запрос из разговора.",
    versions: "версия «Про»",
  },
];

const scenario = [
  {
    step: "Вход",
    text: "Клиентка сканирует QR-код на визитке менеджера и пишет в бот агентства: «Турция в октябре, вдвоём, спокойный пляж, до 180 тысяч».",
  },
  {
    step: "Подбор",
    text: "Ассистент уточняет город вылета и ночи, показывает 5 карточек 5★ в Сиде и Белеке и кнопку «Подборка одной страницей». Клиентка пересылает страницу мужу.",
  },
  {
    step: "Пауза",
    text: "Ответа нет два часа. Ассистент пишет один раз: спрашивает, что смущает, и предлагает посмотреть варианты с другими датами. Клиентка отвечает: «Дорого, подождём».",
  },
  {
    step: "Подписка",
    text: "Ассистент предлагает следить за ценой. Через пять дней отель из подборки дешевеет на 8% — клиентка получает одно сообщение с новой ценой.",
  },
  {
    step: "Заявка",
    text: "Она отвечает «берём», оставляет телефон, и заявка с выбранным туром и всей историей уходит менеджеру в CRM. Менеджер звонит и оформляет бронь.",
  },
];

const channelRows = [
  {
    feature: "Где живёт клиент",
    web: "На сайте агентства, пока открыта вкладка",
    max: "В своём мессенджере, чат остаётся навсегда",
  },
  {
    feature: "Ассистент может написать первым",
    web: "Нет",
    max: "Да: догоняющее, напоминание, подписка на цену",
  },
  {
    feature: "Подборка одной страницей",
    web: "Кнопки «Смотреть подборку» и «Поделиться»",
    max: "Кнопка под ответом ассистента",
  },
  {
    feature: "Откуда трафик",
    web: "Поиск, карты, реклама на сайт",
    max: "QR и ссылки: офис, визитки, рассылки, соцсети, сайт",
  },
  {
    feature: "Подключение",
    web: "Одна строка кода",
    max: "Бизнес-аккаунт MAX, дальше подключаем мы",
  },
  {
    feature: "Стоимость",
    web: "Любой тариф от 990 ₽/мес",
    max: "Любой тариф от 990 ₽/мес; вторым каналом — от +490 ₽/мес",
  },
];

const connectSteps = [
  {
    title: "Заведите аккаунт на платформе MAX для бизнеса",
    text: "Бот должен принадлежать агентству, а не нам: так клиентская база и история диалогов остаются у вас. Платформа открыта юрлицам, ИП и самозанятым из РФ, верификацию проходит руководитель или лицо с правом подписи. Созданный бот проходит модерацию MAX.",
  },
  {
    title: "Мы подключаем бота к ассистенту",
    text: "Передаёте токен бота — мы связываем его с вашим ассистентом в личном кабинете. Разработчик не нужен, интеграция с Tourvisor и каналами заявок уже настроена.",
  },
  {
    title: "Настраиваете бренд и запускаете",
    text: "Название, аватар, приветствие, тон общения и контакты офисов — в кабинете. Ссылку и QR-код на бота размещаете там, где клиенты вас видят.",
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
        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
          <div className="relative mx-auto max-w-4xl px-5 pt-28 pb-12 text-center sm:px-6 sm:pt-32 lg:px-8">
            <nav
              className="mb-5 flex justify-center text-xs text-muted"
              aria-label="Хлебные крошки"
            >
              <Link href="/" className="hover:text-accent">
                Главная
              </Link>
              <ChevronRight className="mx-1 h-4 w-4" />
              <span className="text-body">Ассистент в MAX</span>
            </nav>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
              <Smartphone className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold text-accent sm:text-sm">
                Канал MAX · обе версии ассистента
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
              ИИ-ассистент турагентства в MAX:{" "}
              <span className="text-accent">
                подбор туров и возврат клиентов в мессенджере
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-body sm:text-lg">
              Тот же ассистент «Навылет! AI», что работает на сайте, — в чате
              национального мессенджера. Понимает запрос свободным текстом,
              подбирает туры по базе Tourvisor, отдаёт подборку одной страницей
              и передаёт заявку менеджеру. А главное — может написать клиенту
              первым: напомнить о подборке или сообщить, что цена упала.
              Подключение 0 ₽, любой тариф от {rub(lid.priceFrom)}/мес.
            </p>

            <div className="mx-auto mt-9 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  stat: "86,2 млн",
                  label: "россиян в месяц пользуются MAX¹",
                },
                {
                  stat: "до 40%",
                  label: "отклик на догоняющее сообщение",
                },
                {
                  stat: `${networkResults.stats[2].value}%`,
                  label: "обращений — вне рабочего времени",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-blue-subtle/50 bg-white px-3 py-4 shadow-card sm:px-4 sm:py-5"
                >
                  <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
                    {s.stat}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-muted sm:text-sm">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted">
              ¹ Mediascope, июнь 2026 — источники внизу страницы. Отклик и доля
              ночных обращений — данные сети «Навылет! AI», летний сезон 2026.
            </p>
            <div className="mt-8 flex justify-center">
              <RegisterCta source="max_hero" />
            </div>
          </div>
        </section>

        {/* Почему MAX */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Почему турагентству нужен бот в MAX
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
              <div className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card">
                <h3 className="font-display text-base font-bold text-heading">
                  Клиенты уже там
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  В июне 2026 года MAX впервые обошёл все мессенджеры в России
                  по месячной аудитории: 86,2 млн человек, 70% населения старше
                  12 лет, среднесуточно — 69 млн¹. По данным VK, месячная
                  аудитория превысила 108 млн, ежедневная в августе — 88 млн².
                  С 1 сентября 2025 года мессенджер предустанавливается на все
                  смартфоны, продаваемые в стране⁴. Турист, которому вы хотите
                  написать, с высокой вероятностью уже здесь.
                </p>
              </div>
              <div className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card">
                <h3 className="font-display text-base font-bold text-heading">
                  Турбизнес уже переезжает
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  К весне 2026 года в MAX создано более 150 000 чат-ботов, а
                  спрос компаний на сложные боты вырос на 35% с начала года⁵.
                  В туризме первыми пришли крупные: бот Coral Travel
                  «Коралина», каналы и боты подбора у франчайзи Слетать.ру, бот
                  Tourvisor для агентств⁷. Платформа для бизнеса открыта
                  юрлицам, ИП и самозанятым⁶ — то есть любому агентству.
                </p>
              </div>
              <div className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card">
                <h3 className="font-display text-base font-bold text-heading">
                  Мессенджер даёт то, чего нет у сайта
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  На сайте диалог заканчивается вместе с вкладкой. В MAX чат
                  остаётся, и ассистент может вернуться к клиенту сам:
                  догоняющее сообщение приносит отклик до 40%, напоминание
                  через день — около 28%. Это данные наших ассистентов, а не
                  теория.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Что умеет */}
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Что делает ассистент в чате MAX
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Один ИИ-движок для сайта и мессенджера: логика подбора, база
              Tourvisor и заявки менеджеру одни и те же. Мессенджер добавляет
              кнопки и возможность написать клиенту первым.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {maxFeatures.map((f) => (
                <div
                  key={f.title}
                  className="flex flex-col rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
                      <f.icon className="h-4.5 w-4.5 text-accent" />
                    </span>
                    <span className="rounded-full bg-surface-alt px-2.5 py-0.5 text-[11px] font-semibold text-muted">
                      {f.versions}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold text-heading">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">
                    {f.text}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-muted">
              Все механики возврата с правилами защиты от спама —{" "}
              <Link
                href="/vozvrat-klientov"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                на странице «Возврат клиентов»
              </Link>
              , устройство подборок —{" "}
              <Link
                href="/podborki"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                на странице «Подборки»
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Сценарий */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Как это выглядит для клиента
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Один типичный путь от первого сообщения до брони. Цены условные,
              механика — рабочая.
            </p>
            <ol className="mt-8 space-y-3">
              {scenario.map((s, i) => (
                <li
                  key={s.step}
                  className="flex gap-4 rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 font-display text-sm font-bold text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-xs font-bold uppercase tracking-wide text-muted">
                      {s.step}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-body">
                      {s.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Сайт или MAX */}
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Виджет на сайте или бот в MAX: что выбрать
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Сайт ловит тех, кто пришёл из поиска и рекламы. MAX удерживает тех,
              кто уже с вами общался. Агентствам с базой клиентов обычно нужны
              оба — для этого есть надстройка «Второй канал».
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
              <div className="hidden grid-cols-[1fr_1.2fr_1.2fr] gap-4 border-b border-blue-subtle/30 bg-surface-alt px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted sm:grid">
                <span>Критерий</span>
                <span className="inline-flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" /> Виджет на сайте
                </span>
                <span className="inline-flex items-center gap-1.5 text-accent">
                  <Smartphone className="h-3.5 w-3.5" /> Бот в MAX
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
                  Как подключить бота в MAX
                </h2>
                <div className="mt-6 space-y-4">
                  {connectSteps.map((s, i) => (
                    <div
                      key={s.title}
                      className="flex gap-4 rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card"
                    >
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
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 flex items-start gap-2 text-sm text-muted">
                  <QrCode className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    Совет: разместите QR-код бота на визитках, у кассы и в
                    подписи писем. Клиент, который однажды написал в MAX,
                    остаётся у вас в базе — ему можно напомнить о себе, когда
                    появится выгодный тур.
                  </span>
                </p>
              </div>

              <div className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card">
                <h2 className="font-display text-xl font-bold text-heading">
                  Сколько стоит MAX-канал
                </h2>
                <p className="mt-2 text-sm text-body">
                  Подключение бота — 0 ₽. Любой тариф работает в MAX как в
                  основном канале:
                </p>
                <div className="mt-4 space-y-2">
                  {[lid, pro].map((v) => (
                    <div
                      key={v.id}
                      className="flex items-baseline justify-between rounded-xl bg-surface-alt px-4 py-2.5 text-sm"
                    >
                      <span className="font-semibold text-heading">
                        {v.fullName}
                      </span>
                      <span className="font-semibold text-accent">
                        от {rub(v.priceFrom)}/мес
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-body">
                  Нужны и сайт, и MAX — добавьте «Второй канал». На тарифе Lite
                  версии «Лид»: {rub(litePlan.lid.price)} +{" "}
                  {rub(liteAddon.lid.addonPrice)} ={" "}
                  <span className="font-semibold text-heading">
                    {rub(liteAddon.lid.totalPrice)}/мес за{" "}
                    {liteAddon.lid.totalDialogs} диалогов
                  </span>{" "}
                  ({litePlan.lid.dialogs} на сайте + {liteAddon.lid.extraDialogs}{" "}
                  в MAX). В версии «Про»: {rub(litePlan.price)} +{" "}
                  {rub(liteAddon.addonPrice)} = {rub(liteAddon.totalPrice)}/мес
                  за {liteAddon.totalDialogs} диалогов.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-body">
                  {[
                    "Первый месяц бесплатно: 30 дней, до 200 диалогов",
                    "Версия и тариф меняются в кабинете в любой момент",
                    "Заявки — в CRM, Telegram менеджеров и на почту",
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
                  Все тарифы и надстройка «Второй канал»{" "}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <RegisterCta source="max_mid" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Вопросы про ассистента в MAX
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
                Версии «Лид» и «Про» <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/chat-bot-dlya-turagentstva"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Чат-бот для турагентства <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Источники */}
            <div className="mt-12 rounded-2xl border border-blue-subtle/40 bg-surface-alt p-5">
              <h3 className="font-display text-sm font-bold text-heading">
                Источники данных о MAX
              </h3>
              <ol className="mt-3 space-y-2">
                {sources.map((s) => (
                  <li key={s.id} className="flex gap-2 text-xs text-muted">
                    <span className="shrink-0 font-semibold">{s.id}.</span>
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
                Показатели отклика и доли ночных обращений — данные сети
                «Навылет! AI» за летний сезон 2026, обезличенно.
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
              Заведите ассистента там, где ваши клиенты
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              Подключение бота в MAX — 0 ₽. Первый месяц бесплатно, без карты.
              Возврат клиентов — в версии «Про».
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source="max_bottom" compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
