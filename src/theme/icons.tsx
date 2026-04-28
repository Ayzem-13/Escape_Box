type IconProps = {
  size?: number;
  className?: string;
};

const baseProps = (size = 20, className?: string) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  className,
  'aria-hidden': true,
});

export const PaletteIcon = ({ size = 22, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
  </svg>
);

export const AncientTombIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="M9 3h6" />
    <path d="M10 3v2a2 2 0 0 0 4 0V3" />
    <path d="M7 7c0 6 1.5 9 5 14 3.5-5 5-8 5-14" />
    <path d="M9 13h6" />
  </svg>
);

export const HauntedManorIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="M12 8c-1.2 0-2 .8-2 2 0-1-1-2-2.5-2C5 8 3 9 2 11c1 .5 2 0 3-1 0 2.5 1.5 4 3.5 4 1.5 0 2.5-1 3.5-2 1 1 2 2 3.5 2 2 0 3.5-1.5 3.5-4 1 1 2 1.5 3 1-1-2-3-3-5.5-3-1.5 0-2.5 1-2.5 2 0-1.2-.8-2-2-2z" />
    <circle cx="10.5" cy="10.5" r=".4" fill="currentColor" />
    <circle cx="13.5" cy="10.5" r=".4" fill="currentColor" />
  </svg>
);

export const SecretLabIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="M9 3v6L4 18a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3L15 9V3" />
    <path d="M8 3h8" />
    <path d="M7 14h10" />
    <circle cx="11" cy="17" r=".6" fill="currentColor" />
    <circle cx="14" cy="19" r=".6" fill="currentColor" />
  </svg>
);

export const MusicIcon = ({ size = 22, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

export const InfoIcon = ({ size = 22, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export const ChevronLeftIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const ChevronRightIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const XIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const ArrowLeftIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

export const SquareIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
  </svg>
);
