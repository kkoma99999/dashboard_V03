import { useState, useEffect, useRef } from 'react'
import Panel from '../components/Panel'
import { useMockAlerts } from '../hooks/useMockData'
import { colors, fonts } from '../tokens'

// 3 severity tiers: low=yellow, high=red, critical=filled red
const SEVERITY_STYLE = {
  low:      { color: colors.warning,  bg: 'transparent',              border: colors.warning  },
  high:     { color: colors.critical, bg: 'transparent',              border: colors.critical },
  critical: { color: '#fff',          bg: colors.critical,            border: colors.critical },
}

function SeverityPill({ severity }) {
  const s = SEVERITY_STYLE[severity] ?? { color: colors.textMuted, bg: 'transparent', border: colors.textMuted }
  return (
    <span style={{
      color: s.color,
      background: s.bg,
      border: `1px solid ${s.border}`,
      fontFamily: fonts.mono,
      fontSize: 10,
      padding: '2px 7px',
      borderRadius: 3,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      whiteSpace: 'nowrap',
      boxShadow: severity === 'critical' ? `0 0 6px ${colors.critical}80` : 'none',
    }}>
      {severity}
    </span>
  )
}

function RiskScore({ score }) {
  const color = score >= 46 ? colors.critical : colors.warning
  return (
    <span style={{ fontFamily: fonts.mono, color, fontSize: 13, fontWeight: 500 }}>
      {score}
    </span>
  )
}

function fmtTime(iso) {
  return new Date(iso).toLocaleTimeString('en-US', { hour12: false })
}

const TH = ({ children, right }) => (
  <th style={{
    padding: '6px 10px',
    textAlign: right ? 'right' : 'left',
    color: colors.textMuted,
    fontFamily: fonts.display,
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    whiteSpace: 'nowrap',
    fontWeight: 600,
    borderBottom: `1px solid ${colors.border}`,
  }}>
    {children}
  </th>
)

export default function AlertsTablePanel() {
  const alerts = useMockAlerts()
  const prevIdsRef = useRef(new Set(alerts.map(a => a.id)))
  const [newIds, setNewIds] = useState(new Set())

  useEffect(() => {
    const fresh = alerts.filter(a => !prevIdsRef.current.has(a.id)).map(a => a.id)
    if (fresh.length > 0) {
      setNewIds(new Set(fresh))
      prevIdsRef.current = new Set(alerts.map(a => a.id))
      const t = setTimeout(() => setNewIds(new Set()), 800)
      return () => clearTimeout(t)
    }
  }, [alerts])

  return (
    <Panel title="Security Alerts">
      <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: 260 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead style={{ position: 'sticky', top: 0, background: colors.panel, zIndex: 1 }}>
            <tr>
              <TH>Timestamp</TH>
              <TH>Attack_Type</TH>
              <TH>Source_IP</TH>
              <TH>Destination_IP</TH>
              <TH>Severity</TH>
              <TH right>UNIFIED_RISK_SCORE</TH>
              <TH>Explanation</TH>
            </tr>
          </thead>
          <tbody>
            {alerts.map(a => (
              <tr
                key={a.id}
                className={newIds.has(a.id) ? 'alert-new' : ''}
                style={{ borderBottom: `1px solid ${colors.border}30` }}
              >
                <td style={{ padding: '7px 10px', color: colors.textDim, fontFamily: fonts.mono, whiteSpace: 'nowrap' }}>
                  {fmtTime(a.timestamp)}
                </td>
                <td style={{ padding: '7px 10px', color: colors.text, fontFamily: fonts.display, fontWeight: 600, letterSpacing: '0.03em' }}>
                  {a.attack_type}
                </td>
                <td style={{ padding: '7px 10px', color: colors.accent, fontFamily: fonts.mono, whiteSpace: 'nowrap' }}>
                  {a.source_ip}
                </td>
                <td style={{ padding: '7px 10px', color: colors.textDim, fontFamily: fonts.mono, whiteSpace: 'nowrap' }}>
                  {a.destination_ip}
                </td>
                <td style={{ padding: '7px 10px' }}>
                  <SeverityPill severity={a.severity} />
                </td>
                <td style={{ padding: '7px 10px', textAlign: 'right' }}>
                  <RiskScore score={a.unified_risk_score} />
                </td>
                <td
                  style={{
                    padding: '7px 10px',
                    color: colors.textMuted,
                    maxWidth: 320,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontFamily: fonts.display,
                  }}
                  title={a.explanation}
                >
                  {a.explanation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}
