const Cobweb = () => (
  <g fill="none" stroke="#e8d8e8" strokeWidth="0.8" opacity="0.55">
    <path d="M0 0 L100 0 L100 100" />
    <path d="M0 0 L70 30 M0 0 L40 60 M0 0 L20 80 M0 0 L100 100" />
    <path d="M14 0 Q40 14 22 30" />
    <path d="M30 0 Q55 24 36 50" />
    <path d="M50 0 Q70 30 50 70" />
    <path d="M70 0 Q86 36 60 84" />
    <path d="M0 14 Q24 24 22 30" />
    <path d="M0 30 Q24 38 36 50" />
    <path d="M0 50 Q30 60 50 70" />
  </g>
);

const HauntedManorCorners = () => (
  <>
    <svg className="ambient-corner tl" viewBox="0 0 100 100" aria-hidden>
      <Cobweb />
    </svg>
    <svg className="ambient-corner tr" viewBox="0 0 100 100" aria-hidden>
      <Cobweb />
    </svg>
    <svg className="ambient-corner bl" viewBox="0 0 100 100" aria-hidden>
      <Cobweb />
    </svg>
    <svg className="ambient-corner br" viewBox="0 0 100 100" aria-hidden>
      <Cobweb />
    </svg>
  </>
);

export default HauntedManorCorners;
