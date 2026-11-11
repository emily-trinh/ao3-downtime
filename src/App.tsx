import { useEffect, useState } from 'react'
import { CANONICAL_URL, OFFICIAL_STATUS_URL, OUTAGE_START_UTC } from './config'
import { getElapsedDuration, padDuration, type Duration } from './time'

function DurationUnit({ value, label, wide = false }: { value: number; label: string; wide?: boolean }) {
  return <div className={`duration-unit${wide ? ' duration-unit-wide' : ''}`}><span className="duration-value">{wide ? value : padDuration(value)}</span><span className="duration-label">{label}</span></div>
}

function Countdown({ duration }: { duration: Duration }) {
  return <div className="countdown" aria-label={`${duration.days} days, ${duration.hours} hours, ${duration.minutes} minutes, and ${duration.seconds} seconds`}>
    <DurationUnit value={duration.days} label="days" wide /><span className="colon" aria-hidden="true">:</span>
    <DurationUnit value={duration.hours} label="hours" /><span className="colon" aria-hidden="true">:</span>
    <DurationUnit value={duration.minutes} label="minutes" /><span className="colon" aria-hidden="true">:</span>
    <DurationUnit value={duration.seconds} label="seconds" />
  </div>
}

function App() {
  const [duration, setDuration] = useState<Duration | null>(() => getElapsedDuration(OUTAGE_START_UTC))

  useEffect(() => {
    const update = () => setDuration(getElapsedDuration(OUTAGE_START_UTC))
    const interval = window.setInterval(update, 1000)
    update()
    return () => window.clearInterval(interval)
  }, [])

  const startDate = new Date(OUTAGE_START_UTC)
  const isValid = duration !== null && !Number.isNaN(startDate.getTime())

  return (
    <main className="page-shell">
      <nav className="topbar" aria-label="Site navigation"><a className="wordmark" href="/" aria-label="The Great AO3 Drought home"><span className="wordmark-mark">AO3</span><span className="wordmark-name">The Great<br />Drought</span></a><span className="status-chip"><span className="status-dot" /> live</span></nav>
      <section className="hero" aria-labelledby="page-title">
        <div className="hero-copy"><p className="eyebrow">Thank you to the devs for your hard work!</p><h1 id="page-title">Is AO3 still<br /><em>down?</em></h1><p className="intro">I missed AO3 so bad, I checked the status page and couldn't believe it had only been 10 days since it went down. So I made this to help track how much time has passed without AO3. Here's how long we've survived so far.</p></div>
        <div className="countdown-panel"><div className="panel-topline"><span>AO3 downtime</span><span className="signal"><i /><i /><i /></span></div>{isValid ? <Countdown duration={duration} /> : <p className="error-message">The timestamp needs a quick check. Please see the official status page.</p>}<p className="started-at">Since <time dateTime={OUTAGE_START_UTC}>{startDate.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' })} UTC</time></p></div>
      </section>
      <section className="status-note" aria-label="Current status"><div className="note-icon">!</div><div><strong>AO3 is currently unavailable.</strong><span>Check the official update for the latest from OTW.</span></div><a className="status-link" href={OFFICIAL_STATUS_URL} target="_blank" rel="noreferrer">Official status <span aria-hidden="true">↗</span></a></section>
      <section className="community-strip" aria-label="Community note"><p><span aria-hidden="true">✦</span> We're all patiently waiting together</p><p className="tiny-note">This site provides no claims on recovery predictions, only vibes and a clock &lt;3 </p></section>
      <footer className="footer"><p><strong>The Great AO3 Drought</strong> is an unofficial community project.</p><p>Not affiliated with the Organization for Transformative Works.</p><div className="footer-links"><a href={OFFICIAL_STATUS_URL} target="_blank" rel="noreferrer">OTW status</a><span>·</span><a href={CANONICAL_URL}>Share this page</a></div></footer>
    </main>
  )
}

export default App
