#!/usr/bin/env python3
"""Бренд «Навылет! AI» — только с неразрывным пробелом.

С обычным пробелом браузер переносит «AI» на новую строку отдельно от
«Навылет!». Скрипт запускается перед сборкой (prebuild): находит такие места
в src/ и content/, заменяет пробел на неразрывный и пишет, какие файлы
поправил, — правку нужно закоммитить. В разметке JSON-LD неразрывный пробел
снова становится обычным (src/lib/schema.ts, jsonLdScript).
"""
from pathlib import Path

BROKEN = "Навылет! AI"
FIXED = "Навылет!\u00a0AI"  # неразрывный пробел
ROOT = Path(__file__).resolve().parent.parent
# Не вёрстка: тема и отправитель письма о заявке — там нужен обычный пробел.
SKIP = {"src/lib/submitForm.ts"}

fixed = []
for folder, patterns in (("src", ("*.ts", "*.tsx")), ("content", ("*.mdx",))):
    for pattern in patterns:
        for path in (ROOT / folder).rglob(pattern):
            if str(path.relative_to(ROOT)) in SKIP:
                continue
            text = path.read_text(encoding="utf-8")
            count = text.count(BROKEN)
            if count:
                path.write_text(text.replace(BROKEN, FIXED), encoding="utf-8")
                fixed.append(f"{path.relative_to(ROOT)} ({count})")

if fixed:
    print("check-brand: «Навылет! AI» с обычным пробелом — заменил на неразрывный, закоммитьте:")
    for line in fixed:
        print("  -", line)
else:
    print("check-brand: ок, бренд везде с неразрывным пробелом")
