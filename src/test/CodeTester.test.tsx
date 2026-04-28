import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import CodeTester from '../components/CodeTester/CodeTester'
import { CodesProvider } from '../context/CodesProvider'
import { GameProvider } from '../context/GameProvider'
import { codesStorageKey, type Codes } from '../context/CodesContext'

const TWO_CODES: Codes = ['▲▲▲▲', '▼▼▼▼']

const renderTester = (codes: Codes = TWO_CODES, slotCount = 2) => {
  localStorage.setItem(codesStorageKey('demo'), JSON.stringify(codes))
  return render(
    <GameProvider>
      <CodesProvider mode="demo" slotCount={slotCount}>
        <CodeTester testIdPrefix="ct" />
      </CodesProvider>
    </GameProvider>,
  )
}

const enterCode = (token: string) => {
  const tokenButton = screen.getByRole('button', { name: token })
  for (let i = 0; i < 4; i++) fireEvent.click(tokenButton)
  fireEvent.click(screen.getByTestId('ct-test-btn'))
}

const srcOf = (call: HTMLAudioElement | unknown): string =>
  (call as HTMLAudioElement).src ?? ''

describe('CodeTester — sons', () => {
  let playSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    playSpy = vi
      .spyOn(HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve())
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('joue le son Correct quand un code valide non-final est saisi', () => {
    renderTester(TWO_CODES, 2)
    enterCode('▲')

    expect(playSpy).toHaveBeenCalled()
    const playedSrcs = playSpy.mock.contexts.map(srcOf).join(' ')
    expect(playedSrcs).toMatch(/Correct/i)
  })

  it('joue le son False quand un code invalide est saisi', () => {
    renderTester(TWO_CODES, 2)
    enterCode('►')

    expect(playSpy).toHaveBeenCalled()
    const playedSrcs = playSpy.mock.contexts.map(srcOf).join(' ')
    expect(playedSrcs).toMatch(/False/i)
  })

  it('ne joue aucun son si le code a déjà été trouvé', () => {
    renderTester(TWO_CODES, 2)
    // 1ère saisie : ▲▲▲▲ → trouvé (Correct)
    enterCode('▲')
    const callsAfterFirst = playSpy.mock.calls.length
    expect(callsAfterFirst).toBeGreaterThan(0)

    // 2nde saisie : ▲▲▲▲ → déjà trouvé → toast info, AUCUN son
    enterCode('▲')
    expect(playSpy.mock.calls.length).toBe(callsAfterFirst)
  })

  it('dispatche l\'event chrono-penalty quand le code est invalide', () => {
    renderTester(TWO_CODES, 2)
    const handler = vi.fn()
    window.addEventListener('chrono-penalty', handler)
    try {
      enterCode('►')
      expect(handler).toHaveBeenCalledTimes(1)
    } finally {
      window.removeEventListener('chrono-penalty', handler)
    }
  })

  it('ne dispatche PAS chrono-penalty quand le code est valide', () => {
    renderTester(TWO_CODES, 2)
    const handler = vi.fn()
    window.addEventListener('chrono-penalty', handler)
    try {
      enterCode('▲')
      expect(handler).not.toHaveBeenCalled()
    } finally {
      window.removeEventListener('chrono-penalty', handler)
    }
  })
})
