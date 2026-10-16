import gitLastmod from "@/lib/seo/lastmod.json";

/**
 * Дата последней содержательной правки страницы — из git (scripts/gen-lastmod.py),
 * как lastmod в sitemap. В JSON-LD dateModified берём отсюда, а не new Date(): дата
 * сборки «обновляет» страницу при каждом деплое, и поисковики перестают верить дате.
 */
export function lastModified(route: string, fallback: string): string {
  return (gitLastmod as Record<string, string>)[route] ?? fallback;
}
