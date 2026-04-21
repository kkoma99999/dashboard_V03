import { colors } from './tokens'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
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
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 min-w-0" style={{ scrollbarColor: `${colors.border} transparent` }}>

          {/* Row 1 — Live Monitor */}
          <section id="live" className="grid gap-4 mb-4" style={{ gridTemplateColumns: '2fr 1fr 1fr', minHeight: 240 }}>
            <LiveTrafficPanel />
            <AttackCounterPanel />
            <SystemHealthPanel />
          </section>

          {/* Row 2 — Alerts */}
          <section id="alerts" className="mb-4">
            <AlertsTablePanel />
          </section>

          {/* Row 3 — Analytics */}
          <section id="analytics" className="grid grid-cols-2 gap-4 mb-4" style={{ minHeight: 260 }}>
            <DistributionPanel />
            <ActivityPanel />
          </section>

        </main>
      </div>
    </div>
  )
}
