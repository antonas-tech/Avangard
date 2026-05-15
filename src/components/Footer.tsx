import { Reveal } from "../lib/Reveal";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer id="contact" className="relative pt-20 pb-10 overflow-hidden">
      <div className="ambient" />

      <div className="container-page relative z-10 grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Reveal>
            <p className="eyebrow">06 · Контакты</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="heading-display mt-4 text-[clamp(2rem,5.8vw,4.4rem)] max-w-[14ch]">
              Старошкольная, <span className="text-malina-500">27</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[44ch] text-white/70 leading-[1.6]">
              Адлерский район, ПГТ Сириус. 7 минут от Олимпийского парка, 3 минуты
              от моря. Парковка во дворе.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <a
              href="tel:+79180010306"
              className="group block rounded-3xl p-6 glass transition-transform hover:scale-[1.02]"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                Главный телефон
              </div>
              <div className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-white tabular-nums group-hover:text-malina-500 transition-colors">
                +7 918 001-03-06
              </div>
              <div className="mt-1 text-sm text-white/55">Звонок · бронь · вопросы</div>
            </a>

            <div className="rounded-3xl p-6 glass">
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                Связь в мессенджерах
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Messenger
                  label="Telegram"
                  href="https://t.me/+79180010306"
                  icon={<TelegramIcon />}
                />
                <Messenger
                  label="WhatsApp"
                  href="https://wa.me/79180010306"
                  icon={<WhatsAppIcon />}
                />
                <Messenger
                  label="Instagram"
                  href="https://instagram.com/"
                  icon={<InstagramIcon />}
                />
              </div>
              <div className="mt-5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                Отвечаем в течение 5 минут
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-2 text-sm text-white/70">
            <div>
              <span className="text-white/45 inline-block w-32">Адрес</span>
              ул. Старошкольная, 27 · Сириус, Адлер
            </div>
            <div>
              <span className="text-white/45 inline-block w-32">Часы работы</span>
              Вс–Чт 14:00–02:00 · Пт–Сб 14:00–03:00
            </div>
            <div>
              <span className="text-white/45 inline-block w-32">Депозит</span>
              По запросу для компаний от 8 гостей
            </div>
          </div>
        </div>

        <Reveal delay={0.1}>
          <MalinaMap />
        </Reveal>
      </div>

      <div className="container-page relative z-10 mt-20">
        <div className="hairline" />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <Logo />
          <div className="flex flex-wrap items-center gap-6 font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
            <span>© {new Date().getFullYear()} «Малина»</span>
            <a href="#top" className="hover:text-white transition-colors">Наверх ↑</a>
            <span>Сделано с любовью к Сириусу</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Messenger({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-white/85 transition-all hover:text-white"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-strong)",
      }}
    >
      <span className="text-malina-500">{icon}</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em]">{label}</span>
    </a>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M9.78 15.83l-.39 4.36c.56 0 .8-.24 1.1-.53l2.63-2.5 5.46 4c1 .55 1.71.26 1.97-.92l3.58-16.78c.33-1.51-.55-2.1-1.5-1.74L1.16 8.79c-1.47.58-1.45 1.41-.25 1.78l5.51 1.72 12.79-8.06c.6-.39 1.16-.18.7.22"/>
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2zm5.3 14.3c-.2.6-1.2 1.2-1.7 1.3-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5.3.6.9 2.1 1 2.2.1.1.1.3 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.9 1.5 1.9 2.4 1.3 1.1 2.4 1.5 2.7 1.6.3.1.5.1.7-.1.2-.2.8-.9 1-1.3.2-.4.4-.3.7-.2.3.1 2 .9 2.3 1.1.3.2.5.3.6.4.1.2 0 .9-.2 1.4z"/>
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Custom stylised "map" with a glowing raspberry pin. Not an actual map
 * integration — instead a tasteful dark abstract grid that fits the look.
 */
function MalinaMap() {
  return (
    <a
      href="https://yandex.ru/maps/?text=Сириус+Старошкольная+27"
      target="_blank"
      rel="noopener noreferrer"
      className="relative block aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden rounded-[28px] glass-strong"
    >
      {/* Grid layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px, 44px 44px",
          backgroundPosition: "center center",
          maskImage: "radial-gradient(80% 80% at 50% 50%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(80% 80% at 50% 50%, #000 60%, transparent 100%)",
        }}
      />
      {/* Streets */}
      <svg
        viewBox="0 0 600 480"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-80"
        aria-hidden
      >
        <defs>
          <linearGradient id="street" x1="0" x2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.30)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.0)" />
          </linearGradient>
          <linearGradient id="neon" x1="0" x2="1">
            <stop offset="0%" stopColor="#8A2BE2" />
            <stop offset="100%" stopColor="#FF007F" />
          </linearGradient>
        </defs>
        <g stroke="url(#street)" strokeWidth="14" strokeLinecap="round" fill="none">
          <path d="M-20 360 Q 200 320 300 280 T 640 220" />
          <path d="M-20 180 Q 220 220 360 200 T 640 140" />
          <path d="M120 -20 Q 200 160 280 240 T 360 500" />
          <path d="M480 -20 Q 460 200 420 280 T 380 500" />
        </g>
        <g stroke="url(#neon)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7">
          <path d="M-20 360 Q 200 320 300 280 T 640 220" />
          <path d="M120 -20 Q 200 160 280 240 T 360 500" />
        </g>
      </svg>

      {/* Pin */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div
            className="absolute inset-0 -m-8 rounded-full"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(255,0,127,0.45), transparent 70%)",
              filter: "blur(8px)",
            }}
          />
          <div
            className="relative h-14 w-14 rounded-full grid place-items-center animate-pulseGlow"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-soft))",
            }}
          >
            <BerryPin />
          </div>
          <div className="absolute left-1/2 top-full -translate-x-1/2 mt-3 whitespace-nowrap rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white glass">
            «Малина» · Старошкольная 27
          </div>
        </div>
      </div>

      <div className="absolute right-4 top-4 rounded-full glass px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/75">
        Открыть в Яндекс.Картах ↗
      </div>
    </a>
  );
}

function BerryPin() {
  return (
    <svg viewBox="0 0 40 40" className="h-6 w-6" fill="#fff" aria-hidden>
      <g transform="translate(20 22)">
        <circle r="3.5" cy="-5" />
        <circle r="3.5" cx="-4" cy="-1" />
        <circle r="3.5" cx="4" cy="-1" />
        <circle r="3.5" cx="-2" cy="4" />
        <circle r="3.5" cx="2" cy="4" />
      </g>
    </svg>
  );
}
