import {
  CalendarClock,
  Sparkles,
  RefreshCw,
  HelpCircle,
  Leaf,
  TrendingUp,
  TrendingDown,
  Minus,
  MessageSquare,
  MousePointerClick,
  Wallet,
  Globe2,
} from "lucide-react";

import { METRIC, TILE_STYLE, valueColor } from "@/lib/cabinetTheme";

interface RealForecastContentProps {
  compact?: boolean;
}

/** Вид кабинета с 29.10.2026: распределения — шкала синего (valueColor), деньги и интерес к покупке — бирюзовые. */

/** Прогноз до конца месяца (герой). Демо-цифры одного агентства. */
const MONTH = {
  label: "Июль",
  elapsedDays: 12,
  totalDays: 31,
  trend: "1.09",
  dialogs: "≈ 1 300",
  dialogsMtd: "факт: 470",
  engaged: "≈ 185",
  engagedMtd: "факт: 66",
  paid: "4–8 млн ₽",
  income: "доход ≈ 400–790 тыс. ₽",
};

const AI_LINES = [
  "Спрос на Египет растёт — по сети +6 п.п. за 2 недели, стоит усилить направление.",
  "Пик заявок ожидается в выходные 19–20 июля — проверьте загрузку менеджеров.",
  "Ваш средний чек интереса выше сети — есть запас для премиальных предложений.",
];

const FACT = [
  { label: "Диалогов", value: "1 240", accent: METRIC.blue, icon: MessageSquare },
  { label: "С интересом", value: "14%", accent: METRIC.emerald, icon: MousePointerClick },
  { label: "Ср. чек интереса", value: "214 тыс. ₽", accent: METRIC.emerald, icon: Wallet },
  { label: "Корзина интереса", value: "37 млн ₽", accent: METRIC.emerald, icon: TrendingUp },
];

/** Барометр спроса по сети: доля спроса + тренд в п.п. + сезонность. */
const BAROMETER = [
  { country: "Турция", share: 34, pp: 2.1, season: true },
  { country: "Египет", share: 22, pp: 6.0, season: true },
  { country: "ОАЭ", share: 14, pp: -1.2, season: false },
  { country: "Таиланд", share: 9, pp: 0, season: false },
  { country: "Мальдивы", share: 6, pp: 1.4, season: true },
];

export default function RealForecastContent({
  compact = false,
}: RealForecastContentProps) {
  const s = compact ? 0.85 : 1;
  const maxShare = Math.max(...BAROMETER.map((b) => b.share));

  return (
    <div style={{ fontSize: 10 * s }}>
      {/* Header */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 6 * s }}
      >
        <div>
          <div className="font-bold text-[#0F172A]" style={{ fontSize: 12 * s }}>
            Отчёты и прогнозы
          </div>
          <div
            className="text-[#64748B]"
            style={{ fontSize: 8.5 * s, marginTop: 1 }}
          >
            Предиктивная аналитика по данным ассистента — сайт и MAX
          </div>
        </div>
        <div
          className="flex items-center gap-1 rounded-lg bg-white font-medium text-[#0038FF]"
          style={{
            padding: `${3 * s}px ${6 * s}px`,
            fontSize: 7 * s,
            boxShadow: "0 1px 3px rgba(15,23,42,.048), 0 14px 34px -12px rgba(15,23,42,.128)",
          border: "1px solid rgba(15,23,42,.05)",
          }}
        >
          <RefreshCw size={7 * s} />
          Обновить
        </div>
      </div>

      <SectionDivider label="Прогноз" s={s} />

      {/* Month forecast hero */}
      <div
        className="rounded-xl bg-white"
        style={{
          padding: `${7 * s}px ${8 * s}px`,
          boxShadow: "0 1px 3px rgba(15,23,42,.048), 0 14px 34px -12px rgba(15,23,42,.128)",
          border: "1px solid rgba(15,23,42,.05)",
          marginBottom: 6 * s,
        }}
      >
        <PanelHead
          icon={CalendarClock}
          title={`Прогноз до конца месяца · ${MONTH.label}`}
          subtitle={`Прошло ${MONTH.elapsedDays} из ${MONTH.totalDays} дней · темп с поправкой на тренд ×${MONTH.trend}`}
          s={s}
        />
        <div
          className="grid grid-cols-3 gap-1.5"
          style={{ marginTop: 5 * s }}
        >
          <ForecastCell
            label="Диалогов ожидается"
            value={MONTH.dialogs}
            hint={MONTH.dialogsMtd}
            s={s}
          />
          <ForecastCell
            label="С интересом к покупке"
            value={MONTH.engaged}
            hint={MONTH.engagedMtd}
            s={s}
          />
          <ForecastCell
            label="Сумма оплаченных туров"
            value={MONTH.paid}
            hint={MONTH.income}
            money
            s={s}
          />
        </div>
        <Methodology s={s} />
      </div>

      {/* AI forecast */}
      <div
        className="rounded-xl bg-white"
        style={{
          padding: `${7 * s}px ${8 * s}px`,
          boxShadow: "0 1px 3px rgba(15,23,42,.048), 0 14px 34px -12px rgba(15,23,42,.128)",
          border: "1px solid rgba(15,23,42,.05)",
          marginBottom: compact ? 0 : 6 * s,
        }}
      >
        <div className="flex items-start justify-between gap-2">
          <PanelHead
            icon={Sparkles}
            title="AI-прогноз на 4–6 недель"
            subtitle="Ваша динамика + тренды всей сети + сезонность направлений"
            s={s}
          />
          <div
            className="flex shrink-0 items-center gap-1 rounded-md bg-[#EBF0FF] font-semibold text-[#0038FF]"
            style={{ padding: `${2.5 * s}px ${5 * s}px`, fontSize: 6.5 * s }}
          >
            <RefreshCw size={6.5 * s} />
            Обновить
          </div>
        </div>
        <div className="space-y-1" style={{ marginTop: 5 * s }}>
          {AI_LINES.map((line, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <span
                className="shrink-0 font-bold text-[#0038FF]"
                style={{ fontSize: 8 * s, lineHeight: 1.2 }}
              >
                •
              </span>
              <span className="text-[#475569]" style={{ fontSize: 7.5 * s }}>
                {line}
              </span>
            </div>
          ))}
        </div>
        <div
          className="border-t border-[#E2E8F0]/60 text-[#64748B]"
          style={{ marginTop: 5 * s, paddingTop: 3 * s, fontSize: 6 * s }}
        >
          Обновлено 12 июля, 09:40 · автообновление по понедельникам
        </div>
      </div>

      {!compact && (
        <>
          <SectionDivider label="Факт за 30 дней" s={s} />
          <div
            className="grid grid-cols-2 gap-1.5 sm:grid-cols-4"
            style={{ marginBottom: 6 * s }}
          >
            {FACT.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  className="rounded-xl bg-white"
                  style={{
                    padding: `${5 * s}px ${6 * s}px`,
                    boxShadow: "0 1px 3px rgba(15,23,42,.048), 0 14px 34px -12px rgba(15,23,42,.128)",
          border: "1px solid rgba(15,23,42,.05)",
                  }}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className="font-medium text-[#64748B] truncate"
                      style={{ fontSize: 6.5 * s }}
                    >
                      {f.label}
                    </span>
                    <span
                      className="inline-flex shrink-0 items-center justify-center rounded-md"
                      style={{ width: 13 * s, height: 13 * s, background: f.accent.tint, color: f.accent.main }}
                    >
                      <Icon size={7.5 * s} strokeWidth={1.9} />
                    </span>
                  </div>
                  <div
                    className="font-bold text-[#0F172A] whitespace-nowrap"
                    style={{ fontSize: 10.5 * s, marginTop: 2 * s }}
                  >
                    {f.value}
                  </div>
                </div>
              );
            })}
          </div>

          <SectionDivider label="Барометр спроса по сети" s={s} />
        </>
      )}

      {/* Network barometer */}
      <div
        className="rounded-xl bg-white"
        style={{
          padding: `${7 * s}px ${8 * s}px`,
          boxShadow: "0 1px 3px rgba(15,23,42,.048), 0 14px 34px -12px rgba(15,23,42,.128)",
          border: "1px solid rgba(15,23,42,.05)",
          marginTop: compact ? 6 * s : 0,
        }}
      >
        <PanelHead
          icon={Globe2}
          title="Барометр спроса по сети «Навылет! AI»"
          subtitle="Куда смотрят туристы всех агентств сети — обезличенно"
          s={s}
        />
        <div style={{ marginTop: 5 * s }}>
          {BAROMETER.map((b) => (
            <div
              key={b.country}
              className="flex items-center gap-1.5"
              style={{ paddingBlock: 2 * s }}
            >
              <span
                className="flex shrink-0 items-center gap-0.5 font-medium text-[#0F172A]"
                style={{ fontSize: 7 * s, width: 46 * s }}
              >
                <span className="truncate">{b.country}</span>
                {b.season && (
                  <Leaf size={6 * s} className="text-[#047857] shrink-0" />
                )}
              </span>
              <div
                className="flex-1 rounded-full bg-[#EEF2F7] overflow-hidden"
                style={{ height: 3.5 * s }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(b.share / maxShare) * 100}%`,
                    backgroundColor: valueColor(b.share, maxShare),
                  }}
                />
              </div>
              <span
                className="shrink-0 text-right font-semibold text-[#0F172A]"
                style={{ fontSize: 7 * s, width: 16 * s }}
              >
                {b.share}%
              </span>
              <span
                className="flex shrink-0 justify-end"
                style={{ width: 36 * s }}
              >
                <TrendBadge pp={b.pp} s={s} />
              </span>
            </div>
          ))}
        </div>
        <div
          className="flex flex-wrap items-center border-t border-[#E2E8F0]/60 text-[#64748B]"
          style={{
            marginTop: 4 * s,
            paddingTop: 3 * s,
            gap: `${1}px ${10 * s}px`,
            fontSize: 6.5 * s,
          }}
        >
          <span>
            Медианный чек сети: <b className="text-[#0F172A]">190 000 ₽</b>
          </span>
          <span className="inline-flex items-center gap-0.5">
            <Leaf size={6 * s} className="text-[#047857]" /> — в сезоне
          </span>
        </div>
      </div>

      {!compact && (
        <div
          className="text-[#64748B]"
          style={{ fontSize: 6 * s, marginTop: 5 * s, lineHeight: 1.5 }}
        >
          Прогнозные суммы — диапазоны-ориентиры по поведению клиентов в чате, а не фактические продажи.
        </div>
      )}
    </div>
  );
}

function SectionDivider({ label, s }: { label: string; s: number }) {
  return (
    <div
      className="flex items-center gap-1.5"
      style={{ marginTop: 6 * s, marginBottom: 5 * s }}
    >
      <div className="flex-1 border-t border-[#E2E8F0]" />
      <span
        className="font-semibold uppercase text-[#64748B]"
        style={{ fontSize: 6 * s, letterSpacing: "0.06em" }}
      >
        {label}
      </span>
      <div className="flex-1 border-t border-[#E2E8F0]" />
    </div>
  );
}

function PanelHead({
  icon: Icon,
  title,
  subtitle,
  s,
  iconColor = "#0038FF",
  iconBg = "#EBF0FF",
}: {
  icon: typeof CalendarClock;
  title: string;
  subtitle?: string;
  s: number;
  iconColor?: string;
  iconBg?: string;
}) {
  return (
    <div className="flex items-start gap-1.5">
      <div
        className="flex shrink-0 items-center justify-center rounded-md"
        style={{ width: 14 * s, height: 14 * s, backgroundColor: iconBg }}
      >
        <Icon size={8 * s} style={{ color: iconColor }} strokeWidth={1.9} />
      </div>
      <div className="min-w-0">
        <div
          className="font-semibold text-[#0F172A]"
          style={{ fontSize: 8.5 * s }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            className="text-[#64748B]"
            style={{ fontSize: 6.5 * s, marginTop: 0.5 }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

function ForecastCell({
  label,
  value,
  hint,
  money = false,
  s,
}: {
  label: string;
  value: string;
  hint: string;
  money?: boolean;
  s: number;
}) {
  return (
    <div style={{ ...TILE_STYLE, borderRadius: 8 * s, padding: `${5 * s}px ${6 * s}px` }}>
      <div
        className="font-medium uppercase text-[#64748B]"
        style={{ fontSize: 5.5 * s, letterSpacing: "0.02em", lineHeight: 1.25 }}
      >
        {label}
      </div>
      <div
        className="font-bold whitespace-nowrap"
        style={{
          fontSize: (money ? 9 : 11) * s,
          marginTop: 2 * s,
          color: money ? METRIC.emerald.main : "#0F172A",
          lineHeight: 1.15,
        }}
      >
        {value}
      </div>
      <div className="text-[#64748B]" style={{ fontSize: 5.5 * s, marginTop: 1 }}>
        {hint}
      </div>
    </div>
  );
}

function TrendBadge({ pp, s }: { pp: number; s: number }) {
  if (pp === 0) {
    return (
      <span className="text-[#64748B]">
        <Minus size={7 * s} />
      </span>
    );
  }
  const up = pp > 0;
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <span
      className="inline-flex items-center gap-0.5 font-semibold"
      style={{ fontSize: 6 * s, color: up ? "#047857" : "#DC2626" }}
    >
      <Icon size={7 * s} />
      {up ? "+" : ""}
      {pp} п.п.
    </span>
  );
}

function Methodology({ s }: { s: number }) {
  return (
    <div
      className="border-t border-[#E2E8F0]/60"
      style={{ marginTop: 5 * s, paddingTop: 3 * s }}
    >
      <span
        className="inline-flex items-center gap-1 text-[#64748B]"
        style={{ fontSize: 6.5 * s }}
      >
        <HelpCircle size={7 * s} />
        Как это посчитано
      </span>
    </div>
  );
}
