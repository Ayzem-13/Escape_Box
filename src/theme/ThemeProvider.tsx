import { useEffect, useMemo, type ReactNode } from 'react';
import { theme as defaultTheme, themeToCssVars, ThemeContext, type Theme } from './theme';

type ThemeProviderProps = {
  theme?: Theme;
  children: ReactNode;
};

export const ThemeProvider = ({ theme = defaultTheme, children }: ThemeProviderProps) => {
  useEffect(() => {
    const root = document.documentElement;
    const vars = themeToCssVars(theme);
    for (const [name, value] of Object.entries(vars)) {
      root.style.setProperty(name, value);
    }
    return () => {
      for (const name of Object.keys(vars)) {
        root.style.removeProperty(name);
      }
    };
  }, [theme]);

  const value = useMemo(() => theme, [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
