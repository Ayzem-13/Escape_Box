import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { toast } from 'react-toastify';
import { GameContext, type GameContextValue } from './GameContext';
import { codesStorageKey } from './CodesContext';

const wipeAllCodes = () => {
  localStorage.removeItem(codesStorageKey('demo'));
  localStorage.removeItem(codesStorageKey('normal'));
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [session, setSession] = useState(0);

  const startGame = useCallback(() => setGameStarted(true), []);

  const resetGame = useCallback(() => {
    setGameStarted(false);
    wipeAllCodes();
    setSession((s) => s + 1);
  }, []);

  const restartGame = useCallback(() => {
    toast.info('Partie redémarrée !');
    setSession((s) => s + 1);
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({ gameStarted, startGame, resetGame, restartGame, session }),
    [gameStarted, startGame, resetGame, restartGame, session],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
