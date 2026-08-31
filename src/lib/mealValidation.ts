import type { FoodCard, MealCondition, MealSelection } from '../data/types'
import { sumSelections } from './nutritionCalculation'

export function assertServingsInRange(servingsChosen: number, food: FoodCard) {
  if (servingsChosen < 1) {
    return { ok: false as const, feedbackKey: 'servingsBelowMinimum' as const }
  }
  if (servingsChosen > food.label.servingsPerPackage) {
    return { ok: false as const, feedbackKey: 'servingsExceeded' as const }
  }
  return { ok: true as const }
}

export function evaluateMealCondition(
  selections: MealSelection[],
  foods: FoodCard[],
  condition: MealCondition,
) {
  const totals = sumSelections(selections, foods)
  const selectedFoods = selections
    .map((s) => foods.find((f) => f.id === s.foodId))
    .filter((f): f is FoodCard => Boolean(f))

  const sugar =
    condition.maxSugarGram === undefined || totals.sugarGram <= condition.maxSugarGram
  const sodium =
    condition.maxSodiumMilligram === undefined ||
    totals.sodiumMilligram <= condition.maxSodiumMilligram

  const categories =
    !condition.requiredCategories ||
    condition.requiredCategories.every((cat) =>
      selectedFoods.some((food) => food.category === cat),
    )

  const requiredFoods =
    !condition.requiredFoodIds ||
    condition.requiredFoodIds.every((foodId) =>
      selections.some((selection) => selection.foodId === foodId),
    )

  let snackSlot = true
  if (condition.snackSlotCategories) {
    const drinks = selectedFoods.filter((f) => f.category === 'drink')
    const snacks = selectedFoods.filter((f) =>
      condition.snackSlotCategories!.includes(f.category),
    )
    snackSlot =
      drinks.length === 1 &&
      snacks.length === 1 &&
      selections.every((s) => s.servingsChosen === 1) &&
      selections.length === 2
  }

  const servingsOk = selections.every((s) => {
    const food = foods.find((f) => f.id === s.foodId)
    return Boolean(food && assertServingsInRange(s.servingsChosen, food).ok)
  })

  const servingMode =
    selections.length > 0 &&
    selections.every((selection) => {
      const food = foods.find((item) => item.id === selection.foodId)
      if (!food) return false
      return condition.servingMode === 'one-serving'
        ? selection.servingsChosen === 1
        : selection.servingsChosen === food.label.servingsPerPackage
    })

  const passed =
    sugar &&
    sodium &&
    categories &&
    requiredFoods &&
    snackSlot &&
    servingsOk &&
    servingMode &&
    selections.length > 0

  return {
    passed,
    totals,
    checks: { sugar, sodium, categories, requiredFoods, snackSlot, servingsOk, servingMode },
  }
}

export function explanationNumbersMatch(
  assembled: { sugarGram: number; sodiumMilligram: number },
  actual: { sugarGram: number; sodiumMilligram: number },
): boolean {
  return (
    assembled.sugarGram === actual.sugarGram &&
    assembled.sodiumMilligram === actual.sodiumMilligram
  )
}

export function countMission3ValidCombos(
  foods: FoodCard[],
  condition: MealCondition,
): number {
  const drinks = foods.filter((f) => f.category === 'drink')
  const snacks = foods.filter((f) =>
    (condition.snackSlotCategories ?? []).includes(f.category),
  )
  let count = 0
  for (const drink of drinks) {
    for (const snack of snacks) {
      const result = evaluateMealCondition(
        [
          { foodId: drink.id, servingsChosen: 1 },
          { foodId: snack.id, servingsChosen: 1 },
        ],
        foods,
        condition,
      )
      if (result.passed) count += 1
    }
  }
  return count
}

export function countMission5ValidCombos(
  foods: FoodCard[],
  condition: MealCondition,
): number {
  const drinks = foods.filter((f) => f.category === 'drink')
  const others = foods.filter((f) => f.category !== 'drink')
  let count = 0
  for (const drink of drinks) {
    for (const other of others) {
      const result = evaluateMealCondition(
        [
          { foodId: drink.id, servingsChosen: 1 },
          { foodId: other.id, servingsChosen: 1 },
        ],
        foods,
        condition,
      )
      if (result.passed) count += 1
    }
  }
  return count
}
