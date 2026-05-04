import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import { useGame } from '../context/GameContext'
import { MUSIC_OPTIONS } from '../config/musicOptions'
import { readStoredMusicPlaylist, SELECTED_MUSICS_KEY_DEMO, SELECTED_MUSICS_KEY_NORMAL } from '../config/musicStorage'

const SAVED_KEY = SELECTED_MUSICS_KEY_NORMAL

const TriggerStart = () => {
  const { startGame } = useGame()
  return (
    <button onClick={startGame} data-testid="trigger-start">
      start
    </button>
  )
}

const renderLayout = (initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TriggerStart />} />
          <Route path="/demo" element={<TriggerStart />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )

/** Mode normal : découpage 1 morceau puis choix de la piste. */
const pickAndValidateOneTrackNormal = () => {
  fireEvent.click(screen.getByTestId('layout-music-btn'))
  fireEvent.click(screen.getByTestId('music-segment-count-1'))
  fireEvent.change(screen.getByTestId('music-dropdown-0'), {
    target: { value: MUSIC_OPTIONS[0].file },
  })
  fireEvent.click(screen.getByTestId('music-selector-validate'))
}

describe('Layout — bouton musique', () => {
  let playSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    playSpy = vi
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve())
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    localStorage.clear()
  })

  it('affiche le bouton ♪ hors partie', () => {
    renderLayout()
    expect(screen.getByTestId('layout-music-btn')).toBeInTheDocument()
  })

  it('ouvre le popup MusicSelector au clic sur ♪', () => {
    renderLayout()
    fireEvent.click(screen.getByTestId('layout-music-btn'))
    expect(screen.getByTestId('music-dropdown-0')).toBeInTheDocument()
  })

  it('persiste la sélection dans localStorage à la validation', () => {
    renderLayout()
    pickAndValidateOneTrackNormal()
    const raw = localStorage.getItem(SAVED_KEY)
    expect(raw).toBeTruthy()
    const stored = JSON.parse(raw!) as {
      segmentCount: number
      tracks: { file: string }[]
    }
    expect(stored.segmentCount).toBe(1)
    expect(stored.tracks).toHaveLength(1)
    expect(stored.tracks[0].file).toBe(MUSIC_OPTIONS[0].file)
  })

  it('démarre la lecture de la première musique au démarrage de la partie après validation', () => {
    renderLayout()
    pickAndValidateOneTrackNormal()
    fireEvent.click(screen.getByTestId('trigger-start'))
    expect(playSpy).toHaveBeenCalled()
    const gameAudio = screen.getByTestId('layout-game-music') as HTMLAudioElement
    expect(gameAudio.src).toContain(MUSIC_OPTIONS[0].file.split('/').pop()!)
    const bed = screen.getByTestId('layout-ambient-bed') as HTMLAudioElement
    expect(bed.loop).toBe(true)
  })

  it('charge la sélection sauvegardée et la joue au démarrage de la partie', () => {
    const seeded = [
      { label: MUSIC_OPTIONS[0].label, file: MUSIC_OPTIONS[0].file },
    ]
    localStorage.setItem(SAVED_KEY, JSON.stringify(seeded))
    renderLayout()
    fireEvent.click(screen.getByTestId('trigger-start'))
    expect(playSpy).toHaveBeenCalled()
    const gameAudio = screen.getByTestId('layout-game-music') as HTMLAudioElement
    const playlist = readStoredMusicPlaylist(JSON.stringify(seeded))
    expect(gameAudio.src).toContain(playlist[0].file.split('/').pop()!)
  })

  it('ferme le popup automatiquement 2s après validation', () => {
    vi.useFakeTimers()
    try {
      renderLayout()
      pickAndValidateOneTrackNormal()
      expect(screen.getByTestId('music-dropdown-0')).toBeInTheDocument()
      act(() => {
        vi.advanceTimersByTime(2000)
      })
      expect(screen.queryByTestId('music-dropdown-0')).not.toBeInTheDocument()
    } finally {
      vi.useRealTimers()
    }
  })

  it('"Annuler" ferme le popup sans valider la sélection', () => {
    renderLayout()
    fireEvent.click(screen.getByTestId('layout-music-btn'))
    fireEvent.change(screen.getByTestId('music-dropdown-0'), {
      target: { value: MUSIC_OPTIONS[0].file },
    })
    fireEvent.click(screen.getByTestId('music-selector-close'))
    expect(screen.queryByTestId('music-dropdown-0')).not.toBeInTheDocument()
    expect(localStorage.getItem(SAVED_KEY)).toBeNull()
  })

  it('sur /demo, le sélecteur n\'expose qu\'un seul dropdown et persiste sous la clé démo', () => {
    renderLayout('/demo')
    fireEvent.click(screen.getByTestId('layout-music-btn'))
    expect(screen.getByTestId('music-dropdown-0')).toBeInTheDocument()
    expect(screen.queryByTestId('music-dropdown-1')).not.toBeInTheDocument()
    fireEvent.change(screen.getByTestId('music-dropdown-0'), {
      target: { value: MUSIC_OPTIONS[0].file },
    })
    fireEvent.click(screen.getByTestId('music-selector-validate'))
    const demoStored = JSON.parse(
      localStorage.getItem(SELECTED_MUSICS_KEY_DEMO) || '[]',
    )
    expect(demoStored).toHaveLength(1)
    expect(localStorage.getItem(SELECTED_MUSICS_KEY_NORMAL)).toBeNull()
  })
})

describe('Layout — bouton thème', () => {
  beforeEach(() => localStorage.clear())

  afterEach(() => localStorage.clear())

  it('cache le bouton thème quand la partie est démarrée', () => {
    renderLayout()
    expect(screen.queryByTestId('layout-theme-btn')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('trigger-start'))
    expect(screen.queryByTestId('layout-theme-btn')).not.toBeInTheDocument()
  })
})
