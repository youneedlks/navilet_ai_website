import {
  MessagesSquare,
  BookmarkCheck,
  Search,
  Clock,
  MessageSquare,
  Zap,
  Globe,
  Wallet,
  Moon,
  Timer,
  type LucideIcon,
} from "lucide-react";
import { CAB, METRIC, PANEL_STYLE, TILE_STYLE, valueColor, type MetricAccent } from "@/lib/cabinetTheme";

/**
 * Макет раздела «Обзор» кабинета — в новом виде кабинета (29.10.2026):
 * белые карточки с нейтральной тенью, цвет метрики по смыслу, изменения текстом
 * со стрелкой, воронка — шкала синего по величине. Данные — пример.
 */

interface RealOverviewContentProps {
  compact?: boolean;
}

const SPARKLINE_PATHS = {
  conversations: "M0,18 L8,16 L16,14 L24,15 L32,11 L40,13 L48,9 L56,7 L64,8 L72,5 L80,3",
  bookings: "M0,16 L8,15 L16,17 L24,13 L32,14 L40,10 L48,11 L56,8 L64,6 L72,7 L80,4",
  searches: "M0,15 L8,17 L16,13 L24,14 L32,10 L40,12 L48,8 L56,9 L64,6 L72,4 L80,5",
  time: "M0,6 L8,8 L16,7 L24,10 L32,9 L40,12 L48,11 L56,13 L64,12 L72,15 L80,14",
};

const METRICS: { title: string; value: string; delta: number; icon: LucideIcon; accent: MetricAccent; sparkline: string }[] = [
  { title: "Диалогов", value: "2 847", delta: 18, icon: MessagesSquare, accent: "blue", sparkline: SPARKLINE_PATHS.conversations },
  { title: "Запросы на бронь", value: "156", delta: 12, icon: BookmarkCheck, accent: "emerald", sparkline: SPARKLINE_PATHS.bookings },
  { title: "Поисков туров", value: "1 234", delta: 0, icon: Search, accent: "violet", sparkline: SPARKLINE_PATHS.searches },
  // Время ответа уменьшилось — это хорошо, поэтому зелёным
  { title: "Среднее время ответа", value: "1.2с", delta: -8, icon: Clock, accent: "amber", sparkline: SPARKLINE_PATHS.time },
];

/** Шаги воронки — как в кабинете с 12.10; процент — доля от всех диалогов. */
const FUNNEL_STEPS = [
  { label: "Все диалоги", value: 2847 },
  { label: "Вовлечённые (2+ сообщ.)", value: 1923 },
  { label: "Показаны карточки туров", value: 1456 },
  { label: "Потенциальные лиды", value: 1089 },
  { label: "Интерес к бронированию", value: 156 },
];

/** Точка статуса: интерес к брони — бирюзовая, показаны туры — фиолетовая, остальное — серая. */
const RECENT_CONVERSATIONS = [
  { preview: "Хочу тур в Турцию на двоих, всё включено", msgs: 12, searches: 3, dot: METRIC.emerald.main },
  { preview: "Подскажите горящие туры в Египет", msgs: 8, searches: 2, dot: METRIC.violet.main },
  { preview: "Сколько стоит перелёт в Дубай?", msgs: 5, searches: 1, dot: METRIC.violet.main },
  { preview: "Есть ли туры в Мальдивы в марте?", msgs: 15, searches: 4, dot: METRIC.emerald.main },
  { preview: "Можно узнать про визу в Таиланд?", msgs: 3, searches: 0, dot: "#CBD5E1" },
];

const CHART_AREA_PATH =
  "M0,55 C14,52 28,45 42,42 C56,39 70,35 84,30 C98,25 112,28 126,22 C140,16 154,18 168,14 C182,10 196,12 210,8 C224,5 238,6 252,3 L252,70 L0,70 Z";
const CHART_LINE_PATH =
  "M0,55 C14,52 28,45 42,42 C56,39 70,35 84,30 C98,25 112,28 126,22 C140,16 154,18 168,14 C182,10 196,12 210,8 C224,5 238,6 252,3";

/** «Быстрые инсайты» — значок по смыслу строки, как в кабинете. */
const INSIGHTS: { text: string; icon: LucideIcon; accent: MetricAccent }[] = [
  { text: "Самое популярное направление: Турция (412 поисков)", icon: Globe, accent: "violet" },
  { text: "Средний бюджет клиентов: 152 400 ₽", icon: Wallet, accent: "emerald" },
  { text: "Среднее время ответа ассистента: 1.2с", icon: Clock, accent: "amber" },
  { text: "23% обращений поступают вне рабочего времени", icon: Moon, accent: "blue" },
  { text: "Обычно диалог длится 4 мин", icon: Timer, accent: "amber" },
];

function IconChip({ icon: Icon, accent, size }: { icon: LucideIcon; accent: MetricAccent; size: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center"
      style={{ width: size, height: size, borderRadius: size * 0.3, background: METRIC[accent].tint, color: METRIC[accent].main }}
    >
      <Icon size={size * 0.46} strokeWidth={1.8} />
    </span>
  );
}

export default function RealOverviewContent({
  compact = false,
}: RealOverviewContentProps) {
  const s = compact ? 0.85 : 1;
  const max = FUNNEL_STEPS[0].value;
  const panel = { ...PANEL_STYLE, borderRadius: 10 * s };

  return (
    <div style={{ fontSize: 10 * s, color: CAB.text, fontVariantNumeric: "tabular-nums" }}>
      {/* Заголовок и период */}
      <div className="flex items-center justify-between" style={{ marginBottom: 8 * s }}>
        <div className="font-bold" style={{ fontSize: 13 * s, letterSpacing: "-0.01em" }}>
          Обзор
        </div>
        <div className="flex p-0.5" style={{ ...TILE_STYLE, borderRadius: 8 * s }}>
          {["7 дней", "30 дней", "90 дней"].map((p, i) => (
            <div
              key={p}
              className={`rounded-md px-1.5 py-0.5 font-medium ${i === 1 ? "bg-[#0038FF] text-white" : "text-[#475569]"}`}
              style={{ fontSize: 7 * s }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* Карточки показателей */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" style={{ marginBottom: 8 * s }}>
        {METRICS.map((m) => {
          const good = m.title === "Среднее время ответа" ? m.delta < 0 : m.delta > 0;
          return (
            <div key={m.title} style={{ ...panel, padding: `${7 * s}px ${8 * s}px` }}>
              <div className="flex items-start justify-between gap-1">
                <span className="font-semibold text-[#475569]" style={{ fontSize: 7.5 * s, lineHeight: 1.25 }}>
                  {m.title}
                </span>
                <IconChip icon={m.icon} accent={m.accent} size={16 * s} />
              </div>
              <div className="flex items-end justify-between gap-1" style={{ marginTop: 4 * s }}>
                <div className="flex items-end gap-1">
                  <span className="font-bold leading-none tracking-tight" style={{ fontSize: 15 * s }}>
                    {m.value}
                  </span>
                  {m.delta !== 0 && (
                    <span className="font-semibold" style={{ fontSize: 6.5 * s, color: good ? CAB.success : CAB.danger, marginBottom: 1 }}>
                      {m.delta > 0 ? "↗" : "↘"} {m.delta > 0 ? "+" : "−"}
                      {Math.abs(m.delta)}%
                    </span>
                  )}
                </div>
                <svg viewBox="0 0 80 20" className="hidden sm:block" style={{ width: 34 * s, height: 13 * s }} aria-hidden>
                  <defs>
                    <linearGradient id={`spark-${m.accent}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={METRIC[m.accent].main} stopOpacity="0.22" />
                      <stop offset="100%" stopColor={METRIC[m.accent].main} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={`${m.sparkline} L80,20 L0,20 Z`} fill={`url(#spark-${m.accent})`} />
                  <path d={m.sparkline} fill="none" stroke={METRIC[m.accent].main} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          );
        })}
      </div>

      {/* Динамика и воронка */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[2fr_1fr]" style={{ marginBottom: 8 * s }}>
        <div style={{ ...panel, padding: `${7 * s}px ${8 * s}px` }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 4 * s }}>
            <span className="font-semibold" style={{ fontSize: 8.5 * s }}>
              Динамика
            </span>
            <div className="flex p-0.5" style={{ ...TILE_STYLE, borderRadius: 7 * s }}>
              {["Диалоги", "Лиды", "Поиски"].map((t, i) => (
                <span
                  key={t}
                  className={`rounded-md px-1.5 py-0.5 font-medium ${i === 0 ? "bg-[#0038FF] text-white" : "text-[#475569]"}`}
                  style={{ fontSize: 6 * s }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 252 70" className="w-full" style={{ height: compact ? 62 : 80 }} aria-hidden>
            <defs>
              <linearGradient id="oAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={METRIC.blue.main} stopOpacity="0.22" />
                <stop offset="100%" stopColor={METRIC.blue.main} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[14, 32, 50, 68].map((y) => (
              <line key={y} x1="0" x2="252" y1={y} y2={y} stroke={CAB.grid} strokeDasharray="3 3" strokeWidth="0.8" />
            ))}
            <path d={CHART_AREA_PATH} fill="url(#oAreaGrad)" />
            <path d={CHART_LINE_PATH} fill="none" stroke={METRIC.blue.main} strokeWidth="1.75" strokeLinecap="round" />
          </svg>
          <div className="flex justify-between text-[#64748B]" style={{ fontSize: 5.5 * s, marginTop: 2 }}>
            {["2 окт", "9 окт", "16 окт", "23 окт", "29 окт"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>

        <div style={{ ...panel, padding: `${7 * s}px ${8 * s}px` }}>
          <div className="font-semibold" style={{ fontSize: 8.5 * s, marginBottom: 5 * s }}>
            Воронка конверсии
          </div>
          <div className="flex flex-col" style={{ gap: 4.5 * s }}>
            {FUNNEL_STEPS.map((st, i) => (
              <div key={st.label}>
                <div className="flex items-baseline justify-between gap-1" style={{ fontSize: 6 * s, marginBottom: 1.5 * s }}>
                  <span className="truncate font-medium">{st.label}</span>
                  <span className="shrink-0">
                    {i > 0 && <span className="text-[#64748B]">{Math.round((st.value / max) * 100)}% </span>}
                    <b>{st.value.toLocaleString("ru-RU")}</b>
                  </span>
                </div>
                <div className="overflow-hidden rounded-full" style={{ height: 3.5 * s, background: CAB.track }}>
                  <div className="h-full rounded-full" style={{ width: `${(st.value / max) * 100}%`, background: valueColor(st.value, max) }} />
                </div>
              </div>
            ))}
          </div>
          <div className="text-center text-[#64748B]" style={{ fontSize: 6 * s, marginTop: 6 * s }}>
            Общая конверсия: <b style={{ color: CAB.blue }}>38.3%</b>
          </div>
        </div>
      </div>

      {/* Быстрые инсайты */}
      <div style={{ ...panel, padding: `${7 * s}px ${8 * s}px`, marginBottom: 8 * s }}>
        <div className="flex items-center gap-1.5" style={{ marginBottom: 5 * s }}>
          <IconChip icon={Zap} accent="blue" size={13 * s} />
          <span className="font-semibold" style={{ fontSize: 8.5 * s }}>
            Быстрые инсайты
          </span>
        </div>
        <div className="grid grid-cols-1 gap-x-3 sm:grid-cols-2" style={{ rowGap: 3.5 * s }}>
          {INSIGHTS.map((ins) => (
            <div key={ins.text} className="flex items-center gap-1.5">
              <IconChip icon={ins.icon} accent={ins.accent} size={11 * s} />
              <span className="text-[#475569]" style={{ fontSize: 6.8 * s }}>
                {ins.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Последние диалоги */}
      <div className="overflow-hidden" style={panel}>
        <div className="flex items-center justify-between" style={{ padding: `${6 * s}px ${8 * s}px` }}>
          <span className="font-semibold" style={{ fontSize: 8.5 * s }}>
            Последние диалоги
          </span>
          <span className="font-medium text-[#0038FF]" style={{ fontSize: 7 * s }}>
            Все диалоги →
          </span>
        </div>
        <div className="border-t border-[#E2E8F0]">
          {RECENT_CONVERSATIONS.map((conv) => (
            <div
              key={conv.preview}
              className="flex items-center gap-1.5 border-b border-[#E2E8F0]/70 last:border-0"
              style={{ padding: `${3.5 * s}px ${8 * s}px` }}
            >
              <span className="shrink-0 rounded-full" style={{ width: 4.5 * s, height: 4.5 * s, backgroundColor: conv.dot }} />
              <span className="flex-1 truncate" style={{ fontSize: 7 * s }}>
                {conv.preview}
              </span>
              <div className="flex shrink-0 items-center gap-2 text-[#64748B]" style={{ fontSize: 6 * s }}>
                <span className="flex items-center gap-0.5">
                  <MessageSquare size={6 * s} />
                  {conv.msgs}
                </span>
                <span className="flex items-center gap-0.5">
                  <Search size={6 * s} />
                  {conv.searches}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
