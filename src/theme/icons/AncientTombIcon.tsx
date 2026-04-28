import { baseProps, type IconProps } from './_base';

const AncientTombIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="M9 3h6" />
    <path d="M10 3v2a2 2 0 0 0 4 0V3" />
    <path d="M7 7c0 6 1.5 9 5 14 3.5-5 5-8 5-14" />
    <path d="M9 13h6" />
  </svg>
);

export default AncientTombIcon;
