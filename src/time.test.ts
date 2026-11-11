import { describe, expect, it } from 'vitest'
import { getElapsedDuration, padDuration } from './time'

describe('getElapsedDuration', () => {
  it('converts elapsed milliseconds into calendar units', () => {
    const start = Date.parse('2026-10-29T07:13:00Z')
    const now = start + (((2 * 86_400) + (5 * 3_600) + (14 * 60) + 9) * 1000)
    expect(getElapsedDuration('2026-10-29T07:13:00Z', now)).toEqual({ days: 2, hours: 5, minutes: 14, seconds: 9 })
  })
  it('does not count time before the outage start', () => {
    expect(getElapsedDuration('2026-10-29T07:13:00Z', Date.parse('2026-10-29T07:12:59Z'))).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  })
  it('returns null for invalid timestamps', () => {
    expect(getElapsedDuration('not-a-date', Date.now())).toBeNull()
  })
})

describe('padDuration', () => {
  it('pads single digit values', () => expect(padDuration(7)).toBe('07'))
})
