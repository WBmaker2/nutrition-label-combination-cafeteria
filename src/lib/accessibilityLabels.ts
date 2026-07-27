import type { FoodCard } from '../data/types'

export function foodCardAriaLabel(food: FoodCard): string {
  const unit =
    food.label.servingUnit === 'piece'
      ? `${food.label.servingAmount}개`
      : `${food.label.servingAmount}${food.label.servingUnit}`
  return `${food.name}, 1회 제공량 ${unit}, 총 ${food.label.servingsPerPackage}회, 당류 ${food.label.sugarGram}g, 나트륨 ${food.label.sodiumMilligram}mg`
}
