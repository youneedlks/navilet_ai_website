"use client";

import { useCallback, useState } from "react";
import ScenePlayer from "@/components/video/ScenePlayer";
import { CABINET_DURATION, CABINET_NARROW, CABINET_WIDE, CabinetNarrowScene, CabinetWideScene, cabinetStage } from "@/components/video/CabinetScene";

const STEPS = [
  { title: "Заявка приходит", description: "Новый диалог наверху списка, уведомление — в Telegram, MAX или на почту." },
  { title: "Всё видно сразу", description: "Переписка, имя и телефон, «Запрос клиента» одной строкой." },
  { title: "Менеджер перехватывает", description: "Ассистент замолкает — клиенту отвечаете вы, прямо из кабинета." },
  { title: "Воронка в «Аналитике»", description: "Диалоги → запрос собран → контакт → заявка, по каждому этапу." },
];

const LABEL =
  "Пример работы в личном кабинете: в разделе «Диалоги» появляется новая заявка, менеджер открывает диалог, видит переписку, контакт и сводку запроса, нажимает «Перехватить» и отвечает клиенту сам, затем открывает воронку в «Аналитике».";

/** /dashboard: ролик кабинета — широкий на ПК, узкий на телефоне — и шаги под ним. */
export default function CabinetVideo() {
  const [active, setActive] = useState(0);
  const onStage = useCallback((s: number) => setActive(s), []);
  const player = { duration: CABINET_DURATION, stage: cabinetStage, onStage, stillAt: 12.5, controls: true, label: LABEL };
  return (
    <div>
      <div className="mx-auto hidden max-w-4xl md:block">
        <ScenePlayer
          {...player}
          Scene={CabinetWideScene}
          width={CABINET_WIDE.w}
          height={CABINET_WIDE.h}
          className="rounded-2xl border border-blue-subtle/60 bg-white shadow-[0_24px_60px_rgba(0,34,82,0.16)]"
        />
      </div>
      <div className="mx-auto max-w-[360px] md:hidden">
        <ScenePlayer
          {...player}
          Scene={CabinetNarrowScene}
          width={CABINET_NARROW.w}
          height={CABINET_NARROW.h}
          className="rounded-2xl border border-blue-subtle/60 bg-white shadow-xl"
        />
      </div>
      <ol className="mx-auto mt-8 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => {
          const on = active === i;
          return (
            <li
              key={s.title}
              className={`rounded-2xl border p-4 transition-all duration-500 ${
                on ? "border-accent/40 bg-white shadow-[0_8px_30px_rgba(0,98,239,0.12)]" : "border-blue-subtle/40 bg-white/60"
              }`}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg font-display text-sm font-bold transition-colors duration-500 ${
                  on ? "bg-accent text-white" : "bg-accent/10 text-accent"
                }`}
              >
                {i + 1}
              </span>
              <h3 className="mt-3 font-display text-base font-bold text-heading">{s.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-body">{s.description}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
