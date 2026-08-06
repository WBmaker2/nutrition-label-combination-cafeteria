import type { MealCondition } from '../../data/types'

type Checks = {
  sugar: boolean
  sodium: boolean
  categories: boolean
  snackSlot?: boolean
  servingsOk?: boolean
}

export function ConditionChecklist({
  condition,
  checks,
}: {
  condition: MealCondition
  checks: Checks
}) {
  const items: { key: string; label: string; ok: boolean }[] = []

  if (condition.maxSugarGram !== undefined) {
    items.push({
      key: 'sugar',
      label: `당류 합 ≤ ${condition.maxSugarGram}g`,
      ok: checks.sugar,
    })
  }
  if (condition.maxSodiumMilligram !== undefined) {
    items.push({
      key: 'sodium',
      label: `나트륨 합 ≤ ${condition.maxSodiumMilligram}mg`,
      ok: checks.sodium,
    })
  }
  if (condition.requiredCategories?.length) {
    items.push({
      key: 'categories',
      label: `구성: ${condition.requiredCategories.join(', ')} 포함`,
      ok: checks.categories,
    })
  }
  if (condition.snackSlotCategories && checks.snackSlot !== undefined) {
    items.push({
      key: 'snackSlot',
      label: '음료 1회 + 간식 슬롯 1회',
      ok: checks.snackSlot,
    })
  }
  if (checks.servingsOk !== undefined) {
    items.push({
      key: 'servings',
      label: '제공량 범위 확인',
      ok: checks.servingsOk,
    })
  }

  return (
    <ul className="condition-checklist sticker-list" aria-label="조건 확인">
      {items.map((item) => (
        <li key={item.key} className={item.ok ? 'check-pass sticker-pop' : 'check-fail'}>
          <span className="sticker" aria-hidden="true">
            {item.ok ? '⭐' : '○'}
          </span>{' '}
          {item.label}: {item.ok ? '잘했어요!' : '아직이에요'}
        </li>
      ))}
    </ul>
  )
}
