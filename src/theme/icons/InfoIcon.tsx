import { baseProps, type IconProps } from './_base';

const InfoIcon = ({ size = 22, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export default InfoIcon;
