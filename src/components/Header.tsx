import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { DayNightToggle } from "./DayNightToggle";

const NAV = [
  { href: "#spaces", label: "Пространство" },
  { href: "#menu", label: "Меню" },
  { href: "#night", label: "Ночной вайб" },
  { href: "#booking", label: "Бронь" },
  { href: "#contact", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="container-page">
        <div
          className={`flex items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${scrolled ? "glass-strong shadow-glass" : "glass"}
          `}
          style={{ borderColor: "var(--border)" }}
        >
          <a href="#top" className="pl-2 pr-1 py-1 rounded-full">
            <Logo />
          </a>

          <nav className="hidden lg:flex items-center gap-1 text-[12px]">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative group rounded-full px-3.5 py-2 font-mono uppercase tracking-[0.22em] text-white/70 hover:text-white transition-colors"
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,0,127,0.18), rgba(138,43,226,0.18))",
                  }}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="tel:+79180010306"
              className="hidden md:inline-flex font-mono text-[11px] tracking-[0.22em] uppercase text-white/80 hover:text-white px-3"
            >
              +7 918 001-03-06
            </a>
            <DayNightToggle />
            <button
              type="button"
              aria-label="Открыть меню"
              onClick={() => setOpen(true)}
              className="lg:hidden ml-1 h-10 w-10 grid place-items-center rounded-full glass"
              style={{ borderColor: "var(--border-strong)" }}
            >
              <BurgerIcon />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(80% 60% at 50% 0%, rgba(255,0,127,0.18), transparent 70%), rgba(7,8,11,0.85)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-4 top-24 rounded-3xl p-6 glass-strong"
            >
              <div className="flex items-center justify-between mb-6">
                <Logo />
                <button
                  aria-label="Закрыть"
                  onClick={() => setOpen(false)}
                  className="h-10 w-10 grid place-items-center rounded-full glass"
                >
                  <CloseIcon />
                </button>
              </div>
              <ul className="flex flex-col gap-1">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block py-3 font-display text-3xl tracking-tight text-white"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                <a href="tel:+79180010306" className="neon-btn">
                  Позвонить · +7 918 001-03-06
                </a>
                <DayNightToggle />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function BurgerIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
