import type { ComponentType, ElementType, ReactNode } from "react";

/**
 * Карточки сайта (решение владельца 31.10.2026, стиль «Б»): белая карточка с мягкой тенью
 * и иконка на плитке в цветах логотипа (как квадрат «AI»). Без плашек и «прыгающих» карточек.
 * На телефоне карточки компактные — иконка слева, текст справа, чтобы страница не растягивалась.
 */
export const cardClass =
  "rounded-2xl border border-blue-subtle/70 bg-white shadow-[0_1px_2px_rgba(10,22,40,0.04),0_10px_28px_-14px_rgba(0,82,204,0.18)]";

/** Плитка иконки: синий → голубой, как квадрат «AI» в логотипе. */
export const tileClass =
  "bg-gradient-to-br from-[#0052CC] via-[#0097F5] to-[#00CCF5] text-white shadow-[0_8px_18px_-8px_rgba(0,98,239,0.55)]";

type Icon = ComponentType<{ className?: string }>;

const TILE_SIZE = {
  sm: "h-8 w-8 rounded-lg [&>svg]:h-4 [&>svg]:w-4",
  md: "h-11 w-11 rounded-xl [&>svg]:h-5 [&>svg]:w-5",
} as const;

export function IconTile({ icon: I, size = "md", className = "" }: { icon: Icon; size?: keyof typeof TILE_SIZE; className?: string }) {
  return (
    <span className={`flex shrink-0 items-center justify-center ${TILE_SIZE[size]} ${tileClass} ${className}`} aria-hidden>
      <I />
    </span>
  );
}

/** С какой ширины карточка становится «вертикальной» (иконка сверху). Классы целиком — их видит Tailwind. */
const STACK = {
  sm: { card: "sm:block sm:p-6", body: "sm:mt-4" },
  lg: { card: "lg:block lg:p-6", body: "lg:mt-4" },
  never: { card: "sm:p-5", body: "" },
} as const;

export function FeatureCard({
  icon,
  title,
  children,
  titleAs: Title = "h3",
  stackFrom = "sm",
  className = "",
}: {
  icon: Icon;
  title: ReactNode;
  children?: ReactNode;
  titleAs?: ElementType;
  stackFrom?: keyof typeof STACK;
  className?: string;
}) {
  const s = STACK[stackFrom];
  return (
    <div className={`${cardClass} flex gap-4 p-4 ${s.card} ${className}`}>
      <IconTile icon={icon} />
      <div className={`min-w-0 ${s.body}`}>
        <Title className="font-display text-base font-bold text-heading sm:text-lg">{title}</Title>
        {children && <div className="mt-1 text-sm leading-relaxed text-body">{children}</div>}
      </div>
    </div>
  );
}

/** Шаг: номер на плитке, заголовок и текст. */
export function StepCard({
  n,
  title,
  children,
  titleAs: Title = "h3",
  stackFrom = "never",
  className = "",
}: {
  n: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  titleAs?: ElementType;
  stackFrom?: keyof typeof STACK;
  className?: string;
}) {
  const s = STACK[stackFrom];
  return (
    <div className={`${cardClass} flex gap-4 p-4 ${s.card} ${className}`}>
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-lg font-extrabold ${tileClass}`}
        aria-hidden
      >
        {n}
      </span>
      <div className={`min-w-0 ${s.body}`}>
        <Title className="font-display text-base font-bold text-heading">{title}</Title>
        {children && <div className="mt-1.5 text-sm leading-relaxed text-body">{children}</div>}
      </div>
    </div>
  );
}

/**
 * Цифра в карточке с лёгким голубым фоном. Ставить внутри <dl>.
 * compact — для трёх коротких цифр в ряд даже на телефоне (первые экраны).
 */
export function StatCard({
  value,
  label,
  children,
  center = false,
  compact = false,
  className = "",
}: {
  value: ReactNode;
  label: ReactNode;
  children?: ReactNode;
  center?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${cardClass} bg-gradient-to-br from-blue-ice/70 to-white ${compact ? "px-2.5 py-3 sm:p-5" : "p-5 sm:p-6"} ${
        center ? "text-center" : ""
      } ${className}`}
    >
      <dt className={`font-display font-extrabold text-primary-hover ${compact ? "text-lg sm:text-3xl" : "text-3xl sm:text-4xl"}`}>
        {value}
      </dt>
      <dd className={`font-semibold text-heading ${compact ? "mt-1 text-[11px] leading-snug sm:text-sm" : "mt-1.5 text-sm"}`}>{label}</dd>
      {children && (
        <dd className={`leading-relaxed ${compact ? "mt-1 text-[11px] text-muted sm:text-xs" : "mt-2 text-sm text-body"}`}>{children}</dd>
      )}
    </div>
  );
}

/** Пункт списка с маленькой плиткой-иконкой — для списков рядом с картинкой. */
export function TileItem({ icon, children }: { icon: Icon; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed text-body sm:text-base">
      <IconTile icon={icon} size="sm" className="mt-0.5" />
      <span>{children}</span>
    </li>
  );
}
