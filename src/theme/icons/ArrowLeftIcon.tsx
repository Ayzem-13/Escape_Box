import { baseProps, type IconProps } from './_base';

const ArrowLeftIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

export default ArrowLeftIcon;
