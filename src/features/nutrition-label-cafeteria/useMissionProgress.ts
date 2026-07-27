import { useEffect, useState } from 'react'

export const HUB_KEY = 'nlc-hub-unlocked'
export const MISSION_COUNT = 6

export function useMissionProgress() {
  const [completed, setCompleted] = useState<boolean[]>(Array(MISSION_COUNT).fill(false))
  const [hubUnlocked, setHubUnlocked] = useState(false)

  useEffect(() => {
    setHubUnlocked(localStorage.getItem(HUB_KEY) === '1')
  }, [])

  const isUnlocked = (id: number, mode: 'linear' | 'hub') => {
    if (mode === 'hub' && hubUnlocked) return true
    return id === 0 || completed[id - 1]
  }

  const completeMission = (id: number) => {
    setCompleted((prev) => {
      const next = [...prev]
      next[id] = true
      if (next.every(Boolean)) {
        localStorage.setItem(HUB_KEY, '1')
        setHubUnlocked(true)
      }
      return next
    })
  }

  return { completed, hubUnlocked, isUnlocked, completeMission }
}
