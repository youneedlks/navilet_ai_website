import { useCallback, useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { p } from "./HowItWorksScene";

/**
 * Лента чата для сцен: сообщения растут сверху вниз, а когда перестают помещаться,
 * лента плавно уезжает вверх. Высоты не задаются руками — после каждого кадра
 * берутся из вёрстки (шрифты в браузерах переносят строки по-разному, и ручные
 * высоты давали наложение сообщений).
 */
export function Feed({ viewH, children }: { viewH: number; children: ReactNode }) {
  const col = useRef<HTMLDivElement>(null);

  const layout = useCallback(() => {
    const el = col.current;
    if (!el) return;
    const items = [...el.querySelectorAll<HTMLElement>(":scope > [data-feed-k]")];
    // Сначала все чтения, потом все записи: чередование «прочитал высоту — записал высоту»
    // заставляло браузер пересчитывать раскладку на каждом сообщении в каждом кадре.
    const heights = items.map((w) => ((w.firstElementChild as HTMLElement | null)?.offsetHeight ?? 0) * Number(w.dataset.feedK));
    let total = 0;
    items.forEach((w, i) => {
      const h = `${heights[i]}px`;
      if (w.style.height !== h) w.style.height = h;
      total += heights[i];
    });
    const tr = `translateY(${-Math.max(0, total - viewH)}px)`;
    if (el.style.transform !== tr) el.style.transform = tr;
  }, [viewH]);

  useLayoutEffect(layout);

  // Статичный кадр (prefers-reduced-motion) не перерисовывается — пересчитать после загрузки шрифтов.
  useEffect(() => {
    document.fonts?.ready.then(layout);
  }, [layout]);

  return (
    <div ref={col} style={{ display: "flex", flexDirection: "column" }}>
      {children}
    </div>
  );
}

/** Элемент ленты: появляется в `start` и за 0.4 с раскрывается до своей высоты. */
export function FeedItem({ t, start, gap = 8, children }: { t: number; start: number; gap?: number; children: ReactNode }) {
  const k = p(t, start, 0.4);
  if (k <= 0) return null;
  return (
    <div data-feed-k={k} style={{ overflow: "hidden", flexShrink: 0 }}>
      <div style={{ opacity: k, transform: `translateY(${(1 - k) * 10}px)`, paddingBottom: gap }}>{children}</div>
    </div>
  );
}
