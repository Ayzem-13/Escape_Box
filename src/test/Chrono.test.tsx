import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import Chrono from '../components/Chrono/Chrono'
import { GameProvider } from '../context/GameProvider'

const renderChrono = (initialTime: number) =>
  render(
    <GameProvider>
      <Chrono initialTime={initialTime} />
    </GameProvider>,
  )

describe('Chrono', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('affiche le temps initial au format MM:SS (0-padding sur les deux)', () => {
    renderChrono(3600)
    expect(screen.getByTestId('chrono-display')).toHaveTextContent('60:00')
  })

  it('affiche 05:09 pour 309 secondes (zéro devant minutes ET secondes)', () => {
    renderChrono(309)
    expect(screen.getByTestId('chrono-display')).toHaveTextContent('05:09')
  })

  it('affiche 00:00 pour 0 seconde', () => {
    renderChrono(0)
    expect(screen.getByTestId('chrono-display')).toHaveTextContent('00:00')
  })

  it('décrémente de 1 seconde après 1000 ms', () => {
    renderChrono(10)
    expect(screen.getByTestId('chrono-display')).toHaveTextContent('00:10')

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByTestId('chrono-display')).toHaveTextContent('00:09')
  })

  it('s\'arrête à 00:00 et ne descend pas en négatif', async () => {
    renderChrono(2)

    // Avance seconde par seconde pour laisser React re-render entre chaque tick
    // (Chrono utilise setTimeout re-planifié à chaque update)
    for (let i = 0; i < 5; i++) {
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1000)
      })
    }

    expect(screen.getByTestId('chrono-display')).toHaveTextContent('00:00')
  })

  it('expose le container avec data-testid="chrono"', () => {
    renderChrono(60)
    expect(screen.getByTestId('chrono')).toBeInTheDocument()
  })

  describe('bip d\'avertissement', () => {
    it('joue le bip au démarrage si initialTime tombe sur un palier 15 min', () => {
      const playSpy = vi
        .spyOn(HTMLMediaElement.prototype, 'play')
        .mockImplementation(() => Promise.resolve())
      try {
        renderChrono(3600)
        expect(playSpy).toHaveBeenCalled()
      } finally {
        playSpy.mockRestore()
      }
    })

    it('ne joue pas le bip à un instant hors palier', () => {
      const playSpy = vi
        .spyOn(HTMLMediaElement.prototype, 'play')
        .mockImplementation(() => Promise.resolve())
      try {
        renderChrono(500)
        expect(playSpy).not.toHaveBeenCalled()
      } finally {
        playSpy.mockRestore()
      }
    })
  })
})
