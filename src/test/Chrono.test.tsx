import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import Chrono from '../components/Chrono/Chrono'

describe('Chrono', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('affiche le temps initial au format MM:SS (0-padding sur les deux)', () => {
    render(<Chrono initialTime={3600} />)
    expect(screen.getByTestId('chrono-display')).toHaveTextContent('60:00')
  })

  it('affiche 05:09 pour 309 secondes (zéro devant minutes ET secondes)', () => {
    render(<Chrono initialTime={309} />)
    expect(screen.getByTestId('chrono-display')).toHaveTextContent('05:09')
  })

  it('affiche 00:00 pour 0 seconde', () => {
    render(<Chrono initialTime={0} />)
    expect(screen.getByTestId('chrono-display')).toHaveTextContent('00:00')
  })

  it('décrémente de 1 seconde après 1000 ms', () => {
    render(<Chrono initialTime={10} />)
    expect(screen.getByTestId('chrono-display')).toHaveTextContent('00:10')

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByTestId('chrono-display')).toHaveTextContent('00:09')
  })

  it('s\'arrête à 00:00 et ne descend pas en négatif', async () => {
    render(<Chrono initialTime={2} />)

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
    render(<Chrono initialTime={60} />)
    expect(screen.getByTestId('chrono')).toBeInTheDocument()
  })
})
