// Configuration des musiques disponibles pour le jeu
export interface MusicOption {
  id: string;
  label: string;
  file: string;
}

// Import dynamique des musiques du dossier assets/music
const musicModules = import.meta.glob<{ default: string }>(
  '../assets/music/*.mp3',
  { eager: true }
);

// Générer les options de musique dynamiquement
export const MUSIC_OPTIONS: readonly MusicOption[] = Object.entries(musicModules)
  .map(([path, module], index) => {
    // Extraire le nom du fichier sans l'extension
    const fileName = path.split('/').pop()?.replace('.mp3', '') || `music-${index}`;
    
    return {
      id: `music-${index + 1}`,
      label: fileName
        .replace(/absolutesound-/g, '')
        .replace(/-/g, ' ')
        .replace(/^\w/, (c) => c.toUpperCase())
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      file: module.default,
    };
  })
  .sort((a, b) => a.label.localeCompare(b.label));

export const getMusicLabels = (): string[] => MUSIC_OPTIONS.map((m) => m.label);
