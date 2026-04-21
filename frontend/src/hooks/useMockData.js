import { useState, useEffect } from 'react'
import { colors } from '../tokens'

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min }
function randomIp() { return `${randomInt(10, 192)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 254)}` }
function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)] }

const ATTACK_TYPES = ['DoS', 'PortScan', 'Anomaly', 'BruteForce']
const SEVERITIES   = ['low', 'high', 'critical']
const EXPLANATIONS = [
  'High-frequency SYN packets from single source detected',
  'Sequential port sweep across target subnet',
  'Unusual traffic pattern deviates from baseline model',
  'Repeated failed SSH login attempts from external IP',
  'ICMP flood exceeding threshold, potential ping-of-death',
  'DNS amplification pattern detected on UDP/53',
  'Outbound data volume anomaly on non-standard port',
  'Multiple failed authentication attempts via RDP',
  'Fragmented packet flood targeting network layer',
  'HTTP request rate exceeds normal threshold by 10x',
]

let _alertId = 100

function makeAlert() {
  const severity = randomItem(SEVERITIES)
  const scoreRange = { low: [5, 45], high: [46, 79], critical: [80, 100] }
  const [lo, hi] = scoreRange[severity]
  return {
    id: `a-${++_alertId}`,
    timestamp: new Date().toISOString(),
    attack_type: randomItem(ATTACK_TYPES),
    source_ip: randomIp(),
    destination_ip: randomIp(),
    severity,
    unified_risk_score: randomInt(lo, hi),
    explanation: randomItem(EXPLANATIONS),
    status: randomItem(['new', 'ack', 'resolved']),
  }
}

function makeInitialAlerts(count = 15) {
  return Array.from({ length: count }, () => {
    const a = makeAlert()
    a.timestamp = new Date(Date.now() - randomInt(0, 3_600_000)).toISOString()
    return a
  }).sort((a, b) => b.timestamp.localeCompare(a.timestamp))
}

export function useMockMetrics() {
  const [m, setM] = useState({ rate: 124, totalAttacks: 347, cpu: 42, ram: 61, inference: 38 })
  useEffect(() => {
    const id = setInterval(() => {
      setM(prev => ({
        rate:         Math.max(0,   prev.rate         + randomInt(-15, 15)),
        totalAttacks: prev.totalAttacks               + randomInt(0, 2),
        cpu:          Math.min(100, Math.max(5,  prev.cpu       + randomInt(-5, 5))),
        ram:          Math.min(100, Math.max(20, prev.ram       + randomInt(-3, 3))),
        inference:    Math.min(200, Math.max(10, prev.inference + randomInt(-5, 5))),
      }))
    }, 2000)
    return () => clearInterval(id)
  }, [])
  return m
}

export function useMockAlerts() {
  const [alerts, setAlerts] = useState(makeInitialAlerts)
  useEffect(() => {
    const id = setInterval(() => {
      setAlerts(prev => [makeAlert(), ...prev].slice(0, 50))
    }, 3000)
    return () => clearInterval(id)
  }, [])
  return alerts
}

export function useMockDistribution() {
  return [
    { name: 'DoS',        value: 38, color: colors.dos },
    { name: 'PortScan',   value: 27, color: colors.portscan },
    { name: 'Anomaly',    value: 21, color: colors.anomaly },
    { name: 'BruteForce', value: 14, color: colors.brute },
  ]
}

export function useMockHourly() {
  const [data] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      hour:  `${String(i).padStart(2, '0')}:00`,
      count: randomInt(0, 80),
    }))
  )
  return data
}

export function useLiveTrafficHistory() {
  const { rate } = useMockMetrics()
  const [history, setHistory] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({ t: i, v: randomInt(80, 180) }))
  )
  useEffect(() => {
    setHistory(prev => {
      const last = prev[prev.length - 1]
      return [...prev.slice(1), { t: last.t + 1, v: rate }]
    })
  }, [rate])
  return history
}
