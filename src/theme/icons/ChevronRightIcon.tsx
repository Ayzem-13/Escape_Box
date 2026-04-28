import { baseProps, type IconProps } from './_base';

const ChevronRightIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export default ChevronRightIcon;
