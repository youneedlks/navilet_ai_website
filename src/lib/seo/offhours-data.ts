/**
 * Коэффициенты калькулятора потерянных обращений.
 *
 * Источник — база диалогов ЛК, июнь–август 2026, диалоги от двух сообщений,
 * время начала по Москве. Пересчитывать раз в сезон тем же запросом:
 * доля диалогов вне часов работы офиса и доля заявок среди них.
 *
 * «Контакт» — посетитель оставил телефон или почту либо попросил бронь.
 * «Интерес» — то же плюс клик по конкретному туру в подборке.
 */
export const offhoursSource = {
  dialogs: 4776,
  period: "июнь–август 2026",
};

/** Доля заявок, доходящих до брони: отраслевой ориентир, не данные сети. */
export const bookingRate = { min: 0.1, max: 0.2 };

export interface OfficeSchedule {
  id: string;
  label: string;
  /** Доля обращений, которые приходят, когда офис закрыт */
  offShare: number;
  /** Доля заявок с контактом среди этих обращений */
  contactRate: number;
  /** Доля обращений с интересом к туру, включая контакт */
  interestRate: number;
}

export const officeSchedules: OfficeSchedule[] = [
  {
    id: "weekdays_9_19",
    label: "Будни 9–19",
    offShare: 0.584,
    contactRate: 0.079,
    interestRate: 0.135,
  },
  {
    id: "weekdays_9_21",
    label: "Будни 9–21",
    offShare: 0.491,
    contactRate: 0.084,
    interestRate: 0.137,
  },
  {
    id: "weekdays_10_19_sat",
    label: "Будни 10–19, сб до 16",
    offShare: 0.569,
    contactRate: 0.079,
    interestRate: 0.135,
  },
  {
    id: "daily_9_21",
    label: "Каждый день 9–21",
    offShare: 0.301,
    contactRate: 0.075,
    interestRate: 0.136,
  },
];
