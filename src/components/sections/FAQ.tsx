"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { faqItems } from "@/lib/content";
import { ChevronDown } from "lucide-react";
import { jsonLdScript } from "@/lib/schema";

/**
 * Вопрос — нативный <details>: ответ всегда есть в HTML (его читают поисковики
 * и нейросети, которые не нажимают кнопки), а на экране он свёрнут до нажатия.
 */
function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group rounded-xl border border-blue-subtle/50 bg-white transition-shadow duration-300 hover:shadow-[0_2px_12px_rgba(0,82,204,0.06)]">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-4 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
        <h3 className="flex-1 font-display text-[15px] font-semibold leading-snug text-heading sm:text-base">{question}</h3>
        <ChevronDown className="h-5 w-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <div className="border-t border-blue-subtle/30 px-6 pb-5 pt-4">
        <p className="text-sm leading-relaxed text-body">{answer}</p>
      </div>
    </details>
  );
}

/**
 * На виду — шесть главных вопросов небольшого агентства (номера в faqItems),
 * остальные — под «Ещё вопросы». Все вопросы и ответы есть в HTML и совпадают с FAQPage.
 */
const FEATURED = [0, 1, 6, 7, 13, 10];

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (faqItems.length === 0) return null;

  return (
    <section id="faq" ref={ref} className="bg-surface-alt">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mx-auto max-w-3xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20"
      >
        <motion.div variants={fadeInUp} className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl">
            Частые <span className="text-accent">вопросы</span>
          </h2>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col gap-3">
          {FEATURED.map((idx) => (
            <FaqItem key={idx} question={faqItems[idx].question} answer={faqItems[idx].answer} />
          ))}
        </motion.div>
        {faqItems.length > FEATURED.length && (
          <motion.details variants={fadeInUp} className="group/more mt-6">
            <summary className="mx-auto flex min-h-11 w-fit cursor-pointer list-none items-center gap-1.5 rounded-xl border border-blue-subtle/60 bg-white px-5 text-sm font-semibold text-accent hover:bg-blue-ice/40 [&::-webkit-details-marker]:hidden">
              Ещё вопросы ({faqItems.length - FEATURED.length})
              <ChevronDown className="h-4 w-4 transition-transform group-open/more:rotate-180" />
            </summary>
            <div className="mt-6 flex flex-col gap-3">
              {faqItems.map((item, idx) =>
                FEATURED.includes(idx) ? null : <FaqItem key={idx} question={item.question} answer={item.answer} />
              )}
            </div>
          </motion.details>
        )}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdScript({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "@id": "https://navilet.ru/#faq",
              inLanguage: "ru-RU",
              isPartOf: { "@id": "https://navilet.ru/#webpage" },
              mainEntity: faqItems.map((item, idx) => ({
                "@type": "Question",
                "@id": `https://navilet.ru/#faq-question-${idx + 1}`,
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      </motion.div>
    </section>
  );
}
