import { createContext, useContext } from 'react';

export type Code = string;
export type Codes = Code[];
export type GameMode = 'demo' | 'normal';

export type CodesContextValue = {
  mode: GameMode;
  codes: Codes;
  slotCount: number;
  setCodeAt: (index: number, code: Code) => void;
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
