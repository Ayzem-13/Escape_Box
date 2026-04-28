import { type Theme } from './theme';

// 🏺 Tombeau Antique - sable doré, hiéroglyphes, ambiance archéologue
export const ancientTombTheme: Theme = {
  color: {
    primary: '#d4a857',
    primaryHover: '#b88a32',
    primarySoft: 'rgba(212, 168, 87, 0.2)',
    black: '#1a0f04',
    white: '#f5e9c8',
    bg: '#2a1d0c',
    bgInverse: '#f5e9c8',
    surface: '#3d2a14',
    overlay: 'rgba(20, 10, 0, 0.6)',
    text: '#f5e9c8',
    textInverse: '#1a0f04',
    textMuted: 'rgba(245, 233, 200, 0.65)',
    border: '#d4a857',
    borderSoft: 'rgba(212, 168, 87, 0.3)',
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

// 🦇 Manoir Hanté - violet sombre, rouge sang, ambiance gothique
export const hauntedManorTheme: Theme = {
  color: {
    primary: '#a01b3a',
    primaryHover: '#7a0e27',
    primarySoft: 'rgba(160, 27, 58, 0.2)',
    black: '#0a0510',
    white: '#e8d8e8',
    bg: '#15091e',
    bgInverse: '#e8d8e8',
    surface: '#22132f',
    overlay: 'rgba(10, 0, 15, 0.75)',
    text: '#e8d8e8',
    textInverse: '#0a0510',
    textMuted: 'rgba(232, 216, 232, 0.6)',
    border: '#a01b3a',
    borderSoft: 'rgba(160, 27, 58, 0.3)',
  },
  radius: { sm: '2px', md: '3px', lg: '5px', pill: '999px' },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px' },
  shadow: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.7)',
    md: '0 6px 16px rgba(20, 0, 0, 0.75)',
    lg: '0 14px 32px rgba(60, 0, 10, 0.85)',
  },
  font: {
    body: "'Garamond', 'Georgia', serif",
    mono: "'Courier New', Courier, monospace",
  },
  transition: { fast: '180ms ease', base: '380ms ease' },
} as const;

// 🔬 Laboratoire Secret - acier, néon cyan, ambiance scientifique clandestine
export const secretLabTheme: Theme = {
  color: {
    primary: '#00d9b8',
    primaryHover: '#00ad92',
    primarySoft: 'rgba(0, 217, 184, 0.18)',
    black: '#04090c',
    white: '#e6f7f5',
    bg: '#0d1418',
    bgInverse: '#e6f7f5',
    surface: '#172026',
    overlay: 'rgba(0, 30, 30, 0.65)',
    text: '#e6f7f5',
    textInverse: '#04090c',
    textMuted: 'rgba(230, 247, 245, 0.6)',
    border: '#00d9b8',
    borderSoft: 'rgba(0, 217, 184, 0.28)',
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
