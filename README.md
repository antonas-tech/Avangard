# avangard

Quiet-luxury landing page for the avangard furniture brand — built with React, TypeScript, Tailwind CSS, Framer Motion and Lenis smooth scrolling. The design follows an Apple / Awwwards-grade aesthetic: deep beige & green palette, editorial serif typography, soft physically-based motion, and a horizontal-scroll catalog and pinned materials sequence.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** with a custom theme (palette, fonts, easing, shadows)
- **Framer Motion** for spring/cubic-bezier animation, viewport reveals, parallax
- **Lenis** for smooth, inertia-based scrolling

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the build
```

## Design tokens

| Role            | Token            | Value     |
| --------------- | ---------------- | --------- |
| Background      | `sand-100`       | `#F9F8F6` |
| Section accent  | `sand-200`       | `#F2EFE9` |
| Primary accent  | `forest-300`     | `#2C3D30` |
| Soft accent     | `forest-100`     | `#435246` |
| Body text       | `graphite`       | `#1C1C1C` |
| Muted text      | `graphite-soft`  | `#2B2B2B` |

Apple-grade easing is exposed as `ease-apple` (`cubic-bezier(0.16, 1, 0.3, 1)`) and `ease-soft` (`cubic-bezier(0.22, 1, 0.36, 1)`) on Tailwind utilities, plus matching CSS variables in `index.css`.

## Sections

1. **Hero** — full-viewport editorial headline with masked line reveal, parallax visual, magnetic CTA.
2. **Philosophy** — asymmetric editorial grid with staggered reveals.
3. **Collections** — pinned section with horizontal scroll catalog (5 collections + "request catalog" CTA).
4. **Materials** — pinned crossfade gallery synchronized with a textual list and progress lines.
5. **Footer** — large brand logotype, multi-column nav, contact CTA on deep forest background.

All visuals are rendered as pure CSS/SVG art so the bundle remains self-contained and dependency-free of external imagery.
