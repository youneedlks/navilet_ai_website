import { lkUrls, type AssistantVersionId, type PricingPlan } from "@/lib/content";

/**
 * Ссылки в личный кабинет с пометкой, откуда пришёл человек.
 *
 * Зачем: кабинет — зеркало того же счётчика Метрики (108200337), поэтому
 * переход с сайта продолжает тот же визит. Без пометки в отчётах видно только
 * «кто-то открыл lk.navilet.ru/start», без привязки к кнопке. Параметр `from`
 * попадает в отчёт «Содержание → Параметры URL» и разделяет источники внутри
 * сайта: демо, лендинг подключения, форма, шапка.
 *
 * Почему не UTM: Метрика берёт метку из первого просмотра визита, а
 * нестандартный `utm_source` относит визит к «другой поисковой системе». То
 * есть метка на внутренней ссылке либо игнорируется, либо переписывает
 * исходный канал — поиск, ChatGPT, рассылку. UTM оставляем внешним каналам,
 * где метка стоит в первом просмотре.
 */
function withFrom(base: string, params: Record<string, string>): string {
  const query = new URLSearchParams(params).toString();
  return `${base}?${query}`;
}

/** Регистрация в кабинете. `from` совпадает с параметром цели trial_register_click. */
export function lkRegisterUrl(opts: {
  from: string;
  planId?: PricingPlan["id"] | null;
  versionId?: AssistantVersionId | null;
}): string {
  const params: Record<string, string> = { from: opts.from };
  if (opts.planId) params.plan = opts.planId;
  if (opts.versionId) params.version = opts.versionId;
  return withFrom(lkUrls.register, params);
}

/** Вход в кабинет: отделяет действующих клиентов от новых регистраций. */
export function lkLoginUrl(from: string): string {
  return withFrom(lkUrls.base, { from });
}
