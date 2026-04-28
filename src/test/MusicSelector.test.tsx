import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import MusicSelector from '../components/MusicSelector/MusicSelector'
import { MUSIC_OPTIONS } from '../config/musicOptions'

const SAVED_KEY = 'escapeBoxSelectedMusics'

describe('MusicSelector', () => {
  let onClose: ReturnType<typeof vi.fn>
  let onSelect: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onClose = vi.fn()
    onSelect = vi.fn()
  })

  const renderSelector = () =>
    render(<MusicSelector onClose={onClose} onSelect={onSelect} />)

  const pickMusic = (slotIndex: number, file: string) => {
    fireEvent.change(screen.getByTestId(`music-dropdown-${slotIndex}`), {
      target: { value: file },
    })
  }

  it('affiche 3 dropdowns vides au montage initial', () => {
    renderSelector()
    expect(screen.getByTestId('music-dropdown-0')).toHaveValue('')
    expect(screen.getByTestId('music-dropdown-1')).toHaveValue('')
    expect(screen.getByTestId('music-dropdown-2')).toHaveValue('')
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

  it('le bouton Valider est désactivé tant qu\'aucune musique n\'est sélectionnée', () => {
    renderSelector()
    expect(screen.getByTestId('music-selector-validate')).toBeDisabled()
  })

  it('active Valider dès qu\'au moins une musique est sélectionnée', () => {
    renderSelector()
    pickMusic(0, MUSIC_OPTIONS[0].file)
    expect(screen.getByTestId('music-selector-validate')).toBeEnabled()
  })

  it('appelle onSelect avec le tableau des musiques choisies au clic sur Valider', () => {
    renderSelector()
    pickMusic(0, MUSIC_OPTIONS[0].file)
    if (MUSIC_OPTIONS.length >= 2) pickMusic(1, MUSIC_OPTIONS[1].file)
    fireEvent.click(screen.getByTestId('music-selector-validate'))

    expect(onSelect).toHaveBeenCalledTimes(1)
    const arg = onSelect.mock.calls[0][0]
    expect(arg[0]).toEqual({
      label: MUSIC_OPTIONS[0].label,
      file: MUSIC_OPTIONS[0].file,
    })
    if (MUSIC_OPTIONS.length >= 2) {
      expect(arg[1]).toEqual({
        label: MUSIC_OPTIONS[1].label,
        file: MUSIC_OPTIONS[1].file,
      })
    }
  })

  it('persiste la sélection dans localStorage à la validation', () => {
    renderSelector()
    pickMusic(0, MUSIC_OPTIONS[0].file)
    fireEvent.click(screen.getByTestId('music-selector-validate'))

    const stored = JSON.parse(localStorage.getItem(SAVED_KEY) || '[]')
    expect(stored).toHaveLength(1)
    expect(stored[0]).toEqual({
      label: MUSIC_OPTIONS[0].label,
      file: MUSIC_OPTIONS[0].file,
    })
  })

  it('ferme automatiquement 2 secondes après validation', () => {
    vi.useFakeTimers()
    try {
      renderSelector()
      pickMusic(0, MUSIC_OPTIONS[0].file)
      fireEvent.click(screen.getByTestId('music-selector-validate'))
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
    pickMusic(0, MUSIC_OPTIONS[0].file)
    expect(screen.queryByTestId('music-validation')).not.toBeInTheDocument()
    fireEvent.click(screen.getByTestId('music-selector-validate'))
    expect(screen.getByTestId('music-validation')).toBeInTheDocument()
  })

  it('permet de retirer une musique via le bouton ✕', () => {
    renderSelector()
    pickMusic(0, MUSIC_OPTIONS[0].file)
    expect(screen.getByTestId('music-selector-validate')).toBeEnabled()
    fireEvent.click(screen.getByTestId('music-remove-0'))
    expect(screen.getByTestId('music-dropdown-0')).toHaveValue('')
    expect(screen.getByTestId('music-selector-validate')).toBeDisabled()
  })

  it('"Annuler" ferme la popup sans valider', () => {
    renderSelector()
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

  it('précharge la sélection sauvegardée dans localStorage', () => {
    const seeded = [
      { label: MUSIC_OPTIONS[0].label, file: MUSIC_OPTIONS[0].file },
    ]
    localStorage.setItem(SAVED_KEY, JSON.stringify(seeded))
    renderSelector()
    expect(screen.getByTestId('music-dropdown-0')).toHaveValue(
      MUSIC_OPTIONS[0].file,
    )
  })
})

