import { Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
import { colors, fonts } from '../tokens'

function LiveClock() {
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const hms = time.toLocaleTimeString('en-US', { hour12: false })
  const date = time.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
  return (
    <div className="flex flex-col items-end">
      <span style={{ fontFamily: fonts.mono, color: colors.accent, fontSize: 18, lineHeight: 1, letterSpacing: '0.05em' }}>
        {hms}
      </span>
      <span style={{ fontFamily: fonts.mono, color: colors.textMuted, fontSize: 10, letterSpacing: '0.08em' }}>
        {date} · UTC{Intl.DateTimeFormat().resolvedOptions().timeZone}
      </span>
    </div>
  )
}

export default function Header() {
  return (
    <header
      style={{
        background: colors.panel,
        borderBottom: `1px solid ${colors.border}`,
        fontFamily: fonts.display,
        boxShadow: `0 1px 0 ${colors.accent}18`,
      }}
      className="flex items-center justify-between px-6 h-14 shrink-0"
    >
      {/* Left — branding */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Shield size={20} style={{ color: colors.accent }} />
          <span className="text-lg font-bold tracking-widest uppercase" style={{ color: colors.text, letterSpacing: '0.15em' }}>
            SME IDS
          </span>
        </div>
        <span style={{ width: 1, height: 20, background: colors.border }} />
        <span style={{ color: colors.textMuted, fontSize: 12, letterSpacing: '0.1em' }} className="uppercase tracking-widest">
          Threat Operations Center
        </span>
      </div>

      {/* Right — clock only */}
      <LiveClock />
    </header>
  )
}
