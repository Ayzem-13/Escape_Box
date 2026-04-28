import { baseProps, type IconProps } from './_base';

const PauseIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <rect x="14" y="4" width="4" height="16" rx="1" />
    <rect x="6" y="4" width="4" height="16" rx="1" />
  </svg>
);

export default PauseIcon;
