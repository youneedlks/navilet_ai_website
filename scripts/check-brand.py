#!/usr/bin/env python3
"""Названия, которые нельзя разрывать переносом строки.

«Навылет! AI» — только с неразрывным пробелом (U+00A0), иначе «AI» уезжает
на новую строку. «U-ON», «MAX-мессенджер», «Web-виджет» и т. п. — с
неразрывным дефисом (U+2011), иначе браузер переносит по дефису («U-» / «ON»).

Скрипт запускается перед сборкой (prebuild): находит такие места в src/ и
content/, заменяет и пишет, какие файлы поправил, — правку нужно закоммитить.
В разметке JSON-LD неразрывные символы снова становятся обычными
(src/lib/schema.ts, jsonLdScript).
"""
import re
from pathlib import Path

NBSP, NBHY = " ", "‑"
RULES = [
    (re.compile(r"Навылет! AI"), "Навылет!" + NBSP + "AI"),
    (re.compile(r"U-ON"), "U" + NBHY + "ON"),
    (re.compile(r"\b(MAX|Web)-(?=[а-яё])"), r"\1" + NBHY),
]
ROOT = Path(__file__).resolve().parent.parent
# Не вёрстка: тема и отправитель письма о заявке — там нужны обычные символы.
SKIP = {"src/lib/submitForm.ts"}

fixed = []
for folder, patterns in (("src", ("*.ts", "*.tsx")), ("content", ("*.mdx",))):
    for pattern in patterns:
        for path in (ROOT / folder).rglob(pattern):
            rel = str(path.relative_to(ROOT))
            if rel in SKIP:
                continue
            text = path.read_text(encoding="utf-8")
            new, total = text, 0
            for rx, repl in RULES:
                new, n = rx.subn(repl, new)
                total += n
            if total:
                path.write_text(new, encoding="utf-8")
                fixed.append(f"{rel} ({total})")

if fixed:
    print("check-brand: разрываемые названия заменены на неразрывные, закоммитьте:")
    for line in fixed:
        print("  -", line)
else:
    print("check-brand: ок, названия не разрываются")
