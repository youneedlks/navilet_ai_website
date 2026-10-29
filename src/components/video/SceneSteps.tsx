"use client";

import { useCallback, useState, type ComponentType, type ReactNode } from "react";
import ScenePlayer from "@/components/video/ScenePlayer";

export type SceneStep = { title: string; description: string };

/**
 * Шаги текстом + ролик рядом. Шаг подсвечивается, пока он идёт в ролике;
 * текст шагов остаётся в HTML — его читают поисковики и нейросети.
 */
export default function SceneSteps({
  Scene,
  duration,
  stage,
  steps,
  label,
  width,
  height,
  stillAt,
  aside,
  footer,
}: {
  Scene: ComponentType<{ t: number }>;
  duration: number;
  stage: (t: number) => number;
  steps: SceneStep[];
  label: string;
  width: number;
  height: number;
  stillAt: number;
  aside?: ReactNode;
  /** Под шагами: кнопки, цена */
  footer?: ReactNode;
}) {
  const [active, setActive] = useState(0);
  const onStage = useCallback((s: number) => setActive(s), []);

  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_400px] lg:gap-14">
      <div className="order-2 lg:order-1">
        <ol className="space-y-3">
          {steps.map((s, i) => {
            const on = active === i;
            return (
              <li
                key={s.title}
                className={`flex gap-4 rounded-2xl border p-4 transition-all duration-500 sm:p-5 ${
                  on
                    ? "border-accent/40 bg-white shadow-[0_8px_30px_rgba(0,98,239,0.12)]"
                    : "border-blue-subtle/40 bg-white/60"
                }`}
              >
                <span
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold transition-colors duration-500 ${
                    on ? "bg-accent text-white" : "bg-accent/10 text-accent"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-heading sm:text-lg">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-body">{s.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
        {footer}
      </div>
      <div className="order-1 mx-auto w-full max-w-[360px] lg:order-2 lg:max-w-[400px]">
        <ScenePlayer
          Scene={Scene}
          duration={duration}
          stage={stage}
          onStage={onStage}
          width={width}
          height={height}
          stillAt={stillAt}
          controls
          aside={aside}
          className="rounded-2xl border border-[#E0E0E0]/50 bg-white shadow-xl"
          label={label}
        />
      </div>
    </div>
  );
}
