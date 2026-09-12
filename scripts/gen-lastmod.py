#!/usr/bin/env python3
"""
Генерирует src/lib/seo/lastmod.json — дату последней содержательной правки
каждого маршрута по истории git, и обновляет строку «Обновлено» в llms.txt.

Зачем: lastmod в sitemap раньше проставлялся руками и отставал от реальных
правок на недели. Поисковики сверяют lastmod с фактическими изменениями
и перестают ему верить, если он врёт. Дата из git врать не может.

Запуск: python3 scripts/gen-lastmod.py
  - локально — автоматически через npm prebuild;
  - на сервере — из deploy.sh перед docker build (в контейнере git нет).
Если git недоступен, скрипт молча оставляет прежний JSON.
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "lib" / "seo" / "lastmod.json"
LLMS = [ROOT / "public" / "llms.txt", ROOT / "public" / "llms-full.txt"]

# Маршрут → файлы, правка которых означает изменение содержания страницы.
# content.ts указан только там, где страница действительно собирается из него.
ROUTES: dict[str, list[str]] = {
    "/": ["src/app/page.tsx", "src/components/sections", "src/lib/content.ts"],
    "/tarify": ["src/app/tarify", "src/lib/content.ts"],
    "/skolko-stoit": ["src/app/skolko-stoit", "src/lib/content.ts"],
    "/versii": ["src/app/versii", "src/lib/content.ts"],
    "/podborki": ["src/app/podborki", "src/lib/content.ts"],
    "/lidy-dlya-turagentstva": ["src/app/lidy-dlya-turagentstva"],
    "/chat-bot-dlya-turagentstva": ["src/app/chat-bot-dlya-turagentstva", "src/lib/content.ts"],
    "/max": ["src/app/max", "src/lib/content.ts"],
    "/sravnenie": ["src/app/sravnenie", "src/lib/content.ts"],
    "/vozvrat-klientov": ["src/app/vozvrat-klientov", "src/lib/content.ts"],
    "/demo": ["src/app/demo", "src/components/demo"],
    "/start": ["src/app/start", "src/components/start"],
    "/dlya-turagentstv": ["src/app/dlya-turagentstv"],
    "/dlya-turoperatorov": ["src/app/dlya-turoperatorov"],
    "/dlya-setey-agentstv": ["src/app/dlya-setey-agentstv"],
    "/integraciya-tourvisor": ["src/app/integraciya-tourvisor"],
    "/keisy/mgp": ["src/app/keisy/mgp"],
    "/blog": ["content/blog", "src/app/blog/page.tsx"],
    "/voprosy": ["src/app/voprosy"],
    "/o-komande": ["src/app/o-komande"],
    "/faq": ["src/app/faq", "src/lib/content.ts"],
    "/dashboard": ["src/app/dashboard", "src/components/dashboard"],
    "/prognozy": ["src/app/prognozy", "src/components/forecast"],
    "/vidzhet": ["src/app/vidzhet/page.tsx", "src/lib/seo/platform-pages.ts"],
    "/vidzhet/*": ["src/app/vidzhet/[slug]", "src/lib/seo/platform-pages.ts"],
    "/resheniya": ["src/app/resheniya/page.tsx", "src/lib/seo/scenario-pages.ts"],
    "/resheniya/*": ["src/app/resheniya/[slug]", "src/lib/seo/scenario-pages.ts"],
    "/spros": ["src/app/spros/page.tsx", "src/lib/seo/demand-pages.ts"],
    "/spros/*": ["src/app/spros/[slug]", "src/lib/seo/demand-pages.ts"],
    "/karta-sayta": ["src/app/karta-sayta"],
    "/privacy": ["src/app/privacy"],
}

# Что считать «содержанием» для даты в шапке llms.txt.
LLMS_SOURCES = ["public/llms.txt", "public/llms-full.txt", "src/lib/content.ts", "content/blog"]


def git_date(paths: list[str]) -> str | None:
    """Дата (YYYY-MM-DD) последнего коммита, затронувшего любой из путей."""
    existing = [p for p in paths if (ROOT / p).exists()]
    if not existing:
        return None
    try:
        out = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", *existing],
            cwd=ROOT, capture_output=True, text=True, check=True,
        ).stdout.strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None
    return out or None


def main() -> int:
    if subprocess.run(["git", "rev-parse", "--git-dir"], cwd=ROOT,
                      capture_output=True).returncode != 0:
        print("gen-lastmod: git недоступен, оставляю прежний lastmod.json")
        return 0

    result: dict[str, str] = {}
    for route, paths in ROUTES.items():
        d = git_date(paths)
        if d:
            result[route] = d

    if not result:
        print("gen-lastmod: git не вернул дат, файл не тронут")
        return 0

    OUT.parent.mkdir(parents=True, exist_ok=True)
    new_json = json.dumps(result, ensure_ascii=False, indent=2, sort_keys=True) + "\n"
    if not OUT.exists() or OUT.read_text(encoding="utf-8") != new_json:
        OUT.write_text(new_json, encoding="utf-8")
        print(f"gen-lastmod: обновлён {OUT.relative_to(ROOT)} ({len(result)} маршрутов)")
    else:
        print("gen-lastmod: lastmod.json актуален")

    # Строка «Обновлено» в llms.txt — по дате последней правки контента.
    content_date = git_date(LLMS_SOURCES)
    if content_date:
        pat = re.compile(r"(<!-- Обновлено: )\d{4}-\d{2}-\d{2}")
        for f in LLMS:
            if not f.exists():
                continue
            text = f.read_text(encoding="utf-8")
            new_text, n = pat.subn(rf"\g<1>{content_date}", text, count=1)
            if n and new_text != text:
                f.write_text(new_text, encoding="utf-8")
                print(f"gen-lastmod: {f.name} → Обновлено: {content_date}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
