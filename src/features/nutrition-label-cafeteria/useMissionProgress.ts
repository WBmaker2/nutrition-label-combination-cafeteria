import { useEffect, useState } from 'react'

export const HUB_KEY = 'nlc-hub-unlocked'
export const COMPLETED_KEY = 'nlc-completed'
export const MISSION_COUNT = 6

function readCompleted(): boolean[] {
  try {
    const raw = localStorage.getItem(COMPLETED_KEY)
    if (!raw) return Array(MISSION_COUNT).fill(false)
    const parsed = JSON.parse(raw) as unknown
    if (
      !Array.isArray(parsed) ||
      parsed.length !== MISSION_COUNT ||
      !parsed.every((value): value is boolean => typeof value === 'boolean')
    ) {
      return Array(MISSION_COUNT).fill(false)
    }
    return parsed
  } catch {
    return Array(MISSION_COUNT).fill(false)
  }
}

function allDone(flags: boolean[]) {
  return flags.length === MISSION_COUNT && flags.every(Boolean)
}

export function useMissionProgress() {
  const [completed, setCompleted] = useState<boolean[]>(() => Array(MISSION_COUNT).fill(false))
  const [hubUnlocked, setHubUnlocked] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = readCompleted()
    const hub = localStorage.getItem(HUB_KEY) === '1' || allDone(saved)
    setCompleted(saved)
    setHubUnlocked(hub)
    if (hub && localStorage.getItem(HUB_KEY) !== '1') {
      localStorage.setItem(HUB_KEY, '1')
    }
    setHydrated(true)
  }, [])

  const isUnlocked = (id: number, mode: 'linear' | 'hub') => {
    if (mode === 'hub' && hubUnlocked) return true
    return id === 0 || completed[id - 1]
  }

  const completeMission = (id: number) => {
    setCompleted((prev) => {
      const next = [...prev]
      next[id] = true
      localStorage.setItem(COMPLETED_KEY, JSON.stringify(next))
      if (allDone(next)) {
        localStorage.setItem(HUB_KEY, '1')
        setHubUnlocked(true)
      }
      return next
    })
  }

  const completedCount = completed.filter(Boolean).length

  return {
    completed,
    completedCount,
    hubUnlocked,
    hydrated,
    isUnlocked,
    completeMission,
  }
}
