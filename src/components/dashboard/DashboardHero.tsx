"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations";
import Button from "@/components/ui/Button";
import RealDashboardFrame from "./RealDashboardFrame";
import RealOverviewContent from "./RealOverviewContent";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { lkRegisterUrl } from "@/lib/lk";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";

/**
 * Первый экран /dashboard отвечает на вопрос «что увидят менеджеры». Одна главная
 * кнопка — регистрация; демо и менеджер — ссылками, как на главной.
 */
export default function DashboardHero() {
  const { openForm } = useLeadForm();

  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-5 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:flex-row lg:items-start lg:gap-12 lg:px-8 lg:pt-36 lg:pb-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:pt-8 lg:text-left"
        >
          <motion.h1
            variants={fadeInUp}
            className="mb-6 font-display text-3xl font-bold leading-[1.1] text-heading sm:text-5xl lg:text-[3.25rem]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Личный кабинет: <span className="text-accent">заявки, диалоги и аналитика</span> в одном месте
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mb-8 max-w-xl text-base leading-relaxed text-body sm:text-lg"
          >
            Менеджер видит каждую заявку — переписку, телефон и что искал клиент — и может ответить сам.
            Заявки приходят в Telegram, MAX, на почту или в U‑ON, кабинет работает и с телефона.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3 lg:items-start">
            <Button
              variant="primary"
              size="lg"
              href={lkRegisterUrl({ from: "dashboard_hero" })}
              onClick={() => reachMetrikaGoal(metrikaGoals.trialClick, { source: "dashboard_hero" })}
            >
              Подключить бесплатно
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-semibold lg:justify-start">
              <Link href="/demo" className="inline-flex min-h-10 items-center text-accent hover:underline">
                Посмотреть демо
              </Link>
              <button
                type="button"
                onClick={() => openForm({ source: "dashboard_hero", path: "request" })}
                className="inline-flex min-h-10 cursor-pointer items-center text-body hover:text-accent hover:underline"
              >
                Подключить с менеджером
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="w-full flex-shrink-0 lg:w-[620px]"
        >
          <RealDashboardFrame activeScreen="overview" animate={false}>
            <RealOverviewContent />
          </RealDashboardFrame>
        </motion.div>
      </div>
    </section>
  );
}
