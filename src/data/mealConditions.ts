import type { MealCondition } from './types'

export const mission3Condition: MealCondition = {
  id: 'mission-3',
  title: '학교 간식 조합',
  maxSugarGram: 28,
  maxSodiumMilligram: 200,
  requiredCategories: ['drink'],
  snackSlotCategories: ['snack', 'grain', 'fruit', 'dairy'],
  servingMode: 'one-serving',
  explanation: '음료 1회 + 간식 슬롯 1회, 당류 28g 이하, 나트륨 200mg 이하',
}

export const mission5Condition: MealCondition = {
  id: 'mission-5',
  title: '영양표시 조합 식당 최종 주문',
  maxSugarGram: 30,
  maxSodiumMilligram: 400,
  requiredCategories: ['drink'],
  servingMode: 'one-serving',
  explanation: '당류 30g 이하, 나트륨 400mg 이하, 음료 포함',
}
