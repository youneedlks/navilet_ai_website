import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import RegisterCta from "@/components/seo/RegisterCta";
import {
  costAlternatives,
  assistantVersions,
  networkResults,
  trial,
} from "@/lib/content";
import {
  ChevronRight,
  Check,
  X,
  MessageSquare,
  Search,
  LayoutGrid,
  Send,
  Globe,
  ArrowRight,
  Bot,
  Smartphone,
} from "lucide-react";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";
const path = "/chat-bot-dlya-turagentstva";

const rub = (value: number) => `${value.toLocaleString("ru-RU")}\u00A0₽`;

const lid = assistantVersions.find((v) => v.id === "lid")!;
const pro = assistantVersions.find((v) => v.id === "pro")!;

export const metadata: Metadata = {
  title: {
    absolute: "Чат-бот для турагентства с подбором туров — от 990 ₽ | Навылет! AI",
  },
  description:
    "Чат-бот для турагентства на ИИ: понимает свободную речь, подбирает туры по базе Tourvisor, отдаёт заявку менеджеру. На сайте и в MAX. От 990 ₽/мес, месяц бесплатно.",
  keywords: [
    "чат-бот для турагентства",
    "чат-бот турагентство",
    "чат-бот для туристического агентства",
    "бот для подбора туров",
    "чат-бот для турфирмы",
    "ИИ чат-бот туризм",
    "чат-бот на сайт турагентства",
    "бот турагентства в MAX",
  ],
  alternates: { canonical: path },
  openGraph: {
    title: "Чат-бот для турагентства с подбором туров — от 990 ₽/мес",
    description:
      "Не кнопочный сценарий, а ИИ-ассистент: живой диалог, туры с ценами Tourvisor, заявка менеджеру в CRM. Сайт и MAX. Первый месяц бесплатно.",
    url: `${siteUrl}${path}`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Чат-бот для турагентства с подбором туров — от 990 ₽/мес",
    description:
      "ИИ-чат-бот: свободная речь, туры с живыми ценами, заявка в CRM. Сайт и MAX. Месяц бесплатно.",
    images: ["/og-image.png"],
  },
};

const faqItems = [
  {
    question: "Сколько стоит чат-бот для турагентства?",
    answer:
      "Готовый ИИ-чат-бот «Навылет! AI» стоит от 990 ₽ в месяц: это версия «Лид» на 40 диалогов с подбором туров по базе Tourvisor и передачей заявки менеджеру. Версия «Про» с консультациями без ограничений и возвратом клиентов — от 1 990 ₽/мес. Подключение 0 ₽, первый месяц бесплатно. Для сравнения: конструктор кнопочных ботов стоит от 899 ₽/мес без базы туров, а разработка бота под заказ — 80 000–250 000 ₽ плюс поддержка.",
  },
  {
    question: "Чем ИИ-чат-бот отличается от обычного кнопочного бота?",
    answer:
      "Кнопочный бот ведёт клиента по заранее нарисованному сценарию и ломается на любом свободном вопросе. ИИ-чат-бот построен на языковой модели: понимает фразу «Турция на двоих в сентябре, всё включено, до 200 тысяч» целиком, задаёт только недостающие уточнения и ищет туры по живой базе туроператоров. Он отвечает на вопросы про пляж, питание и перелёт, а не предлагает «нажмите 1».",
  },
  {
    question: "Чат-бот умеет подбирать туры с реальными ценами?",
    answer:
      "Да. Ассистент подключён к API агрегатора Tourvisor: 50+ стран, 500+ курортов, тысячи отелей. В диалоге клиент получает карточки туров с фото, звёздностью, питанием, датами и ценой на момент запроса. Цены, даты и наличие берутся только из API — 15+ автокорректоров не дают модели ничего выдумать.",
  },
  {
    question: "Нужен ли программист, чтобы поставить чат-бота на сайт?",
    answer:
      "Нет. Виджет подключается одной строкой кода перед закрывающим тегом </body> — как счётчик Метрики. Инструкции есть для Tilda, WordPress, 1С-Битрикс, Wix и других платформ. Сценарии рисовать не нужно: ассистент уже обучен туристике, в кабинете настраиваются бренд, тон общения, контакты и база знаний агентства.",
  },
  {
    question: "В каких мессенджерах работает чат-бот турагентства?",
    answer:
      "Клиенты общаются с ассистентом на сайте агентства и в мессенджере MAX. Любой тариф работает в одном канале на выбор, оба канала сразу подключаются надстройкой «Второй канал» — от 490 ₽/мес в версии «Лид». Заявки менеджерам при этом приходят в CRM, Telegram и на почту.",
  },
  {
    question: "Куда попадают заявки из чат-бота?",
    answer:
      "Заявка с именем, телефоном, направлением, датами, бюджетом и выбранным туром уходит в CRM агентства, в Telegram менеджеров и дублем на почту. Полная история диалога прикладывается — менеджер начинает разговор с конкретного предложения. Если один из каналов недоступен, лид всё равно доходит по остальным.",
  },
  {
    question: "Как чат-бот обращается с персональными данными туристов?",
    answer:
      "Разработчик — российская компания ООО «ИИМПАКТ ПЛЮС», диалоги обрабатываются на серверах в РФ по 152-ФЗ. Персональные данные псевдонимизируются перед отправкой в языковую модель, подписывается ДПУ. Виджет не сохраняет данные без согласия пользователя.",
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
          name: "Чат-бот для турагентства",
          item: `${siteUrl}${path}`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}${path}#webpage`,
      url: `${siteUrl}${path}`,
      name: "Чат-бот для турагентства с подбором туров на ИИ",
      description:
        "ИИ-чат-бот для турагентства: свободный диалог, подбор туров по базе Tourvisor, заявка менеджеру в CRM. Работает на сайте и в MAX. От 990 ₽/мес.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}${path}#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}${path}#service`,
      name: "Чат-бот для турагентства на базе ИИ-ассистента «Навылет! AI»",
      serviceType: "ИИ-чат-бот для подбора туров и приёма заявок",
      description:
        "Чат-бот нового поколения для турагентства: понимает свободную речь, подбирает туры по API Tourvisor, консультирует по отелям и передаёт заявку менеджеру. Каналы: виджет на сайте и мессенджер MAX.",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "RU",
      audience: {
        "@type": "BusinessAudience",
        name: "Турагентства, сети агентств и туроператоры",
      },
      isRelatedTo: { "@id": `${siteUrl}/#product` },
      offers: {
        "@type": "Offer",
        price: String(lid.priceFrom),
        priceCurrency: "RUB",
        description:
          "Версия «Лид» — от 990 ₽/мес за 40 диалогов, подключение 0 ₽, первый месяц бесплатно.",
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

/** Чего турист ждёт от чат-бота агентства — и что из этого умеет кнопочный бот. */
const requirements = [
  {
    title: "Понимает свободную речь",
    text: "«Хочу как в прошлом году, только дешевле и с ребёнком» — один запрос, а не десять кнопок.",
    scripted: false,
  },
  {
    title: "Подбирает туры по живой базе",
    text: "Реальные цены и наличие от туроператоров на момент запроса, а не заглушка «менеджер перезвонит».",
    scripted: false,
  },
  {
    title: "Показывает карточки с фото и ценой",
    text: "Отель, звёзды, питание, даты, перелёт — готовая витрина, которую можно переслать семье.",
    scripted: false,
  },
  {
    title: "Отвечает про пляж, питание и визу",
    text: "Вопросы после подборки — самое частое место, где турист уходит. Бот должен отвечать по данным отеля.",
    scripted: false,
  },
  {
    title: "Забирает контакт и отдаёт заявку",
    text: "Имя, телефон, запрос и выбранный тур — в CRM и менеджеру, а не в лог чата.",
    scripted: true,
  },
  {
    title: "Работает ночью и в выходные",
    text: `${networkResults.stats[2].value}% обращений приходят вне рабочего времени — бот и нужен ровно для них.`,
    scripted: true,
  },
];

const steps = [
  {
    icon: MessageSquare,
    title: "Турист пишет как человеку",
    text: "«Турция на двоих в конце сентября, всё включено, до 200 тысяч». Ассистент понимает запрос целиком и спрашивает только то, чего не хватает: город вылета, количество ночей.",
  },
  {
    icon: Search,
    title: "Поиск по Tourvisor в реальном времени",
    text: "Запрос уходит в API агрегатора: все туроператоры одновременно, фильтры по 20+ параметрам. Ответ — за 3–30 секунд.",
  },
  {
    icon: LayoutGrid,
    title: "Карточки туров и консультация",
    text: "Клиент видит отели с фото, рейтингом, питанием и ценой, спрашивает про пляж и перелёт — ассистент отвечает по данным отеля и предлагает подборку одной страницей.",
  },
  {
    icon: Send,
    title: "Заявка менеджеру",
    text: "Контакт и полный запрос уходят в CRM, Telegram и на почту вместе с историей диалога. Менеджер звонит тёплому клиенту с готовым предложением.",
  },
];

const sampleDialog = [
  {
    from: "client",
    text: "Хотим в Турцию на двоих в конце сентября, всё включено, бюджет до 200 тысяч. Вылет из Москвы.",
  },
  {
    from: "bot",
    text: "Отлично, подберу варианты. На сколько ночей смотрим — 7 или 10? И есть ли пожелания по курорту: Сиде, Белек, Кемер?",
  },
  { from: "client", text: "7 ночей, лучше спокойный пляж." },
  {
    from: "bot",
    text: "Нашёл 6 туров 5★ «всё включено» в Сиде и Белеке от 168 000 ₽ за двоих с вылетом 24–27 сентября. Первые три — с песчаным пляжем и первой линией. Показать подборку одной страницей или сразу забронировать понравившийся?",
  },
];

export default function ChatBotPage() {
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
              <span className="text-body">Чат-бот для турагентства</span>
            </nav>
            <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
              Чат-бот для турагентства,{" "}
              <span className="text-accent">
                который подбирает туры, а не показывает кнопки
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-body sm:text-lg">
              «Навылет! AI» — чат-бот нового поколения на языковой модели.
              Понимает свободную речь, ищет туры по живой базе Tourvisor,
              отвечает про отели и перелёты и передаёт менеджеру готовую
              заявку с контактом. Работает на сайте и в мессенджере MAX,
              круглосуточно. От {rub(lid.priceFrom)}/мес, первый месяц
              бесплатно.
            </p>

            <div className="mx-auto mt-9 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { stat: "3–30 сек", label: "ответ с подбором туров" },
                {
                  stat: `${networkResults.stats[2].value}%`,
                  label: "обращений — вне рабочего времени",
                },
                {
                  stat: networkResults.stats[3].display!,
                  label: "диалогов становятся заявкой",
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
              Данные сети «Навылет! AI»: 30+ ассистентов на сайтах партнёров и
              в мессенджерах, летний сезон 2026.
            </p>
            <div className="mt-8 flex justify-center">
              <RegisterCta source="chatbot_hero" />
            </div>
          </div>
        </section>

        {/* Требования к боту */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Каким должен быть чат-бот турагентства в 2026 году
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Турист не мыслит кнопками. Он сомневается, сравнивает, спрашивает
              про пляж и меняет даты. Шесть вещей, без которых бот на сайте
              агентства не приносит заявок — и что из этого умеет кнопочный
              сценарий.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {requirements.map((r) => (
                <div
                  key={r.title}
                  className="rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card"
                >
                  <h3 className="font-display text-base font-bold text-heading">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">
                    {r.text}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
                    <span className="inline-flex items-center gap-1 text-muted">
                      {r.scripted ? (
                        <Check className="h-3.5 w-3.5 text-muted" />
                      ) : (
                        <X className="h-3.5 w-3.5 text-red-400" />
                      )}
                      кнопочный бот
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-accent">
                      <Check className="h-3.5 w-3.5" />
                      «Навылет! AI»
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Как работает + пример диалога */}
        <section className="bg-surface">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Как чат-бот «Навылет! AI» ведёт клиента к заявке
            </h2>
            <div className="mt-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
              <div className="space-y-4">
                {steps.map((s, i) => (
                  <div
                    key={s.title}
                    className="flex gap-4 rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <s.icon className="h-5 w-5 text-accent" />
                    </span>
                    <div>
                      <p className="font-display text-xs font-bold text-muted">
                        Шаг {i + 1}
                      </p>
                      <h3 className="mt-0.5 font-display text-base font-bold text-heading">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-body">
                        {s.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card sm:p-6">
                <div className="mb-4 flex items-center gap-2 border-b border-blue-subtle/30 pb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                    <Bot className="h-4 w-4 text-accent" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-heading">
                      Ассистент вашего агентства
                    </p>
                    <p className="text-xs text-muted">
                      пример диалога, цены условные
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {sampleDialog.map((m, i) => (
                    <li
                      key={i}
                      className={`flex ${
                        m.from === "client" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <p
                        className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                          m.from === "client"
                            ? "rounded-br-md bg-accent text-white"
                            : "rounded-bl-md bg-surface-alt text-body"
                        }`}
                      >
                        {m.text}
                      </p>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo"
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                >
                  Открыть живое демо без регистрации{" "}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Четыре типа ботов */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Какие бывают чат-боты для турагентства — и почём
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Под словом «бот» продают четыре разных продукта. Сравнение по
              задаче «подобрать тур и получить заявку», цены — рыночные оценки
              по открытым прайсам на 2026 год.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
              {costAlternatives
                .filter((a) => !a.title.startsWith("Ещё один менеджер"))
                .map((a, i) => (
                  <div
                    key={a.title}
                    className={`grid grid-cols-1 gap-2 px-5 py-5 sm:grid-cols-[1.1fr_0.8fr_1.6fr] sm:items-start sm:gap-5 ${
                      i > 0 ? "border-t border-blue-subtle/30" : ""
                    } ${a.highlight ? "bg-blue-ice/50" : ""}`}
                  >
                    <div className="font-semibold text-heading">{a.title}</div>
                    <div>
                      <div
                        className={`font-display text-sm font-bold ${
                          a.highlight ? "text-accent" : "text-body"
                        }`}
                      >
                        {a.price}
                      </div>
                      <div className="text-xs text-muted">{a.priceNote}</div>
                    </div>
                    <div className="text-sm leading-relaxed text-muted">
                      {a.limits}
                    </div>
                  </div>
                ))}
            </div>
            <p className="mt-4 text-center text-sm text-muted">
              Подробный разбор с расчётом окупаемости — на странице{" "}
              <Link
                href="/skolko-stoit"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                «Сколько стоит ИИ-ассистент»
              </Link>
              , сравнение с модулем Tourvisor и разработкой на заказ —{" "}
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

        {/* Каналы */}
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Где работает чат-бот: сайт и MAX
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Один ИИ-движок, два канала общения с туристом. Любой тариф
              работает в одном из них, оба сразу — через надстройку «Второй
              канал».
            </p>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <Globe className="h-5 w-5 text-accent" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-heading">
                  Виджет на сайте агентства
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Одна строка кода перед <code>&lt;/body&gt;</code> — и бот
                  встречает каждого посетителя. Логотип, цвета, приветствие и
                  позиция окна настраиваются в кабинете, сторонних упоминаний
                  нет. Инструкции для Tilda, WordPress, 1С-Битрикс, Wix и
                  других платформ.
                </p>
                <Link
                  href="/vidzhet"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                >
                  Установка виджета по платформам{" "}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                  <Smartphone className="h-5 w-5 text-accent" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-heading">
                  Бот в мессенджере MAX
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  Тот же ассистент в чате MAX от VK. Клиент получает карточки
                  туров и подборку одной страницей прямо в мессенджере, а в
                  версии «Про» ассистент сам возвращает замолчавших клиентов:
                  догоняющие сообщения и подписка на снижение цены.
                </p>
                <Link
                  href="/max"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                >
                  Как работает ассистент в MAX{" "}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Версии и цена */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Две версии чат-бота: «Лид» и «Про»
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Движок один, режим работы разный. Версия меняется в кабинете в
              любой момент, первый месяц бесплатный на любой из них.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[lid, pro].map((v) => (
                <div
                  key={v.id}
                  className="flex flex-col rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-lg font-bold text-heading">
                      {v.fullName}
                    </h3>
                    <span className="font-display text-base font-bold text-accent">
                      от {rub(v.priceFrom)}/мес
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-body">{v.tagline}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {v.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-body"
                      >
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                          <Check className="h-3 w-3 text-accent" />
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              <Link
                href="/versii"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Полное сравнение версий <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/tarify"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Все тарифы <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              {trial.label}, {trial.capLabel}, карта не нужна. Подключение 0 ₽
              на всех тарифах.
            </p>
            <div className="mt-8 flex justify-center">
              <RegisterCta source="chatbot_mid" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Вопросы про чат-бота для турагентства
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
                href="/blog/chat-bot-vs-ii-assistent"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Статья: чат-бот или ИИ-ассистент{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/resheniya/chat-bot-ne-rabotaet"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Кнопочный бот не приносит заявок{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/integraciya-tourvisor"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Откуда берутся туры и цены{" "}
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
              Поставьте чат-бота, который продаёт туры
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              Регистрация за 2 минуты, одна строка кода на сайт. 30 дней и до
              200 диалогов — бесплатно, без карты.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source="chatbot_bottom" compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
