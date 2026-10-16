"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { slideInLeft, slideInRight } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Palette, Eye, Code2, Sparkles, MessageCircle, Image, Send } from "lucide-react";

function FeaturePoint({
  icon: Icon,
  text,
}: {
  icon: typeof Eye;
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-blue-ice">
        <Icon className="h-3.5 w-3.5 text-accent" />
      </div>
      <span className="text-sm leading-relaxed text-body">{text}</span>
    </div>
  );
}

export default function DashboardWidgetShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper alt>
      <div
        ref={ref}
        className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-12 items-center"
      >
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="order-2 lg:order-1"
        >
          {/* Настоящий экран «Виджет» на демо-агентстве (кадр Кабинета 15.10;
              ниже на экране — код со стендовым адресом, поэтому только верх). */}
          <div className="overflow-hidden rounded-2xl border border-blue-subtle/50 bg-white shadow-card">
            <div className="flex items-center gap-1.5 border-b border-blue-subtle/40 bg-surface-alt px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs text-muted">lk.navilet.ru</span>
            </div>
            <img
              src="/kabinet/vidzhet-pk.webp"
              width={1600}
              height={1011}
              loading="lazy"
              decoding="async"
              alt="Кабинет «Навылет! AI», раздел «Виджет»: статус, три шага подключения и предпросмотр чата"
              className="block w-full"
            />
          </div>
        </motion.div>

        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-5 order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-ice px-4 py-1.5">
            <Palette className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">
              Кастомизация виджета
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold text-heading">
            Ваш бренд — ваш ассистент
          </h2>
          <p className="text-body leading-relaxed">
            В разделе «Виджет» — всё, что видит и слышит клиент: чат на сайте
            и бот в MAX. Изменения сразу видны в предпросмотре.
          </p>
          <div className="space-y-3">
            <FeaturePoint
              icon={Image}
              text="Свой логотип или готовые аватары: менеджер, ИИ-робот, глобус"
            />
            <FeaturePoint
              icon={Palette}
              text="Цвет, заголовок, подзаголовок и позиция справа или слева — под ваш бренд"
            />
            <FeaturePoint
              icon={MessageCircle}
              text="Приветствие, всплывающее приглашение над кнопкой чата и кнопки-подсказки"
            />
            <FeaturePoint
              icon={Eye}
              text="Предпросмотр: так виджет будет выглядеть на вашем сайте"
            />
            <FeaturePoint
              icon={Code2}
              text="Одна строка кода — кабинет сам проверяет, что код появился на сайте"
            />
            <FeaturePoint
              icon={Send}
              text="Бот в MAX: токен бота — в том же разделе"
            />
            <FeaturePoint
              icon={Sparkles}
              text="White-label: ассистент работает от имени вашего бренда, без сторонних упоминаний"
            />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
