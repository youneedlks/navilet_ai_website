/**
 * Картинка в статье блога с подписью.
 *   <Figure src="/blog/slug/kadr.webp" width={1600} height={1284} alt="…" caption="…" />
 * Размеры обязательны — место под картинку резервируется сразу, вёрстка не прыгает.
 * Клик открывает кадр целиком в новой вкладке: на телефоне мелкий текст экрана иначе не прочитать.
 */
export default function Figure({
  src,
  alt,
  caption,
  width,
  height,
}: {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}) {
  return (
    <figure className="not-prose my-8">
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
