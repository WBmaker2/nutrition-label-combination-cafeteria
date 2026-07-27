import { foodCardAriaLabel } from '../../lib/accessibilityLabels'
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

  return (
    <article
      className={`card food-card${selected ? ' selected' : ''}`}
      aria-label={foodCardAriaLabel(food)}
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect?.()}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
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
      <div className="badge-row">
        <button
          type="button"
          className={`badge badge-serving${confirmed?.serving ? ' confirmed' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            tapBadge('serving')
          }}
        >
          1회 제공량 · {unit}
        </button>
        <button
          type="button"
          className={`badge badge-package${confirmed?.package ? ' confirmed' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            tapBadge('package')
          }}
        >
          총 제공량 · {food.label.servingsPerPackage}회
        </button>
      </div>
      <table className="nutrition-table">
        <thead>
          <tr>
            <th>🍬 당류 (g)</th>
            <th>🧂 나트륨 (mg)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {findMode ? (
                <button
                  type="button"
                  className={`field-find${confirmed?.sugar ? ' confirmed' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onFindField?.('sugar')
                  }}
                >
                  {food.label.sugarGram}g
                </button>
              ) : (
                `${food.label.sugarGram}g`
              )}
            </td>
            <td>
              {findMode ? (
                <button
                  type="button"
                  className={`field-find${confirmed?.sodium ? ' confirmed' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onFindField?.('sodium')
                  }}
                >
                  {food.label.sodiumMilligram}mg
                </button>
              ) : (
                `${food.label.sodiumMilligram}mg`
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  )
}

export function Stepper({
  value,
  max,
  onChange,
  disabled,
}: {
  value: number
  max: number
  onChange: (n: number) => void
  disabled?: boolean
}) {
  return (
    <div className="stepper" role="group" aria-label="제공량 선택">
      <button
        type="button"
        className="btn-secondary"
        disabled={disabled}
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        −
      </button>
      <span className="stepper-value">{value}회</span>
      <button
        type="button"
        className="btn-secondary"
        disabled={disabled}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  )
}
