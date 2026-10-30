import type { ComponentType, CSSProperties, ImgHTMLAttributes, ReactNode } from "react";
import { Feed, FeedItem } from "./Feed";
import { clamp01, ease, p, FONT, FONT_DISPLAY } from "./HowItWorksScene";

/**
 * Общие детали роликов «в виджете» (первый экран, версии, подборки):
 * шапка, сообщения, карточки туров, поле ввода, уведомление менеджеру и финал
 * с логотипом. Цвета и вёрстка — как у DemoWidget. Всё — функции от времени,
 * без таймеров, чтобы одну сцену играли и сайт, и Remotion.
 */

export const WIDGET_W = 400;
export const WIDGET_H = 600;
export const HEADER_H = 60;
export const FOOTER_H = 82;
export const BLUE = "#0062EF";
export const INK = "#2C3E50";
export const GREY = "#7F8C8D";
export const WIDGET_GRADIENT = "linear-gradient(135deg, #0062EF, #0097F5, #00CCF5)";

export type ImgComp = ComponentType<ImgHTMLAttributes<HTMLImageElement>>;
export const defaultImg = "img" as unknown as ImgComp;
export const defaultAsset = (path: string) => path;

/** Пропсы любой сцены: в Remotion подменяются картинки и пути к файлам из public/. */
export type SceneProps = { t: number; Img?: ImgComp; asset?: (path: string) => string };

const tvPic = (code: number) => `https://static.tourvisor.ru/hotel_pics/main400/${code}.jpg`;

export const CARDS = [
  { name: "Barut Hemera", resort: "Сиде", rating: 4.7, dates: "03.06 — 10.06", meal: "Всё включено", room: "Standard", price: "142 500 ₽", img: tvPic(1033) },
  { name: "Calista Luxury Resort", resort: "Белек", rating: 4.8, dates: "02.06 — 09.06", meal: "Ультра всё включено", room: "Deluxe", price: "186 200 ₽", img: tvPic(1065) },
  { name: "Voyage Belek", resort: "Белек", rating: 4.6, dates: "04.06 — 11.06", meal: "Ультра всё включено", room: "Standard", price: "158 900 ₽", img: tvPic(1582) },
];

/** Сообщение туриста: `type` — начало набора в поле ввода (нет — нажата подсказка), `send` — отправка. */
export type UserLine = { text: string; type?: number; send: number };

/* ── Сообщения ─────────────────────────────────────────────────────── */

export function Avatar({ user }: { user?: boolean }) {
  return (
    <span
      style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: user ? "linear-gradient(135deg, #1976D2, #1565C0)" : "linear-gradient(135deg, #0062EF, #0097F5)",
      }}
    >
      <svg viewBox="0 0 24 24" fill="#fff" width={15} height={15} aria-hidden>
        {user ? (
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        ) : (
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        )}
      </svg>
    </span>
  );
}

const bubble: CSSProperties = {
  borderRadius: 16,
  padding: "9px 13px",
  fontSize: 13,
  lineHeight: 1.55,
  whiteSpace: "pre-line",
};

export function UserMsg({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse", gap: 8 }}>
      <Avatar user />
      <div
        style={{
          ...bubble,
          maxWidth: "78%",
          borderBottomRightRadius: 6,
          color: "#fff",
          background: "linear-gradient(135deg, #1976D2, #1565C0)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Dots({ t }: { t: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 5, padding: "5px 3px" }}>
      {[0, 1, 2].map((i) => {
        const w = 0.5 + 0.5 * Math.sin(t * 6.3 - i * 0.9);
        return (
          <span
            key={i}
            style={{ width: 6, height: 6, borderRadius: 3, background: "#0097F5", opacity: 0.3 + 0.7 * w, transform: `scale(${0.85 + 0.15 * w})` }}
          />
        );
      })}
    </span>
  );
}

/** Ответ ассистента: с `typing` — «печатает», с `text` — сообщение; `extra` — карточки и кнопки под ним. */
export function BotMsg({ t, typing, text, children, extra }: { t: number; typing: number; text: number; children: ReactNode; extra?: ReactNode }) {
  const shown = t >= text;
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Avatar />
      <div style={{ maxWidth: "80%", minWidth: 0, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <div
          style={{
            ...bubble,
            borderBottomLeftRadius: 6,
            color: INK,
            background: "#F8F9FA",
            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          {shown ? <span style={{ opacity: p(t, text, 0.3) }}>{children}</span> : <Dots t={t - typing} />}
        </div>
        {shown && extra}
      </div>
    </div>
  );
}

/** Строка ленты для сообщения туриста. */
export function UserItem({ t, line }: { t: number; line: UserLine }) {
  return (
    <FeedItem t={t} start={line.send} gap={12}>
      <UserMsg>{line.text}</UserMsg>
    </FeedItem>
  );
}

/** Строка ленты для ответа ассистента. */
export function BotItem(props: { t: number; typing: number; text: number; children: ReactNode; extra?: ReactNode }) {
  return (
    <FeedItem t={props.t} start={props.typing} gap={12}>
      <BotMsg {...props} />
    </FeedItem>
  );
}

/** Нажатие: 0 → 1 → 0 за 0.3 с — для «вдавленной» кнопки. */
export const press = (t: number, at: number) => Math.sin(Math.PI * clamp01((t - at) / 0.3));

/** Кнопки-подсказки под ответом; `tapAt` — нажатие на первую, после него кнопки исчезают. */
export function Chips({ t, show, tapAt, items }: { t: number; show: number; tapAt?: number; items: string[] }) {
  const k = p(t, show, 0.35);
  if (k <= 0 || (tapAt !== undefined && t >= tapAt + 0.3)) return null;
  return (
    <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 6, opacity: k, transform: `translateY(${(1 - k) * 6}px)` }}>
      {items.map((s, i) => {
        const on = tapAt !== undefined && i === 0 && t >= tapAt - 0.35;
        return (
          <span
            key={s}
            style={{
              borderRadius: 999,
              border: `2px solid ${BLUE}`,
              padding: "5px 11px",
              fontSize: 11.5,
              fontWeight: 500,
              whiteSpace: "nowrap",
              color: on ? "#fff" : BLUE,
              background: on ? BLUE : "#fff",
              transform: i === 0 && tapAt !== undefined ? `scale(${1 - 0.06 * press(t, tapAt)})` : undefined,
            }}
          >
            {s}
          </span>
        );
      })}
    </div>
  );
}

/* ── Карточки туров ───────────────────────────────────────────────── */

const CARD_W = 172;
const ROW_W = 266;

function TourCard({ card, Img }: { card: (typeof CARDS)[number]; Img: ImgComp }) {
  return (
    <div
      style={{
        width: CARD_W,
        flexShrink: 0,
        overflow: "hidden",
        borderRadius: 12,
        border: "1px solid rgba(224,224,224,0.7)",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ position: "relative", height: 92, background: "#f0f0f0" }}>
        <Img src={card.img} alt="" width={CARD_W} height={92} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <span style={{ position: "absolute", left: 6, top: 6, borderRadius: 4, padding: "2px 5px", fontSize: 9.5, fontWeight: 600, color: "#FFD700", background: "rgba(0,0,0,0.7)", letterSpacing: 0.5 }}>
          ★★★★★
        </span>
        <span style={{ position: "absolute", right: 6, top: 6, borderRadius: 4, padding: "2px 5px", fontSize: 9.5, fontWeight: 700, color: "#fff", background: "rgba(39,174,96,0.95)" }}>
          <span style={{ color: "#FFD700" }}>★</span> {card.rating}
        </span>
      </div>
      <div style={{ padding: "7px 8px 8px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{card.name}</div>
        <div style={{ fontSize: 10, color: GREY, marginTop: 1 }}>📍 Турция, {card.resort}</div>
        <div style={{ marginTop: 4, borderRadius: 5, padding: "2px 6px", fontSize: 10, fontWeight: 500, color: "#27AE60", background: "rgba(39,174,96,0.1)" }}>✈️ Москва</div>
        <div style={{ marginTop: 3, fontSize: 10, color: INK }}>📅 {card.dates} · 7 ноч.</div>
        <div style={{ fontSize: 10, color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>🍽️ {card.meal}</div>
        <div style={{ marginTop: 4, fontSize: 15, fontWeight: 800, color: BLUE, fontFamily: FONT_DISPLAY }}>{card.price}</div>
        <div style={{ fontSize: 9, color: GREY }}>за тур</div>
        <div
          style={{
            marginTop: 6,
            borderRadius: 8,
            padding: "6px 0",
            textAlign: "center",
            fontSize: 11,
            fontWeight: 600,
            color: "#fff",
            background: "linear-gradient(135deg, #0062EF, #0097F5)",
          }}
        >
          ✈️ Оформить тур
        </div>
      </div>
    </div>
  );
}

/**
 * Карточки туров: появляются по одной, лента листается и возвращается к первой.
 * `openAt` — нажатие «Смотреть подборку», `shareAt` — «Поделиться» (→ «Ссылка готова»).
 */
export function Cards({ t, start, Img, openAt, shareAt }: { t: number; start: number; Img: ImgComp; openAt?: number; shareAt?: number }) {
  const shift = CARDS.length * CARD_W + (CARDS.length - 1) * 8 - ROW_W;
  const x = -shift * (p(t, start + 1.7, 1.1) - p(t, start + 3.3, 0.8));
  const shared = shareAt !== undefined && t >= shareAt + 0.15;
  const btn: CSSProperties = { flex: 1, textAlign: "center", borderRadius: 10, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" };
  return (
    <div style={{ marginTop: 8, width: ROW_W }}>
      <div style={{ overflow: "hidden", borderRadius: 12 }}>
        <div style={{ display: "flex", gap: 8, transform: `translateX(${x}px)` }}>
          {CARDS.map((c, i) => {
            const k = p(t, start + i * 0.18, 0.45);
            return (
              <div key={c.name} style={{ opacity: k, transform: `translateY(${(1 - k) * 12}px)` }}>
                <TourCard card={c} Img={Img} />
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ marginTop: 5, display: "flex", justifyContent: "space-between", fontSize: 10, color: "#95A5A6" }}>
        <span>Найдено 3 тура</span>
        <span>← листайте →</span>
      </div>
      <div style={{ marginTop: 6, display: "flex", gap: 6 }}>
        <span
          style={{
            ...btn,
            padding: "7px 0",
            color: "#fff",
            background: BLUE,
            transform: openAt !== undefined ? `scale(${1 - 0.07 * press(t, openAt)})` : undefined,
            boxShadow: openAt !== undefined && press(t, openAt) > 0 ? "0 0 0 5px rgba(0,98,239,0.18)" : "none",
          }}
        >
          Смотреть подборку
        </span>
        <span
          style={{
            ...btn,
            padding: "5px 0",
            color: shared ? "#fff" : BLUE,
            background: shared ? "#27AE60" : "#fff",
            border: `2px solid ${shared ? "#27AE60" : BLUE}`,
            transform: shareAt !== undefined ? `scale(${1 - 0.07 * press(t, shareAt)})` : undefined,
          }}
        >
          {shared ? "✓ Ссылка готова" : "Поделиться"}
        </span>
      </div>
    </div>
  );
}

/* ── Итоги и уведомления ─────────────────────────────────────────── */

/** Плашка в конце ленты: «Диалог завершён» и что ушло менеджеру. */
export function DoneNote({ t, start, title, text }: { t: number; start: number; title: string; text: string }) {
  const k = p(t, start, 0.4);
  return (
    <div
      style={{
        marginTop: 2,
        borderRadius: 12,
        background: "#F8F9FA",
        padding: "10px 14px",
        textAlign: "center",
        opacity: k,
        transform: `scale(${0.96 + 0.04 * k})`,
      }}
    >
      <div style={{ fontSize: 12, fontWeight: 600, color: INK }}>
        <span style={{ color: "#27AE60" }}>✓</span> {title}
      </div>
      <div style={{ fontSize: 11, color: GREY, marginTop: 1 }}>{text}</div>
    </div>
  );
}

/** Уведомление менеджеру в Telegram — выезжает сверху поверх виджета. */
export function ManagerToast({ t, start, end, title, lines }: { t: number; start: number; end: number; title: string; lines: string[] }) {
  const k = p(t, start, 0.5) * (1 - p(t, end, 0.35));
  if (k <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 12,
        right: 12,
        top: 12,
        zIndex: 5,
        background: "rgba(255,255,255,0.98)",
        borderRadius: 16,
        padding: "12px 14px",
        border: "1px solid rgba(0,98,239,0.12)",
        boxShadow: "0 18px 44px rgba(0,34,82,0.28)",
        transform: `translateY(${(k - 1) * 150}px)`,
        opacity: k,
        color: INK,
        fontFamily: FONT,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 24, height: 24, borderRadius: 12, background: "#2AABEE", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff" aria-hidden>
            <path d="M21.5 4.2 18.4 19c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.2 12.8l-4.7-1.5c-1-.3-1-1 .2-1.5L20 3c.9-.3 1.7.2 1.5 1.2Z" />
          </svg>
        </span>
        <span style={{ fontSize: 11, color: GREY }}>Telegram · уведомление менеджеру · сейчас</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 800, marginTop: 7, fontFamily: FONT_DISPLAY }}>{title}</div>
      {lines.map((l, i) => (
        <div key={i} style={{ fontSize: 12, lineHeight: 1.45, marginTop: 2, color: i === 0 ? INK : "#475569" }}>
          {l}
        </div>
      ))}
    </div>
  );
}

/* ── Поле ввода и рамка виджета ──────────────────────────────────── */

/** Поле ввода: турист набирает следующее сообщение, кнопка «отправить» мигает в момент отправки. */
function Composer({ t, user, icon }: { t: number; user: UserLine[]; icon: string }) {
  const cur = user.find((u) => u.type !== undefined && t >= u.type && t < u.send + 0.05);
  let text = "";
  if (cur && cur.type !== undefined) {
    const n = Math.round(cur.text.length * clamp01((t - cur.type) / (cur.send - 0.1 - cur.type)));
    text = cur.text.slice(0, n);
  }
  const pulse = user.some((u) => u.type !== undefined && t >= u.send - 0.12 && t < u.send + 0.18);
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: FOOTER_H, borderTop: "1px solid rgba(224,224,224,0.4)", background: "#fff", padding: "11px 16px 0" }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            height: 40,
            borderRadius: 12,
            border: `1px solid ${text ? "rgba(0,98,239,0.45)" : "#E0E0E0"}`,
            padding: "0 13px",
            display: "flex",
            alignItems: "center",
            justifyContent: text ? "flex-end" : "flex-start",
            fontSize: 13.5,
            color: text ? INK : "#95A5A6",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {/* Длинный текст уходит влево, курсор всегда виден */}
          <span style={{ flexShrink: 0 }}>{text || "Введите ваш запрос..."}</span>
          {text && <span style={{ width: 1.5, height: 16, marginLeft: 1, flexShrink: 0, background: BLUE, opacity: Math.sin(t * 9) > 0 ? 1 : 0.2 }} />}
        </div>
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #0062EF, #0097F5)",
            transform: `scale(${pulse ? 0.9 : 1})`,
            boxShadow: pulse ? "0 0 0 5px rgba(0,98,239,0.18)" : "none",
          }}
        >
          <svg viewBox="0 0 24 24" fill="#fff" width={19} height={19} aria-hidden>
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </span>
      </div>
      <div style={{ marginTop: 7, textAlign: "center", fontSize: 10, color: "#BDC3C7" }}>
        Powered by <img src={icon} alt="" style={{ display: "inline-block", height: 11, verticalAlign: "middle", marginLeft: 2 }} />
      </div>
    </div>
  );
}

/** Финал: всё уходит под белый слой, логотип всплывает с лёгким перелётом и бликом, потом слой тает. */
export function LogoFinale({ t, logo, start, duration }: { t: number; logo: string; start: number; duration: number }) {
  const cover = p(t, start, 0.6) * (1 - p(t, duration - 0.55, 0.5));
  if (cover <= 0) return null;
  const pop = clamp01((t - (start + 0.35)) / 0.7);
  // Пружинка: 0.6 → ~1.06 → 1
  const s = pop <= 0 ? 0.6 : 0.6 + 0.4 * ease(pop) + 0.06 * Math.sin(Math.PI * pop) * (1 - pop * 0.3);
  const logoK = clamp01(pop * 2.2) * (1 - p(t, duration - 0.75, 0.4));
  const shine = clamp01((t - (start + 1.25)) / 0.9);
  const LOGO_W = 280;
  const LOGO_H = (LOGO_W * 195) / 881;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        opacity: cover,
        background: "radial-gradient(120% 80% at 50% 45%, #FFFFFF 40%, #EAF4FF 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "absolute", width: 440, height: 440, background: "radial-gradient(closest-side, rgba(0,204,245,0.18), rgba(0,204,245,0))", opacity: logoK }} />
      <div style={{ position: "relative", width: LOGO_W, height: LOGO_H, opacity: logoK, transform: `translateY(${(1 - ease(pop)) * 18}px) scale(${s})` }}>
        <img src={logo} alt="" width={LOGO_W} height={LOGO_H} style={{ display: "block", width: LOGO_W, height: LOGO_H }} />
        {/* Блик проходит только по самому логотипу */}
        {shine > 0 && shine < 1 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              WebkitMaskImage: `url(${logo})`,
              maskImage: `url(${logo})`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              background: `linear-gradient(105deg, transparent ${shine * 140 - 30}%, rgba(255,255,255,0.85) ${shine * 140 - 15}%, transparent ${shine * 140}%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

/** Сцена сбрасывается к началу, пока её закрывает финал, — петля без скачка. */
export const loopTime = (t: number, finaleStart: number) => (t >= finaleStart + 0.6 ? 0 : t);

/**
 * Виджет целиком: шапка с названием версии, лента диалога, поле ввода,
 * слои поверх (уведомления, страницы) и финал с логотипом.
 */
export function WidgetFrame({
  t,
  c,
  version,
  user,
  asset,
  finaleStart,
  duration,
  overlay,
  children,
}: {
  /** Время ролика — для финала */
  t: number;
  /** Время диалога (сбрасывается под финалом) */
  c: number;
  version: string;
  user: UserLine[];
  asset: (path: string) => string;
  finaleStart: number;
  duration: number;
  overlay?: ReactNode;
  children: ReactNode;
}) {
  const icon = asset("/logo-icon.svg");
  return (
    <div style={{ position: "relative", width: WIDGET_W, height: WIDGET_H, background: "#fff", overflow: "hidden", fontFamily: FONT }}>
      <div style={{ height: HEADER_H, display: "flex", alignItems: "center", gap: 10, padding: "0 16px", background: WIDGET_GRADIENT }}>
        <span style={{ width: 36, height: 36, borderRadius: 18, flexShrink: 0, background: "rgba(255,255,255,0.2)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <img src={icon} alt="" style={{ height: 22, width: "auto", filter: "brightness(0) invert(1)" }} />
        </span>
        <div style={{ flex: 1, minWidth: 0, color: "#fff" }}>
          <div style={{ fontSize: 14, fontWeight: 600 }}>ИИ-ассистент</div>
          <div style={{ fontSize: 12, opacity: 0.75, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: "#4ADE80" }} /> Онлайн
          </div>
        </div>
        <span
          style={{
            borderRadius: 999,
            padding: "6px 11px",
            fontSize: 11.5,
            fontWeight: 700,
            color: "#fff",
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.35)",
            whiteSpace: "nowrap",
          }}
        >
          {version}
        </span>
      </div>

      <div style={{ position: "absolute", left: 16, right: 16, top: HEADER_H + 16, bottom: FOOTER_H + 4, overflow: "hidden" }}>
        <Feed viewH={WIDGET_H - HEADER_H - 16 - FOOTER_H - 4}>{children}</Feed>
      </div>

      <Composer t={c} user={user} icon={icon} />
      {overlay}
      <LogoFinale t={t} logo={asset("/logo.svg")} start={finaleStart} duration={duration} />
    </div>
  );
}

export { FeedItem };
