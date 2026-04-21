import { Shield } from 'lucide-react'
import { colors, fonts } from '../tokens'

export default function Header() {
  return (
    <header
      style={{ background: colors.panel, borderBottom: `1px solid ${colors.border}`, fontFamily: fonts.display }}
      className="flex items-center justify-between px-6 h-14 shrink-0"
    >
      <div className="flex items-center gap-3">
        <Shield size={22} style={{ color: colors.accent }} />
        <span className="text-xl font-semibold tracking-widest uppercase" style={{ color: colors.text }}>
          SME IDS
        </span>
        <span className="text-sm tracking-wider" style={{ color: colors.textMuted }}>
          / Threat Dashboard
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span
          className="inline-block w-2 h-2 rounded-full animate-pulse"
          style={{ background: colors.ok }}
        />
        <span className="text-xs tracking-widest uppercase" style={{ color: colors.ok, fontFamily: fonts.mono }}>
          Live
        </span>
      </div>
    </header>
  )
}
