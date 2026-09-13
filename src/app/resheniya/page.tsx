import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquare,
  Search,
  Send,
  RotateCcw,
  BarChart3,
} from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import RegisterCta from "@/components/seo/RegisterCta";
import { scenarioPages } from "@/lib/seo/scenario-pages";
import { networkResults } from "@/lib/content";
import { jsonLdScript } from "@/lib/schema";

const siteUrl = "https://navilet.ru";

export const metadata: Metadata = {
  title: {
    absolute: "Автоматизация турагентства: решения типовых проблем с ИИ",
  },
  description:
    "Автоматизация турагентства на практике: ночные заявки, загрузка менеджеров, конверсия сайта, дорогая реклама, кнопочный бот. Что делает ИИ и с чего начать.",
  keywords: [
    "автоматизация турагентства",
    "автоматизация работы турагентства",
    "проблемы турагентства решения",
    "ИИ для турагентства задачи",
    "как увеличить продажи турагентства",
    "цифровизация турагентства",
  ],
  alternates: { canonical: "/resheniya" },
  openGraph: {
    title: "Решения для турагентств — Навылет! AI",
    description:
      "Разборы типовых проблем турагентств: ночные заявки, загрузка менеджеров, конверсия сайта, дорогая реклама.",
    url: `${siteUrl}/resheniya`,
    type: "website",
    locale: "ru_RU",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Решения для турагентств — Навылет! AI",
    description:
      "Разборы типовых проблем турагентств и как их решает ИИ-ассистент.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

const faqItems = [
  {
    question: "Что такое автоматизация турагентства на практике?",
    answer:
      "Это передача машине повторяющейся части работы с клиентом: первичный ответ, уточнение запроса, подбор туров по базе, ответы на типовые вопросы про отель и перелёт, сбор контакта и передача заявки менеджеру. Менеджер остаётся на этапе, где нужен человек — бронирование и сопровождение. По сети «Навылет! AI» ассистент доводит до подбора 73,4% обращений, а 11–14% диалогов превращает в заявку.",
  },
  {
    question: "С какой проблемы начать автоматизацию?",
    answer:
      "С той, где теряется больше всего денег. У большинства агентств это ночные и выходные обращения: 41,4% диалогов приходят вне рабочего времени, и без ассистента они уходят конкурентам. Вторая по частоте — сайт с трафиком, но без заявок: форма конвертирует 1–2% посетителей. Обе проблемы закрываются одним виджетом за пару минут.",
  },
  {
    question: "Сколько стоит автоматизировать турагентство?",
    answer:
      "Готовый ИИ-ассистент стоит от 990 ₽ в месяц (версия «Лид», 40 диалогов) или от 1 990 ₽/мес (версия «Про» с консультациями и возвратом клиентов). Подключение бесплатное, первый месяц — тоже. Для сравнения: ещё один менеджер на первичные обращения обходится от 40 000 ₽/мес, разработка бота под заказ — 80 000–250 000 ₽.",
  },
  {
    question: "Заменит ли автоматизация менеджеров?",
    answer:
      "Нет, она снимает с них рутину. До 80% вопросов туристов повторяются: «какой пляж», «что входит», «сколько на двоих». Ассистент отвечает на них сам и передаёт менеджеру тёплую заявку с контекстом — что искал клиент, какой бюджет, какой тур выбрал. Менеджер начинает разговор с середины воронки, а не с нуля.",
  },
  {
    question: "Нужна ли CRM или интеграция с туроператорами?",
    answer:
      "Нет. База туров Tourvisor подключена на стороне «Навылет! AI», заявки приходят в Telegram и на почту сразу после подключения; U-ON CRM подключается по желанию в кабинете. Внедрение — одна строка кода на сайт или подключение бота в MAX, без проекта и подрядчиков.",
  },
];

/** Из чего складывается автоматизация: четыре узла, которые закрывает ассистент. */
const pillars = [
  {
    icon: MessageSquare,
    title: "Первая линия 24/7",
    text: "Ассистент отвечает за секунды в любое время: ночью, в выходные, в сезонный пик. Турист получает диалог, а не «оставьте телефон».",
    stat: `${networkResults.stats[2].value}%`,
    statLabel: "обращений вне рабочего времени",
  },
  {
    icon: Search,
    title: "Подбор по живой базе",
    text: "Поиск по всем туроператорам через Tourvisor: карточки с ценами и наличием на момент запроса, ответы про отели и перелёт.",
    stat: `${networkResults.stats[1].value}%`,
    statLabel: "обращений доходят до подбора",
  },
  {
    icon: Send,
    title: "Заявка менеджеру",
    text: "Контакт, запрос и выбранный тур уходят в CRM, Telegram и на почту с историей диалога. Менеджер работает с тёплым клиентом.",
    stat: networkResults.stats[3].display!,
    statLabel: "диалогов становятся заявкой",
  },
  {
    icon: RotateCcw,
    title: "Возврат клиентов",
    text: "В MAX ассистент сам возвращает замолчавших: догоняющее сообщение, напоминание, подписка на снижение цены. Версия «Про».",
    stat: "до 40%",
    statLabel: "отклик на догоняющее сообщение",
  },
];

const startSteps = [
  {
    title: "Найдите свою проблему ниже",
    text: "Каждый разбор — это цифры, механика решения и что получает агентство. Обычно узнают себя в двух-трёх сценариях сразу.",
  },
  {
    title: "Проверьте на живом демо",
    text: "Демо-ассистент работает на реальной базе Tourvisor, без регистрации. Задайте ему вопрос, с которым к вам приходят клиенты.",
  },
  {
    title: "Подключите на месяц бесплатно",
    text: "Регистрация за 2 минуты, одна строка кода на сайт или бот в MAX. 30 дней и до 200 диалогов — без карты. Дальше от 990 ₽/мес.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl}/resheniya#webpage`,
      url: `${siteUrl}/resheniya`,
      name: "Решения для турагентств",
      isPartOf: { "@id": `${siteUrl}/#website` },
      inLanguage: "ru-RU",
      breadcrumb: { "@id": `${siteUrl}/resheniya#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/resheniya#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Главная", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Решения",
          item: `${siteUrl}/resheniya`,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/resheniya#list`,
      itemListElement: scenarioPages.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.h1,
        url: `${siteUrl}/resheniya/${p.slug}`,
      })),
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/resheniya#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function ResheniyaHubPage() {
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
              Автоматизация турагентства:{" "}
              <span className="text-accent">
                типовые проблемы и как их решает ИИ
              </span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-body sm:text-lg">
              Ночные обращения без ответа, перегруженные менеджеры, сайт без
              заявок, дорожающая реклама, кнопочный бот, который никто не
              дочитывает. Разбираем каждую проблему в цифрах по сети из 30+
              ассистентов — и показываем, что именно делает ИИ-ассистент, чтобы
              её закрыть.
            </p>
            <div className="mt-7 flex justify-center">
              <RegisterCta source="resheniya_hub_hero" />
            </div>
          </div>
        </section>

        {/* Из чего складывается автоматизация */}
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Из чего складывается автоматизация турагентства
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              Автоматизация — это не замена менеджеров, а снятие с них четырёх
              повторяющихся узлов работы с клиентом. Все четыре закрывает один
              ассистент, цифры — летний сезон 2026 по сети партнёров.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  className="flex flex-col rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
                    <p.icon className="h-4.5 w-4.5 text-accent" />
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-heading">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-body">
                    {p.text}
                  </p>
                  <p className="mt-4 font-display text-xl font-bold text-accent">
                    {p.stat}
                  </p>
                  <p className="text-xs text-muted">{p.statLabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-alt">
          <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Шесть проблем — шесть разборов
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-base text-body">
              В каждом: масштаб проблемы в цифрах, механика решения по шагам,
              что получает агентство и ответы на частые сомнения.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {scenarioPages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/resheniya/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="font-display text-2xl font-bold text-accent">
                    {p.problem.stat}
                  </div>
                  <div className="mt-0.5 text-xs text-muted">
                    {p.problem.statLabel}
                  </div>
                  <h2 className="mt-3 font-display text-lg font-bold leading-snug text-heading transition-colors group-hover:text-accent">
                    {p.h1}
                  </h2>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Разбор решения
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* С чего начать */}
        <section className="bg-surface">
          <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              С чего начать автоматизацию
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {startSteps.map((s, i) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-blue-subtle/40 bg-white p-5 shadow-card"
                >
                  <span className="font-display text-sm font-bold text-muted">
                    Шаг {i + 1}
                  </span>
                  <h3 className="mt-1 font-display text-base font-bold text-heading">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10">
                  <BarChart3 className="h-5 w-5 text-accent" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-heading">
                    Как понять, что автоматизация работает
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    В личном кабинете видны все диалоги, телефоны клиентов и
                    воронка «подборки → клики → заявки», а раздел прогнозов
                    показывает спрос по направлениям и ожидаемые заявки до конца
                    месяца. Через месяц у вас есть цифры: сколько обращений
                    пришло ночью, сколько дошло до подбора, сколько стало
                    заявкой и во сколько обошёлся один лид.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                    >
                      Личный кабинет <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="/prognozy"
                      className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                    >
                      Прогнозы и аналитика <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href="/skolko-stoit"
                      className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                    >
                      Расчёт окупаемости <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface-alt">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-6 lg:px-8">
            <h2 className="text-center font-display text-2xl font-bold text-heading sm:text-3xl">
              Вопросы про автоматизацию турагентства
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
                href="/cifrovizaciya-turagentstva"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Гид: цифровизация турагентства{" "}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/chat-bot-dlya-turagentstva"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Чат-бот для турагентства <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/keisy/mgp"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
              >
                Кейс сети МГП <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

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
              Узнали свою проблему? Решите её за сегодня
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-white/70">
              Регистрация за 2 минуты, 30 дней бесплатно, подключение 0 ₽.
            </p>
            <div className="mt-6 flex justify-center">
              <RegisterCta source="resheniya_hub_bottom" compact dark />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
