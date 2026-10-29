import type { CSSProperties, ReactNode } from "react";
import { LogoFinale, ManagerToast, defaultAsset, press, type SceneProps } from "./widgetKit";
import { CAB, CHANNEL, METRIC, PANEL_STYLE, TILE_STYLE, valueColor } from "../../lib/cabinetTheme";
import { FONT, clamp01, ease, p } from "./HowItWorksScene";

/**
 * Кабинет агентства (/dashboard): в «Диалогах» появляется заявка → менеджер
 * открывает диалог (переписка, профиль, «Запрос клиента») → «Перехватить»:
 * ассистент замолкает, менеджер отвечает сам → воронка в «Аналитике».
 * Вёрстка — по реальному кабинету в новом виде (прод кабинета 0a426c2 от 29.10.2026). Две раскладки:
 * широкая (ПК, 880×560) и узкая (телефон, 400×600) с общим сценарием.
 */

export const CABINET_DURATION = 25.4;
export const CABINET_WIDE = { w: 880, h: 500 };
export const CABINET_NARROW = { w: 400, h: 600 };
const FINALE = 21.4;

const NEW_ROW = 1.4;
const OPEN = 5.6;
const TAKE = 10.0;
const TYPE_FROM = 10.6;
const SEND = 13.5;
const TO_ANALYTICS = 15.9;

export function cabinetStage(t: number): number {
  if (t < OPEN) return 0;
  if (t < TAKE) return 1;
  if (t < TO_ANALYTICS) return 2;
  return 3;
}

// Цвета — из вида кабинета (cabinetTheme): синий кабинета, тексты, линии; бирюзовый — заявки, фиолетовый — туры.
const BLUE = CAB.blue;
const INK = CAB.text;
const GREY = CAB.text3;
const LINE = CAB.line;
const SOFT = "#F6F8FB";
/** Плашка «Менеджер за рулём» в кабинете — статус, зелёная. */
const OPERATOR = { bg: "#ECFDF5", border: "#A7F3D0", text: "#065F46", sub: "#047857" };

const REPLY = "Анна, добрый вечер! Подобрал три отеля у моря — пришлю подборку в течение 10 минут.";

const ROWS = [
  { name: "Ольга", ch: "MAX", status: "Подборка открыта", n: 12, time: "14:20" },
  { name: "Дмитрий", ch: "Сайт", status: "Консультация", n: 6, time: "13:05" },
  { name: "Елена", ch: "Сайт", status: "Запрос на бронь", n: 9, time: "11:42" },
  { name: "Игорь", ch: "MAX", status: "Диалог", n: 4, time: "10:18" },
  { name: "Марина", ch: "Сайт", status: "Подборка открыта", n: 11, time: "вчера" },
  { name: "Павел", ch: "MAX", status: "Запрос на бронь", n: 7, time: "вчера" },
];

const CHAT: { me?: boolean; text: string }[] = [
  { me: true, text: "Здравствуйте! Хотим в Турцию в июне" },
  { text: "С удовольствием помогу собрать запрос. С какой даты и на сколько ночей?" },
  { me: true, text: "С 10 июня, на 7 ночей. Нас двое" },
  { text: "Из какого города вылет и на какой бюджет ориентируетесь?" },
  { me: true, text: "Из Москвы, до 200 тысяч. Поближе к морю" },
  { me: true, text: "Анна, +7 900 000-00-00" },
  { text: "Спасибо, Анна! Заявка передана менеджеру — он свяжется с вами." },
];

function statusStyle(s: string): CSSProperties {
  s = s.replace(/\u00a0/g, " "); // типограф ставит неразрывные пробелы в строки
  const booking = s === "Запрос на бронь";
  const tour = s === "Подборка открыта";
  return {
    borderRadius: 999,
    padding: "2px 8px",
    fontSize: 10.5,
    fontWeight: 600,
    whiteSpace: "nowrap",
    color: booking ? METRIC.emerald.main : tour ? METRIC.violet.main : CAB.text2,
    background: booking ? METRIC.emerald.tint : tour ? METRIC.violet.tint : "#F1F5F9",
  };
}

const card: CSSProperties = { ...PANEL_STYLE };

/* ── Курсор / касание ─────────────────────────────────────────── */

type Way = [number, number, number]; // время, x, y

function Pointer({ t, path, clicks, touch }: { t: number; path: Way[]; clicks: number[]; touch?: boolean }) {
  if (t < path[0][0] - 0.3 || t > path[path.length - 1][0] + 0.6) return null;
  let x = path[0][1];
  let y = path[0][2];
  for (let i = 1; i < path.length; i++) {
    const [t0, x0, y0] = path[i - 1];
    const [t1, x1, y1] = path[i];
    if (t >= t0) {
      const k = ease(clamp01((t - t0) / (t1 - t0)));
      x = x0 + (x1 - x0) * k;
      y = y0 + (y1 - y0) * k;
    }
  }
  const ring = Math.max(0, ...clicks.map((c) => (t >= c && t < c + 0.45 ? 1 - (t - c) / 0.45 : 0)));
  const down = clicks.some((c) => t >= c - 0.05 && t < c + 0.15);
  const fade = clamp01((t - (path[0][0] - 0.3)) / 0.3) * (1 - clamp01((t - path[path.length - 1][0] - 0.3) / 0.3));
  return (
    <div style={{ position: "absolute", left: x, top: y, zIndex: 6, pointerEvents: "none", opacity: fade }}>
      {ring > 0 && (
        <span
          style={{
            position: "absolute",
            left: -18 * (1.6 - ring),
            top: -18 * (1.6 - ring),
            width: 36 * (1.6 - ring),
            height: 36 * (1.6 - ring),
            borderRadius: "50%",
            background: `rgba(0,98,239,${0.25 * ring})`,
          }}
        />
      )}
      {touch ? (
        <span style={{ position: "absolute", left: -13, top: -13, width: 26, height: 26, borderRadius: 13, background: "rgba(15,23,42,0.22)", border: "2px solid rgba(255,255,255,0.9)", transform: `scale(${down ? 0.85 : 1})` }} />
      ) : (
        <svg width="20" height="22" viewBox="0 0 20 22" style={{ position: "absolute", left: -3, top: -2, transform: `scale(${down ? 0.88 : 1})`, filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.3))" }} aria-hidden>
          <path d="M3 2 L3 18 L7.5 14 L10.5 20.5 L13 19.4 L10 13 L16 13 Z" fill="#0F172A" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

/* ── Экраны ─────────────────────────────────────────────────────── */

function DialogList({ t, narrow }: { t: number; narrow: boolean }) {
  const k = p(t, NEW_ROW, 0.5);
  const glow = 1 - p(t, NEW_ROW + 2.5, 1.5);
  const press_ = press(t, OPEN);
  const fresh = { name: "Анна", ch: "Сайт", status: "Запрос на бронь", n: 8, time: "только что" };
  const rows = [fresh, ...(narrow ? ROWS.slice(0, 5) : ROWS)];
  return (
    <div style={{ ...card, overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 18, padding: "12px 16px 0", borderBottom: `1px solid ${LINE}` }}>
        {["Диалоги", "Подборки"].map((s, i) => (
          <span key={s} style={{ paddingBottom: 9, fontSize: 13, fontWeight: 700, color: i === 0 ? BLUE : GREY, borderBottom: i === 0 ? `2px solid ${BLUE}` : "2px solid transparent" }}>
            {s}
          </span>
        ))}
      </div>
      {!narrow && (
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr 1.3fr 0.7fr 0.9fr", padding: "8px 16px", fontSize: 10.5, fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: 0.4, background: SOFT }}>
          <span>Клиент</span>
          <span>Канал</span>
          <span>Статус</span>
          <span>Сообщ.</span>
          <span>Время</span>
        </div>
      )}
      {rows.map((r, i) => {
        const isNew = i === 0;
        const h = narrow ? 58 : 44;
        const rowH = isNew ? h * k : h;
        if (isNew && k <= 0) return null;
        const bg = isNew ? `rgba(0,98,239,${0.07 * glow + (press_ > 0 ? 0.08 : 0)})` : "#fff";
        return (
          <div key={r.name} style={{ height: rowH, overflow: "hidden", borderTop: i === 0 && narrow ? "none" : `1px solid ${LINE}`, background: bg, opacity: isNew ? k : 1 }}>
            {narrow ? (
              <div style={{ height: h, display: "flex", alignItems: "center", gap: 10, padding: "0 14px" }}>
                <span style={{ width: 34, height: 34, borderRadius: 17, background: METRIC.blue.tint, color: BLUE, fontWeight: 700, fontSize: 13, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{r.name[0]}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>
                    {r.name} <span style={{ fontSize: 11, fontWeight: 500, color: GREY }}>· {r.ch}</span>
                  </div>
                  <span style={statusStyle(r.status)}>{r.status}</span>
                </div>
                <span style={{ fontSize: 11, color: isNew ? BLUE : GREY, fontWeight: isNew ? 700 : 400 }}>{r.time}</span>
              </div>
            ) : (
              <div style={{ height: h, display: "grid", gridTemplateColumns: "1.3fr 0.7fr 1.3fr 0.7fr 0.9fr", alignItems: "center", padding: "0 16px", fontSize: 12.5, color: INK }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
                  <span style={{ width: 26, height: 26, borderRadius: 13, background: METRIC.blue.tint, color: BLUE, fontWeight: 700, fontSize: 11, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>{r.name[0]}</span>
                  {r.name}
                  {isNew && <span style={{ width: 7, height: 7, borderRadius: 4, background: BLUE }} />}
                </span>
                <span style={{ color: GREY }}>{r.ch}</span>
                <span>
                  <span style={statusStyle(r.status)}>{r.status}</span>
                </span>
                <span style={{ color: GREY }}>{r.n}</span>
                <span style={{ color: isNew ? BLUE : GREY, fontWeight: isNew ? 700 : 400 }}>{r.time}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Bubble({ me, manager, children, k = 1 }: { me?: boolean; manager?: boolean; children: ReactNode; k?: number }) {
  return (
    <div style={{ display: "flex", justifyContent: me || manager ? "flex-end" : "flex-start", opacity: k, transform: `translateY(${(1 - k) * 8}px)` }}>
      <div
        style={{
          maxWidth: "78%",
          borderRadius: 12,
          padding: "7px 11px",
          fontSize: 12,
          lineHeight: 1.45,
          color: INK,
          background: manager ? METRIC.blue.tint : "#fff",
          border: `1px solid ${manager ? "rgba(0,56,255,0.18)" : me ? "#D6E4F5" : LINE}`,
        }}
      >
        {manager && <div style={{ fontSize: 10, fontWeight: 700, color: BLUE, marginBottom: 1 }}>Менеджер · вы</div>}
        {children}
      </div>
    </div>
  );
}

function Transcript({ t, narrow }: { t: number; narrow: boolean }) {
  const taken = t >= TAKE + 0.15;
  const typed = REPLY.slice(0, Math.round(REPLY.length * clamp01((t - TYPE_FROM) / (SEND - 0.25 - TYPE_FROM))));
  const sent = p(t, SEND + 0.2, 0.35);
  const chat = narrow ? CHAT.slice(1) : CHAT;
  return (
    <div style={{ ...card, background: SOFT, display: "flex", flexDirection: "column", overflow: "hidden", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px" }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>Переписка</span>
        <span style={{ borderRadius: 999, padding: "2px 8px", fontSize: 10.5, fontWeight: 600, color: BLUE, border: "1px solid #D6E4F5", background: "#fff" }}>● Сайт</span>
        <span style={{ fontSize: 10.5, color: GREY }}>{sent > 0 ? 9 : 8} сообщений</span>
      </div>
      {taken && (
        <div style={{ margin: "0 14px 6px", display: "flex", alignItems: "center", gap: 8, borderRadius: 10, padding: "6px 10px", background: OPERATOR.bg, border: `1px solid ${OPERATOR.border}`, opacity: p(t, TAKE + 0.15, 0.3) }}>
          <span style={{ fontSize: 13 }}>🎧</span>
          <div style={{ lineHeight: 1.3 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: OPERATOR.text }}>Менеджер за рулём · вы</div>
            <div style={{ fontSize: 10, color: OPERATOR.sub }}>Ассистент на паузе · с 20:16</div>
          </div>
        </div>
      )}
      <div style={{ flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 6, padding: "0 14px 8px" }}>
        {chat.map((m, i) => (
          <Bubble key={i} me={m.me}>
            {m.text}
          </Bubble>
        ))}
        {sent > 0 && (
          <Bubble manager k={sent}>
            {REPLY}
          </Bubble>
        )}
      </div>
      <div style={{ borderTop: `1px solid ${LINE}`, background: "#fff", padding: "9px 12px" }}>
        <div style={{ display: "flex", gap: 7, marginBottom: 8 }}>
          <span
            style={{
              borderRadius: 8,
              padding: "5px 10px",
              fontSize: 11.5,
              fontWeight: 600,
              color: taken ? CAB.text2 : "#fff",
              background: taken ? "#F1F5F9" : CAB.action,
              transform: `scale(${1 - 0.07 * press(t, TAKE)})`,
              whiteSpace: "nowrap",
            }}
          >
            {taken ? "↺ Вернуть боту" : "✋ Перехватить"}
          </span>
          {!narrow && <span style={{ borderRadius: 8, padding: "5px 10px", fontSize: 11.5, color: CAB.text2, background: "#F1F5F9" }}>Уведомления</span>}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              flex: 1,
              minWidth: 0,
              height: 34,
              borderRadius: 9,
              border: `1px solid ${taken ? "rgba(0,56,255,0.45)" : LINE}`,
              display: "flex",
              alignItems: "center",
              justifyContent: typed && t < SEND + 0.2 ? "flex-end" : "flex-start",
              padding: "0 10px",
              fontSize: 12,
              color: typed && t < SEND + 0.2 ? INK : "#94A3B8",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ flexShrink: 0 }}>{typed && t < SEND + 0.2 ? typed : taken ? "Ответ клиенту…" : "Перехватите диалог, чтобы ответить…"}</span>
          </div>
          <span
            style={{
              borderRadius: 9,
              padding: "0 14px",
              display: "flex",
              alignItems: "center",
              fontSize: 12,
              fontWeight: 700,
              color: "#fff",
              background: taken ? BLUE : "rgba(0,56,255,0.5)",
              transform: `scale(${1 - 0.07 * press(t, SEND)})`,
            }}
          >
            {narrow ? "➤" : "Отправить"}
          </span>
        </div>
      </div>
    </div>
  );
}

function RequestPanel({ compact }: { compact?: boolean }) {
  const kv = (k: string, v: ReactNode) => (
    <div style={{ display: "flex", gap: 8, fontSize: 12, padding: "3px 0" }}>
      <span style={{ width: 70, color: GREY, flexShrink: 0 }}>{k}</span>
      <span style={{ color: INK, fontWeight: 600 }}>{v}</span>
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {!compact && (
        <div style={{ ...card, padding: "12px 14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>Профиль клиента</span>
            <span style={statusStyle("Запрос на бронь")}>Запрос на бронь</span>
          </div>
          <div style={{ marginTop: 8 }}>
            {kv("Имя", "Анна")}
            {kv("Телефон", <span style={{ color: BLUE }}>+7 900 000-00-00</span>)}
            {kv("Начало", "сегодня, 20:08")}
          </div>
        </div>
      )}
      <div style={{ ...card, padding: "12px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: INK }}>Запрос клиента</span>
          {compact && <span style={{ fontSize: 11.5, color: BLUE, fontWeight: 600 }}>Анна · +7 900 000-00-00</span>}
        </div>
        <div style={{ marginTop: 6, fontSize: 12, lineHeight: 1.5, color: INK }}>Турция, с 10 июня, 7 ночей, вылет из Москвы, 2 взрослых, <span style={{ whiteSpace: "nowrap" }}>до 200 000 ₽</span></div>
        <div style={{ marginTop: 4, fontSize: 11.5, color: GREY }}>
          Пожелания: <span style={{ color: INK }}>поближе к морю</span>
        </div>
      </div>
    </div>
  );
}

function Analytics({ t, narrow }: { t: number; narrow: boolean }) {
  const bars = [
    ["Диалоги", 100],
    ["Запрос собран", 68],
    ["Контакт", 47],
    ["Заявка менеджеру", 41],
  ] as const;
  return (
    <div style={{ ...card, padding: narrow ? "14px 14px" : "16px 20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: INK }}>Воронка · 30 дней</span>
        <span style={{ fontSize: 10.5, color: GREY }}>пример данных</span>
      </div>
      <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: narrow ? 12 : 14 }}>
        {bars.map(([label, v], i) => {
          const k = p(t, TO_ANALYTICS + 0.5 + i * 0.25, 0.8);
          return (
            <div key={label}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: INK, marginBottom: 5 }}>
                <span>{label}</span>
                <span style={{ fontWeight: 700 }}>{Math.round(v * k)}%</span>
              </div>
              <div style={{ height: narrow ? 12 : 14, borderRadius: 7, background: CAB.track, overflow: "hidden" }}>
                <div style={{ width: `${v * k}%`, height: "100%", borderRadius: 7, background: i === 3 ? METRIC.emerald.main : valueColor(v, 100) }} />
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: narrow ? 16 : 20, display: "grid", gridTemplateColumns: narrow ? "1fr 1fr 1fr" : "repeat(3, 1fr)", gap: 10 }}>
        {[
          ["Конверсия в заявку", "41%"],
          ["Обращений вне рабочего времени", "23%"],
          ["Ср. время ответа", "1,2 с"],
        ]
          .map(([label, value], i) => {
            const k = p(t, TO_ANALYTICS + 1.4 + i * 0.2, 0.5);
            return (
              <div key={label} style={{ ...TILE_STYLE, padding: "10px 12px", opacity: k, transform: `translateY(${(1 - k) * 8}px)` }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: INK }}>{value}</div>
                <div style={{ fontSize: 11, color: GREY, marginTop: 2 }}>{label}</div>
              </div>
            );
          })}
      </div>
      {narrow && (
        <div style={{ marginTop: 16, opacity: p(t, TO_ANALYTICS + 2.1, 0.5) }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: INK, marginBottom: 6 }}>
            <span>Каналы</span>
            <span style={{ color: GREY }}>Сайт 64% · MAX 36%</span>
          </div>
          <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden" }}>
            <div style={{ width: "64%", background: CHANNEL.widget }} />
            <div style={{ width: "36%", background: CHANNEL.max }} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Раскладки ─────────────────────────────────────────────────── */

const NAV = [
  ["РАБОТА", ["Обзор", "Диалоги", "Аналитика"]],
  ["АССИСТЕНТ", ["База знаний", "Виджет", "Интеграции"]],
  ["АККАУНТ", ["Тариф и оплата", "Поддержка"]],
] as const;

function screenOf(t: number) {
  if (t >= TO_ANALYTICS + 0.2) return "analytics";
  if (t >= OPEN + 0.25) return "detail";
  return "list";
}

/** Плавная смена экрана: новый проявляется за 0.3 с. */
const appear = (t: number) => {
  const s = screenOf(t);
  const at = s === "analytics" ? TO_ANALYTICS + 0.2 : s === "detail" ? OPEN + 0.25 : -1;
  return p(t, at, 0.3);
};

function Wide({ t, asset }: { t: number; asset: (p: string) => string }) {
  const screen = screenOf(t);
  const k = appear(t);
  const active = screen === "analytics" ? "Аналитика" : "Диалоги";
  return (
    <div style={{ position: "relative", width: CABINET_WIDE.w, height: CABINET_WIDE.h, background: CAB.bg, display: "flex", fontFamily: FONT, overflow: "hidden" }}>
      <div style={{ width: 176, flexShrink: 0, borderRight: `1px solid ${LINE}`, background: "#fff", padding: "16px 10px" }}>
        <img src={asset("/logo.svg")} alt="" style={{ height: 30, width: "auto", display: "block", marginLeft: 4 }} />
        {NAV.map(([group, items]) => (
          <div key={group} style={{ marginTop: 16 }}>
            <div style={{ fontSize: 9.5, fontWeight: 700, color: GREY, letterSpacing: 0.6, padding: "0 8px 4px" }}>{group}</div>
            {items.map((it) => {
              const on = it === active;
              return (
                <div key={it} style={{ position: "relative", borderRadius: 9, padding: "6px 9px", fontSize: 12.5, fontWeight: on ? 700 : 500, color: on ? BLUE : CAB.text2, background: on ? CAB.activeBg : "transparent" }}>
                  {on && <span style={{ position: "absolute", left: -10, top: 7, bottom: 7, width: 3, borderRadius: "0 3px 3px 0", background: BLUE }} />}
                  {it}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <div style={{ height: 52, flexShrink: 0, borderBottom: `1px solid ${LINE}`, background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px" }}>
          <span style={{ fontSize: 13.5, color: GREY }}>
            {screen === "detail" ? (
              <>
                Диалоги <span style={{ color: "#CBD5E1" }}>›</span> <b style={{ color: INK }}>Детали диалога</b>
              </>
            ) : (
              <b style={{ color: INK }}>{active}</b>
            )}
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ borderRadius: 9, border: `1px solid ${LINE}`, padding: "5px 12px", fontSize: 12, color: GREY }}>🔍 Поиск</span>
            <span style={{ width: 30, height: 30, borderRadius: 15, background: BLUE, color: "#fff", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>А</span>
          </span>
        </div>
        <div style={{ flex: 1, minHeight: 0, padding: 16, opacity: k, transform: `translateY(${(1 - k) * 6}px)` }}>
          {screen === "list" && <DialogList t={t} narrow={false} />}
          {screen === "detail" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 250px", gap: 12, height: "100%" }}>
              <Transcript t={t} narrow={false} />
              <RequestPanel />
            </div>
          )}
          {screen === "analytics" && <Analytics t={t} narrow={false} />}
        </div>
      </div>
      <Pointer
        t={t}
        path={[
          [3.9, 640, 420],
          [5.2, 330, 150],
          [8.6, 330, 150],
          [9.6, 260, 430],
          [12.6, 268, 434],
          [13.3, 600, 468],
          [14.6, 600, 468],
          [15.6, 70, 186],
          [16.4, 70, 186],
        ]}
        clicks={[OPEN, TAKE, SEND, TO_ANALYTICS]}
      />
    </div>
  );
}

function Narrow({ t, asset }: { t: number; asset: (p: string) => string }) {
  const screen = screenOf(t);
  const k = appear(t);
  const title = screen === "analytics" ? "Аналитика" : screen === "detail" ? "Анна · Сайт" : "Диалоги";
  return (
    <div style={{ position: "relative", width: CABINET_NARROW.w, height: CABINET_NARROW.h, background: CAB.bg, fontFamily: FONT, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 56, flexShrink: 0, borderBottom: `1px solid ${LINE}`, background: "#fff", display: "flex", alignItems: "center", gap: 10, padding: "0 14px" }}>
        <span style={{ fontSize: 18, color: INK }}>{screen === "detail" ? "‹" : "☰"}</span>
        <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: INK }}>{title}</span>
        <img src={asset("/logo-icon.svg")} alt="" style={{ height: 22, width: "auto" }} />
      </div>
      <div style={{ flex: 1, minHeight: 0, padding: 12, opacity: k, transform: `translateY(${(1 - k) * 6}px)`, display: "flex", flexDirection: "column", gap: 10 }}>
        {screen === "list" && <DialogList t={t} narrow />}
        {screen === "detail" && (
          <>
            <RequestPanel compact />
            <div style={{ flex: 1, minHeight: 0 }}>
              <Transcript t={t} narrow />
            </div>
          </>
        )}
        {screen === "analytics" && <Analytics t={t} narrow />}
      </div>
      <Pointer
        t={t}
        path={[
          [4.4, 300, 420],
          [5.3, 200, 140],
          [8.8, 200, 140],
          [9.7, 120, 512],
          [12.8, 120, 512],
          [13.3, 362, 556],
          [14.6, 362, 556],
          [15.5, 22, 28],
          [16.3, 22, 28],
        ]}
        clicks={[OPEN, TAKE, SEND, TO_ANALYTICS]}
        touch
      />
    </div>
  );
}

function withToastAndFinale(t: number, c: number, asset: (p: string) => string, w: number, children: ReactNode) {
  return (
    <div style={{ position: "relative", width: w, height: "100%" }}>
      {children}
      <div style={{ position: "absolute", top: 8, right: 8, width: Math.min(w - 16, 330), height: 160 }}>
        <ManagerToast t={c} start={NEW_ROW + 0.4} end={4.6} title="Новая заявка · сайт" lines={["Анна · +7 900 000-00-00", "Турция, с 10 июня, 7 ночей, 2 взрослых, до 200 000 ₽"]} />
      </div>
      <LogoFinale t={t} logo={asset("/logo.svg")} start={FINALE} duration={CABINET_DURATION} />
    </div>
  );
}

export function CabinetWideScene({ t, asset = defaultAsset }: SceneProps) {
  const c = t >= FINALE + 0.6 ? 0 : t;
  return (
    <div style={{ width: CABINET_WIDE.w, height: CABINET_WIDE.h }}>
      {withToastAndFinale(t, c, asset, CABINET_WIDE.w, <Wide t={c} asset={asset} />)}
    </div>
  );
}

export function CabinetNarrowScene({ t, asset = defaultAsset }: SceneProps) {
  const c = t >= FINALE + 0.6 ? 0 : t;
  return (
    <div style={{ width: CABINET_NARROW.w, height: CABINET_NARROW.h }}>
      {withToastAndFinale(t, c, asset, CABINET_NARROW.w, <Narrow t={c} asset={asset} />)}
    </div>
  );
}

