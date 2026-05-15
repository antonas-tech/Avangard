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

export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  once = true,
  amount = 0.3,
}: RevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const variants: Variants = {
    hidden: { opacity: 0, y, clipPath: "inset(0 0 100% 0)" },
    show: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 1.0, ease: APPLE_EASE as unknown as number[], delay },
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
  amount?: number;
};

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.1,
  amount = 0.25,
}: StaggerProps) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
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
  y = 24,
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
          transition: { duration: 0.9, ease: APPLE_EASE as unknown as number[] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

/**
 * Animates a heading by splitting it into words, each rising from a clipped
 * container. Behaves predictably with Russian unicode.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
}: SplitTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
        >
          <motion.span
            style={{ display: "inline-block", willChange: "transform" }}
            variants={{
              hidden: { y: "110%" },
              show: {
                y: 0,
                transition: { duration: 0.95, ease: APPLE_EASE as unknown as number[] },
              },
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
