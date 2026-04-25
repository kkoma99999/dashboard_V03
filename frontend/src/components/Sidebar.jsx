import { useState, useEffect } from 'react'
import { Activity, AlertTriangle, BarChart2, Cpu } from 'lucide-react'
import { colors, fonts } from '../tokens'

const NAV_ITEMS = [
  { icon: Activity,      label: 'Live Monitor', href: '#live',      id: 'live' },
  { icon: AlertTriangle, label: 'Alerts',       href: '#alerts',    id: 'alerts' },
  { icon: BarChart2,     label: 'Analytics',    href: '#analytics', id: 'analytics' },
  { icon: Cpu,           label: 'Sys Health',   href: '#health',    id: 'health' },
]

export default function Sidebar() {
  const [active, setActive] = useState('live')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -55% 0px' }
    )
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <aside
      style={{ background: colors.panelSoft, borderRight: `1px solid ${colors.border}`, width: 200, fontFamily: fonts.display }}
      className="flex flex-col shrink-0"
    >
      <div style={{ height: 2, background: `linear-gradient(90deg, ${colors.accent}80, transparent)` }} />

      <nav className="flex flex-col gap-1 p-3 mt-2">
        {NAV_ITEMS.map(({ icon: Icon, label, href, id }) => {
          const isActive = active === id
          return (
            <a
              key={href}
              href={href}
              style={{
                color: isActive ? colors.accent : colors.textDim,
                background: isActive ? `${colors.accent}10` : 'transparent',
                borderLeft: `2px solid ${isActive ? colors.accent : 'transparent'}`,
                transition: 'all 0.15s ease',
              }}
              className="flex items-center gap-3 px-3 py-2 hover:bg-white/5"
            >
              <Icon size={13} style={{ color: isActive ? colors.accent : colors.textMuted, flexShrink: 0 }} />
              <span style={{
                fontWeight: isActive ? 700 : 400,
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {label}
              </span>
            </a>
          )
        })}
      </nav>

      <div className="mt-auto p-3" style={{ borderTop: `1px solid ${colors.border}` }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 9, color: colors.textMuted, letterSpacing: '0.08em', lineHeight: 1.8 }}>
          <div className="flex items-center gap-1" style={{ color: colors.ok }}>
            <span className="animate-pulse" style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: colors.ok, flexShrink: 0 }} />
            SYS ONLINE
          </div>
          <div>IDS ENGINE ACTIVE</div>
          <div>v2.4.1 · MOCK FEED</div>
        </div>
      </div>
    </aside>
  )
}
