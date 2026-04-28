import { createContext, useContext } from 'react';
import { DEFAULT_THEME_KEY, type ThemeKey } from './themes';

type GameThemeCtx = {
  themeKey: ThemeKey;
  setThemeKey: (k: ThemeKey) => void;
};

export const GameThemeContext = createContext<GameThemeCtx>({
  themeKey: DEFAULT_THEME_KEY,
  setThemeKey: () => {},
});

export const useGameTheme = () => useContext(GameThemeContext);
