import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Panel from '../components/Panel'
import { useMockDistribution } from '../hooks/useMockData'
import { colors, fonts } from '../tokens'

export default function DistributionPanel() {
  const data = useMockDistribution()
  const dominant = data.reduce((a, b) => (a.value > b.value ? a : b), data[0])

  return (
    <Panel title="Attack Distribution" className="h-full">
      <div style={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={210}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="46%"
              innerRadius={55}
              outerRadius={82}
              dataKey="value"
              paddingAngle={3}
              isAnimationActive={false}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} stroke={colors.panel} strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ background: colors.panel, border: `1px solid ${colors.border}`, borderRadius: 0, padding: '4px 10px' }}
              itemStyle={{ color: colors.text, fontFamily: fonts.mono, fontSize: 12 }}
              formatter={(value, name) => [`${value}%`, name]}
            />
            <Legend
              iconType="square"
              iconSize={6}
              formatter={(value) => (
                <span style={{ color: colors.textDim, fontFamily: fonts.display, fontSize: 11 }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Donut center label */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '76%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: fonts.mono, color: dominant.color, fontSize: 24, lineHeight: 1, textShadow: `0 0 12px ${dominant.color}80` }}>
              {dominant.value}%
            </div>
            <div style={{ fontFamily: fonts.display, color: colors.textMuted, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: 4 }}>
              {dominant.name}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  )
}
