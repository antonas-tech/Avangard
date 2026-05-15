import { motion } from "framer-motion";
import { useTheme } from "../lib/ThemeProvider";

/**
 * Bold custom Day / Night switch with two labels and a sliding pill.
 * Triggers a radial wipe transition from the click origin.
 */
export function DayNightToggle({ compact = false }: { compact?: boolean }) {
  const { mode, toggle } = useTheme();
  const isNight = mode === "night";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggle({ x: e.clientX, y: e.clientY });
  };

  return (
    <button
      onClick={handleClick}
      aria-label={`Переключить режим. Сейчас: ${isNight ? "ночь" : "день"}`}
      className={`relative inline-flex items-center select-none rounded-full border transition-colors duration-500
        ${compact ? "h-9 p-1" : "h-11 p-1.5"}
        glass
      `}
      style={{ borderColor: "var(--border-strong)" }}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className={`absolute top-1 ${compact ? "h-7" : "h-8"} rounded-full`}
        style={{
          left: isNight ? "calc(50% + 2px)" : "4px",
          width: "calc(50% - 6px)",
          background:
            "linear-gradient(135deg, var(--accent), var(--accent-soft))",
          boxShadow: "0 0 16px var(--accent-glow)",
        }}
      />
      <span
        className={`relative z-10 flex items-center gap-1.5 px-3 font-mono uppercase tracking-[0.22em]
          ${compact ? "text-[10px]" : "text-[11px]"}
          ${!isNight ? "text-white" : "text-white/70"}`}
      >
        <SunIcon className="h-3.5 w-3.5" /> День
      </span>
      <span
        className={`relative z-10 flex items-center gap-1.5 px-3 font-mono uppercase tracking-[0.22em]
          ${compact ? "text-[10px]" : "text-[11px]"}
          ${isNight ? "text-white" : "text-white/70"}`}
      >
        <MoonIcon className="h-3.5 w-3.5" /> Ночь
      </span>
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M21 12.5A8.5 8.5 0 0 1 11.5 3a7 7 0 1 0 9.5 9.5z" strokeLinejoin="round" />
    </svg>
  );
}
