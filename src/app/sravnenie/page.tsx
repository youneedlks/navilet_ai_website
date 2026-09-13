import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import RegisterCta from "@/components/seo/RegisterCta";
import { assistantVersions, trial } from "@/lib/content";
import {
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Bot,
  SlidersHorizontal,
  Blocks,
  Code2,
} from "lucide-react";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";
const path = "/sravnenie";
const checkedAt = "12 сентября 2026";

const rub = (value: number) => `${value.toLocaleString("ru-RU")}\u00A0₽`;
const lid = assistantVersions.find((v) => v.id === "lid")!;
const pro = assistantVersions.find((v) => v.id === "pro")!;

export const metadata: Metadata = {
  title: {
    absolute:
      "ИИ-ассистент, модуль Tourvisor, чат-бот или разработка: сравнение",
  },
  description:
    "Четыре способа автоматизировать подбор туров: ИИ-ассистент с Tourvisor, модуль поиска, конструктор ботов, разработка на заказ. Таблица и цены на сентябрь 2026.",
  keywords: [
    "сравнение ИИ-ассистентов для турагентств",
    "модуль поиска туров или ИИ",
    "Навылет AI сравнение",
    "чат-бот для турагентства сравнение",
    "Tourvisor модуль поиска цена",
    "разработка чат-бота для турагентства цена",
    "Навылет или Noltis",
    "альтернатива модулю Tourvisor",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: "ИИ-ассистент, модуль Tourvisor, чат-бот или разработка на заказ",
    description:
      "Одна таблица: как турист общается, откуда туры и цены, каналы, возврат клиентов, запуск, цена в месяц, разовые платежи и бесплатный период. Данные на сентябрь 2026.",
    url: `${siteUrl}${path}`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Сравнение: ИИ-ассистент, модуль Tourvisor, чат-бот, разработка",
    description:
      "Четыре способа автоматизировать подбор туров — в одной таблице с ценами на сентябрь 2026.",
    images: ["/og-image.png"],
  },
};

type Column = {
  id: "navilet" | "module" | "builder" | "custom";
  title: string;
  subtitle: string;
  icon: typeof Bot;
};

const columns: Column[] = [
  {
    id: "navilet",
    title: "«Навылет! AI»",
    subtitle: "ИИ-ассистент с базой Tourvisor",
    icon: Bot,
  },
  {
    id: "module",
    title: "Модуль поиска туров",
    subtitle: "форма с фильтрами от агрегатора (Tourvisor)",
    icon: SlidersHorizontal,
  },
  {
    id: "builder",
    title: "Конструктор ботов / ИИ-агент",
    subtitle: "универсальный сервис, сценарий собираете сами",
    icon: Blocks,
  },
  {
    id: "custom",
    title: "Разработка на заказ",
    subtitle: "бот под ТЗ у студии или фрилансера",
    icon: Code2,
  },
];

type Row = {
  feature: string;
  navilet: string;
  module: string;
  builder: string;
  custom: string;
};

const rows: Row[] = [
  {
    feature: "Как турист общается",
    navilet:
      "Свободный диалог: «Турция на двоих в сентябре до 200 тысяч» — ассистент уточняет только недостающее",
    module:
      "Заполняет форму: страна, курорт, даты, звёзды, питание — и получает список выдачи",
    builder:
      "ИИ-диалог по загруженным документам или кнопочная анкета «выберите направление → бюджет»",
    custom: "Как опишете в ТЗ; свободная речь — если заложена LLM",
  },
  {
    feature: "Откуда туры и цены",
    navilet:
      "API Tourvisor: 113 туроператоров, цены и наличие на момент запроса",
    module: "Tourvisor — те же данные, тот же агрегатор",
    builder:
      "Живой базы туров нет: ваш каталог или база знаний, подбор «в ручном режиме» менеджером",
    custom:
      "Интеграция с API или парсером туроператоров — отдельная работа и отдельные деньги",
  },
  {
    feature: "Карточки туров в чате",
    navilet: "Да: фото, звёзды, питание, даты, цена, перелёт",
    module: "Да, в выдаче на странице сайта",
    builder: "Нет — только текст или ссылки на ваш сайт",
    custom: "По ТЗ",
  },
  {
    feature: "Консультация по отелю и перелёту",
    navilet:
      "Да: пляж, питание, инфраструктура, рейсы. В «Про» без ограничений, в «Лид» — до 3 ответов, дальше менеджер",
    module: "Карточка отеля в выдаче, без вопросов и ответов",
    builder: "Только то, что вы загрузили в базу знаний",
    custom: "По ТЗ",
  },
  {
    feature: "Заявка менеджеру",
    navilet:
      "В U-ON CRM, Telegram менеджеров и на почту — с контактом, запросом, выбранным туром и историей диалога",
    module: "Онлайн-оплата картой или заявка с сайта агентства",
    builder:
      "Форма контакта в чате, у части сервисов — передача в U-ON, Bitrix24, amoCRM",
    custom: "По ТЗ",
  },
  {
    feature: "Каналы для клиента",
    navilet: "Сайт и мессенджер MAX (оба — через «Второй канал»)",
    module:
      "Сайт. Отдельно — кнопочный бот в MAX и Telegram за 600 ₽/мес: подписка на горящие туры и сбор телефона со ссылкой на поиск",
    builder: "Telegram, VK, MAX, сайт; мессенджеры часто за доплату",
    custom: "Любые, каждый канал — время разработки",
  },
  {
    feature: "Возврат клиентов",
    navilet:
      "В MAX (версия «Про»): догоняющее сообщение, напоминание через день, подписка на снижение цены с памятью запроса",
    module: "Подписка на горящие туры в боте",
    builder: "Рассылки по сценарию — настраиваете и следите за спамом сами",
    custom: "По ТЗ",
  },
  {
    feature: "Запуск",
    navilet: "Регистрация 2 минуты, одна строка кода на сайт или бот в MAX",
    module: "Код модуля на сайт по инструкции агрегатора",
    builder:
      "Сборка сценария или загрузка базы знаний своими силами — от нескольких часов до дней",
    custom: "2–4 недели и дольше, плюс приёмка и правки",
  },
  {
    feature: "Цена в месяц",
    navilet: `от ${rub(lid.priceFrom)} («Лид», 40 диалогов) / от ${rub(pro.priceFrom)} («Про», 30 диалогов)`,
    module:
      "Модуль включён в тарифы Tourvisor «Стандарт», «Всё включено», «Премиум»: 2 200–5 990 ₽/мес",
    builder: "1 900–9 990 ₽/мес в зависимости от лимита сообщений и каналов",
    custom:
      "Инфраструктура и поддержка 10 000–20 000 ₽/мес; расходы на ИИ-модель отдельно",
  },
  {
    feature: "Разовые платежи",
    navilet: "0 ₽",
    module: "В прайсе не указаны",
    builder: "0–1 500 ₽ за подключение",
    custom:
      "49 000–480 000 ₽ за разработку в зависимости от объёма (см. примеры ниже)",
  },
  {
    feature: "Бесплатный период",
    navilet: `${trial.days} дней, ${trial.capLabel}, без карты`,
    module: "10 дней",
    builder: "7–14 дней или бесплатный тариф с жёстким лимитом",
    custom: "Нет — только консультация перед договором",
  },
  {
    feature: "Кто поддерживает",
    navilet: "Входит в подписку: модель, хостинг, обновления, интеграции",
    module: "Агрегатор",
    builder: "Вы: сценарии, база знаний, лимиты, спам-фильтры",
    custom: "Подрядчик: каждая правка — новая задача и счёт",
  },
  {
    feature: "Примеры на рынке",
    navilet: "navilet.ru — цены на этой странице",
    module: "Tourvisor: «Поиск туров», «Бот для турагентства»",
    builder:
      "СуперИнтеллект 2 690–9 990 ₽/мес; NextBot 1 900–19 000 ₽/мес; Нейробот 5 000–10 000 ₽/мес",
    custom:
      "Noltis — от 240 000 ₽ (базовый) и от 480 000 ₽ (полный) плюс инфраструктура от 12 000 ₽/мес; PapAI Soft — от 49 000 ₽ (бот) и от 130 000 ₽ (ИИ) плюс поддержка от 15 000 ₽/мес; студии — 80 000–250 000 ₽",
  },
];

const chooseIf = [
  {
    title: "Вы уже платите за Tourvisor и хотите, чтобы сайт разговаривал",
    text: "ИИ-ассистент не заменяет модуль, а дополняет: данные те же, интерфейс другой. Форма остаётся для тех, кто знает параметры, ассистент забирает тех, кто пришёл с вопросом. Часть агентств через месяц убирает форму — но это ваше решение.",
    href: "/vidzhet",
    label: "Форма или диалог — подробнее",
  },
  {
    title: "Нужен бот только для рассылки горящих туров и сбора телефона",
    text: "Хватит кнопочного бота от агрегатора или конструктора. Подбора туров в диалоге и консультаций там не будет, но и задача другая.",
    href: "/chat-bot-dlya-turagentstva",
    label: "Какие бывают чат-боты",
  },
  {
    title: "У вас своя база туроператоров, 1С и нестандартный процесс брони",
    text: "Тогда разработка на заказ оправдана: интеграции по ТЗ никто, кроме подрядчика, не сделает. Закладывайте 2–4 недели, разовый бюджет от 130 000 ₽ и ежемесячную поддержку.",
    href: "/skolko-stoit",
    label: "Расчёт стоимости и окупаемости",
  },
  {
    title: "Хотите проверить на своих клиентах, не тратя ни рубля",
    text: `Готовый ассистент запускается за 2 минуты и месяц работает бесплатно: ${trial.capLabel}. По итогам месяца у вас будут цифры — сколько диалогов, сколько заявок, во сколько обошёлся лид.`,
    href: "/start",
    label: "Подключить за 2 минуты",
  },
];

const faqItems = [
  {
    question: "Чем ИИ-ассистент «Навылет! AI» отличается от модуля поиска туров Tourvisor?",
    answer:
      "Данные одни — агрегатор Tourvisor с ценами и наличием от 113 туроператоров. Разница в интерфейсе и результате. Модуль — форма с фильтрами: турист сам задаёт страну, даты, звёзды и получает выдачу. Ассистент ведёт диалог: понимает запрос одной фразой, уточняет пожелания, показывает 3–6 подходящих туров, отвечает про отель и перелёт и забирает контакт в разговоре. Форма заявки на сайте конвертирует 1–2% посетителей, диалог с ассистентом — 11–14% по сети «Навылет! AI». Модуль стоит 2 200–5 990 ₽/мес в составе тарифов Tourvisor, ассистент — от 990 ₽/мес.",
  },
  {
    question: "Нужен ли агентству свой договор с Tourvisor, чтобы использовать «Навылет! AI»?",
    answer:
      "Для подбора и показа туров — нет: API Tourvisor подключён на стороне «Навылет! AI», ключи и настройка от вас не требуются. Бронирование по заявке агентство проводит через свои каналы с туроператорами, как обычно. Если у вас уже есть тариф Tourvisor с модулем поиска, ассистент работает рядом с ним.",
  },
  {
    question: "Почему конструктор ИИ-агентов не подходит для подбора туров?",
    answer:
      "Потому что у него нет живой базы туров. Универсальный ИИ-агент отвечает по загруженным документам: расписанию офиса, условиям, описанию направлений. Цены и наличие мест меняются ежедневно, и загрузить их в базу знаний нельзя — на вопрос «сколько стоит Турция на двоих в сентябре» такой бот либо предложит оставить телефон, либо назовёт цифру из старого каталога. Для консультаций по FAQ конструктор подходит, для подбора — нет.",
  },
  {
    question: "Когда разработка бота на заказ оправдана?",
    answer:
      "Когда у агентства или сети нестандартный процесс: собственная база туроператоров без агрегатора, интеграция с 1С или самописной CRM, особая логика брони. По открытым прайсам на сентябрь 2026 разработка ИИ-бота для турагентства стоит от 49 000 до 480 000 ₽ разово плюс 10 000–20 000 ₽ в месяц на инфраструктуру и поддержку, срок — от двух недель. Если процесс типовой, готовый ассистент за 990 ₽/мес закрывает задачу быстрее и дешевле.",
  },
  {
    question: "Можно ли использовать «Навылет! AI» вместе с ботом Tourvisor или конструктором?",
    answer:
      "Технически да, на сайте и в MAX виджеты друг другу не мешают. Практический смысл есть, если задачи разные: например, бот агрегатора рассылает горящие туры подписчикам, а ассистент ведёт диалог и подбирает. Два бота с одинаковой задачей будут конкурировать за внимание туриста.",
  },
  {
    question: "Насколько актуальны цены в сравнении?",
    answer:
      `Цены и условия взяты с открытых страниц сервисов на ${checkedAt}, ссылки на источники — внизу страницы. Поставщики меняют тарифы без предупреждения, поэтому перед решением проверяйте цифры на их сайтах. Цены «Навылет! AI» на этой странице подтягиваются из актуального прайса.`,
  },
];

const sources = [
  {
    label: "Tourvisor — тарифы для турагентств",
    href: "https://tourvisor.ru/b2b/tariffs",
  },
  {
    label: "Tourvisor — модуль «Поиск туров»",
    href: "https://tourvisor.ru/b2b/moduli-dlya-sajtov-turagentstv/poisk-turov",
  },
  {
    label: "Tourvisor — «Бот для турагентства» в MAX и Telegram",
    href: "https://tourvisor.ru/b2b/moduli-dlya-sajtov-turagentstv/bot",
  },
  {
    label: "СуперИнтеллект — тарифы",
    href: "https://superintellect.ru/guides/superintellekt-tarify-i-kak-nachat",
  },
  {
    label: "NextBot — тарифы",
    href: "https://doc.nextbot.ru/price/tariffs",
  },
  {
    label: "Нейробот — решение для туризма",
    href: "https://neurobot.ru/solution/turizm",
  },
  {
    label: "Noltis — ИИ для турагентств",
    href: "https://noltis.ru/product/ai-dlya-turagentstv/",
  },
  {
    label: "PapAI Soft — тарифы",
    href: "https://papaisoft.com/tarify/",
  },
  {
    label: "BotHelp — сколько стоит разработка чат-бота",
    href: "https://bothelp.io/ru/blog/skolko-stoit-razrabotka-chat-bota",
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
          name: "Сравнение с альтернативами",
          item: `${siteUrl}${path}`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}${path}#webpage`,
      url: `${siteUrl}${path}`,
      name: "Сравнение: ИИ-ассистент, модуль поиска Tourvisor, конструктор чат-ботов и разработка на заказ",
      description:
        "Четыре способа автоматизировать подбор туров на сайте турагентства в одной таблице: интерфейс, источник туров, каналы, возврат клиентов, запуск, цены на сентябрь 2026.",
      inLanguage: "ru-RU",
      dateModified: "2026-09-12",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}${path}#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
      citation: sources.map((s) => s.href),
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

export default function SravneniePage() {
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
          <div className="relative mx-auto max-w-4xl px-5 pt-28 pb-10 text-center sm:px-6 sm:pt-32 lg:px-8">
            <nav
              className="mb-5 flex justify-center text-xs text-muted"
              aria-label="Хлебные крошки"
            >
              <Link href="/" className="hover:text-accent">
                Главная
              </Link>
              <ChevronRight className="mx-1 h-4 w-4" />
              <span className="text-body">Сравнение</span>
            </nav>
            <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
              ИИ-ассистент, модуль Tourvisor, чат-бот или разработка:{" "}
              <span className="text-accent">что выбрать турагентству</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-body sm:text-lg">
              Автоматизировать подбор туров на сайте можно четырьмя способами.
              Ниже — одна таблица по одинаковым критериям: как общается турист,
              откуда берутся цены, куда уходит заявка, что с возвратом клиентов,
              сколько стоит запуск и месяц работы. Цены конкурентов — по
              открытым прайсам на {checkedAt}, ссылки внизу.
            </p>
          </div>
        </section>

        {/* Таблица */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
            {/* Шапка колонок — только на широких экранах */}
            <div className="hidden lg:grid lg:grid-cols-[180px_repeat(4,1fr)] lg:gap-3">
              <div />
              {columns.map((c) => (
                <div
                  key={c.id}
                  className={`rounded-2xl border p-4 ${
                    c.id === "navilet"
                      ? "border-accent/30 bg-blue-ice/60"
                      : "border-blue-subtle/40 bg-white"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                    <c.icon className="h-4 w-4 text-accent" />
                  </span>
                  <p className="mt-2 font-display text-sm font-bold text-heading">
                    {c.title}
                  </p>
                  <p className="text-xs text-muted">{c.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
              {rows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-1 gap-3 px-4 py-4 lg:grid-cols-[180px_repeat(4,1fr)] lg:gap-3 lg:px-3 ${
                    i > 0 ? "border-t border-blue-subtle/30" : ""
                  }`}
                >
                  <div className="font-display text-sm font-bold text-heading lg:pt-1">
                    {row.feature}
                  </div>
                  {columns.map((c) => (
                    <div
                      key={c.id}
                      className={`rounded-xl px-3 py-2 text-sm leading-relaxed ${
                        c.id === "navilet"
                          ? "bg-blue-ice/50 text-heading"
                          : "text-body"
                      }`}
                    >
                      <span className="mr-1 font-semibold text-muted lg:hidden">
                        {c.title}:
                      </span>
                      {row[c.id]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Сравнение составлено по открытым материалам сайтов поставщиков на{" "}
              {checkedAt}. Не является рекламой сторонних продуктов и не
              претендует на полноту их функций: условия и цены меняются,
              проверяйте на сайтах поставщиков. Цены «Навылет! AI» —
              актуальный прайс, конверсия и отклик — данные сети партнёров за
              летний сезон 2026.
            </p>
          </div>
        </section>

        {/* Что выбрать */}
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Что выбрать, если…
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {chooseIf.map((c) => (
                <div
                  key={c.title}
                  className="flex flex-col rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card"
                >
                  <h3 className="font-display text-base font-bold text-heading">
                    {c.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-body">
                    {c.text}
                  </p>
                  <Link
                    href={c.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                  >
                    {c.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <RegisterCta source="sravnenie_mid" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Вопросы про выбор решения
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
                href="/versii"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Версии «Лид» и «Про» <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/integraciya-tourvisor"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Как устроена интеграция с Tourvisor{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/blog/skolko-stoit-ii-dlya-turagentstva"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Статья: сколько стоит ИИ для турагентства{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Источники */}
            <div className="mt-12 rounded-2xl border border-blue-subtle/40 bg-white p-5">
              <h3 className="font-display text-sm font-bold text-heading">
                Источники цен и условий (проверено {checkedAt})
              </h3>
              <ul className="mt-3 grid grid-cols-1 gap-y-1.5 sm:grid-cols-2 sm:gap-x-6">
                {sources.map((s) => (
                  <li key={s.href} className="text-xs text-muted">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                    >
                      {s.label}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </li>
                ))}
              </ul>
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
              Сравните на своих клиентах — бесплатно
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              Месяц работы ассистента без карты и без разовых платежей. Через
              30 дней у вас будут свои цифры вместо таблицы.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source="sravnenie_bottom" compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
