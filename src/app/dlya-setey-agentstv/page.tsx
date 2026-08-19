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
  Building2,
  LayoutDashboard,
  Palette,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import { jsonLdScript } from "@/lib/schema";
import { versionIcons } from "@/lib/version-icons";

const siteUrl = "https://navilet.ru";
const LidIcon = versionIcons.lid;
const ProIcon = versionIcons.pro;

const rub = (value: number) => `${value.toLocaleString("ru-RU")}\u00A0₽`;

const networkPlan = pricingPlans[pricingPlans.length - 1];

export const metadata: Metadata = {
  title: {
    absolute: "ИИ-ассистент для сети турагентств — тариф «Сеть» | Навылет! AI",
  },
  description:
    "ИИ-ассистент для сетей турагентств: отдельный ассистент на каждый офис в своём фирменном стиле, аналитика по всем точкам, барометр спроса. Тариф «Сеть» — от 6 990 ₽/мес за 500 диалогов. Кейс: 10+ офисов сети МГП.",
  keywords: [
    "ИИ для сети турагентств",
    "автоматизация сети турагентств",
    "чат-бот для сети турагентств",
    "ИИ-ассистент франчайзи",
    "автоматизация франшизы турагентства",
  ],
  alternates: { canonical: "/dlya-setey-agentstv" },
  openGraph: {
    title: "ИИ-ассистент для сети турагентств",
    description:
      "Ассистент на каждый офис, аналитика по всем точкам, выгодная цена диалога. Кейс: 10+ офисов сети МГП. Первый месяц бесплатно.",
    url: `${siteUrl}/dlya-setey-agentstv`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1376, height: 768 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ИИ-ассистент для сети турагентств",
    description:
      "Тариф «Сеть»: 500 диалогов от 6 990 ₽/мес. Кейс МГП — 10+ офисов. Первый месяц бесплатно.",
    images: ["/og-image.png"],
  },
};

const faqItems = [
  {
    question: "Сколько стоит ИИ-ассистент для сети турагентств?",
    answer:
      "Тариф «Сеть» в версии «Лид» — 6 990 ₽/мес за 500 диалогов (≈14 ₽ за диалог), в версии «Про» — 14 990 ₽/мес за 400 диалогов (≈37 ₽). Каждый офис может работать и на собственном тарифе от 990 ₽/мес — линейка гибкая. Подключение бесплатное, первый месяц — тоже.",
  },
  {
    question: "Можно ли подключить несколько офисов или сайтов?",
    answer:
      "Да. На каждый сайт или точку создаётся свой ассистент со своим фирменным стилем, приветствием и базой знаний — а заявки и аналитика по каждой точке видны в личном кабинете. Так работает сеть МГП: подключено 10+ офисов.",
  },
  {
    question: "Как выглядит пилот для сети?",
    answer:
      "Так же, как у МГП: старт с нескольких офисов, замер конверсии и цены лида за первый месяц (он бесплатный, до 200 диалогов на точку), затем масштабирование на остальные точки. Условия для крупных сетей обсуждаются индивидуально.",
  },
  {
    question: "Что видит управляющая компания?",
    answer:
      "Личный кабинет каждой точки: диалоги, заявки, конверсию, воронку подборок «просмотры → открытия туров → заявки», а также барометр спроса по направлениям и прогноз заявок до конца месяца в разделе «Отчёты и прогнозы».",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/dlya-setey-agentstv#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Для сетей агентств",
          item: `${siteUrl}/dlya-setey-agentstv`,
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/dlya-setey-agentstv#webpage`,
      url: `${siteUrl}/dlya-setey-agentstv`,
      name: "ИИ-ассистент для сети турагентств",
      description:
        "ИИ-ассистент для сетей турагентств и франшиз: ассистент на каждый офис, аналитика по точкам, тариф «Сеть» от 6 990 ₽/мес. Кейс: 10+ офисов сети МГП.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/dlya-setey-agentstv#breadcrumb` },
      about: { "@id": `${siteUrl}/#product` },
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/dlya-setey-agentstv#service`,
      name: "ИИ-ассистент для сетей турагентств",
      serviceType: "Автоматизация обработки заявок в сети турагентств",
      description:
        "Отдельный ИИ-ассистент на каждый офис сети в своём фирменном стиле, заявки в CRM и Telegram, аналитика по каждой точке, барометр спроса по сети. Тариф «Сеть»: 500 диалогов в версии «Лид» за 6 990 ₽/мес или 400 диалогов в версии «Про» за 14 990 ₽/мес.",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: "RU",
      audience: {
        "@type": "BusinessAudience",
        name: "Сети турагентств и франшизы",
      },
      isRelatedTo: { "@id": `${siteUrl}/#product` },
      offers: {
        "@type": "Offer",
        price: String(networkPlan.lid.price),
        priceCurrency: "RUB",
        description:
          "Тариф «Сеть», версия «Лид»: 500 диалогов в месяц, подключение 0 ₽, первый месяц бесплатно.",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/dlya-setey-agentstv#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

const networkNeeds = [
  {
    icon: Building2,
    title: "Ассистент на каждую точку",
    text: "У каждого офиса или сайта — свой ассистент: своё приветствие, свои контакты, своя база знаний. Заявки уходят менеджерам конкретной точки.",
  },
  {
    icon: Palette,
    title: "Единый бренд, white-label",
    text: "Виджет работает в фирменном стиле сети: логотип, цвета, название. Никаких сторонних упоминаний в диалоге с клиентом.",
  },
  {
    icon: LayoutDashboard,
    title: "Аналитика по каждой точке",
    text: "Диалоги, заявки, конверсия и воронка подборок — по каждому офису отдельно. Видно, какая точка отрабатывает трафик, а какая теряет.",
  },
  {
    icon: BarChart3,
    title: "Барометр спроса по сети",
    text: "Раздел «Отчёты и прогнозы»: спрос по направлениям, прогноз заявок и выручки до конца месяца, средний чек интереса — для планирования рекламы и загрузки.",
  },
];

export default function NetworksPage() {
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
              <span className="text-body">Для сетей агентств</span>
            </nav>
            <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
              <span className="whitespace-nowrap">ИИ-ассистент</span> для{" "}
              <span className="text-accent">сети турагентств</span>
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base text-body sm:text-lg">
              Отдельный ассистент на каждый офис в фирменном стиле сети,
              заявки менеджерам конкретной точки, аналитика по всем офисам и
              барометр спроса. Тариф «Сеть» — от {rub(networkPlan.lid.price)}
              /мес за 500 диалогов; так уже работают 10+ офисов «Сети магазинов
              горящих путёвок».
            </p>
            <div className="mt-8 flex justify-center">
              <RegisterCta source="seti_hero" compact />
            </div>
          </div>
        </section>

        {/* Кейс МГП */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                Кейс сети
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold text-heading sm:text-3xl">
                МГП: 10+ офисов на ИИ-ассистенте
              </h2>
              <p className="mt-3 text-base leading-relaxed text-body">
                «Сеть магазинов горящих путёвок» — 27 лет на рынке, 396 офисов
                по России и СНГ. Стратегический партнёр «Навылет! AI»:
                ассистенты подключены на 10+ офисов сети и обрабатывают
                первичные обращения круглосуточно — подбор, консультация,
                заявка менеджеру точки.
              </p>
              <Link
                href="/keisy/mgp"
                className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                Читать кейс целиком <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Что важно сетям */}
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Что получает управляющая компания
            </h2>
            <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {networkNeeds.map((n) => (
                <div
                  key={n.title}
                  className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                    <n.icon className="h-5 w-5 text-accent" />
                  </span>
                  <h3 className="mt-3.5 font-display text-lg font-bold text-heading">
                    {n.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">
                    {n.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Тариф «Сеть» */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Тариф «Сеть» — самая низкая цена диалога
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Для центрального сайта с большим трафиком. Отдельные офисы могут
              работать на своих тарифах от {rub(990)}/мес — линейка гибкая.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-blue-subtle/50 bg-white p-6 shadow-card">
                <div className="flex items-center gap-2">
                  <LidIcon className="h-5 w-5 text-accent" />
                  <span className="font-display text-lg font-bold text-heading">
                    «Лид» · Сеть
                  </span>
                </div>
                <p className="mt-3 font-display text-3xl font-bold text-heading">
                  {rub(networkPlan.lid.price)}
                  <span className="text-base font-medium text-muted">/мес</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm text-body">
                  {[
                    `${networkPlan.lid.dialogs} диалогов в месяц`,
                    `≈ ${rub(networkPlan.lid.effectivePerDialog)} за диалог`,
                    "Лидогенерация: заявка менеджеру с контактом",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-blue-subtle/50 bg-white p-6 shadow-card">
                <div className="flex items-center gap-2">
                  <ProIcon className="h-5 w-5 text-accent" />
                  <span className="font-display text-lg font-bold text-heading">
                    «Про» · Сеть
                  </span>
                </div>
                <p className="mt-3 font-display text-3xl font-bold text-heading">
                  {rub(networkPlan.price)}
                  <span className="text-base font-medium text-muted">/мес</span>
                </p>
                <ul className="mt-4 space-y-2 text-sm text-body">
                  {[
                    `${networkPlan.dialogs} диалогов в месяц`,
                    `≈ ${rub(networkPlan.effectivePerDialog)} за диалог`,
                    "Консультации без ограничений и возврат клиентов",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-5 text-center text-sm text-muted">
              Все тарифы и надстройка «Второй канал» —{" "}
              <Link
                href="/tarify"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                на странице тарифов
              </Link>
              . Сравнение версий «Лид» и «Про» —{" "}
              <Link
                href="/versii"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                на странице версий
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Частые вопросы сетей
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
                href="/lidy-dlya-turagentstva"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Как устроена лидогенерация{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/prognozy"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Прогнозы и барометр спроса{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/spros"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Спрос по направлениям <ArrowRight className="h-3.5 w-3.5" />
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
              Начните с пилота на нескольких офисах
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              Первый месяц бесплатно на каждой точке — до 200 диалогов.
              Замерьте конверсию и цену лида, потом масштабируйте на сеть.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source="seti_bottom" compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
