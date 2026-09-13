import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import {
  ChevronRight,
  Award,
  Mail,
  Phone,
  MapPin,
  Building2,
  ArrowRight,
} from "lucide-react";
import { companyInfo, events } from "@/lib/content";
import { jsonLdScript } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "О компании «Навылет! AI» — разработчик ИИ для туризма" },
  description:
    "ООО «ИИМПАКТ ПЛЮС» — разработчик ИИ-ассистента «Навылет! AI». Эксперты по ИИ в туризме при Комитете ТПП РФ, поддержка РСТ, резидент ИТ-кластера «Сколково».",
  keywords: [
    "о компании Навылет",
    "ИИМПАКТ ПЛЮС",
    "разработчик ИИ для турагентств",
    "эксперты ИИ туризм",
    "ТПП РФ ИИ",
    "резидент Сколково",
  ],
  alternates: { canonical: "/o-komande" },
  openGraph: {
    title: "О компании «Навылет! AI» — разработчик ИИ для туризма",
    description:
      "Российский разработчик ИИ-ассистента. Эксперты по ИИ в туризме при Комитете ТПП РФ.",
    url: "https://navilet.ru/o-komande",
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "О компании «Навылет! AI»",
    description: "Российский разработчик ИИ-ассистента для туризма.",
    images: ["/og-image.png"],
  },
};

const siteUrl = "https://navilet.ru";

// Берём только реальные мероприятия из content.ts — без дублирования текстов.
// Порядок тот же, что в блоке на главной: от свежего к старому по dateISO.
const speakingEvents = [...events]
  .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
  .slice(0, 6)
  .map((e) => ({
    date: e.date,
    location: e.location,
    title: e.title,
  }));

const teamJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/o-komande#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "О компании",
          item: `${siteUrl}/o-komande`,
        },
      ],
    },
    {
      "@type": "AboutPage",
      "@id": `${siteUrl}/o-komande#webpage`,
      url: `${siteUrl}/o-komande`,
      name: "О компании «Навылет! AI»",
      description:
        "ООО «ИИМПАКТ ПЛЮС» — российский разработчик ИИ-ассистента «Навылет! AI», эксперты по ИИ в туризме при ТПП РФ.",
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}/o-komande#breadcrumb` },
      publisher: { "@id": `${siteUrl}/#organization` },
      about: { "@id": `${siteUrl}/#organization` },
      // Страница описывает и компанию, и основателя: узел Person объявлен
      // в layout.tsx, здесь на него только ссылаемся, чтобы не плодить
      // дубликаты одной сущности.
      mainEntity: { "@id": `${siteUrl}/#organization` },
      mentions: [{ "@id": `${siteUrl}/#founder` }],
    },
  ],
};

/** Что делает продукт — коротко, со ссылками на подробные страницы. */
const whatWeDo = [
  {
    title: "Подбор туров в диалоге",
    text: "Ассистент понимает запрос свободным текстом и ищет по базе агрегатора Tourvisor: реальные цены, наличие мест, отели и перелёты.",
    href: "/integraciya-tourvisor",
    label: "Как устроена интеграция",
  },
  {
    title: "Два канала для клиента",
    text: "Виджет на сайте агентства подключается одной строкой кода, бот в мессенджере MAX — без разработки на стороне агентства.",
    href: "/vidzhet",
    label: "Установка виджета",
  },
  {
    title: "Две версии ассистента",
    text: "«Лид» собирает заявки и передаёт менеджеру, «Про» консультирует без ограничений и возвращает ушедших клиентов.",
    href: "/versii",
    label: "Сравнение версий",
  },
  {
    title: "Аналитика для владельца",
    text: "Диалоги, воронка от подборки до заявки, спрос по направлениям и прогноз заявок до конца месяца — в личном кабинете.",
    href: "/prognozy",
    label: "Прогнозы и аналитика",
  },
];

/** Направления рабочей группы при Комитете ТПП РФ. */
const workingGroupTracks = [
  {
    title: "Внедрение и экономический эффект",
    text: "Как считать отдачу от ИИ в турбизнесе и какие показатели сопоставимы между компаниями.",
  },
  {
    title: "Безопасность и права туриста",
    text: "Достоверность данных в ответах, обработка персональных данных, ответственность за рекомендацию.",
  },
  {
    title: "Этика и стандартизация",
    text: "Общие правила применения ИИ в отрасли в диалоге с государством и профильными объединениями.",
  },
];

export default function AboutTeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(teamJsonLd) }}
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
              О компании
            </li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="mx-auto max-w-4xl px-5 py-10 text-center sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5">
            <Award className="h-4 w-4 text-accent" />
            <span className="text-xs font-semibold text-accent sm:text-sm">
              Эксперты ИИ в туризме при ТПП РФ
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight text-heading sm:text-5xl">
            О компании <span className="text-accent">«Навылет! AI»</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-body sm:text-lg">
            ООО «ИИМПАКТ ПЛЮС» — российский разработчик ИИ-ассистента
            «Навылет! AI». Развиваем продукт с 2023 года и признаны экспертами
            по применению искусственного интеллекта в туризме при Комитете
            ТПП РФ.
          </p>
        </section>

        {/* Что делаем */}
        <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-6 lg:px-8 lg:pb-20">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Чем мы занимаемся
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-body">
            Мы делаем один продукт: ИИ-ассистента, который разговаривает с
            туристом вместо формы «оставьте заявку». Он подбирает туры по живой
            базе, отвечает на вопросы об отелях и перелётах и передаёт
            менеджеру готовую заявку с контактом. Работает круглосуточно, в том
            числе тогда, когда офис закрыт, — по нашей статистике на это время
            приходится 41,4% обращений.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {whatWeDo.map((w) => (
              <div
                key={w.title}
                className="rounded-2xl border border-blue-subtle/50 bg-white p-5"
              >
                <h3 className="font-display text-base font-bold text-heading">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {w.text}
                </p>
                <Link
                  href={w.href}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                >
                  {w.label}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            За летний сезон 2026 ассистенты сети подобрали гостям туры на
            4,3 млрд ₽ и обработали более 175 000 сообщений; 73,4% обращений
            доходят до подбора тура, 11–14% диалогов становятся заявкой.
            Методика расчёта — на странице{" "}
            <Link
              href="/skolko-stoit"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
            >
              «Сколько стоит ИИ-ассистент»
            </Link>
            ; практика внедрения в сети из 10+ офисов — в{" "}
            <Link
              href="/keisy/mgp"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
            >
              кейсе МГП
            </Link>
            . Для кого продукт:{" "}
            <Link
              href="/dlya-turagentstv"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
            >
              турагентства
            </Link>
            ,{" "}
            <Link
              href="/dlya-turoperatorov"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
            >
              туроператоры
            </Link>{" "}
            и{" "}
            <Link
              href="/dlya-setey-agentstv"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
            >
              сети агентств
            </Link>
            .
          </p>
        </section>

        {/* Основатель */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Основатель
            </h2>
            <div className="mt-8 rounded-2xl border border-blue-subtle/50 bg-white p-6">
              <h3 className="font-display text-xl font-bold text-heading">
                Лукиан Ираклиевич Силагадзе
              </h3>
              <p className="mt-1 text-sm font-semibold text-accent">
                Основатель проекта «Навылет! AI», генеральный директор
                ООО «ИИМПАКТ ПЛЮС»
              </p>
              <p className="mt-4 text-sm leading-relaxed text-body">
                Эксперт по искусственному интеллекту и цифровизации при
                Комитете ТПП РФ по предпринимательству в сфере туризма,
                руководитель рабочей группы по ответственному применению ИИ при
                Комитете. Выступает на отраслевых площадках с докладами о
                применении ИИ в туризме: международные конгрессы туроператоров,
                заседания Совета ТПП РФ по применению ИИ в бизнесе, форумы и
                научно-практические конференции.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-body">
                Последнее выступление — доклад «Новые НПА и цифровизация:
                почему требования 2026 года ускоряют технологии» на 32-м
                Международном форуме-выставке по туризму «ОТДЫХ Leisure 2026»
                2 сентября 2026 года.
              </p>
              <a
                href="https://tourismexpo.ru/program/speakers/lukian-silagadze/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
              >
                Карточка спикера на сайте форума «ОТДЫХ»
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
                Признание индустрии
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-body">
                Экспертиза проекта подтверждена ведущими отраслевыми
                институтами России.
              </p>
            </div>
            <div className="mt-10 space-y-4">
              {[
                {
                  title: "Российский союз туриндустрии (РСТ)",
                  text: "Вице-президент РСТ Юрий Александрович Барзыкин выразил официальную поддержку проекта «Навылет!»: проект рекомендован профильным фондам, акселераторам и партнёрам индустрии — письмо № 49К/0009 от 19.08.2025.",
                },
                {
                  title: "Торгово-промышленная палата РФ",
                  text: "Эксперты Совета ТПП РФ по применению ИИ в бизнесе и члены Комитета по предпринимательству в сфере туризма. Генеральный директор ООО «ИИМПАКТ ПЛЮС» и сооснователь проекта Лукиан Ираклиевич Силагадзе назначен руководителем рабочей группы по ответственному применению искусственного интеллекта при Комитете.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-blue-subtle/50 bg-white p-5"
                >
                  <Award className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <p className="font-display text-base font-semibold text-heading">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-body">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Speaking events */}
        <section className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Участие в отраслевых событиях
          </h2>
          <p className="mt-4 text-base text-body">
            Конгрессы туроператоров, заседания ТПП РФ, форумы и научные
            конференции. Полный список — в{" "}
            <Link
              href="/#events"
              className="font-semibold text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
            >
              разделе «Партнёры и мероприятия»
            </Link>{" "}
            на главной.
          </p>
          <ol className="mt-8 space-y-3">
            {speakingEvents.map((e) => (
              <li
                key={e.title}
                className="flex gap-4 rounded-2xl border border-blue-subtle/50 bg-white p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                  <div>{e.date}</div>
                  <div className="mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{e.location}</span>
                  </div>
                </div>
                <p className="flex-1 text-sm font-medium text-heading">
                  {e.title}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Рабочая группа */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Рабочая группа по ответственному применению ИИ
            </h2>
            <p className="mt-4 text-base leading-relaxed text-body">
              Группа формируется при Комитете ТПП РФ по предпринимательству в
              сфере туризма. Основание — федеральный закон от 26 июля 2026 года
              № 243-ФЗ «О поддержке развития технологий искусственного
              интеллекта в Российской Федерации», основные положения которого
              действуют с 1 сентября 2026 года. Задача простая: выработать для
              отрасли общие правила применения ИИ до того, как их напишут без
              её участия.
            </p>
            <div className="mt-8 space-y-3">
              {workingGroupTracks.map((t) => (
                <div
                  key={t.title}
                  className="rounded-2xl border border-blue-subtle/50 bg-white p-5"
                >
                  <h3 className="font-display text-base font-bold text-heading">
                    {t.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">
                    {t.text}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-relaxed text-body">
              Присоединиться можно как участник ядра группы, отраслевой эксперт
              или площадка для пилотного проекта — напишите на{" "}
              <a
                href={`mailto:${companyInfo.email}`}
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                {companyInfo.email}
              </a>
              . Наша позиция по границам применения ИИ в туризме собрана в{" "}
              <Link
                href="/voprosy"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                ответах на частые вопросы
              </Link>
              , а практический порядок внедрения — в гиде{" "}
              <Link
                href="/cifrovizaciya-turagentstva"
                className="font-medium text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent"
              >
                «Цифровизация турагентства»
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Company info */}
        <section>
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
              Юридическое лицо
            </h2>
            <p className="mt-4 text-base text-body">
              Российская компания, серверы в РФ, соответствие 152-ФЗ.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-blue-subtle/50 bg-white p-5">
                <Building2 className="mb-2 h-5 w-5 text-accent" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Юридическое название
                </p>
                <p className="mt-2 font-display text-base font-semibold text-heading">
                  {companyInfo.legalName}
                </p>
                <p className="mt-2 text-xs text-muted">
                  ИНН {companyInfo.inn} · ОГРН {companyInfo.ogrn}
                </p>
              </div>
              <div className="rounded-2xl border border-blue-subtle/50 bg-white p-5">
                <MapPin className="mb-2 h-5 w-5 text-accent" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Адрес
                </p>
                <p className="mt-2 text-sm text-heading">{companyInfo.address}</p>
              </div>
              <a
                href={`tel:${companyInfo.phoneRaw}`}
                className="rounded-2xl border border-blue-subtle/50 bg-white p-5 transition-colors hover:border-accent/30"
              >
                <Phone className="mb-2 h-5 w-5 text-accent" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Телефон
                </p>
                <p className="mt-2 font-display text-base font-semibold text-heading">
                  {companyInfo.phone}
                </p>
              </a>
              <a
                href={`mailto:${companyInfo.email}`}
                className="rounded-2xl border border-blue-subtle/50 bg-white p-5 transition-colors hover:border-accent/30"
              >
                <Mail className="mb-2 h-5 w-5 text-accent" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  Email
                </p>
                <p className="mt-2 font-display text-base font-semibold text-heading">
                  {companyInfo.email}
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Хотите обсудить проект?
          </h2>
          <p className="mt-4 text-base text-body sm:text-lg">
            Мы отвечаем на запросы лично — по email, телефону или через
            форму заявки.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#cta"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              Связаться с командой
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/keisy/mgp"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-subtle/50 bg-white px-6 py-3 font-semibold text-heading transition-colors hover:bg-blue-ice/30"
            >
              Кейс МГП
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
