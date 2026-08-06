import { useMemo, useState } from 'react'
import { foodCards } from '../../../data/foodCards'
import { mission5Condition } from '../../../data/mealConditions'
import { evaluateMealCondition } from '../../../lib/mealValidation'
import { ConditionChecklist } from '../ConditionChecklist'
import {
  ExplanationBuilder,
  explanationReady,
  type ExplanationValues,
} from '../ExplanationBuilder'
import { MealBuilder } from '../MealBuilder'
import { MissionPhaseGuide } from '../MissionPhaseGuide'
import { MissionShell } from '../MissionShell'
import { useMealInvestigation } from '../useMealInvestigation'

const TITLE = '영양표시 조합 식당 최종 주문'

export function Mission5FinalOrder({
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
  const [conditionPhrase, setConditionPhrase] = useState('')
  const [pickedFoodName, setPickedFoodName] = useState('')

  const condition = mission5Condition
  const evalResult = evaluateMealCondition(meal.selections, foodCards, condition)
  const numbersOk = explanationReady(explanation, meal.totals)
  const picked = meal.selections.length > 0
  const sentenceOk =
    conditionPhrase === condition.explanation &&
    meal.selections.some((s) => {
      const food = foodCards.find((f) => f.id === s.foodId)
      return food?.name === pickedFoodName
    })
  const canFinish = evalResult.passed && meal.badgesReady && numbersOk && sentenceOk

  const sugarChips = useMemo(() => {
    const base = [meal.totals.sugarGram, 22, 30, 36, 40].filter((n) => n > 0)
    return Array.from(new Set(base)).sort((a, b) => a - b)
  }, [meal.totals.sugarGram])

  const sodiumChips = useMemo(() => {
    const base = [meal.totals.sodiumMilligram, 200, 280, 400, 480].filter((n) => n > 0)
    return Array.from(new Set(base)).sort((a, b) => a - b)
  }, [meal.totals.sodiumMilligram])

  const foodNameChips = meal.selections
    .map((s) => foodCards.find((f) => f.id === s.foodId)?.name)
    .filter((n): n is string => Boolean(n))

  const phases = [
    { id: 'pick', label: '조합 고르기', done: picked, active: !picked },
    {
      id: 'badge',
      label: '표시 확인',
      done: meal.badgesReady,
      active: picked && !meal.badgesReady,
    },
    {
      id: 'condition',
      label: '조건·문장',
      done: evalResult.passed && sentenceOk,
      active: meal.badgesReady && !(evalResult.passed && sentenceOk),
    },
    {
      id: 'explain',
      label: '숫자 고르기',
      done: numbersOk,
      active: evalResult.passed && sentenceOk && !numbersOk,
    },
  ]

  return (
    <MissionShell
      title={TITLE}
      message={condition.explanation}
      finishHint={
        canFinish
          ? undefined
          : !picked
            ? '식품을 골라 주세요'
            : !meal.badgesReady
              ? '「눌러 확인」을 눌러 주세요'
              : !evalResult.passed
                ? '조건을 만족하는 조합으로 바꿔 보세요'
                : !sentenceOk
                  ? '조건 문장과 식품 이름을 골라 주세요'
                  : '합계 숫자를 골라 주세요'
      }
      onBack={onBack}
      canFinish={canFinish}
      onFinish={() =>
        onComplete(
          `조건: ${condition.explanation}\n당류 합 ${meal.totals.sugarGram}g, 나트륨 합 ${meal.totals.sodiumMilligram}mg\n나는 ${conditionPhrase} 조건을 확인하고 ${pickedFoodName}을(를) 선택했습니다.\n이 조합의 당류 합은 ${meal.totals.sugarGram}g, 나트륨 합은 ${meal.totals.sodiumMilligram}mg입니다.`,
        )
      }
    >
      <MissionPhaseGuide phases={phases} />
      <section className="mission-phase-block">
        <h3 className="phase-heading">1–2. 조합 고르기 · 표시 확인</h3>
        <MealBuilder
          foods={foodCards}
          selections={meal.selections}
          confirmedBadges={meal.confirmedBadges}
          totals={meal.totals}
          onToggleSelect={(foodId) => {
            if (meal.selections.some((s) => s.foodId === foodId)) meal.removeSelection(foodId)
            else meal.setSelection(foodId, 1)
          }}
          onSetServing={meal.setSelection}
          onConfirmBadge={meal.confirmBadge}
          onRemove={meal.removeSelection}
          onReset={() => {
            meal.reset()
            setExplanation({ sugarGram: null, sodiumMilligram: null })
            setConditionPhrase('')
            setPickedFoodName('')
          }}
        />
      </section>
      {picked && (
        <section className="mission-phase-block">
          <h3 className="phase-heading">3. 조건 · 문장</h3>
          <ConditionChecklist condition={condition} checks={evalResult.checks} />
          <fieldset>
            <legend>나는 ___ 조건을 확인하고 ___을(를) 선택했습니다.</legend>
            <div className="chip-row">
              <p>조건 — 숫자 고르기</p>
              <div className="chips" role="group" aria-label="조건 문구">
                {[condition.explanation, '당류만 확인', '그림만 보고 선택'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className={conditionPhrase === chip ? 'chip selected' : 'chip'}
                    onClick={() => setConditionPhrase(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
            {conditionPhrase === '당류만 확인' || conditionPhrase === '그림만 보고 선택' ? (
              <p className="feedback" role="status">
                조건 전체를 확인하고, 실제로 고른 식품 이름을 골라 보세요.
              </p>
            ) : null}
            <div className="chip-row">
              <p>선택한 식품</p>
              <div className="chips" role="group" aria-label="식품 이름">
                {(foodNameChips.length ? foodNameChips : ['(식품을 먼저 선택)']).map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className={pickedFoodName === chip ? 'chip selected' : 'chip'}
                    disabled={chip.startsWith('(')}
                    onClick={() => setPickedFoodName(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </fieldset>
        </section>
      )}
      <section className="mission-phase-block">
        <h3 className="phase-heading">4. 근거 숫자 고르기</h3>
        <ExplanationBuilder
          sugarChips={sugarChips}
          sodiumChips={sodiumChips}
          values={explanation}
          onChange={setExplanation}
          actual={meal.totals}
        />
      </section>
    </MissionShell>
  )
}
