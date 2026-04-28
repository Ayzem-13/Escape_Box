import { baseProps, type IconProps } from './_base';

const ChevronLeftIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export default ChevronLeftIcon;
