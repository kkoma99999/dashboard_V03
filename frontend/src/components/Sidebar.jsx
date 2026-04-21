import { Activity, AlertTriangle, BarChart2, Cpu } from 'lucide-react'
import { colors, fonts } from '../tokens'

const NAV_ITEMS = [
  { icon: Activity,      label: 'Live Monitor', href: '#live' },
  { icon: AlertTriangle, label: 'Alerts',       href: '#alerts' },
  { icon: BarChart2,     label: 'Analytics',    href: '#analytics' },
  { icon: Cpu,           label: 'System Health',href: '#health' },
]

export default function Sidebar() {
  return (
    <aside
      style={{ background: colors.panelSoft, borderRight: `1px solid ${colors.border}`, width: 220, fontFamily: fonts.display }}
      className="flex flex-col shrink-0"
    >
      <nav className="flex flex-col gap-1 p-3 mt-2">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => (
          <a
            key={href}
            href={href}
            style={{ color: colors.textDim }}
            className="flex items-center gap-3 px-3 py-2 rounded text-sm tracking-wide uppercase hover:bg-white/5 transition-colors"
          >
            <Icon size={16} style={{ color: colors.accent }} />
            {label}
          </a>
        ))}
      </nav>
    </aside>
  )
}
