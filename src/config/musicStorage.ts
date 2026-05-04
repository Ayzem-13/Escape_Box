/** Playlist du mode normal (1, 2 ou 4 segments sur 60 min). */
export const SELECTED_MUSICS_KEY_NORMAL = 'escapeBoxSelectedMusics'

/** Une seule piste persistée pour le mode démo (ne modifie pas la config du mode normal). */
export const SELECTED_MUSICS_KEY_DEMO = 'escapeBoxSelectedMusicsDemo'

export type NormalSegmentCount = 1 | 2 | 4

export const NORMAL_SEGMENT_OPTIONS: readonly NormalSegmentCount[] = [1, 2, 4] as const

export interface SelectedMusicFile {
  label: string
  file: string
}

export interface NormalMusicStoredV2 {
  segmentCount: NormalSegmentCount
  tracks: SelectedMusicFile[]
}

/** Libellés de plage horaire sur une partie de 60 minutes. */
export const normalSegmentRangeLabels: Record<NormalSegmentCount, string[]> = {
  1: ['de 0 à 60 min'],
  2: ['de 0 à 30 min', 'de 30 à 60 min'],
  4: [
    'de 0 à 15 min',
    'de 15 à 30 min',
    'de 30 à 45 min',
    'de 45 à 60 min',
  ],
}

function legacyArrayToNormalState(arr: SelectedMusicFile[]): {
  segmentCount: NormalSegmentCount
  tracks: (SelectedMusicFile | null)[]
} {
  const n = arr.length
  if (n === 0) {
    return { segmentCount: 4, tracks: [null, null, null, null] }
  }
  if (n === 1) return { segmentCount: 1, tracks: [arr[0]] }
  if (n === 2) return { segmentCount: 2, tracks: [arr[0], arr[1]] }
  if (n === 3) {
    return {
      segmentCount: 4,
      tracks: [arr[0], arr[1], arr[2], null],
    }
  }
  return {
    segmentCount: 4,
    tracks: [arr[0], arr[1], arr[2], arr[3]],
  }
}

/** État initial du sélecteur mode normal depuis localStorage. */
export function parseNormalMusicStorage(raw: string | null): {
  segmentCount: NormalSegmentCount
  tracks: (SelectedMusicFile | null)[]
} {
  if (!raw) {
    return { segmentCount: 4, tracks: [null, null, null, null] }
  }
  try {
    const parsed: unknown = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return legacyArrayToNormalState(parsed as SelectedMusicFile[])
    }
    if (
      parsed &&
      typeof parsed === 'object' &&
      'segmentCount' in parsed &&
      'tracks' in parsed
    ) {
      const { segmentCount: sc, tracks: tr } = parsed as NormalMusicStoredV2
      if (sc === 1 || sc === 2 || sc === 4) {
        const tracks = Array.from({ length: sc }, (_, i) =>
          tr[i] && typeof tr[i].file === 'string' ? tr[i] : null,
        )
        return { segmentCount: sc, tracks }
      }
    }
  } catch {
    // ignore
  }
  return { segmentCount: 4, tracks: [null, null, null, null] }
}

export function serializeNormalMusicStorage(
  segmentCount: NormalSegmentCount,
  tracks: SelectedMusicFile[],
): string {
  return JSON.stringify({ segmentCount, tracks } satisfies NormalMusicStoredV2)
}

/** Liste de lecture pour le moteur audio (tableau ou objet version 2). */
export function readStoredMusicPlaylist(raw: string | null): SelectedMusicFile[] {
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    if (Array.isArray(parsed)) {
      return parsed as SelectedMusicFile[]
    }
    if (
      parsed &&
      typeof parsed === 'object' &&
      'tracks' in parsed &&
      Array.isArray((parsed as NormalMusicStoredV2).tracks)
    ) {
      return (parsed as NormalMusicStoredV2).tracks
    }
  } catch {
    // ignore
  }
  return []
}

/** Liste des pistes + découpage pour synchroniser avec le chronomètre de partie. */
export function readMusicPlaybackConfig(
  raw: string | null,
  isDemo: boolean,
): { tracks: SelectedMusicFile[]; segmentCount: NormalSegmentCount } {
  if (!raw) return { tracks: [], segmentCount: 1 }
  if (isDemo) {
    const tracks = readStoredMusicPlaylist(raw)
    return { tracks, segmentCount: 1 }
  }
  const { segmentCount, tracks: slots } = parseNormalMusicStorage(raw)
  const tracks = slots.filter((m): m is SelectedMusicFile => m !== null)
  if (tracks.length === 0) return { tracks: [], segmentCount: 1 }
  return { tracks, segmentCount }
}

/**
 * Indice de piste à jouer selon le temps du chrono (compte à rebours),
 * pas selon la fin du fichier audio. `elapsed = initialSec - remainingSec`.
 */
export function playbackSegmentIndex(args: {
  remainingSec: number
  initialSec: number
  segmentCount: NormalSegmentCount
}): number {
  const { remainingSec, initialSec, segmentCount } = args
  if (segmentCount === 1) return 0
  if (initialSec <= 0) return 0
  const elapsed = Math.max(0, Math.min(initialSec, initialSec - remainingSec))
  const segmentDurationSec = initialSec / segmentCount
  const idx = Math.floor(elapsed / segmentDurationSec)
  return Math.min(idx, segmentCount - 1)
}
