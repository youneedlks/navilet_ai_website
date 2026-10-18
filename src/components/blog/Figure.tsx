/**
 * Картинка в статье блога с подписью.
 *   <Figure src="/blog/slug/kadr.webp" width={1600} height={1284} alt="…" caption="…" />
 * Размеры обязательны — место под картинку резервируется сразу, вёрстка не прыгает.
 * Клик открывает кадр целиком в новой вкладке: на телефоне мелкий текст экрана иначе не прочитать.
 * narrow — для вертикальных кадров (окно, телефон): не шире ~420 px, по центру.
 */
export default function Figure({
  src,
  alt,
  caption,
  width,
  height,
  narrow = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  narrow?: boolean;
}) {
  return (
    <figure className={`not-prose my-8 ${narrow ? "mx-auto max-w-[420px]" : ""}`}>
      <a href={src} target="_blank" rel="noopener" className="block">
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="h-auto w-full rounded-xl border border-blue-subtle/50 shadow-card"
        />
      </a>
      {caption && (
        <figcaption className="mt-2.5 text-center text-sm leading-relaxed text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
