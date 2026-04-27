import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  CodesContext,
  codesStorageKey,
  type Code,
  type CodesContextValue,
  type CodesTuple,
  type GameMode,
} from './CodesContext';

const EMPTY_CODES: CodesTuple = ['', '', ''];

const isCodesTuple = (value: unknown): value is CodesTuple =>
  Array.isArray(value) &&
  value.length === 3 &&
  value.every((c) => typeof c === 'string');

const loadCodes = (mode: GameMode): CodesTuple => {
  try {
    const raw = localStorage.getItem(codesStorageKey(mode));
    if (!raw) return [...EMPTY_CODES] as CodesTuple;
    const parsed = JSON.parse(raw);
    return isCodesTuple(parsed) ? parsed : ([...EMPTY_CODES] as CodesTuple);
  } catch {
    return [...EMPTY_CODES] as CodesTuple;
  }
};

type CodesProviderProps = {
  mode: GameMode;
  children: ReactNode;
};

export const CodesProvider = ({ mode, children }: CodesProviderProps) => {
  const [codes, setCodes] = useState<CodesTuple>(() => loadCodes(mode));

  useEffect(() => {
    localStorage.setItem(codesStorageKey(mode), JSON.stringify(codes));
  }, [mode, codes]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === codesStorageKey(mode)) setCodes(loadCodes(mode));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [mode]);

  const setCodeAt = useCallback((index: 0 | 1 | 2, code: Code) => {
    setCodes((prev) => {
      const next = [...prev] as CodesTuple;
      next[index] = code;
      return next;
    });
  }, []);

  const clearCodes = useCallback(() => {
    setCodes([...EMPTY_CODES] as CodesTuple);
    localStorage.removeItem(codesStorageKey(mode));
  }, [mode]);

  const filledCount = codes.filter((c) => c.length === 4).length;

  const value = useMemo<CodesContextValue>(
    () => ({
      mode,
      codes,
      setCodeAt,
      clearCodes,
      filledCount,
      allCodesSet: filledCount === 3,
    }),
    [mode, codes, setCodeAt, clearCodes, filledCount],
  );

  return <CodesContext.Provider value={value}>{children}</CodesContext.Provider>;
};
