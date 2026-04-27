import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen, act, fireEvent } from '@testing-library/react'
import PageNormal from '../page/Nomal/PageNormal'
import { codesStorageKey, type Codes } from '../context/CodesContext'
import { renderWithRouter } from './renderWithRouter'

const FILLED_CODES: Codes = ['▲▲▲▲', '■■■■', '●●●●']
const seedCodes = (codes: Codes) =>
  localStorage.setItem(codesStorageKey('normal'), JSON.stringify(codes))

describe('Normal (mode partie classique)', () => {
  describe('écran initial — aucune combinaison', () => {
    it('affiche le titre, la durée et les boutons', () => {
      renderWithRouter(<PageNormal />)

      expect(screen.getByTestId('normal-title')).toHaveTextContent('MODE NORMAL')
      expect(screen.getByTestId('normal-duration')).toHaveTextContent('60 minutes')
      expect(screen.getByTestId('normal-define-btn')).toHaveTextContent('Définir la combinaison')
      expect(screen.getByTestId('normal-start-btn')).toHaveTextContent('DEMARRER PARTIE')
      expect(screen.getByTestId('normal-reset-btn')).toHaveTextContent('Réinitialiser')
    })

    it('affiche l\'indicateur 0/3 et 3 dots vides', () => {
      renderWithRouter(<PageNormal />)
      expect(screen.getByTestId('code-count')).toHaveTextContent('0/3')
      expect(screen.getByTestId('code-dot-0')).toHaveAttribute('data-filled', 'false')
      expect(screen.getByTestId('code-dot-1')).toHaveAttribute('data-filled', 'false')
      expect(screen.getByTestId('code-dot-2')).toHaveAttribute('data-filled', 'false')
    })

    it('"DEMARRER PARTIE" et "Réinitialiser" sont désactivés', () => {
      renderWithRouter(<PageNormal />)
      expect(screen.getByTestId('normal-start-btn')).toBeDisabled()
      expect(screen.getByTestId('normal-reset-btn')).toBeDisabled()
    })

    it('n\'affiche pas le chrono tant que la partie n\'a pas démarré', () => {
      renderWithRouter(<PageNormal />)
      expect(screen.queryByTestId('chrono')).not.toBeInTheDocument()
    })
  })

  describe('isolation entre les modes', () => {
    it('les codes du mode démo n\'affectent pas le mode normal', () => {
      localStorage.setItem(codesStorageKey('demo'), JSON.stringify(FILLED_CODES))
      renderWithRouter(<PageNormal />)
      expect(screen.getByTestId('code-count')).toHaveTextContent('0/3')
      expect(screen.getByTestId('normal-start-btn')).toBeDisabled()
    })
  })

  describe('avec 3 combinaisons pré-remplies (localStorage)', () => {
    it('affiche 3/3 et active le bouton de démarrage', () => {
      seedCodes(FILLED_CODES)
      renderWithRouter(<PageNormal />)
      expect(screen.getByTestId('code-count')).toHaveTextContent('3/3')
      expect(screen.getByTestId('normal-start-btn')).toBeEnabled()
    })

    it('le bouton "Réinitialiser" remet le compteur à 0/3', () => {
      seedCodes(FILLED_CODES)
      renderWithRouter(<PageNormal />)
      fireEvent.click(screen.getByTestId('normal-reset-btn'))
      expect(screen.getByTestId('code-count')).toHaveTextContent('0/3')
      expect(screen.getByTestId('normal-start-btn')).toBeDisabled()
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

    it('affiche le chrono à 60:00 (1h)', () => {
      renderWithRouter(<PageNormal />)
      fireEvent.click(screen.getByTestId('normal-start-btn'))

      expect(screen.getByTestId('chrono-display')).toHaveTextContent('60:00')
    })

    it('le chrono décrémente après 1 seconde', () => {
      renderWithRouter(<PageNormal />)
      fireEvent.click(screen.getByTestId('normal-start-btn'))

      act(() => {
        vi.advanceTimersByTime(1000)
      })

      expect(screen.getByTestId('chrono-display')).toHaveTextContent('59:59')
    })

    it('masque le formulaire quand la partie démarre', () => {
      renderWithRouter(<PageNormal />)
      fireEvent.click(screen.getByTestId('normal-start-btn'))

      expect(screen.queryByTestId('normal-title')).not.toBeInTheDocument()
      expect(screen.queryByTestId('normal-define-btn')).not.toBeInTheDocument()
      expect(screen.queryByTestId('normal-start-btn')).not.toBeInTheDocument()
    })
  })
})
