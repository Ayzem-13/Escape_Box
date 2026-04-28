import { type ComponentType } from 'react';
import { type ThemeKey } from '../themes';
import AncientTombCorners from './AncientTombCorners';
import HauntedManorCorners from './HauntedManorCorners';
import SecretLabCorners from './SecretLabCorners';

const decorations: Record<ThemeKey, ComponentType> = {
  ancientTomb: AncientTombCorners,
  hauntedManor: HauntedManorCorners,
  secretLab: SecretLabCorners,
};

export const AmbientDecorations = ({ themeKey }: { themeKey: ThemeKey }) => {
  const Decoration = decorations[themeKey];
  return <Decoration />;
};
