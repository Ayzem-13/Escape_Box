import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import { useGame } from '../context/GameContext'
import { SELECTED_MUSIC_KEY } from '../components/BackgroundMusic/BackgroundMusic'
import { MUSIC_OPTIONS } from '../config/musicOptions'

const TriggerStart = () => {
  const { startGame } = useGame()
  return (
    <button onClick={startGame} data-testid="trigger-start">
      start
    </button>
  )
}

const renderLayout = () =>
  render(
    <MemoryRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<TriggerStart />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )

describe('Layout — bouton musique', () => {
  let playSpy: ReturnType<typeof vi.spyOn>
  let pauseSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    playSpy = vi
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve())
    pauseSpy = vi
      .spyOn(HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => {})
  })

  afterEach(() => {
    playSpy.mockRestore()
    pauseSpy.mockRestore()
  })

  it('affiche le bouton ♪ quand la partie n\'est pas démarrée', () => {
    renderLayout()
    expect(screen.getByTestId('layout-music-btn')).toBeInTheDocument()
  })

  it('cache le bouton ♪ quand la partie est démarrée', () => {
    renderLayout()
    fireEvent.click(screen.getByTestId('trigger-start'))
    expect(screen.queryByTestId('layout-music-btn')).not.toBeInTheDocument()
  })

  it('ouvre le popup MusicSelector au clic sur ♪', () => {
    renderLayout()
    fireEvent.click(screen.getByTestId('layout-music-btn'))
    expect(
      screen.getByTestId(`music-option-${MUSIC_OPTIONS[0].id}`),
    ).toBeInTheDocument()
  })

  it('persiste la sélection dans localStorage et joue l\'aperçu', () => {
    renderLayout()
    fireEvent.click(screen.getByTestId('layout-music-btn'))
    fireEvent.click(screen.getByTestId(`music-option-${MUSIC_OPTIONS[0].id}`))

    expect(localStorage.getItem(SELECTED_MUSIC_KEY)).toBe(MUSIC_OPTIONS[0].file)
    expect(playSpy).toHaveBeenCalled()
  })

  it('arrête l\'aperçu à la fermeture du popup', () => {
    renderLayout()
    fireEvent.click(screen.getByTestId('layout-music-btn'))
    fireEvent.click(screen.getByTestId(`music-option-${MUSIC_OPTIONS[0].id}`))
    expect(pauseSpy).not.toHaveBeenCalled()

    fireEvent.click(screen.getByTestId('music-selector-close'))
    expect(pauseSpy).toHaveBeenCalled()
  })

  it('change la source de l\'aperçu quand on sélectionne une autre musique', () => {
    if (MUSIC_OPTIONS.length < 2) return
    renderLayout()
    fireEvent.click(screen.getByTestId('layout-music-btn'))

    fireEvent.click(screen.getByTestId(`music-option-${MUSIC_OPTIONS[0].id}`))
    const firstSrc = (
      playSpy.mock.contexts[playSpy.mock.contexts.length - 1] as HTMLAudioElement
    ).src
    expect(firstSrc).toContain(MUSIC_OPTIONS[0].file.split('/').pop()!)

    fireEvent.click(screen.getByTestId(`music-option-${MUSIC_OPTIONS[1].id}`))
    const secondSrc = (
      playSpy.mock.contexts[playSpy.mock.contexts.length - 1] as HTMLAudioElement
    ).src
    expect(secondSrc).toContain(MUSIC_OPTIONS[1].file.split('/').pop()!)
    expect(localStorage.getItem(SELECTED_MUSIC_KEY)).toBe(MUSIC_OPTIONS[1].file)
  })
})
