import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  type ButtonHTMLAttributes,
  type ReactNode,
  useRef,
} from "react";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "ref"> & {
  children: ReactNode;
  strength?: number;
  className?: string;
};

/**
 * Magnetic CTA: the button drifts a few pixels toward the cursor, spring-physics.
 */
export function MagneticButton({
  children,
  strength = 0.35,
  className,
  ...rest
}: Props) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.5 });

  const handleMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={wrapRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="inline-block will-change-transform"
    >
      <button className={className} {...rest}>
        {children}
      </button>
    </motion.span>
  );
}
