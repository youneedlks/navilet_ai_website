"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { assistantVersions, type AssistantVersionId } from "@/lib/content";
import SceneSteps, { type SceneStep } from "@/components/video/SceneSteps";
import ReqScene, { REQ_DURATION, reqStage } from "@/components/video/ReqScene";
import LidScene, { LID_DURATION, lidStage } from "@/components/video/LidScene";
import HeroProScene, { HERO_PRO_DURATION, proStage } from "@/components/video/HeroProScene";
import { WIDGET_H, WIDGET_W } from "@/components/video/widgetKit";

/** Ролик и шаги для каждой версии: что увидит турист и что получит менеджер. */
const VIDEOS: Record<
  AssistantVersionId,
  { Scene: typeof ReqScene; duration: number; stage: (t: number) => number; stillAt: number; steps: SceneStep[]; label: string }
> = {
  req: {
    Scene: ReqScene,
    duration: REQ_DURATION,
    stage: reqStage,
    stillAt: 13,
    label: "Пример диалога в версии «Заявка»: ассистент уточняет даты, город вылета и бюджет, собирает сводку запроса, берёт имя и телефон и передаёт заявку менеджеру в Telegram.",
    steps: [
      { title: "Уточняет запрос", description: "Направление, даты, ночи, кто едет, город вылета, бюджет и пожелания — только то, чего не хватает." },
      { title: "Собирает сводку", description: "Параметры складываются в карточку «Запрос клиента». Туры и цены ассистент не называет — их подберёт менеджер." },
      { title: "Берёт контакт", description: "Имя и телефон — в той же переписке, без отдельных форм." },
      { title: "Отправляет заявку менеджеру", description: "Сводка и контакт — на почту, в U‑ON, Telegram или MAX. Менеджер подбирает тур и звонит." },
    ],
  },
  lid: {
    Scene: LidScene,
    duration: LID_DURATION,
    stage: lidStage,
    stillAt: 13.5,
    label: "Пример диалога в версии «Лид»: ассистент сразу берёт телефон, уточняет вылет и питание, показывает три тура с ценами, турист открывает подборку и бронирует отель, заявка уходит менеджеру.",
    steps: [
      { title: "Сразу берёт телефон", description: "Контакт известен с первых сообщений — даже если турист уйдёт «подумать», запрос останется у вас." },
      { title: "Подбирает туры", description: "Живой поиск по базе туроператоров Tourvisor: карточки с фото, датами и ценой на момент запроса." },
      { title: "Подборка и бронь в один клик", description: "Варианты — на странице под брендом агентства. Турист нажимает «Забронировать» прямо там." },
      { title: "Заявка с выбранным туром", description: "Менеджер получает телефон, параметры и выбранный отель — на почту, в U‑ON, Telegram или MAX." },
    ],
  },
  pro: {
    Scene: HeroProScene,
    duration: HERO_PRO_DURATION,
    stage: proStage,
    stillAt: 16.5,
    label: "Пример диалога в версии «Про»: ассистент уточняет детали, показывает три отеля, подробно рассказывает об отеле и о том, что входит в стоимость, и передаёт заявку менеджеру.",
    steps: [
      { title: "Уточняет детали", description: "Город вылета, даты, состав, звёздность и питание — как опытный менеджер." },
      { title: "Подбирает туры", description: "Карточки с фото и ценами, подборка одной страницей." },
      { title: "Консультирует без ограничений", description: "Отель, пляж, питание, что входит в стоимость — вопросы после подборки не ограничены." },
      { title: "Передаёт заявку менеджеру", description: "С подборкой и всеми параметрами. Клиентов, которые замолчали, Про возвращает в MAX." },
    ],
  },
};

export default function VersionVideos() {
  const versions = assistantVersions;
  const [id, setId] = useState<AssistantVersionId>(versions[0].id);
  const root = useRef<HTMLDivElement>(null);

  // Ссылка вида /versii#v-lid (строки версий на главной и на /versii) открывает нужную вкладку и прокручивает к ролику
  useEffect(() => {
    const fromHash = () => {
      const m = window.location.hash.match(/^#v-(req|lid|pro)$/);
      if (!m || !versions.some((v) => v.id === m[1])) return;
      setId(m[1] as AssistantVersionId);
      root.current?.scrollIntoView({ block: "start" });
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [versions]);
  const version = versions.find((v) => v.id === id) ?? versions[0];
  const v = VIDEOS[version.id];

  return (
    <div ref={root} className="scroll-mt-24">
      <div role="tablist" aria-label="Версия ассистента" className="mx-auto flex w-full max-w-xl gap-1 rounded-2xl border border-blue-subtle/50 bg-white p-1.5 shadow-card">
        {versions.map((x) => {
          const on = x.id === version.id;
          return (
            <button
              key={x.id}
              type="button"
              role="tab"
              id={`vv-tab-${x.id}`}
              aria-selected={on}
              aria-controls="vv-panel"
              onClick={() => setId(x.id)}
              className={`flex flex-1 cursor-pointer flex-col items-center rounded-xl px-2 py-2.5 transition-colors ${
                on ? "bg-accent text-white shadow-[0_6px_18px_rgba(0,98,239,0.25)]" : "text-heading hover:bg-accent/5"
              }`}
            >
              <span className="font-display text-sm font-bold sm:text-base">«{x.name}»</span>
              <span className={`whitespace-nowrap text-[11px] sm:text-xs ${on ? "text-white/80" : "text-muted"}`}>
                от {x.priceFrom.toLocaleString("ru-RU")} ₽/мес
              </span>
            </button>
          );
        })}
      </div>

      <div id="vv-panel" role="tabpanel" aria-labelledby={`vv-tab-${version.id}`} className="mt-8 sm:mt-10">
        <p className="mb-5 text-center text-base font-medium text-heading lg:text-left">{version.tagline}</p>
        <SceneSteps
          key={version.id}
          Scene={v.Scene}
          duration={v.duration}
          stage={v.stage}
          steps={v.steps}
          label={v.label}
          width={WIDGET_W}
          height={WIDGET_H}
          stillAt={v.stillAt}
          footer={
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 lg:justify-start">
              <Link
                href={`/demo?v=${version.id}`}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
              >
                Попробовать «{version.name}» в демо
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="text-sm text-muted">
                <span className="whitespace-nowrap">от {version.priceFrom.toLocaleString("ru-RU")} ₽/мес</span> · первый месяц бесплатно
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
}
