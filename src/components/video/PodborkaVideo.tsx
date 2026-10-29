"use client";

import { podborkiSteps } from "@/lib/content";
import SceneSteps from "@/components/video/SceneSteps";
import PodborkaScene, { PODBORKA_DURATION, podborkaStage } from "@/components/video/PodborkaScene";
import { WIDGET_H, WIDGET_W } from "@/components/video/widgetKit";

/** /podborki: три шага из content.ts и ролик о том, как подборка доходит до семьи туриста. */
export default function PodborkaVideo() {
  return (
    <SceneSteps
      Scene={PodborkaScene}
      duration={PODBORKA_DURATION}
      stage={podborkaStage}
      steps={podborkiSteps}
      width={WIDGET_W}
      height={WIDGET_H}
      stillAt={15}
      label="Пример: ассистент показывает три тура, турист нажимает «Поделиться» и отправляет ссылку в семейный чат, родные открывают страницу подборки под брендом агентства, смотрят отель и перелёт и бронируют, а агентство видит в кабинете, что подборку открыли."
    />
  );
}
