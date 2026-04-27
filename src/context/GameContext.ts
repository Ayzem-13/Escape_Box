import { createContext, useContext } from 'react';

export type GameContextValue = {
  gameStarted: boolean;
  startGame: () => void;
  resetGame: () => void;
  code: string | null;
  setCode: (code: string) => void;  
};

export const GameContext = createContext<GameContextValue | null>(null);

export const useGame = (): GameContextValue => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
};
