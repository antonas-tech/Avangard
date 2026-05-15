import { motion } from "framer-motion";
import { Reveal } from "../lib/Reveal";
import { AudioVisualizer } from "./AudioVisualizer";
import { useTheme } from "../lib/ThemeProvider";

const SCHEDULE = [
  { d: "Воскресенье — Четверг", h: "14:00 — 02:00" },
  { d: "Пятница — Суббота",      h: "14:00 — 03:00" },
];

const FEATURES = [
  {
    title: "Звук",
    body: "Pioneer DJM, Dynacord, цифровые процессоры. Чистый вокал без задержек.",
  },
  {
    title: "Бэк-вокал",
    body: "Профессиональные вокалистки сопровождают самые ответственные хиты.",
  },
  {
    title: "Каталог",
    body: "Более 60 000 треков на 12 языках, регулярные обновления.",
  },
  {
    title: "Кальяны",
    body: "Авторские миксы на табаке премиум-класса. Холодная подача.",
  },
];

export function NightVibe() {
  const { mode } = useTheme();
  const isNight = mode === "night";

  return (
    <section
      id="night"
      className="relative isolate overflow-hidden py-28 lg:py-40"
      style={{
        background:
          "linear-gradient(180deg, var(--bg-1) 0%, var(--bg-0) 100%)",
      }}
    >
      <div className="ambient" />

      <div className="container-page relative z-10">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">04 · Ночной вайб</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="heading-display mt-4 text-[clamp(2rem,6vw,5rem)] max-w-[18ch]">
                Когда город <span className="neon-text">засыпает</span>, <br />
                <span className="text-malina-500">«Малина»</span> только просыпается.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[60ch] text-pretty text-base leading-[1.65] text-white/70">
                Профессиональные звуковые процессоры, бэк-вокал, огромный каталог
                треков и авторская кальянная карта. Атмосфера, в которой можно
                кричать любимый припев или шептать самые важные тосты.
              </p>
            </Reveal>
          </div>

          {/* Schedule card */}
          <Reveal delay={0.1}>
            <div className="glass-strong rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow">График работы</p>
                <span
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-soft))",
                    boxShadow: "0 0 16px rgba(255,0,127,0.45)",
                  }}
                >
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inset-0 rounded-full bg-white opacity-80 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  {isNight ? "В эфире" : "Работаем"}
                </span>
              </div>
              <ul className="mt-6 divide-y" style={{ borderColor: "var(--border)" }}>
                {SCHEDULE.map((s) => (
                  <li
                    key={s.d}
                    className="flex items-baseline justify-between gap-6 py-4"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <span className="text-white/80">{s.d}</span>
                    <span className="font-display text-3xl sm:text-4xl tracking-tight text-white tabular-nums">
                      {s.h}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                * последний заказ — за 30 мин до закрытия
              </p>
            </div>
          </Reveal>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-3xl p-6 glass"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-malina-500">
                / 0{i + 1}
              </div>
              <div className="mt-3 font-display text-2xl font-semibold tracking-tight text-white">
                {f.title}
              </div>
              <p className="mt-2 text-sm leading-[1.6] text-white/65">{f.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Visualizer */}
        <div
          className="relative mt-16 h-64 sm:h-72 lg:h-80 overflow-hidden rounded-3xl glass"
          style={{ background: "linear-gradient(180deg, rgba(7,8,11,0.4), rgba(7,8,11,0.0))" }}
        >
          <div className="absolute left-5 top-5 z-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/65">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-malina-500 animate-pulse" />
            Live · Audio Visualizer · двигайте курсор
          </div>
          <AudioVisualizer />
        </div>
      </div>
    </section>
  );
}
