"use client";

import { useEffect } from "react";

/**
 * Ссылка с якорем на свёрнутый блок (<details id="…">, например /tarify#opcii)
 * раскрывает его и прокручивает к нему. Chrome делает это сам не всегда, Safari — нет.
 */
export default function OpenDetailsOnHash() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = document.getElementById(id);
      const details = el?.tagName === "DETAILS" ? (el as HTMLDetailsElement) : el?.closest("details");
      if (!details) return;
      details.open = true;
      el?.scrollIntoView({ block: "start" });
    };
    open();
    window.addEventListener("hashchange", open);
    return () => window.removeEventListener("hashchange", open);
  }, []);
  return null;
}
