import { useEffect, useState } from 'react'
import type { FoodCard, MealSelection } from '../../data/types'
import type { BadgeConfirm } from './useMealInvestigation'
import { FoodLabelCard, Stepper } from './FoodLabelCard'

type Step = 'select' | 'servings' | 'summary'

export function MealBuilder({
  foods,
  selections,
  confirmedBadges,
  totals,
  onToggleSelect,
  onSetServing,
  onConfirmBadge,
  onRemove,
  onReset,
}: {
  foods: FoodCard[]
  selections: MealSelection[]
  confirmedBadges: Record<string, BadgeConfirm>
  totals: { sugarGram: number; sodiumMilligram: number }
  onToggleSelect: (foodId: string) => void
  onSetServing: (foodId: string, servingsChosen: number) => void
  onConfirmBadge: (foodId: string, kind: 'serving' | 'package') => void
  onRemove: (foodId: string) => void
  onReset: () => void
}) {
  const [narrow, setNarrow] = useState(false)
  const [step, setStep] = useState<Step>('select')
  const [servingFeedback, setServingFeedback] = useState('')

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const apply = () => setNarrow(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  const selectedFoods = selections
    .map((s) => ({
      selection: s,
      food: foods.find((f) => f.id === s.foodId)!,
    }))
    .filter((x) => x.food)

  const badgeOk = (foodId: string) =>
    Boolean(confirmedBadges[foodId]?.serving && confirmedBadges[foodId]?.package)

  const servingsLocked = (foodId: string) => !badgeOk(foodId)

  const wideGrid = (
    <div className="food-grid meal-builder-wide">
      {foods.map((food) => {
        const sel = selections.find((s) => s.foodId === food.id)
        return (
          <div key={food.id}>
            <FoodLabelCard
              food={food}
              selected={Boolean(sel)}
              onSelect={() => {
                if (sel) onRemove(food.id)
                else onToggleSelect(food.id)
              }}
              confirmed={confirmedBadges[food.id]}
              onConfirm={(k) => onConfirmBadge(food.id, k)}
            />
            {sel && (
              <>
                {!badgeOk(food.id) && (
                  <p className="hint">제공량을 정하기 전에 「눌러 확인」으로 1회·총 제공량을 확인해 주세요.</p>
                )}
                <Stepper
                  value={sel.servingsChosen}
                  max={food.label.servingsPerPackage}
                  food={food}
                  disabled={servingsLocked(food.id)}
                  onChange={(n) => onSetServing(food.id, n)}
                  onBoundaryFeedback={setServingFeedback}
                />
              </>
            )}
          </div>
        )
      })}
    </div>
  )

  const narrowFlow = (
    <div className="meal-builder-narrow">
      <div className="builder-progress" aria-hidden="true">
        <div
          className="builder-progress-fill"
          style={{
            width: step === 'select' ? '33%' : step === 'servings' ? '66%' : '100%',
          }}
        />
      </div>
      <p className="muted builder-step-label">
        단계 {step === 'select' ? '1' : step === 'servings' ? '2' : '3'} / 3 —{' '}
        {step === 'select' ? '식품 선택' : step === 'servings' ? '제공량' : '합계'}
      </p>
      <div className="step-tabs" role="tablist" aria-label="식사 구성 단계">
        {(['select', 'servings', 'summary'] as Step[]).map((s, i) => (
          <button
            key={s}
            type="button"
            role="tab"
            className={step === s ? 'btn-primary' : 'btn-secondary'}
            aria-selected={step === s}
            onClick={() => setStep(s)}
          >
            {i + 1}. {s === 'select' ? '식품 선택' : s === 'servings' ? '제공량' : '합계'}
          </button>
        ))}
      </div>

      {step === 'select' && (
        <div className="food-grid">
          {foods.map((food) => {
            const sel = selections.find((s) => s.foodId === food.id)
            return (
              <FoodLabelCard
                key={food.id}
                food={food}
                selected={Boolean(sel)}
                onSelect={() => {
                  if (sel) onRemove(food.id)
                  else onToggleSelect(food.id)
                }}
                confirmed={confirmedBadges[food.id]}
                onConfirm={(k) => onConfirmBadge(food.id, k)}
              />
            )
          })}
          <button
            type="button"
            className="btn-primary"
            disabled={selections.length === 0}
            onClick={() => setStep('servings')}
          >
            제공량으로
          </button>
        </div>
      )}

      {step === 'servings' && (
        <div>
          {selectedFoods.map(({ food, selection }) => (
            <div key={food.id} className="card">
              <h3>{food.name}</h3>
              <FoodLabelCard
                food={food}
                confirmed={confirmedBadges[food.id]}
                onConfirm={(k) => onConfirmBadge(food.id, k)}
              />
              {!badgeOk(food.id) && (
                <p className="hint">「눌러 확인」을 누른 뒤에 제공량을 정할 수 있어요.</p>
              )}
              <Stepper
                value={selection.servingsChosen}
                max={food.label.servingsPerPackage}
                food={food}
                disabled={servingsLocked(food.id)}
                onChange={(n) => onSetServing(food.id, n)}
                onBoundaryFeedback={setServingFeedback}
              />
            </div>
          ))}
          <div className="actions">
            <button type="button" className="btn-secondary" onClick={() => setStep('select')}>
              선택으로
            </button>
            <button type="button" className="btn-primary" onClick={() => setStep('summary')}>
              합계로
            </button>
          </div>
        </div>
      )}

      {step === 'summary' && (
        <div>
          <p>
            당류 합: {totals.sugarGram}g · 나트륨 합: {totals.sodiumMilligram}mg
          </p>
          <ul>
            {selectedFoods.map(({ food, selection }) => (
              <li key={food.id}>
                {food.name}: {selection.servingsChosen}회
              </li>
            ))}
          </ul>
          <button type="button" className="btn-secondary" onClick={() => setStep('servings')}>
            제공량으로
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className="meal-builder">
      {narrow ? narrowFlow : wideGrid}
      {!narrow && (
        <p>
          당류 합: {totals.sugarGram}g · 나트륨 합: {totals.sodiumMilligram}mg
        </p>
      )}
      {servingFeedback && (
        <p className="feedback" role="status">
          {servingFeedback}
        </p>
      )}
      <div className="actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => {
            onReset()
            setStep('select')
            setServingFeedback('')
          }}
        >
          처음부터 다시 계산
        </button>
      </div>
    </div>
  )
}
