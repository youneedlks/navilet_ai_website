"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { slideInLeft, slideInRight } from "@/lib/animations";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Image as ImageIcon, MessageCircle, Eye, Code2, Send, BadgeCheck } from "lucide-react";
import { TileItem } from "@/components/ui/Cards";

/** Раздел «Виджет» кабинета: что настраивается — простыми словами, у каждого пункта иконка на плитке. */
const POINTS = [
  { icon: ImageIcon, text: "Свой логотип или готовый аватар, цвет и заголовок — под ваш бренд" },
  { icon: MessageCircle, text: "Приветствие, приглашение над кнопкой чата и кнопки-подсказки" },
  { icon: Eye, text: "Предпросмотр: так виджет будет выглядеть на вашем сайте" },
  { icon: Code2, text: "Одна строка кода — кабинет сам проверит, что код появился на сайте" },
  { icon: Send, text: "Бот в MAX настраивается в том же разделе" },
  { icon: BadgeCheck, text: "Ассистент говорит от имени вашего агентства — без наших логотипов" },
];

export default function DashboardWidgetShowcase() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <SectionWrapper>
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
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Ваш бренд — ваш ассистент
          </h2>
          <p className="leading-relaxed text-body">
            В разделе «Виджет» — всё, что видит клиент: чат на сайте и бот в MAX. Изменения сразу видны в предпросмотре.
          </p>
          <ul className="space-y-3">
            {POINTS.map((p) => (
              <TileItem key={p.text} icon={p.icon}>
                {p.text}
              </TileItem>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
