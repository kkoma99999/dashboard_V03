import Panel from '../components/Panel'
import { useMockMetrics } from '../hooks/useMockData'
import { colors, fonts } from '../tokens'
import { ShieldAlert } from 'lucide-react'

export default function AttackCounterPanel() {
  const { totalAttacks, rate } = useMockMetrics()

  return (
    <Panel title="Attack Counter" className="h-full">
      <div className="flex flex-col gap-5 h-full justify-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert size={14} style={{ color: colors.critical }} />
            <span style={{ color: colors.textMuted, fontFamily: fonts.display, fontSize: 11 }} className="uppercase tracking-widest">
              Total Detected
            </span>
          </div>
          <div style={{ fontFamily: fonts.mono, color: colors.critical, fontSize: 38, lineHeight: 1 }}>
            {totalAttacks.toLocaleString()}
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${colors.border}` }} className="pt-4">
          <div style={{ color: colors.textMuted, fontFamily: fonts.display, fontSize: 11 }} className="uppercase tracking-widest mb-1">
            Live Rate
          </div>
          <div style={{ fontFamily: fonts.mono, color: colors.warning, fontSize: 24, lineHeight: 1 }}>
            {rate}
            <span style={{ fontSize: 12, color: colors.textMuted, marginLeft: 6 }}>pkt/s</span>
          </div>
        </div>
      </div>
    </Panel>
  )
}
