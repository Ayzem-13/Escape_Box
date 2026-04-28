import { baseProps, type IconProps } from './_base';

const LockIcon = ({ size = 22, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export default LockIcon;
