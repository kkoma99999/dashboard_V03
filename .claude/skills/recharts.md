---
name: recharts
description: Use when writing any Recharts component — AreaChart,
BarChart, PieChart, or any chart-related code
---

## Recharts rules for this project

Always use context7 to verify the current Recharts API before writing
chart code. Do not rely on memory.

## Correct pattern
- ResponsiveContainer must wrap every chart
- Set width="100%" and fixed height on ResponsiveContainer only
- Never set fixed width/height on the chart component itself

## Donut chart
- Use innerRadius on the <Pie> element for donut shape
- Use Cell components for individual slice colors
- Colors come from tokens.js only

## Tooltip
- Always pass contentStyle prop matching tokens.js colors
- Never use default tooltip styles

## Animation
- Set isAnimationActive={false} on live-updating charts
- Animation on fast-updating data causes flicker

## Never do this
- Never nest ResponsiveContainer inside another ResponsiveContainer
- Never hardcode colors — always use tokens.js
- Never guess the API — use context7 first