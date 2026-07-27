import { useMemo, useState } from 'react'
import { foodCards } from '../../../data/foodCards'
import { mission3Condition } from '../../../data/mealConditions'
import { evaluateMealCondition } from '../../../lib/mealValidation'
import { ConditionChecklist } from '../ConditionChecklist'
import {
  ExplanationBuilder,
  explanationReady,
  type ExplanationValues,
} from '../ExplanationBuilder'
import { MealBuilder } from '../MealBuilder'
import { MissionShell } from '../MissionShell'
import { useMealInvestigation } from '../useMealInvestigation'

const TITLE = '학교 간식 조합'

export function Mission3SchoolSnack({
  onBack,
  onComplete,
}: {
  onBack: () => void
  onComplete: (summary: string) => void
}) {
  const meal = useMealInvestigation(foodCards)
  const [explanation, setExplanation] = useState<ExplanationValues>({
    sugarGram: null,
    sodiumMilligram: null,
  })
  const [message, setMessage] = useState('')

  const condition = mission3Condition
  const evalResult = evaluateMealCondition(meal.selections, foodCards, condition)
  const numbersOk = explanationReady(explanation, meal.totals)
  const canFinish = evalResult.passed && meal.badgesReady && numbersOk

  const sugarChips = useMemo(() => {
    const base = [meal.totals.sugarGram, 20, 28, 30, 36].filter((n) => n > 0)
    return Array.from(new Set(base)).sort((a, b) => a - b)
  }, [meal.totals.sugarGram])

  const sodiumChips = useMemo(() => {
    const base = [meal.totals.sodiumMilligram, 135, 200, 280, 400].filter((n) => n > 0)
    return Array.from(new Set(base)).sort((a, b) => a - b)
  }, [meal.totals.sodiumMilligram])

  const toggleSelect = (foodId: string) => {
    if (meal.selections.some((s) => s.foodId === foodId)) {
      meal.removeSelection(foodId)
      return
    }
    if (meal.selections.length >= 2) {
      setMessage('음료 1개와 간식 슬롯 1개만 선택해 보세요.')
      return
    }
    meal.setSelection(foodId, 1)
    setMessage('')
  }

  return (
    <MissionShell
      title={TITLE}
      message={message || condition.explanation}
      onBack={onBack}
      canFinish={canFinish}
      onFinish={() =>
        onComplete(
          `조건: ${condition.explanation}\n당류 합 ${meal.totals.sugarGram}g, 나트륨 합 ${meal.totals.sodiumMilligram}mg\n이 조합의 당류 합은 ${meal.totals.sugarGram}g, 나트륨 합은 ${meal.totals.sodiumMilligram}mg입니다.`,
        )
      }
    >
      <MealBuilder
        foods={foodCards}
        selections={meal.selections}
        confirmedBadges={meal.confirmedBadges}
        totals={meal.totals}
        onToggleSelect={toggleSelect}
        onSetServing={meal.setSelection}
        onConfirmBadge={meal.confirmBadge}
        onRemove={meal.removeSelection}
        onReset={() => {
          meal.reset()
          setExplanation({ sugarGram: null, sodiumMilligram: null })
          setMessage('')
        }}
      />
      {meal.selections.length > 0 && (
        <ConditionChecklist condition={condition} checks={evalResult.checks} />
      )}
      <ExplanationBuilder
        sugarChips={sugarChips}
        sodiumChips={sodiumChips}
        values={explanation}
        onChange={setExplanation}
        actual={meal.totals}
      />
    </MissionShell>
  )
}
