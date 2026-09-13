import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/blog";
import { platformPages } from "@/lib/seo/platform-pages";
import { scenarioPages } from "@/lib/seo/scenario-pages";
import { demandPages } from "@/lib/seo/demand-pages";
import gitLastmod from "@/lib/seo/lastmod.json";

export const dynamic = "force-static";

/**
 * Даты из git: scripts/gen-lastmod.py пишет lastmod.json перед сборкой
 * (локально через prebuild, на сервере — из deploy.sh). Значения в
 * staticEntries ниже — запасной вариант на случай, если генератор
 * не отработал (например, сборка без git).
 */
const fromGit = gitLastmod as Record<string, string>;
const gitDate = (route: string, fallback: string): string =>
  fromGit[route] ?? fallback;

const siteUrl = "https://navilet.ru";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  /**
   * Запасная дата (YYYY-MM-DD), если для маршрута нет записи в lastmod.json.
   * Основной источник — git, см. scripts/gen-lastmod.py.
   */
  lastModified: string;
};

const staticEntries: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0, lastModified: "2026-08-13" }, // prettier-ignore
  { path: "/tarify", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-08-13" }, // prettier-ignore
  { path: "/skolko-stoit", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-08-13" }, // prettier-ignore
  { path: "/versii", changeFrequency: "weekly", priority: 0.9, lastModified: "2026-08-13" }, // prettier-ignore
  { path: "/podborki", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-08-19" }, // prettier-ignore
  { path: "/lidy-dlya-turagentstva", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-08-19" }, // prettier-ignore
  { path: "/chat-bot-dlya-turagentstva", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-09-12" }, // prettier-ignore
  { path: "/max", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-09-12" }, // prettier-ignore
  { path: "/sravnenie", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-09-12" }, // prettier-ignore
  { path: "/cifrovizaciya-turagentstva", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-09-13" }, // prettier-ignore
  { path: "/vozvrat-klientov", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-08-13" }, // prettier-ignore
  { path: "/demo", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-08-13" }, // prettier-ignore
  { path: "/start", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-08-13" }, // prettier-ignore
  { path: "/dlya-turagentstv", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-08-13" }, // prettier-ignore
  { path: "/dlya-turoperatorov", changeFrequency: "monthly", priority: 0.9, lastModified: "2026-08-13" }, // prettier-ignore
  { path: "/dlya-setey-agentstv", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-08-19" }, // prettier-ignore
  { path: "/integraciya-tourvisor", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-08-01" }, // prettier-ignore
  { path: "/keisy/mgp", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-08-01" }, // prettier-ignore
  { path: "/blog", changeFrequency: "weekly", priority: 0.8, lastModified: "2026-08-19" }, // prettier-ignore
  { path: "/voprosy", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-08-13" }, // prettier-ignore
  { path: "/o-komande", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-08-01" }, // prettier-ignore
  { path: "/faq", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-08-13" }, // prettier-ignore
  { path: "/dashboard", changeFrequency: "monthly", priority: 0.7, lastModified: "2026-08-13" }, // prettier-ignore
  { path: "/prognozy", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-07-12" }, // prettier-ignore
  { path: "/vidzhet", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-08-01" }, // prettier-ignore
  { path: "/resheniya", changeFrequency: "monthly", priority: 0.8, lastModified: "2026-08-01" }, // prettier-ignore
  { path: "/spros", changeFrequency: "weekly", priority: 0.8, lastModified: "2026-08-01" }, // prettier-ignore
  { path: "/karta-sayta", changeFrequency: "weekly", priority: 0.4, lastModified: "2026-08-13" }, // prettier-ignore
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3, lastModified: "2026-06-30" }, // prettier-ignore
];

/** Даты кластеров = дата последней правки соответствующего файла данных. */
const clusterEntries: Entry[] = [
  ...platformPages.map((p) => ({
    path: `/vidzhet/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: gitDate("/vidzhet/*", "2026-08-13"),
  })),
  ...scenarioPages.map((p) => ({
    path: `/resheniya/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    lastModified: gitDate("/resheniya/*", "2026-08-13"),
  })),
  ...demandPages.map((p) => ({
    path: `/spros/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    lastModified: gitDate("/spros/*", "2026-08-19"),
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = [
    ...staticEntries,
    ...clusterEntries,
  ].map((e) => ({
    url: `${siteUrl}${e.path === "/" ? "/" : e.path}`,
    lastModified: new Date(
      `${gitDate(e.path, e.lastModified)}T12:00:00+03:00`
    ),
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));

  const postUrls: MetadataRoute.Sitemap = getAllPostsMeta().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticUrls, ...postUrls];
}
