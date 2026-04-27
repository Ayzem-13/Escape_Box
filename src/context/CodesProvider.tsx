import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  CodesContext,
  codesStorageKey,
  type Code,
  type Codes,
  type CodesContextValue,
  type GameMode,
} from './CodesContext';

const emptyCodes = (slotCount: number): Codes => Array.from({ length: slotCount }, () => '');

const loadCodes = (mode: GameMode, slotCount: number): Codes => {
  const empty = emptyCodes(slotCount);
  try {
    const raw = localStorage.getItem(codesStorageKey(mode));
    if (!raw) return empty;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return empty;
    const out = empty.slice();
    for (let i = 0; i < Math.min(parsed.length, slotCount); i++) {
      if (typeof parsed[i] === 'string') out[i] = parsed[i];
    }
    return out;
  } catch {
    return empty;
  }
};

interface CodesProviderProps {
  mode: GameMode;
  slotCount: number;
  children: ReactNode;
}

export const CodesProvider = ({ mode, slotCount, children }: CodesProviderProps) => {
  const [codes, setCodes] = useState<Codes>(() => loadCodes(mode, slotCount));

  useEffect(() => {
    localStorage.setItem(codesStorageKey(mode), JSON.stringify(codes));
  }, [mode, codes]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === codesStorageKey(mode)) setCodes(loadCodes(mode, slotCount));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [mode, slotCount]);

  const setCodeAt = useCallback((index: number, code: Code) => {
    setCodes((prev) => {
      const next = prev.slice();
      next[index] = code;
      return next;
    });
  }, []);

  const clearCodes = useCallback(() => {
    setCodes(emptyCodes(slotCount));
    localStorage.removeItem(codesStorageKey(mode));
  }, [mode, slotCount]);

  const filledCount = codes.filter((c) => c.length === 4).length;

  const value = useMemo<CodesContextValue>(
    () => ({
      mode,
      codes,
      slotCount,
      setCodeAt,
      clearCodes,
      filledCount,
      allCodesSet: filledCount === slotCount,
    }),
    [mode, codes, slotCount, setCodeAt, clearCodes, filledCount],
  );

  return <CodesContext.Provider value={value}>{children}</CodesContext.Provider>;
};
