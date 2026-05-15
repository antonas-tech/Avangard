import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";
import { Reveal } from "../lib/Reveal";

type Dish = {
  id: string;
  name: string;
  price: number;
  desc: string;
  weight: string;
  img: string;
  tags?: string[];
  kbju: { k: number; b: number; f: number; u: number };
  views: string[];
};

type Category = {
  key: string;
  label: string;
  description: string;
  items: Dish[];
};

const CATEGORIES: Category[] = [
  {
    key: "grill",
    label: "Мангал & Мясо",
    description: "Огонь, угли, выдержанные стейки и шашлык по фирменному маринаду.",
    items: [
      {
        id: "shashlik",
        name: "Шашлык из бараньей корейки",
        price: 1290,
        desc: "Молодая баранина, маринад на минеральной воде с тимьяном, угли вишни. Подаётся с лавашом, ткемали и красным луком.",
        weight: "240 / 60 г",
        tags: ["Хит", "На углях"],
        img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 412, b: 28, f: 32, u: 4 },
        views: [
          "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=70",
          "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=70",
          "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1200&q=70",
        ],
      },
      {
        id: "ribeye",
        name: "Рибай dry-aged",
        price: 2490,
        desc: "Выдержка 28 дней. Чёрный перец, морская соль, оливковое масло. Угольный гриль до medium rare.",
        weight: "320 г",
        tags: ["Стейк"],
        img: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 520, b: 42, f: 38, u: 1 },
        views: [
          "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=70",
          "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=1200&q=70",
        ],
      },
      {
        id: "lula",
        name: "Люля из ягнёнка",
        price: 890,
        desc: "Рубленая ягнятина, курдюк, кинза, лук. На шампуре, подача с гранатом и зирой.",
        weight: "220 г",
        img: "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 388, b: 24, f: 30, u: 3 },
        views: [
          "https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=1200&q=70",
        ],
      },
      {
        id: "chicken",
        name: "Корнский цыплёнок-табака",
        price: 1190,
        desc: "Под прессом на чугуне, чесночный соус и тёплая аджика.",
        weight: "450 г",
        img: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 410, b: 36, f: 28, u: 2 },
        views: [
          "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=1200&q=70",
        ],
      },
    ],
  },
  {
    key: "caucasus",
    label: "Кавказская кухня",
    description: "Хачапури с горным сыром, хинкали ручной лепки и густые жаркие супы.",
    items: [
      {
        id: "khachapuri",
        name: "Хачапури по-аджарски",
        price: 690,
        desc: "Имеретинский сыр, моцарелла, домашний сулугуни, желток и сливочное масло. В печи на каменной плите.",
        weight: "420 г",
        tags: ["Фирменное"],
        img: "https://images.unsplash.com/photo-1601001815853-3835274403b3?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 612, b: 28, f: 36, u: 42 },
        views: [
          "https://images.unsplash.com/photo-1601001815853-3835274403b3?auto=format&fit=crop&w=1200&q=70",
        ],
      },
      {
        id: "khinkali",
        name: "Хинкали с телятиной",
        price: 590,
        desc: "Ручная лепка, бульон внутри, чёрный перец и кинза. 5 штук.",
        weight: "5 шт · 320 г",
        img: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 410, b: 22, f: 20, u: 36 },
        views: [
          "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=1200&q=70",
        ],
      },
      {
        id: "kharcho",
        name: "Харчо из говядины",
        price: 490,
        desc: "Грецкий орех, рис, ткемали и пряные травы. Густой, насыщенный.",
        weight: "350 мл",
        img: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 280, b: 18, f: 14, u: 22 },
        views: [
          "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=70",
        ],
      },
      {
        id: "dolma",
        name: "Долма в виноградных листьях",
        price: 590,
        desc: "Молодая баранина, длинный рис, кинза, мята. Соус мацони с чесноком.",
        weight: "260 г",
        img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 318, b: 18, f: 16, u: 26 },
        views: [
          "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1200&q=70",
        ],
      },
    ],
  },
  {
    key: "europe",
    label: "Европейская кухня",
    description: "От паназиатских хитов до итальянской пасты и крафтовых бургеров.",
    items: [
      {
        id: "tomyum",
        name: "Том-Ям с тигровыми креветками",
        price: 890,
        desc: "Кокосовое молоко, лемонграсс, лайм, чили. Подача с тайским рисом.",
        weight: "450 мл",
        img: "https://images.unsplash.com/photo-1547928576-b822bc410bdf?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 320, b: 22, f: 18, u: 18 },
        views: [
          "https://images.unsplash.com/photo-1547928576-b822bc410bdf?auto=format&fit=crop&w=1200&q=70",
        ],
      },
      {
        id: "burger",
        name: "Бургер «Малина» с томлёной грудинкой",
        price: 790,
        desc: "Булочка-бриошь, мраморная говядина, чеддер, бекон, малиновый барбекю.",
        weight: "380 г",
        tags: ["Крафт"],
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 720, b: 38, f: 42, u: 48 },
        views: [
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=70",
        ],
      },
      {
        id: "pasta",
        name: "Тальятелле с белыми грибами",
        price: 690,
        desc: "Сливочный соус, трюфельное масло, пармезан 24 месяца.",
        weight: "320 г",
        img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 540, b: 18, f: 28, u: 56 },
        views: [
          "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=70",
        ],
      },
      {
        id: "salmon",
        name: "Лосось на гриле",
        price: 1490,
        desc: "Спаржа, лимон, оливковое масло, морская соль Maldon.",
        weight: "220 / 80 г",
        img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 380, b: 36, f: 22, u: 6 },
        views: [
          "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=70",
        ],
      },
    ],
  },
  {
    key: "bar",
    label: "Авторский бар",
    description: "Коктейли от шеф-бартендера, свежие фрукты, выдержанный виски и игристое.",
    items: [
      {
        id: "raspberry",
        name: "Малиновый Smash",
        price: 690,
        desc: "Текила бланко, малина, лайм, базилик, тоник Fever-Tree.",
        weight: "220 мл",
        tags: ["Авторский"],
        img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 180, b: 0, f: 0, u: 14 },
        views: [
          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=70",
        ],
      },
      {
        id: "negroni",
        name: "Negroni Sbagliato",
        price: 590,
        desc: "Кампари, мартини россо, просекко, цедра апельсина.",
        weight: "180 мл",
        img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 160, b: 0, f: 0, u: 10 },
        views: [
          "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=70",
        ],
      },
      {
        id: "violet",
        name: "Violet Karaoke",
        price: 750,
        desc: "Джин, ликёр фиалки, ягодный кордиал, цитрусовый дым.",
        weight: "200 мл",
        tags: ["Ночной"],
        img: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 200, b: 0, f: 0, u: 12 },
        views: [
          "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=70",
        ],
      },
      {
        id: "espresso",
        name: "Espresso Martini",
        price: 690,
        desc: "Водка, кофейный ликёр Kahlúa, свежий эспрессо, пенка.",
        weight: "120 мл",
        img: "https://images.unsplash.com/photo-1606767380385-4cd1ca8d4adf?auto=format&fit=crop&w=1200&q=70",
        kbju: { k: 220, b: 0, f: 0, u: 16 },
        views: [
          "https://images.unsplash.com/photo-1606767380385-4cd1ca8d4adf?auto=format&fit=crop&w=1200&q=70",
        ],
      },
    ],
  },
];

export function Menu() {
  const [active, setActive] = useState(CATEGORIES[0].key);
  const [openDish, setOpenDish] = useState<Dish | null>(null);
  const current = CATEGORIES.find((c) => c.key === active)!;

  return (
    <section id="menu" className="relative py-28 lg:py-40">
      <div className="container-page">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">03 · Гастрономия</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="heading-display mt-4 text-[clamp(2rem,5.8vw,4.6rem)] max-w-[22ch]">
                Меню как <span className="text-malina-500">плейлист</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[60ch] text-pretty text-base leading-[1.65] text-white/70">
                Четыре главы одного вечера: огонь и угли, кавказские классики,
                европейские хиты и авторский бар. Переключайте без перезагрузки.
              </p>
            </Reveal>
          </div>

          {/* Category tabs */}
          <LayoutGroup id="menu-tabs">
            <div className="relative flex flex-wrap gap-2 self-start lg:self-end glass rounded-full p-1.5">
              {CATEGORIES.map((c) => {
                const isActive = c.key === active;
                return (
                  <button
                    key={c.key}
                    onClick={() => setActive(c.key)}
                    className={`relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300
                      ${isActive ? "text-white" : "text-white/65 hover:text-white"}
                    `}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="menu-pill"
                        transition={{ type: "spring", stiffness: 340, damping: 30 }}
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--accent), var(--accent-soft))",
                          boxShadow: "0 0 18px rgba(255,0,127,0.45)",
                        }}
                      />
                    )}
                    <span className="relative z-10">{c.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-[58ch] text-white/70 leading-[1.6]">
            {current.description}
          </p>
        </Reveal>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {current.items.map((d, i) => (
              <DishCard key={d.id} dish={d} idx={i} onOpen={() => setOpenDish(d)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {openDish && <DishModal dish={openDish} onClose={() => setOpenDish(null)} />}
      </AnimatePresence>
    </section>
  );
}

function DishCard({ dish, idx, onOpen }: { dish: Dish; idx: number; onOpen: () => void }) {
  const [pt, setPt] = useState({ x: 0, y: 0 });

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
        setPt({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
      }}
      onMouseLeave={() => setPt({ x: 0, y: 0 })}
      className="card group text-left flex flex-col h-full"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={dish.img}
          alt={dish.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
          style={{
            transform: `translate3d(${pt.x * -18}px, ${pt.y * -18}px, 0) scale(1.06)`,
          }}
        />
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
          style={{
            background: "linear-gradient(180deg, rgba(7,8,11,0.05) 0%, rgba(7,8,11,0.5) 100%)",
            backdropFilter: "blur(2px)",
          }}
        />
        {dish.tags && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {dish.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-malina-500/90 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-white"
                style={{ boxShadow: "0 0 14px rgba(255,0,127,0.45)" }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight text-white">
            {dish.name}
          </h3>
          <span className="font-mono text-[12px] tabular-nums text-white/85 whitespace-nowrap">
            {dish.price.toLocaleString("ru-RU")} ₽
          </span>
        </div>
        <p className="text-sm leading-[1.55] text-white/65 line-clamp-2">{dish.desc}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
            {dish.weight}
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.22em] text-malina-500 group-hover:text-white transition-colors">
            Подробнее
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round"/></svg>
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function DishModal({ dish, onClose }: { dish: Dish; onClose: () => void }) {
  const [activeView, setActiveView] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[60] grid place-items-center p-4"
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        style={{
          background:
            "radial-gradient(80% 60% at 50% 30%, rgba(255,0,127,0.18), transparent 65%), rgba(7,8,11,0.78)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      />
      <motion.div
        initial={{ y: 32, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 16, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl overflow-hidden rounded-[28px] glass-strong"
      >
        <button
          aria-label="Закрыть"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 h-10 w-10 rounded-full glass grid place-items-center text-white hover:text-malina-500 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round"/></svg>
        </button>

        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeView}
                src={dish.views[activeView]}
                alt={dish.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            {dish.views.length > 1 && (
              <div className="absolute bottom-4 left-4 flex gap-2">
                {dish.views.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveView(i)}
                    aria-label={`Фото ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === activeView ? "w-8 bg-malina-500" : "w-4 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="p-7 lg:p-10 flex flex-col gap-5">
            <p className="eyebrow">Авторская подача</p>
            <h3 className="heading-display text-3xl lg:text-4xl text-white">{dish.name}</h3>
            <p className="text-white/75 leading-[1.65]">{dish.desc}</p>

            <div className="grid grid-cols-4 gap-3 mt-2">
              {[
                { k: "ккал", v: dish.kbju.k },
                { k: "белки", v: dish.kbju.b },
                { k: "жиры", v: dish.kbju.f },
                { k: "углев.", v: dish.kbju.u },
              ].map((m) => (
                <div
                  key={m.k}
                  className="rounded-2xl p-3 text-center"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
                >
                  <div className="font-display text-xl font-bold tabular-nums text-white">
                    {m.v}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                    {m.k}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto flex items-end justify-between pt-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                  Вес / объём
                </div>
                <div className="text-white/85">{dish.weight}</div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                  Стоимость
                </div>
                <div className="font-display text-3xl font-bold text-white tabular-nums">
                  {dish.price.toLocaleString("ru-RU")} ₽
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
