import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, act, fireEvent } from '@testing-library/react'
import PageDemo from '../page/Demo/PageDemo'
import { codesStorageKey, type Codes } from '../context/CodesContext'
import { renderWithRouter } from './renderWithRouter'

const FILLED_CODE: Codes = ['▲▲▲▲']
const seedCodes = (codes: Codes) =>
  localStorage.setItem(codesStorageKey('demo'), JSON.stringify(codes))

describe('DemoMode', () => {
  describe('écran initial — aucune combinaison', () => {
    it('affiche le titre, la durée et les boutons', () => {
      renderWithRouter(<PageDemo />)

      expect(screen.getByTestId('demo-title')).toHaveTextContent('MODE DEMO')
      expect(screen.getByTestId('demo-duration')).toHaveTextContent('15 minutes')
      expect(screen.getByTestId('demo-define-btn')).toHaveTextContent('Définir la combinaison')
      expect(screen.getByTestId('demo-start-btn')).toHaveTextContent('DEMARRER PARTIE')
      expect(screen.getByTestId('demo-reset-btn')).toHaveTextContent('Réinitialiser')
    })

    it('affiche l\'indicateur 0/1 et un seul dot vide', () => {
      renderWithRouter(<PageDemo />)
      expect(screen.getByTestId('code-count')).toHaveTextContent('0/1')
      expect(screen.getByTestId('code-dot-0')).toHaveAttribute('data-filled', 'false')
      expect(screen.queryByTestId('code-dot-1')).not.toBeInTheDocument()
    })

    it('"DEMARRER PARTIE" et "Réinitialiser" sont désactivés', () => {
      renderWithRouter(<PageDemo />)
      expect(screen.getByTestId('demo-start-btn')).toBeDisabled()
      expect(screen.getByTestId('demo-reset-btn')).toBeDisabled()
    })

    it('n\'affiche pas l\'écran de jeu', () => {
      renderWithRouter(<PageDemo />)
      expect(screen.queryByTestId('demo-game-screen')).not.toBeInTheDocument()
    })
  })

  describe('avec la combinaison pré-remplie (localStorage)', () => {
    it('affiche 1/1, désactive "Définir" et active "DEMARRER PARTIE" et "Réinitialiser"', () => {
      seedCodes(FILLED_CODE)
      renderWithRouter(<PageDemo />)
      expect(screen.getByTestId('code-count')).toHaveTextContent('1/1')
      expect(screen.getByTestId('demo-define-btn')).toBeDisabled()
      expect(screen.getByTestId('demo-reset-btn')).toBeEnabled()
      expect(screen.getByTestId('demo-start-btn')).toBeEnabled()
    })

    it('le bouton "Réinitialiser" remet le compteur à 0/1', () => {
      seedCodes(FILLED_CODE)
      renderWithRouter(<PageDemo />)
      fireEvent.click(screen.getByTestId('demo-reset-btn'))
      expect(screen.getByTestId('code-count')).toHaveTextContent('0/1')
      expect(screen.getByTestId('demo-start-btn')).toBeDisabled()
    })
  })

  describe('après clic sur "DEMARRER PARTIE" (combinaison remplie)', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      seedCodes(FILLED_CODE)
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
