"use client";

import { useEffect } from "react";

const LOADER_SRC = "https://lk.navilet.ru/widget-loader.js";

/** Всё, что рисует загрузчик кабинета, и сам тег загрузчика. */
const WIDGET_NODES =
  "script[data-assistant-id], .aimpact-launcher, .aimpact-frame, .aimpact-overlay, .aimpact-teaser";

/**
 * Очередь смен виджета. Загрузчик кабинета при выполнении сразу занимает
 * window.AimpactWidget, а кнопку и окно рисует позже — после ответа
 * /api/widget/config. Если убрать его тег раньше, он всё равно дорисуется:
 * на странице окажутся два виджета, и кнопка откроет не ту версию
 * (так было с /demo?v=lid и ?v=req до 18.10.2026). Поэтому следующий виджет
 * ставим только после того, как предыдущий дорисовался, и после его удаления.
 */
let queue: Promise<void> = Promise.resolve();

function removeWidget() {
  try {
    (window as unknown as { AimpactWidget?: { destroy?: () => void } })
      .AimpactWidget?.destroy?.();
  } catch {
    /* noop */
  }
  document.querySelectorAll(WIDGET_NODES).forEach((el) => el.remove());
}

/** Ждём кнопку виджета; если ассистент недоступен, кнопки не будет — выходим по таймауту. */
function waitForLauncher(timeoutMs = 6000): Promise<void> {
  return new Promise((resolve) => {
    if (document.querySelector(".aimpact-launcher")) return resolve();
    const observer = new MutationObserver(() => {
      if (document.querySelector(".aimpact-launcher")) {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(document.body, { childList: true });
    setTimeout(() => {
      observer.disconnect();
      resolve();
    }, timeoutMs);
  });
}

/**
 * Встраивает реальный демо-виджет «Навылет! AI» (lk.navilet.ru).
 *
 * У ассистента в ЛК есть список разрешённых доменов: /api/widget/config
 * отдаёт 403 «Domain not allowed» для origin, которого в списке нет.
 * Поэтому локально чат не поднимется — на navilet.ru он работает.
 */
export default function DemoWidgetLoader({
  assistantId,
}: {
  assistantId: string;
}) {
  useEffect(() => {
    let cancelled = false;

    queue = queue.then(async () => {
      if (cancelled) return;
      removeWidget();
      const script = document.createElement("script");
      script.src = LOADER_SRC;
      script.async = true;
      script.setAttribute("data-assistant-id", assistantId);
      const loaded = new Promise<void>((resolve) => {
        script.onload = () => resolve();
        script.onerror = () => resolve();
      });
      document.body.appendChild(script);
      await loaded;
      await waitForLauncher();
    });

    // Смена версии или уход со страницы (клиентская навигация Next): убираем
    // виджет, когда текущий дорисуется, — иначе launcher «прилипает» к сайту.
    return () => {
      cancelled = true;
      queue = queue.then(removeWidget);
    };
  }, [assistantId]);

  return null;
}
