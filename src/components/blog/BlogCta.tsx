"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";

interface BlogCtaProps {
  title?: string;
  text?: string;
  buttonText?: string;
  /** "demo" — для середины статьи: первой кнопкой демо, второй — форма. */
  variant?: "form" | "demo";
  /** Адрес демо, например "/demo?v=req" — открыть нужную версию. */
  demoHref?: string;
}

export default function BlogCta({
  title = "Попробуйте ИИ-ассистент в деле",
  text = "Подключение без программиста, первый месяц бесплатно. Покажем, как ассистент обрабатывает заявки вашего агентства.",
  buttonText = "Подключить ИИ бесплатно",
  variant = "form",
  demoHref = "/demo",
}: BlogCtaProps) {
  const { openForm } = useLeadForm();
  const demoFirst = variant === "demo";
  const primary =
    "rounded-xl bg-white px-6 py-3 text-center text-sm font-semibold text-primary no-underline shadow-lg shadow-black/10 transition-all hover:bg-blue-ice hover:shadow-xl";
  const secondary =
    "rounded-xl border border-white/25 px-6 py-3 text-center text-sm font-semibold text-white no-underline transition-colors hover:bg-white/10";

  return (
    <div
      className="not-prose relative my-8 overflow-hidden rounded-2xl p-6 sm:p-8"
      style={{
        background:
          "linear-gradient(135deg, #001229 0%, #0062EF 60%, #0097F5 100%)",
      }}
    >
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-20" />
      <div className="relative z-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            30 дней бесплатно
          </div>
          <h3 className="font-display text-xl font-bold text-white">{title}</h3>
          <p className="mt-1.5 max-w-md text-sm text-white/70">{text}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-2.5 sm:items-stretch">
          {demoFirst ? (
            <>
              <Link href={demoHref} className={primary}>
                Посмотреть демо за минуту
              </Link>
              <button
                onClick={() => openForm()}
                className={`cursor-pointer ${secondary}`}
              >
                {buttonText}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openForm()}
                className={`cursor-pointer ${primary}`}
              >
                {buttonText}
              </button>
              <Link href={demoHref} className={secondary}>
                Попробовать демо
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
