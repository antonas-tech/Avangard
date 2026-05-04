import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../lib/Reveal";

type Item = {
  index: string;
  title: string;
  category: string;
  description: string;
  visual: "kitchen-sereno" | "wardrobe-noir" | "console-piana" | "kitchen-bosco" | "shelf-quadro";
};

const ITEMS: Item[] = [
  {
    index: "01",
    title: "Sereno",
    category: "Кухонная коллекция",
    description: "Дуб дымчатый, кварцит Calacatta Verde, латунные вставки.",
    visual: "kitchen-sereno",
  },
  {
    index: "02",
    title: "Noir",
    category: "Гардеробная система",
    description: "Эбеновый шпон, замша, фурнитура с мягким закрытием.",
    visual: "wardrobe-noir",
  },
  {
    index: "03",
    title: "Piana",
    category: "Консоль",
    description: "Травертин, орех американский, ручная полировка.",
    visual: "console-piana",
  },
  {
    index: "04",
    title: "Bosco",
    category: "Кухонная коллекция",
    description: "Массив ясеня, патинированная латунь, керамогранит.",
    visual: "kitchen-bosco",
  },
  {
    index: "05",
    title: "Quadro",
    category: "Корпусная серия",
    description: "Модульные стеллажи: ясень, стекло бронза, латунные ребра.",
    visual: "shelf-quadro",
  },
];

export function Collections() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Translate the horizontal track based on vertical scroll progress.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Card width: ~78vw mobile, ~36vw desktop. Total track width is calculated via CSS.
  // We translate by (track width - viewport width) using percentage math.
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);

  return (
    <section
      id="collections"
      ref={sectionRef}
      className="relative bg-sand-200"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="container-editorial pt-24 md:pt-28">
          <div className="flex items-end justify-between">
            <div>
              <Reveal>
                <span className="eyebrow">03 — Коллекции</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-5 heading-display text-[40px] leading-[1.02] sm:text-[56px] md:text-[80px]">
                  Тихая <span className="italic font-light text-forest-100">роскошь</span>
                  <br />в каждом модуле.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="hidden md:block">
              <p className="max-w-xs text-[14px] leading-[1.7] text-graphite-soft">
                Прокрутите ниже, чтобы пройти по&nbsp;коллекциям. Каждая
                спроектирована как отдельная сцена&nbsp;— но&nbsp;все они
                разговаривают на&nbsp;одном языке.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="relative mt-12 flex-1 overflow-hidden md:mt-16">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex h-full items-center gap-6 px-6 will-change-transform md:gap-10 md:px-16"
          >
            {ITEMS.map((item) => (
              <Card key={item.index} item={item} />
            ))}
            <div className="shrink-0 pr-10 md:pr-24">
              <a
                href="#footer"
                className="group inline-flex flex-col items-start"
              >
                <span className="font-serif text-[40px] leading-tight tracking-editorial text-forest-300 md:text-[56px]">
                  Запросить
                  <br />
                  каталог →
                </span>
                <span className="mt-4 inline-block h-px w-16 bg-forest-300 transition-all duration-700 ease-apple group-hover:w-32" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="container-editorial flex items-center justify-between pb-8 pt-6">
          <span className="text-[11px] uppercase tracking-[0.32em] text-graphite-mute">
            Прокрутите вниз
          </span>
          <Progress progress={scrollYProgress} />
          <span className="text-[11px] uppercase tracking-[0.32em] text-graphite-mute">
            05&nbsp;коллекций
          </span>
        </div>
      </div>
    </section>
  );
}

function Progress({ progress }: { progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="relative h-px w-1/2 overflow-hidden bg-forest-300/15">
      <motion.div
        style={{ width }}
        className="absolute left-0 top-0 h-full bg-forest-300"
      />
    </div>
  );
}

function Card({ item }: { item: Item }) {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-[68vh] w-[78vw] shrink-0 flex-col justify-end overflow-hidden rounded-[28px] bg-sand-100 shadow-[0_30px_60px_-30px_rgba(28,28,28,0.18)] sm:w-[58vw] md:w-[42vw] lg:w-[36vw]"
    >
      <div className="absolute inset-0">
        <CardVisual variant={item.visual} />
      </div>

      <div className="relative z-10 flex items-end justify-between gap-6 p-7 md:p-9">
        <div className="text-sand-100">
          <span className="font-serif text-[12px] tracking-[0.2em] opacity-80">
            {item.index} · {item.category}
          </span>
          <h3 className="mt-2 font-serif text-[44px] leading-[1] tracking-editorial md:text-[56px]">
            {item.title}
          </h3>
          <p className="mt-3 max-w-sm text-[13px] leading-[1.7] text-sand-100/80">
            {item.description}
          </p>
        </div>
        <span className="hidden items-center justify-center rounded-full border border-sand-100/60 bg-sand-100/10 p-3 text-sand-100 backdrop-blur-md transition-transform duration-700 ease-apple group-hover:translate-x-1 group-hover:translate-y-[-1px] md:inline-flex">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
      </div>
    </motion.article>
  );
}

/* ---------------------------------------------------------------- */
/* Card visuals — pure CSS art so the bundle stays self-contained   */
/* ---------------------------------------------------------------- */
function CardVisual({ variant }: { variant: Item["visual"] }) {
  switch (variant) {
    case "kitchen-sereno":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#EFEAE0_0%,#EFEAE0_60%,#D2C9B5_100%)]" />
          <div className="absolute left-[8%] right-[8%] top-[14%] h-[58%] rounded-md bg-forest-300 shadow-soft">
            <div className="grid h-full grid-cols-5 gap-[2px] p-[2px]">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[2px] bg-forest-200"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 -28px 40px rgba(0,0,0,0.18)",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-[18%] left-[14%] right-[14%] h-[3%] rounded-sm bg-[#EAE0CB]" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_100%,transparent_55%,rgba(28,28,28,0.4)_100%)]" />
        </div>
      );
    case "wardrobe-noir":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#1C1C1C_0%,#2B2B2B_100%)]" />
          <div className="absolute left-[10%] right-[10%] top-[10%] bottom-[20%] grid grid-cols-3 gap-[2px] rounded-sm bg-[#0F0F0F]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="relative bg-[#2A2622]"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255,255,255,0.05), transparent 35%), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 2px, transparent 2px 18px)",
                }}
              >
                <span className="absolute left-1/2 top-1/2 block h-[2px] w-8 -translate-x-1/2 -translate-y-1/2 rounded bg-[#C9A270]" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(140%_80%_at_50%_120%,transparent_55%,rgba(0,0,0,0.7)_100%)]" />
        </div>
      );
    case "console-piana":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#EDE5D2_0%,#D9CDB1_100%)]" />
          <div className="absolute bottom-[18%] left-[16%] right-[16%] h-[28%] rounded-md bg-[#7B5B3B] shadow-soft">
            <div className="absolute -top-[10px] left-0 right-0 h-3 rounded bg-[#E0D2B2]" />
            <div className="grid h-full grid-cols-2 gap-[2px] p-[2px]">
              <div className="rounded-sm bg-[#8C6A45]" />
              <div className="rounded-sm bg-[#8C6A45]" />
            </div>
          </div>
          <div className="absolute left-1/2 top-[18%] h-[34%] w-[28%] -translate-x-1/2 rounded-sm border border-forest-300/20 bg-sand-100/50" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_110%,transparent_55%,rgba(28,28,28,0.35)_100%)]" />
        </div>
      );
    case "kitchen-bosco":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#F1ECE0_0%,#D8CFB7_100%)]" />
          <div className="absolute left-[8%] right-[8%] top-[18%] h-[48%] rounded-sm bg-[#9D8666] shadow-soft">
            <div
              className="absolute inset-0 rounded-sm"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 14px)",
              }}
            />
            <div className="grid h-full grid-cols-4 gap-[2px] p-[2px]">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-[2px] bg-[#8B7556]"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1px rgba(255,255,255,0.05), inset 0 -28px 40px rgba(0,0,0,0.18)",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="absolute bottom-[20%] left-[14%] right-[14%] h-[3%] rounded-sm bg-[#3A3A36]" />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_110%,transparent_55%,rgba(28,28,28,0.35)_100%)]" />
        </div>
      );
    case "shelf-quadro":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#EFEAE0_0%,#D6CFBF_100%)]" />
          <div className="absolute left-[14%] right-[14%] top-[12%] bottom-[14%] grid grid-rows-4 gap-[3px] rounded-sm bg-[#CDBFA1] p-[3px]">
            {Array.from({ length: 4 }).map((_, r) => (
              <div key={r} className="grid grid-cols-4 gap-[3px]">
                {Array.from({ length: 4 }).map((_, c) => (
                  <div
                    key={c}
                    className="rounded-[2px]"
                    style={{
                      backgroundColor:
                        (r + c) % 2 === 0 ? "#B49C72" : "#C2A981",
                      boxShadow:
                        "inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 -10px 14px rgba(0,0,0,0.12)",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_110%,transparent_55%,rgba(28,28,28,0.35)_100%)]" />
        </div>
      );
  }
}
