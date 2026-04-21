import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import Panel from '../components/Panel'
import { useMockHourly } from '../hooks/useMockData'
import { colors, fonts } from '../tokens'

export default function ActivityPanel() {
  const data = useMockHourly()
  const currentHour = new Date().getHours()

  return (
    <Panel title="Hourly Activity — Last 24 h" className="h-full">
      <ResponsiveContainer width="100%" height={210}>
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <XAxis
            dataKey="hour"
            tick={{ fill: colors.textMuted, fontSize: 9, fontFamily: fonts.mono }}
            interval={3}
            axisLine={{ stroke: colors.border }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: colors.textMuted, fontSize: 10, fontFamily: fonts.mono }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ background: colors.panel, border: `1px solid ${colors.border}`, borderRadius: 4, padding: '4px 10px' }}
            labelStyle={{ color: colors.textDim, fontFamily: fonts.mono, fontSize: 11 }}
            itemStyle={{ color: colors.accent, fontFamily: fonts.mono, fontSize: 12 }}
            formatter={v => [v, 'attacks']}
          />
          <Bar dataKey="count" radius={[2, 2, 0, 0]}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={i === currentHour ? colors.critical : colors.accent}
                fillOpacity={i === currentHour ? 1 : 0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Panel>
  )
}
