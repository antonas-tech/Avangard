import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Mode = "day" | "night";

type ThemeCtx = {
  mode: Mode;
  toggle: (origin?: { x: number; y: number }) => void;
  setMode: (m: Mode) => void;
};

const Ctx = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>(() => {
    if (typeof document === "undefined") return "night";
    const stored = window.localStorage?.getItem("malina-theme") as Mode | null;
    return stored ?? "night";
  });
  const wipeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.style.setProperty(
      "color-scheme",
      mode === "night" ? "dark" : "light"
    );
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", mode === "night" ? "#0B0C10" : "#FBF3E4");
    try {
      window.localStorage.setItem("malina-theme", mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  const setMode = useCallback((m: Mode) => setModeState(m), []);

  const toggle = useCallback(
    (origin?: { x: number; y: number }) => {
      const wipe = wipeRef.current;
      if (!wipe) {
        setModeState((m) => (m === "night" ? "day" : "night"));
        return;
      }
      const x = origin?.x ?? window.innerWidth / 2;
      const y = origin?.y ?? 80;
      wipe.style.setProperty("--wx", `${x}px`);
      wipe.style.setProperty("--wy", `${y}px`);
      wipe.classList.add("is-active");

      window.setTimeout(() => {
        setModeState((m) => (m === "night" ? "day" : "night"));
      }, 360);

      window.setTimeout(() => {
        wipe.classList.remove("is-active");
      }, 900);
    },
    []
  );

  const value = useMemo<ThemeCtx>(() => ({ mode, toggle, setMode }), [mode, toggle, setMode]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <div ref={wipeRef} className="theme-wipe" aria-hidden />
    </Ctx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
