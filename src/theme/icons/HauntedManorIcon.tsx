import { baseProps, type IconProps } from './_base';

const HauntedManorIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <path d="M12 8c-1.2 0-2 .8-2 2 0-1-1-2-2.5-2C5 8 3 9 2 11c1 .5 2 0 3-1 0 2.5 1.5 4 3.5 4 1.5 0 2.5-1 3.5-2 1 1 2 2 3.5 2 2 0 3.5-1.5 3.5-4 1 1 2 1.5 3 1-1-2-3-3-5.5-3-1.5 0-2.5 1-2.5 2 0-1.2-.8-2-2-2z" />
    <circle cx="10.5" cy="10.5" r=".4" fill="currentColor" />
    <circle cx="13.5" cy="10.5" r=".4" fill="currentColor" />
  </svg>
);

export default HauntedManorIcon;
