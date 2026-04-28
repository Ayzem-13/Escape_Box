import { type Theme } from './theme';

// 🏺 Tombeau Antique - chambre éclairée à la torche, pierre érodée
export const ancientTombTheme: Theme = {
  color: {
    primary: '#d4a857',
    primaryHover: '#b88a32',
    primarySoft: 'rgba(212, 168, 87, 0.14)',
    black: '#0f0a04',
    white: '#d8c79c',
    bg: '#14100a',
    bgInverse: '#d8c79c',
    surface: '#2a2114',
    overlay: 'rgba(15, 10, 4, 0.78)',
    text: '#d8c79c',
    textInverse: '#0f0a04',
    textMuted: 'rgba(216, 199, 156, 0.55)',
    border: 'rgba(212, 168, 87, 0.5)',
    borderSoft: 'rgba(212, 168, 87, 0.22)',
  },
  radius: { sm: '2px', md: '4px', lg: '6px', pill: '999px' },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' },
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.5)',
    md: '0 4px 10px rgba(0, 0, 0, 0.6)',
    lg: '0 12px 28px rgba(0, 0, 0, 0.75)',
  },
  font: {
    body: "'Papyrus', 'Georgia', serif",
    mono: "'Courier New', Courier, monospace",
  },
  transition: { fast: '180ms ease', base: '350ms ease' },
} as const;

// 🕯️ Manoir Hanté - victorien gothique, bougies, papier peint bourgogne fané
export const hauntedManorTheme: Theme = {
  color: {
    primary: '#c69a55',
    primaryHover: '#e0b46b',
    primarySoft: 'rgba(198, 154, 85, 0.15)',
    black: '#0a0608',
    white: '#e8d8b8',
    bg: '#1a0e12',
    bgInverse: '#e8d8b8',
    surface: '#2a1820',
    overlay: 'rgba(10, 6, 8, 0.85)',
    text: '#d8c2a4',
    textInverse: '#0a0608',
    textMuted: 'rgba(216, 194, 164, 0.55)',
    border: 'rgba(140, 60, 60, 0.55)',
    borderSoft: 'rgba(198, 154, 85, 0.22)',
  },
  radius: { sm: '2px', md: '3px', lg: '5px', pill: '999px' },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' },
  shadow: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.7)',
    md: '0 6px 16px rgba(20, 0, 0, 0.75)',
    lg: '0 14px 32px rgba(60, 0, 10, 0.85)',
  },
  font: {
    body: "'IM Fell English SC', 'Garamond', 'Georgia', serif",
    mono: "'Courier New', Courier, monospace",
  },
  transition: { fast: '180ms ease', base: '380ms ease' },
} as const;

// 🔬 Laboratoire Secret - sobre, blueprint discret
export const secretLabTheme: Theme = {
  color: {
    primary: '#6fdcc8',
    primaryHover: '#00d9b8',
    primarySoft: 'rgba(0, 217, 184, 0.14)',
    black: '#040608',
    white: '#b4d8d2',
    bg: '#060a0d',
    bgInverse: '#b4d8d2',
    surface: '#0e1a1f',
    overlay: 'rgba(0, 8, 10, 0.78)',
    text: '#b4d8d2',
    textInverse: '#040608',
    textMuted: 'rgba(180, 216, 210, 0.55)',
    border: 'rgba(0, 217, 184, 0.45)',
    borderSoft: 'rgba(0, 217, 184, 0.22)',
  },
  radius: { sm: '2px', md: '3px', lg: '5px', pill: '999px' },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' },
  shadow: {
    sm: '0 1px 3px rgba(0, 217, 184, 0.25)',
    md: '0 4px 12px rgba(0, 217, 184, 0.35)',
    lg: '0 12px 28px rgba(0, 217, 184, 0.45)',
  },
  font: {
    body: "'Consolas', 'Segoe UI', monospace",
    mono: "'Consolas', 'Courier New', monospace",
  },
  transition: { fast: '140ms ease', base: '280ms ease' },
} as const;

export const availableThemes = {
  ancientTomb: ancientTombTheme,
  hauntedManor: hauntedManorTheme,
  secretLab: secretLabTheme,
} as const;

export type ThemeKey = keyof typeof availableThemes;

export const THEME_LABELS: Record<ThemeKey, string> = {
  ancientTomb: 'Tombeau Antique',
  hauntedManor: 'Manoir Hanté',
  secretLab: 'Laboratoire Secret',
};

export const DEFAULT_THEME_KEY: ThemeKey = 'ancientTomb';
