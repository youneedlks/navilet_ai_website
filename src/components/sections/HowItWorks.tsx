"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SceneSteps from "@/components/video/SceneSteps";
import { CABINET_DURATION, CABINET_NARROW, CabinetNarrowScene, cabinetStage } from "@/components/video/CabinetScene";

/**
 * «Что получает менеджер»: второй ролик главной — сторона агентства (первый экран
 * показывает сторону туриста). Шаги совпадают с этапами ролика кабинета.
 */
const STEPS = [
  { title: "Заявка приходит сразу", description: "В Telegram, MAX, на почту или в U‑ON — с телефоном и запросом клиента." },
  { title: "Вся переписка — в кабинете", description: "Что искал клиент, что ему показали и что он выбрал." },
  { title: "Можно ответить самому", description: "Нажмите «Перехватить» — ассистент замолчит, клиенту ответит менеджер." },
  { title: "Видно, что работает", description: "Сколько диалогов, сколько из них стали заявками." },
];

export default function HowItWorks() {
  return (
    <SectionWrapper id="how-it-works" paddingClassName="py-16 lg:py-20">
      <motion.div variants={fadeInUp} className="mb-10 text-center lg:mb-14">
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Менеджер получает <span className="text-accent sm:whitespace-nowrap">готовую заявку</span>
        </h2>
      </motion.div>
      <SceneSteps
        Scene={CabinetNarrowScene}
        duration={CABINET_DURATION}
        stage={cabinetStage}
        steps={STEPS}
        width={CABINET_NARROW.w}
        height={CABINET_NARROW.h}
        stillAt={12.5}
        label="Пример работы в личном кабинете с телефона: приходит новая заявка, менеджер открывает диалог, видит запрос и контакт клиента, перехватывает диалог и отвечает сам, затем смотрит воронку в аналитике."
        footer={
          <Link
            href="/dashboard"
            className="mt-5 inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            Подробнее о кабинете
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />
    </SectionWrapper>
  );
}
