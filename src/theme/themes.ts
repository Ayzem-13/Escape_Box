import { type Theme } from './theme';

// Light Theme - Blue Sky
export const lightTheme: Theme = {
  color: {
    primary: '#31a3dd',
    primaryHover: '#2589bd',
    primarySoft: 'rgba(49, 163, 221, 0.15)',
    black: '#000000',
    white: '#ffffff',
    bg: '#ffffff',
    bgInverse: '#000000',
    surface: '#ffffff',
    overlay: 'rgba(0, 0, 0, 0.5)',
    text: '#000000',
    textInverse: '#ffffff',
    textMuted: 'rgba(0, 0, 0, 0.6)',
    border: '#000000',
    borderSoft: 'rgba(0, 0, 0, 0.15)',
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    pill: '999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.1)',
    md: '0 4px 8px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 24px rgba(0, 0, 0, 0.25)',
  },
  font: {
    body: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    mono: "'Courier New', Courier, monospace",
  },
  transition: {
    fast: '150ms ease',
    base: '300ms ease',
  },
} as const;

// Dark Theme - Midnight
export const darkTheme: Theme = {
  color: {
    primary: '#bb86fc',
    primaryHover: '#9a67ff',
    primarySoft: 'rgba(187, 134, 252, 0.15)',
    black: '#121212',
    white: '#ffffff',
    bg: '#1e1e1e',
    bgInverse: '#f5f5f5',
    surface: '#2a2a2a',
    overlay: 'rgba(255, 255, 255, 0.3)',
    text: '#ffffff',
    textInverse: '#000000',
    textMuted: 'rgba(255, 255, 255, 0.7)',
    border: '#404040',
    borderSoft: 'rgba(255, 255, 255, 0.15)',
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    pill: '999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 8px rgba(0, 0, 0, 0.5)',
    lg: '0 10px 24px rgba(0, 0, 0, 0.7)',
  },
  font: {
    body: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    mono: "'Courier New', Courier, monospace",
  },
  transition: {
    fast: '150ms ease',
    base: '300ms ease',
  },
} as const;

// Nature Theme - Forest Green
export const natureTheme: Theme = {
  color: {
    primary: '#2d7c3f',
    primaryHover: '#1f5a2d',
    primarySoft: 'rgba(45, 124, 63, 0.15)',
    black: '#1a3a1a',
    white: '#f5f9f5',
    bg: '#f5f9f5',
    bgInverse: '#1a3a1a',
    surface: '#e8f3e8',
    overlay: 'rgba(26, 58, 26, 0.5)',
    text: '#1a3a1a',
    textInverse: '#f5f9f5',
    textMuted: 'rgba(26, 58, 26, 0.6)',
    border: '#4a7c4f',
    borderSoft: 'rgba(45, 124, 63, 0.15)',
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    pill: '999px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  shadow: {
    sm: '0 1px 2px rgba(26, 58, 26, 0.1)',
    md: '0 4px 8px rgba(26, 58, 26, 0.2)',
    lg: '0 10px 24px rgba(26, 58, 26, 0.25)',
  },
  font: {
    body: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    mono: "'Courier New', Courier, monospace",
  },
  transition: {
    fast: '150ms ease',
    base: '300ms ease',
  },
} as const;

export const availableThemes = {
  light: lightTheme,
  dark: darkTheme,
  nature: natureTheme,
} as const;

export type ThemeKey = keyof typeof availableThemes;
