"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeInUp } from "@/lib/animations";
import { featureHighlights, features } from "@/lib/content";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { ArrowRight, ChevronDown, Globe, Info, Link2, MessageSquareText, Moon, RotateCcw } from "lucide-react";

/** Значки шести главных пунктов — по порядку featureHighlights. */
const HIGHLIGHT_ICONS = [Globe, Info, MessageSquareText, Link2, Moon, RotateCcw];

/**
 * «Что умеет» на главной: шесть пунктов строками вместо сетки из 18 карточек.
 * Полный список — под «Все функции ассистента»: текст остаётся в HTML для поиска.
 */
export default function Features() {
  return (
    <SectionWrapper id="features" paddingClassName="py-16 lg:py-20">
      <motion.div variants={fadeInUp} className="mb-10 text-center sm:mb-12">
        <h2 className="font-display text-3xl font-bold text-heading sm:text-4xl lg:text-[2.75rem]">
          Что умеет <span className="text-accent">ИИ-ассистент</span>
        </h2>
      </motion.div>

      <motion.ul variants={fadeInUp} className="mx-auto grid max-w-5xl gap-x-12 gap-y-7 sm:grid-cols-2">
        {featureHighlights.map((f, i) => {
          const Icon = HIGHLIGHT_ICONS[i];
          return (
            <li key={f.title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-ice text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-heading sm:text-lg">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-body sm:text-base">{f.description}</p>
                {"href" in f && f.href && (
                  <Link href={f.href} className="mt-1 inline-flex min-h-10 items-center gap-1 text-sm font-semibold text-accent hover:underline">
                    Подробнее
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </motion.ul>

      <motion.details variants={fadeInUp} className="group mx-auto mt-10 max-w-5xl">
        <summary className="mx-auto flex min-h-11 w-fit cursor-pointer list-none items-center gap-1.5 rounded-xl border border-blue-subtle/60 bg-white px-5 text-sm font-semibold text-accent hover:bg-blue-ice/40 [&::-webkit-details-marker]:hidden">
          Все функции ассистента ({features.length})
          <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
        </summary>
        <ul className="mt-8 grid gap-x-12 gap-y-5 sm:grid-cols-2">
          {features.map((f) => (
            <li key={f.title}>
              <h3 className="font-display text-base font-semibold text-heading">{f.title}</h3>
              <p className="mt-0.5 text-sm leading-relaxed text-body">{f.description}</p>
            </li>
          ))}
        </ul>
      </motion.details>
    </SectionWrapper>
  );
}
