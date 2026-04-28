import { createContext, useContext } from 'react';

export const palette = {
  primary: '#31a3dd',
  primaryHover: '#2589bd',
  primarySoft: 'rgba(49, 163, 221, 0.15)',
  black: '#000000',
  white: '#ffffff',
} as const;

export const theme = {
  color: {
    primary: palette.primary,
    primaryHover: palette.primaryHover,
    primarySoft: palette.primarySoft,
    black: palette.black,
    white: palette.white,
    bg: palette.white,
    bgInverse: palette.black,
    surface: palette.white,
    overlay: 'rgba(0, 0, 0, 0.5)',
    text: palette.black,
    textInverse: palette.white,
    textMuted: 'rgba(0, 0, 0, 0.6)',
    border: palette.black,
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

type WidenStrings<T> = {
  [K in keyof T]: T[K] extends string ? string : WidenStrings<T[K]>;
};

export type Theme = WidenStrings<typeof theme>;

const kebab = (s: string) => s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

export const themeToCssVars = (t: Theme): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const [group, values] of Object.entries(t)) {
    for (const [key, value] of Object.entries(values as Record<string, string>)) {
      out[`--${kebab(group)}-${kebab(key)}`] = value;
    }
  }
  return out;
};

const ref = <G extends keyof Theme>(group: G) =>
  new Proxy({} as { [K in keyof Theme[G]]: string }, {
    get: (_, key: string) => `var(--${kebab(group)}-${kebab(key)})`,
  });

export const v = {
  color: ref('color'),
  radius: ref('radius'),
  spacing: ref('spacing'),
  shadow: ref('shadow'),
  font: ref('font'),
  transition: ref('transition'),
};

export const ThemeContext = createContext<Theme>(theme);

export const useTheme = (): Theme => useContext(ThemeContext);
