import Panel from '../components/Panel'
import { useMockMetrics } from '../hooks/useMockData'
import { colors, fonts } from '../tokens'

function Bar({ label, value, max = 100, unit = '%', color }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span style={{ fontFamily: fonts.display, fontSize: 11, color: colors.textMuted }} className="uppercase tracking-widest">
          {label}
        </span>
        <span style={{ fontFamily: fonts.mono, fontSize: 12, color }}>
          {value}{unit}
        </span>
      </div>
      <div style={{ background: colors.border, borderRadius: 2, height: 4 }}>
        <div
          style={{
            width: `${pct}%`,
            background: color,
            borderRadius: 2,
            height: '100%',
            transition: 'width 0.6s ease',
            boxShadow: `0 0 6px ${color}80`,
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

  return (
    <Panel title="System Health" className="h-full">
      <div className="flex flex-col justify-center h-full">
        <Bar label="CPU"       value={cpu}       color={cpuColor} />
        <Bar label="RAM"       value={ram}       color={ramColor} />
        <Bar label="Inference" value={inference} max={200} unit="ms" color={colors.accent} />
      </div>
    </Panel>
  )
}
