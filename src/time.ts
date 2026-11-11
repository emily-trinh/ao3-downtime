export type Duration = { days: number; hours: number; minutes: number; seconds: number }

export function getElapsedDuration(startTimestamp: string, now = Date.now()): Duration | null {
  const start = Date.parse(startTimestamp)
  if (Number.isNaN(start)) return null
  const elapsedSeconds = Math.max(0, Math.floor((now - start) / 1000))
  return { days: Math.floor(elapsedSeconds / 86_400), hours: Math.floor((elapsedSeconds % 86_400) / 3_600), minutes: Math.floor((elapsedSeconds % 3_600) / 60), seconds: elapsedSeconds % 60 }
}

export function padDuration(value: number) { return String(value).padStart(2, '0') }
