"use client";

import { useEffect, useState } from "react";
import { BellRing, BookOpen, Check, Gift, Hand, Maximize2, Plug, X } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

/**
 * «Всё для работы с заявками — в одном кабинете»: настоящие экраны
 * lk.navilet.ru на демо-агентстве (скриншоты Кабинета от 15.10.2026, без цифр
 * клиентов; чип тарифа стенда закрашен). На телефоне — телефонные скриншоты,
 * где они есть. По клику картинка открывается на весь экран.
 */
const TABS = [
  {
    id: "notify",
    icon: BellRing,
    label: "Telegram и MAX",
    title: "Заявки и уведомления — в Telegram и MAX",
    points: [
      "До 5 чатов в каждом мессенджере: группа менеджеров или лично руководителю",
      "У каждого чата свои события: новые заявки, «клиент просит менеджера», ответы поддержки",
      "Подключение за минуту, без кодов: «Подключить» → «Старт» в мессенджере",
      "Заявка приходит целиком: имя, телефон, что искал клиент и кнопка «Открыть диалог»",
    ],
    pc: "/kabinet/telegram-pk.webp",
    phone: "/kabinet/telegram-telefon.webp",
    alt: "Кабинет «Навылет! AI», раздел «Интеграции → Telegram»: подключённые чаты и события",
  },
  {
    id: "integrations",
    icon: Plug,
    label: "Интеграции",
    title: "Куда приходят заявки — видно на одном экране",
    points: [
      "Почта — до 3 адресов; U‑ON подключаете сами, кабинет проверит доступ",
      "Битрикс24, amoCRM и вебхук — подключаем по заявке, ответ за 1 рабочий день",
      "Кнопка «Отправить тестовую заявку» и журнал событий",
      "Опечатка в почте для заявок? Кабинет заметит адрес на похожем, но чужом домене",
    ],
    pc: "/kabinet/integracii-pk.webp",
    phone: "/kabinet/integracii-telefon.webp",
    alt: "Кабинет «Навылет! AI», раздел «Интеграции»: почта, U‑ON, Telegram, MAX и другие CRM",
  },
  {
    id: "knowledge",
    icon: BookOpen,
    label: "База знаний",
    title: "Ассистент знает ваше агентство",
    points: [
      "«Об агентстве»: телефоны и офисы, часы работы, способы оплаты, рассрочка",
      "«Ответы и документы»: вставьте текст или загрузите Word или PDF — кабинет покажет, что взято",
      "«Тон общения»: дружелюбный, деловой, экспертный или свой",
      "Подсказка «Чего не хватает ассистенту» — заполняется в один клик",
      "Контакты не потеряются: удалить все телефоны можно только с подтверждением, а прежние значения поддержка вернёт одной кнопкой",
    ],
    pc: "/kabinet/baza-pk.webp",
    phone: "/kabinet/baza-telefon.webp",
    alt: "Кабинет «Навылет! AI», раздел «База знаний → Об агентстве»",
  },
  {
    id: "takeover",
    icon: Hand,
    label: "Ответ менеджера",
    title: "Менеджер отвечает клиенту прямо из кабинета",
    points: [
      "Кнопка «Перехватить» — ассистент замолкает, менеджер пишет сам",
      "Работает и на сайте, и в MAX; потом — «Вернуть боту»",
      "Рядом — запрос клиента, контакты и путь по диалогу",
    ],
    pc: "/kabinet/dialog-pk.webp",
    phone: null,
    alt: "Кабинет «Навылет! AI», карточка диалога: переписка, запрос клиента и кнопка «Перехватить»",
  },
  {
    id: "trial",
    icon: Gift,
    label: "Пробный период",
    title: "Пробный период — счётчик на виду",
    points: [
      "30 дней с первого диалога и до 200 диалогов — что наступит раньше",
      "«N из 200 диалогов» — на карточке пробного периода и в меню кабинета",
      "С 160-го диалога — предупреждение, сколько осталось",
      "Тариф выбираете в кабинете, оплата — по счёту",
    ],
    pc: "/kabinet/probnyi-pk.webp",
    phone: "/kabinet/probnyi-telefon.webp",
    alt: "Кабинет «Навылет! AI», «Тариф и оплата»: пробный период, день 10 из 30, 172 из 200 диалогов и предупреждение «Осталось 28 диалогов»",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function DashboardKabinetTour() {
  const [active, setActive] = useState<TabId>("notify");
  const [zoom, setZoom] = useState(false);
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];

  // Esc закрывает увеличение; страница под ним не прокручивается.
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [zoom]);

  return (
    <SectionWrapper>
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-blue-ice px-4 py-1.5 text-sm font-semibold text-accent">
          Новое в кабинете
        </span>
        <h2 className="mt-4 font-display text-3xl font-bold text-heading sm:text-4xl">
          Всё для работы с заявками — в одном кабинете
        </h2>
        <p className="mt-3 text-body">
          Настоящие экраны lk.navilet.ru на демо-агентстве.
        </p>
      </div>

      {/* На телефоне вкладки — сеткой по две в ряд (нечётная последняя — во всю ширину), чтобы все были видны без прокрутки */}
      <div
        role="tablist"
        aria-label="Разделы кабинета"
        className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-1 rounded-2xl border border-blue-subtle/50 bg-surface-alt p-1.5 sm:flex"
      >
        {TABS.map((t) => {
          const on = t.id === active;
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(t.id)}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${TABS.length % 2 ? "last:col-span-2" : ""} ${
                on
                  ? "bg-white text-accent shadow-[0_2px_8px_rgba(0,82,204,0.10)] ring-1 ring-blue-subtle/60"
                  : "text-heading hover:bg-white/60"
              }`}
            >
              <t.icon className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Текст над скриншотом, скриншот — на всю ширину: так экран кабинета
          читается без увеличения. */}
      <div className="mx-auto mt-10 max-w-6xl space-y-8">
        <div className="space-y-4">
          <h3 className="font-display text-2xl font-bold text-heading">
            {tab.title}
          </h3>
          <ul className="grid gap-3 md:grid-cols-2 md:gap-x-10">
            {tab.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-body">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                  <Check className="h-3 w-3 text-accent" />
                </span>
                <span className="text-sm leading-relaxed sm:text-base">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => setZoom(true)}
          aria-label="Открыть экран кабинета крупно"
          className="group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-[#E2E8F0] bg-white text-left shadow-lg"
        >
          <div className="flex items-center gap-2 border-b border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-2 flex-1 rounded-md bg-white px-3 py-1 text-[10px] text-[#64748B]">
              lk.navilet.ru
            </span>
          </div>
          <picture>
            {tab.phone && <source media="(max-width: 639px)" srcSet={tab.phone} />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tab.pc}
              alt={tab.alt}
              className="block w-full"
              loading="lazy"
            />
          </picture>
          <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-heading/80 px-3 py-1.5 text-xs font-semibold text-white opacity-90 transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3.5 w-3.5" />
            Крупнее
          </span>
        </button>
      </div>

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={tab.alt}
          onClick={() => setZoom(false)}
          className="fixed inset-0 z-[100] overflow-auto bg-[#001229]/85 p-3 backdrop-blur-sm sm:p-8"
        >
          <button
            type="button"
            onClick={() => setZoom(false)}
            aria-label="Закрыть"
            className="fixed right-3 top-3 z-[101] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white text-heading shadow-lg sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tab.pc}
            alt={tab.alt}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto block w-full max-w-[1600px] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </SectionWrapper>
  );
}
