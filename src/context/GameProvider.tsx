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
  const [chronoRemainingSec, setChronoRemainingSec] = useState<number | null>(
    null,
  );
  const [chronoInitialSec, setChronoInitialSec] = useState<number | null>(null);

  const setChronoTick = useCallback((remainingSec: number, initialSec: number) => {
    setChronoRemainingSec(remainingSec);
    setChronoInitialSec(initialSec);
  }, []);

  const clearChronoTick = useCallback(() => {
    setChronoRemainingSec(null);
    setChronoInitialSec(null);
  }, []);

  const startGame = useCallback(() => {
    setGameResult(null);
    setGameStarted(true);
  }, []);

  const resetGame = useCallback(() => {
    setGameStarted(false);
    setGameResult(null);
    clearChronoTick();
    wipeAllCodes();
    setSession((s) => s + 1);
  }, [clearChronoTick]);

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
      chronoRemainingSec,
      chronoInitialSec,
      setChronoTick,
      clearChronoTick,
    }),
    [
      gameStarted,
      startGame,
      resetGame,
      restartGame,
      session,
      gameResult,
      chronoRemainingSec,
      chronoInitialSec,
      setChronoTick,
      clearChronoTick,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
