import { type ComponentType } from 'react';
import { type ThemeKey } from './themes';
import AncientTombIcon from './icons/AncientTombIcon';
import HauntedManorIcon from './icons/HauntedManorIcon';
import SecretLabIcon from './icons/SecretLabIcon';

type IconProps = {
  size?: number;
  className?: string;
};

export const THEME_ICONS: Record<ThemeKey, ComponentType<IconProps>> = {
  ancientTomb: AncientTombIcon,
  hauntedManor: HauntedManorIcon,
  secretLab: SecretLabIcon,
};
