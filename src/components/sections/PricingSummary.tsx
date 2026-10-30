"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { assistantVersions, pricingPlans, type AssistantVersionId } from "@/lib/content";
import { lkRegisterUrl } from "@/lib/lk";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";

/**
 * Тарифы на главной — коротко: цена входа и диалоги каждой версии строками,
 * одна кнопка. Полная сетка тарифов, «Второй канал» и сравнение — на /tarify (Pricing).
 */
const entry = pricingPlans[0];
const DIALOGS: Record<AssistantVersionId, number | undefined> = {
  req: entry.req?.dialogs,
  lid: entry.lid.dialogs,
  pro: entry.dialogs,
};

export default function PricingSummary() {
  return (
    <SectionWrapper id="pricing" alt paddingClassName="py-16 lg:py-20">
      <motion.div variants={fadeInUp} className="mb-8 text-center sm:mb-10">
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Сколько стоит <span className="text-accent">ИИ-ассистент</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base text-body">
          Первый месяц бесплатно, подключение 0 ₽, отмена в любой момент.
        </p>
      </motion.div>

      <motion.ul
        variants={fadeInUp}
        className="mx-auto max-w-3xl divide-y divide-blue-subtle/50 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white"
      >
        {assistantVersions.map((v) => (
          <li key={v.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-5 py-4 sm:px-6">
            <span className="font-display text-base font-bold text-heading sm:text-lg">«{v.name}»</span>
            <span className="text-sm text-body sm:text-base">
              <span className="whitespace-nowrap font-display text-lg font-bold text-heading sm:text-xl">
                от {v.priceFrom.toLocaleString("ru-RU")} ₽/мес
              </span>
              {DIALOGS[v.id] ? <span className="whitespace-nowrap"> · {DIALOGS[v.id]} диалогов</span> : null}
            </span>
          </li>
        ))}
      </motion.ul>

      <motion.div variants={fadeInUp} className="mt-8 flex flex-col items-center gap-2">
        <Button
          variant="primary"
          size="lg"
          href={lkRegisterUrl({ from: "home_pricing" })}
          onClick={() => reachMetrikaGoal(metrikaGoals.trialClick, { source: "home_pricing" })}
        >
          Подключить бесплатно
        </Button>
        <Link href="/tarify" className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
          Все тарифы и сравнение
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </SectionWrapper>
  );
}
