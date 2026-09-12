import { promo } from "@/lib/content";

/**
 * Единый источник правды для промо-плашки: высота и ключ «закрыто».
 * Используется и в компоненте PromoBanner, и в инлайн-скрипте <head>,
 * который резервирует место под плашку ДО гидратации. Раньше это были две
 * копии (40 px против 36 px, старый ключ с датой) — страница дважды
 * прыгала при загрузке, CLS 0,12 на всех устройствах.
 */
export const PROMO_BANNER_H = 36;

/** Ключ привязан к условиям акции: сменили условия — плашку увидят снова. */
export const PROMO_DISMISS_KEY =
  "promo_dismissed_" + (promo.endDate ?? "evergreen");

/**
 * Скрипт для <head>: ставит отступ под плашку до первого кадра, чтобы
 * контент не сдвигался, когда плашка появится после гидратации.
 * Если акция выключена или истекла — ничего не резервирует.
 */
export function promoHeadScript(): string {
  const end = promo.endDate ? new Date(promo.endDate).getTime() : null;
  const activeNow = promo.active && (end === null || Date.now() < end);
  if (!activeNow) return "";
  const h = `${PROMO_BANNER_H}px`;
  return (
    `(function(){try{` +
    `if(localStorage.getItem(${JSON.stringify(PROMO_DISMISS_KEY)})!=='1'){` +
    `var r=document.documentElement;` +
    `r.style.setProperty('--promo-pad','${h}');` +
    `r.style.setProperty('--promo-h','${h}');}` +
    `}catch(e){}})();`
  );
}
