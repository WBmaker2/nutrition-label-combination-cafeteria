import { beforeEach, describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import {
  COMPLETED_KEY,
  HUB_KEY,
  MISSION_COUNT,
  useMissionProgress,
} from './useMissionProgress'

describe('useMissionProgress', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('unlocks hub mode after every mission completes and persists flag', () => {
    const { result } = renderHook(() => useMissionProgress())

    expect(result.current.hubUnlocked).toBe(false)
    expect(result.current.isUnlocked(1, 'hub')).toBe(false)
    expect(localStorage.getItem(HUB_KEY)).toBeNull()

    act(() => {
      for (let id = 0; id < MISSION_COUNT; id += 1) {
        result.current.completeMission(id)
      }
    })

    expect(result.current.completed.every(Boolean)).toBe(true)
    expect(result.current.hubUnlocked).toBe(true)
    expect(localStorage.getItem(HUB_KEY)).toBe('1')
    expect(localStorage.getItem(COMPLETED_KEY)).toBe(
      JSON.stringify(Array(MISSION_COUNT).fill(true)),
    )
    expect(result.current.isUnlocked(5, 'hub')).toBe(true)
  })

  it('reads existing hub unlock from localStorage on mount', () => {
    localStorage.setItem(HUB_KEY, '1')
    const { result } = renderHook(() => useMissionProgress())

    expect(result.current.hubUnlocked).toBe(true)
    expect(result.current.isUnlocked(3, 'hub')).toBe(true)
    expect(result.current.isUnlocked(1, 'linear')).toBe(false)
  })

  it('restores completed missions from localStorage on mount', () => {
    const saved = [true, true, false, false, false, false]
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(saved))
    const { result } = renderHook(() => useMissionProgress())

    expect(result.current.completed).toEqual(saved)
    expect(result.current.completedCount).toBe(2)
    expect(result.current.isUnlocked(2, 'linear')).toBe(true)
    expect(result.current.isUnlocked(3, 'linear')).toBe(false)
  })

  it('ignores malformed or non-boolean completion records', () => {
    localStorage.setItem(COMPLETED_KEY, JSON.stringify([true, 'yes', false, false, false, false]))

    const { result } = renderHook(() => useMissionProgress())

    expect(result.current.completed).toEqual(Array(MISSION_COUNT).fill(false))
    expect(result.current.completedCount).toBe(0)
  })
})
