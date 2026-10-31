"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { integrationSteps } from "@/lib/content";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { StepCard } from "@/components/ui/Cards";

/**
 * «Подключение без программиста» — три шага строками. Код виджета и инструкции
 * по платформам — на /vidzhet, на главной они только добавляли шум.
 */
export default function Integration() {
  return (
    <SectionWrapper id="integration" alt paddingClassName="py-16 lg:py-20">
      <motion.div variants={fadeInUp} className="mb-8 text-center sm:mb-10">
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Подключение <span className="text-accent">без программиста</span>
        </h2>
      </motion.div>

      <motion.ol variants={fadeInUp} className="mx-auto grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {integrationSteps.map((step) => (
          <li key={step.step}>
            <StepCard n={step.step} title={step.title} stackFrom="sm" className="h-full">
              {step.description}
            </StepCard>
          </li>
        ))}
      </motion.ol>

      <motion.div variants={fadeInUp} className="mt-6 text-center">
        <Link href="/vidzhet" className="inline-flex min-h-10 items-center gap-1.5 text-sm font-semibold text-accent hover:underline">
          Инструкции по платформам
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>
    </SectionWrapper>
  );
}
