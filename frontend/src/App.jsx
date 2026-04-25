import { colors } from './tokens'
import Header from './components/Header'
import LiveTrafficPanel from './panels/LiveTrafficPanel'
import AttackCounterPanel from './panels/AttackCounterPanel'
import SystemHealthPanel from './panels/SystemHealthPanel'
import AlertsTablePanel from './panels/AlertsTablePanel'
import DistributionPanel from './panels/DistributionPanel'
import ActivityPanel from './panels/ActivityPanel'

export default function App() {
  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: colors.bg, minWidth: 1024 }}>
      <Header />

      <div className="flex flex-1 min-h-0">
        <main className="flex-1 overflow-y-auto px-6 py-4 min-w-0" style={{ scrollbarColor: `${colors.border} transparent` }}>

          {/* Row 1 — Live Monitor: traffic takes 2fr, counter and health share remaining space */}
          <section id="live" className="grid gap-4 mb-4" style={{ gridTemplateColumns: 'minmax(0, 2fr) minmax(160px, 1fr) minmax(160px, 1fr)', minHeight: 240 }}>
            <LiveTrafficPanel />
            <AttackCounterPanel />
            <SystemHealthPanel />
          </section>

          {/* Row 2 — Alerts */}
          <section id="alerts" className="mb-4">
            <AlertsTablePanel />
          </section>

          {/* Row 3 — Analytics */}
          <section id="analytics" className="grid gap-4 mb-4" style={{ gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', minHeight: 260 }}>
            <DistributionPanel />
            <ActivityPanel />
          </section>

        </main>
      </div>
    </div>
  )
}
