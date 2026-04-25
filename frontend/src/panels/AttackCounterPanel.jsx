import Panel from '../components/Panel'
import { useMockMetrics, useMockAlerts } from '../hooks/useMockData'
import { colors, fonts } from '../tokens'
import { ShieldAlert } from 'lucide-react'

const SEV_CONFIG = [
  { key: 'critical', label: 'Critical', color: colors.critical },
  { key: 'high',     label: 'High',     color: colors.warning  },
  { key: 'low',      label: 'Low',      color: colors.textMuted },
]

export default function AttackCounterPanel() {
  const { totalAttacks, rate } = useMockMetrics()
  const alerts = useMockAlerts()

  const counts = alerts.reduce((acc, a) => {
    acc[a.severity] = (acc[a.severity] || 0) + 1
    return acc
  }, {})

  return (
    <Panel title="Attack Counter" className="h-full">
      <div className="flex flex-col gap-4 h-full justify-center">

        {/* Total */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert size={13} style={{ color: colors.critical }} />
            <span style={{ color: colors.textMuted, fontFamily: fonts.display, fontSize: 10 }} className="uppercase tracking-widest">
              Total Detected
            </span>
          </div>
          <div className="num-live" style={{ fontFamily: fonts.mono, color: colors.critical, fontSize: 36, lineHeight: 1, textShadow: `0 0 20px ${colors.critical}60` }}>
            {totalAttacks.toLocaleString()}
          </div>
        </div>

        {/* Severity breakdown */}
        <div style={{ borderTop: `1px solid ${colors.border}` }} className="pt-3 flex flex-col gap-2">
          {SEV_CONFIG.map(({ key, label, color }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 5px ${color}`, flexShrink: 0 }} />
                <span style={{ fontFamily: fonts.display, fontSize: 10, color: colors.textMuted }} className="uppercase tracking-widest">
                  {label}
                </span>
              </div>
              <span style={{ fontFamily: fonts.mono, color, fontSize: 13 }}>
                {(counts[key] || 0).toString().padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>

        {/* Live Rate */}
        <div style={{ borderTop: `1px solid ${colors.border}` }} className="pt-3">
          <div style={{ color: colors.textMuted, fontFamily: fonts.display, fontSize: 10 }} className="uppercase tracking-widest mb-1">
            Live Rate
          </div>
          <div style={{ fontFamily: fonts.mono, color: colors.warning, fontSize: 22, lineHeight: 1 }}>
            {rate}
            <span style={{ fontSize: 11, color: colors.textMuted, marginLeft: 5 }}>pkt/s</span>
          </div>
        </div>
      </div>
    </Panel>
  )
}
