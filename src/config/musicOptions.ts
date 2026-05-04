// Configuration des musiques disponibles pour le jeu
export interface MusicOption {
  id: string;
  label: string;
  file: string;
  /** Niveau lu dans le nom de fichier (`Stress 0`, …). */
  stressLevel: number;
}

/** Regroupement par niveau de stress pour le sélecteur (sections en liste plate). */
export interface MusicStressGroup {
  stressLevel: number;
  groupLabel: string;
  options: readonly MusicOption[];
}

// Import dynamique des musiques du dossier assets/music
const musicModules = import.meta.glob<{ default: string }>(
  '../assets/music/*.mp3',
  { eager: true }
);

/** Indice après le préfixe « Stress N » (fichiers nommés « Stress 0 … », etc.). */
function parseStressLevel(fileName: string): number | null {
  const m = /^stress\s+(\d+)\s+/i.exec(fileName.trim());
  return m ? Number.parseInt(m[1], 10) : null;
}

function fileNameFromPath(path: string): string {
  return path.split('/').pop()?.replace(/\.mp3$/i, '') ?? '';
}

/** Libellé dérivé du nom de fichier (sans préfixe « Stress N »), ex. Heuss Barmitzvah, Subway. */
function titleFromStressFile(fileName: string): string {
  const withoutPrefix = fileName.replace(/^stress\s+\d+\s+/i, '').trim();
  return withoutPrefix
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/** Noms d’affichage fictifs stables — ordre mélangé de façon déterministe par build. */
const CODENAME_POOL = [
  'Atlas',
  'Brume',
  'Carmin',
  'Dédale',
  'Éclipse',
  'Filament',
  'Givre',
  'Héraut',
  'Iris',
  'Jade',
  'Kraken',
  'Limbus',
  'Méandre',
  'Névé',
  'Orion',
  'Pavane',
  'Quartz',
  'Sillage',
] as const;

function seededCodenameOrder(seed: string): readonly string[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i);
  }
  const names = [...CODENAME_POOL];
  let s = Math.abs(h) || 1;
  for (let i = names.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1103515245) + 12345) | 0;
    const j = Math.abs(s) % (i + 1);
    [names[i], names[j]] = [names[j], names[i]];
  }
  return names;
}

type RawEntry = {
  path: string;
  fileName: string;
  file: string;
  stress: number;
  sortKey: string;
  isHeuss: boolean;
  /** Stress 0 : Subway en 2ᵉ après Heuss ; libellé = nom fichier (Subway). */
  isSubway: boolean;
};

function usesRealFilenameLabel(entry: RawEntry): boolean {
  return entry.isHeuss || entry.isSubway;
}

/** Ordre forcé sous stress 0 : Heuss, Subway, puis alpha sur le reste. */
function stress0OrderRank(entry: RawEntry): number {
  if (entry.isHeuss) return 0;
  if (entry.isSubway) return 1;
  return 2;
}

const rawEntries: RawEntry[] = Object.entries(musicModules).map(
  ([path, module]) => {
    const fileName = fileNameFromPath(path);
    const stress = parseStressLevel(fileName) ?? 999;
    const isHeuss = /heuss/i.test(fileName);
    const isSubway = /subway/i.test(fileName);
    return {
      path,
      fileName,
      file: module.default,
      stress,
      sortKey: fileName.replace(/^stress\s+\d+\s+/i, '').toLowerCase(),
      isHeuss,
      isSubway,
    };
  },
);

rawEntries.sort((a, b) => {
  if (a.stress !== b.stress) return a.stress - b.stress;
  if (a.stress === 0 && b.stress === 0) {
    const ra = stress0OrderRank(a);
    const rb = stress0OrderRank(b);
    if (ra !== rb) return ra - rb;
  }
  return a.sortKey.localeCompare(b.sortKey, 'fr');
});

const codenames = seededCodenameOrder('escape-box-music-codenames-v1');
let codenameIndex = 0;

export const MUSIC_OPTIONS: readonly MusicOption[] = rawEntries.map(
  (entry, index) => {
    const idSlug = entry.fileName
      .toLowerCase()
      .replace(/^stress\s+\d+\s+/i, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    const id = idSlug ? `music-${idSlug}` : `music-${index + 1}`;

    let label: string;
    if (usesRealFilenameLabel(entry)) {
      label = titleFromStressFile(entry.fileName);
    } else {
      const name = codenames[codenameIndex];
      codenameIndex += 1;
      if (!name) {
        throw new Error(
          'CODENAME_POOL trop petit : ajoutez des entrées pour toutes les pistes sans nom réel.',
        );
      }
      label = name;
    }

    return {
      id,
      label,
      file: entry.file,
      stressLevel: entry.stress,
    };
  },
);

function stressGroupLabel(level: number): string {
  if (level >= 0 && level <= 9) {
    return `Niveau de stress ${level}`;
  }
  return 'Autres';
}

function buildMusicOptionGroups(
  options: readonly MusicOption[],
): readonly MusicStressGroup[] {
  type GroupAcc = {
    stressLevel: number;
    groupLabel: string;
    options: MusicOption[];
  };
  const groups: GroupAcc[] = [];
  for (const opt of options) {
    let g = groups[groups.length - 1];
    if (!g || g.stressLevel !== opt.stressLevel) {
      g = {
        stressLevel: opt.stressLevel,
        groupLabel: stressGroupLabel(opt.stressLevel),
        options: [],
      };
      groups.push(g);
    }
    g.options.push(opt);
  }
  return groups;
}

export const MUSIC_OPTION_GROUPS: readonly MusicStressGroup[] =
  buildMusicOptionGroups(MUSIC_OPTIONS);

export const getMusicLabels = (): string[] => MUSIC_OPTIONS.map((m) => m.label);
