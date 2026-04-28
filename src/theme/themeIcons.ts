import { type ComponentType } from 'react';
import { type ThemeKey } from './themes';
import { AncientTombIcon, HauntedManorIcon, SecretLabIcon } from './icons';

type IconProps = {
  size?: number;
  className?: string;
};

export const THEME_ICONS: Record<ThemeKey, ComponentType<IconProps>> = {
  ancientTomb: AncientTombIcon,
  hauntedManor: HauntedManorIcon,
  secretLab: SecretLabIcon,
};
