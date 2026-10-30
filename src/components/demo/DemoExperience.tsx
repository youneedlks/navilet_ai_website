"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, ArrowRight, Info } from "lucide-react";
import Button from "@/components/ui/Button";
import DemoWidgetLoader from "@/components/demo/DemoWidgetLoader";
import { useLeadForm } from "@/contexts/LeadFormContext";
import {
  companyInfo,
  demoFaqItems,
  demoExampleQueries,
  demoAssistants,
  demoFallbackVersion,
  reqVersionPublished,
  type AssistantVersionId,
} from "@/lib/content";
import { lkRegisterUrl } from "@/lib/lk";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";
import { versionIcons } from "@/lib/version-icons";

declare global {
  interface Window {
    AimpactWidget?: { open: () => void; close?: () => void; toggle?: () => void };
  }
}

const demoVersions: {
  id: AssistantVersionId;
  name: string;
  caption: string;
  hint: string;
  Icon: typeof versionIcons.lid;
}[] = [
  ...(reqVersionPublished
    ? [
        {
          id: "req" as const,
          name: "Заявка",
          caption: "запрос без подборки",
          hint: "«Заявка» собирает запрос — куда, когда, кто едет, бюджет — и контакт, а тур подбирает ваш менеджер. Напишите запрос как турист и дойдите до сводки: такую заявку получит менеджер.",
          Icon: versionIcons.req,
        },
      ]
    : []),
  {
    id: "lid",
    name: "Лид",
    caption: "лидогенерация",
    hint: "«Лид» собирает запрос по шагам, показывает подборку и передаёт заявку с контактом менеджеру — попробуйте пройти путь клиента до заявки.",
    Icon: versionIcons.lid,
  },
  {
    id: "pro",
    name: "Про",
    caption: "полный инструмент",
    hint: "«Про» консультирует без ограничений: спросите про отель, пляж или питание, попросите сравнить варианты и проверить цену.",
    Icon: versionIcons.pro,
  },
];

const customization = [
  {
    title: "Брендирование",
    text: "Логотип, цвета, тон голоса и приветствие — под ваш бренд, без наших упоминаний.",
  },
  {
    title: "Ваши данные и контакты",
    text: "Телефоны, адреса офисов, ссылки на бронирование и базу туров — ваши, не демонстрационные.",
  },
  {
    title: "Настройки в кабинете",
    text: "Приветствие, кнопки-подсказки, каналы заявок и версия ассистента — переключаются в личном кабинете.",
  },
];

export default function DemoExperience() {
  const { openForm } = useLeadForm();
  const [version, setVersion] = useState<AssistantVersionId>("pro");
  // Виджет ставим только после чтения ?v= — иначе сначала загрузится «Про»
  // (версия по умолчанию) и останется на странице вторым виджетом.
  const [versionReady, setVersionReady] = useState(false);

  // Deep-link: /demo?v=req|lid|pro открывает нужную версию (карточки версий
  // на главной и /versii ведут сюда с предустановкой)
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("v");
    if (demoVersions.some((d) => d.id === v)) setVersion(v as AssistantVersionId);
    setVersionReady(true);
  }, []);

  const switchVersion = (next: AssistantVersionId) => {
    if (next === version) return;
    setVersion(next);
    reachMetrikaGoal(metrikaGoals.demoVersionSwitch, { version_id: next });
    // Обновляем ?v= без перезагрузки — ссылкой можно поделиться
    const url = new URL(window.location.href);
    url.searchParams.set("v", next);
    window.history.replaceState(null, "", url.toString());
  };

  const activeVersion = demoVersions.find((v) => v.id === version)!;
  const fallbackVersion = demoVersions.find(
    (v) => v.id === demoFallbackVersion
  )!;
  /** Ассистент для виджета: выбранная версия или доступная взамен */
  const liveAssistantId =
    demoAssistants[version] ?? demoAssistants[demoFallbackVersion]!;

  const openChat = () => {
    reachMetrikaGoal(metrikaGoals.demoChatOpen, { version_id: version });
    if (typeof window !== "undefined" && window.AimpactWidget) {
      window.AimpactWidget.open();
    }
  };

  const handleTrialClick = (source: string) => () => {
    reachMetrikaGoal(metrikaGoals.trialClick, {
      source,
      destination: "lk_register",
      version_id: version,
    });
  };

  /** Заявка на подключение с демо — с версией, которую человек тестировал. */
  const handleRequestClick = (source: string) => () =>
    openForm({ source, versionId: version, path: "request" });

  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-5 pt-28 pb-14 text-center sm:px-6 sm:pt-32 lg:px-8">
          <h1 className="font-display text-4xl font-bold leading-[1.1] text-heading sm:text-5xl">
            Попробуйте <span className="whitespace-nowrap">ИИ-ассистента</span> вживую
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-body">
            {version === "req"
              ? "Напишите ассистенту запрос, как турист: направление, даты, бюджет, число туристов. Он соберёт запрос и контакт для менеджера — как на сайте агентства. Без регистрации."
              : "Спросите ассистента про любой тур — направление, даты, бюджет, число туристов. Он подберёт реальные варианты и покажет карточки с ценами, как на сайте агентства. Без регистрации."}
          </p>

          {/* Переключатель версий: «Заявка» / «Лид» / «Про» */}
          <div className={`mx-auto mt-7 ${demoVersions.length > 2 ? "max-w-xl" : "max-w-md"}`}>
            <p className="mb-2.5 text-sm text-muted">Какую версию попробовать</p>
            <div
              role="tablist"
              aria-label="Версия демо-ассистента"
              className={`grid ${demoVersions.length > 2 ? "grid-cols-3" : "grid-cols-2"} gap-1 rounded-2xl border border-blue-subtle/50 bg-surface-alt p-1.5`}
            >
              {demoVersions.map((v) => {
                const active = version === v.id;
                return (
                  <button
                    key={v.id}
                    role="tab"
                    aria-selected={active}
                    onClick={() => switchVersion(v.id)}
                    className={`flex cursor-pointer flex-col items-center rounded-xl px-3 py-2.5 transition-all duration-200 ${
                      active
                        ? "bg-white shadow-[0_2px_8px_rgba(0,82,204,0.10)] ring-1 ring-blue-subtle/60"
                        : "hover:bg-white/60"
                    }`}
                  >
                    <span
                      className={`flex items-center gap-1.5 font-display text-sm font-bold sm:text-base ${
                        active ? "text-accent" : "text-heading"
                      }`}
                    >
                      <v.Icon className="h-4 w-4 shrink-0" />
                      <span className="sm:hidden">«{v.name}»</span>
                      <span className="hidden sm:inline">Версия «{v.name}»</span>
                    </span>
                    <span className="mt-0.5 text-[11px] font-medium text-muted sm:text-xs">
                      {v.caption}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-body">
              {activeVersion.hint}
            </p>
            {/* Страховка на случай, если демо версии нет в кабинете: чат
                открывает доступную версию, но говорим об этом прямо. */}
            {!demoAssistants[version] && (
              <p className="mt-3 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/70 px-3.5 py-2.5 text-left text-[13px] leading-relaxed text-amber-900">
                <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
                <span>
                  Живое демо версии «{activeVersion.name}» готовим — чат ниже
                  пока отвечает на версии «{fallbackVersion.name}». Нужна версия
                  «{activeVersion.name}» на вашем сайте — оставьте заявку, мы её
                  включим.
                </span>
              </p>
            )}
          </div>

          {/* Одно главное действие — открыть чат; подключение — ссылками под ним */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <Button variant="primary" size="lg" onClick={openChat}>
              <span className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Открыть чат
              </span>
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-semibold">
              <a
                href={lkRegisterUrl({ from: "demo_hero", versionId: version })}
                onClick={handleTrialClick("demo_hero")}
                className="inline-flex min-h-10 items-center text-accent hover:underline"
              >
                Подключить бесплатно
              </a>
              {/* Версия из тумблера уходит вместе с заявкой. */}
              <button
                type="button"
                onClick={handleRequestClick("demo_hero_request")}
                className="inline-flex min-h-10 cursor-pointer items-center text-body hover:text-accent hover:underline"
              >
                Подключить с менеджером
              </button>
            </div>
          </div>

          {/* Примеры запросов — что спросить у ассистента */}
          <div className="mx-auto mt-8 max-w-2xl">
            <p className="mb-3 text-sm text-muted">Примеры запросов — скопируйте в чат</p>
            <div className="flex flex-wrap justify-center gap-2">
              {demoExampleQueries.map((q) => (
                <span
                  key={q}
                  className="rounded-full border border-blue-subtle/60 bg-surface-alt px-4 py-2 text-sm text-body"
                >
                  «{q}»
                </span>
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {version === "req"
                ? "В конце ассистент покажет сводку запроса и попросит контакт — в демо заявка никуда не уходит."
                : "Когда придут карточки, нажмите под ними «Смотреть подборку» — откроется страница с турами, которую клиент получает ссылкой."}
            </p>
          </div>
        </div>
      </section>

      {/* Customization — всё под вас */}
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold text-heading sm:text-3xl">
            На вашем сайте ассистент работает под вашим брендом
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-body">
            В демо — наш нейтральный пример. При подключении ассистент говорит
            от имени вашего агентства.
          </p>
        </div>
        <ul className="mx-auto max-w-3xl divide-y divide-blue-subtle/50 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
          {customization.map((c) => (
            <li key={c.title} className="px-5 py-4 sm:px-6">
              <h3 className="font-display text-base font-bold text-heading">{c.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-body">{c.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ по демо */}
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center font-display text-2xl font-bold text-heading sm:text-3xl">
          Частые вопросы про демо
        </h2>
        <div className="space-y-4">
          {demoFaqItems.map((item) => (
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

        {/* Куда идти после демо: страница не должна быть тупиком ни для
            посетителя, ни для обхода поисковиками. */}
        <div className="mt-10">
          <h3 className="font-display text-base font-bold text-heading">
            Что посмотреть после демо
          </h3>
          <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {[
              {
                href: "/versii",
                label: reqVersionPublished
                  ? "Чем отличаются «Заявка», «Лид» и «Про»"
                  : "Чем «Лид» отличается от «Про»",
              },
              { href: "/tarify", label: "Тарифы и что входит в подписку" },
              { href: "/vidzhet", label: "Установка виджета на вашу платформу" },
              { href: "/max", label: "Тот же ассистент в мессенджере MAX" },
              { href: "/integraciya-tourvisor", label: "Откуда берутся туры и цены" },
              { href: "/podborki", label: "Подборки туров по ссылке" },
              { href: "/sravnenie", label: "Сравнение с другими решениями" },
              { href: "/keisy/mgp", label: "Кейс сети МГП" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              >
                <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #001229 0%, #002152 30%, #0062EF 70%, #0097F5 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-6 lg:px-8 lg:py-24">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Хотите такого ассистента себе?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/75">
            Подключим ассистента на ваш сайт и в MAX без программиста — с вашим брендом и данными. Первый месяц
            бесплатно — и самостоятельно, и с менеджером.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3">
            <a
              href={lkRegisterUrl({
                from: "demo_bottom",
                versionId: version,
              })}
              onClick={handleTrialClick("demo_bottom")}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-primary shadow-lg shadow-black/10 transition-all hover:bg-blue-ice hover:shadow-xl"
            >
              Подключить бесплатно
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={handleRequestClick("demo_bottom_request")}
              className="inline-flex min-h-10 cursor-pointer items-center text-sm font-semibold text-white/85 hover:text-white hover:underline"
            >
              Подключить с менеджером
            </button>
          </div>

          <p className="mt-8 text-sm text-white/60">
            <a href="https://t.me/navylet_ai" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Telegram
            </a>
            {" · "}
            <a href={`tel:${companyInfo.phoneRaw}`} className="whitespace-nowrap hover:text-white">
              {companyInfo.phone}
            </a>
            {" · "}
            <a href={`mailto:${companyInfo.email}`} className="hover:text-white">
              {companyInfo.email}
            </a>
          </p>
        </div>
      </section>

      {/* Виджет пересоздаётся при смене версии — меняется data-assistant-id */}
      {versionReady && <DemoWidgetLoader assistantId={liveAssistantId} />}
    </>
  );
}
