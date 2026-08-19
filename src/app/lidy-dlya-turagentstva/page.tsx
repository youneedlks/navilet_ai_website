import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import RegisterCta from "@/components/seo/RegisterCta";
import { pricingPlans } from "@/lib/content";
import {
  ChevronRight,
  Check,
  MessageSquare,
  Search,
  PhoneCall,
  Send,
  ArrowRight,
} from "lucide-react";
import { jsonLdScript } from "@/lib/schema";
import { versionIcons } from "@/lib/version-icons";

const siteUrl = "https://navilet.ru";
const LidIcon = versionIcons.lid;

/** Цена с неразрывным пробелом: «1 990 ₽» не рвётся по строкам. */
const rub = (value: number) => `${value.toLocaleString("ru-RU")}\u00A0₽`;

const lidPlans = pricingPlans.map((p) => ({
  name: p.name,
  price: p.lid.price,
  dialogs: p.lid.dialogs,
}));
const minLid = Math.min(...lidPlans.map((p) => p.price));

export const metadata: Metadata = {
  title: {
    absolute: "Лиды для турагентства — от 219 ₽ за заявку | Навылет! AI",
  },
  description:
    "Квалифицированные лиды для турагентства по 219–540 ₽ вместо 1 500–5 000 ₽ из рекламы: ИИ-ассистент конвертирует трафик вашего сайта в заявки с контактом и готовым запросом. Версия «Лид» — от 990 ₽/мес, первый месяц бесплатно.",
  keywords: [
    "лиды для турагентства",
    "лидогенерация турагентство",
    "клиенты для турагентства",
    "где брать заявки турагентству",
    "заявки на туры",
    "стоимость лида туризм",
    "лидогенерация в туризме",
  ],
  alternates: { canonical: "/lidy-dlya-turagentstva" },
  openGraph: {
    title: "Лиды для турагентства — от 219 ₽ за заявку",
    description:
      "ИИ-ассистент превращает трафик вашего сайта в квалифицированные заявки: контакт, направление, даты, бюджет. От 990 ₽/мес, первый месяц бесплатно.",
    url: `${siteUrl}/lidy-dlya-turagentstva`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Лиды для турагентства — от 219 ₽ за заявку",
    description:
      "Квалифицированные заявки из трафика вашего сайта. Версия «Лид» — от 990 ₽/мес, первый месяц бесплатно.",
    images: ["/og-image.png"],
  },
};

const faqItems = [
  {
    question: "Сколько стоит лид для турагентства из ИИ-ассистента?",
    answer:
      "По сети «Навылет! AI» стоимость квалифицированного лида составляет 219–540 ₽: месячная подписка делится на число полученных заявок. Для сравнения: лид из контекстной и таргетированной рекламы в туризме стоит 1 500–5 000 ₽ — в 4–25 раз дороже.",
  },
  {
    question: "Чем это отличается от покупки лидов на бирже?",
    answer:
      "Лид с биржи — чужой контакт, который часто продаётся нескольким агентствам сразу, и вы конкурируете за клиента с коллегами. Лид из ассистента — человек, который сам пришёл на ваш сайт, пообщался под вашим брендом, посмотрел туры по живым ценам и осознанно оставил контакт. Он принадлежит только вам.",
  },
  {
    question: "Что считается квалифицированным лидом?",
    answer:
      "Заявка с именем, телефоном и сформулированным запросом: направление, даты, бюджет, состав поездки — плюс подобранные в диалоге туры и полная история переписки. Менеджер начинает разговор с конкретного предложения, а не с «чем вам помочь».",
  },
  {
    question: "Что нужно, чтобы лидогенерация заработала?",
    answer:
      "Сайт с минимальным живым трафиком (от 300–500 посетителей в месяц) или канал в MAX-мессенджере. Виджет подключается одной строкой кода за пару минут, без разработчика. Версия «Лид» стоит от 990 ₽/мес, первый месяц бесплатно — до 200 диалогов включено.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/lidy-dlya-turagentstva#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Лиды для турагентства",
          item: `${siteUrl}/lidy-dlya-turagentstva`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/lidy-dlya-turagentstva#webpage`,
      url: `${siteUrl}/lidy-dlya-turagentstva`,
      name: "Лиды для турагентства: квалифицированные заявки от 219 ₽",
      description:
        "ИИ-ассистент конвертирует трафик сайта турагентства в квалифицированные заявки с контактом и готовым запросом. CPL 219–540 ₽ против 1 500–5 000 ₽ из рекламы.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/lidy-dlya-turagentstva#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/lidy-dlya-turagentstva#service`,
      name: "Лидогенерация для турагентства через ИИ-ассистента",
      serviceType: "Генерация квалифицированных лидов для турагентств",
      description:
        "Версия «Лид» ИИ-ассистента «Навылет! AI»: живой диалог с посетителем сайта, подбор туров по базе Tourvisor и готовая заявка менеджеру с контактом и запросом. Стоимость квалифицированного лида по сети — 219–540 ₽.",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "RU",
      audience: {
        "@type": "BusinessAudience",
        name: "Турагентства и туроператоры",
      },
      isRelatedTo: { "@id": `${siteUrl}/#product` },
      offers: {
        "@type": "Offer",
        price: String(minLid),
        priceCurrency: "RUB",
        description:
          "Версия «Лид» — от 990 ₽/мес за 40 диалогов, первый месяц бесплатно (до 200 диалогов), подключение 0 ₽.",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/lidy-dlya-turagentstva#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

const channels = [
  {
    name: "Контекст и таргет",
    cpl: "1 500–5 000 ₽",
    risk: "Дорого, лид «холодный» — только клик и телефон",
    ours: false,
  },
  {
    name: "Биржи лидов",
    cpl: "от сотен ₽",
    risk: "Контакт продан нескольким агентствам сразу",
    ours: false,
  },
  {
    name: "Сарафан",
    cpl: "≈ 0 ₽",
    risk: "Не масштабируется по кнопке",
    ours: false,
  },
  {
    name: "Агрегаторы туров",
    cpl: "комиссия с продажи",
    risk: "База клиентов копится у площадки, а не у вас",
    ours: false,
  },
  {
    name: "Свой сайт + ИИ-ассистент",
    cpl: "219–540 ₽",
    risk: "Нужен минимальный трафик на сайт",
    ours: true,
  },
];

const leadSteps = [
  {
    icon: MessageSquare,
    title: "Посетитель пишет в виджет",
    text: "Люди уже приходят на ваш сайт — по картам, отзывам, сарафану. Ассистент встречает каждого мгновенно, в том числе ночью и в выходные.",
  },
  {
    icon: Search,
    title: "Диалог и подбор по живой базе",
    text: "Ассистент уточняет направление, даты, бюджет и состав, подбирает туры по базе Tourvisor и отвечает на вопросы об отелях и перелётах.",
  },
  {
    icon: PhoneCall,
    title: "Контакт с первого сообщения",
    text: "Версия «Лид» просит телефон в начале диалога — даже если клиент уйдёт «подумать», контакт и запрос останутся у вас.",
  },
  {
    icon: Send,
    title: "Заявка менеджеру в 3 канала",
    text: "Готовый лид с историей диалога уходит в CRM, Telegram менеджеров и на почту. Утром вы видите не «здравствуйте», а конкретный запрос.",
  },
];

const leadContains = [
  "Имя и телефон клиента",
  "Направление, даты, бюджет, состав поездки",
  "Туры, которые клиент смотрел в диалоге",
  "Полная история переписки для менеджера",
];

export default function LidyPage() {
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
              <span className="text-body">Лиды для турагентства</span>
            </nav>
            <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
              Лиды для турагентства —{" "}
              <span className="text-accent">
                с вашего сайта, по цене подписки
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-body sm:text-lg">
              Квалифицированный лид из рекламы стоит турагентству
              1 500–5 000 ₽. ИИ-ассистент «Навылет! AI» приносит заявки по
              219–540 ₽: он конвертирует трафик, который уже есть на вашем
              сайте, — отвечает мгновенно 24/7, подбирает туры по живой базе и
              отдаёт менеджеру контакт с готовым запросом. Версия «Лид» — от{" "}
              {rub(minLid)}/мес, первый месяц бесплатно.
            </p>

            <div className="mx-auto mt-9 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { stat: "219–540 ₽", label: "цена квалифицированного лида" },
                { stat: "500+", label: "лидов в месяц по сети" },
                { stat: "≈ 11%", label: "конверсия диалога в лид" },
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
              Данные сети «Навылет! AI»: 20+ ассистентов на боевых сайтах,
              август 2026. CPL = подписка ÷ лиды за период.
            </p>
          </div>
        </section>

        {/* Каналы: сравнение */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Где турагентства берут лиды — и почём
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Каналов по большому счёту пять. Сравнение по цене
              квалифицированной заявки и главному риску каждого канала.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
              {channels.map((c, i) => (
                <div
                  key={c.name}
                  className={`grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[1fr_auto_1.4fr] sm:items-center sm:gap-4 ${
                    i > 0 ? "border-t border-blue-subtle/30" : ""
                  } ${c.ours ? "bg-blue-ice/50" : ""}`}
                >
                  <div className="flex items-center gap-2 font-semibold text-heading">
                    {c.ours && <LidIcon className="h-4 w-4 shrink-0 text-accent" />}
                    {c.name}
                  </div>
                  <div
                    className={`font-display text-sm font-bold sm:text-right ${
                      c.ours ? "text-accent" : "text-body"
                    }`}
                  >
                    {c.cpl}
                  </div>
                  <div className="text-sm text-muted">{c.risk}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm text-muted">
              Подробный разбор каналов с расчётами — в статье{" "}
              <Link
                href="/blog/gde-brat-lidy-turagentstvu"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                «Лиды для турагентства: где брать клиентов»
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Как рождается лид */}
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Как трафик сайта превращается в заявки
            </h2>
            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {leadSteps.map((s, i) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <s.icon className="h-4.5 w-4.5 text-accent" />
                    </span>
                    <span className="font-display text-sm font-bold text-muted">
                      Шаг {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-base font-bold text-heading">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Что внутри лида */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <div>
                <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
                  Что внутри квалифицированного лида
                </h2>
                <p className="mt-3 text-base leading-relaxed text-body">
                  Лид из рекламы — это клик и номер телефона. Лид из диалога с
                  ассистентом — человек, который уже назвал параметры поездки,
                  посмотрел варианты по живым ценам и оставил контакт
                  осознанно. Менеджер начинает не с «чем помочь», а с
                  конкретного предложения.
                </p>
                <ul className="mt-5 space-y-2.5">
                  {leadContains.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-body sm:text-base"
                    >
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                        <Check className="h-3 w-3 text-accent" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card">
                <div className="flex items-center gap-2">
                  <LidIcon className="h-5 w-5 text-accent" />
                  <span className="font-display text-lg font-bold text-heading">
                    Версия «Лид» — создана для этого
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-body">
                  Младшая версия ассистента заточена под лидогенерацию: живой
                  диалог, подбор туров и заявка вашему менеджеру — без долгих
                  консультаций. Контакт клиента фиксируется с первого
                  сообщения.
                </p>
                <div className="mt-4 space-y-2">
                  {lidPlans.slice(0, 3).map((p) => (
                    <div
                      key={p.name}
                      className="flex items-baseline justify-between rounded-xl bg-surface-alt px-4 py-2.5 text-sm"
                    >
                      <span className="font-semibold text-heading">
                        {p.name}
                      </span>
                      <span className="text-body">
                        {p.dialogs} диалогов ·{" "}
                        <span className="font-semibold text-accent">
                          {rub(p.price)}/мес
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted">
                  Все тарифы — на странице{" "}
                  <Link
                    href="/tarify"
                    className="font-medium text-accent hover:underline"
                  >
                    тарифов
                  </Link>
                  . Нужны консультации без ограничений и возврат клиентов —
                  посмотрите{" "}
                  <Link
                    href="/versii"
                    className="font-medium text-accent hover:underline"
                  >
                    версию «Про»
                  </Link>
                  .
                </p>
              </div>
            </div>
            <div className="mt-10 flex justify-center">
              <RegisterCta source="lidy_mid" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Частые вопросы про лидогенерацию
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
                href="/skolko-stoit"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Полный расчёт стоимости и окупаемости{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/resheniya/dorogaya-reklama"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Что делать, если реклама дорожает{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/podborki"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Подборки туров по ссылке <ArrowRight className="h-3.5 w-3.5" />
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
              Первый месяц лидов — бесплатно
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              Подключите версию «Лид» за пару минут и посчитайте цену заявки на
              своём трафике: 30 дней и до 200 диалогов — бесплатно.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source="lidy_bottom" compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
