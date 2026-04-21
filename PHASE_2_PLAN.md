# PHASE_2_PLAN — Align Security Alerts Table with Required Columns

> **For the implementing agent (Sonnet):** This plan is pre-approved. Execute
> the edits below exactly as specified. Do not re-plan, do not re-scope, do
> not add extra changes. When done, run the verification steps at the bottom
> and report back.

---

## Context

The `AlertsTablePanel` must expose **at least** these columns:

| # | Column             | Source field         |
|---|--------------------|----------------------|
| 1 | Timestamp          | `alert.timestamp`    |
| 2 | Attack_Type        | `alert.attack_type`  |
| 3 | Source_IP          | `alert.source_ip`    |
| 4 | Destination_IP     | `alert.destination_ip` |
| 5 | Severity           | `alert.severity`     |
| 6 | UNIFIED_RISK_SCORE | `alert.unified_risk_score` |
| 7 | Explanation        | `alert.explanation`  |

The repo currently contains only `CLAUDE.md` and `DASHBOARD_PLAN.md` — the
React project has **not** been scaffolded yet. `DASHBOARD_PLAN.md:56` defines
the current alert shape as:

```
useMockAlerts() → [{ id, time, type, src, dst, severity, status }]
```

This is missing `unified_risk_score` and `explanation`, and uses short field
names that don't match the required column list. The plan must be corrected
**before** scaffolding begins, so every downstream phase (mock hook,
`AlertsTablePanel`, eventual API swap) picks up the correct shape.

---

## Target Shape for `useMockAlerts()`

snake_case — mirrors what a real backend response will look like:

```js
useMockAlerts() → [{
  id,                   // string, stable key for React list rendering
  timestamp,            // ISO string — panel formats to HH:MM:SS
  attack_type,          // "DoS" | "PortScan" | "Anomaly" | "BruteForce" | ...
  source_ip,            // string, e.g. "10.0.0.14"
  destination_ip,       // string
  severity,             // "low" | "medium" | "high" | "critical"
  unified_risk_score,   // integer 0–100
  explanation,          // short string, one-line human-readable reason
  status,               // "new" | "ack" | "resolved"  (kept from old shape)
}]
```

Rationale (do not revisit):
- `timestamp` stores ISO; formatting lives in the panel.
- `attack_type` / `source_ip` / `destination_ip` match the required column
  names so the mock is isomorphic to a future API response.
- `unified_risk_score` is numeric for future sorting / color-coding.
- `explanation` is free text; panel truncates with ellipsis (title attribute
  on hover). No modal — out of scope per `DASHBOARD_PLAN.md:111-118`.
- `status` is retained because the user said "at least" these columns.

---

## Edits to Apply

### File: `F:\Programming\GraduationProject\Dashboard_V3\DASHBOARD_PLAN.md`

**Edit 1 — replace the `useMockAlerts()` signature on line 56.**

Old string (exactly one occurrence in the file):
```
- `useMockAlerts()` → [{ id, time, type, src, dst, severity, status }]
```

New string:
```
- `useMockAlerts()` → [{ id, timestamp, attack_type, source_ip, destination_ip, severity, unified_risk_score, explanation, status }]
```

**Edit 2 — insert a new subsection defining the table columns.**

Insert it immediately after the Mock Data Rule block (after the line that
ends with `this one file changes — components stay untouched.` — currently
line 52). Separate it from the Design Tokens block with a blank line.

Content to insert:

```markdown

### Alerts Table Columns (AlertsTablePanel)
The table must render at least these columns, in this order:

| # | Header             | Field                       | Notes                          |
|---|--------------------|-----------------------------|--------------------------------|
| 1 | Timestamp          | `alert.timestamp`           | format as HH:MM:SS             |
| 2 | Attack_Type        | `alert.attack_type`         |                                |
| 3 | Source_IP          | `alert.source_ip`           | mono font                      |
| 4 | Destination_IP    | `alert.destination_ip`      | mono font                      |
| 5 | Severity           | `alert.severity`            | color pill: critical/high/med/low |
| 6 | UNIFIED_RISK_SCORE | `alert.unified_risk_score`  | 0–100, mono font               |
| 7 | Explanation        | `alert.explanation`         | truncate with ellipsis         |
```

### Other files

**None.** Do not touch `CLAUDE.md` — it defers to `DASHBOARD_PLAN.md` and
does not hardcode alert field names. Do not create any source files in this
phase; scaffolding is a separate phase per `DASHBOARD_PLAN.md:91-99`.

---

## Downstream Implications (notes for later phases — do NOT implement now)

When Phase 5 (`useMockData.js`) lands:
- `timestamp` = `new Date().toISOString()`; format in the panel, not the hook.
- `attack_type` values should map to the existing `tokens.js` color keys
  (`dos`, `portscan`, `anomaly`, `brute`) — reuse, don't invent a palette.
- `unified_risk_score` biased higher for `critical` / `high` severity so the
  column is visually correlated.
- `explanation` ~60–100 chars so truncation is exercised.

When Phase 4 (`AlertsTablePanel.jsx`) lands:
- `fonts.mono` for `source_ip`, `destination_ip`, `unified_risk_score`.
- Severity pill colors from `tokens.js` (`critical`, `warning`, `ok`) only.
- Row slide-in animation is Phase 6, not Phase 4.

---

## Verification

After applying both edits:

1. Open `DASHBOARD_PLAN.md` and confirm:
   - The `useMockAlerts()` line lists all 9 fields
     (`id, timestamp, attack_type, source_ip, destination_ip, severity,
     unified_risk_score, explanation, status`).
   - The new `### Alerts Table Columns (AlertsTablePanel)` subsection exists
     and enumerates the 7 required columns in order.
2. Grep to confirm the old short names are gone from the alerts signature:
   - Search for `src, dst` → must return **zero** hits.
   - Search for `unified_risk_score` → must return **at least two** hits
     (signature line + column table).
   - Search for `time, type` → must return **zero** hits (old signature gone).
3. Only `DASHBOARD_PLAN.md` should be modified. No other files.

End-to-end browser verification is **deferred** — the React app isn't
scaffolded yet, so there is nothing to render. That verification belongs to
Phase 4/5 when `AlertsTablePanel` and `useMockData` actually ship.

---

## Done Criteria

- [ ] Edit 1 applied (signature replaced on line 56).
- [ ] Edit 2 applied (new column-table subsection inserted).
- [ ] All 3 grep checks in Verification pass.
- [ ] No other files changed.
