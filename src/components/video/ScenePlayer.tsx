"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { SCENE_H, SCENE_W } from "@/components/video/HowItWorksScene";

/**
 * Вариант А пилота: сцена играет прямо на странице (без видеофайла).
 *  - время идёт от requestAnimationFrame и замирает, когда блок вне экрана;
 *  - при prefers-reduced-motion — статичный кадр `stillAt`;
 *  - масштаб под ширину колонки (сцена рисуется в 360×640);
 *  - onStage — для подсветки шагов рядом;
 *  - controls — строка под сценой: пауза и прогресс (ролик длиннее 5 секунд
 *    должен останавливаться — WCAG 2.2.2), справа можно добавить `aside`.
 */
export default function ScenePlayer({
  Scene,
  duration,
  stage,
  onStage,
  stillAt,
  label,
  width = SCENE_W,
  height = SCENE_H,
  initialAt = stillAt,
  controls = false,
  aside,
  className = "rounded-[28px] shadow-[0_24px_60px_rgba(0,34,82,0.28)]",
}: {
  Scene: ComponentType<{ t: number }>;
  duration: number;
  stage?: (t: number) => number;
  onStage?: (s: number) => void;
  stillAt: number;
  /** Текстовая замена для скринридеров */
  label: string;
  /** Логический размер сцены (по умолчанию 360×640) */
  width?: number;
  height?: number;
  /** Кадр до запуска скриптов (по умолчанию — stillAt) */
  initialAt?: number;
  controls?: boolean;
  aside?: ReactNode;
  className?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(initialAt);
  const [scale, setScale] = useState(1);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const pausedRef = useRef(false);
  const lastStage = useRef(-1);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / width));
    ro.observe(el);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setT(stillAt);
      return () => ro.disconnect();
    }

    let visible = false;
    let raf = 0;
    let prev = 0;
    let time = 0;
    let drawn = 0;
    const tick = (now: number) => {
      if (prev && !pausedRef.current) time = (time + (now - prev) / 1000) % duration;
      prev = now;
      // 30 кадров в секунду хватает для этих сцен и вдвое меньше нагружает процессор;
      // на паузе сцену не перерисовываем вовсе.
      if (!pausedRef.current && now - drawn >= 31) {
        drawn = now;
        setT(time);
      }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !visible) {
          visible = true;
          prev = 0;
          raf = requestAnimationFrame(tick);
        } else if (!e.isIntersecting && visible) {
          visible = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [duration, width, stillAt]);

  useEffect(() => {
    if (!stage || !onStage) return;
    const s = stage(t);
    if (s !== lastStage.current) {
      lastStage.current = s;
      onStage(s);
    }
  }, [t, stage, onStage]);

  const toggle = () => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
  };

  const stage_ = (
    <div
      ref={box}
      role="img"
      aria-label={label}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <Scene t={t} />
      </div>
    </div>
  );

  if (!controls) return stage_;
  return (
    <div>
      {stage_}
      <div className="mt-3 flex items-center gap-3">
        {!reduced && (
          <>
            <button
              type="button"
              onClick={toggle}
              aria-label={paused ? "Продолжить ролик" : "Поставить ролик на паузу"}
              className="flex h-8 w-8 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-blue-subtle/60 bg-white text-accent transition-colors hover:border-accent/40 hover:bg-accent/5"
            >
              {paused ? <Play className="h-3.5 w-3.5 translate-x-px fill-current" /> : <Pause className="h-3.5 w-3.5 fill-current" />}
            </button>
            <div aria-hidden className="h-1 min-w-12 flex-1 overflow-hidden rounded-full bg-blue-subtle/40">
              <div className="h-full rounded-full bg-accent" style={{ width: `${(t / duration) * 100}%` }} />
            </div>
          </>
        )}
        {aside}
      </div>
    </div>
  );
}
