import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import App from '../App'
import { renderWithRouter } from './renderWithRouter'

describe('App (page d\'accueil)', () => {
  it('affiche le titre et le sous-titre', () => {
    renderWithRouter(<App />)

    expect(screen.getByTestId('home-title')).toHaveTextContent('Bienvenue dans Escape Box')
    expect(screen.getByTestId('home-subtitle')).toHaveTextContent('Prêt à relever le défi ?')
  })

  it('affiche le lien vers /normal avec le bon libellé', () => {
    renderWithRouter(<App />)

    const link = screen.getByTestId('home-link-normal')
    expect(link).toHaveAttribute('href', '/normal')
    expect(link).toHaveTextContent('Commencer une partie')
  })

  it('affiche le lien vers /demo avec le bon libellé', () => {
    renderWithRouter(<App />)

    const link = screen.getByTestId('home-link-demo')
    expect(link).toHaveAttribute('href', '/demo')
    expect(link).toHaveTextContent('Commencer mode démo')
  })
})
