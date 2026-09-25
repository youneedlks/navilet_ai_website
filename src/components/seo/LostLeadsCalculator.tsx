"use client";

import { useRef, useState } from "react";
import { Moon, ChevronDown } from "lucide-react";
import RegisterCta from "@/components/seo/RegisterCta";
import {
  officeSchedules,
  offhoursSource,
  bookingRate,
} from "@/lib/seo/offhours-data";
import { metrikaGoals, reachMetrikaGoal } from "@/lib/metrika";

const MIN = 10;
const MAX = 1000;

function plural(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

const fmt = (n: number) => n.toLocaleString("ru-RU");

/** «3–6 броней», «до 2 броней», «меньше одной брони» — без ложной точности. */
function bookingsText(low: number, high: number) {
  const lo = Math.round(low);
  const hi = Math.round(high);
  if (hi < 1) return "меньше одной брони";
  if (lo < 1) return `до ${fmt(hi)} ${plural(hi, "брони", "броней", "броней")}`;
  if (lo === hi) return `около ${fmt(hi)} ${plural(hi, "брони", "броней", "броней")}`;
  return `${fmt(lo)}–${fmt(hi)} ${plural(hi, "бронь", "брони", "броней")}`;
}

export default function LostLeadsCalculator({ source }: { source: string }) {
  const [volume, setVolume] = useState(100);
  const [scheduleId, setScheduleId] = useState(officeSchedules[0].id);
  const [showMethod, setShowMethod] = useState(false);
  const tracked = useRef(false);

  const schedule =
    officeSchedules.find((s) => s.id === scheduleId) ?? officeSchedules[0];

  const touch = () => {
    if (tracked.current) return;
    tracked.current = true;
    reachMetrikaGoal(metrikaGoals.calculatorUsed, { source });
  };

  const setClamped = (n: number) => {
    touch();
    if (Number.isNaN(n)) return;
    setVolume(Math.min(MAX * 10, Math.max(0, Math.round(n))));
  };

  const off = volume * schedule.offShare;
  const contacts = off * schedule.contactRate;
  const interested = off * schedule.interestRate;
  const offRounded = Math.round(off);
  const contactsRounded = Math.round(contacts);
  const interestedRounded = Math.round(interested);

  return (
    <div className="rounded-2xl border border-accent/20 bg-white p-6 shadow-card sm:p-8">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
          <Moon className="h-5 w-5 text-accent" />
        </span>
        <div>
          <h3 className="font-display text-lg font-bold text-heading sm:text-xl">
            Сколько обращений приходит, когда ваш офис закрыт
          </h3>
          <p className="mt-1 text-sm text-body">
            Расчёт на реальных диалогах сети «Навылет! AI» — два параметра,
            результат сразу.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Параметры */}
        <div className="space-y-6">
          <div>
            <label
              htmlFor={`${source}-volume`}
              className="block text-xs font-semibold uppercase tracking-wide text-muted"
            >
              Обращений в месяц
            </label>
            <div className="mt-2 flex items-center gap-3">
              <input
                type="range"
                min={MIN}
                max={MAX}
                step={10}
                value={Math.min(volume, MAX)}
                onChange={(e) => setClamped(Number(e.target.value))}
                aria-label="Обращений в месяц"
                className="h-2 flex-1 cursor-pointer accent-accent"
              />
              <input
                id={`${source}-volume`}
                type="number"
                inputMode="numeric"
                min={0}
                value={volume}
                onChange={(e) => setClamped(Number(e.target.value))}
                className="w-24 rounded-xl border border-gray-200 bg-gray-50/70 px-3 py-2 text-right text-base font-semibold text-heading outline-none focus:border-accent/40 focus:bg-white focus:ring-2 focus:ring-accent/10 sm:text-sm"
              />
            </div>
            <p className="mt-1.5 text-xs text-muted">
              Все каналы: сайт, мессенджеры, соцсети. Если не знаете точно —
              оставьте 100.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              Когда работает офис
            </p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {officeSchedules.map((s) => {
                const active = s.id === scheduleId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      touch();
                      setScheduleId(s.id);
                    }}
                    className={`min-h-11 rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                      active
                        ? "border-accent bg-accent/5 text-accent shadow-[0_2px_8px_rgba(0,151,245,0.15)]"
                        : "border-gray-200 bg-white text-heading hover:border-accent/40 hover:bg-blue-ice/40"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Результат */}
        <div
          aria-live="polite"
          className="rounded-2xl bg-blue-ice/50 p-5 sm:p-6"
        >
          <p className="text-sm text-body">Когда офис закрыт, приходит</p>
          <p className="mt-1 font-display text-3xl font-bold text-accent">
            {fmt(offRounded)}{" "}
            <span className="text-xl">
              {plural(offRounded, "обращение", "обращения", "обращений")}
            </span>
          </p>
          <p className="text-sm text-body">
            в месяц — это {Math.round(schedule.offShare * 100)} из 100
          </p>

          <div className="mt-5 space-y-3 border-t border-accent/10 pt-4 text-sm text-body">
            <p>
              Из них{" "}
              <span className="font-semibold text-heading">
                {contactsRounded < 1
                  ? "меньше одного человека"
                  : `≈ ${fmt(contactsRounded)} ${plural(contactsRounded, "человек", "человека", "человек")}`}
              </span>              {" "}
              {contactsRounded <= 1
                ? "оставит контакт или попросит бронь"
                : "оставят контакт или попросят бронь"}
              , а всего{" "}
              <span className="font-semibold text-heading">
                ≈ {fmt(interestedRounded)}
              </span>{" "}
              {interestedRounded === 1 ? "выберет" : "выберут"} конкретный тур.
            </p>
            <p>
              Это{" "}
              <span className="font-semibold text-heading">
                {bookingsText(
                  contacts * 12 * bookingRate.min,
                  contacts * 12 * bookingRate.max
                )}{" "}
                в год
              </span>
              , если на обращение отвечают сразу, а не утром.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowMethod((v) => !v)}
        aria-expanded={showMethod}
        className="mt-5 inline-flex cursor-pointer items-center gap-1 text-sm font-semibold text-accent hover:underline"
      >
        Как посчитано
        <ChevronDown
          className={`h-4 w-4 transition-transform ${showMethod ? "rotate-180" : ""}`}
        />
      </button>
      {showMethod && (
        <div className="mt-3 space-y-2 rounded-xl bg-surface-alt p-4 text-xs leading-relaxed text-body">
          <p>
            Доля обращений вне часов работы и доля заявок среди них — по{" "}
            {fmt(offhoursSource.dialogs)} диалогам ассистентов сети «Навылет!
            AI» за {offhoursSource.period}, время по Москве. Для каждого
            графика доли посчитаны отдельно.
          </p>
          <p>
            «Оставят контакт» — телефон, почта или просьба о брони. «Выберут
            тур» — то же плюс клик по конкретному туру в подборке.
          </p>
          <p>
            До брони, по отраслевому ориентиру, доходит{" "}
            {Math.round(bookingRate.min * 100)}–
            {Math.round(bookingRate.max * 100)}% заявок с контактом. Это
            оценка, а не гарантия: у каждого агентства своя конверсия.
          </p>
        </div>
      )}

      <div className="mt-6 border-t border-gray-100 pt-6">
        <p className="mb-4 text-sm text-body">
          Ассистент отвечает на эти обращения сам, за секунды, и передаёт
          менеджеру заявку к утру. Первый месяц — бесплатно.
        </p>
        <RegisterCta source={source} compact className="sm:justify-start" />
      </div>
    </div>
  );
}
