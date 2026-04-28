import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { toast } from 'react-toastify';
import { GameContext, type GameContextValue, type GameResult } from './GameContext';
import { codesStorageKey } from './CodesContext';

const wipeAllCodes = () => {
  localStorage.removeItem(codesStorageKey('demo'));
  localStorage.removeItem(codesStorageKey('normal'));
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [session, setSession] = useState(0);
  const [gameResult, setGameResult] = useState<GameResult>(null);

  const startGame = useCallback(() => {
    setGameResult(null);
    setGameStarted(true);
  }, []);

  const resetGame = useCallback(() => {
    setGameStarted(false);
    setGameResult(null);
    wipeAllCodes();
    setSession((s) => s + 1);
  }, []);

  const restartGame = useCallback(() => {
    toast.info('Partie redémarrée !');
    setGameResult(null);
    setSession((s) => s + 1);
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({
      gameStarted,
      startGame,
      resetGame,
      restartGame,
      session,
      gameResult,
      setGameResult,
    }),
    [gameStarted, startGame, resetGame, restartGame, session, gameResult],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
