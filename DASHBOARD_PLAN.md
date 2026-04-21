# SME IDS Dashboard — Plan

## Objective
Build a dark SOC-style dashboard for the SME IDS project with live
network traffic, system health, attack analytics, and a recent-alerts
feed. English only, LTR, desktop-first.

## Stack (minimal)
- Vite + React 18 (plain JavaScript, no TypeScript)
- Tailwind CSS
- Recharts (charts)
- lucide-react (icons)

That's it. No router, no state library, no testing framework.

## Folder Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Panel.jsx
│   │   ├── RadialGauge.jsx
│   │   └── Sparkline.jsx
│   ├── panels/
│   │   ├── LiveTrafficPanel.jsx
│   │   ├── AttackCounterPanel.jsx
│   │   ├── SystemHealthPanel.jsx
│   │   ├── DistributionPanel.jsx
│   │   ├── ActivityPanel.jsx
│   │   └── AlertsTablePanel.jsx
│   ├── hooks/
│   │   └── useMockData.js
│   ├── tokens.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── tailwind.config.js
└── package.json
```

## Sections
1. Live Monitor     → LiveTrafficPanel + AttackCounterPanel
2. Alerts           → AlertsTablePanel
3. Analytics        → DistributionPanel + ActivityPanel
4. System Health    → SystemHealthPanel

## Mock Data Rule
All mock data lives in `src/hooks/useMockData.js`. Components receive
data via this hook. When the real API arrives later, only this one
file changes — components stay untouched.

### Alerts Table Columns (AlertsTablePanel)
The table must render at least these columns, in this order:

| # | Header             | Field                       | Notes                             |
|---|--------------------|-----------------------------|-----------------------------------|
| 1 | Timestamp          | `alert.timestamp`           | format as HH:MM:SS                |
| 2 | Attack_Type        | `alert.attack_type`         |                                   |
| 3 | Source_IP          | `alert.source_ip`           | mono font                         |
| 4 | Destination_IP     | `alert.destination_ip`      | mono font                         |
| 5 | Severity           | `alert.severity`            | color pill: critical/high/med/low |
| 6 | UNIFIED_RISK_SCORE | `alert.unified_risk_score`  | 0–100, mono font                  |
| 7 | Explanation        | `alert.explanation`         | truncate with ellipsis            |

Expose these functions from the hook:
- `useMockMetrics()` → { rate, totalAttacks, cpu, ram, inference }
- `useMockAlerts()` → [{ id, timestamp, attack_type, source_ip, destination_ip, severity, unified_risk_score, explanation, status }]
- `useMockDistribution()` → [{ name, value, color }]
- `useMockHourly()` → [{ hour, count }]

## Design Tokens (src/tokens.js)
Lock these early. Do not invent new colors per panel.

```js
export const colors = {
  bg:        "#0A0E1A",
  panel:     "#111827",
  panelSoft: "#0F1522",
  border:    "#1E2A3F",
  text:      "#E6EDF7",
  textDim:   "#8B98B0",
  textMuted: "#5C6A85",
  accent:    "#22D3EE",  // cyan
  critical:  "#EF4444",
  warning:   "#F59E0B",
  ok:        "#10B981",
  // attack types
  dos:       "#EF4444",
  portscan:  "#22D3EE",
  anomaly:   "#A855F7",
  brute:     "#F59E0B",
};

export const fonts = {
  display: "'Rajdhani', sans-serif",
  mono:    "'JetBrains Mono', monospace",
};
```

Load fonts via a single `<link>` in index.html.

## Build Phases
1. **Scaffold** — Vite + Tailwind + fonts + tokens.js
2. **Shell** — Header + Sidebar + empty grid of 6 panels
3. **Panel.jsx** + LiveTrafficPanel as the reference implementation
4. **Remaining 5 panels** with static data
5. **useMockData.js** — setInterval simulates live updates
6. **Polish** — pulse dot, scan-line, new-row slide-in animation
7. **Responsive** — works at 1440px and 1024px widths

## Setup Commands
```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install recharts lucide-react
npm run dev
```

## Out of Scope
- Authentication
- Alert detail modals
- Filters / search
- Real API / backend
- Mobile layout (below 1024px)
- TypeScript
- Tests

## Done When
- All 6 panels render with live-updating mock data
- No console errors or warnings
- Works on a 1440px desktop screen
- New alerts visibly animate in
- Swapping mock hooks for real API hooks requires touching only
  `src/hooks/useMockData.js`
