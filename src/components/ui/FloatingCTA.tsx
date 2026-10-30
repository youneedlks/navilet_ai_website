"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { lkRegisterUrl } from "@/lib/lk";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (document.body.style.overflow === "hidden") {
        setVisible(false);
        return;
      }

      const scrollY = window.scrollY;
      const heroBottom = window.innerHeight * 0.8;
      const ctaEl = document.getElementById("cta");
      const ctaTop = ctaEl
        ? ctaEl.getBoundingClientRect().top + scrollY - window.innerHeight
        : Infinity;

      setVisible(scrollY > heroBottom && scrollY < ctaTop);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const mo = new MutationObserver(onScroll);
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      mo.disconnect();
    };
  }, []);

  return (
    // Та же главная кнопка, что в шапке и на первом экране: сразу регистрация
    <AnimatePresence>
      {visible && (
        <motion.a
          href={lkRegisterUrl({ from: "floating_cta" })}
          onClick={() => reachMetrikaGoal(metrikaGoals.trialClick, { source: "floating_cta" })}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 right-4 z-30 flex items-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-colors duration-200 hover:bg-accent-hover sm:bottom-6 sm:right-6"
        >
          Подключить бесплатно
        </motion.a>
      )}
    </AnimatePresence>
  );
}
