import { baseProps, type IconProps } from './_base';

const SquareIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <rect width="18" height="18" x="3" y="3" rx="2" />
  </svg>
);

export default SquareIcon;
