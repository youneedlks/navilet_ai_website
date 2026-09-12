interface SkolkovoBadgeProps {
  /** Классы для размера изображения (высота логотипа) */
  imgClassName?: string;
  /** Дополнительные классы контейнера */
  className?: string;
  /** true — логотип на первом экране: грузим сразу, без lazy */
  priority?: boolean;
}

/**
 * Официальный логотип фонда «Сколково».
 *
 * По брендбуку Фонда запрещено менять цвет, пропорции и добавлять эффекты —
 * поэтому логотип используется как есть (официальный зелёный) и только
 * на светлом фоне. Вокруг соблюдается охранное поле (padding контейнера).
 */
export default function SkolkovoBadge({
  imgClassName = "h-8 w-auto",
  className = "",
  priority = false,
}: SkolkovoBadgeProps) {
  return (
    <span
      className={`inline-flex items-center ${className}`}
      title="Резидент ИТ-кластера Фонда «Сколково»"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/partners/skolkovo-uchastnik.png"
        alt="Резидент ИТ-кластера Фонда «Сколково»"
        // Интринсик-размеры нужны, чтобы браузер зарезервировал место до
        // загрузки картинки: без них строка партнёров «прыгала» (CLS).
        width={701}
        height={206}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className={imgClassName}
        draggable={false}
      />
    </span>
  );
}
