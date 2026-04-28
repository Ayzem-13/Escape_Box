import { createContext, useContext } from 'react';

interface MusicSelectorContextValue {
  openSelector: () => void;
  isAvailable: boolean;
}

export const MusicSelectorContext = createContext<MusicSelectorContextValue>({
  openSelector: () => {},
  isAvailable: false,
});

export const useMusicSelector = () => useContext(MusicSelectorContext);
