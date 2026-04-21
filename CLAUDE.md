# Claude Code Instructions — SME IDS Dashboard

## Context
Read `DASHBOARD_PLAN.md` first. Frontend-only React project. No backend,
no API calls. All data is mocked through `src/hooks/useMockData.js`.

## Current Phase
We are on Phase [X]. Do not work ahead of the current phase.

## Stack (do not add to this)
- Vite + React 18 (plain JavaScript)
- Tailwind CSS
- Recharts
- lucide-react

If you think a new dependency is needed, stop and ask first.

## Working Style
- Propose a short plan (3-5 bullets) before writing code for any
  non-trivial task
- One component per task — don't build multiple panels at once
- After each component, tell me how to verify it in the browser
- If something is ambiguous, ask one clarifying question
- Small, focused commits — one logical change per commit

## Code Standards
- Functional components only, hooks only
- Tailwind classes for styling, no inline style objects unless dynamic
- Use tokens from `src/tokens.js` — never hardcode colors or fonts
- PascalCase for components, camelCase for hooks, one component per file
- No TODO comments left behind

## Mock Data Rule
Components never generate their own mock data. Everything flows through
`src/hooks/useMockData.js`. The shape of what the hooks return must
match what a real API would return, so swapping to real data later is a
single-file change.

## Design Constraints
- Dark SOC theme only — colors and fonts come from `tokens.js`
- English only, LTR layout
- Rajdhani for display, JetBrains Mono for numbers and IPs
- Desktop-first (1440px target, 1024px minimum)

## What NOT to do
- Do not add backend, API routes, or server logic
- Do not add dependencies without asking
- Do not introduce TypeScript
- Do not add React Router, Redux, Zustand, or any state library
- Do not rewrite panels that already work
- Do not use localStorage or sessionStorage
- Do not add tests (skipped for this project)
- Do not change `tokens.js` without discussion

## Testing Approach
Visual verification only. After each change:
- `npm run dev` starts cleanly
- No console errors or warnings
- Component renders and updates as expected

## Commands
- Dev server: `npm run dev`
- Build: `npm run build`

## When Stuck
Three failed attempts at the same bug means you're missing context.
Stop and ask instead of guessing again.
