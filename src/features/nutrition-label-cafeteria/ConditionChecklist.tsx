import { getFoodById } from '../../data/foodCards'
import type { FoodCategory, MealCondition } from '../../data/types'

type Checks = {
  sugar: boolean
  sodium: boolean
  categories: boolean
  requiredFoods?: boolean
  snackSlot?: boolean
  servingsOk?: boolean
  servingMode?: boolean
}

const CATEGORY_LABELS: Record<FoodCategory, string> = {
  grain: '곡류',
  dairy: '유제품',
  drink: '음료',
  snack: '간식',
  fruit: '과일',
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
      label: `구성: ${condition.requiredCategories.map((category) => CATEGORY_LABELS[category]).join(', ')} 포함`,
      ok: checks.categories,
    })
  }
  if (condition.requiredFoodIds?.length && checks.requiredFoods !== undefined) {
    const foodNames = condition.requiredFoodIds.map((id) => getFoodById(id)?.name ?? id)
    items.push({
      key: 'requiredFoods',
      label: `필수 식품: ${foodNames.join(', ')}`,
      ok: checks.requiredFoods,
    })
  }
  if (condition.snackSlotCategories && checks.snackSlot !== undefined) {
    items.push({
      key: 'snackSlot',
      label: '음료 1회 + 간식 1회',
      ok: checks.snackSlot,
    })
  }
  if (checks.servingMode !== undefined) {
    items.push({
      key: 'servingMode',
      label:
        condition.servingMode === 'one-serving'
          ? '제공량: 모두 1회'
          : '제공량: 각 식품의 포장 전체',
      ok: checks.servingMode,
    })
  }
  if (checks.servingsOk !== undefined) {
    items.push({
      key: 'servings',
      label: '제공량이 포장 안에 있어요',
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
          <span>
            {item.label}: {item.ok ? '확인했어요' : '아직이에요'}
          </span>
        </li>
      ))}
    </ul>
  )
}
