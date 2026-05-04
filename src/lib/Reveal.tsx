import { motion, type Variants, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  amount?: number;
};

/**
 * Reveals children with a smooth rise + clip-path mask.
 * Works on first scroll into view; respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
  once = true,
  amount = 0.35,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y,
      clipPath: "inset(0 0 100% 0)",
    },
    show: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: 1.05,
        ease: APPLE_EASE as unknown as number[],
        delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
};

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.1,
}: StaggerProps) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y, clipPath: "inset(0 0 100% 0)" },
        show: {
          opacity: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          transition: {
            duration: 1,
            ease: APPLE_EASE as unknown as number[],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
