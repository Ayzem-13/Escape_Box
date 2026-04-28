import React, { useEffect, useRef } from 'react';
import { MUSIC_OPTIONS } from '../../config/musicOptions';

export const SELECTED_MUSIC_KEY = 'escapeBoxSelectedMusic';

const readSelectedMusicFile = (): string | null => {
  try {
    return localStorage.getItem(SELECTED_MUSIC_KEY);
  } catch {
    return null;
  }
};

const pickRandomMusicFile = (): string | null => {
  if (MUSIC_OPTIONS.length === 0) return null;
  const idx = Math.floor(Math.random() * MUSIC_OPTIONS.length);
  return MUSIC_OPTIONS[idx].file;
};

interface BackgroundMusicProps {
  volume?: number;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({ volume = 0.4 }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = volume;
    audio.preload = 'auto';
    audioRef.current = audio;

    const file = readSelectedMusicFile() ?? pickRandomMusicFile();
    if (file) {
      audio.src = file;
      const result = audio.play();
      if (result && typeof result.catch === 'function') {
        result.catch(() => {});
      }
    }

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, [volume]);

  return null;
};

export default BackgroundMusic;
