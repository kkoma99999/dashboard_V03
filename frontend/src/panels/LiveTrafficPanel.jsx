import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Panel from '../components/Panel'
import { useLiveTrafficHistory } from '../hooks/useMockData'
import { colors, fonts } from '../tokens'

export default function LiveTrafficPanel() {
  const history = useLiveTrafficHistory()
  const current = history[history.length - 1]?.v ?? 0

  return (
    <Panel title="Live Traffic — Packets / sec" className="h-full">
      <div className="flex items-end gap-3 mb-4">
        <span style={{ fontFamily: fonts.mono, color: colors.accent, fontSize: 36, lineHeight: 1 }}>
          {current.toLocaleString()}
        </span>
        <span style={{ color: colors.textMuted, fontFamily: fonts.display, fontSize: 13 }} className="mb-1">
          pkt/s
        </span>
      </div>

      <ResponsiveContainer width="100%" height={130}>
        <AreaChart data={history} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor={colors.accent} stopOpacity={0.25} />
              <stop offset="95%" stopColor={colors.accent} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="t" hide />
          <YAxis tick={{ fill: colors.textMuted, fontSize: 10, fontFamily: fonts.mono }} width={36} />
          <Tooltip
            contentStyle={{ background: colors.panel, border: `1px solid ${colors.border}`, borderRadius: 4, padding: '4px 10px' }}
            labelStyle={{ display: 'none' }}
            itemStyle={{ color: colors.accent, fontFamily: fonts.mono, fontSize: 12 }}
            formatter={v => [`${v} pkt/s`]}
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke={colors.accent}
            strokeWidth={2}
            fill="url(#trafficGrad)"
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Panel>
  )
}
