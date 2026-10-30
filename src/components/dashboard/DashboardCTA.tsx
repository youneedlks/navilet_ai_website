"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Button from "@/components/ui/Button";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { lkRegisterUrl } from "@/lib/lk";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";

/** Финал /dashboard — как на главной: одна главная кнопка, «с менеджером» — ссылкой, без декора. */
export default function DashboardCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { openForm } = useLeadForm();

  return (
    <section
      ref={ref}
      style={{
        background:
          "linear-gradient(135deg, #001229 0%, #002152 25%, #0062EF 55%, #0097F5 80%, #00E7FD 100%)",
      }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-3xl px-5 py-20 text-center sm:px-6 lg:px-8 lg:py-28"
      >
        <motion.h2
          variants={fadeInUp}
          className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Кабинет открывается сразу после регистрации
        </motion.h2>

        <motion.p variants={fadeInUp} className="mx-auto mb-8 max-w-lg text-lg text-white/75">
          30 дней бесплатно с первого диалога, подключение 0 ₽. Вход по паролю, договор поручения на обработку
          персональных данных.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3">
          <Button
            variant="white"
            size="lg"
            href={lkRegisterUrl({ from: "dashboard_cta" })}
            onClick={() => reachMetrikaGoal(metrikaGoals.trialClick, { source: "dashboard_cta" })}
          >
            Подключить бесплатно
          </Button>
          <button
            type="button"
            onClick={() => openForm({ source: "dashboard_cta", path: "request" })}
            className="inline-flex min-h-10 cursor-pointer items-center text-sm font-semibold text-white/85 hover:text-white hover:underline"
          >
            Подключить с менеджером
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
