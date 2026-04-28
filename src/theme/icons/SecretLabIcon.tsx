import { baseProps, type IconProps } from './_base';

const SecretLabIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="M9 3v6L4 18a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3L15 9V3" />
    <path d="M8 3h8" />
    <path d="M7 14h10" />
    <circle cx="11" cy="17" r=".6" fill="currentColor" />
    <circle cx="14" cy="19" r=".6" fill="currentColor" />
  </svg>
);

export default SecretLabIcon;
