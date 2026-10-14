import { Children, cloneElement, isValidElement, type ReactNode } from "react";

/**
 * Пошаговая инструкция в статье блога:
 *
 *   <Steps>
 *     <Step title="Создайте модуль">Текст шага…</Step>
 *     <Step title="Вставьте код">…</Step>
 *   </Steps>
 *
 * Номера проставляются автоматически, шаги идут столбиком на любой ширине.
 */
export function Step({
  title,
  children,
  n,
}: {
  title: string;
  children?: ReactNode;
  n?: number;
}) {
  return (
    <div role="listitem" className="relative rounded-2xl border border-blue-subtle/50 bg-white p-4 pl-14 sm:p-5 sm:pl-16">
      <span
        aria-hidden="true"
        className="absolute left-4 top-4 flex h-8 w-8 sm:left-5 sm:top-5 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-white"
      >
        {n}
      </span>
      <p className="font-display font-semibold text-heading">{title}</p>
      <div className="steps-body mt-1.5 text-[0.95rem] text-body">{children}</div>
    </div>
  );
}

export function Steps({ children }: { children?: ReactNode }) {
  let n = 0;
  const items = Children.map(children, (child) => {
    if (!isValidElement<{ n?: number }>(child)) return null;
    n += 1;
    return cloneElement(child, { n });
  });
  // div вместо ol: стили .prose-navilet для ol/li добавили бы вторую нумерацию.
  return (
    <div role="list" className="not-prose my-8 flex flex-col gap-3">
      {items}
    </div>
  );
}
