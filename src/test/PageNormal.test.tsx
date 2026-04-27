import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, act, fireEvent } from '@testing-library/react'
import PageNormal from '../page/Nomal/PageNormal'
import { renderWithRouter } from './renderWithRouter'

describe('Normal (mode partie classique)', () => {
  describe('rendu initial', () => {
    it('affiche le titre et le bouton "Lancez partie"', () => {
      renderWithRouter(<PageNormal />)

      expect(screen.getByTestId('normal-title')).toHaveTextContent('Normal - Page')
      expect(screen.getByTestId('normal-launch-btn')).toHaveTextContent('Lancez partie')
    })

    it('n\'affiche pas le chrono tant que la partie n\'a pas démarré', () => {
      renderWithRouter(<PageNormal />)
      expect(screen.queryByTestId('chrono')).not.toBeInTheDocument()
    })
  })

  describe('après clic sur "Lancez partie"', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('affiche le chrono à 60:00 (1h)', () => {
      renderWithRouter(<PageNormal />)
      fireEvent.click(screen.getByTestId('normal-launch-btn'))

      expect(screen.getByTestId('chrono-display')).toHaveTextContent('60:00')
    })

    it('le chrono décrémente après 1 seconde', () => {
      renderWithRouter(<PageNormal />)
      fireEvent.click(screen.getByTestId('normal-launch-btn'))

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(screen.getByTestId('chrono-display')).toHaveTextContent('59:59')
    })

    it('garde le titre visible et masque le bouton de lancement', () => {
      renderWithRouter(<PageNormal />)
      fireEvent.click(screen.getByTestId('normal-launch-btn'))

      expect(screen.getByTestId('normal-title')).toBeInTheDocument()
      expect(screen.queryByTestId('normal-launch-btn')).not.toBeInTheDocument()
    })
  })
})
