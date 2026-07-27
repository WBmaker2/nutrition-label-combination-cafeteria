import type { FoodCard, MealSelection } from '../data/types'

export function wholePackageValue(perServing: number, servingsPerPackage: number): number {
  return perServing * servingsPerPackage
}

export function selectedNutrition(
  selection: MealSelection,
  food: FoodCard,
): { sugarGram: number; sodiumMilligram: number } {
  return {
    sugarGram: food.label.sugarGram * selection.servingsChosen,
    sodiumMilligram: food.label.sodiumMilligram * selection.servingsChosen,
  }
}

export function sumSelections(
  selections: MealSelection[],
  foods: FoodCard[],
): { sugarGram: number; sodiumMilligram: number } {
  return selections.reduce(
    (acc, selection) => {
      const food = foods.find((item) => item.id === selection.foodId)
      if (!food) return acc
      const part = selectedNutrition(selection, food)
      return {
        sugarGram: acc.sugarGram + part.sugarGram,
        sodiumMilligram: acc.sodiumMilligram + part.sodiumMilligram,
      }
    },
    { sugarGram: 0, sodiumMilligram: 0 },
  )
}
