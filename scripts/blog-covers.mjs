// Обложки статей блога (стиль «Светлая», решение владельца 31.10.2026).
// На каждую статью две картинки 1200×630:
//   public/blog/covers/<slug>.webp — без текста: карточка в блоге и шапка статьи (заголовок рядом текстом);
//   public/blog/og/<slug>.jpg      — с заголовком: превью ссылки в Telegram, VK, мессенджерах (og:image).
// Рисунок — плитка-иконка и объёмная белая карточка с силуэтом интерфейса по теме статьи (MOTIFS ниже).
// Запуск после `npm run build` (шрифты берутся из out/): `node scripts/blog-covers.mjs [slug …]`.
// Нужен локальный Chrome; на сервере его нет, поэтому картинки коммитим.
import { createRequire } from "module";
import fs from "fs";
import path from "path";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const require = createRequire(path.join(ROOT, "package.json"));
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const L = require("lucide-react");
const matter = require("gray-matter");
const puppeteer = require("puppeteer-core");

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_COVER = path.join(ROOT, "public/blog/covers");
const OUT_OG = path.join(ROOT, "public/blog/og");

const C = { heading: "#0A1628", body: "#3D4F66", muted: "#7A8FA6", accent: "#0097F5", primary: "#0062EF", ice: "#E8F9FF", line: "#C9D6E8", line2: "#DDE6F2" };
const TILE = "linear-gradient(135deg,#0052CC,#0097F5 55%,#00CCF5)";
const BLUE = "linear-gradient(135deg,#0062EF,#0097F5)";
const PHOTO = (k) => `linear-gradient(135deg,#66F0FF,#0097F5 ${35 + k * 15}%,#0052CC)`;
const SHADOW = "0 10px 26px -12px rgba(0,34,82,.35)";

const icon = (name, size, stroke = 1.75) => renderToStaticMarkup(React.createElement(L[name], { size, strokeWidth: stroke }));
const bar = (w, c = C.line, h = 10) => `<div style="height:${h}px;width:${w}px;border-radius:99px;background:${c};flex-shrink:0"></div>`;
const col = (gap, ...items) => `<div style="display:flex;flex-direction:column;gap:${gap}px">${items.join("")}</div>`;
const row = (gap, ...items) => `<div style="display:flex;align-items:center;gap:${gap}px">${items.join("")}</div>`;
const chip = (text, ic) =>
  `<div style="display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:10px;background:${C.ice};color:${C.primary};font:700 15px Manrope;white-space:nowrap">${ic ? icon(ic, 16, 2.2) : ""}${text}</div>`;
const smallTile = (ic, size = 40) =>
  `<div style="width:${size}px;height:${size}px;border-radius:${size * 0.28}px;background:${TILE};color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0">${icon(ic, size * 0.5, 2)}</div>`;
const userBubble = (w1 = 170, w2 = 110) =>
  `<div style="align-self:flex-end;background:${BLUE};border-radius:18px 18px 6px 18px;padding:14px 18px;display:flex;flex-direction:column;gap:8px">${bar(w1, "rgba(255,255,255,.85)")}${bar(w2, "rgba(255,255,255,.6)")}</div>`;
const botBubble = (...ws) =>
  `<div style="align-self:flex-start;background:#fff;border:1px solid ${C.line2};border-radius:18px 18px 18px 6px;padding:14px 18px;display:flex;flex-direction:column;gap:8px;box-shadow:${SHADOW}">${ws.map((w) => bar(w)).join("")}</div>`;
const tourRow = (i, price) =>
  `<div style="display:flex;gap:14px;align-items:center;background:#fff;border:1px solid ${C.line2};border-radius:16px;padding:10px;box-shadow:${SHADOW}">
    <div style="width:86px;height:58px;border-radius:10px;background:${PHOTO(i)}"></div>
    <div style="flex:1;display:flex;flex-direction:column;gap:8px">${bar(150 - i * 20)}${bar(96, C.line2, 8)}</div>${chip(price)}</div>`;
const miniTour = (i) =>
  `<div style="width:96px;border-radius:12px;background:#fff;border:1px solid ${C.line2};overflow:hidden;box-shadow:${SHADOW}"><div style="height:56px;background:${PHOTO(i)}"></div><div style="padding:8px;display:flex;flex-direction:column;gap:6px">${bar(64, C.line, 7)}${bar(40, C.accent, 7)}</div></div>`;
const field = (ic, w) =>
  row(12, `<span style="color:${C.accent};display:flex">${icon(ic, 20, 2)}</span>`, bar(70, C.line2, 9), bar(w, C.line, 10));

/** Силуэты интерфейса: что «показывает» карточка на обложке. */
const MOTIF = {
  chat: () => col(14, userBubble(), botBubble(210, 160, 90), row(10, miniTour(0), miniTour(1), miniTour(2))),
  chatTours: () => col(12, userBubble(190, 120), tourRow(0, "142 500 ₽"), tourRow(1, "186 200 ₽")),
  tours: () => col(12, tourRow(0, "142 500 ₽"), tourRow(1, "186 200 ₽"), tourRow(2, "98 300 ₽")),
  night: () =>
    col(16,
      row(14, `<span style="color:${C.primary};display:flex">${icon("Moon", 46, 1.6)}</span>`, `<span style="font:800 54px Manrope;letter-spacing:-.02em;color:${C.heading}">02:14</span>`),
      botBubble(220, 150),
      `<div style="align-self:flex-start;display:flex;align-items:center;gap:10px;background:${BLUE};color:#fff;border-radius:14px;padding:12px 16px;font:600 16px Inter">${icon("Send", 18, 2)}<span>Заявка у менеджера к утру</span></div>`),
  site: () =>
    col(14,
      row(8, ...[0, 1, 2].map(() => `<div style="width:12px;height:12px;border-radius:50%;background:${C.line}"></div>`), `<div style="margin-left:10px;flex:1">${bar(260, C.line2, 22)}</div>`),
      row(10, ...["MapPin", "Calendar", "Users"].map((ic) => `<div style="display:flex;align-items:center;gap:8px;padding:12px;border:1px solid ${C.line2};border-radius:12px;color:${C.accent}">${icon(ic, 18, 2)}${bar(70, C.line, 9)}</div>`),
        `<div style="padding:12px 14px;border-radius:12px;background:${BLUE};color:#fff;display:flex">${icon("Search", 20, 2.2)}</div>`),
      row(12, miniTour(0), miniTour(1), miniTour(2), miniTour(3))),
  api: () =>
    col(12,
      row(10, `<span style="padding:6px 10px;border-radius:8px;background:${C.ice};color:${C.primary};font:700 15px ui-monospace,Menlo,monospace">GET</span>`, `<span style="font:600 17px ui-monospace,Menlo,monospace;color:${C.heading}">/tours/search</span>`),
      `<div style="border-radius:14px;background:#F5FAFF;border:1px solid ${C.line2};padding:16px 18px;display:flex;flex-direction:column;gap:10px;font:500 15px ui-monospace,Menlo,monospace;color:${C.body}">
        <span>{</span>
        ${row(10, `<span style="width:16px"></span>`, bar(80, "#9CC9FF", 9), bar(120, C.line, 9))}
        ${row(10, `<span style="width:16px"></span>`, bar(60, "#9CC9FF", 9), `<span style="color:${C.primary};font-weight:700">142 500</span>`)}
        ${row(10, `<span style="width:16px"></span>`, bar(96, "#9CC9FF", 9), bar(150, C.line, 9))}
        <span>}</span></div>`,
      row(10, chip("200 OK", "Check"), bar(140, C.line2, 9))),
  compare: () =>
    row(16,
      `<div style="flex:1;display:flex;flex-direction:column;gap:10px;padding:16px;border-radius:16px;background:#F3F6FA;border:1px solid ${C.line2}">
        <div style="align-self:flex-start;background:#fff;border-radius:14px;padding:12px 14px;display:flex;flex-direction:column;gap:7px">${bar(150)}${bar(100)}</div>
        ${[0, 1, 2].map(() => `<div style="border:1px solid ${C.line};border-radius:10px;padding:9px 12px">${bar(110, C.line, 8)}</div>`).join("")}</div>`,
      `<div style="width:48px;height:48px;border-radius:50%;background:#fff;border:1px solid ${C.line2};display:flex;align-items:center;justify-content:center;font:800 16px Manrope;color:${C.muted}">vs</div>`,
      `<div style="flex:1;display:flex;flex-direction:column;gap:10px">${userBubble(140, 90)}${botBubble(170, 120)}${row(8, miniTour(0), miniTour(1))}</div>`),
  leads: () =>
    row(22,
      col(10, ...[300, 240, 180, 120].map((w, i) => `<div style="height:34px;width:${w}px;border-radius:10px;background:linear-gradient(90deg,#0062EF,#00CCF5);opacity:${1 - i * 0.18}"></div>`)),
      `<div style="flex:1;display:flex;flex-direction:column;gap:12px;padding:16px;border-radius:16px;border:1px solid ${C.line2};box-shadow:${SHADOW}">
        ${row(10, smallTile("User", 38), col(6, bar(110), bar(70, C.line2, 8)))}
        ${field("Phone", 90)}${field("MapPin", 70)}
        ${chip("Новая заявка", "Check")}</div>`),
  request: () =>
    col(14,
      row(12, smallTile("ClipboardCheck", 44), `<span style="font:800 26px Manrope;color:${C.heading}">Заявка</span>`),
      field("User", 160), field("Phone", 130), field("MapPin", 190), field("Calendar", 140), field("Wallet", 110),
      chip("Передано менеджеру", "Send")),
  ranking: () =>
    col(10,
      row(14, `<div style="width:40px"></div>`, bar(150, C.line2, 9), ...[0, 1, 2].map(() => `<div style="width:56px;display:flex;justify-content:center">${bar(36, C.line2, 9)}</div>`)),
      ...[0, 1, 2, 3, 4].map((i) =>
        `<div style="display:flex;align-items:center;gap:14px;padding:8px 0;border-top:1px solid ${C.line2}">${i === 0 ? smallTile("Sparkles", 40) : `<div style="width:40px;height:40px;border-radius:11px;background:${C.ice}"></div>`}${bar(150 - (i % 2) * 30, i === 0 ? C.accent : C.line)}${[0, 1, 2]
          .map((k) => `<div style="width:56px;display:flex;justify-content:center;color:${(i + k) % 3 === 2 && i ? C.line : C.accent}">${(i + k) % 3 === 2 && i ? bar(16, C.line, 4) : icon("Check", 20, 2.6)}</div>`)
          .join("")}</div>`)),
  ai: () =>
    col(14,
      `<div style="display:flex;gap:14px;align-items:flex-start">${smallTile("Sparkles", 48)}<div style="flex:1;background:#F5FAFF;border:1px solid ${C.line2};border-radius:18px;padding:16px 18px;display:flex;flex-direction:column;gap:9px">${bar(300)}${bar(250)}${bar(170)}</div></div>`,
      `<div style="width:520px;display:flex;flex-wrap:wrap;gap:10px">${[["Globe", 90], ["Plane", 70], ["MessagesSquare", 100], ["ChartColumn", 80], ["Hotel", 70]]
        .map(([ic, w]) => `<div style="display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;border:1px solid ${C.line2};background:#fff;color:${C.accent};box-shadow:${SHADOW}">${icon(ic, 18, 2)}${bar(w, C.line, 9)}</div>`)
        .join("")}</div>`),
  link: () =>
    col(14,
      `<div style="align-self:flex-start;display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:12px;background:${C.ice};color:${C.primary};font:600 16px Inter">${icon("Link2", 18, 2.2)}<span>navilet.ru/p/…</span></div>`,
      `<div style="height:88px;border-radius:14px;background:${PHOTO(1)}"></div>`,
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">${[0, 1, 2, 3]
        .map((i) => `<div style="display:flex;gap:10px;align-items:center;padding:8px;border-radius:12px;border:1px solid ${C.line2}"><div style="width:52px;height:40px;border-radius:8px;background:${PHOTO(i)}"></div>${col(6, bar(90, C.line, 8), bar(54, C.accent, 8))}</div>`)
        .join("")}</div>`),
  filters: () =>
    col(14,
      `<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:14px;border:1px solid ${C.line2};color:${C.accent}">${icon("Search", 20, 2.2)}${bar(260)}<span style="margin-left:auto;display:flex">${icon("Zap", 20, 2.2)}</span></div>`,
      `<div style="display:flex;flex-wrap:wrap;gap:8px">${[60, 90, 70, 80, 56]
        .map((w, i) => `<div style="display:flex;align-items:center;gap:6px;padding:8px 12px;border-radius:99px;${i < 3 ? `background:${BLUE};color:#fff` : `border:1px solid ${C.line};color:${C.muted}`}">${i < 3 ? icon("Check", 14, 2.6) : ""}${bar(w, i < 3 ? "rgba(255,255,255,.8)" : C.line, 8)}</div>`)
        .join("")}</div>`,
      tourRow(0, "142 500 ₽"), tourRow(2, "98 300 ₽")),
  growth: () =>
    col(14,
      row(12, ...[["TrendingUp", "+ заявки"], ["Users", "+ клиенты"]].map(([ic, t]) => `<div style="flex:1;display:flex;align-items:center;gap:12px;padding:12px;border-radius:14px;border:1px solid ${C.line2}">${smallTile(ic, 40)}<span style="font:700 17px Manrope;color:${C.heading}">${t}</span></div>`)),
      `<svg viewBox="0 0 520 170" width="520" height="170"><defs><linearGradient id="growth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0097F5" stop-opacity=".35"/><stop offset="1" stop-color="#0097F5" stop-opacity="0"/></linearGradient></defs>
        ${[40, 80, 120].map((y) => `<line x1="0" x2="520" y1="${y}" y2="${y}" stroke="${C.line2}" stroke-dasharray="4 6"/>`).join("")}
        <path d="M0 150 C60 140 90 120 140 118 S230 100 270 84 S360 70 400 44 S480 20 520 10 L520 170 L0 170Z" fill="url(#growth)"/>
        <path d="M0 150 C60 140 90 120 140 118 S230 100 270 84 S360 70 400 44 S480 20 520 10" fill="none" stroke="#0062EF" stroke-width="4" stroke-linecap="round"/>
        <circle cx="520" cy="10" r="0"/><circle cx="400" cy="44" r="7" fill="#fff" stroke="#0062EF" stroke-width="4"/></svg>`),
  return: () =>
    col(14,
      `<div style="align-self:flex-start;max-width:420px;background:#fff;border:1px solid ${C.line2};border-radius:18px 18px 18px 6px;padding:16px 18px;display:flex;flex-direction:column;gap:12px;box-shadow:${SHADOW}">
        ${row(10, `<span style="color:${C.accent};display:flex">${icon("BellRing", 22, 2)}</span>`, `<span style="font:700 18px Manrope;color:${C.heading}">Тур подешевел</span>`)}
        ${row(12, `<div style="width:76px;height:52px;border-radius:10px;background:${PHOTO(0)}"></div>`, col(7, bar(150), bar(90, C.line2, 8)), chip("−8 400 ₽", "TrendingDown"))}</div>`,
      userBubble(150, 90),
      row(10, `<span style="color:${C.accent};display:flex">${icon("RefreshCcw", 20, 2.2)}</span>`, bar(200, C.line2, 9))),
  clock: () =>
    row(24,
      col(12, `<span style="font:800 64px Manrope;letter-spacing:-.03em;color:${C.heading};line-height:1">24/7</span>`,
        ...[["MessagesSquare", 110], ["ClipboardCheck", 90], ["Clock", 120]].map(([ic, w]) => row(10, `<span style="color:${C.accent};display:flex">${icon(ic, 20, 2)}</span>`, bar(w)))),
      `<div style="width:330px;display:flex;align-items:flex-end;gap:5px;height:190px;padding:14px;border-radius:16px;border:1px solid ${C.line2}">${[5, 4, 3, 3, 2, 3, 5, 7, 8, 9, 8, 7, 7, 8, 9, 8, 7, 8, 9, 10, 9, 8, 7, 6]
        .map((v, i) => `<div style="flex:1;height:${v * 15}px;border-radius:4px;background:${i < 7 || i > 19 ? "linear-gradient(180deg,#00CCF5,#0062EF)" : C.line2}"></div>`)
        .join("")}</div>`),
  price: () =>
    col(12,
      row(12, smallTile("Calculator", 44), bar(180, C.line, 12)),
      ...[160, 130, 190].map((w) => `<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;border:1px solid ${C.line2}">${bar(w)}<span style="margin-left:auto">${bar(70, C.line2, 10)}</span><span style="font:800 18px Manrope;color:${C.primary}">₽</span></div>`),
      `<div style="display:flex;align-items:center;gap:12px;padding:14px;border-radius:12px;background:${C.ice}">${bar(120, "#9CC9FF", 12)}<span style="margin-left:auto;font:800 24px Manrope;color:${C.primary}">= ₽</span></div>`),
  connect: () => {
    const node = (ic, x, y) => `<div style="position:absolute;left:${x}px;top:${y}px;width:96px;height:96px;border-radius:24px;background:#fff;border:1px solid ${C.line2};box-shadow:${SHADOW};display:flex;align-items:center;justify-content:center;color:${C.accent}">${icon(ic, 40, 1.8)}</div>`;
    return `<div style="position:relative;width:560px;height:300px">
      <svg width="560" height="300" style="position:absolute;inset:0"><g stroke="#0097F5" stroke-width="3" stroke-dasharray="3 9" stroke-linecap="round" fill="none">
        <path d="M280 150 L80 60"/><path d="M280 150 L480 60"/><path d="M280 150 L80 240"/><path d="M280 150 L480 240"/></g></svg>
      ${node("Search", 32, 12)}${node("FileText", 432, 12)}${node("Database", 32, 192)}${node("Users", 432, 192)}
      <div style="position:absolute;left:220px;top:90px;width:120px;height:120px;border-radius:30px;background:${TILE};color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 24px 50px -16px rgba(0,98,239,.7)">${icon("Workflow", 52, 1.8)}</div></div>`;
  },
  notify: () =>
    col(12, ...[0, 1, 2].map((i) =>
      `<div style="display:flex;gap:14px;align-items:center;padding:14px;border-radius:18px;background:#fff;border:1px solid ${C.line2};box-shadow:${SHADOW};opacity:${1 - i * 0.22};transform:scale(${1 - i * 0.03});transform-origin:top center">
        ${smallTile(i === 1 ? "Send" : "BellRing", 46)}
        <div style="flex:1;display:flex;flex-direction:column;gap:8px">${row(10, `<span style="font:700 17px Manrope;color:${C.heading}">Новая заявка</span>`, `<span style="margin-left:auto;font:500 14px Inter;color:${C.muted}">${["сейчас", "2 мин", "5 мин"][i]}</span>`)}${bar(260 - i * 40)}</div></div>`)),
};

/** Статья → мотив карточки и иконка на плитке. Новую статью — добавить сюда (иначе берётся мотив по категории). */
const MOTIFS = {
  "api-tourvisor": ["api", "Code2"],
  "bot-turagentstva-v-max": ["chat", "MessagesSquare"],
  "chat-bot-vs-ii-assistent": ["compare", "Scale"],
  "gde-brat-lidy-turagentstvu": ["leads", "Magnet"],
  "ii-assistent-bez-tourvisor": ["request", "ClipboardCheck"],
  "ii-assistenty-dlya-turagentstv-2026": ["ranking", "LayoutList"],
  "ii-v-turizme-2026": ["ai", "Sparkles"],
  "integraciya-tourvisor-ii-podbor": ["chatTours", "Plane"],
  "kak-ne-teryat-nochnye-zayavki": ["night", "MoonStar"],
  "kak-otpravit-podborku-turov-klientu": ["link", "Link2"],
  "kak-rabotat-v-tourvisor-bystree": ["filters", "Zap"],
  "kak-uvelichit-prodazhi-turagentstva": ["growth", "TrendingUp"],
  "kak-vozvraschat-klientov-turagentstvu": ["return", "RefreshCcw"],
  "keys-ii-assistent-24-7": ["clock", "Clock"],
  "modul-tourvisor-na-sayt": ["site", "AppWindow"],
  "skolko-stoit-ii-dlya-turagentstva": ["price", "Calculator"],
  "tourvisor-qui-quo-u-on-crm": ["connect", "Workflow"],
  "uvedomleniya-o-zayavkah-telegram-max": ["notify", "BellRing"],
};
const BY_CATEGORY = { Гайды: ["ai", "Sparkles"], Кейсы: ["clock", "Clock"], Продукт: ["chat", "MessagesSquare"], Сравнения: ["compare", "Scale"] };

const BG = `
  <div style="position:absolute;inset:0;background:linear-gradient(160deg,#F5FAFF 0%,#E8F9FF 55%,#D6F3FF 100%)"></div>
  <div style="position:absolute;inset:0;background-image:radial-gradient(rgba(0,98,239,.12) 1.4px,transparent 1.4px);background-size:26px 26px;mask-image:linear-gradient(90deg,transparent,#000 40%,#000)"></div>
  <div style="position:absolute;right:-120px;top:-160px;width:560px;height:560px;border-radius:50%;background:radial-gradient(closest-side,rgba(0,204,245,.35),rgba(0,204,245,0))"></div>`;

/** Объёмная белая карточка с подложкой — общая для обложки и превью. */
const card = (motif) => `
  <div data-card style="position:relative;width:fit-content;transform:rotateY(-14deg) rotateX(6deg);transform-style:preserve-3d">
    <div style="position:absolute;inset:0;border-radius:28px;background:#fff;opacity:.55;transform:translate(70px,36px) translateZ(-120px);box-shadow:0 30px 60px -30px rgba(0,34,82,.35)"></div>
    <div style="position:relative;padding:34px;border-radius:28px;background:#fff;border:1px solid rgba(204,242,255,.9);box-shadow:0 50px 90px -40px rgba(0,34,82,.45)">${MOTIF[motif]()}</div>
  </div>`;
const bigTile = (ic, size) =>
  `<div style="width:${size}px;height:${size}px;border-radius:${size * 0.235}px;background:${TILE};display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 34px 60px -22px rgba(0,98,239,.75)">${icon(ic, size * 0.47, 1.6)}</div>`;

const coverHtml = (motif, ic) => `${BG}
  <div style="position:absolute;left:110px;top:230px">${bigTile(ic, 170)}</div>
  <div data-fit="640x430" style="position:absolute;left:380px;top:0;width:720px;height:630px;perspective:1400px;display:flex;align-items:center;justify-content:center">${card(motif)}</div>`;

// Логотип картинкой, а не вставкой SVG: у вставки общие id заливок с графиками на карточке
const logo = `<img src="file://${path.join(ROOT, "public/logo.svg")}" style="height:40px;width:auto;align-self:flex-start" alt="">`;
// Слова через дефис не переносим («XML‑шлюзы», «ИИ‑ассистент»)
const keepHyphens = (t) => t.replace(/[^\s]*-[^\s]*/g, (w) => `<span style="white-space:nowrap">${w}</span>`);
const ogHtml = (motif, ic, title, category) => {
  const size = title.length > 70 ? 44 : title.length > 52 ? 50 : 56;
  return `${BG}
  <div style="position:absolute;left:72px;top:64px;bottom:64px;width:540px;display:flex;flex-direction:column">
    ${logo}
    <div style="margin-top:auto;font:700 20px Inter;color:${C.accent};letter-spacing:.02em">${category}</div>
    <div style="margin-top:14px;font:800 ${size}px/1.12 Manrope;letter-spacing:-.02em;color:${C.heading}">${keepHyphens(title)}</div>
    <div style="margin-top:28px;font:600 18px Inter;color:${C.muted}">navilet.ru/blog</div>
  </div>
  <div data-fit="480x380" style="position:absolute;left:640px;top:0;width:520px;height:630px;perspective:1400px;display:flex;align-items:center;justify-content:center">${card(motif)}</div>
  <div style="position:absolute;left:612px;top:96px">${bigTile(ic, 112)}</div>`;
};

/** Шрифты сайта (Inter, Manrope) — из собранного out/, чтобы не ходить в Google. */
function fontCss() {
  const dir = path.join(ROOT, "out/_next/static");
  const files = [];
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : e.name.endsWith(".css") && files.push(path.join(d, e.name))));
  if (!fs.existsSync(dir)) throw new Error("Нет out/ — сначала npm run build");
  walk(dir);
  const faces = files.flatMap((f) => fs.readFileSync(f, "utf8").match(/@font-face\{[^}]*\}/g) || []);
  const css = faces
    .filter((f) => /Inter|Manrope/.test(f) && !/Fallback/.test(f))
    .map((f) => f.replace(/url\((\/_next\/[^)]+)\)/g, (_, u) => `url(file://${path.join(ROOT, "out", u)})`))
    .join("\n");
  // Имена семейств в сборке — служебные; добавляем понятные имена тем же файлам
  return css.replace(/font-family:[^;]*Inter[^;]*;/g, "font-family:Inter;").replace(/font-family:[^;]*Manrope[^;]*;/g, "font-family:Manrope;");
}

const page = (css, body) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}
html,body{margin:0}body{width:1200px;height:630px;overflow:hidden;font-family:Inter,sans-serif;-webkit-font-smoothing:antialiased}
.c{position:relative;width:1200px;height:630px;overflow:hidden}</style></head><body><div class="c">${body}</div></body></html>`;

const only = process.argv.slice(2);
const posts = fs
  .readdirSync(path.join(ROOT, "content/blog"))
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => ({ slug: f.replace(/\.mdx$/, ""), ...matter(fs.readFileSync(path.join(ROOT, "content/blog", f), "utf8")).data }))
  .filter((p) => !only.length || only.includes(p.slug));

const css = fontCss();
fs.mkdirSync(OUT_COVER, { recursive: true });
fs.mkdirSync(OUT_OG, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--allow-file-access-from-files"] });
const tab = await browser.newPage();
await tab.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
const tmp = path.join(ROOT, "out/.cover.html");
for (const p of posts) {
  const [motif, ic] = MOTIFS[p.slug] ?? BY_CATEGORY[p.category] ?? BY_CATEGORY["Гайды"];
  if (!MOTIFS[p.slug]) console.warn(`! ${p.slug}: мотив не задан, взят по категории «${p.category}»`);
  for (const [html, file, type] of [
    [coverHtml(motif, ic), path.join(OUT_COVER, `${p.slug}.webp`), "webp"],
    [ogHtml(motif, ic, String(p.title), p.category), path.join(OUT_OG, `${p.slug}.jpg`), "jpeg"],
  ]) {
    fs.writeFileSync(tmp, page(css, html));
    await tab.goto("file://" + tmp, { waitUntil: "load" });
    await tab.evaluate(() => document.fonts.ready);
    // Карточки разной величины: подгоняем масштаб, чтобы каждая занимала отведённое ей место
    await tab.evaluate(() => {
      for (const box of document.querySelectorAll("[data-fit]")) {
        const [w, h] = box.dataset.fit.split("x").map(Number);
        const c = box.querySelector("[data-card]");
        const r = c.getBoundingClientRect();
        c.style.zoom = String(Math.min(w / r.width, h / r.height, 1.7));
      }
    });
    await tab.screenshot({ path: file, type, quality: type === "webp" ? 86 : 88 });
  }
  console.log("ok", p.slug, motif);
}
fs.rmSync(tmp, { force: true });
await browser.close();
