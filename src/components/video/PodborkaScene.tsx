import type { CSSProperties, ReactNode } from "react";
import { BLUE, BotItem, CARDS, Cards, GREY, INK, LogoFinale, UserItem, WidgetFrame, WIDGET_H, WIDGET_W, defaultAsset, defaultImg, press, type ImgComp, type SceneProps, type UserLine } from "./widgetKit";
import { FONT, FONT_DISPLAY, clamp01, ease, p } from "./HowItWorksScene";

/**
 * Подборка по ссылке (/podborki): ассистент показывает туры → «Поделиться» →
 * ссылка в семейном чате → страница подборки под брендом агентства (отель,
 * перелёт) → «Забронировать» → агентство видит в кабинете, что подборку открыли.
 */

export const PODBORKA_DURATION = 29.8;
const FINALE = 25.8;
/** Смена экранов: чат с ассистентом → семейный чат → страница подборки. */
const TO_FAMILY = 8.0;
const TO_PAGE = 12.4;

export function podborkaStage(t: number): number {
  if (t < 6.2) return 0;
  if (t < TO_FAMILY + 0.4) return 1;
  return 2;
}

const USER: UserLine[] = [{ text: "Турция в июне, на двоих", type: 0.3, send: 1.2 }];

/** Экран въезжает справа с `at`, предыдущий чуть уезжает влево. */
function Screen({ t, at, leave, children }: { t: number; at?: number; leave?: number; children: ReactNode }) {
  const inK = at === undefined ? 1 : ease(clamp01((t - at) / 0.55));
  const outK = leave === undefined ? 0 : ease(clamp01((t - leave) / 0.55));
  if (inK <= 0) return null;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#fff",
        transform: `translateX(${(1 - inK) * 100 - outK * 28}%)`,
        boxShadow: inK < 1 ? "-12px 0 30px rgba(0,0,0,0.12)" : "none",
        filter: outK > 0 ? `brightness(${1 - outK * 0.12})` : undefined,
      }}
    >
      {children}
    </div>
  );
}

/* ── Семейный чат ─────────────────────────────────────────────── */

function FamilyChat({ t, Img }: { t: number; Img: ImgComp }) {
  const OPEN = TO_PAGE - 0.5;
  const msg = (start: number, mine: boolean, who: string, body: ReactNode) => {
    const k = p(t, start, 0.35);
    if (k <= 0) return null;
    return (
      <div style={{ display: "flex", justifyContent: mine ? "flex-end" : "flex-start", opacity: k, transform: `translateY(${(1 - k) * 8}px)` }}>
        <div
          style={{
            maxWidth: 286,
            borderRadius: 14,
            borderBottomRightRadius: mine ? 4 : 14,
            borderBottomLeftRadius: mine ? 14 : 4,
            background: mine ? "#DCEBFF" : "#fff",
            padding: "7px 10px 8px",
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
            fontSize: 13,
            lineHeight: 1.45,
            color: INK,
          }}
        >
          {!mine && <div style={{ fontSize: 11.5, fontWeight: 700, color: "#E67E22", marginBottom: 2 }}>{who}</div>}
          {body}
        </div>
      </div>
    );
  };
  const linkPress = press(t, OPEN);
  return (
    <div style={{ position: "absolute", inset: 0, background: "#EEF2F7", fontFamily: FONT }}>
      <div style={{ height: 60, background: "#fff", borderBottom: "1px solid #E3E8EF", display: "flex", alignItems: "center", gap: 10, padding: "0 14px" }}>
        <span style={{ fontSize: 20, color: BLUE }}>‹</span>
        <span style={{ width: 36, height: 36, borderRadius: 18, background: "linear-gradient(135deg,#7DD3FC,#38BDF8)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}>🌴</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: INK }}>Семья</div>
          <div style={{ fontSize: 11.5, color: GREY }}>Анна, Сергей, мама</div>
        </div>
      </div>
      <div style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        {msg(
          TO_FAMILY + 0.6,
          true,
          "",
          <>
            Смотрите, что подобрали на июнь 🌴
            <div
              style={{
                marginTop: 7,
                borderRadius: 10,
                overflow: "hidden",
                background: "#fff",
                border: "1px solid rgba(0,98,239,0.15)",
                transform: `scale(${1 - 0.04 * linkPress})`,
                boxShadow: linkPress > 0 ? "0 0 0 4px rgba(0,98,239,0.18)" : "none",
              }}
            >
              <Img src={CARDS[0].img} alt="" width={266} height={92} style={{ width: "100%", height: 92, objectFit: "cover", display: "block" }} />
              <div style={{ padding: "7px 9px 8px" }}>
                <div style={{ fontSize: 10.5, color: GREY }}>Солнечный берег</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Подборка туров — Турция</div>
                <div style={{ fontSize: 11, color: BLUE, marginTop: 1 }}>lk.navilet.ru/share/…</div>
              </div>
            </div>
          </>,
        )}
        {msg(TO_FAMILY + 2.0, false, "Мама", "Первый отель — красота! Море рядом 😍")}
        {msg(TO_FAMILY + 3.0, false, "Сергей", "Открыл, посмотрю перелёт")}
      </div>
    </div>
  );
}

/* ── Страница подборки ───────────────────────────────────────── */

const TAB_FLIGHT = 16.6;
const BOOK = 19.6;

function CollectionWebPage({ t, Img }: { t: number; Img: ImgComp }) {
  const scroll = 168 * p(t, 15.2, 0.9);
  const flight = t >= TAB_FLIGHT + 0.15;
  const sheet = p(t, BOOK + 0.35, 0.45);
  const tab = (on: boolean): CSSProperties => ({
    flex: 1,
    height: 32,
    borderRadius: 7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    color: on ? BLUE : GREY,
    background: on ? "rgba(0,98,239,0.1)" : "transparent",
  });
  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff", fontFamily: FONT, overflow: "hidden" }}>
      {/* Адресная строка */}
      <div style={{ height: 46, background: "#F1F4F8", display: "flex", alignItems: "center", padding: "0 12px", borderBottom: "1px solid #E3E8EF", position: "relative", zIndex: 2 }}>
        <div style={{ flex: 1, height: 30, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", gap: 6, padding: "0 10px", fontSize: 12, color: "#475569" }}>
          <span style={{ fontSize: 10 }}>🔒</span> lk.navilet.ru/share/turciya-iyun
        </div>
      </div>

      <div style={{ transform: `translateY(${-scroll}px)` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "linear-gradient(90deg, #EEF6FF, #fff)", borderBottom: "1px solid #E8EEF6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <span style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#FFB547,#FF7A45)", color: "#fff", fontWeight: 800, fontSize: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_DISPLAY }}>
              СБ
            </span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Солнечный берег</div>
              <div style={{ fontSize: 10.5, color: "#95A5A6" }}>+7 495 000-00-00</div>
            </div>
          </div>
          <span style={{ borderRadius: 999, padding: "4px 8px", fontSize: 9.5, fontWeight: 700, color: BLUE, background: "rgba(0,98,239,0.08)", textTransform: "uppercase", letterSpacing: 0.4 }}>Страница клиента</span>
        </div>

        <div style={{ padding: "13px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: INK, fontFamily: FONT_DISPLAY }}>Подборка туров — Турция</div>
            <div style={{ fontSize: 11, color: GREY, marginTop: 2 }}>3 варианта · цены проверены в 12:40</div>
          </div>
          <span style={{ borderRadius: 8, border: "1px solid #D6E4F5", padding: "5px 8px", fontSize: 10.5, fontWeight: 700, color: BLUE, whiteSpace: "nowrap" }}>↻ Обновить цены</span>
        </div>

        <div style={{ padding: "11px 16px 0", display: "flex", flexDirection: "column", gap: 8 }}>
          {CARDS.map((card, i) => (
            <div
              key={card.name}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                borderRadius: 12,
                padding: 8,
                border: `1px solid ${i === 0 ? "rgba(0,98,239,0.3)" : "#E3E8EF"}`,
                background: i === 0 ? "rgba(0,98,239,0.04)" : "#fff",
              }}
            >
              <Img src={card.img} alt="" width={78} height={56} style={{ width: 78, height: 56, objectFit: "cover", borderRadius: 8, display: "block", flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK, whiteSpace: "nowrap" }}>
                  {card.name} <span style={{ color: "#F59E0B", fontSize: 10.5 }}>★★★★★</span>
                </div>
                <div style={{ fontSize: 10.5, color: GREY }}>📍 {card.resort}, Турция · {card.dates.replace(" — ", "–")} · 7 ночей</div>
                <div style={{ fontSize: 13.5, fontWeight: 800, color: BLUE, fontFamily: FONT_DISPLAY, marginTop: 1 }}>
                  {card.price} <span style={{ fontSize: 10.5, fontWeight: 500, color: GREY, fontFamily: FONT }}>за тур</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Панель отеля: вкладки «Отель» и «Перелёт», как на реальной странице */}
        <div style={{ margin: "12px 16px 0", borderRadius: 12, border: "1px solid #E3E8EF", background: "#F7F9FC", padding: 10 }}>
          <div style={{ display: "flex", gap: 4, background: "#fff", borderRadius: 9, padding: 3 }}>
            <span style={tab(!flight)}>🛏 Отель</span>
            <span style={{ ...tab(flight), transform: `scale(${1 - 0.06 * press(t, TAB_FLIGHT)})` }}>✈ Перелёт</span>
          </div>
          {!flight ? (
            <div style={{ marginTop: 9 }}>
              <div style={{ fontSize: 11.5, lineHeight: 1.5, color: "#475569" }}>
                Первая линия в Сиде: три бассейна, детский клуб, песчаный пляж в 50 м от корпусов.
              </div>
              <div style={{ marginTop: 7, display: "flex", flexWrap: "wrap", gap: 5 }}>
                {["1-я линия, песок", "Всё включено", "Семейные номера"].map((s) => (
                  <span key={s} style={{ borderRadius: 999, border: "1px solid #D6E4F5", background: "#fff", padding: "3px 8px", fontSize: 10.5, color: "#475569" }}>
                    {s}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: 8, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 5 }}>
                {[CARDS[0].img, CARDS[1].img, CARDS[2].img].map((src, i) => (
                  <Img key={i} src={src} alt="" width={110} height={52} style={{ width: "100%", height: 52, objectFit: "cover", borderRadius: 6, display: "block" }} />
                ))}
              </div>
            </div>
          ) : (
            <div style={{ marginTop: 9, display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                ["Туда · 3 июня", "Москва, Шереметьево 09:40 → Анталья 13:55", "Прямой · 4 ч 15 мин"],
                ["Обратно · 10 июня", "Анталья 15:10 → Москва, Шереметьево 19:20", "Прямой · 4 ч 10 мин"],
              ].map(([d, r, n]) => (
                <div key={d} style={{ borderRadius: 8, border: "1px solid #E3E8EF", background: "#fff", padding: "6px 9px" }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: 0.4 }}>{d}</div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: INK, marginTop: 1 }}>{r}</div>
                  <div style={{ fontSize: 10.5, color: GREY }}>{n}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Нижняя панель с кнопкой — всегда на виду */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", gap: 10, padding: "11px 16px 14px", background: "#fff", borderTop: "1px solid #E3E8EF" }}>
        <span
          style={{
            borderRadius: 10,
            padding: "10px 16px",
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
            background: BLUE,
            whiteSpace: "nowrap",
            transform: `scale(${1 - 0.06 * press(t, BOOK)})`,
            boxShadow: press(t, BOOK) > 0 ? "0 0 0 5px rgba(0,98,239,0.2)" : "none",
          }}
        >
          Забронировать
        </span>
        <span style={{ fontSize: 10.5, lineHeight: 1.4, color: GREY }}>Заявка уходит менеджеру агентства — без сторонних сайтов</span>
      </div>

      {/* Подтверждение */}
      {sheet > 0 && (
        <div style={{ position: "absolute", inset: 0, background: `rgba(15,23,42,${0.35 * sheet})`, display: "flex", alignItems: "flex-end" }}>
          <div style={{ width: "100%", background: "#fff", borderRadius: "18px 18px 0 0", padding: "20px 20px 26px", transform: `translateY(${(1 - sheet) * 100}%)`, textAlign: "center" }}>
            <div style={{ width: 46, height: 46, borderRadius: 23, margin: "0 auto", background: "rgba(39,174,96,0.12)", color: "#27AE60", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>✓</div>
            <div style={{ marginTop: 10, fontSize: 16, fontWeight: 800, color: INK, fontFamily: FONT_DISPLAY }}>Заявка отправлена</div>
            <div style={{ marginTop: 4, fontSize: 12.5, lineHeight: 1.5, color: GREY }}>
              Barut Hemera, 03.06–10.06, рейс 09:40.
              <br />
              Менеджер «Солнечного берега» скоро свяжется с вами.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Что видит агентство: подборку открыли, заявка из подборки. */
function CabinetNote({ t }: { t: number }) {
  const k = p(t, 22.2, 0.5) * (1 - p(t, 25.2, 0.35));
  if (k <= 0) return null;
  const row = (label: string, value: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "5px 0", borderTop: "1px solid #EEF2F7" }}>
      <span style={{ color: GREY }}>{label}</span>
      <span style={{ fontWeight: 700, color: INK }}>{value}</span>
    </div>
  );
  return (
    <div style={{ position: "absolute", inset: 0, background: `rgba(15,23,42,${0.4 * k})`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 }}>
      <div style={{ width: 330, background: "#fff", borderRadius: 16, padding: "14px 16px 10px", boxShadow: "0 24px 60px rgba(0,34,82,0.35)", opacity: k, transform: `translateY(${(1 - k) * 30}px) scale(${0.96 + 0.04 * k})`, fontFamily: FONT }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: BLUE, textTransform: "uppercase", letterSpacing: 0.5 }}>Кабинет агентства · Подборки</div>
        <div style={{ marginTop: 4, fontSize: 15, fontWeight: 800, color: INK, fontFamily: FONT_DISPLAY }}>Подборка туров — Турция</div>
        <div style={{ marginTop: 8 }}>
          {row("Открыли", "3 раза")}
          {row("Дольше всего смотрели", "Barut Hemera")}
          {row("Заявка из подборки", "✓ у менеджера")}
        </div>
        <div style={{ marginTop: 6, fontSize: 10, color: "#95A5A6" }}>пример данных</div>
      </div>
    </div>
  );
}

export default function PodborkaScene({ t, Img = defaultImg, asset = defaultAsset }: SceneProps) {
  const c = t >= FINALE + 0.6 ? 0 : t;
  return (
    <div style={{ position: "relative", width: WIDGET_W, height: WIDGET_H, overflow: "hidden", background: "#fff" }}>
      <Screen t={c} leave={TO_FAMILY}>
        <WidgetFrame t={c} c={c} version="«Лид» и «Про»" user={USER} asset={asset} finaleStart={999} duration={999}>
          <UserItem t={c} line={USER[0]} />
          <BotItem t={c} typing={1.8} text={2.7} extra={<Cards t={c} start={2.9} Img={Img} shareAt={7.0} />}>
            Нашёл варианты с перелётом из Москвы:
          </BotItem>
        </WidgetFrame>
      </Screen>
      <Screen t={c} at={TO_FAMILY} leave={TO_PAGE}>
        <FamilyChat t={c} Img={Img} />
      </Screen>
      <Screen t={c} at={TO_PAGE}>
        <CollectionWebPage t={c} Img={Img} />
      </Screen>
      <CabinetNote t={c} />
      <LogoFinale t={t} logo={asset("/logo.svg")} start={FINALE} duration={PODBORKA_DURATION} />
    </div>
  );
}
