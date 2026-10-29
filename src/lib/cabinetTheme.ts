/**
 * Вид кабинета «Навылет! AI» для макетов на сайте (кабинет, прод 0a426c2 от 29.10.2026).
 * Перенесено из кода кабинета: dashboard/src/lib/chartTheme.js и DESIGN.md.
 * Одна метрика — один цвет везде; распределения — шкала фирменного синего по величине;
 * зелёный и красный — только статусы и изменения.
 */

export const CAB = {
  bg: "#F2F5FA",
  text: "#0F172A",
  text2: "#475569",
  text3: "#64748B",
  line: "#E2E8F0",
  grid: "#EEF2F6",
  track: "#EEF2F7",
  blue: "#0038FF",
  activeBg: "#F0F4FF",
  success: "#047857",
  warning: "#B45309",
  danger: "#DC2626",
  /** «Перехватить» в «Диалогах» — кнопка действия, её цвет в кабинете не менялся */
  action: "#059669",
};

/** Карточка раздела и плашка внутри неё. */
export const PANEL_STYLE = {
  background: "#fff",
  border: "1px solid rgba(15,23,42,.05)",
  borderRadius: 16,
  boxShadow: "0 1px 3px rgba(15,23,42,.048), 0 14px 34px -12px rgba(15,23,42,.128)",
} as const;

export const TILE_STYLE = {
  background: "#fff",
  border: "1px solid rgba(15,23,42,.06)",
  borderRadius: 12,
  boxShadow: "0 1px 2px rgba(15,23,42,.048), 0 8px 18px -8px rgba(15,23,42,.144)",
} as const;

/** Цвета метрик: синий — диалоги и общение, фиолетовый — туры, бирюзовый — заявки, лиды и деньги, янтарный — время. */
export const METRIC = {
  blue: { main: "#0038FF", tint: "#EBF0FF" },
  violet: { main: "#7458F6", tint: "#EEEAFF" },
  emerald: { main: "#0E9F8A", tint: "#E2F5F1" },
  amber: { main: "#E08600", tint: "#FDF0DC", soft: "#F2B450" },
} as const;

export type MetricAccent = keyof typeof METRIC;

/** Каналы — как значок канала в «Диалогах»: сайт синий, MAX фиолетовый. */
export const CHANNEL = { widget: METRIC.blue.main, max: METRIC.violet.main };

const RAMP = ["#B7E4FF", "#3E95FF", "#0038FF"];

function hexToRgb(hex: string) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

function mix(from: string, to: string, t: number) {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  return `#${a.map((x, i) => Math.round(x + (b[i] - x) * t).toString(16).padStart(2, "0")).join("")}`;
}

/** t от 0 (светлее) до 1 (насыщеннее). */
export function rampColor(t: number) {
  const x = Math.max(0, Math.min(1, Number.isFinite(t) ? t : 0));
  return x < 0.5 ? mix(RAMP[0], RAMP[1], x * 2) : mix(RAMP[1], RAMP[2], (x - 0.5) * 2);
}

/** Цвет полосы по доле от наибольшего значения; самое маленькое не уходит в белый. */
export function valueColor(value: number, max: number) {
  if (!max || max <= 0) return CAB.blue;
  return rampColor(0.12 + (0.88 * (Number(value) || 0)) / max);
}

/** Круговая и её легенда: оттенок по месту в рейтинге, чтобы равные доли различались. */
export function rankColors(values: number[]) {
  const order = values.map((v, i) => [Number(v) || 0, i] as const).sort((a, b) => b[0] - a[0] || a[1] - b[1]);
  const colors = new Array<string>(values.length);
  const last = Math.max(values.length - 1, 1);
  order.forEach(([, i], rank) => {
    colors[i] = rampColor(1 - 0.85 * (rank / last));
  });
  return colors;
}

/** Тёмный или светлый текст поверх цвета шкалы. */
export function onRampText(value: number, max: number) {
  return max > 0 && value / max > 0.5 ? "#FFFFFF" : "#0B2A8F";
}
