import { useMemo, useState, type ReactNode } from 'react';
import { GameContext, type GameContextValue } from './GameContext';

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  const value = useMemo<GameContextValue>(
    () => ({
      gameStarted,
      startGame: () => setGameStarted(true),
      resetGame: () => {
        setGameStarted(false);
        setCode(null);
      },
      code,
      setCode,
    }),
    [gameStarted, code],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
