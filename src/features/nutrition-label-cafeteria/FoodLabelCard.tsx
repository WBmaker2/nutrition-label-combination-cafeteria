import { foodCardAriaLabel } from '../../lib/accessibilityLabels'
import type { FoodCard } from '../../data/types'

export function FoodLabelCard({
  food,
  selected,
  onSelect,
  confirmed,
  onConfirm,
}: {
  food: FoodCard
  selected?: boolean
  onSelect?: () => void
  confirmed?: { serving: boolean; package: boolean }
  onConfirm?: (kind: 'serving' | 'package') => void
}) {
  const unit =
    food.label.servingUnit === 'piece'
      ? `${food.label.servingAmount}개`
      : `${food.label.servingAmount}${food.label.servingUnit}`

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
            onConfirm?.('serving')
          }}
        >
          1회 기준 · {unit}
        </button>
        <button
          type="button"
          className={`badge badge-package${confirmed?.package ? ' confirmed' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onConfirm?.('package')
          }}
        >
          포장 전체 · {food.label.servingsPerPackage}회
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
            <td>{food.label.sugarGram}g</td>
            <td>{food.label.sodiumMilligram}mg</td>
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
}: {
  value: number
  max: number
  onChange: (n: number) => void
}) {
  return (
    <div className="stepper" role="group" aria-label="제공량 선택">
      <button type="button" className="btn-secondary" onClick={() => onChange(Math.max(1, value - 1))}>
        −
      </button>
      <span className="stepper-value">{value}회</span>
      <button type="button" className="btn-secondary" onClick={() => onChange(Math.min(max, value + 1))}>
        +
      </button>
    </div>
  )
}
