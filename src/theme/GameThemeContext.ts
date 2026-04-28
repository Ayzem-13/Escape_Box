import { createContext, useContext } from 'react';
import type { ThemeKey } from './themes';

type GameThemeCtx = {
  themeKey: ThemeKey;
  setThemeKey: (k: ThemeKey) => void;
};

export const GameThemeContext = createContext<GameThemeCtx>({
  themeKey: 'light',
  setThemeKey: () => {},
});

export const useGameTheme = () => useContext(GameThemeContext);
