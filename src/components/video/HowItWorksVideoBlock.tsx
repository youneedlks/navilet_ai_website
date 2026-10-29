"use client";

import { useCallback, useState } from "react";
import { MessagesSquare, Search, LayoutGrid, Send } from "lucide-react";
import { howItWorks } from "@/lib/content";
import HowItWorksScene, { HOW_IT_WORKS_DURATION, howItWorksStage } from "@/components/video/HowItWorksScene";
import ScenePlayer from "@/components/video/ScenePlayer";

const ICONS = { MessagesSquare, Search, LayoutGrid, Send } as const;

const LABEL =
  "Пример диалога: турист просит тур в Турцию, ассистент уточняет детали, показывает три отеля, собирает подборку, берёт телефон и отправляет заявку менеджеру в Telegram.";

/**
 * «Как это работает»: шаги слева, ролик справа (сцена в коде страницы).
 * Шаг подсвечивается в тот момент, когда он идёт в ролике (howItWorksStage).
 * Шаги — текстом из content.ts: их читают поисковики и нейросети.
 */
export default function HowItWorksVideoBlock() {
  const [stage, setStage] = useState(0);
  const onStage = useCallback((s: number) => setStage(s), []);

  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
      <ol className="order-2 space-y-4 lg:order-1">
        {howItWorks.map((s, i) => {
          const Icon = ICONS[s.icon];
          const active = stage === i;
          return (
            <li
              key={s.title}
              className={`flex gap-4 rounded-2xl border p-5 transition-all duration-500 ${
                active
                  ? "border-accent/40 bg-white shadow-[0_8px_30px_rgba(0,98,239,0.12)]"
                  : "border-blue-subtle/40 bg-white/60"
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-500 ${
                  active ? "bg-accent text-white" : "bg-accent/10 text-accent"
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-heading">
                  {s.step}. {s.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-body sm:text-base">{s.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="order-1 mx-auto w-full max-w-[340px] lg:order-2 lg:max-w-[380px]">
        <ScenePlayer
          Scene={HowItWorksScene}
          duration={HOW_IT_WORKS_DURATION}
          stage={howItWorksStage}
          onStage={onStage}
          stillAt={11}
          controls
          label={LABEL}
        />
      </div>
    </div>
  );
}
