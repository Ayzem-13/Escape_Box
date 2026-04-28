const SecretLabCorners = () => (
  <>
    <svg className="ambient-corner tl" viewBox="0 0 100 100" aria-hidden>
      <g fill="none" stroke="#00d9b8" strokeWidth="0.9" opacity="0.7">
        <path d="M2 2 H40 V6 H6 V40 H2 Z" fill="#00d9b8" opacity="0.4" />
        <circle cx="14" cy="14" r="3" />
        <circle cx="14" cy="14" r="6" />
        <path d="M22 12 H40 M22 16 H34" />
        <path d="M10 24 V40 M14 24 V40 M18 24 V36" />
        <path d="M30 28 L40 28 L40 38" />
        <text x="46" y="14" fill="#00d9b8" fontSize="6" fontFamily="monospace">SECTOR-A1</text>
        <text x="46" y="22" fill="#00d9b8" fontSize="5" fontFamily="monospace" opacity="0.6">SYS://OK</text>
      </g>
    </svg>
    <svg className="ambient-corner tr" viewBox="0 0 100 100" aria-hidden>
      <g fill="none" stroke="#00d9b8" strokeWidth="0.9" opacity="0.7">
        <path d="M60 2 H98 V40 H94 V6 H60 Z" fill="#00d9b8" opacity="0.4" />
        <rect x="68" y="10" width="20" height="10" />
        <path d="M68 24 H88 M68 28 H82 M68 32 H86" />
        <circle cx="76" cy="42" r="2" fill="#ff3c3c" />
        <circle cx="84" cy="42" r="2" fill="#ffc800" />
      </g>
    </svg>
    <svg className="ambient-corner bl" viewBox="0 0 100 100" aria-hidden>
      <g fill="none" stroke="#00d9b8" strokeWidth="0.9" opacity="0.7">
        <path d="M2 60 H6 V94 H40 V98 H2 Z" fill="#00d9b8" opacity="0.4" />
        <path d="M10 70 L20 70 L20 80 L30 80 L30 70 L40 70" />
        <circle cx="14" cy="86" r="2" />
        <path d="M22 86 H46" />
      </g>
    </svg>
    <svg className="ambient-corner br" viewBox="0 0 100 100" aria-hidden>
      <g fill="none" stroke="#00d9b8" strokeWidth="0.9" opacity="0.7">
        <path d="M94 60 V94 H60 V98 H98 V60 Z" fill="#00d9b8" opacity="0.4" />
        <text x="60" y="74" fill="#00d9b8" fontSize="6" fontFamily="monospace">⌬ LAB-3</text>
        <path d="M62 80 H92 M62 84 H86 M62 88 H90" />
      </g>
    </svg>
  </>
);

export default SecretLabCorners;
