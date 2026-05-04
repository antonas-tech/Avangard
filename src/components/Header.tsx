import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const NAV = [
  { label: "Коллекции", href: "#collections" },
  { label: "Философия", href: "#philosophy" },
  { label: "Материалы", href: "#materials" },
  { label: "Контакты", href: "#footer" },
];

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Background opacity grows as you scroll.
  const bgAlpha = useTransform(scrollY, [0, 120], [0, 0.72]);
  const borderAlpha = useTransform(scrollY, [0, 120], [0, 0.08]);

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 24));
    return () => unsub();
  }, [scrollY]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 backdrop-blur-xl"
        style={{
          backgroundColor: useTransform(
            bgAlpha,
            (a) => `rgba(249, 248, 246, ${a})`
          ),
          borderBottom: "1px solid",
          borderColor: useTransform(
            borderAlpha,
            (a) => `rgba(44, 61, 48, ${a})`
          ),
        }}
        aria-hidden
      />
      <div className="container-editorial relative flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="flex items-center gap-2 group">
          <Logo
            className={`h-7 w-7 transition-colors duration-700 ease-apple ${
              scrolled ? "text-forest-300" : "text-forest-300"
            }`}
          />
          <span className="font-serif text-[22px] tracking-editorial text-forest-300">
            avangard
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-[13px] font-medium tracking-wide text-graphite-soft"
            >
              <span className="transition-colors duration-500 ease-apple group-hover:text-forest-300">
                {item.label}
              </span>
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-forest-300 transition-transform duration-700 ease-apple group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a
          href="#footer"
          className="group hidden items-center gap-2 text-[13px] font-medium tracking-wide text-forest-300 md:inline-flex"
        >
          <span className="relative">
            <span className="transition-opacity duration-500 ease-apple group-hover:opacity-70">
              Связаться
            </span>
          </span>
          <span
            aria-hidden
            className="inline-block h-px w-6 bg-forest-300 transition-all duration-700 ease-apple group-hover:w-9"
          />
        </a>

        {/* Mobile lite-CTA */}
        <a
          href="#footer"
          className="text-[13px] font-medium text-forest-300 md:hidden"
        >
          Связаться
        </a>
      </div>
    </motion.header>
  );
}
