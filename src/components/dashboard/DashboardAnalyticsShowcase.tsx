"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
import { slideInLeft, slideInRight } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import RealDashboardFrame from "./RealDashboardFrame";
import RealAnalyticsContent from "./RealAnalyticsContent";

/**
 * Аналитика и прогнозы — одним блоком. Обзорный экран уже на первом экране страницы,
 * поэтому здесь — экран «Аналитика»; прогнозы — строкой со ссылкой на /prognozy.
 */
const POINTS = [
  "Сколько диалогов, подборок и заявок — за 7, 30 или 90 дней",
  "Воронка: от первого сообщения до заявки, с долей на каждом шаге",
  "Куда хотят клиенты: страны, курорты и города вылета",
  "Когда пишут: часы и дни недели, доля обращений в нерабочее время",
  "Какие туры ищут: звёзды и питание, бюджет клиента и найденная цена",
  "Выгрузка всех данных в CSV — для своих отчётов",
];

export default function DashboardAnalyticsShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper alt>
      <div ref={ref} className="grid items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-12">
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-5"
        >
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Аналитика: что ищут клиенты и сколько заявок
          </h2>
          <ul className="space-y-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-body sm:text-base">
                <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-body sm:text-base">
            <span className="font-semibold text-heading">Отчёты и прогнозы:</span> сколько заявок и денег принесёт месяц,
            прогноз на 4–6 недель и куда движется спрос по всей сети — у каждого числа видно, как оно посчитано.
          </p>
          <Link
            href="/prognozy"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
          >
            Подробнее об отчётах и прогнозах
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div variants={slideInRight} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <RealDashboardFrame activeScreen="analytics" animate={false}>
            <RealAnalyticsContent />
          </RealDashboardFrame>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
