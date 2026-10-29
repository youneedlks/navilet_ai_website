import { AbsoluteFill, Composition, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadManrope } from "@remotion/google-fonts/Manrope";
import HowItWorksScene, {
  HOW_IT_WORKS_DURATION,
  SCENE_H,
  SCENE_W,
} from "../../src/components/video/HowItWorksScene";
import HeroProScene, { HERO_PRO_DURATION, HERO_PRO_H, HERO_PRO_W } from "../../src/components/video/HeroProScene";
import ReqScene, { REQ_DURATION } from "../../src/components/video/ReqScene";
import LidScene, { LID_DURATION } from "../../src/components/video/LidScene";
import PodborkaScene, { PODBORKA_DURATION } from "../../src/components/video/PodborkaScene";
import { CabinetNarrowScene, CabinetWideScene, CABINET_DURATION, CABINET_NARROW, CABINET_WIDE } from "../../src/components/video/CabinetScene";
import type { SceneProps } from "../../src/components/video/widgetKit";
import ZayavkaScene, { ZAYAVKA_DURATION, ZAYAVKA_H, ZAYAVKA_W } from "../../src/components/video/ZayavkaScene";

// Те же шрифты, что на сайте (next/font: Inter и Manrope), с кириллицей.
loadInter("normal", { subsets: ["cyrillic", "latin"], weights: ["400", "500", "600", "700", "800"] });
loadManrope("normal", { subsets: ["cyrillic", "latin"], weights: ["600", "700", "800"] });

const FPS = 30;
const SCALE = 2; // 360×640 → 720×1280

const HowItWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#001229" }}>
      <div style={{ width: SCENE_W, height: SCENE_H, transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
        <HowItWorksScene t={frame / fps} Img={Img} />
      </div>
    </AbsoluteFill>
  );
};

const Zayavka: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#001229" }}>
      <div style={{ width: ZAYAVKA_W, height: ZAYAVKA_H, transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
        <ZayavkaScene t={frame / fps} />
      </div>
    </AbsoluteFill>
  );
};

// Логотипы берутся из public/ сайта: рендер запускается с --public-dir ../public.
const HeroPro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      <div style={{ width: HERO_PRO_W, height: HERO_PRO_H, transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
        <HeroProScene t={frame / fps} Img={Img} asset={(p) => staticFile(p.replace(/^\//, ""))} />
      </div>
    </AbsoluteFill>
  );
};

/** Обёртка для сцен с общими пропсами (картинки и файлы из public/). */
const wrap = (Scene: React.FC<SceneProps>, w: number, h: number): React.FC => {
  const C: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    return (
      <AbsoluteFill style={{ background: "#fff" }}>
        <div style={{ width: w, height: h, transform: `scale(${SCALE})`, transformOrigin: "top left" }}>
          <Scene t={frame / fps} Img={Img} asset={(p) => staticFile(p.replace(/^\//, ""))} />
        </div>
      </AbsoluteFill>
    );
  };
  return C;
};

const SCENES: { id: string; Scene: React.FC<SceneProps>; duration: number; w: number; h: number }[] = [
  { id: "Req", Scene: ReqScene, duration: REQ_DURATION, w: 400, h: 600 },
  { id: "Lid", Scene: LidScene, duration: LID_DURATION, w: 400, h: 600 },
  { id: "Podborka", Scene: PodborkaScene, duration: PODBORKA_DURATION, w: 400, h: 600 },
  { id: "CabinetWide", Scene: CabinetWideScene, duration: CABINET_DURATION, ...{ w: CABINET_WIDE.w, h: CABINET_WIDE.h } },
  { id: "CabinetNarrow", Scene: CabinetNarrowScene, duration: CABINET_DURATION, ...{ w: CABINET_NARROW.w, h: CABINET_NARROW.h } },
];

export const Root: React.FC = () => (
  <>
    {SCENES.map((s) => (
      <Composition
        key={s.id}
        id={s.id}
        component={wrap(s.Scene, s.w, s.h)}
        durationInFrames={Math.round(s.duration * FPS)}
        fps={FPS}
        width={s.w * SCALE}
        height={s.h * SCALE}
      />
    ))}
    <Composition
      id="HowItWorks"
      component={HowItWorks}
      durationInFrames={HOW_IT_WORKS_DURATION * FPS}
      fps={FPS}
      width={SCENE_W * SCALE}
      height={SCENE_H * SCALE}
    />
    <Composition
      id="HeroPro"
      component={HeroPro}
      durationInFrames={Math.round(HERO_PRO_DURATION * FPS)}
      fps={FPS}
      width={HERO_PRO_W * SCALE}
      height={HERO_PRO_H * SCALE}
    />
    <Composition
      id="Zayavka"
      component={Zayavka}
      durationInFrames={ZAYAVKA_DURATION * FPS}
      fps={FPS}
      width={ZAYAVKA_W * SCALE}
      height={ZAYAVKA_H * SCALE}
    />
  </>
);
