import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Versions from "@/components/sections/Versions";
import Features from "@/components/sections/Features";
import NetworkResults from "@/components/sections/NetworkResults";
import Metrics from "@/components/sections/Metrics";
import Partners from "@/components/sections/Partners";
import Pricing from "@/components/sections/Pricing";
import Integration from "@/components/sections/Integration";
import DashboardPromo from "@/components/sections/DashboardPromo";
import FAQ from "@/components/sections/FAQ";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import InlineCTA from "@/components/ui/InlineCTA";
import { siteUrl, siteName, siteDescription } from "./layout";
import { jsonLdScript } from "@/lib/schema";
import { aggregateOfferJsonLd } from "@/lib/public-offers";
import { reqVersionPublished } from "@/lib/content";

const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: `${siteName} — ИИ-ассистент для турагентств | подбор туров 24/7`,
      description: siteDescription,
      inLanguage: "ru-RU",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#product` },
      mainEntity: { "@id": `${siteUrl}/#product` },
      primaryImageOfPage: { "@id": `${siteUrl}/#logo` },
      publisher: { "@id": `${siteUrl}/#organization` },
      datePublished: "2024-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      breadcrumb: { "@id": `${siteUrl}/#breadcrumb` },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Главная",
          item: siteUrl,
        },
      ],
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#product`,
      name: "Навылет! AI — ИИ-ассистент",
      alternateName: ["Навылет AI", "navylet AI", "Navilet"],
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "TravelApplication",
      operatingSystem: "Web (browser-based)",
      browserRequirements: "Requires JavaScript",
      softwareVersion: "2.0",
      description:
        "ИИ-ассистент для турагентств и туроператоров: автоматический подбор туров, консультация по отелям, показ перелётов и актуальных цен — в живом диалоге с клиентом. Интеграция с агрегатором Tourvisor. Работает 24/7.",
      url: siteUrl,
      image: `${siteUrl}/og-image.png`,
      screenshot: `${siteUrl}/og-image.png`,
      inLanguage: "ru-RU",
      isAccessibleForFree: false,
      featureList: [
        reqVersionPublished
          ? "Три версии: «Заявка» (запрос и контакт, тур подбирает менеджер), «Лид» (лидогенерация) и «Про» (полный инструмент менеджера)"
          : "Две версии: «Лид» (лидогенерация) и «Про» (полный инструмент менеджера)",
        "Подбор туров по 50+ странам в реальном времени через Tourvisor",
        "Живой диалог на естественном русском языке",
        "Актуальные цены и наличие от туроператоров",
        "Консультация по отелям: пляж, питание, инфраструктура (версия «Про»)",
        "Возврат клиентов в MAX: напоминание замолчавшим и подписка на снижение цены (в «Про» входят, в «Лиде» — опциями)",
        "Информация о перелётах, авиакомпаниях, пересадках",
        "Горящие туры и специальные предложения",
        "Подборки по ссылке с брендингом агентства",
        "Заявки на почту, в U‑ON, Telegram и MAX",
        "Личный кабинет с аналитикой диалогов",
        "White-label кастомизация виджета под бренд",
        "Работает в Web‑виджете и MAX‑мессенджере",
        "Подключение без программиста",
      ],
      offers: aggregateOfferJsonLd(),
      provider: { "@id": `${siteUrl}/#organization` },
      publisher: { "@id": `${siteUrl}/#organization` },
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Турагентства, туроператоры, онлайн-платформы туризма",
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(homepageJsonLd) }}
      />
      <Navigation />
      <main>
        <Hero />
        <NetworkResults />
        <InlineCTA
          text="Ассистент берёт до 80% рутины — менеджеру остаётся готовая заявка"
          buttonText="Подключить бесплатно"
        />
        <HowItWorks />
        <Versions />
        <Features />
        <DashboardPromo />
        <Metrics />
        <Partners />
        <Pricing />
        <Integration />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
