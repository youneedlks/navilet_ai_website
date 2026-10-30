"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { companyInfo, ctaContent } from "@/lib/content";
import { lkRegisterUrl } from "@/lib/lk";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";
import { useLeadForm } from "@/contexts/LeadFormContext";
import Button from "@/components/ui/Button";

/**
 * Финальный блок главной: одна главная кнопка — регистрация, рядом путь «с менеджером»
 * (та же модальная форма, что и в шапке) и контакты. Отдельная форма из 4 полей
 * дублировала модальную и удлиняла страницу.
 */
export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { openForm } = useLeadForm();

  return (
    <section
      id="cta"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #001229 0%, #002152 25%, #0062EF 55%, #0097F5 80%, #00E7FD 100%)",
      }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-6 lg:px-8 lg:py-28"
      >
        <motion.h2
          variants={fadeInUp}
          className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          {ctaContent.title}
        </motion.h2>
        <motion.p variants={fadeInUp} className="mx-auto mb-8 max-w-lg text-lg text-white/75">
          {ctaContent.subtitle}
        </motion.p>

        <motion.div variants={fadeInUp} className="flex flex-col items-center gap-3">
          <Button
            variant="white"
            size="lg"
            href={lkRegisterUrl({ from: "home_cta" })}
            onClick={() => reachMetrikaGoal(metrikaGoals.trialClick, { source: "home_cta" })}
          >
            {ctaContent.ctaPrimary}
          </Button>
          <button
            type="button"
            onClick={() => openForm({ source: "home_cta" })}
            className="inline-flex min-h-10 cursor-pointer items-center text-sm font-semibold text-white/85 hover:text-white hover:underline"
          >
            {ctaContent.ctaSecondary}
          </button>
        </motion.div>

        <motion.p variants={fadeInUp} className="mt-8 text-sm text-white/60">
          <a href={`tel:${companyInfo.phoneRaw}`} className="whitespace-nowrap hover:text-white">
            {companyInfo.phone}
          </a>
          {" · "}
          <a href={`mailto:${companyInfo.email}`} className="hover:text-white">
            {companyInfo.email}
          </a>
        </motion.p>
      </motion.div>
    </section>
  );
}
