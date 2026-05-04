type Props = {
  className?: string;
};

/**
 * Refined geometric mark inspired by the avangard brand sigil:
 * an oval frame, a chevron silhouette and a centered diamond.
 */
export function Logo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <ellipse
        cx="32"
        cy="32"
        rx="28"
        ry="22"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M32 18 L36 22 L32 26 L28 22 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M14 30 L32 46 L50 30 L42 30 L32 38 L22 30 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
