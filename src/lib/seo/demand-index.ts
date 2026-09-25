/**
 * Индекс спроса на туры — единственный источник цифр для /indeks-sprosa
 * и /spros/*. Обновляется раз в месяц: scripts/demand-index.sql.
 *
 * Публикуем только доли и медианы. Число диалогов, звёздность (её подставляет
 * бот), города вылета и месячные объёмы (зависят от состава подключённых
 * агентств) на сайт не выносятся.
 */

export interface CountryDemand {
  /** slug страницы /spros/[slug], если она есть */
  slug?: string;
  name: string;
  /** Доля диалогов с подбором тура за весь период, % */
  sharePct: number;
  /** Доля в текущем месяце минус доля за предыдущие месяцы периода, п.п. */
  trendPp: number;
  /** Медианный бюджет, который турист называет сам, ₽ за тур; null — мало данных */
  budgetMedian: number | null;
  /** Доля запросов с детьми, % */
  kidsPct: number;
  /** Доля туров без перелёта, % */
  noFlightPct: number;
  /** Медиана ночей */
  nights: number;
  /** Медиана дней от запроса до вылета */
  horizonDays: number;
  /** Доля запросов с вылетом в ближайшие 14 дней, % */
  soonPct: number;
  /** Доля диалогов, где турист сам просит «всё включено», % */
  allInclusivePct: number;
  /** Самые упоминаемые курорты: название и доля диалогов по стране, % */
  resorts?: readonly { name: string; pct: number }[];
}

export const demandIndex = {
  edition: "Сентябрь 2026",
  /** ISO-даты выпуска и периода — для schema.org */
  published: "2026-09-25",
  periodFrom: "2026-06-01",
  periodTo: "2026-09-24",
  periodLabel: "1 июня — 24 сентября 2026",
  trendLabel: "сентябрь к июню–августу",

  overall: {
    budgetP25: 120000,
    budgetMedian: 160000,
    budgetP75: 210000,
    /** Доля диалогов, где турист сам называет бюджет, % */
    budgetStatedPct: 63,
    kidsPct: 39,
    twoAdultsPct: 45,
    soloPct: 10,
    nights: 7,
    nightsTop: [
      { nights: 7, pct: 37 },
      { nights: 10, pct: 14 },
      { nights: 9, pct: 10 },
    ],
    allInclusivePct: 43,
    horizonDays: 31,
    soonPct: 30,
    /** Вылет больше чем через 60 дней, % */
    farPct: 26,
    /** Турист спрашивает про перелёт, рейсы, пересадки — диапазон по странам, % */
    flightQuestionsPct: "10–20",
  },

  countries: [
    {
      slug: "turciya",
      name: "Турция",
      sharePct: 37.3,
      trendPp: -3.2,
      budgetMedian: 167500,
      kidsPct: 43,
      noFlightPct: 1,
      nights: 7,
      horizonDays: 26,
      soonPct: 34,
      allInclusivePct: 55,
      resorts: [{ name: "Кемер", pct: 7 }],
    },
    {
      slug: "egipet",
      name: "Египет",
      sharePct: 19.7,
      trendPp: 11.3,
      budgetMedian: 170000,
      kidsPct: 45,
      noFlightPct: 1,
      nights: 7,
      horizonDays: 39,
      soonPct: 26,
      allInclusivePct: 55,
      resorts: [
        { name: "Шарм-эль-Шейх", pct: 15 },
        { name: "Хургада", pct: 13 },
      ],
    },
    {
      slug: "vetnam",
      name: "Вьетнам",
      sharePct: 10.9,
      trendPp: -2.8,
      budgetMedian: 200000,
      kidsPct: 32,
      noFlightPct: 1,
      nights: 9,
      horizonDays: 40,
      soonPct: 25,
      allInclusivePct: 25,
      resorts: [{ name: "Нячанг и Камрань", pct: 13 }],
    },
    {
      slug: "rossiya",
      name: "Россия",
      sharePct: 9.5,
      trendPp: -3.3,
      budgetMedian: 100000,
      kidsPct: 41,
      noFlightPct: 19,
      nights: 6,
      horizonDays: 21,
      soonPct: 39,
      allInclusivePct: 27,
      resorts: [
        { name: "Сочи и Адлер", pct: 29 },
        { name: "Калининград", pct: 11 },
        { name: "Анапа", pct: 9 },
        { name: "Крым", pct: 7 },
      ],
    },
    {
      slug: "tailand",
      name: "Таиланд",
      sharePct: 7.4,
      trendPp: 1.8,
      budgetMedian: 180000,
      kidsPct: 30,
      noFlightPct: 0,
      nights: 9,
      horizonDays: 46,
      soonPct: 21,
      allInclusivePct: 26,
      resorts: [
        { name: "Пхукет", pct: 19 },
        { name: "Паттайя", pct: 8 },
      ],
    },
    {
      name: "Китай",
      sharePct: 4.1,
      trendPp: -0.2,
      budgetMedian: 180000,
      kidsPct: 28,
      noFlightPct: 1,
      nights: 7,
      horizonDays: 43,
      soonPct: 19,
      allInclusivePct: 21,
      resorts: [{ name: "Хайнань", pct: 24 }],
    },
    {
      slug: "maldivy",
      name: "Мальдивы",
      sharePct: 2.8,
      trendPp: -1.8,
      budgetMedian: 300000,
      kidsPct: 33,
      noFlightPct: 3,
      nights: 7,
      horizonDays: 36,
      soonPct: 23,
      allInclusivePct: 38,
    },
    {
      name: "Абхазия",
      sharePct: 2.2,
      trendPp: -2.0,
      budgetMedian: 100000,
      kidsPct: 36,
      noFlightPct: 13,
      nights: 7,
      horizonDays: 21,
      soonPct: 40,
      allInclusivePct: 38,
    },
    {
      name: "ОАЭ",
      sharePct: 1.0,
      trendPp: 0.5,
      budgetMedian: null,
      kidsPct: 39,
      noFlightPct: 3,
      nights: 7,
      horizonDays: 35,
      soonPct: 31,
      allInclusivePct: 47,
    },
    {
      slug: "shri-lanka",
      name: "Шри-Ланка",
      sharePct: 0.9,
      trendPp: -0.2,
      budgetMedian: null,
      kidsPct: 13,
      noFlightPct: 3,
      nights: 8.5,
      horizonDays: 62,
      soonPct: 13,
      allInclusivePct: 28,
    },
  ] satisfies readonly CountryDemand[],

  /** Доли стран по месяцу, в котором турист искал тур, % */
  bySearchMonth: [
    { month: "Июнь", shares: { Турция: 36, Египет: 16, Вьетнам: 13, Россия: 12, Таиланд: 8 } },
    { month: "Июль", shares: { Турция: 41, Египет: 19, Вьетнам: 10, Россия: 6, Таиланд: 7 } },
    { month: "Август", shares: { Турция: 39, Египет: 25, Вьетнам: 8, Россия: 8, Таиланд: 6 } },
    { month: "Сентябрь", shares: { Турция: 34, Египет: 30, Вьетнам: 8, Россия: 7, Таиланд: 9 } },
  ],

  /** Куда хотят лететь по месяцу вылета: топ-3, % поисков с вылетом в этом месяце */
  byDepartureMonth: [
    {
      month: "Октябрь",
      top: [
        { name: "Турция", pct: 35 },
        { name: "Египет", pct: 35 },
        { name: "Вьетнам", pct: 9 },
      ],
    },
    {
      month: "Ноябрь",
      top: [
        { name: "Египет", pct: 42 },
        { name: "Таиланд", pct: 16 },
        { name: "Вьетнам", pct: 14 },
      ],
    },
    {
      month: "Декабрь",
      top: [
        { name: "Египет", pct: 31 },
        { name: "Таиланд", pct: 23 },
        { name: "Вьетнам", pct: 21 },
      ],
    },
  ],
} as const;

export type DemandIndex = typeof demandIndex;

export function countryDemand(slug: string): CountryDemand {
  const c = demandIndex.countries.find((x) => "slug" in x && x.slug === slug);
  if (!c) throw new Error(`demand-index: нет данных для /spros/${slug}`);
  return c;
}

export const fmtPct = (v: number) =>
  v < 1 ? "<1%" : `${Math.round(v)}%`;

export const fmtPp = (v: number) =>
  `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toLocaleString("ru-RU")} п.п.`;

export const fmtRub = (v: number) =>
  `${v.toLocaleString("ru-RU").replace(/\s/g, "\u202F")} ₽`;

/** «170 тыс. ₽» */
export const fmtRubK = (v: number) =>
  `${Math.round(v / 1000).toLocaleString("ru-RU")} тыс. ₽`;

/** «около 170 тыс. ₽» — для текста */
export const fmtRubShort = (v: number) => `около ${fmtRubK(v)}`;

/** «31 день», «62 дня», «26 дней» */
export const fmtDays = (v: number) => {
  const n = Math.round(v);
  const m10 = n % 10;
  const m100 = n % 100;
  const w =
    m10 === 1 && m100 !== 11
      ? "день"
      : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)
        ? "дня"
        : "дней";
  return `${n} ${w}`;
};
