"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { networkResults } from "@/lib/content";
import CountUp from "@/components/ui/CountUp";

export default function NetworkResults() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const r = networkResults;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #001229 0%, #002152 35%, #0062EF 75%, #0097F5 100%)",
      }}
    >
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
      {/* Световые пятна — радиальными градиентами: blur-[150px] перерисовывался вместе с бегущими цифрами и тормозил телефоны */}
      <div className="pointer-events-none absolute -right-72 -top-72 h-[800px] w-[800px] bg-[radial-gradient(closest-side,rgba(0,231,253,0.10),rgba(0,231,253,0))]" />
      <div className="pointer-events-none absolute -left-56 -bottom-40 h-[600px] w-[600px] bg-[radial-gradient(closest-side,rgba(0,98,239,0.15),rgba(0,98,239,0))]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 lg:px-8 lg:py-28"
      >
        {/* Eyebrow */}
        <motion.p variants={fadeInUp} className="text-sm font-semibold text-white/70">
          {r.eyebrow}
        </motion.p>

        {/* Hero sum */}
        <motion.div
          variants={fadeInUp}
          className="mt-4 font-display text-5xl font-bold leading-none text-white sm:text-6xl lg:text-7xl"
          style={{ letterSpacing: "-0.03em" }}
        >
          <CountUp
            end={r.heroValue}
            decimals={r.heroDecimals}
            prefix={r.heroPrefix}
            suffix={r.heroSuffix}
            duration={2.2}
          />
        </motion.div>
        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-4 max-w-xl text-lg font-medium text-white/85"
        >
          {r.heroLabel}
        </motion.p>
        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/55"
        >
          {r.description}
        </motion.p>

        {/* Hard stats */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-white/10 pt-10 lg:grid-cols-4"
        >
          {r.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-bold text-white sm:text-4xl">
                {s.display ?? (
                  <CountUp
                    end={s.value ?? 0}
                    decimals={s.decimals}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    separator={s.separator}
                    duration={2.4}
                  />
                )}
              </div>
              <p className="mt-2 text-sm font-medium text-white/55">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Кто уже работает — строкой текста, без плашек */}
        <motion.p variants={fadeInUp} className="mx-auto mt-10 max-w-2xl text-sm text-white/70">
          {r.clientsLabel}: {r.clients.join(", ")}
        </motion.p>
      </motion.div>
    </section>
  );
}
