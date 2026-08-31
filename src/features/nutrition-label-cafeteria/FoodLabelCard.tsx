import { foodCardAriaLabel } from '../../lib/accessibilityLabels'
import { assertServingsInRange } from '../../lib/mealValidation'
import { getFeedbackMessage } from '../../data/feedbackRules'
import type { FoodCard } from '../../data/types'

export type LabelField = 'serving' | 'package' | 'sugar' | 'sodium'
export type BadgeKind = 'serving' | 'package'

export function FoodLabelCard({
  food,
  selected,
  onSelect,
  confirmed,
  onConfirm,
  findMode,
  onFindField,
}: {
  food: FoodCard
  selected?: boolean
  onSelect?: () => void
  confirmed?: { serving: boolean; package: boolean; sugar?: boolean; sodium?: boolean }
  onConfirm?: (kind: BadgeKind) => void
  findMode?: boolean
  onFindField?: (kind: LabelField) => void
}) {
  const unit =
    food.label.servingUnit === 'piece'
      ? `${food.label.servingAmount}개`
      : `${food.label.servingAmount}${food.label.servingUnit}`

  const tapBadge = (kind: BadgeKind) => {
    if (findMode) onFindField?.(kind)
    else onConfirm?.(kind)
  }

  const needBadgeTap =
    Boolean(onConfirm || findMode) && !(confirmed?.serving && confirmed?.package)

  return (
    <article
      className={`card food-card${selected ? ' selected' : ''}`}
      aria-label={foodCardAriaLabel(food, {
        hideUnconfirmed: Boolean(findMode),
        confirmed,
      })}
    >
      <div className="food-head">
        <span className="food-icon" aria-hidden="true">
          {food.icon}
        </span>
        <div>
          <h3>{food.name}</h3>
          <p className="muted">{food.note}</p>
        </div>
      </div>
      {needBadgeTap && (
        <p className="tap-cue" role="status">
          👇 아래 버튼을 눌러 확인해 주세요
        </p>
      )}
      <div className="badge-row">
        <button
          type="button"
          className={`badge badge-serving${confirmed?.serving ? ' confirmed anim-confirm' : ' needs-tap'}`}
          onClick={() => tapBadge('serving')}
          aria-pressed={Boolean(confirmed?.serving)}
        >
          {confirmed?.serving
            ? `✓ 1회 제공량 · ${unit}`
            : findMode
              ? '1회 제공량 확인하기'
              : `1회 제공량 확인하기 · ${unit}`}
        </button>
        <button
          type="button"
          className={`badge badge-package${confirmed?.package ? ' confirmed anim-confirm' : ' needs-tap'}`}
          onClick={() => tapBadge('package')}
          aria-pressed={Boolean(confirmed?.package)}
        >
          {confirmed?.package
            ? `✓ 총 제공량 · ${food.label.servingsPerPackage}회`
            : findMode
              ? '총 제공량 확인하기'
              : `총 제공량 확인하기 · ${food.label.servingsPerPackage}회`}
        </button>
      </div>
      <table className="nutrition-table">
        <thead>
          <tr>
            <th scope="col">🍬 당류 (g)</th>
            <th scope="col">🧂 나트륨 (mg)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {findMode ? (
                <button
                  type="button"
                  className={`field-find${confirmed?.sugar ? ' confirmed anim-confirm' : ' needs-tap'}`}
                  onClick={() => onFindField?.('sugar')}
                  aria-pressed={Boolean(confirmed?.sugar)}
                  aria-label={
                    confirmed?.sugar
                      ? `${food.name} 당류 ${food.label.sugarGram}g 확인됨`
                      : `${food.name} 당류 값 확인하기`
                  }
                  aria-live="polite"
                >
                  {confirmed?.sugar
                    ? `✓ 당류 ${food.label.sugarGram}g`
                    : '당류 값 확인하기'}
                </button>
              ) : (
                `${food.label.sugarGram}g`
              )}
            </td>
            <td>
              {findMode ? (
                <button
                  type="button"
                  className={`field-find${confirmed?.sodium ? ' confirmed anim-confirm' : ' needs-tap'}`}
                  onClick={() => onFindField?.('sodium')}
                  aria-pressed={Boolean(confirmed?.sodium)}
                  aria-label={
                    confirmed?.sodium
                      ? `${food.name} 나트륨 ${food.label.sodiumMilligram}mg 확인됨`
                      : `${food.name} 나트륨 값 확인하기`
                  }
                  aria-live="polite"
                >
                  {confirmed?.sodium
                    ? `✓ 나트륨 ${food.label.sodiumMilligram}mg`
                    : '나트륨 값 확인하기'}
                </button>
              ) : (
                `${food.label.sodiumMilligram}mg`
              )}
            </td>
          </tr>
        </tbody>
      </table>
      {onSelect && (
        <button
          type="button"
          className={selected ? 'btn-secondary' : 'btn-primary'}
          aria-pressed={Boolean(selected)}
          onClick={onSelect}
        >
          {selected ? '선택 해제' : '이 식품 고르기'}
        </button>
      )}
    </article>
  )
}

export function Stepper({
  value,
  max,
  food,
  onChange,
  disabled,
  onBoundaryFeedback,
}: {
  value: number
  max: number
  food: FoodCard
  onChange: (n: number) => void
  disabled?: boolean
  onBoundaryFeedback?: (message: string) => void
}) {
  const tryChange = (next: number) => {
    const result = assertServingsInRange(next, food)
    if (!result.ok) {
      onBoundaryFeedback?.(getFeedbackMessage(result.feedbackKey))
      return
    }
    onBoundaryFeedback?.('')
    onChange(Math.min(max, next))
  }

  return (
    <div className="stepper" role="group" aria-label={`${food.name} 제공량 선택`}>
      <button
        type="button"
        className="btn-secondary"
        disabled={disabled}
        aria-label={`${food.name} 제공량 1회 줄이기`}
        onClick={() => tryChange(value - 1)}
      >
        −
      </button>
      <span
        className="stepper-value"
        aria-live="polite"
        aria-label={`${food.name} 현재 제공량 ${value}회`}
      >
        {value}회
      </span>
      <button
        type="button"
        className="btn-secondary"
        disabled={disabled}
        aria-label={`${food.name} 제공량 1회 늘리기`}
        onClick={() => tryChange(value + 1)}
      >
        +
      </button>
    </div>
  )
}
