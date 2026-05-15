import { useEffect, useRef } from "react";

/**
 * Stylised audio visualizer driven by cursor position. No real audio; reacts
 * to mouse movement and idle ambient wave. GPU-friendly via canvas.
 */
export function AudioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let mouseX = 0.5;
    let mouseY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;
    let t = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width;
      targetY = (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("resize", resize);

    const BARS = 96;

    const draw = () => {
      t += 0.018;
      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      ctx.clearRect(0, 0, w, h);

      const cx = mouseX * w;
      const baseY = h * 0.78;
      const barW = w / BARS;

      for (let i = 0; i < BARS; i++) {
        const px = i * barW + barW / 2;
        const dx = (px - cx) / w;
        const proximity = Math.exp(-dx * dx * 8);
        const wave =
          Math.sin(i * 0.22 + t * 1.4) * 0.5 +
          Math.sin(i * 0.55 - t * 2.1) * 0.5;
        const amp = (0.18 + 0.55 * proximity + 0.18 * (1 - mouseY)) * (0.7 + 0.6 * wave);
        const barH = Math.max(2, amp * h * 0.55);
        const x = i * barW + barW * 0.18;
        const yTop = baseY - barH;

        const grad = ctx.createLinearGradient(x, yTop, x, baseY);
        grad.addColorStop(0, `rgba(255, 0, 127, ${0.85 * proximity + 0.25})`);
        grad.addColorStop(0.55, `rgba(255, 0, 127, ${0.35 + 0.4 * proximity})`);
        grad.addColorStop(1, `rgba(138, 43, 226, ${0.35})`);
        ctx.fillStyle = grad;
        ctx.shadowColor = "rgba(255,0,127,0.45)";
        ctx.shadowBlur = 14 * proximity + 4;

        const bw = barW * 0.64;
        const r = Math.min(bw / 2, 6);
        roundRect(ctx, x, yTop, bw, barH, r);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // Baseline glow line
      const lineGrad = ctx.createLinearGradient(0, 0, w, 0);
      lineGrad.addColorStop(0, "rgba(138,43,226,0.0)");
      lineGrad.addColorStop(mouseX, "rgba(255,0,127,0.95)");
      lineGrad.addColorStop(1, "rgba(138,43,226,0.0)");
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, baseY + 1);
      ctx.lineTo(w, baseY + 1);
      ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
