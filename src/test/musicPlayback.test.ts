import { describe, it, expect } from 'vitest'
import { playbackSegmentIndex } from '../config/musicStorage'

describe('playbackSegmentIndex (sync chrono, partie 60 min, 4 segments)', () => {
  const initial = 3600
  const count = 4 as const

  it('0–15 min écoulées : piste 0 (chrono ≥ 45:00 restants)', () => {
    expect(
      playbackSegmentIndex({
        remainingSec: 3600,
        initialSec: initial,
        segmentCount: count,
      }),
    ).toBe(0)
    expect(
      playbackSegmentIndex({
        remainingSec: 2701,
        initialSec: initial,
        segmentCount: count,
      }),
    ).toBe(0)
  })

  it('à partir de 15 min écoulées : piste 1 (chrono ≤ 45:00)', () => {
    expect(
      playbackSegmentIndex({
        remainingSec: 2700,
        initialSec: initial,
        segmentCount: count,
      }),
    ).toBe(1)
  })

  it('à partir de 45 min écoulées : piste 3 (chrono ≤ 15:00 restants)', () => {
    expect(
      playbackSegmentIndex({
        remainingSec: 900,
        initialSec: initial,
        segmentCount: count,
      }),
    ).toBe(3)
  })
})

describe('playbackSegmentIndex (2 segments)', () => {
  it('bascule à 30 min écoulées (30:00 restants)', () => {
    expect(
      playbackSegmentIndex({
        remainingSec: 1801,
        initialSec: 3600,
        segmentCount: 2,
      }),
    ).toBe(0)
    expect(
      playbackSegmentIndex({
        remainingSec: 1800,
        initialSec: 3600,
        segmentCount: 2,
      }),
    ).toBe(1)
  })
})
