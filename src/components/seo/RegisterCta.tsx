"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useLeadForm, type LeadFormPreset } from "@/contexts/LeadFormContext";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";
import { lkRegisterUrl } from "@/lib/lk";

interface RegisterCtaProps {
  /** Источник для цели Метрики (trial_register_click) и параметр from ссылки в кабинет */
  source: string;
  /** Компактный вариант — без подписи снизу */
  compact?: boolean;
  /** Тёмный фон секции: белая кнопка вместо синей */
  dark?: boolean;
  /** Подпись основной кнопки, если страница про конкретный сценарий */
  primaryLabel?: string;
  /** Предустановка формы (бот в MAX, условия сети): тогда главная кнопка открывает форму заявки */
  formPreset?: Omit<LeadFormPreset, "source">;
  className?: string;
}

/**
 * Основной CTA SEO-страниц: «Подключить бесплатно» — сразу регистрация в кабинете,
 * как во всём сайте; демо — второй кнопкой; «Подключить с менеджером» — ссылкой.
 * С formPreset главная кнопка открывает форму заявки с этой предустановкой.
 */
export default function RegisterCta({
  source,
  compact = false,
  dark = false,
  primaryLabel = "Подключить бесплатно",
  formPreset,
  className = "",
}: RegisterCtaProps) {
  const { openForm } = useLeadForm();
  const primaryClass = dark
    ? "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-primary shadow-lg shadow-black/10 transition-colors hover:bg-blue-ice"
    : "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-accent/25 transition-colors duration-200 hover:bg-accent-hover";

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        {formPreset ? (
          <button onClick={() => openForm({ ...formPreset, source })} className={primaryClass}>
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <a
            href={lkRegisterUrl({ from: source })}
            onClick={() => reachMetrikaGoal(metrikaGoals.trialClick, { source })}
            className={primaryClass}
          >
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        )}
        <Link
          href="/demo"
          onClick={() => reachMetrikaGoal(metrikaGoals.demoClick, { source })}
          className={
            dark
              ? "inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10"
              : "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-accent/30 px-6 py-3.5 text-base font-semibold text-accent transition-colors hover:border-accent hover:bg-blue-ice"
          }
        >
          <MessageSquare className="h-4 w-4" />
          Посмотреть демо
        </Link>
      </div>
      {!formPreset && (
        <button
          type="button"
          onClick={() => openForm({ source, path: "request" })}
          className={`inline-flex min-h-10 cursor-pointer items-center text-sm font-semibold hover:underline ${
            dark ? "text-white/80 hover:text-white" : "text-body hover:text-accent"
          }`}
        >
          Подключить с менеджером
        </button>
      )}
      {!compact && (
        <span className={`text-sm sm:hidden ${dark ? "text-white/60" : "text-muted"}`}>
          Месяц бесплатно · подключение 0 ₽
        </span>
      )}
    </div>
  );
}
