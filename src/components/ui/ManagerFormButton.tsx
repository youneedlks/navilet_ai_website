"use client";

import { useLeadForm } from "@/contexts/LeadFormContext";

/** Кнопка «Подключить с менеджером» для серверных страниц: открывает общую форму заявки. */
export default function ManagerFormButton({ source, className = "" }: { source: string; className?: string }) {
  const { openForm } = useLeadForm();
  return (
    <button
      type="button"
      onClick={() => openForm({ source, path: "request" })}
      className={`inline-flex cursor-pointer items-center justify-center rounded-xl bg-accent px-6 py-3 font-semibold text-white shadow-lg shadow-accent/20 transition-colors hover:bg-accent-hover ${className}`}
    >
      Подключить с менеджером
    </button>
  );
}
