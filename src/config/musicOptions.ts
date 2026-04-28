// Configuration des musiques disponibles pour le jeu
import suspenseAmbience2 from '../assets/music/absolutesound-suspense-ambience-2-514627.mp3';
import suspenseTenseAtmosphere from '../assets/music/absolutesound-suspense-tense-atmosphere-514617.mp3';
import tenseSuspenseAmbience from '../assets/music/absolutesound-tense-suspense-ambience-514632.mp3';

export interface MusicOption {
  id: string;
  label: string;
  file: string;
}

export const MUSIC_OPTIONS: readonly MusicOption[] = [
  {
    id: 'music-1',
    label: 'Suspense Ambience 2',
    file: suspenseAmbience2,
  },
  {
    id: 'music-2',
    label: 'Suspense Tense Atmosphere',
    file: suspenseTenseAtmosphere,
  },
  {
    id: 'music-3',
    label: 'Tense Suspense Ambience',
    file: tenseSuspenseAmbience,
  },
];

export const getMusicLabels = (): string[] => MUSIC_OPTIONS.map((m) => m.label);
