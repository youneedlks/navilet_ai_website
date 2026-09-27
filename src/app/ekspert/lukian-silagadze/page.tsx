import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Quote,
  Bot,
  Landmark,
  BarChart3,
  BadgeCheck,
  Users,
  Rocket,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { companyInfo } from "@/lib/content";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";
const path = "/ekspert/lukian-silagadze";
const fullName = "Силагадзе Лукиан Ираклиевич";
const fullNameGen = "Силагадзе Лукиана Ираклиевича";
const committee = "Комитете ТПП РФ по предпринимательству в сфере туризма";

const title = `${fullName} — эксперт по ИИ в туриндустрии, основатель «Навылет! AI»`;
const description =
  "Основатель «Навылет! AI» и команда ИИМПАКТ ПЛЮС: внедряем ИИ в рабочие и бизнес-процессы туристических компаний с 2023 года. Позиция, экспертиза, отзывы профессионалов отрасли.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: path },
  openGraph: {
    title,
    description,
    url: `${siteUrl}${path}`,
    type: "profile",
    locale: "ru_RU",
    images: [{ url: "/team/otdyh-leisure-2026-panel-wide.jpg", width: 1024, height: 576 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/team/otdyh-leisure-2026-panel-wide.jpg"],
  },
};

const principles = [
  {
    title: "ИИ снимает рутину, решение остаётся за человеком",
    text: "Ассистент отвечает на первичные вопросы, подбирает туры и принимает обращения ночью и в выходные. Продажа, сложная консультация и ответственность перед туристом остаются за менеджером.",
  },
  {
    title: "ИИ отвечает только тем, что можно проверить",
    text: "Ответственность за рекомендацию несёт компания. Поэтому ассистент опирается только на подтверждённые данные: наличие туров, цены, описание отеля. Если данных нет, вопрос уходит менеджеру.",
  },
  {
    title: "Отраслевые задачи решаются на общих данных",
    text: "Классификация средств размещения, единый реестр экскурсоводов и платформа на базе «Электронной путёвки» делают сведения об отрасли машиночитаемыми. К конкуренции продуктом и ценой добавляется третье измерение: попадает ли компания в подборку, которую формирует ИИ.",
  },
  {
    title: "Внедрение измеряется результатом",
    text: "Сколько обращений получили ответ, сколько стало заявками, насколько быстрее отвечает офис. Если результат нельзя посчитать, это эксперимент, а не внедрение.",
  },
];

const activities = [
  {
    icon: Bot,
    title: "Продукт",
    text: "«Навылет! AI» — ИИ-ассистент для сайтов турагентств и мессенджера MAX. Подбирает туры на реальных данных и передаёт менеджеру готовую заявку. Среди клиентов — сеть МГП.",
    href: "/",
    link: "О продукте",
  },
  {
    icon: Landmark,
    title: "Отраслевая работа",
    text: "Рабочая группа при Комитете ТПП РФ занимается экономическим эффектом от ИИ, безопасностью и правами туриста, этикой и стандартизацией.",
    href: "/o-komande",
    link: "О рабочей группе",
  },
  {
    icon: BarChart3,
    title: "Аналитика",
    text: "Ежемесячный индекс спроса на туры по данным ИИ-диалогов.",
    href: "/indeks-sprosa",
    link: "Индекс спроса",
  },
];

const recognition = [
  {
    icon: BadgeCheck,
    text: "Проект поддержан Ю. А. Барзыкиным, вице-президентом Российского союза туриндустрии",
  },
  {
    icon: Users,
    text: "Силагадзе Л. И. — член Комитета ТПП РФ по предпринимательству в сфере туризма",
  },
  {
    icon: Rocket,
    text: "ООО «ИИМПАКТ ПЛЮС» — резидент ИТ-кластера «Сколково»",
  },
];

const venues = [
  "Международные конгрессы туроператоров",
  "Заседания Комитета и Совета ТПП РФ",
  "Всероссийские и международные туристические форумы",
  "Научно-практические конференции",
  "Отраслевые вузы",
];

const topics = [
  "ИИ в туристическом бизнесе",
  "Ответственное применение ИИ и регулирование",
  "Цифровизация туриндустрии",
  "Спрос на туры по данным ИИ-диалогов",
];

const testimonials = [
  {
    text: "Сотрудничество с AIMPACT — важный шаг для внедрения инноваций и искусственного интеллекта в туризме, повышающий эффективность бизнеса и клиентский сервис.",
    name: "Ю. А. Барзыкин",
    role: "Вице-президент Российского союза туриндустрии",
    photo: "/experts/barzykin.jpg",
  },
  {
    text: "AIMPACT активно способствует цифровой трансформации туризма, улучшая качество обслуживания, безопасность и эффективность отрасли.",
    name: "А. П. Осауленко",
    role: "Директор Ассоциации «ТУРПОМОЩЬ»",
    photo: "/experts/osaulenko.jpg",
  },
  {
    text: "AIMPACT задаёт новые механизмы цифровизации в туризме. Их решения открывают огромный потенциал для развития компаний отрасли.",
    name: "Б. А. Тарасова",
    role: "Руководитель туроператора «Ривьера-Сочи»",
    photo: "/experts/tarasova.jpg",
  },
  {
    text: "AIMPACT активно делится знаниями об ИИ со студентами, помогая освоить передовые технологии и получить дополнительную IT-специальность.",
    name: "Г. М. Романова",
    role: "Научный руководитель магистратуры МГИМО",
    photo: "/experts/romanova.jpg",
  },
  {
    text: "С помощью AIMPACT мы разработали ИИ-ассистента для сайта, который значительно ускорил и улучшил обработку клиентских запросов.",
    name: "С. Ю. Агафонов",
    role: "Генеральный директор «Сети Магазинов Горящих Путёвок»",
    photo: "/experts/agafonov.jpg",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}${path}#webpage`,
      url: `${siteUrl}${path}`,
      name: title,
      description,
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      breadcrumb: { "@id": `${siteUrl}${path}#breadcrumb` },
      mainEntity: { "@id": `${siteUrl}/#founder` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}${path}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "О компании",
          item: `${siteUrl}/o-komande`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: fullName,
          item: `${siteUrl}${path}`,
        },
      ],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      name: fullName,
      givenName: "Лукиан",
      additionalName: "Ираклиевич",
      familyName: "Силагадзе",
      url: `${siteUrl}${path}`,
      image: `${siteUrl}/team/lukian-silagadze.jpg`,
      jobTitle: "Основатель «Навылет! AI», генеральный директор ООО «ИИМПАКТ ПЛЮС»",
      description: `Эксперт по искусственному интеллекту и цифровизации в туриндустрии и руководитель рабочей группы по ответственному применению ИИ в туриндустрии при ${committee}.`,
      worksFor: { "@id": `${siteUrl}/#organization` },
      memberOf: {
        "@type": "Organization",
        name: "Комитет ТПП РФ по предпринимательству в сфере туризма",
      },
      knowsAbout: [
        "искусственный интеллект в туризме",
        "цифровизация туриндустрии",
        "ответственное применение ИИ",
        "ИИ-ассистенты для турагентств",
      ],
      sameAs: ["https://tourismexpo.ru/program/speakers/lukian-silagadze/"],
    },
  ],
};

const h2 = "font-display text-2xl font-bold text-heading sm:text-3xl";
const card = "rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card sm:p-6";

export default function ExpertPage() {
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
          <div className="relative mx-auto max-w-4xl px-5 pt-28 pb-12 sm:px-6 sm:pt-32 lg:px-8">
            <nav className="mb-6 flex flex-wrap items-center text-xs text-muted" aria-label="Хлебные крошки">
              <Link href="/" className="hover:text-accent">
                Главная
              </Link>
              <ChevronRight className="mx-1 h-4 w-4" />
              <Link href="/o-komande" className="hover:text-accent">
                О компании
              </Link>
              <ChevronRight className="mx-1 h-4 w-4" />
              <span className="text-body">Эксперт</span>
            </nav>
            <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
              <img
                src="/team/lukian-silagadze.jpg"
                alt={fullName}
                width={160}
                height={160}
                className="h-28 w-28 shrink-0 rounded-full object-cover ring-4 ring-blue-ice sm:h-36 sm:w-36"
              />
              <div>
                <h1 className="font-display text-3xl font-bold leading-tight text-heading sm:text-4xl">
                  {fullName}
                  <span className="mt-1 block text-xl font-semibold text-accent sm:text-2xl">
                    и команда «Навылет! AI»
                  </span>
                </h1>
                <p className="mt-4 text-base font-semibold leading-relaxed text-heading">
                  Основатель «Навылет! AI», генеральный директор ООО «ИИМПАКТ ПЛЮС»
                </p>
                <p className="mt-2 text-sm leading-relaxed text-body sm:text-base">
                  Эксперт по искусственному интеллекту и цифровизации в
                  туриндустрии и руководитель рабочей группы по ответственному
                  применению ИИ в туриндустрии при {committee}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Кто мы */}
        <section className="bg-surface-alt">
          <div className="mx-auto grid max-w-4xl gap-8 px-5 py-14 sm:px-6 md:grid-cols-[1fr_300px] md:items-start lg:grid-cols-[1fr_340px] lg:px-8">
            <div>
              <h2 className={h2}>Кто мы</h2>
              <p className="mt-5 text-base leading-relaxed text-body">
                С 2023 года команда ООО «ИИМПАКТ ПЛЮС» под руководством
                основателя {fullNameGen} внедряет
                искусственный интеллект в рабочие и бизнес-процессы
                туристических компаний: турагентств, туроператоров,
                агрегаторов, средств размещения и других сегментов туризма. В
                команде — специалисты по машинному обучению и искусственному
                интеллекту с академическим и практическим опытом.
              </p>
              <p className="mt-4 text-base leading-relaxed text-body">
                Рабочая группа по ответственному применению ИИ в туриндустрии
                создана по инициативе Ю. А. Барзыкина — председателя Комитета
                ТПП РФ по предпринимательству в сфере туризма и
                вице-президента Российского союза туриндустрии.
              </p>
            </div>
            <figure className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-blue-subtle/40 bg-white shadow-card md:mt-12">
              <img
                src="/team/otdyh-leisure-2026-panel.jpg"
                alt="Дискуссионная панель о регулировании туристической отрасли на форуме «ОТДЫХ Leisure 2026»"
                width={576}
                height={576}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <figcaption className="px-4 py-3.5">
                <span className="block text-xs font-semibold text-heading">
                  «ОТДЫХ Leisure 2026», 2 сентября, Москва
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-muted">
                  Панель о ключевых изменениях в регулировании туристической
                  отрасли от Ассоциации «ТУРПОМОЩЬ» и Комитета ТПП РФ. Доклад
                  «Новые НПА и цифровизация» и презентация рабочей группы по
                  ответственному применению ИИ.
                </span>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Позиция */}
        <section className="bg-surface">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className={h2}>Наша позиция: не вместо, а вместе</h2>
            <p className="mt-4 text-lg font-semibold text-heading">
              Искусственный интеллект — инструмент менеджера, а не его замена.
            </p>
            <ol className="mt-7 grid gap-4 md:grid-cols-2">
              {principles.map((p, i) => (
                <li key={p.title} className={card}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 font-display text-sm font-bold text-accent">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-heading">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Чем мы занимаемся */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className={h2}>Чем мы занимаемся</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-3">
              {activities.map((a) => (
                <div key={a.title} className={`${card} flex flex-col`}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#0062EF] to-[#00CCF5] text-white">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold text-heading">
                    {a.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-body">{a.text}</p>
                  <Link
                    href={a.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                  >
                    {a.link} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Признание + площадки */}
        <section className="bg-surface">
          <div className="mx-auto grid max-w-4xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className={h2}>Признание</h2>
              <ul className="mt-6 space-y-3">
                {recognition.map((r) => (
                  <li key={r.text} className="flex items-start gap-3 text-sm leading-relaxed text-body sm:text-base">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10">
                      <r.icon className="h-4 w-4 text-accent" />
                    </span>
                    {r.text}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={h2}>Где нас можно услышать</h2>
              <p className="mt-6 text-sm leading-relaxed text-body sm:text-base">
                Мы выступаем на значимых площадках туриндустрии:
              </p>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-body sm:text-base">
                {venues.map((v) => (
                  <li key={v} className="flex gap-2">
                    <span className="text-accent">•</span>
                    {v}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-muted">
                Темы
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {topics.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-blue-subtle/50 bg-blue-ice/40 px-3 py-1.5 text-xs font-medium text-body sm:text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Отзывы */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className={h2}>О нас говорят профессионалы</h2>
            <p className="mt-2 text-sm text-muted">
              Отзывы о команде ИИМПАКТ ПЛЮС (AIMPACT)
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {testimonials.map((t, i) => (
                <figure
                  key={t.name}
                  className={`${card} flex flex-col ${i === testimonials.length - 1 && testimonials.length % 2 ? "md:col-span-2" : ""}`}
                >
                  <Quote className="h-5 w-5 text-accent/40" />
                  <blockquote className="mt-3 flex-1 text-base leading-relaxed text-heading">
                    «{t.text}»
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <img
                      src={t.photo}
                      alt={t.name}
                      width={48}
                      height={48}
                      loading="lazy"
                      className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-blue-ice"
                    />
                    <span>
                      <span className="block text-sm font-bold text-heading">{t.name}</span>
                      <span className="block text-xs text-muted sm:text-sm">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
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
              Пригласить на мероприятие или запросить комментарий
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              Выступим на форуме, конференции или стратегической сессии,
              прокомментируем тему ИИ в туризме для СМИ.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${companyInfo.email}?subject=${encodeURIComponent("Приглашение эксперта")}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#0062EF] shadow-card transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" /> {companyInfo.email}
              </a>
              <a
                href={`tel:${companyInfo.phoneRaw}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> {companyInfo.phone}
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
