import { Bot, FONT, FONT_DISPLAY, GRADIENT, Item, p, userBubble } from "./HowItWorksScene";

/**
 * Петля «Заявки» (8 с, 360×320): запрос туриста → сводка запроса → «Заявка передана менеджеру».
 * Чистая функция от t — как HowItWorksScene.
 */
export const ZAYAVKA_DURATION = 8;
export const ZAYAVKA_W = 360;
export const ZAYAVKA_H = 320;

const CHIPS = ["Турция", "10 мая", "7 ночей", "из Москвы", "2 взрослых", "до 200 000 ₽"];

export default function ZayavkaScene({ t }: { t: number }) {
  const fade = 1 - p(t, 7.45, 0.45);
  const done = p(t, 4.6, 0.4);
  return (
    <div style={{ position: "relative", width: ZAYAVKA_W, height: ZAYAVKA_H, background: GRADIENT, overflow: "hidden", fontFamily: FONT }}>
      <div style={{ position: "absolute", width: 220, height: 220, borderRadius: 110, right: -90, top: -90, background: "rgba(0,204,245,0.25)", filter: "blur(50px)" }} />
      <div style={{ position: "absolute", inset: 0, padding: "14px 14px 0", display: "flex", flexDirection: "column", opacity: fade }}>
        <Item t={t} start={0.3} h={62}>
          <div style={{ ...userBubble, maxWidth: 260 }}>Хотим в Турцию 10 мая, на 7 ночей, вдвоём</div>
        </Item>
        <Item t={t} start={1.2} h={150}>
          <Bot t={t} typing={1.2} text={2.0}>
            Все данные по вашему запросу собрал:
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 7 }}>
              {CHIPS.map((c, i) => {
                const k = p(t, 2.2 + i * 0.16, 0.3);
                return (
                  <span
                    key={c}
                    style={{
                      background: "rgba(255,255,255,0.92)",
                      color: "#0B1B33",
                      borderRadius: 999,
                      padding: "3px 9px",
                      fontSize: 11.5,
                      fontWeight: 600,
                      opacity: k,
                      transform: `scale(${0.85 + 0.15 * k})`,
                    }}
                  >
                    {c}
                  </span>
                );
              })}
            </div>
          </Bot>
        </Item>
      </div>
      {/* Плашка «Заявка передана менеджеру» */}
      <div
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          bottom: 14,
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "#FFFFFF",
          borderRadius: 14,
          padding: "10px 12px",
          boxShadow: "0 10px 26px rgba(0,18,41,0.3)",
          opacity: done * fade,
          transform: `translateY(${(1 - done) * 18}px)`,
        }}
      >
        <span style={{ width: 26, height: 26, borderRadius: 13, background: "#16A34A", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800 }}>✓</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#0B1B33", fontFamily: FONT_DISPLAY }}>Заявка передана менеджеру</div>
          <div style={{ fontSize: 11, color: "#64748B" }}>Сводка запроса и телефон — на почту, в U‑ON, Telegram или MAX</div>
        </div>
      </div>
    </div>
  );
}
