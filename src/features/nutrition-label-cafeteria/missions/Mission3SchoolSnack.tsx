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
import { MissionPhaseGuide } from '../MissionPhaseGuide'
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
  const [conditionPhrase, setConditionPhrase] = useState('')
  const [pickedFoodName, setPickedFoodName] = useState('')

  const condition = mission3Condition
  const evalResult = evaluateMealCondition(meal.selections, foodCards, condition)
  const numbersOk = explanationReady(explanation, meal.totals)
  const picked = meal.selections.length > 0
  const sentenceOk =
    conditionPhrase === condition.explanation &&
    meal.selections.some((selection) => {
      const food = foodCards.find((item) => item.id === selection.foodId)
      return food?.name === pickedFoodName
    })
  const canFinish = evalResult.passed && meal.badgesReady && numbersOk && sentenceOk

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

  const phases = [
    { id: 'pick', label: '식품 고르기', done: picked, active: !picked },
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
      message={message || condition.explanation}
      finishHint={
        canFinish
          ? undefined
          : !picked
            ? '음료 1개 + 간식 1개를 골라 주세요'
            : !meal.badgesReady
              ? '선택한 식품의 「눌러 확인」을 눌러 주세요'
              : !evalResult.passed
                ? '조건을 만족하는 조합으로 바꿔 보세요'
                : !sentenceOk
                  ? '조건 문구와 식품 이름을 골라 주세요'
                  : '아래 문장의 숫자를 골라 주세요'
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
      <section className="mission-phase-block" aria-label="1단계 식품 고르기와 제공량">
        <h3 className="phase-heading">1–2. 식품 고르기 · 표시 확인</h3>
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
            setConditionPhrase('')
            setPickedFoodName('')
          }}
        />
      </section>
      {picked && (
        <section className="mission-phase-block" aria-label="3단계 조건">
          <h3 className="phase-heading">3. 조건 · 문장</h3>
          <ConditionChecklist condition={condition} checks={evalResult.checks} />
          <fieldset>
            <legend>나는 ___ 조건을 확인하고 ___을(를) 선택했습니다.</legend>
            <div className="chip-row">
              <p>조건 문구 고르기</p>
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
            {(conditionPhrase === '당류만 확인' || conditionPhrase === '그림만 보고 선택') && (
              <p className="feedback" role="status">
                조건 전체를 확인하고, 실제로 고른 식품 이름을 골라 보세요.
              </p>
            )}
            <div className="chip-row">
              <p>선택한 식품 이름 고르기</p>
              <div className="chips" role="group" aria-label="식품 이름">
                {meal.selections
                  .map((selection) =>
                    foodCards.find((food) => food.id === selection.foodId)?.name,
                  )
                  .filter((name): name is string => Boolean(name))
                  .map((name) => (
                    <button
                      key={name}
                      type="button"
                      className={pickedFoodName === name ? 'chip selected' : 'chip'}
                      onClick={() => setPickedFoodName(name)}
                    >
                      {name}
                    </button>
                  ))}
              </div>
            </div>
          </fieldset>
        </section>
      )}
      <section className="mission-phase-block" aria-label="4단계 숫자 고르기">
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
