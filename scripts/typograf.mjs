#!/usr/bin/env node
/**
 * Типографика русских текстов сайта: висячие предлоги и тире в начале строки.
 *
 * Правила (стандарт русской вёрстки):
 *   1. Предлог, союз или частица из списка SHORT («в», «на», «и», «для», «без»…) привязывается
 *      к следующему слову — не остаётся в конце строки. Аббревиатуры (ИИ, РФ, MAX) — не предлоги.
 *      Длинное следующее слово не приклеиваем: склейка шире узкого экрана ломает вёрстку.
 *      Предел — 14 букв в тексте, 10 в h2 и 7 в h1 (проверено на экранах 360 и 390 px).
 *   2. Перед тире «—» — неразрывный пробел: тире не начинает строку.
 *   3. Частицы «ли», «же», «бы» привязываются к предыдущему слову.
 *   4. Число привязывается к следующему слову, ₽ или %: «30 дней», «990 ₽».
 *
 * Почему в исходниках, а не в готовом HTML: страницы с интерактивом React
 * пересобирает в браузере из JS, и текст HTML должен совпадать с текстом JS —
 * иначе гидрация ломается и правки пропадают. Поэтому правим исходный текст,
 * как scripts/check-brand.py делает с брендом.
 *
 * Что трогаем: JSX-текст и строки с кириллицей в src/**\/*.{ts,tsx} (через
 * компилятор TypeScript — только видимый текст), прозу статей content/blog/*.mdx.
 * Что не трогаем: импорты, ключи объектов, атрибуты className/href/…, строки в
 * сравнениях и вызовах startsWith/includes/…, keywords, код в статьях.
 *
 * Запуск: node scripts/typograf.mjs [--check]
 *   без флага — правит файлы и перечисляет их (закоммитьте);
 *   --check   — только сообщает, где нужны правки (код выхода 1).
 * Повторный запуск ничего не меняет: правила идемпотентны.
 */
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CHECK = process.argv.includes("--check");
const NB = " ";

/** Файлы, где текст уходит не в вёрстку: письма, цели Метрики, ссылки, разметка. */
const SKIP_FILES = new Set([
  "src/lib/submitForm.ts",
  "src/lib/metrika.ts",
  "src/lib/lk.ts",
  "src/lib/schema.ts",
]);

const SHORT_WORDS = [
  "а", "в", "во", "и", "к", "ко", "о", "об", "обо", "с", "со", "у", "на", "по", "за", "из", "от", "до",
  "не", "ни", "но", "да", "для", "без", "над", "под", "при", "про", "или",
];
const SHORT = `(?:${SHORT_WORDS.map((w) => `[${w[0]}${w[0].toUpperCase()}]${w.slice(1)}`).join("|")})`;
const LIMIT_TEXT = 14;
const LIMIT_H1 = 7;
const LIMIT_H2 = 10;
const NOT_LETTER_BEFORE = "(?<![\\p{L}\\p{N}\\-‑])";

/**
 * Правила для куска текста. ws — что считать пробелом между словами:
 * в строках — только обычные пробелы, в JSX-тексте — ещё и перенос строки
 * с отступом (JSX склеивает его в один пробел).
 */
function typograph(text, ws, limit = LIMIT_TEXT) {
  let t = text;
  // 1. Предлог + пробел + следующее слово не длиннее limit букв.
  t = t.replace(
    new RegExp(`${NOT_LETTER_BEFORE}(${SHORT})${ws}(?=([^\\s]+))`, "gu"),
    (m, word, nextRun) => {
      if (nextRun.startsWith("${")) return `${word}${NB}`;
      const letters = (nextRun.match(/[\p{L}\p{N}]/gu) || []).length;
      return letters <= limit ? `${word}${NB}` : m;
    }
  );
  // 2. Пробел перед тире.
  t = t.replace(new RegExp(`(?<=[^\\s])${ws}(?=—)`, "gu"), NB);
  // 3. Частицы.
  t = t.replace(new RegExp(`(?<=\\p{L})${ws}(ли|же|бы)(?![\\p{L}])`, "gu"), `${NB}$1`);
  // 4. Число + слово / ₽ / %.
  t = t.replace(new RegExp(`(?<=\\d)${ws}(?=[а-яёА-ЯЁ₽%])`, "gu"), NB);
  return t;
}

const WS_STR = "[ ]+";
const WS_JSX = "(?:[ \\t]*\\r?\\n[ \\t]*|[ ]+)";
const CYR = /[а-яёА-ЯЁ]/;

const SKIP_ATTRS = new Set([
  "className", "href", "src", "id", "key", "type", "rel", "target", "name", "role",
  "htmlFor", "as", "lang", "d", "viewBox", "fill", "stroke", "source", "variant", "size",
]);
const SKIP_CALLS = new Set([
  "startsWith", "endsWith", "includes", "indexOf", "lastIndexOf", "test", "match",
  "matchAll", "replace", "replaceAll", "split", "querySelector", "querySelectorAll",
  "getElementById", "require", "RegExp", "reachMetrikaGoal", "localeCompare",
]);
const COMPARE_OPS = new Set([
  ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken,
  ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken,
]);

function nameOf(node) {
  if (!node) return "";
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
  return "";
}

/** Строку не трогаем, если это не видимый текст, а ключ, адрес или операнд сравнения. */
function skipLiteral(node) {
  const p = node.parent;
  if (!p) return true;
  if (ts.isImportDeclaration(p) || ts.isExportDeclaration(p) || ts.isExternalModuleReference(p)) return true;
  if (ts.isLiteralTypeNode(p)) return true;
  if ((ts.isPropertyAssignment(p) || ts.isPropertySignature(p) || ts.isMethodDeclaration(p)) && p.name === node) return true;
  if (ts.isElementAccessExpression(p) && p.argumentExpression === node) return true;
  if (ts.isCaseClause(p)) return true;
  if (ts.isBinaryExpression(p) && COMPARE_OPS.has(p.operatorToken.kind)) return true;
  if (ts.isCallExpression(p) || ts.isNewExpression(p)) {
    const callee = p.expression;
    const n = ts.isPropertyAccessExpression(callee) ? callee.name.text : nameOf(callee);
    if (SKIP_CALLS.has(n)) return true;
  }
  if (ts.isJsxAttribute(p) && SKIP_ATTRS.has(p.name.getText())) return true;
  // keywords в metadata — поисковые фразы, их не трогаем.
  for (let a = p; a; a = a.parent) {
    if ((ts.isPropertyAssignment(a) || ts.isVariableDeclaration(a)) && nameOf(a.name) === "keywords") return true;
    if (ts.isSourceFile(a)) break;
  }
  return false;
}

function processTsFile(rel) {
  const abs = path.join(ROOT, rel);
  const src = fs.readFileSync(abs, "utf8");
  if (!CYR.test(src)) return 0;
  const kind = rel.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(rel, src, ts.ScriptTarget.Latest, true, kind);
  const edits = []; // {start, end, text}

  const visit = (node) => {
    if (ts.isJsxText(node)) {
      const raw = node.getFullText();
      if (CYR.test(raw)) {
        const h = inHeading(node);
        let next = typograph(raw, WS_JSX, h === "h1" ? LIMIT_H1 : h === "h2" ? LIMIT_H2 : LIMIT_TEXT);
        // Короткое слово в конце текста перед элементом на той же строке: «от <span>».
        // В заголовках не клеим: длину слова внутри соседнего элемента не видно.
        const sib = nextSibling(node);
        if (sib && !inHeading(node)) {
          next = next.replace(new RegExp(`${NOT_LETTER_BEFORE}(${SHORT})[ ]+$`, "u"), `$1${NB}`);
        }
        if (prevSibling(node)) next = next.replace(/^[ ]+(?=—)/u, NB);
        if (next !== raw) edits.push({ start: node.getFullStart(), end: node.getEnd(), text: next });
      } else if (prevSibling(node) && /^[ ]+—/u.test(raw)) {
        // Тире сразу после выражения или элемента: «{label} — <a>…» (кириллицы в куске нет).
        edits.push({ start: node.getFullStart(), end: node.getEnd(), text: raw.replace(/^[ ]+(?=—)/u, NB) });
      }
    } else if (ts.isJsxExpression(node) && node.expression && ts.isStringLiteral(node.expression) && node.expression.text === " ") {
      // {" "} после короткого слова или перед тире — становится неразрывным.
      const prev = prevSibling(node);
      const nxt = nextSibling(node);
      const prevText = prev && ts.isJsxText(prev) ? prev.getFullText() : "";
      const nextText = nxt && ts.isJsxText(nxt) ? nxt.getFullText() : "";
      const afterShort = new RegExp(`${NOT_LETTER_BEFORE}${SHORT}$`, "u").test(prevText.replace(/\s+$/, ""));
      const beforeDash = /^[ ]*—/.test(nextText);
      if ((afterShort && !inHeading(node)) || beforeDash) {
        const lit = node.expression;
        edits.push({ start: lit.getStart(), end: lit.getEnd(), text: '"\\u00A0"' });
      }
    } else if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      if (CYR.test(node.text) && !skipLiteral(node)) {
        const start = node.getStart() + 1;
        const end = node.getEnd() - 1;
        const raw = src.slice(start, end);
        const next = typograph(raw, WS_STR);
        if (next !== raw) edits.push({ start, end, text: next });
      }
    } else if (ts.isTemplateExpression(node)) {
      if (!skipLiteral(node)) {
        const parts = [node.head, ...node.templateSpans.map((s) => s.literal)];
        for (const part of parts) {
          // head: `...${   middle: }...${   tail: }...`
          const start = part.getStart() + 1;
          const end = part.getEnd() - (ts.isTemplateTail(part) ? 1 : 2);
          const raw = src.slice(start, end);
          if (!CYR.test(raw)) continue;
          const next = typograph(raw, WS_STR);
          if (next !== raw) edits.push({ start, end, text: next });
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  if (!edits.length) return 0;
  edits.sort((a, b) => b.start - a.start);
  let out = src;
  for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end);
  if (!CHECK) fs.writeFileSync(abs, out);
  return edits.length;
}

/** Текст внутри крупного заголовка h1/h2 — там длинную склейку не допускаем. */
function inHeading(node) {
  for (let a = node.parent; a && !ts.isSourceFile(a); a = a.parent) {
    if (ts.isJsxElement(a)) {
      const tag = a.openingElement.tagName.getText();
      if (tag === "h1" || tag === "h2") return tag;
    }
  }
  return null;
}

function siblings(node) {
  const p = node.parent;
  if (p && (ts.isJsxElement(p) || ts.isJsxFragment(p))) return p.children;
  return null;
}
function nextSibling(node) {
  const list = siblings(node);
  if (!list) return null;
  const i = list.indexOf(node);
  return i >= 0 && i + 1 < list.length ? list[i + 1] : null;
}
function prevSibling(node) {
  const list = siblings(node);
  if (!list) return null;
  const i = list.indexOf(node);
  return i > 0 ? list[i - 1] : null;
}

/** MDX: проза вне кода; в начале файла — только title и description. */
function processMdx(rel) {
  const abs = path.join(ROOT, rel);
  const src = fs.readFileSync(abs, "utf8");
  const lines = src.split("\n");
  let inFront = false, frontDone = false, inCode = false, changed = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (i === 0 && line === "---") { inFront = true; continue; }
    if (inFront) {
      if (line === "---") { inFront = false; frontDone = true; continue; }
      const m = line.match(/^(title|description): "(.*)"$/);
      if (m) {
        const lim = m[1] === "title" ? LIMIT_H1 : LIMIT_TEXT;
        const next = `${m[1]}: "${typograph(m[2], WS_STR, lim)}"`;
        if (next !== line) { lines[i] = next; changed++; }
      }
      continue;
    }
    if (/^\s*```/.test(line)) { inCode = !inCode; continue; }
    if (inCode || /^(import|export)\s/.test(line) || !CYR.test(line)) continue;
    // Инлайн-код `…` и адреса ссылок (…) прячем под метки, правила — ко всей строке:
    // так видно и тире сразу после ссылки или **жирного**.
    const kept = [];
    const masked = line.replace(/`[^`]*`|\]\([^)]*\)/g, (m) => {
      kept.push(m);
      return `\uE000${kept.length - 1}\uE001`;
    });
    const lim = /^#\s/.test(line) ? LIMIT_H1 : /^##\s/.test(line) ? LIMIT_H2 : LIMIT_TEXT;
    let done = typograph(masked, WS_STR, lim);
    // Предлог перед инлайн-кодом: «а `script`».
    done = done.replace(new RegExp(`${NOT_LETTER_BEFORE}(${SHORT})[ ]+(?=\uE000)`, "gu"), `$1${NB}`);
    const next = done.replace(/\uE000(\d+)\uE001/g, (_, k) => kept[Number(k)]);
    if (next !== line) { lines[i] = next; changed++; }
  }
  if (changed && !CHECK) fs.writeFileSync(abs, lines.join("\n"));
  void frontDone;
  return changed;
}

function walk(dir, exts, acc = []) {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) walk(rel, exts, acc);
    else if (exts.some((x) => e.name.endsWith(x))) acc.push(rel);
  }
  return acc;
}

const report = [];
for (const rel of walk("src", [".ts", ".tsx"])) {
  if (SKIP_FILES.has(rel) || rel.endsWith(".d.ts")) continue;
  const n = processTsFile(rel);
  if (n) report.push(`  - ${rel} (${n})`);
}
for (const rel of walk("content/blog", [".mdx"])) {
  const n = processMdx(rel);
  if (n) report.push(`  - ${rel} (${n})`);
}

if (report.length) {
  console.log(
    CHECK
      ? "typograf: нужны неразрывные пробелы (запустите node scripts/typograf.mjs):"
      : "typograf: висячие предлоги и тире исправлены, закоммитьте:"
  );
  console.log(report.join("\n"));
  if (CHECK) process.exit(1);
} else {
  console.log("typograf: всё в порядке");
}
