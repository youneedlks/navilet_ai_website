import type { ComponentType, CSSProperties, ImgHTMLAttributes, ReactNode } from "react";
import { Feed, FeedItem } from "./Feed";

/**
 * Сцена «Как это работает» (версия «Лид»): чат ассистента на фирменном градиенте.
 *
 * Чистая функция от времени `t` (секунды, 0…HOW_IT_WORKS_DURATION) — без таймеров,
 * framer-motion и Tailwind. Поэтому одну и ту же сцену проигрывают:
 *   - сайт (ScenePlayer: t идёт от requestAnimationFrame, пауза вне экрана);
 *   - Remotion (video/: t = frame / fps) — для видеофайлов.
 * Рисуется в логическом размере 360×640 (9:16); масштаб задаёт обёртка.
 */

export const HOW_IT_WORKS_DURATION = 25;
export const SCENE_W = 360;
export const SCENE_H = 640;

/** Этапы — для подсветки шагов рядом с роликом. */
export function howItWorksStage(t: number): 0 | 1 | 2 | 3 {
  if (t < 6.8) return 0;
  if (t < 11) return 1;
  if (t < 15) return 2;
  return 3;
}

export const ease = (x: number) => 1 - Math.pow(1 - x, 3);
export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
/** 0 → 1 за `dur` секунд начиная с `start`, с плавным замедлением. */
export const p = (t: number, start: number, dur = 0.35) => ease(clamp01((t - start) / dur));

export const GRADIENT =
  "linear-gradient(160deg, #001229 0%, #002152 32%, #0062EF 74%, #0097F5 100%)";
export const FONT = "var(--font-inter, Inter), 'Inter', system-ui, -apple-system, sans-serif";
export const FONT_DISPLAY = "var(--font-display, Manrope), 'Manrope', system-ui, sans-serif";

const tvPic = (code: number) => `https://static.tourvisor.ru/hotel_pics/main400/${code}.jpg`;

const CARDS = [
  { name: "Barut Hemera", resort: "Сиде", rating: 4.7, price: "142 500 ₽", meal: "Всё включено", img: tvPic(1033) },
  { name: "Voyage Belek", resort: "Белек", rating: 4.6, price: "158 900 ₽", meal: "Ультра всё вкл.", img: tvPic(1582) },
  { name: "Calista Luxury", resort: "Белек", rating: 4.8, price: "186 200 ₽", meal: "Ультра всё вкл.", img: tvPic(1065) },
];

type ImgComp = ComponentType<ImgHTMLAttributes<HTMLImageElement>>;

/** Элемент с заданной высотой: появляется в `start`, раскрывает высоту до `h`. */
export function Item({ t, start, h, children }: { t: number; start: number; h: number; children: ReactNode }) {
  const k = p(t, start, 0.4);
  if (k <= 0) return null;
  return (
    <div style={{ height: h * k, overflow: "hidden", flexShrink: 0 }}>
      <div style={{ opacity: k, transform: `translateY(${(1 - k) * 10}px)`, paddingBottom: 8 }}>{children}</div>
    </div>
  );
}

export const userBubble: CSSProperties = {
  marginLeft: "auto",
  maxWidth: 250,
  background: "#FFFFFF",
  color: "#0B1B33",
  borderRadius: "18px 18px 6px 18px",
  padding: "9px 13px",
  fontSize: 13.5,
  lineHeight: 1.38,
  boxShadow: "0 6px 18px rgba(0,18,41,0.18)",
};

const botBubble: CSSProperties = {
  maxWidth: 270,
  background: "rgba(255,255,255,0.14)",
  border: "1px solid rgba(255,255,255,0.22)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  color: "#FFFFFF",
  borderRadius: "18px 18px 18px 6px",
  padding: "9px 13px",
  fontSize: 13.5,
  lineHeight: 1.38,
};

/** Звёздочка ИИ в аватаре ассистента. */
export function Spark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M12 2.5c.5 4.6 2.9 7 7.5 7.5-4.6.5-7 2.9-7.5 7.5-.5-4.6-2.9-7-7.5-7.5 4.6-.5 7-2.9 7.5-7.5Z" />
      <path d="M18.5 15.5c.2 1.8 1.2 2.8 3 3-1.8.2-2.8 1.2-3 3-.2-1.8-1.2-2.8-3-3 1.8-.2 2.8-1.2 3-3Z" opacity=".75" />
    </svg>
  );
}

function Dots({ t }: { t: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 4, padding: "4px 2px" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            background: "#FFFFFF",
            opacity: 0.35 + 0.65 * Math.abs(Math.sin((t * 4 + i * 0.6) % Math.PI)),
          }}
        />
      ))}
    </span>
  );
}

/** Ответ ассистента: с `typing` до `text` — «печатает…», потом текст. */
export function Bot({ t, typing, text, children }: { t: number; typing: number; text: number; children: ReactNode }) {
  const shown = t >= text;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 7 }}>
      <span
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          flexShrink: 0,
          background: "linear-gradient(135deg,#00CCF5,#0062EF)",
          border: "1.5px solid rgba(255,255,255,0.6)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spark size={12} />
      </span>
      <div style={botBubble}>
        {shown ? <span style={{ opacity: p(t, text, 0.3) }}>{children}</span> : <Dots t={t - typing} />}
      </div>
    </div>
  );
}

function Stars({ n = 5 }: { n?: number }) {
  return <span style={{ color: "#FFB800", fontSize: 9, letterSpacing: 0.5 }}>{"★".repeat(n)}</span>;
}

function TourCard({ t, start, card, Img }: { t: number; start: number; card: (typeof CARDS)[number]; Img: ImgComp }) {
  const k = p(t, start, 0.45);
  return (
    <div
      style={{
        width: 98,
        flexShrink: 0,
        background: "#FFFFFF",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,18,41,0.22)",
        opacity: k,
        transform: `translateY(${(1 - k) * 14}px) scale(${0.96 + 0.04 * k})`,
      }}
    >
      <Img src={card.img} alt="" width={98} height={60} style={{ width: 98, height: 60, objectFit: "cover", display: "block" }} />
      <div style={{ padding: "6px 7px 7px", fontFamily: FONT }}>
        <Stars />
        <div style={{ fontSize: 10.5, fontWeight: 700, color: "#0B1B33", lineHeight: 1.2, marginTop: 1 }}>{card.name}</div>
        <div style={{ fontSize: 9, color: "#64748B", marginTop: 2 }}>
          {card.resort} · {card.rating}
        </div>
        <div style={{ fontSize: 8.5, color: "#64748B" }}>{card.meal}</div>
        <div style={{ fontSize: 11.5, fontWeight: 800, color: "#0062EF", marginTop: 3, fontFamily: FONT_DISPLAY }}>{card.price}</div>
      </div>
    </div>
  );
}

/** Страница-подборка: выезжает снизу на 11.0–14.6 с. */
function CollectionSheet({ t, Img }: { t: number; Img: ImgComp }) {
  const inK = p(t, 11.0, 0.55);
  const outK = p(t, 14.6, 0.45);
  const k = inK * (1 - outK);
  if (k <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 10,
        right: 10,
        bottom: 10,
        height: 470,
        background: "#FFFFFF",
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "0 -10px 40px rgba(0,18,41,0.35)",
        transform: `translateY(${(1 - k) * 500}px)`,
        fontFamily: FONT,
      }}
    >
      <div style={{ background: "linear-gradient(135deg,#0062EF,#00B4F5)", color: "#fff", padding: "16px 16px 14px" }}>
        <div style={{ fontSize: 10, opacity: 0.85 }}>Турагентство «Солнечный берег»</div>
        <div style={{ fontSize: 17, fontWeight: 800, fontFamily: FONT_DISPLAY, marginTop: 2 }}>Подборка туров для вас</div>
        <div style={{ fontSize: 11, opacity: 0.9, marginTop: 2 }}>Турция · июнь · 7 ночей · 2 взрослых · вылет из Москвы</div>
      </div>
      <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 10 }}>
        {CARDS.map((c, i) => {
          const r = p(t, 11.35 + i * 0.18, 0.4);
          return (
            <div
              key={c.name}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                border: "1px solid #E2E8F0",
                borderRadius: 14,
                padding: 8,
                opacity: r,
                transform: `translateX(${(1 - r) * 16}px)`,
              }}
            >
              <Img src={c.img} alt="" width={78} height={60} style={{ width: 78, height: 60, objectFit: "cover", borderRadius: 10, display: "block" }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <Stars />
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0B1B33" }}>{c.name}</div>
                <div style={{ fontSize: 10.5, color: "#64748B" }}>
                  {c.resort} · {c.meal}
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#0062EF", fontFamily: FONT_DISPLAY }}>{c.price}</div>
              </div>
            </div>
          );
        })}
        <div
          style={{
            marginTop: 4,
            textAlign: "center",
            background: "#0062EF",
            color: "#fff",
            borderRadius: 12,
            padding: "11px 0",
            fontSize: 13.5,
            fontWeight: 700,
          }}
        >
          Забронировать
        </div>
        <div style={{ textAlign: "center", fontSize: 10, color: "#94A3B8" }}>Цены обновлены сегодня · Перелёт включён</div>
      </div>
    </div>
  );
}

/** Уведомление менеджеру в Telegram: 20.0–23.3 с. */
function TelegramToast({ t }: { t: number }) {
  const inK = p(t, 20.0, 0.5);
  const outK = p(t, 23.3, 0.35);
  const k = inK * (1 - outK);
  if (k <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 12,
        right: 12,
        top: 12,
        background: "rgba(255,255,255,0.97)",
        borderRadius: 18,
        padding: "12px 13px",
        boxShadow: "0 16px 40px rgba(0,18,41,0.4)",
        transform: `translateY(${(k - 1) * 140}px)`,
        opacity: k,
        fontFamily: FONT,
        color: "#0B1B33",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            background: "#2AABEE",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff" aria-hidden>
            <path d="M21.5 4.2 18.4 19c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.2 12.8l-4.7-1.5c-1-.3-1-1 .2-1.5L20 3c.9-.3 1.7.2 1.5 1.2Z" />
          </svg>
        </span>
        <div style={{ fontSize: 11, color: "#64748B" }}>Telegram · Менеджеры «Солнечный берег» · сейчас</div>
      </div>
      <div style={{ fontSize: 14, fontWeight: 800, marginTop: 7, fontFamily: FONT_DISPLAY }}>Новая заявка · сайт</div>
      <div style={{ fontSize: 12.5, marginTop: 3 }}>Анна · +7 900 000-00-00</div>
      <div style={{ fontSize: 12, color: "#475569", marginTop: 3, lineHeight: 1.35 }}>
        Турция, июнь, 7 ночей, 2 взрослых, из Москвы · Barut Hemera, 142{" "}500{" "}₽
      </div>
      <div
        style={{
          marginTop: 9,
          display: "inline-block",
          background: "#E8F1FF",
          color: "#0062EF",
          borderRadius: 10,
          padding: "6px 11px",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        Открыть диалог
      </div>
    </div>
  );
}

/** Финальная плашка: 23.4–25 с, затем петля. */
function Finale({ t }: { t: number }) {
  const k = p(t, 23.4, 0.5) * (1 - p(t, 24.6, 0.4));
  if (k <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: GRADIENT,
        opacity: k,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        padding: 28,
      }}
    >
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 30, letterSpacing: -0.5 }}>
        Навылет!{" "}
        <span style={{ background: "#fff", color: "#0062EF", borderRadius: 8, padding: "0 7px" }}>AI</span>
      </div>
      <div style={{ fontFamily: FONT, fontSize: 15, opacity: 0.9, marginTop: 14, lineHeight: 1.4 }}>
        От вопроса туриста —<br />
        до готовой заявки менеджеру
      </div>
    </div>
  );
}

export default function HowItWorksScene({
  t,
  Img = "img" as unknown as ImgComp,
}: {
  t: number;
  /** В Remotion — <Img>, чтобы кадр ждал загрузки фото. */
  Img?: ImgComp;
}) {
  const tap = clamp01((t - 10.55) / 0.35);
  return (
    <div
      style={{
        position: "relative",
        width: SCENE_W,
        height: SCENE_H,
        background: GRADIENT,
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      {/* Мягкие световые пятна фона */}
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: 150, right: -120, top: -80, background: "rgba(0,204,245,0.25)", filter: "blur(60px)" }} />
      <div style={{ position: "absolute", width: 260, height: 260, borderRadius: 130, left: -110, bottom: 40, background: "rgba(0,98,239,0.35)", filter: "blur(60px)" }} />

      {/* Шапка виджета агентства */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, padding: "18px 16px 12px", color: "#fff" }}>
        <span style={{ width: 36, height: 36, borderRadius: 18, background: "linear-gradient(135deg,#00CCF5,#0062EF)", border: "2px solid rgba(255,255,255,0.7)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <Spark size={17} />
        </span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, fontFamily: FONT_DISPLAY }}>Солнечный берег</div>
          <div style={{ fontSize: 11, opacity: 0.8, display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: "#4ADE80" }} /> ИИ-ассистент · онлайн 24/7
          </div>
        </div>
      </div>

      {/* Лента диалога: растёт сверху вниз, когда не помещается — плавно уезжает вверх */}
      <div style={{ position: "absolute", left: 14, right: 14, top: 74, bottom: 16, overflow: "hidden" }}>
        <Feed viewH={SCENE_H - 74 - 16}>
        <FeedItem t={t} start={-1}>
          <Bot t={t} typing={-1} text={-1}>
            Здравствуйте! Я ассистент агентства «Солнечный берег». Напишите, куда и когда хотите поехать, — подберу туры.
          </Bot>
        </FeedItem>
        <FeedItem t={t} start={0.5}>
          <div style={userBubble}>Турция в июне на двоих, всё включено, до 200 тысяч</div>
        </FeedItem>
        <FeedItem t={t} start={1.5}>
          <Bot t={t} typing={1.5} text={2.6}>Подскажите, из какого города вылет и на сколько ночей?</Bot>
        </FeedItem>
        <FeedItem t={t} start={4.0}>
          <div style={userBubble}>Из Москвы, на 7 ночей</div>
        </FeedItem>
        <FeedItem t={t} start={4.8}>
          <Bot t={t} typing={4.8} text={5.8}>Ищу по всем туроператорам…</Bot>
        </FeedItem>
        <FeedItem t={t} start={7.0}>
          <div style={{ display: "flex", gap: 7, paddingLeft: 24 }}>
            {CARDS.map((c, i) => (
              <TourCard key={c.name} t={t} start={7.0 + i * 0.18} card={c} Img={Img} />
            ))}
          </div>
        </FeedItem>
        <FeedItem t={t} start={8.6}>
          <Bot t={t} typing={8.6} text={9.1}>
            Нашёл варианты с перелётом из Москвы — собрал их в подборку
            <div
              style={{
                marginTop: 9,
                display: "inline-block",
                background: "#FFFFFF",
                color: "#0062EF",
                borderRadius: 12,
                padding: "7px 13px",
                fontWeight: 700,
                fontSize: 13,
                transform: `scale(${1 - 0.06 * Math.sin(Math.PI * tap)})`,
                boxShadow: tap > 0 && tap < 1 ? "0 0 0 6px rgba(255,255,255,0.25)" : "none",
              }}
            >
              Смотреть подборку
            </div>
          </Bot>
        </FeedItem>
        <FeedItem t={t} start={15.2}>
          <div style={userBubble}>Берём Barut Hemera!</div>
        </FeedItem>
        <FeedItem t={t} start={16.0}>
          <Bot t={t} typing={16.0} text={16.9}>Отличный выбор! Оставьте телефон — менеджер забронирует тур.</Bot>
        </FeedItem>
        <FeedItem t={t} start={18.0}>
          <div style={userBubble}>Анна, +7 900 000-00-00</div>
        </FeedItem>
        <FeedItem t={t} start={18.7}>
          <Bot t={t} typing={18.7} text={19.3}>Спасибо, Анна! Заявка уже у менеджера.</Bot>
        </FeedItem>
        </Feed>
      </div>

      <CollectionSheet t={t} Img={Img} />
      <TelegramToast t={t} />
      <Finale t={t} />
    </div>
  );
}
