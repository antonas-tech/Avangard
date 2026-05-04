import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "../lib/MagneticButton";

const APPLE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle parallax on the visual block.
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-sand-100"
    >
      {/* Ambient gradient wash — extremely subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 10%, rgba(67,82,70,0.07), transparent 60%), radial-gradient(50% 50% at 10% 90%, rgba(214,207,191,0.45), transparent 70%)",
        }}
      />

      <div className="container-editorial relative flex min-h-[100svh] flex-col justify-end pb-16 pt-32 md:pb-24 md:pt-36">
        {/* Eyebrow row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: APPLE as unknown as number[], delay: 0.5 }}
          className="mb-10 flex items-center justify-between md:mb-14"
        >
          <div className="flex items-center gap-3">
            <span className="inline-block h-1 w-1 rounded-full bg-forest-300" />
            <span className="eyebrow">Мебельная мануфактура — с 2008</span>
          </div>
          <span className="hidden text-[11px] uppercase tracking-[0.32em] text-graphite-mute md:inline">
            Коллекция · MMXXVI
          </span>
        </motion.div>

        <div className="grid grid-cols-12 gap-y-10 md:gap-x-10">
          {/* Headline */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="col-span-12 lg:col-span-8"
          >
            <h1 className="heading-display text-[44px] sm:text-[64px] md:text-[96px] lg:text-[120px]">
              <RevealLine delay={0.15}>Искусство</RevealLine>
              <RevealLine delay={0.3} className="block italic font-light text-forest-100">
                в&nbsp;каждой
              </RevealLine>
              <RevealLine delay={0.45}>детали.</RevealLine>
            </h1>
          </motion.div>

          {/* Right column — meta + paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.1,
              ease: APPLE as unknown as number[],
              delay: 0.85,
            }}
            className="col-span-12 flex flex-col justify-end lg:col-span-4"
          >
            <p className="max-w-md text-pretty text-[15px] leading-[1.7] text-graphite-soft md:text-[16px]">
              Кухонные и корпусные модули, в&nbsp;которых геометрия,
              благородные материалы и&nbsp;инженерная точность складываются
              в&nbsp;тихую, уверенную форму.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <MagneticButton
                onClick={() => {
                  document
                    .getElementById("collections")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-3 rounded-full bg-forest-300 px-7 py-3.5 text-[13px] font-medium tracking-wide text-sand-100 transition-all duration-700 ease-apple hover:bg-forest-200"
              >
                <span>Смотреть коллекцию</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-700 ease-apple group-hover:translate-x-1"
                  aria-hidden
                >
                  <path
                    d="M1 7H13M13 7L7 1M13 7L7 13"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </MagneticButton>

              <a
                href="#philosophy"
                className="group text-[13px] font-medium tracking-wide text-forest-300"
              >
                <span className="border-b border-forest-300/40 pb-1 transition-colors duration-700 ease-apple group-hover:border-forest-300">
                  Философия бренда
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Visual block — large editorial image with parallax */}
        <motion.figure
          initial={{ opacity: 0, clipPath: "inset(8% 8% 8% 8% round 24px)" }}
          animate={{
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0% round 24px)",
          }}
          transition={{
            duration: 1.6,
            ease: APPLE as unknown as number[],
            delay: 1.0,
          }}
          className="relative mt-16 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-sand-200 md:mt-20"
        >
          <motion.div
            style={{ y: imgY, scale: imgScale }}
            className="absolute inset-0 will-change-transform"
          >
            <HeroVisual />
          </motion.div>

          {/* Caption */}
          <figcaption className="absolute bottom-5 left-6 right-6 flex items-end justify-between text-[11px] uppercase tracking-[0.3em] text-sand-100/85 md:bottom-7 md:left-8 md:right-8">
            <span>Кухня "Sereno" · Дуб дымчатый, латунь, камень</span>
            <span className="hidden md:inline">01 / 12</span>
          </figcaption>
        </motion.figure>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-12 flex items-center gap-3 text-[11px] uppercase tracking-[0.32em] text-graphite-mute"
        >
          <span className="relative inline-block h-7 w-px overflow-hidden">
            <motion.span
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-0 top-0 block h-full w-px bg-forest-300"
            />
          </span>
          <span>Прокрутка</span>
        </motion.div>
      </div>
    </section>
  );
}

function RevealLine({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`block overflow-hidden ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "110%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          duration: 1.2,
          ease: APPLE as unknown as number[],
          delay,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Editorial hero illustration — pure SVG/CSS art direction.
 * Suggests a green cabinet wall against a beige room.
 * Uses no external imagery so the bundle stays self-contained.
 */
function HeroVisual() {
  return (
    <div className="relative h-full w-full">
      {/* Floor + wall planes */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #EFEAE0 0%, #EFEAE0 62%, #DCD4C2 62%, #D2C9B5 100%)",
        }}
      />
      {/* Wall warm wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 50% 30%, rgba(255,247,232,0.5), transparent 60%)",
        }}
      />

      {/* Cabinet wall — green */}
      <div className="absolute bottom-[24%] left-[10%] right-[10%] top-[18%] grid grid-cols-6 gap-[2px] overflow-hidden rounded-[6px] bg-forest-300 shadow-soft">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="relative bg-forest-200"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,0.04), inset 0 -40px 60px rgba(0,0,0,0.15)",
            }}
          >
            <span className="absolute left-1/2 top-1/2 block h-[3px] w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(232,219,184,0.85)]" />
          </div>
        ))}
      </div>

      {/* Countertop + island */}
      <div className="absolute bottom-[18%] left-[16%] right-[16%] h-[5%] rounded-[3px] bg-[#E4DBC7] shadow-[0_8px_24px_rgba(0,0,0,0.08)]" />
      <div
        className="absolute bottom-[6%] left-[28%] right-[28%] h-[14%] rounded-[6px] bg-forest-200 shadow-soft"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,255,255,0.05), transparent 30%)",
        }}
      />
      <div className="absolute bottom-[19.4%] left-[28%] right-[28%] h-[1.6%] rounded-sm bg-[#EAE0CB]" />

      {/* Pendant lamp */}
      <div className="absolute left-1/2 top-[10%] h-[8%] w-[1px] -translate-x-1/2 bg-graphite-mute/60" />
      <div className="absolute left-1/2 top-[18%] h-3 w-12 -translate-x-1/2 rounded-full bg-[#C9A270] shadow-md" />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 90%, transparent 60%, rgba(28,28,28,0.18) 100%)",
        }}
      />
    </div>
  );
}
