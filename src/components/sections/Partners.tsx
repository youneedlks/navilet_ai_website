"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SkolkovoBadge from "@/components/ui/SkolkovoBadge";

/**
 * «Нам доверяют» на главной — коротко: логотипы одной строкой, кейс МГП одной
 * фразой, Сколково. Мероприятия целиком — на /o-komande#events.
 */
const LOGOS = [
  // Логотип МГП квадратный, надпись — узкой полосой посередине: показываем только её
  { src: "/partners/mgp-logo.svg", alt: "МГП — сеть магазинов горящих путёвок", h: "h-9 w-[180px] object-cover sm:h-10 sm:w-[200px]" },
  { src: "/partners/rst-logo.png", alt: "Российский союз туриндустрии", h: "h-12 sm:h-14" },
  { src: "/partners/tpp-logo.svg", alt: "Торгово-промышленная палата РФ", h: "h-12 sm:h-14" },
  { src: "/partners/plekhanov-logo.png", alt: "РЭУ им. Г.В. Плеханова", h: "h-12 sm:h-14" },
  { src: "/partners/mgimo-logo.svg", alt: "МГИМО", h: "h-12 sm:h-14" },
];

export default function Partners() {
  return (
    <SectionWrapper id="partners" paddingClassName="py-16 lg:py-20">
      <motion.div variants={fadeInUp} className="mb-8 text-center sm:mb-10">
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Нам <span className="text-accent">доверяют</span>
        </h2>
      </motion.div>

      <motion.ul variants={fadeInUp} className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-6">
        {LOGOS.map((l) => (
          <li key={l.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={l.src} alt={l.alt} loading="lazy" draggable={false} className={`${l.h.includes("object-cover") ? l.h : `${l.h} w-auto max-w-[160px] object-contain`} opacity-80 mix-blend-multiply grayscale`} />
          </li>
        ))}
        <li>
          <SkolkovoBadge imgClassName="h-9 w-auto sm:h-11" />
        </li>
      </motion.ul>

      {/* Логотипы — картинки; то же текстом, чтобы это читали поисковики и нейросети */}
      <motion.p variants={fadeInUp} className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted">
        Резидент ИТ-кластера Фонда «Сколково». Партнёры — сеть МГП, РСТ, ТПП РФ, <span className="whitespace-nowrap">РЭУ им. Г.В. Плеханова</span>, МГИМО.
      </motion.p>

      <motion.p variants={fadeInUp} className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-body">
        Сеть МГП — 396 офисов по России — первой внедрила ассистента в работу с клиентами.{" "}
        <Link href="/keisy/mgp" className="whitespace-nowrap font-semibold text-accent hover:underline">
          Как это было
        </Link>
      </motion.p>

      <motion.div variants={fadeInUp} className="mt-4 text-center">
        <Link href="/o-komande#events" className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
          Выступаем на отраслевых событиях
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </SectionWrapper>
  );
}
