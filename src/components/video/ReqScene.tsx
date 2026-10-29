import type { CSSProperties } from "react";
import { BLUE, BotItem, DoneNote, FeedItem, GREY, ManagerToast, UserItem, WidgetFrame, defaultAsset, loopTime, type SceneProps, type UserLine } from "./widgetKit";
import { p } from "./HowItWorksScene";

/**
 * Версия «Заявка» (/versii): ассистент туры не подбирает и цены не называет —
 * уточняет запрос, собирает сводку и контакт и передаёт заявку менеджеру.
 * Реплики — из демо «Заявки» в кабинете.
 */

export const REQ_DURATION = 27.4;
const FINALE = 23.4;

export function reqStage(t: number): number {
  if (t < 9.5) return 0;
  if (t < 13.6) return 1;
  if (t < 17.8) return 2;
  return 3;
}

const USER: UserLine[] = [
  { text: "Здравствуйте! Хотим в Турцию в июне", type: 0.4, send: 1.5 },
  { text: "С 10 июня, на 7 ночей. Нас двое", type: 4.1, send: 5.2 },
  { text: "Из Москвы, до 200 тысяч. Хотелось бы поближе к морю", type: 7.7, send: 9.1 },
  { text: "Анна, +7 900 000-00-00", type: 13.6, send: 14.6 },
];

const SUMMARY = ["Турция", "с 10 июня", "7 ночей", "2 взрослых", "из Москвы", "до 200 000 ₽", "поближе к морю"];

/** Карточка «Запрос клиента»: параметры появляются по одному. */
function RequestCard({ t, start }: { t: number; start: number }) {
  const k = p(t, start, 0.4);
  const chip: CSSProperties = {
    borderRadius: 999,
    padding: "3px 9px",
    fontSize: 11,
    fontWeight: 600,
    color: BLUE,
    background: "rgba(0,98,239,0.08)",
    whiteSpace: "nowrap",
  };
  return (
    <div
      style={{
        marginTop: 8,
        width: 262,
        borderRadius: 12,
        border: "1px solid rgba(0,98,239,0.18)",
        background: "#fff",
        padding: "10px 11px 11px",
        opacity: k,
        transform: `translateY(${(1 - k) * 8}px)`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: 10.5, fontWeight: 700, color: GREY, textTransform: "uppercase", letterSpacing: 0.4 }}>Запрос клиента</div>
      <div style={{ marginTop: 7, display: "flex", flexWrap: "wrap", gap: 5 }}>
        {SUMMARY.map((s, i) => {
          const r = p(t, start + 0.25 + i * 0.12, 0.3);
          return (
            <span key={s} style={{ ...chip, opacity: r, transform: `scale(${0.85 + 0.15 * r})` }}>
              {s}
            </span>
          );
        })}
      </div>
      <div style={{ marginTop: 8, fontSize: 10.5, color: GREY }}>Туры и цены подберёт ваш менеджер</div>
    </div>
  );
}

export default function ReqScene({ t, asset = defaultAsset }: SceneProps) {
  const c = loopTime(t, FINALE);
  return (
    <WidgetFrame
      t={t}
      c={c}
      version="Версия «Заявка»"
      user={USER}
      asset={asset}
      finaleStart={FINALE}
      duration={REQ_DURATION}
      overlay={
        <ManagerToast
          t={c}
          start={18.2}
          end={22.6}
          title="Новая заявка · сайт"
          lines={["Анна · +7 900 000-00-00", "Турция, с 10 июня, 7 ночей, 2 взрослых, из Москвы, до 200 000 ₽ · поближе к морю"]}
        />
      }
    >
      <UserItem t={c} line={USER[0]} />
      <BotItem t={c} typing={1.9} text={2.7}>Здравствуйте! С удовольствием помогу собрать запрос. С какой даты и на сколько ночей планируете?</BotItem>
      <UserItem t={c} line={USER[1]} />
      <BotItem t={c} typing={5.6} text={6.3}>Отлично. Из какого города вылет и на какой бюджет ориентируетесь?</BotItem>
      <UserItem t={c} line={USER[2]} />
      <BotItem t={c} typing={9.5} text={10.4} extra={<RequestCard t={c} start={10.8} />}>
        Все данные по запросу собрал. Подборку составит менеджер — оставьте, пожалуйста, имя и телефон.
      </BotItem>
      <UserItem t={c} line={USER[3]} />
      <BotItem t={c} typing={15.0} text={15.7}>Спасибо, Анна! Заявка передана менеджеру — он свяжется с вами и пришлёт варианты.</BotItem>
      <FeedItem t={c} start={16.6} gap={4}>
        <DoneNote t={c} start={16.6} title="Заявка у менеджера" text="Почта, U‑ON, Telegram или MAX — куда настроите" />
      </FeedItem>
    </WidgetFrame>
  );
}
