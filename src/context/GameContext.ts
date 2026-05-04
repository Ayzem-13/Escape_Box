import { createContext, useContext } from 'react';

export type GameResult = 'won' | 'lost' | null;

export type GameContextValue = {
  gameStarted: boolean;
  startGame: () => void;
  resetGame: () => void;
  restartGame: () => void;
  session: number;
  gameResult: GameResult;
  setGameResult: (result: GameResult) => void;
  /** Temps restant affiché par le chronomètre (`null` si hors partie ou chrono absent). */
  chronoRemainingSec: number | null;
  /** Durée initiale du chrono au démarrage de la partie. */
  chronoInitialSec: number | null;
  setChronoTick: (remainingSec: number, initialSec: number) => void;
  clearChronoTick: () => void;
};

export const GameContext = createContext<GameContextValue | null>(null);

export const useGame = (): GameContextValue => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within a GameProvider');
  return ctx;
};
