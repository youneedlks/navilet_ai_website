import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { PostLink } from "@/lib/blog-utils";

/**
 * «По теме на сайте» — 2–3 карточки коммерческих страниц под статьёй.
 * Задаются полем `links` в шапке статьи. Стиль — как блок «По теме»
 * на /integraciya-tourvisor.
 */
export default function RelatedPages({ links }: { links: PostLink[] }) {
  if (links.length === 0) return null;
  return (
    <section aria-labelledby="related-pages" className="mt-12">
      <h2
        id="related-pages"
        className="font-display text-xl font-bold text-heading sm:text-2xl"
      >
        По теме на сайте
      </h2>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col rounded-2xl border border-blue-subtle/40 bg-white p-5 transition-colors hover:border-accent/40 hover:bg-blue-ice/20"
          >
            <p className="font-display font-semibold text-heading group-hover:text-accent">
              {item.title}
            </p>
            <p className="mt-2 flex-1 text-sm text-body">{item.text}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
              Перейти
              <ChevronRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
