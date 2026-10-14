import type { ReactNode } from "react";
import { CalendarCheck, Info, TriangleAlert } from "lucide-react";

/**
 * Плашка в статье блога.
 *   <Note type="checked">Цены проверены 14.10.2026 по tourvisor.ru.</Note>
 *   <Note type="warn" title="Важно">…</Note>
 * checked — дата проверки чужих цен и правил; info — пояснение; warn — предупреждение.
 */
const STYLES = {
  checked: { icon: CalendarCheck, box: "border-accent/30 bg-blue-ice/50", ic: "text-accent" },
  info: { icon: Info, box: "border-blue-subtle/60 bg-surface-alt", ic: "text-accent" },
  warn: { icon: TriangleAlert, box: "border-amber-300/70 bg-amber-50", ic: "text-amber-600" },
} as const;

export default function Note({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof STYLES;
  title?: string;
  children?: ReactNode;
}) {
  const s = STYLES[type] ?? STYLES.info;
  const Icon = s.icon;
  return (
    <aside className={`not-prose my-6 flex gap-3 rounded-xl border p-4 ${s.box}`}>
      <Icon aria-hidden="true" className={`mt-0.5 h-5 w-5 shrink-0 ${s.ic}`} />
      <div className="note-body text-[0.95rem] text-body">
        {title && <p className="mb-1 font-semibold text-heading">{title}</p>}
        {children}
      </div>
    </aside>
  );
}
