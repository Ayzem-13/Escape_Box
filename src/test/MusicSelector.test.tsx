import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import MusicSelector from '../components/MusicSelector/MusicSelector'
import { MUSIC_OPTIONS } from '../config/musicOptions'

describe('MusicSelector', () => {
  let onClose: ReturnType<typeof vi.fn>
  let onSelect: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onClose = vi.fn()
    onSelect = vi.fn()
  })

  const renderSelector = () =>
    render(<MusicSelector onClose={onClose} onSelect={onSelect} />)

  it('affiche toutes les options de musique', () => {
    renderSelector()
    expect(MUSIC_OPTIONS.length).toBeGreaterThan(0)
    MUSIC_OPTIONS.forEach((option) => {
      expect(screen.getByTestId(`music-option-${option.id}`)).toBeInTheDocument()
    })
  })

  it('appelle onSelect avec le label et le fichier au clic sur une musique', () => {
    renderSelector()
    fireEvent.click(screen.getByTestId(`music-option-${MUSIC_OPTIONS[0].id}`))
    expect(onSelect).toHaveBeenCalledWith(
      MUSIC_OPTIONS[0].label,
      MUSIC_OPTIONS[0].file,
    )
  })

  it('ne ferme PAS automatiquement après une sélection', () => {
    vi.useFakeTimers()
    try {
      renderSelector()
      fireEvent.click(screen.getByTestId(`music-option-${MUSIC_OPTIONS[0].id}`))
      act(() => {
        vi.advanceTimersByTime(5000)
      })
      expect(onClose).not.toHaveBeenCalled()
    } finally {
      vi.useRealTimers()
    }
  })

  it('permet de changer de musique après une première sélection', () => {
    if (MUSIC_OPTIONS.length < 2) return
    renderSelector()
    fireEvent.click(screen.getByTestId(`music-option-${MUSIC_OPTIONS[0].id}`))
    const second = screen.getByTestId(`music-option-${MUSIC_OPTIONS[1].id}`)
    expect(second).toBeEnabled()
    fireEvent.click(second)
    expect(onSelect).toHaveBeenLastCalledWith(
      MUSIC_OPTIONS[1].label,
      MUSIC_OPTIONS[1].file,
    )
    expect(onSelect).toHaveBeenCalledTimes(2)
  })

  it('affiche le bandeau d\'aperçu après une sélection', () => {
    renderSelector()
    expect(screen.queryByTestId('music-validation')).not.toBeInTheDocument()
    fireEvent.click(screen.getByTestId(`music-option-${MUSIC_OPTIONS[0].id}`))
    expect(screen.getByTestId('music-validation')).toHaveTextContent(
      MUSIC_OPTIONS[0].label,
    )
  })

  it('ferme au clic sur "Fermer"', () => {
    renderSelector()
    fireEvent.click(screen.getByTestId('music-selector-close'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('ferme au clic sur l\'overlay (en dehors du contenu)', () => {
    const { container } = renderSelector()
    const overlay = container.querySelector('.music-selector-overlay') as HTMLElement
    fireEvent.click(overlay)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('ne ferme PAS si on clique à l\'intérieur du contenu', () => {
    renderSelector()
    fireEvent.click(screen.getByText('Sélectionnez une ambiance musicale'))
    expect(onClose).not.toHaveBeenCalled()
  })
})
