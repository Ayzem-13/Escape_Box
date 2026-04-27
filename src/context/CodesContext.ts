import { createContext, useContext } from 'react';

export type Code = string;
export type CodesTuple = [Code, Code, Code];
export type GameMode = 'demo' | 'normal';

export type CodesContextValue = {
  mode: GameMode;
  codes: CodesTuple;
  setCodeAt: (index: 0 | 1 | 2, code: Code) => void;
  clearCodes: () => void;
  filledCount: number;
  allCodesSet: boolean;
};

export const CodesContext = createContext<CodesContextValue | null>(null);

export const useCodes = (): CodesContextValue => {
  const ctx = useContext(CodesContext);
  if (!ctx) throw new Error('useCodes must be used within a CodesProvider');
  return ctx;
};

export const codesStorageKey = (mode: GameMode) => `escapeBoxCodes:${mode}`;
