"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { assistantVersions, type AssistantVersionId } from "@/lib/content";

/**
 * Версии на главной — строками, как список поездок в Uber: строку называем
 * ситуацией агентства (её человек узнаёт), версию и цену — второй строкой,
 * действие одно — нажать на строку. Подробности и ролик версии — на /versii.
 */
const SITUATION: Record<AssistantVersionId, string> = {
  req: "Нет Турвизора или туры подбирают менеджеры",
  lid: "Нужен подбор туров и заявки с телефоном",
  pro: "Нужны консультации и возврат клиентов",
};

export default function Versions() {
  return (
    <SectionWrapper id="versions" alt paddingClassName="py-16 lg:py-20">
      <motion.div variants={fadeInUp} className="mb-8 text-center sm:mb-10">
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Какая версия подойдёт <span className="text-accent">вашему агентству</span>
        </h2>
      </motion.div>

      <motion.ul
        variants={fadeInUp}
        className="mx-auto max-w-3xl divide-y divide-blue-subtle/50 overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white"
      >
        {assistantVersions.map((v) => (
          <li key={v.id}>
            <Link
              href={`/versii#v-${v.id}`}
              className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-blue-ice/40 sm:px-6 sm:py-5"
            >
              <span className="min-w-0 flex-1">
                <span className="block font-display text-base font-bold text-heading sm:text-lg">{SITUATION[v.id]}</span>
                <span className="mt-0.5 block text-sm text-body">
                  «{v.name}» · <span className="whitespace-nowrap">от {v.priceFrom.toLocaleString("ru-RU")} ₽/мес</span>
                </span>
              </span>
              <ChevronRight className="h-5 w-5 shrink-0 text-muted" aria-hidden />
            </Link>
          </li>
        ))}
      </motion.ul>

      <motion.div variants={fadeInUp} className="mt-6 text-center">
        <Link
          href="/versii"
          className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          Сравнить версии подробно
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </SectionWrapper>
  );
}
