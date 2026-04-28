import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import BackgroundMusic, { SELECTED_MUSIC_KEY } from '../components/BackgroundMusic/BackgroundMusic'
import { MUSIC_OPTIONS } from '../config/musicOptions'

describe('BackgroundMusic', () => {
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

  it('joue la musique sélectionnée stockée dans localStorage au montage', () => {
    const selected = MUSIC_OPTIONS[0].file
    localStorage.setItem(SELECTED_MUSIC_KEY, selected)

    render(<BackgroundMusic />)

    expect(playSpy).toHaveBeenCalledTimes(1)
    const audio = playSpy.mock.contexts[0] as HTMLAudioElement
    expect(audio.src).toContain(selected.split('/').pop()!)
    expect(audio.loop).toBe(true)
  })

  it('utilise un fallback aléatoire si aucune musique n\'est stockée', () => {
    expect(localStorage.getItem(SELECTED_MUSIC_KEY)).toBeNull()

    render(<BackgroundMusic />)

    expect(playSpy).toHaveBeenCalledTimes(1)
    const audio = playSpy.mock.contexts[0] as HTMLAudioElement
    const matched = MUSIC_OPTIONS.some((o) =>
      audio.src.endsWith(o.file.split('/').pop()!),
    )
    expect(matched).toBe(true)
  })

  it('respecte le prop volume', () => {
    render(<BackgroundMusic volume={0.7} />)
    const audio = playSpy.mock.contexts[0] as HTMLAudioElement
    expect(audio.volume).toBeCloseTo(0.7)
  })

  it('met l\'audio en pause au démontage', () => {
    const { unmount } = render(<BackgroundMusic />)
    expect(pauseSpy).not.toHaveBeenCalled()
    unmount()
    expect(pauseSpy).toHaveBeenCalled()
  })
})
