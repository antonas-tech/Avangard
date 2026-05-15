type Props = {
  className?: string;
  withMark?: boolean;
};

/**
 * Wordmark «МАЛИНА» with a stylised berry sigil and a neon-flicker dot
 * on the first letter to suggest a glowing neon sign.
 */
export function Logo({ className, withMark = true }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      {withMark && (
        <svg
          viewBox="0 0 40 40"
          className="h-7 w-7 flex-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="berry" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FF80B3" />
              <stop offset="55%" stopColor="#FF007F" />
              <stop offset="100%" stopColor="#8A2BE2" />
            </radialGradient>
          </defs>
          <g transform="translate(20 22)">
            <circle r="4" cy="-6" fill="url(#berry)" />
            <circle r="4" cx="-5" cy="-1" fill="url(#berry)" />
            <circle r="4" cx="5" cy="-1" fill="url(#berry)" />
            <circle r="4" cx="-3" cy="5" fill="url(#berry)" />
            <circle r="4" cx="3" cy="5" fill="url(#berry)" />
            <path
              d="M0 -11 q2 -4 6 -5"
              stroke="#7CFFA3"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </svg>
      )}
      <span
        className="font-display text-[1.05rem] font-bold tracking-[0.34em] text-white"
        style={{ textShadow: "0 0 12px rgba(255,0,127,0.55)" }}
      >
        М<span className="text-malina-500 animate-flicker">А</span>ЛИНА
      </span>
    </div>
  );
}
