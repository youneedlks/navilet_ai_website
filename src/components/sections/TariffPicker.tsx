"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { assistantVersions, pricingPlans, reqVersionPublished, type AssistantVersionId, type PricingPlan } from "@/lib/content";
import { lkRegisterUrl } from "@/lib/lk";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";

/**
 * Выбор тарифа на /tarify — как список поездок в Uber: строку называем тем, что
 * агентство знает о себе (сколько обращений в месяц), название тарифа — мелко,
 * действие одно — нажать на строку: регистрация сразу с этим тарифом и версией.
 * Полные таблицы, «Второй канал» и опции — ниже на странице, свёрнуты.
 */

/** Короткая подпись версии на переключателе — ситуация агентства. */
const HINT: Record<AssistantVersionId, string> = {
  req: "без Турвизора",
  lid: "подбор и заявка",
  pro: "консультации",
};

function values(plan: PricingPlan, v: AssistantVersionId) {
  if (v === "lid") return plan.lid;
  if (v === "req") return plan.req;
  return { price: plan.price, dialogs: plan.dialogs, extraDialog: plan.extraDialog };
}

const fmt = (n: number) => n.toLocaleString("ru-RU");

export default function TariffPicker() {
  const { openForm } = useLeadForm();
  const [version, setVersion] = useState<AssistantVersionId>("lid");

  // Ссылка /tarify?v=pro открывает линейку нужной версии (так ссылаются другие страницы)
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get("v");
    if (v === "pro" || v === "lid" || (v === "req" && reqVersionPublished)) setVersion(v);
  }, []);

  const switchVersion = (next: AssistantVersionId) => {
    if (next === version) return;
    setVersion(next);
    reachMetrikaGoal(metrikaGoals.versionSwitchPricing, { version_id: next });
    const url = new URL(window.location.href);
    url.searchParams.set("v", next);
    window.history.replaceState(null, "", url.toString());
  };

  const current = assistantVersions.find((v) => v.id === version) ?? assistantVersions[0];
  const plans = pricingPlans.filter((p) => !p.custom && values(p, version));
  const network = pricingPlans.find((p) => p.custom);

  return (
    <div className="mx-auto max-w-3xl">
      <div
        role="tablist"
        aria-label="Версия ассистента"
        className="grid gap-1 rounded-2xl border border-blue-subtle/50 bg-white p-1.5 shadow-card"
        style={{ gridTemplateColumns: `repeat(${assistantVersions.length}, minmax(0, 1fr))` }}
      >
        {assistantVersions.map((v) => {
          const on = v.id === version;
          return (
            <button
              key={v.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => switchVersion(v.id)}
              className={`flex min-h-14 cursor-pointer flex-col items-center justify-center rounded-xl px-2 py-2 transition-colors ${
                on ? "bg-accent text-white shadow-[0_6px_18px_rgba(0,98,239,0.25)]" : "text-heading hover:bg-accent/5"
              }`}
            >
              <span className="font-display text-sm font-bold sm:text-base">«{v.name}»</span>
              <span className={`text-[11px] sm:text-xs ${on ? "text-white/80" : "text-muted"}`}>{HINT[v.id]}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-sm text-body sm:text-base">
        {current.tagline}.{" "}
        <Link href="/versii" className="whitespace-nowrap font-semibold text-accent hover:underline">
          Чем отличаются версии
        </Link>
      </p>

      <ul className="mt-5 divide-y divide-blue-subtle/50 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white">
        {plans.map((plan) => {
          const v = values(plan, version)!;
          return (
            <li key={plan.id} id={plan.id} className="scroll-mt-28">
              <a
                href={lkRegisterUrl({ from: `tarify_${plan.id}`, planId: plan.id, versionId: version })}
                onClick={() => reachMetrikaGoal(metrikaGoals.trialClick, { source: `tarify_${plan.id}`, version_id: version })}
                className="flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-blue-ice/40 sm:gap-4 sm:px-6 sm:py-4"
              >
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15px] font-bold text-heading sm:text-lg">
                    до {v.dialogs} диалогов <span className="whitespace-nowrap">в месяц</span>
                  </span>
                  <span className="mt-0.5 block text-xs text-muted sm:text-sm">
                    «{plan.name}» · сверх лимита {v.extraDialog} ₽
                    {plan.popular && <span className="text-accent"> · выбирают чаще</span>}
                  </span>
                </span>
                <span className="whitespace-nowrap text-right font-display text-lg font-bold text-heading sm:text-xl">
                  {fmt(v.price)} ₽<span className="text-sm font-medium text-muted">/мес</span>
                </span>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted" aria-hidden />
              </a>
            </li>
          );
        })}
        {network && (
          <li id={network.id} className="scroll-mt-28">
            <button
              type="button"
              onClick={() => openForm({ planId: network.id, planName: network.name, versionId: version, source: "tarify_set", path: "request" })}
              className="flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-blue-ice/40 sm:gap-4 sm:px-6 sm:py-4"
            >
              <span className="min-w-0 flex-1">
                <span className="block font-display text-[15px] font-bold text-heading sm:text-lg">Сеть офисов или больше 250 диалогов</span>
                <span className="mt-0.5 block text-xs text-muted sm:text-sm">«{network.name}» · ассистент на каждый офис</span>
              </span>
              <span className="whitespace-nowrap text-right text-sm font-semibold text-body sm:text-base">индивидуально</span>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted" aria-hidden />
            </button>
          </li>
        )}
      </ul>

      <div className="mt-4 space-y-1.5 px-1 text-sm leading-relaxed text-body">
        <p>
          <span className="font-semibold text-heading">Диалог</span> — одно обращение посетителя к ассистенту, сколько бы
          сообщений в нём ни было.
        </p>
        <p>
          <span className="font-semibold text-heading">Сколько нужно?</span> Примерно столько, сколько обращений приходит
          с сайта или из MAX за месяц. Не хватит — доплата за диалог сверх лимита; тариф и версия меняются в кабинете
          в любой момент.
        </p>
      </div>

      <div className="mt-7 flex flex-col items-center gap-2">
        <Button
          variant="primary"
          size="lg"
          href={lkRegisterUrl({ from: "tarify_main", versionId: version })}
          onClick={() => reachMetrikaGoal(metrikaGoals.trialClick, { source: "tarify_main", version_id: version })}
        >
          Подключить бесплатно
        </Button>
        <button
          type="button"
          onClick={() => openForm({ versionId: version, source: "tarify_manager", path: "request" })}
          className="inline-flex min-h-10 cursor-pointer items-center text-sm font-semibold text-body hover:text-accent hover:underline"
        >
          Подключить с менеджером
        </button>
      </div>
    </div>
  );
}
