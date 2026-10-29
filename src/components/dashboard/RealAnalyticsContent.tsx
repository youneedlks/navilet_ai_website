import {
  Globe,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  Zap,
} from "lucide-react";
import { CAB, METRIC, PANEL_STYLE, TILE_STYLE, onRampText, valueColor } from "@/lib/cabinetTheme";

/** Макет «Аналитики» в новом виде кабинета (29.10.2026): распределения — шкала синего по величине. Данные — пример. */

interface RealAnalyticsContentProps {
  compact?: boolean;
}

const TOP_COUNTRIES = [
  { name: "Турция", count: 412, pct: 100 },
  { name: "Египет", count: 287, pct: 70 },
  { name: "ОАЭ", count: 198, pct: 48 },
  { name: "Таиланд", count: 156, pct: 38 },
  { name: "Мальдивы", count: 89, pct: 22 },
];

const TOP_DEPARTURES = [
  { name: "Москва", count: 534, pct: 100 },
  { name: "Санкт-Петербург", count: 312, pct: 58 },
  { name: "Казань", count: 145, pct: 27 },
  { name: "Екатеринбург", count: 98, pct: 18 },
];

const HEATMAP_DATA = [
  [0, 0, 0, 1, 2, 3, 4, 4, 3, 2, 1, 0],
  [0, 0, 0, 1, 3, 4, 4, 4, 4, 3, 1, 0],
  [0, 0, 0, 2, 3, 4, 3, 4, 4, 3, 2, 0],
  [0, 0, 0, 1, 3, 4, 4, 3, 3, 2, 1, 0],
  [0, 0, 0, 2, 3, 4, 4, 4, 3, 2, 1, 0],
  [0, 0, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
];

/** Тепловая карта: пусто — фон дорожки, дальше — шкала синего по величине (0…4). */
const HEAT_COLORS = [CAB.track, valueColor(1, 4), valueColor(2, 4), valueColor(3, 4), valueColor(4, 4)];

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const HOURS = [
  "0",
  "2",
  "4",
  "6",
  "8",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "22",
];

const STARS_MEALS = [
  [12, 45, 8, 3],
  [23, 89, 34, 12],
  [56, 234, 67, 23],
  [34, 156, 45, 18],
];
const STAR_LABELS = ["3★", "4★", "5★", "4-5★"];
const MEAL_LABELS = ["BB", "HB", "FB", "AI"];

const QUICK_INSIGHTS = [
  "Турция лидирует с 33% всех поисков",
  "Пик активности: 10:00–14:00 по МСК",
  "78% клиентов ищут 5★ отели",
  "All Inclusive — самый популярный тип питания",
];

export default function RealAnalyticsContent({
  compact = false,
}: RealAnalyticsContentProps) {
  const s = compact ? 0.85 : 1;

  return (
    <div style={{ fontSize: 10 * s, color: CAB.text, fontVariantNumeric: "tabular-nums" }}>
      {/* Header */}
      <div className="flex items-center justify-between" style={{ marginBottom: 6 * s }}>
        <div>
          <div className="font-bold" style={{ fontSize: 13 * s, letterSpacing: "-0.01em" }}>
            Аналитика
          </div>
          <div className="text-[#64748B]" style={{ fontSize: 8.5 * s, marginTop: 1 }}>
            Детальный анализ поисковых запросов и поведения клиентов
          </div>
        </div>
        <div className="flex p-0.5" style={{ ...TILE_STYLE, borderRadius: 8 * s }}>
          {["7 дней", "30 дней", "90 дней"].map((p, i) => (
            <div
              key={p}
              className={`rounded-md px-1.5 py-0.5 font-medium ${
                i === 1 ? "bg-[#0038FF] text-white" : "text-[#475569]"
              }`}
              style={{ fontSize: 7 * s }}
            >
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* Top row: Countries + Departures */}
      <div className="grid grid-cols-2 gap-2" style={{ marginBottom: 8 * s }}>
        {/* Countries */}
        <ChartCard
          icon={Globe}
          title="Популярные направления"
          s={s}
        >
          <div className="space-y-1">
            {TOP_COUNTRIES.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between">
                  <span className="font-medium" style={{ fontSize: 7 * s }}>
                    {c.name}
                  </span>
                  <span className="font-semibold" style={{ fontSize: 7 * s }}>
                    {c.count}
                  </span>
                </div>
                <div
                  className="rounded-full bg-[#EEF2F7] overflow-hidden"
                  style={{ height: 3 * s }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${c.pct}%`,
                      backgroundColor: valueColor(c.count, TOP_COUNTRIES[0].count),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Departures */}
        <ChartCard
          icon={MapPin}
          title="Города вылета"
          s={s}
        >
          <div className="space-y-1">
            {TOP_DEPARTURES.map((d) => (
              <div key={d.name}>
                <div className="flex items-center justify-between">
                  <span className="font-medium" style={{ fontSize: 7 * s }}>
                    {d.name}
                  </span>
                  <span className="font-semibold" style={{ fontSize: 7 * s }}>
                    {d.count}
                  </span>
                </div>
                <div
                  className="rounded-full bg-[#EEF2F7] overflow-hidden"
                  style={{ height: 3 * s }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${d.pct}%`,
                      backgroundColor: valueColor(d.count, TOP_DEPARTURES[0].count),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Bottom row: Heatmap + Stars/Meals matrix */}
      <div className="grid grid-cols-2 gap-2" style={{ marginBottom: compact ? 0 : 8 * s }}>
        {/* Heatmap */}
        <ChartCard
          icon={Calendar}
          title="Активность по часам"
          s={s}
        >
          <div>
            {/* Hour labels */}
            <div className="flex" style={{ marginLeft: 14 * s, marginBottom: 1 }}>
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="flex-1 text-center text-[#64748B]"
                  style={{ fontSize: 5 * s }}
                >
                  {h}
                </div>
              ))}
            </div>
            {/* Grid */}
            {HEATMAP_DATA.map((row, ri) => (
              <div key={ri} className="flex items-center gap-0.5">
                <span
                  className="text-[#64748B] shrink-0 text-right"
                  style={{ fontSize: 5.5 * s, width: 12 * s }}
                >
                  {DAYS[ri]}
                </span>
                <div className="flex flex-1 gap-px">
                  {row.map((val, ci) => (
                    <div
                      key={ci}
                      className="flex-1 rounded-sm"
                      style={{
                        height: 6 * s,
                        backgroundColor: HEAT_COLORS[val],
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
            {/* Legend */}
            <div className="flex items-center justify-end gap-0.5 mt-1">
              <span className="text-[#64748B]" style={{ fontSize: 5 * s }}>
                Мин
              </span>
              {HEAT_COLORS.map((c) => (
                <div
                  key={c}
                  className="rounded-sm"
                  style={{
                    width: 6 * s,
                    height: 6 * s,
                    backgroundColor: c,
                  }}
                />
              ))}
              <span className="text-[#64748B]" style={{ fontSize: 5 * s }}>
                Макс
              </span>
            </div>
          </div>
        </ChartCard>

        {/* Stars x Meals matrix */}
        <ChartCard
          icon={Users}
          title="Звёздность × Питание"
          s={s}
        >
          <div>
            {/* Meal labels header */}
            <div className="flex" style={{ marginLeft: 22 * s, marginBottom: 2 }}>
              {MEAL_LABELS.map((ml) => (
                <div
                  key={ml}
                  className="flex-1 text-center font-medium text-[#64748B]"
                  style={{ fontSize: 6 * s }}
                >
                  {ml}
                </div>
              ))}
            </div>
            {STARS_MEALS.map((row, ri) => (
              <div key={ri} className="flex items-center gap-0.5" style={{ marginBottom: 1 }}>
                <span
                  className="text-[#64748B] shrink-0 font-medium text-right whitespace-nowrap"
                  style={{ fontSize: 6 * s, width: 20 * s }}
                >
                  {STAR_LABELS[ri]}
                </span>
                <div className="flex flex-1 gap-0.5">
                  {row.map((val, ci) => {
                    const max = 234;
                    return (
                      <div
                        key={ci}
                        className="flex-1 rounded-md flex items-center justify-center font-semibold"
                        style={{
                          height: 14 * s,
                          backgroundColor: valueColor(val, max),
                          color: onRampText(val, max),
                          fontSize: 6.5 * s,
                        }}
                      >
                        {val}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Quick insights */}
      {!compact && (
        <div
          className="flex items-start gap-2"
          style={{ ...PANEL_STYLE, borderRadius: 10 * s, padding: `${6 * s}px ${8 * s}px` }}
        >
          <div
            className="flex items-center justify-center rounded-md shrink-0"
            style={{ width: 13 * s, height: 13 * s, background: METRIC.blue.tint, color: METRIC.blue.main }}
          >
            <Zap size={7 * s} />
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 flex-1">
            {QUICK_INSIGHTS.map((text, i) => (
              <div key={i} className="flex items-start gap-1">
                <TrendingUp
                  size={6 * s}
                  className="text-[#0038FF] shrink-0"
                  style={{ marginTop: 1 }}
                />
                <span className="text-[#475569]" style={{ fontSize: 6.5 * s }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ChartCard({
  icon: Icon,
  title,
  s,
  children,
}: {
  icon: typeof Globe;
  title: string;
  s: number;
  children: React.ReactNode;
}) {
  return (
    <div style={{ ...PANEL_STYLE, borderRadius: 10 * s, padding: `${7 * s}px ${8 * s}px` }}>
      <div className="flex items-center gap-1" style={{ marginBottom: 4 * s }}>
        <div
          className="flex items-center justify-center rounded-md"
          style={{ width: 13 * s, height: 13 * s, background: METRIC.blue.tint, color: METRIC.blue.main }}
        >
          <Icon size={7 * s} strokeWidth={1.8} />
        </div>
        <span className="font-semibold" style={{ fontSize: 8 * s }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}
