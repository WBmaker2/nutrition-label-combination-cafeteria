import { useMemo, useState } from 'react'
import type { FoodCard, MealSelection } from '../../data/types'
import { sumSelections } from '../../lib/nutritionCalculation'

export type BadgeConfirm = { serving: boolean; package: boolean }

export function useMealInvestigation(foods: FoodCard[]) {
  const [selections, setSelections] = useState<MealSelection[]>([])
  const [confirmedBadges, setConfirmedBadges] = useState<Record<string, BadgeConfirm>>({})
  const [feedbackKeys, setFeedbackKeys] = useState<string[]>([])

  const setSelection = (foodId: string, servingsChosen: number) => {
    setSelections((prev) => {
      const rest = prev.filter((s) => s.foodId !== foodId)
      return [...rest, { foodId, servingsChosen }]
    })
  }

  const removeSelection = (foodId: string) => {
    setSelections((prev) => prev.filter((s) => s.foodId !== foodId))
  }

  const confirmBadge = (foodId: string, kind: 'serving' | 'package') => {
    setConfirmedBadges((prev) => ({
      ...prev,
      [foodId]: {
        ...(prev[foodId] ?? { serving: false, package: false }),
        [kind]: true,
      },
    }))
  }

  const reset = () => {
    setSelections([])
    setConfirmedBadges({})
    setFeedbackKeys([])
  }

  const totals = useMemo(() => sumSelections(selections, foods), [selections, foods])

  const badgesReady = selections.every(
    (s) => confirmedBadges[s.foodId]?.serving && confirmedBadges[s.foodId]?.package,
  )

  return {
    selections,
    confirmedBadges,
    feedbackKeys,
    setFeedbackKeys,
    setSelection,
    removeSelection,
    confirmBadge,
    reset,
    totals,
    badgesReady,
  }
}
