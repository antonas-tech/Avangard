import { Reveal } from "../lib/Reveal";

const COLS = [
  {
    title: "Каталог",
    links: [
      { label: "Кухонные коллекции", href: "#collections" },
      { label: "Гардеробные системы", href: "#collections" },
      { label: "Корпусная мебель", href: "#collections" },
      { label: "Индивидуальные проекты", href: "#footer" },
    ],
  },
  {
    title: "Студия",
    links: [
      { label: "Философия", href: "#philosophy" },
      { label: "Материалы", href: "#materials" },
      { label: "Производство", href: "#" },
      { label: "Журнал", href: "#" },
    ],
  },
  {
    title: "Контакты",
    links: [
      { label: "Москва — Шоурум", href: "#" },
      { label: "Санкт-Петербург", href: "#" },
      { label: "Запросить расчет", href: "#" },
      { label: "Стать партнером", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      id="footer"
      className="relative bg-forest-300 pt-24 text-sand-100 md:pt-32"
    >
      <div className="container-editorial">
        {/* Big headline */}
        <Reveal>
          <p className="eyebrow !text-sand-100/60">05 — Контакты</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-4xl font-serif text-[40px] font-light leading-[1.04] tracking-editorial sm:text-[56px] md:text-[80px]">
            Спроектируем
            <br />
            ваш <span className="italic text-sand-300/80">дом —</span> вместе.
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-12 gap-y-12 md:gap-x-10">
          <div className="col-span-12 md:col-span-5">
            <Reveal delay={0.1}>
              <p className="max-w-md text-[15px] leading-[1.7] text-sand-100/70">
                Запишитесь на&nbsp;консультацию в&nbsp;шоуруме —
                и&nbsp;мы&nbsp;соберем для вас сценарий пространства,
                подберем материалы и&nbsp;рассчитаем проект под ключ.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <a
                href="mailto:hello@avangard.studio"
                className="group inline-flex items-center gap-3 rounded-full border border-sand-100/30 bg-sand-100/5 px-7 py-3.5 text-[13px] font-medium text-sand-100 backdrop-blur-md transition-all duration-700 ease-apple hover:bg-sand-100 hover:text-forest-300"
              >
                <span>Написать нам</span>
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
              </a>
            </Reveal>
          </div>

          <div className="col-span-12 grid grid-cols-1 gap-10 sm:grid-cols-3 md:col-span-7">
            {COLS.map((col, i) => (
              <Reveal key={col.title} delay={0.1 + i * 0.06}>
                <div>
                  <h4 className="text-[12px] uppercase tracking-[0.28em] text-sand-100/60">
                    {col.title}
                  </h4>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="group inline-flex items-center gap-2 text-[14.5px] text-sand-100/85 transition-colors duration-500 ease-apple hover:text-sand-100"
                        >
                          <span className="border-b border-transparent transition-colors duration-500 ease-apple group-hover:border-sand-100">
                            {link.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Massive logotype */}
        <Reveal delay={0.2} className="mt-24 md:mt-32" amount={0.1}>
          <div className="overflow-hidden">
            <h3
              className="block w-full font-serif text-[20vw] font-light leading-[0.85] tracking-tightest text-sand-100"
              aria-hidden
            >
              avangard
            </h3>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-sand-100/15 py-8 text-[12px] text-sand-100/55 md:flex-row md:items-center">
          <p>© MMXXVI Мебельная компания «avangard». Сделано c вниманием.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-sand-100 transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-sand-100 transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-sand-100 transition-colors">
              Pinterest
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
