import { AnimatePresence, motion } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { Reveal } from "../lib/Reveal";
import { MagneticButton } from "../lib/MagneticButton";

const MONTHS = [
  "Январь","Февраль","Март","Апрель","Май","Июнь",
  "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",
];
const WEEKDAYS = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

const TIME_SLOTS = [
  "14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00",
  "18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30",
];

const ZONES = [
  { key: "karaoke", label: "Основной зал · Караоке" },
  { key: "terrace", label: "Панорамная терраса" },
] as const;

type Status = "idle" | "loading" | "success";

export function Booking() {
  const today = useMemo(() => stripTime(new Date()), []);
  const [date, setDate] = useState<Date>(today);
  const [time, setTime] = useState<string>("20:00");
  const [guests, setGuests] = useState<number>(2);
  const [zone, setZone] = useState<(typeof ZONES)[number]["key"]>("karaoke");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const phoneValid = phone.replace(/\D/g, "").length === 11;
  const nameValid = name.trim().length >= 2;
  const ready = phoneValid && nameValid && status === "idle";

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 1400);
  };

  return (
    <section id="booking" className="relative py-28 lg:py-40">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-start">
          {/* Left column */}
          <div>
            <Reveal>
              <p className="eyebrow">05 · Резерв</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="heading-display mt-4 text-[clamp(2rem,5.8vw,4.6rem)] max-w-[16ch]">
                Забронируйте ваш <span className="text-malina-500">идеальный</span> вечер.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-[52ch] text-pretty text-base leading-[1.65] text-white/70">
                Минимум полей — максимум вечера. Подтверждение прилетит в Telegram
                или WhatsApp в течение 5 минут. Депозит по запросу для компаний
                от 8 человек.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-4 max-w-md">
              <KPI big="03:00" label="до закрытия в пт/сб" />
              <KPI big="120+" label="посадочных мест" />
              <KPI big="60k" label="треков в каталоге" />
              <KPI big="2" label="этажа отдыха" />
            </div>
          </div>

          {/* Right column — form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="relative overflow-hidden rounded-[28px] glass-strong p-6 sm:p-8 lg:p-10"
            >
              <div
                className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full"
                style={{
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(255,0,127,0.35), transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              <div
                className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full"
                style={{
                  background:
                    "radial-gradient(50% 50% at 50% 50%, rgba(138,43,226,0.30), transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              <div className="relative grid gap-6">
                <Field label="Дата визита">
                  <DatePicker value={date} onChange={setDate} min={today} />
                </Field>

                <Field label="Время">
                  <TimeChips value={time} onChange={setTime} />
                </Field>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Гостей">
                    <Counter value={guests} onChange={setGuests} min={1} max={20} />
                  </Field>
                  <Field label="Зона">
                    <ZoneToggle value={zone} onChange={setZone} />
                  </Field>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Имя">
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Например, Анастасия"
                      autoComplete="given-name"
                    />
                  </Field>
                  <Field label="Телефон">
                    <PhoneInput value={phone} onChange={setPhone} />
                  </Field>
                </div>

                <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                    Нажимая «Подтвердить», вы соглашаетесь с обработкой персональных данных.
                  </p>
                  <MagneticButton
                    className="neon-btn"
                    disabled={!ready}
                    type="submit"
                    aria-disabled={!ready}
                  >
                    {status === "loading" ? (
                      <>
                        <Spinner />
                        Резервируем…
                      </>
                    ) : status === "success" ? (
                      <>
                        <Check />
                        Стол зарезервирован
                      </>
                    ) : (
                      <>
                        Подтвердить бронирование
                        <ArrowIcon />
                      </>
                    )}
                  </MagneticButton>
                </div>
              </div>

              <AnimatePresence>
                {status === "success" && <SuccessOverlay onClose={() => setStatus("idle")} />}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- */
/* Sub-components                                                       */
/* ------------------------------------------------------------------- */

function KPI({ big, label }: { big: string; label: string }) {
  return (
    <div
      className="rounded-2xl p-4 glass"
      style={{ border: "1px solid var(--border)" }}
    >
      <div className="font-display text-3xl font-bold tabular-nums text-white">{big}</div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
        {label}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-white/60 mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3.5 text-white placeholder:text-white/35 outline-none transition-all duration-300 focus:border-malina-500 focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgba(255,0,127,0.12)] ${props.className ?? ""}`}
    />
  );
}

function PhoneInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
    onChange(formatPhone(digits));
  };
  return (
    <Input
      inputMode="numeric"
      autoComplete="tel"
      value={value}
      onChange={handle}
      placeholder="+7 (___) ___-__-__"
    />
  );
}

function formatPhone(digits: string) {
  let d = digits;
  if (d.length === 0) return "";
  if (d[0] === "8") d = "7" + d.slice(1);
  if (d[0] !== "7") d = "7" + d;
  d = d.slice(0, 11);
  const p1 = d.slice(1, 4);
  const p2 = d.slice(4, 7);
  const p3 = d.slice(7, 9);
  const p4 = d.slice(9, 11);
  let out = "+7";
  if (p1) out += ` (${p1}`;
  if (p1.length === 3) out += ")";
  if (p2) out += ` ${p2}`;
  if (p3) out += `-${p3}`;
  if (p4) out += `-${p4}`;
  return out;
}

function Counter({
  value,
  onChange,
  min = 1,
  max = 20,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-white/[0.04] border border-white/10 px-2 py-2">
      <button
        type="button"
        aria-label="Меньше"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="h-10 w-10 rounded-xl grid place-items-center text-white hover:bg-white/10 transition-colors"
      >
        −
      </button>
      <div className="text-white font-display text-2xl tabular-nums">
        {value}
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
          {plural(value, ["гость", "гостя", "гостей"])}
        </span>
      </div>
      <button
        type="button"
        aria-label="Больше"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="h-10 w-10 rounded-xl grid place-items-center text-white hover:bg-white/10 transition-colors"
      >
        +
      </button>
    </div>
  );
}

function plural(n: number, forms: [string, string, string]) {
  const a = Math.abs(n) % 100;
  const b = a % 10;
  if (a > 10 && a < 20) return forms[2];
  if (b > 1 && b < 5) return forms[1];
  if (b === 1) return forms[0];
  return forms[2];
}

function ZoneToggle({
  value,
  onChange,
}: {
  value: (typeof ZONES)[number]["key"];
  onChange: (v: (typeof ZONES)[number]["key"]) => void;
}) {
  return (
    <div className="relative grid grid-cols-2 rounded-2xl bg-white/[0.04] border border-white/10 p-1">
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 360, damping: 30 }}
        className="absolute top-1 bottom-1 rounded-xl"
        style={{
          left: value === "karaoke" ? "4px" : "calc(50% + 0px)",
          width: "calc(50% - 4px)",
          background: "linear-gradient(135deg, var(--accent), var(--accent-soft))",
          boxShadow: "0 0 16px rgba(255,0,127,0.40)",
        }}
      />
      {ZONES.map((z) => (
        <button
          type="button"
          key={z.key}
          onClick={() => onChange(z.key)}
          className={`relative z-10 px-3 py-3 rounded-xl font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
            value === z.key ? "text-white" : "text-white/65"
          }`}
        >
          {z.label}
        </button>
      ))}
    </div>
  );
}

function TimeChips({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TIME_SLOTS.map((t) => {
        const active = t === value;
        return (
          <button
            type="button"
            key={t}
            onClick={() => onChange(t)}
            className={`rounded-full px-3 py-1.5 font-mono text-[12px] tabular-nums tracking-[0.10em] transition-all duration-300
              ${
                active
                  ? "text-white shadow-[0_0_18px_rgba(255,0,127,0.45)]"
                  : "text-white/65 hover:text-white"
              }
            `}
            style={{
              background: active
                ? "linear-gradient(135deg, var(--accent), var(--accent-soft))"
                : "rgba(255,255,255,0.04)",
              border: active ? "1px solid transparent" : "1px solid rgba(255,255,255,0.10)",
            }}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

function DatePicker({
  value,
  onChange,
  min,
}: {
  value: Date;
  onChange: (d: Date) => void;
  min?: Date;
}) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(() => new Date(value.getFullYear(), value.getMonth(), 1));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const days = useMemo(() => buildMonth(view), [view]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3.5 text-white outline-none transition-all duration-300 hover:border-white/25 focus:border-malina-500"
      >
        <span className="font-display text-lg">{formatDate(value)}</span>
        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
          {weekdayShort(value)}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-30 mt-3 w-[min(360px,90vw)] rounded-2xl p-4 glass-strong"
          >
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                aria-label="Предыдущий месяц"
                onClick={() => setView(addMonths(view, -1))}
                className="h-8 w-8 rounded-full grid place-items-center text-white/75 hover:text-white hover:bg-white/10"
              >
                ‹
              </button>
              <div className="font-display text-white">
                {MONTHS[view.getMonth()]} {view.getFullYear()}
              </div>
              <button
                type="button"
                aria-label="Следующий месяц"
                onClick={() => setView(addMonths(view, 1))}
                className="h-8 w-8 rounded-full grid place-items-center text-white/75 hover:text-white hover:bg-white/10"
              >
                ›
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1">
              {WEEKDAYS.map((w) => (
                <div key={w} className="text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 py-1">
                  {w}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((d, i) => {
                const isCurrentMonth = d.getMonth() === view.getMonth();
                const isSelected = sameDay(d, value);
                const isPast = min ? d < stripTime(min) : false;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={isPast}
                    onClick={() => {
                      onChange(d);
                      setOpen(false);
                    }}
                    className={`relative aspect-square rounded-lg text-sm font-mono tabular-nums transition-all duration-200
                      ${isCurrentMonth ? "text-white" : "text-white/30"}
                      ${isPast ? "opacity-30 cursor-not-allowed" : "hover:bg-white/10"}
                      ${isSelected ? "text-white" : ""}
                    `}
                    style={
                      isSelected
                        ? {
                            background: "linear-gradient(135deg, var(--accent), var(--accent-soft))",
                            boxShadow: "0 0 18px rgba(255,0,127,0.45)",
                          }
                        : undefined
                    }
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function stripTime(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function addMonths(d: Date, n: number) {
  const x = new Date(d);
  x.setMonth(x.getMonth() + n);
  return x;
}
function buildMonth(view: Date): Date[] {
  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const dow = (first.getDay() + 6) % 7; // 0 = Monday
  const start = new Date(first);
  start.setDate(first.getDate() - dow);
  const arr: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    arr.push(d);
  }
  return arr;
}
function formatDate(d: Date) {
  return `${d.getDate()} ${MONTHS[d.getMonth()].toLowerCase()}`;
}
function weekdayShort(d: Date) {
  return WEEKDAYS[(d.getDay() + 6) % 7];
}

function Spinner() {
  return (
    <motion.span
      className="inline-block h-4 w-4 rounded-full border-2 border-white/60 border-t-white"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
    />
  );
}
function Check() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.path d="M5 12l5 5L20 7" />
    </motion.svg>
  );
}
function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SuccessOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 grid place-items-center p-8"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 50%, rgba(255,0,127,0.22), transparent 70%), rgba(7,8,11,0.78)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md text-center"
      >
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto h-20 w-20 rounded-full grid place-items-center"
          style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent-soft))",
            boxShadow: "0 0 36px rgba(255,0,127,0.6)",
          }}
        >
          <Check />
        </motion.div>
        <h3 className="heading-display mt-6 text-3xl text-white">
          Стол успешно зарезервирован
        </h3>
        <p className="mt-3 text-white/80 leading-[1.6]">
          Ждём вас на Старошкольной, 27. Подтверждение прилетит в мессенджер
          в течение 5 минут.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="ghost-btn mt-7"
        >
          Закрыть
        </button>
      </motion.div>
    </motion.div>
  );
}
