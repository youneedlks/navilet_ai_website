"use client";

import { motion } from "framer-motion";
import {
  UserPlus,
  MailCheck,
  Rocket,
  ArrowRight,
  Sparkles,
  MessageSquare,
  Check,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import SkolkovoBadge from "@/components/ui/SkolkovoBadge";
import CountUp from "@/components/ui/CountUp";
import {
  startFaqItems,
  networkResults,
  reqVersionPublished,
  pricingPlans,
} from "@/lib/content";
import { lkRegisterUrl } from "@/lib/lk";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";
import { useLeadForm } from "@/contexts/LeadFormContext";

const fmt = (n: number) => n.toLocaleString("ru-RU").replace(/\s/g, "\u202F");

const steps = [
  {
    icon: UserPlus,
    title: "Зарегистрируйтесь",
    text: "Форма из трёх экранов: версия ассистента и вход; компания — сайт или MAX, контакты для клиентов, часы работы и офис (или «работаем только онлайн»); куда присылать заявки. Часы и офис сами попадут в базу знаний ассистента. Карта не нужна, форма сохраняется сама.",
  },
  {
    icon: MailCheck,
    title: "Получите доступ",
    text: "Проверяем заявку и в течение рабочего дня присылаем на почту доступ в кабинет, код виджета и инструкцию. В письме — как за минуту подключить заявки в Telegram или MAX.",
  },
  {
    icon: Rocket,
    title: "Вставьте код или подключите MAX",
    text: "Одна строка кода перед </body> — Tilda, WordPress, Битрикс подходят все. Для MAX — токен бота в кабинете, подключим за 1 рабочий день.",
  },
];

const included = [
  ...(reqVersionPublished
    ? [
        "Подбор туров по базе Tourvisor — 50+ стран, цены на момент запроса («Лид» и «Про»)",
        "Без Турвизора — сбор запроса и контакта, тур подбирает менеджер («Заявка», от 790 ₽/мес)",
      ]
    : ["Подбор туров по базе Tourvisor — 50+ стран, цены на момент запроса"]),
  "Ответы туристам 24/7 — ночью и в выходные",
  "Готовые заявки с контактами — на почту, в U‑ON, Telegram и MAX",
  "Виджет в вашем бренде: логотип и цвета",
];

export default function StartLanding() {
  const litePlan = pricingPlans.find((p) => p.id === "lite");
  const { openForm } = useLeadForm();

  const register = (source: string) => {
    reachMetrikaGoal(metrikaGoals.trialClick, { source });
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
        <div className="pointer-events-none absolute -left-20 top-1/3 h-[400px] w-[400px] rounded-full bg-[#0097F5]/[0.05] blur-[100px]" />

        <div className="relative mx-auto max-w-3xl px-5 pt-28 pb-12 text-center sm:px-6 sm:pt-32 lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            30 дней бесплатно · подключение 0 ₽
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-heading sm:text-5xl">
            <span className="whitespace-nowrap">ИИ-ассистент</span> на вашем сайте —{" "}
            <span className="text-accent">три коротких шага до запуска</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-body">
            Зарегистрируйтесь — в течение рабочего дня придут доступ в кабинет
            и код виджета. Вставьте его на сайт или подключите бота в MAX:
            ассистент отвечает туристам круглосуточно, заявки приходят
            менеджеру готовыми.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href={lkRegisterUrl({ from: "start_landing_hero" })}
              onClick={() => register("start_landing_hero")}
              className="inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-accent/25 transition-all duration-200 hover:shadow-xl hover:shadow-accent/35"
              style={{
                background:
                  "linear-gradient(135deg, #0062EF 0%, #0097F5 60%, #00CCF5 100%)",
              }}
            >
              Подключить бесплатно
              {/* На узком экране подпись переносится в две строки — стрелка
                  рядом с ней смотрится случайной, поэтому убираем её. */}
              <ArrowRight className="hidden h-5 w-5 sm:block" />
            </a>
            {/* Второй путь для тех, кто не хочет настраивать сам */}
            <button
              type="button"
              onClick={() => openForm({ source: "start_landing_hero_request", path: "request" })}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-blue-subtle/70 bg-white px-5 py-2.5 text-sm font-semibold text-heading shadow-sm transition-colors duration-200 hover:border-accent/40 hover:bg-blue-ice/40 hover:text-accent"
            >
              <ClipboardList className="h-4 w-4 text-accent" />
              Подключить с менеджером
            </button>
            <span className="text-sm text-muted">
              Сами в кабинете или с нашей помощью — цена одна
            </span>
          </div>

          {/* Trust row */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-blue-subtle/50 pt-7 text-sm text-muted">
            <span>Уже работает: сеть МГП · Sun Orange · AnyTour</span>
            <span aria-hidden className="hidden h-5 w-px bg-blue-subtle/60 sm:block" />
            <SkolkovoBadge imgClassName="h-6 w-auto" />
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-blue-subtle/40 bg-white p-6 shadow-card"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <s.icon className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-display text-base font-bold text-heading">
                {i + 1}. {s.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-body">{s.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Настоящий экран регистрации (демо-данные, кадр Кабинета 16.10) */}
        <figure className="mx-auto mt-8 max-w-xs">
          <img
            src="/kabinet/registraciya-shag2.webp"
            width={760}
            height={1694}
            loading="lazy"
            decoding="async"
            alt="Регистрация в кабинете «Навылет! AI», шаг 2 «Компания»: сайт или MAX, телефон менеджера, почта для клиентов, часы работы, адрес офиса или «Работаем только онлайн»"
            className="w-full rounded-2xl border border-blue-subtle/50 shadow-card"
          />
          <figcaption className="mt-3 text-center text-sm text-muted">
            Второй шаг регистрации: компания, контакты для клиентов, часы
            работы и офис
          </figcaption>
        </figure>
      </section>

      {/* What's included + price anchor */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-blue-subtle/40 bg-white p-7 shadow-card sm:p-8">
            <h2 className="font-display text-xl font-bold text-heading">
              Что делает ассистент
            </h2>
            <ul className="mt-5 space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-body">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Check className="h-3 w-3 text-accent" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/demo"
              className="mt-4 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              <MessageSquare className="h-4 w-4" />
              Попробовать демо-чат перед регистрацией
            </Link>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-accent/20 bg-gradient-to-br from-blue-ice/40 to-white p-7 shadow-card sm:p-8">
            <div>
              <h2 className="font-display text-xl font-bold text-heading">
                Сколько стоит после теста
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-body">
                30 дней с первого диалога и до 200 диалогов — бесплатно,
                подключение 0 ₽. Дальше —{" "}
                {reqVersionPublished && litePlan?.req && (
                  <>
                    от{"\u00A0"}
                    <span className="whitespace-nowrap font-semibold text-heading">
                      {fmt(litePlan.req.price)} ₽/мес
                    </span>{" "}
                    (версия «Заявка»),{" "}
                  </>
                )}
                от{"\u00A0"}
                <span className="whitespace-nowrap font-semibold text-heading">
                  {litePlan ? fmt(litePlan.lid.price) : "990"} ₽/мес
                </span>{" "}
                (версия «Лид», {litePlan?.lid.dialogs ?? 40} диалогов) или от{"\u00A0"}
                <span className="whitespace-nowrap font-semibold text-heading">
                  {litePlan ? fmt(litePlan.price) : "1 990"} ₽/мес
                </span>{" "}
                (версия «Про»). Для сетей — тариф «Сеть», условия
                индивидуальные.
              </p>
              <p className="mt-3 text-xs text-muted">
                Никаких автосписаний: карту вы не привязываете, оплата — по счёту и только по вашему решению.
              </p>
            </div>
            <Link
              href="/tarify"
              className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              Все тарифы
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Network results */}
      <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-blue-subtle/40 bg-white px-6 py-8 shadow-card sm:px-10">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-muted">
            {networkResults.eyebrow}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {networkResults.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl font-bold text-heading sm:text-3xl">
                  {s.display ?? (
                    <>
                      {s.prefix}
                      <CountUp
                        end={s.value ?? 0}
                        decimals={s.decimals}
                        separator={s.separator}
                      />
                      {s.suffix}
                    </>
                  )}
                </div>
                <div className="mt-1 text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-10 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-display text-2xl font-bold text-heading sm:text-3xl">
          Частые вопросы
        </h2>
        <div className="space-y-4">
          {startFaqItems.map((item) => (
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
        <div className="relative mx-auto max-w-3xl px-5 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Ассистент может работать у вас уже завтра
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
            Регистрация в три коротких шага или заявка менеджеру — первый
            месяц бесплатно в обоих случаях.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <a
              href={lkRegisterUrl({ from: "start_landing_bottom" })}
              onClick={() => register("start_landing_bottom")}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg shadow-black/10 transition-all hover:bg-blue-ice hover:shadow-xl"
            >
              Подключить бесплатно
              <ArrowRight className="h-5 w-5" />
            </a>
            <button
              type="button"
              onClick={() =>
                openForm({ source: "start_landing_bottom_request", path: "request" })
              }
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/35 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              <ClipboardList className="h-4 w-4" />
              Подключить с менеджером
            </button>
            <Link
              href="/demo"
              className="inline-flex min-h-10 items-center px-2 text-sm text-white/60 underline decoration-white/30 underline-offset-2 transition-colors hover:text-white"
            >
              Сначала посмотреть демо
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
