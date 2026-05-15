import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { MagneticButton } from "../lib/MagneticButton";
import { SplitText } from "../lib/Reveal";
import { useTheme } from "../lib/ThemeProvider";

const NIGHT_VIDEO =
  "https://cdn.coverr.co/videos/coverr-cocktail-bar-at-night-7068/1080p.mp4";
const DAY_VIDEO =
  "https://cdn.coverr.co/videos/coverr-grilling-meat-on-the-bbq-1572/1080p.mp4";

const NIGHT_POSTER =
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=2400&q=70";
const DAY_POSTER =
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=2400&q=70";

export function Hero() {
  const { mode } = useTheme();
  const isNight = mode === "night";

  // Parallax tilt for hero content
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 120, damping: 18 });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width - 0.5);
      my.set((e.clientY - r.top) / r.height - 0.5);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate min-h-[100svh] w-full overflow-hidden"
      style={{ background: "var(--bg-0)" }}
    >
      {/* Layer 1: Background video */}
      <div className="absolute inset-0 -z-10">
        <video
          key={isNight ? "night" : "day"}
          className="h-full w-full object-cover scale-[1.04]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={isNight ? NIGHT_POSTER : DAY_POSTER}
        >
          <source src={isNight ? NIGHT_VIDEO : DAY_VIDEO} type="video/mp4" />
        </video>

        {/* Masking gradients */}
        <div
          className="absolute inset-0"
          style={{
            background: isNight
              ? "linear-gradient(180deg, rgba(7,8,11,0.55) 0%, rgba(7,8,11,0.55) 40%, rgba(7,8,11,0.92) 100%)"
              : "linear-gradient(180deg, rgba(255,232,200,0.30) 0%, rgba(255,232,200,0.25) 40%, rgba(245,235,220,0.92) 100%)",
          }}
        />
        <div className="ambient" />
      </div>

      {/* Neon vignette frame */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 110%, rgba(255,0,127,0.18), transparent 60%), radial-gradient(80% 60% at 0% 0%, rgba(138,43,226,0.15), transparent 60%)",
        }}
      />

      {/* Vertical side markers */}
      <div className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 z-10">
        <div className="rotate-180 [writing-mode:vertical-rl] font-mono text-[10px] uppercase tracking-[0.32em] text-white/55">
          Адлер · Сириус · Старошкольная 27
        </div>
      </div>
      <div className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 z-10">
        <div className="[writing-mode:vertical-rl] font-mono text-[10px] uppercase tracking-[0.32em] text-white/55">
          {isNight ? "В эфире · 14:00 — 03:00" : "Открыто · 14:00 — 03:00"}
        </div>
      </div>

      {/* Content */}
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }}
        className="container-page relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-40 lg:pb-24"
      >
        <div className="max-w-[1100px]">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow text-white/70"
          >
            01 · {isNight ? "Гастробар & Караоке" : "Дневной гастробар"} · с 2021
          </motion.p>

          <h1 className="heading-display mt-6 text-[clamp(2.6rem,8.4vw,7.6rem)] text-white">
            <span className="block">
              <SplitText text={isNight ? "Днём — сочный" : "Сочный"} delay={0.25} />
            </span>
            <span className="block">
              <SplitText
                text={isNight ? "гастробар." : "гастробар"}
                delay={0.4}
                className="text-white"
              />
            </span>
            <span className="block">
              <SplitText
                text={isNight ? "Ночью — громкое" : "с видом на горы"}
                delay={0.55}
              />
            </span>
            <span className="block neon-text">
              <SplitText
                text={isNight ? "караоке." : "и авторский мангал."}
                delay={0.7}
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-[640px] text-balance text-base sm:text-lg leading-[1.6] text-white/75"
          >
            Двухуровневое пространство отдыха в самом сердце Сириуса. Терраса с
            видом на Кавказские горы, авторский мангал на углях и профессиональный
            караоке-звук до самого утра.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton className="neon-btn animate-pulseGlow" onClick={() => scrollTo("#booking")}>
              Забронировать стол
              <ArrowIcon />
            </MagneticButton>

            <MagneticButton className="ghost-btn" onClick={() => scrollTo("#menu")}>
              Открыть меню
            </MagneticButton>

            <div className="ml-2 hidden md:flex items-center gap-3 text-white/60">
              <Pulse />
              <span className="font-mono text-[11px] uppercase tracking-[0.24em]">
                Сейчас открыто
              </span>
            </div>
          </motion.div>
        </div>

        {/* Footer ticker */}
        <div
          className="mt-16 lg:mt-24 -mx-5 sm:-mx-8 lg:-mx-12 border-y py-3 overflow-hidden"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex animate-marquee gap-12 whitespace-nowrap font-display text-2xl sm:text-3xl tracking-[0.04em] text-white/80 will-change-transform">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex items-center gap-12">
                <Marquee />
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 text-white/60">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="font-mono text-[10px] uppercase tracking-[0.32em]"
        >
          ↓ Прокрутка
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Авторский мангал",
    "Кавказская кухня",
    "Караоке · 03:00",
    "Панорамная терраса",
    "Кальянная карта",
    "Live · DJ-сеты",
    "Старошкольная, 27",
  ];
  return (
    <>
      {items.map((t, i) => (
        <span key={i} className="flex items-center gap-12">
          <span>{t}</span>
          <span className="text-malina-500">✦</span>
        </span>
      ))}
    </>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Pulse() {
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      <span className="absolute inset-0 rounded-full bg-malina-500 opacity-80 animate-ping" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-malina-500" />
    </span>
  );
}

function scrollTo(hash: string) {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
