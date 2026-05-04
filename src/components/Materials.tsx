import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../lib/Reveal";

type Material = {
  index: string;
  name: string;
  description: string;
  visual: () => JSX.Element;
};

const MATERIALS: Material[] = [
  {
    index: "01",
    name: "Дуб дымчатый",
    description:
      "Шпон европейского дуба с&nbsp;брашировкой и&nbsp;натуральным маслом. Глубокая текстура, сдержанный благородный тон.",
    visual: WoodTexture,
  },
  {
    index: "02",
    name: "Calacatta Verde",
    description:
      "Итальянский кварцит с&nbsp;ониксовыми прожилками. Используется для столешниц и&nbsp;вертикальных панелей.",
    visual: StoneTexture,
  },
  {
    index: "03",
    name: "Латунь патинированная",
    description:
      "Ручная патинировка по&nbsp;листовой латуни. Применяется для ребер фасадов и&nbsp;скрытых ручек.",
    visual: BrassTexture,
  },
  {
    index: "04",
    name: "Замша песочная",
    description:
      "Мягкая европейская замша внутреннего исполнения. Создает тактильный контраст с&nbsp;камнем и&nbsp;латунью.",
    visual: FabricTexture,
  },
];

export function Materials() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Activate stage by stage. We compute discrete ranges per material.
  const total = MATERIALS.length;

  return (
    <section
      ref={sectionRef}
      id="materials"
      className="relative bg-sand-100"
      style={{ height: `${total * 110}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-stretch overflow-hidden">
        <div className="container-editorial grid w-full grid-cols-12 gap-y-10 py-24 md:gap-x-10">
          {/* Left — copy */}
          <div className="col-span-12 flex flex-col justify-between md:col-span-5">
            <div>
              <Reveal>
                <span className="eyebrow">04 — Материалы</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-5 heading-display text-[40px] leading-[1.02] sm:text-[52px] md:text-[64px]">
                  Материи, в&nbsp;которых
                  <span className="italic font-light text-forest-100">
                    {" "}
                    хочется жить.
                  </span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-8 max-w-md text-[15px] leading-[1.7] text-graphite-soft">
                  Мы&nbsp;работаем только с&nbsp;поставщиками, которые
                  отслеживают происхождение каждой партии. Дерево, камень,
                  металл и&nbsp;ткань&nbsp;— подобраны так, чтобы
                  стареть&nbsp;благородно.
                </p>
              </Reveal>
            </div>

            {/* Material list */}
            <ul className="mt-14 space-y-2 md:mt-0">
              {MATERIALS.map((m, i) => {
                const start = i / total;
                const end = (i + 1) / total;

                return (
                  <MaterialItem
                    key={m.index}
                    material={m}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                  />
                );
              })}
            </ul>
          </div>

          {/* Right — stacked visuals */}
          <div className="col-span-12 md:col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] bg-sand-200 shadow-soft md:aspect-auto md:h-[78vh]">
              {MATERIALS.map((m, i) => {
                const start = i / total;
                const end = (i + 1) / total;
                return (
                  <MaterialVisual
                    key={m.index}
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                    Visual={m.visual}
                    isLast={i === total - 1}
                    isFirst={i === 0}
                    label={`${m.index} · ${m.name}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type ProgressMV = ReturnType<typeof useScroll>["scrollYProgress"];

function MaterialItem({
  material,
  progress,
  start,
  end,
}: {
  material: Material;
  progress: ProgressMV;
  start: number;
  end: number;
}) {
  const opacity = useTransform(
    progress,
    [start - 0.05, start, end, end + 0.05],
    [0.4, 1, 1, 0.4]
  );
  const lineWidth = useTransform(progress, [start, end], ["0%", "100%"]);

  return (
    <li className="border-t border-forest-300/15 py-5">
      <motion.div style={{ opacity }} className="flex items-baseline gap-6">
        <span className="font-serif text-[15px] text-forest-300">
          {material.index}
        </span>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-[22px] tracking-editorial text-forest-300 md:text-[26px]">
              {material.name}
            </h3>
            <div className="ml-6 hidden h-px w-32 overflow-hidden bg-forest-300/15 md:block">
              <motion.div
                style={{ width: lineWidth }}
                className="h-full bg-forest-300"
              />
            </div>
          </div>
          <p
            className="mt-2 max-w-md text-[14px] leading-[1.65] text-graphite-soft"
            dangerouslySetInnerHTML={{ __html: material.description }}
          />
        </div>
      </motion.div>
    </li>
  );
}

function MaterialVisual({
  progress,
  start,
  end,
  Visual,
  isLast,
  isFirst,
  label,
}: {
  progress: ProgressMV;
  start: number;
  end: number;
  Visual: () => JSX.Element;
  isLast: boolean;
  isFirst: boolean;
  label: string;
}) {
  // Crossfade with a slight zoom — physically grounded.
  const fadeIn = isFirst ? 0 : start - 0.06;
  const fadeOut = isLast ? 1 : end + 0.06;

  const opacity = useTransform(
    progress,
    [fadeIn - 0.02, start, end, fadeOut + 0.02],
    [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [fadeIn, fadeOut], [1.06, 1]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 will-change-transform"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <Visual />
      </motion.div>
      <span className="absolute bottom-6 left-6 text-[11px] uppercase tracking-[0.32em] text-sand-100/85 md:bottom-8 md:left-8">
        {label}
      </span>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- */
/* Texture visuals                                                   */
/* ---------------------------------------------------------------- */
function WoodTexture() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#9C8364_0%,#6B543A_100%)]" />
      <div
        className="absolute inset-0 mix-blend-overlay opacity-70"
        style={{
          backgroundImage: `repeating-linear-gradient(180deg, rgba(0,0,0,0.18) 0 1px, transparent 1px 6px),
            repeating-linear-gradient(178deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 9px)`,
        }}
      />
      <div
        className="absolute inset-0 mix-blend-multiply opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(60% 30% at 30% 40%, rgba(0,0,0,0.35), transparent 70%), radial-gradient(40% 25% at 70% 70%, rgba(0,0,0,0.3), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_100%,transparent_55%,rgba(28,28,28,0.4)_100%)]" />
    </div>
  );
}

function StoneTexture() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#E8E5DA_0%,#C8CCBA_60%,#9CA88A_100%)]" />
      <svg
        className="absolute inset-0 h-full w-full opacity-70 mix-blend-multiply"
        viewBox="0 0 400 500"
        preserveAspectRatio="none"
      >
        <g stroke="#3a4a3a" strokeWidth="0.6" fill="none" opacity="0.5">
          <path d="M0,120 C80,80 180,170 260,90 C320,30 380,140 400,100" />
          <path d="M0,200 C100,260 200,180 300,250 C360,290 380,220 400,260" />
          <path d="M20,360 C100,300 200,400 300,340 C360,310 380,380 400,360" />
          <path d="M0,420 C120,460 200,380 320,440" />
          <path d="M40,60 C140,40 220,100 320,60" />
        </g>
        <g stroke="#5b6a5b" strokeWidth="0.4" fill="none" opacity="0.4">
          <path d="M0,160 C90,110 200,200 280,130" />
          <path d="M0,300 C100,330 200,260 320,310" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_100%,transparent_60%,rgba(28,28,28,0.3)_100%)]" />
    </div>
  );
}

function BrassTexture() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #C9A270 0%, #E2BF8C 30%, #B58346 65%, #8E6432 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(255,255,255,0.25) 0 1px, transparent 1px 4px)",
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(50% 40% at 30% 30%, rgba(255,235,200,0.45), transparent 70%), radial-gradient(40% 30% at 70% 80%, rgba(80,50,20,0.4), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_100%,transparent_60%,rgba(28,28,28,0.35)_100%)]" />
    </div>
  );
}

function FabricTexture() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#D6C4A6_0%,#B59E78_100%)]" />
      <div
        className="absolute inset-0 mix-blend-multiply opacity-50"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.07) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.07) 0 1px, transparent 1px 3px)",
        }}
      />
      <div
        className="absolute inset-0 mix-blend-overlay opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 30% 30%, rgba(255,255,255,0.4), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_100%,transparent_60%,rgba(28,28,28,0.3)_100%)]" />
    </div>
  );
}
