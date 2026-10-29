import { BotItem, Cards, Chips, DoneNote, FeedItem, UserItem, WidgetFrame, WIDGET_H, WIDGET_W, defaultAsset, defaultImg, loopTime, type SceneProps, type UserLine } from "./widgetKit";

/**
 * Версия «Про» (первый экран главной и /versii): полный диалог из DemoWidget
 * (demoScenarios[0]). Турист пишет запрос, ассистент уточняет детали, показывает
 * туры, рассказывает об отеле и о том, что входит в стоимость, и передаёт заявку
 * менеджеру. В конце — логотип «Навылет! AI».
 *
 * Как и остальные сцены — чистая функция от `t`: её играет сайт (ScenePlayer)
 * и Remotion (video/). Логический размер 400×600.
 */

export const HERO_PRO_DURATION = 38.4;
export const HERO_PRO_W = WIDGET_W;
export const HERO_PRO_H = WIDGET_H;
const FINALE = 34.4;

/** Этапы — для подписей рядом с роликом: уточняет, подбирает, консультирует, передаёт. */
export function proStage(t: number): number {
  if (t < 13.1) return 0;
  if (t < 19.3) return 1;
  if (t < 30.3) return 2;
  return 3;
}

const USER: UserLine[] = [
  { text: "Хочу в Турцию на море", type: 0.4, send: 1.3 },
  { text: "Из Москвы", type: 3.6, send: 4.2 },
  { text: "В начале июня на неделю", type: 6.3, send: 7.2 },
  { text: "Вдвоём с женой", type: 9.1, send: 9.7 },
  { text: "4-5 звёзд, всё включено", type: 11.8, send: 12.7 },
  { text: "Расскажи подробнее о первом", send: 19.3 }, // нажата подсказка
  { text: "А что входит в стоимость?", type: 24.4, send: 25.3 },
  { text: "Оформить тур", send: 30.3 }, // нажата подсказка
];

const DETAILS =
  "Barut Hemera 5★ — рейтинг 4.7\n\n📍 Сиде, первая линия, 50 м до моря\n🏖 Песчаный пляж, шезлонги бесплатно\n🏊 3 бассейна + крытый + аквапарк\n🍽 5 ресторанов, 4 бара\n👶 Детский клуб, анимация\n\nХотите узнать о перелёте или что входит в тур?";
const INCLUDED =
  "В стоимость тура включено:\n\n✈️ Перелёт Москва — Анталья — Москва\n🚗 Групповой трансфер аэропорт — отель\n🏨 Проживание 7 ночей\n🍽 Питание All Inclusive\n🏥 Медицинская страховка\n\nХотите оформить или сравнить с другим?";
const HANDOFF =
  "Передал запрос менеджеру вместе с подборкой и вашими параметрами. Он свяжется с вами и оформит выбранный вариант — обычно в течение 15 минут.";

export default function HeroProScene({ t, Img = defaultImg, asset = defaultAsset }: SceneProps) {
  const c = loopTime(t, FINALE);
  return (
    <WidgetFrame t={t} c={c} version="Версия «Про»" user={USER} asset={asset} finaleStart={FINALE} duration={HERO_PRO_DURATION}>
      <UserItem t={c} line={USER[0]} />
      <BotItem t={c} typing={1.7} text={2.5}>Отличный выбор! Из какого города планируете вылет?</BotItem>
      <UserItem t={c} line={USER[1]} />
      <BotItem t={c} typing={4.6} text={5.3}>Когда хотите поехать и на сколько ночей?</BotItem>
      <UserItem t={c} line={USER[2]} />
      <BotItem t={c} typing={7.6} text={8.3}>Сколько гостей? Есть ли дети?</BotItem>
      <UserItem t={c} line={USER[3]} />
      <BotItem t={c} typing={10.1} text={10.8}>Какую категорию отеля и тип питания предпочитаете?</BotItem>
      <UserItem t={c} line={USER[4]} />
      <BotItem
        t={c}
        typing={13.1}
        text={14.4}
        extra={
          <>
            <Cards t={c} start={14.6} Img={Img} />
            <Chips t={c} show={15.6} tapAt={19.0} items={["Расскажи подробнее о первом", "Передать менеджеру"]} />
          </>
        }
      >
        Нашёл отличные варианты для вас! Какой заинтересовал?
      </BotItem>
      <UserItem t={c} line={USER[5]} />
      <BotItem t={c} typing={19.7} text={20.6}>{DETAILS}</BotItem>
      <UserItem t={c} line={USER[6]} />
      <BotItem t={c} typing={25.7} text={26.5} extra={<Chips t={c} show={27.3} tapAt={30.0} items={["Оформить тур", "Сравнить с другим"]} />}>
        {INCLUDED}
      </BotItem>
      <UserItem t={c} line={USER[7]} />
      <BotItem t={c} typing={30.7} text={31.4}>{HANDOFF}</BotItem>
      <FeedItem t={c} start={32.0} gap={4}>
        <DoneNote t={c} start={32.0} title="Диалог завершён" text="Заявка с подборкой ушла менеджеру и в CRM" />
      </FeedItem>
    </WidgetFrame>
  );
}
