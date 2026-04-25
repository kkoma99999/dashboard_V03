import Panel from '../components/Panel'
import { useMockMetrics } from '../hooks/useMockData'
import { colors, fonts } from '../tokens'

function Bar({ label, value, max = 100, unit = '%', color }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span style={{ fontFamily: fonts.display, fontSize: 10, color: colors.textMuted }} className="uppercase tracking-widest">
          {label}
        </span>
        <span style={{ fontFamily: fonts.mono, fontSize: 12, color }}>
          {value}{unit}
        </span>
      </div>
      <div style={{ background: colors.border, borderRadius: 2, height: 3 }}>
        <div
          style={{
            width: `${pct}%`,
            background: color,
            borderRadius: 2,
            height: '100%',
            transition: 'width 0.6s ease',
            boxShadow: `0 0 8px ${color}80`,
          }}
        />
      </div>
    </div>
  )
}

export default function SystemHealthPanel() {
  const { cpu, ram, inference } = useMockMetrics()
  const cpuColor = cpu > 80 ? colors.critical : cpu > 60 ? colors.warning : colors.ok
  const ramColor = ram > 85 ? colors.critical : ram > 70 ? colors.warning : colors.ok
  const infColor = inference > 100 ? colors.warning : colors.accent

  return (
    <Panel title="System Health" className="h-full">
      <div className="flex flex-col justify-center h-full gap-1">
        <Bar label="CPU" value={cpu} color={cpuColor} />
        <Bar label="RAM" value={ram} color={ramColor} />

        {/* Inference — featured metric */}
        <div style={{ borderTop: `1px solid ${colors.border}`, marginTop: 4, paddingTop: 10 }}>
          <div style={{ color: colors.textMuted, fontFamily: fonts.display, fontSize: 10 }} className="uppercase tracking-widest mb-1">
            IDS Inference Latency
          </div>
          <div className="flex items-end gap-2">
            <span className="num-live" style={{ fontFamily: fonts.mono, color: infColor, fontSize: 30, lineHeight: 1, textShadow: `0 0 16px ${infColor}60` }}>
              {inference}
            </span>
            <span style={{ fontFamily: fonts.mono, color: colors.textMuted, fontSize: 11, marginBottom: 2 }}>ms / packet</span>
          </div>
          <div style={{ background: colors.border, borderRadius: 2, height: 3, marginTop: 8 }}>
            <div style={{
              width: `${Math.min(100, (inference / 200) * 100)}%`,
              background: infColor,
              borderRadius: 2,
              height: '100%',
              transition: 'width 0.6s ease',
              boxShadow: `0 0 8px ${infColor}80`,
            }} />
          </div>
        </div>
      </div>
    </Panel>
  )
}
