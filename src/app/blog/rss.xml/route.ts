import { getAllPostsMeta } from "@/lib/blog";

/**
 * RSS 2.0 для блога. Нужен для импорта в Дзен и агрегаторы, для подписки
 * в читалках и для ИИ-краулеров, которые следят за обновлениями по фиду.
 * Статический экспорт: файл собирается один раз при сборке.
 */
export const dynamic = "force-static";

const siteUrl = "https://navilet.ru";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rfc822(date: string): string {
  const d = new Date(`${date}T12:00:00+03:00`);
  return Number.isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString();
}

export function GET() {
  const posts = getAllPostsMeta();
  const latest = posts
    .map((p) => p.updated ?? p.date)
    .sort()
    .at(-1);

  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${siteUrl}/blog/${p.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${p.slug}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${esc(p.description)}</description>
      <category>${esc(p.category)}</category>
      <author>info@navilet.ru (${esc(p.author)})</author>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Блог «Навылет! AI» — ИИ в туризме</title>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Как турагентства внедряют ИИ-ассистентов: кейсы, цифры по сети партнёров, разборы стоимости и инструкции.</description>
    <language>ru</language>
    <lastBuildDate>${rfc822(latest ?? "")}</lastBuildDate>
    <image>
      <url>${siteUrl}/og-image.png</url>
      <title>Навылет! AI</title>
      <link>${siteUrl}/blog</link>
    </image>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
