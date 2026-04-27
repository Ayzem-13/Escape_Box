import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, act, fireEvent } from '@testing-library/react'
import PageDemo from '../page/Demo/PageDemo'
import { codesStorageKey, type CodesTuple } from '../context/CodesContext'
import { renderWithRouter } from './renderWithRouter'

const FILLED_CODES: CodesTuple = ['▲▲▲▲', '■■■■', '●●●●']
const seedCodes = (codes: CodesTuple) =>
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

    it('affiche l\'indicateur 0/3 et 3 dots vides', () => {
      renderWithRouter(<PageDemo />)
      expect(screen.getByTestId('code-count')).toHaveTextContent('0/3')
      expect(screen.getByTestId('code-dot-0')).toHaveAttribute('data-filled', 'false')
      expect(screen.getByTestId('code-dot-1')).toHaveAttribute('data-filled', 'false')
      expect(screen.getByTestId('code-dot-2')).toHaveAttribute('data-filled', 'false')
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

  describe('avec 3 combinaisons pré-remplies (localStorage)', () => {
    it('affiche 3/3, désactive "Définir" et active "DEMARRER PARTIE" et "Réinitialiser"', () => {
      seedCodes(FILLED_CODES)
      renderWithRouter(<PageDemo />)
      expect(screen.getByTestId('code-count')).toHaveTextContent('3/3')
      expect(screen.getByTestId('demo-define-btn')).toBeDisabled()
      expect(screen.getByTestId('demo-reset-btn')).toBeEnabled()
      expect(screen.getByTestId('demo-start-btn')).toBeEnabled()
    })

    it('le bouton "Réinitialiser" remet le compteur à 0/3', () => {
      seedCodes(FILLED_CODES)
      renderWithRouter(<PageDemo />)
      fireEvent.click(screen.getByTestId('demo-reset-btn'))
      expect(screen.getByTestId('code-count')).toHaveTextContent('0/3')
      expect(screen.getByTestId('demo-start-btn')).toBeDisabled()
    })
  })

  describe('après clic sur "DEMARRER PARTIE" (combinaisons remplies)', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      seedCodes(FILLED_CODES)
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
