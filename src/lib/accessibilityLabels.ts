import type { FoodCard } from '../data/types'

type ConfirmedFields = {
  serving?: boolean
  package?: boolean
  sugar?: boolean
  sodium?: boolean
}

export function foodCardAriaLabel(
  food: FoodCard,
  options: { hideUnconfirmed?: boolean; confirmed?: ConfirmedFields } = {},
): string {
  const unit =
    food.label.servingUnit === 'piece'
      ? `${food.label.servingAmount}개`
      : `${food.label.servingAmount}${food.label.servingUnit}`
  const value = (label: string, text: string, confirmed = false) =>
    options.hideUnconfirmed && !confirmed ? `${label} 값 확인 전` : `${label} ${text}`

  return [
    food.name,
    value('1회 제공량', unit, options.confirmed?.serving),
    value('총 제공량', `${food.label.servingsPerPackage}회`, options.confirmed?.package),
    value('당류', `${food.label.sugarGram}g`, options.confirmed?.sugar),
    value('나트륨', `${food.label.sodiumMilligram}mg`, options.confirmed?.sodium),
  ].join(', ')
}
