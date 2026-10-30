"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  staggerContainer,
  heroWordVariant,
  heroRise,
  heroScaleIn,
  fadeIn,
} from "@/lib/animations";
import { heroContent, priceFromLabel } from "@/lib/content";
import { lkRegisterUrl } from "@/lib/lk";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";
import Button from "@/components/ui/Button";
import Link from "next/link";
import ScenePlayer from "@/components/video/ScenePlayer";
import HeroProScene, { HERO_PRO_DURATION, HERO_PRO_H, HERO_PRO_W } from "@/components/video/HeroProScene";
import SkolkovoBadge from "@/components/ui/SkolkovoBadge";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { Globe, MessageSquare } from "lucide-react";

function PartnerLogos() {
  return (
    <motion.div
      variants={fadeIn}
      className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-t border-blue-subtle/50 pt-8 lg:justify-start"
    >
      <span className="text-sm text-muted">Работает в</span>
      <div className="flex items-center gap-2 text-muted transition-colors hover:text-accent">
        <Globe className="h-5 w-5" />
        <span className="text-sm font-medium">Веб-сайт</span>
      </div>
      <div className="flex items-center gap-2 text-muted transition-colors hover:text-accent">
        <MessageSquare className="h-5 w-5" />
        <span className="text-sm font-medium">MAX</span>
      </div>
      <span
        aria-hidden
        className="hidden h-5 w-px bg-blue-subtle/60 sm:block"
      />
      <SkolkovoBadge imgClassName="h-6 w-[82px] sm:h-7 sm:w-[95px]" priority />
    </motion.div>
  );
}

export default function Hero() {
  const words = heroContent.title.split(" ");
  const { openForm } = useLeadForm();

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle decorative gradient blobs */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full bg-[#00E7FD]/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute -left-20 top-[260px] h-[500px] w-[500px] rounded-full bg-[#0097F5]/[0.05] blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 top-[520px] h-[400px] w-[400px] rounded-full bg-[#0062EF]/[0.04] blur-[120px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 px-5 pt-24 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:flex-row lg:items-start lg:gap-12 lg:px-8 lg:pt-36 lg:pb-24">
        {/* Left: content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-1 flex-col items-center text-center lg:items-start lg:pt-8 lg:text-left"
        >
          <motion.h1
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-6 font-display text-4xl font-bold leading-[1.1] text-heading sm:text-5xl lg:text-6xl xl:text-[4rem]"
            style={{ letterSpacing: "-0.02em" }}
          >
            {/*
              Слова разделены настоящими пробельными узлами, а не margin:
              иначе textContent заголовка склеивался в одно слово для
              краулеров без JS и скринридеров.
            */}
            {words.map((word, i) => (
              <Fragment key={i}>
                <motion.span variants={heroWordVariant} className="inline-block">
                  {word}
                </motion.span>
                {i < words.length - 1 ? " " : null}
              </Fragment>
            ))}
          </motion.h1>

          <motion.p
            variants={heroRise}
            className="mb-8 max-w-xl text-base leading-relaxed text-body sm:text-lg"
          >
            {heroContent.subtitle}
          </motion.p>

          {/* Одна главная кнопка — сразу в регистрацию кабинета; демо и менеджер — ссылками */}
          <motion.div
            variants={heroRise}
            className="mb-4 flex flex-col items-center gap-3 lg:items-start"
          >
            <Button
              variant="primary"
              size="lg"
              href={lkRegisterUrl({ from: "home_hero" })}
              onClick={() => reachMetrikaGoal(metrikaGoals.trialClick, { source: "home_hero" })}
            >
              {heroContent.ctaPrimary}
            </Button>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-semibold lg:justify-start">
              <Link href="/demo" className="inline-flex min-h-10 items-center text-accent hover:underline">
                {heroContent.ctaSecondary}
              </Link>
              <button
                type="button"
                onClick={() => openForm({ source: "hero", path: "request" })}
                className="inline-flex min-h-10 cursor-pointer items-center text-body hover:text-accent hover:underline"
              >
                Подключить с менеджером
              </button>
            </div>
          </motion.div>

          <motion.p
            variants={heroRise}
            className="mb-10 text-sm text-muted"
          >
            <span className="whitespace-nowrap">Месяц бесплатно</span> ·{" "}
            <span className="whitespace-nowrap">без программиста</span> ·{" "}
            <span className="whitespace-nowrap">от {priceFromLabel}/мес</span>
          </motion.p>

          <PartnerLogos />
        </motion.div>

        {/* Right: ролик — полный диалог версии «Про» в виджете (сцена в коде, без видеофайла) */}
        <motion.div
          variants={heroScaleIn}
          initial="hidden"
          animate="visible"
          className="mx-auto w-full max-w-[440px] flex-shrink-0 lg:mx-0 lg:w-[440px]"
        >
          <div className="relative">
            <div className="relative">
              <ScenePlayer
                Scene={HeroProScene}
                duration={HERO_PRO_DURATION}
                width={HERO_PRO_W}
                height={HERO_PRO_H}
                initialAt={0}
                stillAt={16.5}
                controls
                className="rounded-2xl border border-[#E0E0E0]/50 bg-white shadow-xl"
                label="Пример диалога в версии «Про»: турист просит тур в Турцию, ассистент уточняет город вылета, даты, состав и категорию отеля, показывает три отеля с ценами, рассказывает об отеле и о том, что входит в стоимость, и передаёт заявку менеджеру."
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
