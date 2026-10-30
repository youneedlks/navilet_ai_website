"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const STORAGE_KEY = "cookie-consent-accepted";

/**
 * Плашка о cookie — одной строкой (около 56 px), чтобы на телефоне не закрывать
 * треть экрана и плавающую кнопку. Крестик был тем же «Принять», поэтому убран.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:px-6 sm:pb-4"
        >
          <div className="mx-auto flex max-w-xl items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-2.5 shadow-xl sm:px-5">
            <p className="min-w-0 flex-1 text-xs leading-snug text-body sm:text-sm">
              Мы используем файлы cookie для улучшения работы сайта.{" "}
              <Link href="/privacy" className="whitespace-nowrap text-accent underline hover:text-accent-hover">
                Подробнее
              </Link>
            </p>
            <button
              onClick={accept}
              className="flex h-10 shrink-0 cursor-pointer items-center rounded-lg bg-accent px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Принять
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
