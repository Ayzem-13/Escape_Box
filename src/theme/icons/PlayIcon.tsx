import { baseProps, type IconProps } from './_base';

const PlayIcon = ({ size = 18, className }: IconProps) => (
  <svg {...baseProps(size, className)}>
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

export default PlayIcon;
