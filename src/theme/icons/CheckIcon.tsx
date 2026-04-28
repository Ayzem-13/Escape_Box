import { baseProps, type IconProps } from './_base';

const CheckIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default CheckIcon;
