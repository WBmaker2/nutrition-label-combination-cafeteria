import { useMemo, useState } from 'react'
import { foodCards } from '../../../data/foodCards'
import { mission5Condition } from '../../../data/mealConditions'
import type { MealSelection } from '../../../data/types'
import { evaluateMealCondition } from '../../../lib/mealValidation'
import { sumSelections } from '../../../lib/nutritionCalculation'
import { FoodLabelCard, Stepper } from '../FoodLabelCard'
import { MissionShell } from '../MissionShell'

const TITLE = '영양표시 조합 식당 최종 주문'

export function Mission5FinalOrder({
  onBack,
  onComplete,
}: {
  onBack: () => void
  onComplete: (summary: string) => void
}) {
  const [badges, setBadges] = useState<Record<string, { serving: boolean; package: boolean }>>({})
  const [selections, setSelections] = useState<MealSelection[]>([])
  const [message, setMessage] = useState('')
  const [explanation, setExplanation] = useState({ sugar: '', sodium: '' })

  const confirmBadge = (foodId: string, kind: 'serving' | 'package') => {
    setBadges((prev) => ({
      ...prev,
      [foodId]: { ...(prev[foodId] ?? { serving: false, package: false }), [kind]: true },
    }))
  }

  const setServing = (foodId: string, servingsChosen: number) => {
    setSelections((prev) => {
      const rest = prev.filter((s) => s.foodId !== foodId)
      return [...rest, { foodId, servingsChosen }]
    })
  }

  const condition = mission5Condition
  const totals = useMemo(() => sumSelections(selections, foodCards), [selections])
  const evalResult = evaluateMealCondition(selections, foodCards, condition)
  const badgeReady = selections.every(
    (s) => badges[s.foodId]?.serving && badges[s.foodId]?.package,
  )
  const numbersOk =
    explanation.sugar === String(totals.sugarGram) &&
    explanation.sodium === String(totals.sodiumMilligram)
  const canFinish = evalResult.passed && badgeReady && numbersOk

  const toggleFood = (foodId: string) => {
    if (selections.some((s) => s.foodId === foodId)) {
      setSelections((prev) => prev.filter((s) => s.foodId !== foodId))
    } else {
      setServing(foodId, 1)
      setMessage('')
    }
  }

  return (
    <MissionShell
      title={TITLE}
      message={message || condition.explanation}
      onBack={onBack}
      canFinish={canFinish}
      onFinish={() =>
        onComplete(
          `조건: ${condition.explanation}\n당류 합 ${totals.sugarGram}g, 나트륨 합 ${totals.sodiumMilligram}mg\n이 조합의 당류 합은 ${totals.sugarGram}g, 나트륨 합은 ${totals.sodiumMilligram}mg입니다.`,
        )
      }
    >
      <div className="food-grid">
        {foodCards.map((food) => (
          <div key={food.id}>
            <FoodLabelCard
              food={food}
              selected={selections.some((s) => s.foodId === food.id)}
              onSelect={() => toggleFood(food.id)}
              confirmed={badges[food.id]}
              onConfirm={(k) => confirmBadge(food.id, k)}
            />
            {selections.find((s) => s.foodId === food.id) && (
              <Stepper
                value={selections.find((s) => s.foodId === food.id)!.servingsChosen}
                max={food.label.servingsPerPackage}
                onChange={(n) => setServing(food.id, n)}
              />
            )}
          </div>
        ))}
      </div>
      <p>
        당류 합: {totals.sugarGram}g · 나트륨 합: {totals.sodiumMilligram}mg
      </p>
      {!evalResult.passed && selections.length > 0 && (
        <p className="feedback">조건을 다시 확인해 보세요. 당류·나트륨·구성을 각각 확인합니다.</p>
      )}
      <fieldset>
        <legend>근거 문장 숫자 조립</legend>
        <label>
          당류 합 (g){' '}
          <input
            value={explanation.sugar}
            onChange={(e) => setExplanation((p) => ({ ...p, sugar: e.target.value }))}
          />
        </label>
        <label>
          나트륨 합 (mg){' '}
          <input
            value={explanation.sodium}
            onChange={(e) => setExplanation((p) => ({ ...p, sodium: e.target.value }))}
          />
        </label>
      </fieldset>
    </MissionShell>
  )
}
