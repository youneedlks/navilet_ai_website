"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";
import { assistantVersions, demoAssistants, versionSituation, type AssistantVersionId } from "@/lib/content";
import { lkRegisterUrl } from "@/lib/lk";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";

/** Страницы с разбором сценария версии — ссылки внутри раскрытой строки. */
const MORE: Record<AssistantVersionId, { href: string; label: string; note?: ReactNode }[]> = {
  req: [{ href: "/blog/ii-assistent-bez-tourvisor", label: "Ассистент без Турвизора" }],
  lid: [
    {
      href: "/lidy-dlya-turagentstva",
      label: "Лиды для турагентства",
      note: (
        <>
          заявка по <span className="whitespace-nowrap">219–540 ₽</span> вместо{" "}
          <span className="whitespace-nowrap">1 500–5 000 ₽</span> из рекламы
        </>
      ),
    },
    { href: "/podborki", label: "Подборки по ссылке" },
  ],
  pro: [
    { href: "/vozvrat-klientov", label: "Возврат клиентов в MAX" },
    { href: "/podborki", label: "Подборки по ссылке" },
  ],
};

/**
 * Версии на /versii — строками, как на главной: строку называем ситуацией агентства,
 * по нажатию раскрывается полный список возможностей и действия версии. Список
 * лежит в <details>, поэтому он есть в HTML — поиск и ИИ-краулеры его видят.
 */
export default function VersionRows({ source }: { source: string }) {
  // Ссылка #v-… переключает ролик ниже (VersionVideos слушает hashchange). Если адрес
  // уже с этим якорем, браузер события не шлёт — шлём сами.
  const showVideo = (id: AssistantVersionId) => (e: MouseEvent) => {
    if (window.location.hash !== `#v-${id}`) return;
    e.preventDefault();
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  return (
    <ul className="mx-auto max-w-3xl divide-y divide-blue-subtle/50 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white text-left">
      {assistantVersions.map((v) => (
        <li key={v.id}>
          <details
            className="group"
            onToggle={(e) => {
              if (e.currentTarget.open) reachMetrikaGoal(metrikaGoals.versionSelect, { version_id: v.id, source });
            }}
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 transition-colors hover:bg-blue-ice/40 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 flex-1">
                <h2 className="font-display text-base font-bold text-heading sm:text-lg">{versionSituation[v.id]}</h2>
                <span className="mt-0.5 block text-sm text-body">
                  «{v.name}» · <span className="whitespace-nowrap">от {v.priceFrom.toLocaleString("ru-RU")} ₽/мес</span>
                </span>
              </span>
              <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
            </summary>

            <div className="border-t border-blue-subtle/40 bg-surface-alt/60 px-5 pb-6 pt-5 sm:px-6">
              <p className="font-medium text-heading">{v.tagline}.</p>
              <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {v.featureGroups.map((group) => (
                  <div key={group.title}>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-muted">{group.title}</h3>
                    <ul className="mt-2 space-y-1.5">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-body">
                          <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <ul className="mt-5 space-y-1 text-sm text-body">
                {MORE[v.id].map((m) => (
                  <li key={m.href}>
                    <Link href={m.href} className="font-semibold text-accent hover:underline">
                      {m.label}
                    </Link>
                    {m.note && <> — {m.note}</>}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
                <a
                  href={lkRegisterUrl({ from: `${source}_${v.id}`, versionId: v.id })}
                  onClick={() => reachMetrikaGoal(metrikaGoals.trialClick, { source: `${source}_${v.id}`, version_id: v.id })}
                  className="inline-flex items-center justify-center rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 transition-colors hover:bg-accent-hover"
                >
                  Подключить бесплатно
                </a>
                <a href={`#v-${v.id}`} onClick={showVideo(v.id)} className="inline-flex min-h-10 items-center text-sm font-semibold text-accent hover:underline">
                  Посмотреть ролик
                </a>
                {demoAssistants[v.id] && (
                  <Link
                    href={`/demo?v=${v.id}`}
                    onClick={() => reachMetrikaGoal(metrikaGoals.demoClick, { version_id: v.id, source })}
                    className="inline-flex min-h-10 items-center text-sm font-semibold text-accent hover:underline"
                  >
                    Попробовать в демо
                  </Link>
                )}
              </div>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
