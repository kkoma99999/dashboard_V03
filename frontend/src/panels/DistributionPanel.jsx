import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Panel from '../components/Panel'
import { useMockDistribution } from '../hooks/useMockData'
import { colors, fonts } from '../tokens'

export default function DistributionPanel() {
  const data = useMockDistribution()

  return (
    <Panel title="Attack Distribution" className="h-full">
      <ResponsiveContainer width="100%" height={210}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={82}
            dataKey="value"
            paddingAngle={3}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke={colors.panel} strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: colors.panel, border: `1px solid ${colors.border}`, borderRadius: 4, padding: '4px 10px' }}
            itemStyle={{ color: colors.text, fontFamily: fonts.mono, fontSize: 12 }}
            formatter={(value, name) => [`${value}%`, name]}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            formatter={(value) => (
              <span style={{ color: colors.textDim, fontFamily: fonts.display, fontSize: 12 }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </Panel>
  )
}
