"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import {
  TrendingUp,
  Zap,
  Download,
  Share2,
  Shield,
  Scaling,
} from "lucide-react";

const benefits = [
  {
    title: "Воронка конверсии",
    description:
      "Отслеживайте путь каждого лида: от первого сообщения до запроса на бронирование с процентами каждого этапа.",
    icon: TrendingUp,
  },
  {
    title: "Бизнес-инсайты",
    description:
      "Автоматические выводы: топ-направления, средний бюджет, % обращений вне рабочих часов, вовлечённость.",
    icon: Zap,
  },
  {
    title: "Экспорт данных",
    description:
      "Скачайте все диалоги и аналитику в CSV — для CRM, отчётов руководству или маркетинговых исследований.",
    icon: Download,
  },
  {
    title: "Мультиканальность",
    description:
      "Сайт и MAX — один ассистент и один кабинет на оба канала: диалоги, заявки и аналитика в одном месте.",
    icon: Share2,
  },
  {
    title: "Безопасность",
    description:
      "Вход по паролю, договор поручения на обработку персональных данных. Контакты агентства не потеряются: удалить все телефоны можно только с подтверждением, а прежние значения поддержка вернёт одной кнопкой.",
    icon: Shield,
  },
  {
    title: "Масштабируемость",
    description:
      "От небольшого офиса до сети: лимит диалогов растёт вместе с тарифом, а для сетей тариф «Сеть» считается под ваш поток.",
    icon: Scaling,
  },
];

export default function DashboardBenefits() {
  return (
    <SectionWrapper>
      <motion.div variants={fadeInUp} className="mb-12 text-center">
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Возможности{" "}
          <span className="text-accent">кабинета</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-body">
          Инструменты, которые помогают превращать диалоги в продажи
        </p>
      </motion.div>

      {/* Benefits grid */}
      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {benefits.map((benefit, i) => {
          const Icon = benefit.icon;
          return (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white p-6 shadow-[0_1px_3px_rgba(0,82,204,0.04),0_4px_16px_rgba(0,82,204,0.05)] transition-all duration-300 hover:border-accent/25 hover:shadow-[0_4px_12px_rgba(0,82,204,0.08),0_12px_40px_rgba(0,82,204,0.07)]"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent/[0.04] transition-all duration-500 group-hover:scale-[1.8] group-hover:bg-accent/[0.07]" />
              <div className="relative h-full">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-ice transition-colors duration-300 group-hover:bg-accent/10">
                  <Icon className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mb-2 font-display text-base font-semibold text-heading">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-body">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
