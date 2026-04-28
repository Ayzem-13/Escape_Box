import { baseProps, type IconProps } from './_base';

const MusicIcon = ({ size = 22, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

export default MusicIcon;
