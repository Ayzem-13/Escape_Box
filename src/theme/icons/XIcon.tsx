import { baseProps, type IconProps } from './_base';

const XIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export default XIcon;
