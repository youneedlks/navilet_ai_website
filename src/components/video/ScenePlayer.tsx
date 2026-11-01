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
    // 60 кадров в секунду (решение владельца 31.10.2026: ролики должны идти плавно; на 120-герцовых
    // экранах — тоже 60). Если устройство не успевает — кадры приходят с опозданием — сцена до конца
    // показа переходит на 30 кадров в секунду, чтобы на слабых телефонах не вернулись тормоза.
    const FAST = 1000 / 60 - 2;
    const SLOW = 1000 / 30 - 2;
    let interval = FAST;
    let frames = 0;
    let late = 0;
    const tick = (now: number) => {
      const dt = prev ? now - prev : 0;
      if (prev && !pausedRef.current) time = (time + dt / 1000) % duration;
      prev = now;
      if (interval === FAST && dt && !pausedRef.current) {
        frames++;
        if (dt > 24) late++;
        if (frames >= 60) {
          if (late > 12) interval = SLOW;
          frames = 0;
          late = 0;
        }
      }
      // На паузе сцену не перерисовываем вовсе.
      if (!pausedRef.current && now - drawn >= interval) {
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
      // Своя отрисовка: кадры ролика не заставляют телефон перерисовывать фон страницы
      // (размытые пятна, тени) — без этого на мобильных ролик подтормаживал.
      style={{ aspectRatio: `${width} / ${height}`, contain: "layout paint", transform: "translateZ(0)" }}
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
              className="flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-blue-subtle/60 bg-white text-accent transition-colors hover:border-accent/40 hover:bg-accent/5"
            >
              {paused ? <Play className="h-3.5 w-3.5 translate-x-px fill-current" /> : <Pause className="h-3.5 w-3.5 fill-current" />}
            </button>
            <div aria-hidden className="h-1 min-w-12 flex-1 overflow-hidden rounded-full bg-blue-subtle/40">
              {/* Сдвиг слоя вместо ширины: ширина на каждом кадре перерисовывала всю страницу */}
              <div
                className="h-full w-full origin-left rounded-full bg-accent"
                style={{ transform: `scaleX(${t / duration})`, willChange: "transform" }}
              />
            </div>
          </>
        )}
        {aside}
      </div>
    </div>
  );
}
