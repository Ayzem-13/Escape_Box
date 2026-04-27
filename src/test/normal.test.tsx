import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, act, fireEvent } from '@testing-library/react'
import Normal from '../page/Nomal/normal'
import { renderWithRouter } from './renderWithRouter'

describe('Normal (mode partie classique)', () => {
  describe('rendu initial', () => {
    it('affiche le titre, le bouton "Lancez partie" et le lien retour', () => {
      renderWithRouter(<Normal />)

      expect(screen.getByTestId('normal-title')).toHaveTextContent('Normal - Page')
      expect(screen.getByTestId('normal-launch-btn')).toHaveTextContent('Lancez partie')
      const back = screen.getByTestId('normal-back-link')
      expect(back).toHaveAttribute('href', '/')
      expect(back).toHaveTextContent("Page d'accueil")
    })

    it('n\'affiche pas le chrono tant que la partie n\'a pas démarré', () => {
      renderWithRouter(<Normal />)
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
      renderWithRouter(<Normal />)
      fireEvent.click(screen.getByTestId('normal-launch-btn'))

      expect(screen.getByTestId('chrono-display')).toHaveTextContent('60:00')
    })

    it('le chrono décrémente après 1 seconde', () => {
      renderWithRouter(<Normal />)
      fireEvent.click(screen.getByTestId('normal-launch-btn'))

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(screen.getByTestId('chrono-display')).toHaveTextContent('59:59')
    })

    it('garde le titre et le lien retour visibles', () => {
      renderWithRouter(<Normal />)
      fireEvent.click(screen.getByTestId('normal-launch-btn'))

      expect(screen.getByTestId('normal-title')).toBeInTheDocument()
      expect(screen.getByTestId('normal-back-link')).toBeInTheDocument()
    })
  })
})
