import {
  pricingPlans,
  reqVersionPublished,
  type PricingPlan,
  type VersionPlanValues,
} from "@/lib/content";

const siteUrl = "https://navilet.ru";

/** Версии с публичной ценой. «Заявка» — пока её публикует выключатель. */
export const publicVersions: {
  id: "req" | "lid" | "pro";
  label: string;
  title: string;
  about: string;
  pick: (p: PricingPlan) => VersionPlanValues | undefined;
}[] = [
  ...(reqVersionPublished
    ? [
        {
          id: "req" as const,
          label: "«Заявка»",
          title: "Версия «Заявка» — запрос без подборки",
          about: "собирает запрос и контакт, тур подбирает менеджер",
          pick: (p: PricingPlan) => p.req,
        },
      ]
    : []),
  {
    id: "lid",
    label: "«Лид»",
    title: "Версия «Лид» — лидогенерация",
    about: "лидогенерация: подбор туров и заявка менеджеру",
    pick: (p) => p.lid,
  },
  {
    id: "pro",
    label: "«Про»",
    title: "Версия «Про» — полный инструмент",
    about: "консультации, подбор туров и возврат клиентов",
    pick: (p) => ({
      price: p.price,
      dialogs: p.dialogs,
      extraDialog: p.extraDialog,
      effectivePerDialog: p.effectivePerDialog,
    }),
  },
];

/** Тарифы с публичной ценой: «Сеть» индивидуальна и сюда не входит. */
export const publicPlans = pricingPlans.filter((p) => !p.custom);

/** Все предложения с ценой — версия × тариф. */
export const publicOffers = publicVersions.flatMap((version) =>
  publicPlans.flatMap((plan) => {
    const values = version.pick(plan);
    return values ? [{ version, plan, values }] : [];
  })
);

/**
 * AggregateOffer для JSON-LD: одна разметка цен на главной, /tarify и
 * /skolko-stoit. lowPrice — то, из чего Яндекс собирает сниппет «от … ₽».
 */
export function aggregateOfferJsonLd(id?: string) {
  const prices = publicOffers.map((o) => o.values.price);
  return {
    "@type": "AggregateOffer",
    ...(id ? { "@id": id } : {}),
    priceCurrency: "RUB",
    lowPrice: String(Math.min(...prices)),
    highPrice: String(Math.max(...prices)),
    offerCount: publicOffers.length,
    availability: "https://schema.org/InStock",
    url: `${siteUrl}/tarify`,
    eligibleRegion: { "@type": "Country", name: "Россия" },
    offers: publicOffers.map(({ version, plan, values }) => ({
      "@type": "Offer",
      "@id": `${siteUrl}/tarify#offer-${version.id}-${plan.id}`,
      name: `${plan.name} — версия ${version.label}`,
      price: String(values.price),
      priceCurrency: "RUB",
      url: `${siteUrl}/tarify#${plan.id}`,
      availability: "https://schema.org/InStock",
      description: `Версия ${version.label} (${version.about}): ${values.dialogs} диалогов в месяц, сверх лимита — ${values.extraDialog} ₽ за диалог. Подключение бесплатно. ${plan.tagline}.`,
      eligibleRegion: { "@type": "Country", name: "Россия" },
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: String(values.price),
        priceCurrency: "RUB",
        unitText: "MONTHLY",
        referenceQuantity: {
          "@type": "QuantitativeValue",
          value: values.dialogs,
          unitText: "диалогов в месяц",
        },
      },
    })),
  };
}
