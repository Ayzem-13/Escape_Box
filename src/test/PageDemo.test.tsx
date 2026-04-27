import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, act, fireEvent } from '@testing-library/react'
import PageDemo from '../page/Demo/PageDemo'
import { renderWithRouter } from './renderWithRouter'

describe('DemoMode', () => {
  describe('écran initial', () => {
    it('affiche le titre, la durée et le bouton de démarrage', () => {
      renderWithRouter(<PageDemo />)

      expect(screen.getByTestId('demo-title')).toHaveTextContent('MODE DEMO')
      expect(screen.getByTestId('demo-duration')).toHaveTextContent('15 minutes')
      expect(screen.getByTestId('demo-start-btn')).toHaveTextContent('DEMARRER PARTIE')
    })

    it('n\'affiche pas l\'écran de jeu', () => {
      renderWithRouter(<PageDemo />)
      expect(screen.queryByTestId('demo-game-screen')).not.toBeInTheDocument()
    })
  })

  describe('après clic sur "DEMARRER PARTIE"', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('affiche l\'écran de jeu avec le timer à 15:00 et masque le formulaire', () => {
      renderWithRouter(<PageDemo />)
      fireEvent.click(screen.getByTestId('demo-start-btn'))

      expect(screen.getByTestId('demo-game-screen')).toBeInTheDocument()
      expect(screen.getByTestId('demo-timer')).toHaveTextContent('15:00')
      expect(screen.queryByTestId('demo-title')).not.toBeInTheDocument()
      expect(screen.queryByTestId('demo-start-btn')).not.toBeInTheDocument()
    })

    it('le timer décrémente après 1 seconde', () => {
      renderWithRouter(<PageDemo />)
      fireEvent.click(screen.getByTestId('demo-start-btn'))
      expect(screen.getByTestId('demo-timer')).toHaveTextContent('15:00')

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(screen.getByTestId('demo-timer')).toHaveTextContent('14:59')
    })
  })
})
