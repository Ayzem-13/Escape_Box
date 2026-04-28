import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import { useGame } from '../context/GameContext'
import { MUSIC_OPTIONS } from '../config/musicOptions'

const SAVED_KEY = 'escapeBoxSelectedMusics'

const TriggerStart = () => {
  const { startGame } = useGame()
  return (
    <button onClick={startGame} data-testid="trigger-start">
      start
    </button>
  )
}

const renderLayout = () =>
  render(
    <MemoryRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TriggerStart />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )

const pickAndValidate = (file: string) => {
  fireEvent.click(screen.getByTestId('layout-music-btn'))
  fireEvent.change(screen.getByTestId('music-dropdown-0'), {
    target: { value: file },
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
  })

  afterEach(() => {
    vi.restoreAllMocks()
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
    pickAndValidate(MUSIC_OPTIONS[0].file)
    const stored = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]')
    expect(stored).toHaveLength(1)
    expect(stored[0].file).toBe(MUSIC_OPTIONS[0].file)
  })

  it('démarre la lecture de la première musique après validation', () => {
    renderLayout()
    pickAndValidate(MUSIC_OPTIONS[0].file)
    expect(playSpy).toHaveBeenCalled()
    const audio = playSpy.mock.contexts[
      playSpy.mock.contexts.length - 1
    ] as HTMLAudioElement
    expect(audio.src).toContain(MUSIC_OPTIONS[0].file.split('/').pop()!)
  })

  it('charge la sélection sauvegardée au montage et la joue', () => {
    const seeded = [
      { label: MUSIC_OPTIONS[0].label, file: MUSIC_OPTIONS[0].file },
    ]
    localStorage.setItem(SAVED_KEY, JSON.stringify(seeded))
    renderLayout()
    expect(playSpy).toHaveBeenCalled()
  })

  it('ferme le popup automatiquement 2s après validation', () => {
    vi.useFakeTimers()
    try {
      renderLayout()
      pickAndValidate(MUSIC_OPTIONS[0].file)
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
})

describe('Layout — bouton thème', () => {
  it('cache le bouton thème quand la partie est démarrée', () => {
    renderLayout()
    expect(screen.queryByTestId('layout-theme-btn')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('trigger-start'))
    expect(screen.queryByTestId('layout-theme-btn')).not.toBeInTheDocument()
  })
})
