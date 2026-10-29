import { BLUE, BotItem, CARDS, Cards, Chips, DoneNote, FeedItem, GREY, INK, ManagerToast, UserItem, WidgetFrame, defaultAsset, defaultImg, loopTime, press, type ImgComp, type SceneProps, type UserLine } from "./widgetKit";
import { FONT_DISPLAY, p } from "./HowItWorksScene";

/**
 * Версия «Лид» (/versii): телефон — в начале диалога, затем подбор туров,
 * страница-подборка с бронированием в один клик и заявка менеджеру.
 */

export const LID_DURATION = 36.2;
const FINALE = 32.2;

export function lidStage(t: number): number {
  if (t < 9.5) return 0;
  if (t < 15.9) return 1;
  if (t < 23.4) return 2;
  return 3;
}

const USER: UserLine[] = [
  { text: "Хотим в Турцию в начале июня на неделю, вдвоём", type: 0.4, send: 1.7 },
  { text: "+7 900 000-00-00", type: 5.0, send: 5.8 },
  { text: "Из Москвы, всё включено", type: 8.4, send: 9.2 },
];

/** Страница-подборка поверх чата (у клиента открывается отдельной вкладкой по ссылке). */
function CollectionPage({ t, Img }: { t: number; Img: ImgComp }) {
  const IN = 16.0;
  const BOOK = 19.9;
  const BACK = 22.4;
  const k = p(t, IN, 0.45) * (1 - p(t, BACK + 0.3, 0.4));
  if (k <= 0) return null;
  const booked = t >= BOOK + 0.2;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        opacity: k,
        transform: `translateY(${(1 - k) * 24}px)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderBottom: "1px solid rgba(224,224,224,0.6)", background: "#F8F9FA" }}>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: BLUE,
            borderRadius: 8,
            padding: "5px 8px",
            background: press(t, BACK) > 0 ? "rgba(0,98,239,0.1)" : "transparent",
          }}
        >
          ← Вернуться в диалог
        </span>
        <span style={{ borderRadius: 999, padding: "4px 8px", fontSize: 10, fontWeight: 700, color: BLUE, background: "rgba(0,98,239,0.08)", textTransform: "uppercase", letterSpacing: 0.4 }}>
          Страница для клиента
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px 10px" }}>
        <span style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#FFB547,#FF7A45)", color: "#fff", fontWeight: 800, fontSize: 13, display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_DISPLAY }}>
          СБ
        </span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: INK }}>Солнечный берег</div>
          <div style={{ fontSize: 10.5, color: "#95A5A6" }}>ваш логотип, цвет и контакты</div>
        </div>
      </div>
      <div style={{ padding: "0 16px" }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: INK, fontFamily: FONT_DISPLAY }}>Подборка туров — Турция</div>
        <div style={{ fontSize: 11.5, color: GREY, marginTop: 2 }}>3 варианта · цены актуальны · ссылка живёт 7 дней</div>
      </div>
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 9 }}>
        {CARDS.map((card, i) => {
          const r = p(t, IN + 0.3 + i * 0.15, 0.4);
          const isFirst = i === 0;
          return (
            <div
              key={card.name}
              style={{
                display: "flex",
                gap: 10,
                borderRadius: 12,
                border: `1px solid ${isFirst && t >= BOOK - 0.6 ? "rgba(0,98,239,0.35)" : "rgba(224,224,224,0.8)"}`,
                background: isFirst && t >= BOOK - 0.6 ? "rgba(0,98,239,0.03)" : "#fff",
                padding: 9,
                opacity: r,
                transform: `translateX(${(1 - r) * 14}px)`,
              }}
            >
              <Img src={card.img} alt="" width={70} height={70} style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 9, display: "block", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {card.name} <span style={{ color: "#F39C12", fontSize: 11 }}>★5</span>
                </div>
                <div style={{ fontSize: 10.5, color: GREY, marginTop: 1 }}>
                  {card.resort}, Турция · {card.dates.replace(" — ", "–")} · 7 ноч.
                </div>
                <div style={{ marginTop: 5, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                  <span style={{ fontSize: 14.5, fontWeight: 800, color: BLUE, fontFamily: FONT_DISPLAY, whiteSpace: "nowrap" }}>{card.price}</span>
                  {isFirst && booked ? (
                    <span style={{ borderRadius: 7, padding: "5px 8px", fontSize: 10.5, fontWeight: 700, color: "#27AE60", background: "rgba(39,174,96,0.12)", whiteSpace: "nowrap" }}>
                      ✓ Заявка у менеджера
                    </span>
                  ) : (
                    <span
                      style={{
                        borderRadius: 7,
                        padding: "5px 9px",
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: "#fff",
                        background: BLUE,
                        whiteSpace: "nowrap",
                        transform: isFirst ? `scale(${1 - 0.08 * press(t, BOOK)})` : undefined,
                        boxShadow: isFirst && press(t, BOOK) > 0 ? "0 0 0 5px rgba(0,98,239,0.2)" : "none",
                      }}
                    >
                      Забронировать
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ margin: "2px 16px 0", borderRadius: 12, background: "#F5F9FF", border: "1px dashed rgba(0,98,239,0.25)", padding: "10px 12px", fontSize: 11.5, lineHeight: 1.5, color: GREY }}>
        <b style={{ color: INK }}>🔗 Ссылку можно переслать близким.</b> Страница живёт 7 дней, а вы в кабинете видите, сколько раз её открыли.
      </div>
      <div style={{ marginTop: "auto", display: "flex", gap: 8, alignItems: "flex-start", padding: "11px 16px", borderTop: "1px solid rgba(224,224,224,0.6)", background: "#F8F9FA" }}>
        <span style={{ color: "#27AE60", fontSize: 13, lineHeight: 1.2 }}>🛡</span>
        <span style={{ fontSize: 11, lineHeight: 1.45, color: GREY }}>
          Клиент бронирует прямо здесь — заявка с выбранным вариантом уходит менеджеру. Никаких ссылок на сторонние сайты.
        </span>
      </div>
    </div>
  );
}

export default function LidScene({ t, Img = defaultImg, asset = defaultAsset }: SceneProps) {
  const c = loopTime(t, FINALE);
  return (
    <WidgetFrame
      t={t}
      c={c}
      version="Версия «Лид»"
      user={USER}
      asset={asset}
      finaleStart={FINALE}
      duration={LID_DURATION}
      overlay={
        <>
          <CollectionPage t={c} Img={Img} />
          <ManagerToast
            t={c}
            start={26.6}
            end={31.4}
            title="Новая заявка · сайт"
            lines={["+7 900 000-00-00 · выбрал тур из подборки", "Barut Hemera 5★, Сиде · 03.06–10.06 · 142 500 ₽ · 2 взрослых, из Москвы"]}
          />
        </>
      }
    >
      <UserItem t={c} line={USER[0]} />
      <BotItem t={c} typing={2.1} text={2.9}>
        С радостью подберу! Оставьте, пожалуйста, номер телефона — менеджер сможет связаться, если понадобится.
      </BotItem>
      <UserItem t={c} line={USER[1]} />
      <BotItem t={c} typing={6.2} text={6.9}>Спасибо! Из какого города вылет и какое питание предпочитаете?</BotItem>
      <UserItem t={c} line={USER[2]} />
      <BotItem
        t={c}
        typing={9.6}
        text={11.0}
        extra={
          <>
            <Cards t={c} start={11.2} Img={Img} openAt={15.6} />
            <Chips t={c} show={12.2} items={["Показать ещё", "Передать менеджеру"]} />
          </>
        }
      >
        Нашёл варианты с перелётом из Москвы — смотрите подборку:
      </BotItem>
      <BotItem t={c} typing={23.4} text={24.1}>
        Передал менеджеру выбранный тур Barut Hemera вместе с вашими параметрами. Он свяжется с вами — обычно в течение 15 минут.
      </BotItem>
      <FeedItem t={c} start={24.9} gap={4}>
        <DoneNote t={c} start={24.9} title="Заявка с туром у менеджера" text="Почта, U‑ON, Telegram или MAX — куда настроите" />
      </FeedItem>
    </WidgetFrame>
  );
}
