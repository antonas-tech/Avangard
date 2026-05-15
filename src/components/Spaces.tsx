import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "../lib/Reveal";

type Floor = {
  index: string;
  title: string;
  kicker: string;
  desc: string;
  features: string[];
  img: string;
};

const FLOORS: Floor[] = [
  {
    index: "01",
    title: "Эпицентр событий",
    kicker: "1-й этаж · Караоке-лаундж",
    desc: "Профессиональная звуковая система Pioneer, бэк-вокалисты, мягкие диваны, контактный бар и диджей-сеты по выходным. Здесь зарождаются истории, которые рассказывают друзьям.",
    features: ["Pioneer · Dynacord", "Бэк-вокал", "Контактный бар", "DJ Friday & Saturday"],
    img: "https://images.unsplash.com/photo-1571266028243-d220c6a3f1ad?auto=format&fit=crop&w=1600&q=70",
  },
  {
    index: "02",
    title: "Панорамная терраса",
    kicker: "2-й этаж · Chill & View",
    desc: "Открытая веранда с видом на Кавказские горы и Олимпийский парк. Морской бриз, ламповый свет, авторский мангал и тихие вечера под акустические сеты.",
    features: ["Вид на горы", "Мангал на углях", "Кальянная карта", "Chill playlists"],
    img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=70",
  },
];

export function Spaces() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Background parallax on the two floor images
  const yA = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section id="spaces" ref={ref} className="relative py-28 lg:py-40">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">02 · Пространство</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="heading-display mt-4 max-w-[18ch] text-[clamp(2rem,5.8vw,4.6rem)]">
            Двухуровневый <span className="text-malina-500">лаунж</span> в одном здании.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[58ch] text-pretty text-base leading-[1.65] text-white/70">
            Два настроения на одной локации. Кинематографичные интерьеры, выверенный
            свет и звук, выверенные виды. Каждый этаж — отдельный сценарий вечера.
          </p>
        </Reveal>
      </div>

      <div className="container-page mt-16 lg:mt-24 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FloorCard floor={FLOORS[0]} parallaxY={yA} side="left" />
        <FloorCard floor={FLOORS[1]} parallaxY={yB} side="right" />
      </div>
    </section>
  );
}

function FloorCard({
  floor,
  parallaxY,
  side,
}: {
  floor: Floor;
  parallaxY: ReturnType<typeof useTransform<number, string>>;
  side: "left" | "right";
}) {
  const [pt, setPt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setPt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };
  const onLeave = () => setPt({ x: 0, y: 0 });

  return (
    <Reveal delay={side === "left" ? 0.12 : 0.2}>
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="card group h-[560px] sm:h-[640px] lg:h-[720px]"
      >
        <motion.div
          className="absolute inset-0 -z-10"
          style={{ y: parallaxY }}
        >
          <motion.img
            src={floor.img}
            alt={floor.title}
            loading="lazy"
            className="h-full w-full scale-[1.08] object-cover"
            style={{
              transform: `translate3d(${pt.x * -22}px, ${pt.y * -22}px, 0) scale(1.08)`,
              transition: "transform 700ms cubic-bezier(0.16,1,0.3,1)",
            }}
          />
          <div
            className="absolute inset-0 group-hover:opacity-70 transition-opacity duration-700"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,8,11,0.20) 0%, rgba(7,8,11,0.55) 60%, rgba(7,8,11,0.92) 100%)",
            }}
          />
          <div className="absolute inset-0 backdrop-blur-[2px] group-hover:backdrop-blur-0 transition-[backdrop-filter] duration-700" />
        </motion.div>

        {/* Index badge */}
        <div className="absolute right-6 top-6 font-mono text-[11px] uppercase tracking-[0.32em] text-white/70">
          / {floor.index}
        </div>

        {/* Content */}
        <div className="relative h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-end">
          <p className="eyebrow text-white/70">{floor.kicker}</p>
          <h3 className="heading-display mt-3 text-3xl sm:text-4xl lg:text-5xl text-white">
            {floor.title}
          </h3>
          <p className="mt-4 max-w-[42ch] text-sm sm:text-base leading-[1.6] text-white/75">
            {floor.desc}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {floor.features.map((f) => (
              <li
                key={f}
                className="rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/85"
                style={{ borderColor: "var(--border-strong)", background: "var(--surface)" }}
              >
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Hover neon stroke */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(255,0,127,0.45), 0 0 36px rgba(255,0,127,0.25)",
          }}
        />
      </motion.div>
    </Reveal>
  );
}
