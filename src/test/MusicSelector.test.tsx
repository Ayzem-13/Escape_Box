import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import MusicSelector from '../components/MusicSelector/MusicSelector'
import { MUSIC_OPTIONS } from '../config/musicOptions'
import { SELECTED_MUSICS_KEY_DEMO, SELECTED_MUSICS_KEY_NORMAL } from '../config/musicStorage'

const SAVED_KEY = SELECTED_MUSICS_KEY_NORMAL

interface SelectedMusic {
  label: string
  file: string
}

describe('MusicSelector', () => {
  let onClose: ReturnType<typeof vi.fn<() => void>>
  let onSelect: ReturnType<typeof vi.fn<(musics: SelectedMusic[]) => void>>

  beforeEach(() => {
    onClose = vi.fn<() => void>()
    onSelect = vi.fn<(musics: SelectedMusic[]) => void>()
    localStorage.clear()
  })

  const renderSelector = () =>
    render(<MusicSelector onClose={onClose} onSelect={onSelect} />)

  const pickSegment = (count: 1 | 2 | 4) => {
    fireEvent.click(screen.getByTestId(`music-segment-count-${count}`))
  }

  const pickMusic = (slotIndex: number, file: string) => {
    fireEvent.change(screen.getByTestId(`music-dropdown-${slotIndex}`), {
      target: { value: file },
    })
  }

  const validate = () =>
    fireEvent.click(screen.getByTestId('music-selector-validate'))

  it('affiche les 4 segments par défaut (découpage 15+15+15+15)', () => {
    renderSelector()
    pickSegment(4)
    expect(screen.getByTestId('music-dropdown-0')).toHaveValue('')
    expect(screen.getByTestId('music-dropdown-3')).toBeInTheDocument()
  })

  it('mode démo: un seul emplacement musique', () => {
    render(
      <MusicSelector
        onClose={onClose}
        onSelect={onSelect}
        storageKey={SELECTED_MUSICS_KEY_DEMO}
        variant="demo"
      />,
    )
    expect(screen.getByTestId('music-dropdown-0')).toBeInTheDocument()
    expect(screen.queryByTestId('music-dropdown-1')).not.toBeInTheDocument()
  })

  it('chaque dropdown propose toutes les musiques disponibles', () => {
    renderSelector()
    const dropdown = screen.getByTestId('music-dropdown-0') as HTMLSelectElement
    MUSIC_OPTIONS.forEach((option) => {
      const matched = Array.from(dropdown.options).some(
        (o) => o.value === option.file,
      )
      expect(matched).toBe(true)
    })
  })

  it('le bouton Valider est désactivé tant que le découpage courant est incomplet', () => {
    renderSelector()
    pickMusic(0, MUSIC_OPTIONS[0].file)
    expect(screen.getByTestId('music-selector-validate')).toBeDisabled()
  })

  it('active Valider quand tous les emplacements du découpage choisi sont remplis', () => {
    renderSelector()
    pickSegment(1)
    pickMusic(0, MUSIC_OPTIONS[0].file)
    expect(screen.getByTestId('music-selector-validate')).toBeEnabled()
  })

  it('découpage 2 : Valider après deux musiques différentes', () => {
    renderSelector()
    pickSegment(2)
    pickMusic(0, MUSIC_OPTIONS[0].file)
    pickMusic(1, MUSIC_OPTIONS[1].file)
    expect(screen.getByTestId('music-selector-validate')).toBeEnabled()
    validate()
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect.mock.calls[0][0]).toHaveLength(2)
  })

  it('appelle onSelect avec les pistes correspondant au découpage 4', () => {
    renderSelector()
    pickSegment(4)
    for (let i = 0; i < 4; i++) {
      pickMusic(i, MUSIC_OPTIONS[i % MUSIC_OPTIONS.length].file)
    }
    validate()

    expect(onSelect).toHaveBeenCalledTimes(1)
    const arg = onSelect.mock.calls[0][0]
    expect(arg).toHaveLength(4)
  })

  it('persiste au format objet segmentCount + tracks en mode normal', () => {
    renderSelector()
    pickSegment(1)
    pickMusic(0, MUSIC_OPTIONS[0].file)
    validate()

    const raw = localStorage.getItem(SAVED_KEY)
    expect(raw).toBeTruthy()
    const stored = JSON.parse(raw!) as { segmentCount: number; tracks: SelectedMusic[] }
    expect(stored.segmentCount).toBe(1)
    expect(stored.tracks).toHaveLength(1)
    expect(stored.tracks[0]).toEqual({
      label: MUSIC_OPTIONS[0].label,
      file: MUSIC_OPTIONS[0].file,
    })
  })

  it('ferme automatiquement 2 secondes après validation', () => {
    vi.useFakeTimers()
    try {
      renderSelector()
      pickSegment(1)
      pickMusic(0, MUSIC_OPTIONS[0].file)
      validate()
      expect(onClose).not.toHaveBeenCalled()
      act(() => {
        vi.advanceTimersByTime(2000)
      })
      expect(onClose).toHaveBeenCalledTimes(1)
    } finally {
      vi.useRealTimers()
    }
  })

  it('affiche le bandeau de validation après le clic sur Valider', () => {
    renderSelector()
    pickSegment(1)
    pickMusic(0, MUSIC_OPTIONS[0].file)
    expect(screen.queryByTestId('music-validation')).not.toBeInTheDocument()
    validate()
    expect(screen.getByTestId('music-validation')).toBeInTheDocument()
  })

  it('permet de retirer une musique via le bouton ✕ (découpage 1)', () => {
    renderSelector()
    pickSegment(1)
    pickMusic(0, MUSIC_OPTIONS[0].file)
    expect(screen.getByTestId('music-selector-validate')).toBeEnabled()
    fireEvent.click(screen.getByTestId('music-remove-0'))
    expect(screen.getByTestId('music-dropdown-0')).toHaveValue('')
    expect(screen.getByTestId('music-selector-validate')).toBeDisabled()
  })

  it('"Annuler" ferme la popup sans valider', () => {
    renderSelector()
    pickSegment(1)
    pickMusic(0, MUSIC_OPTIONS[0].file)
    fireEvent.click(screen.getByTestId('music-selector-close'))
    expect(onClose).toHaveBeenCalledTimes(1)
    expect(onSelect).not.toHaveBeenCalled()
    expect(localStorage.getItem(SAVED_KEY)).toBeNull()
  })

  it('clic sur l\'overlay ferme la popup', () => {
    const { container } = renderSelector()
    const overlay = container.querySelector('.music-selector-overlay') as HTMLElement
    fireEvent.click(overlay)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('précharge la sélection sauvegardée (ancien format tableau)', () => {
    const seeded = [
      { label: MUSIC_OPTIONS[0].label, file: MUSIC_OPTIONS[0].file },
    ]
    localStorage.setItem(SAVED_KEY, JSON.stringify(seeded))
    renderSelector()
    fireEvent.change(screen.getByTestId(`music-dropdown-0`), {
      target: { value: MUSIC_OPTIONS[1].file },
    })
    expect(screen.getByTestId('music-selector-validate')).toBeEnabled()
  })
})
