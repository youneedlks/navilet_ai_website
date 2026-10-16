import { ClipboardList, Cpu, Zap } from "lucide-react";
import type { AssistantVersionId } from "./content";

/**
 * Иконки версий на весь сайт: «Заявка» — планшет со списком (собирает запрос),
 * «Лид» — молния (быстрый сбор заявок), «Про» — процессор (полноценный ИИ-инструмент менеджера).
 * Держим здесь, чтобы иконки не разъезжались между демо, тарифами и /versii.
 */
export const versionIcons: Record<AssistantVersionId, typeof Zap> = {
  req: ClipboardList,
  lid: Zap,
  pro: Cpu,
};
