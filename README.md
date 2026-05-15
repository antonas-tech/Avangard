# МАЛИНА · Гастробар & Караоке · Сириус

Иммерсивный одностраничный лендинг (SPA) для гастробара и караоке-клуба
«Малина» в ПГТ Сириус (Адлер, ул. Старошкольная, 27). Полная переработка
цифрового имиджа: dark cyber-lounge стилистика, кинематографичный
motion-design, глобальный плавный скролл и интерактивный переключатель
концепций «День / Ночь».

## Стек

- **Vite + React 18 + TypeScript** — основа SPA
- **TailwindCSS 3.4** — дизайн-система (токены, glassmorphism, неон)
- **Framer Motion 11** — все микро-взаимодействия и сцены
- **Lenis** — инерционный плавный скролл (smooth scroll)
- **Canvas 2D** — кастомный аудио-визуализатор, реагирующий на курсор

## Архитектура

```
src/
  App.tsx                 # композиция секций, ThemeProvider
  index.css               # CSS-переменные двух тем, glass, neon
  lib/
    ThemeProvider.tsx     # Day / Night режим + radial wipe transition
    SmoothScroll.tsx      # Lenis (respects prefers-reduced-motion)
    MagneticButton.tsx    # магнитная CTA-кнопка с пружинной физикой
    Reveal.tsx            # Reveal / Stagger / SplitText
  components/
    Header.tsx            # стеклянный navbar + Day/Night toggle + бургер
    DayNightToggle.tsx    # кастомный сегмент с подсветкой
    Logo.tsx              # маркер «ягодка-малина» + неоновое мерцание
    Hero.tsx              # full-screen видео, slogan, magnetic CTA, marquee
    Spaces.tsx            # 1-й этаж (караоке) / 2-й этаж (терраса)
    Menu.tsx              # вкладки + grid + modal с КБЖУ
    NightVibe.tsx         # график 14:00–03:00 + audio visualizer
    AudioVisualizer.tsx   # canvas, реагирует на движение мыши
    Booking.tsx           # премиум-форма: календарь, чипсы, счётчик,
                          # зона, маска телефона, успех-оверлей
    Footer.tsx            # телефон, мессенджеры, стилизованная карта
```

## Главные интеракции

- **Day / Night toggle** — клик по переключателю запускает радиальную
  цветовую «шторку» из точки нажатия и плавно меняет CSS-переменные.
  Hero меняет видео и слоган. Цвета, кнопки и акценты живут в `:root` и
  `[data-theme="day|night"]`.
- **Smooth scroll** — Lenis на 60+ FPS, отключается при
  `prefers-reduced-motion`.
- **Magnetic CTA** — кнопка тянется к курсору с spring physics.
- **3D-parallax карточек** — фон смещается в противоположную от курсора
  сторону, блюр снимается на hover.
- **SplitText** — заголовки выплывают по словам из `overflow:hidden`.
- **Staggered Fade-In Up** — карточки меню появляются друг за другом.
- **AnimatePresence модал** — карточка блюда раскрывается с
  кросс-фейдом фотографий и КБЖУ.
- **Audio visualizer** — 96 баров на canvas, амплитуда зависит от
  расстояния до курсора.
- **Booking form** — кастомный календарь, time chips, ±счётчик гостей,
  Glassmorphism, маска `+7 (___) ___-__-__`, спиннер → галочка успеха.

## Запуск

```bash
npm install
npm run dev    # http://localhost:5173
npm run build  # tsc -b + vite build (production)
npm run preview
```

## Адаптивность

Полностью mobile-first. На смартфонах меню навигации — полноэкранная
шторка с blur. Все изображения через `loading="lazy"`. Видео фон работает
с `playsInline` и `preload="metadata"`.

## Дизайн-токены

- Background: `#0B0C10`, `#1F2833`, `#11131A`
- Primary accent (Малина): `#FF007F`, `#D01C6A`
- Secondary ambient (UV): `#8A2BE2`
- Typography: Syne (display), Inter (body), JetBrains Mono (eyebrow)
