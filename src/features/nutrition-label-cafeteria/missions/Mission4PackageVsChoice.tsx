import { useState } from 'react'
import { foodCards, getFoodById } from '../../../data/foodCards'
import type { MealSelection } from '../../../data/types'
import { sumSelections } from '../../../lib/nutritionCalculation'
import { FoodLabelCard } from '../FoodLabelCard'
import { MissionShell } from '../MissionShell'

const TITLE = '포장 전체와 실제 선택량'

export function Mission4PackageVsChoice({
  onBack,
  onComplete,
}: {
  onBack: () => void
  onComplete: (summary: string) => void
}) {
  const [badges, setBadges] = useState<Record<string, { serving: boolean; package: boolean }>>({})
  const [message] = useState('')
  const [scenario, setScenario] = useState<'share' | 'alone'>('share')

  const confirmBadge = (foodId: string, kind: 'serving' | 'package') => {
    setBadges((prev) => ({
      ...prev,
      [foodId]: { ...(prev[foodId] ?? { serving: false, package: false }), [kind]: true },
    }))
  }

  const scenarioFoods = ['cracker', 'yogurt', 'juice'] as const
  const expected: MealSelection[] =
    scenario === 'share'
      ? [
          { foodId: 'cracker', servingsChosen: 1 },
          { foodId: 'yogurt', servingsChosen: 1 },
          { foodId: 'juice', servingsChosen: 1 },
        ]
      : [
          { foodId: 'cracker', servingsChosen: 4 },
          { foodId: 'yogurt', servingsChosen: 1 },
          { foodId: 'juice', servingsChosen: 2 },
        ]
  const totals = sumSelections(expected, foodCards)
  const canFinish = scenarioFoods.every(
    (foodId) => badges[foodId]?.serving && badges[foodId]?.package,
  )

  return (
    <MissionShell
      title={TITLE}
      message={message}
      onBack={onBack}
      canFinish={canFinish}
      onFinish={() =>
        onComplete(
          `시나리오 ${scenario === 'share' ? '나누어 먹기' : '혼자 먹기'}: 당류 ${totals.sugarGram}g, 나트륨 ${totals.sodiumMilligram}mg`,
        )
      }
    >
      <div className="actions">
        <button
          type="button"
          className={scenario === 'share' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setScenario('share')}
        >
          나누어 먹기 (각 1회)
        </button>
        <button
          type="button"
          className={scenario === 'alone' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setScenario('alone')}
        >
          혼자 먹기 (포장 전체)
        </button>
      </div>
      {expected.map((sel) => {
        const food = getFoodById(sel.foodId)!
        return (
          <div key={food.id}>
            <FoodLabelCard
              food={food}
              confirmed={badges[food.id]}
              onConfirm={(k) => confirmBadge(food.id, k)}
            />
            <p>
              {food.name}: {sel.servingsChosen}회 선택
            </p>
          </div>
        )
      })}
      <p>
        합계: 당류 {totals.sugarGram}g · 나트륨 {totals.sodiumMilligram}mg
      </p>
    </MissionShell>
  )
}
