import { describe, expect, it } from 'vitest'
import { foodCards } from '../data/foodCards'
import type { MealCondition } from '../data/types'
import { evaluateMealCondition } from './mealValidation'

const oneServingCondition: MealCondition = {
  id: 'one-serving-test',
  title: '한 회분 조건',
  servingMode: 'one-serving',
  maxSugarGram: 30,
  maxSodiumMilligram: 400,
  explanation: '각 식품을 1회씩 고르는 조건',
}

describe('meal condition contract', () => {
  it('rejects multiple servings for a one-serving condition', () => {
    const result = evaluateMealCondition(
      [
        { foodId: 'juice', servingsChosen: 1 },
        { foodId: 'cracker', servingsChosen: 2 },
      ],
      foodCards,
      oneServingCondition,
    )

    expect(result.checks.servingMode).toBe(false)
    expect(result.passed).toBe(false)
  })

  it('rejects a meal that misses a required food', () => {
    const result = evaluateMealCondition(
      [{ foodId: 'juice', servingsChosen: 1 }],
      foodCards,
      { ...oneServingCondition, requiredFoodIds: ['juice', 'cracker'] },
    )

    expect(result.checks.requiredFoods).toBe(false)
    expect(result.passed).toBe(false)
  })

  it('accepts whole-package servings when every selected food matches its package', () => {
    const result = evaluateMealCondition(
      [{ foodId: 'cracker', servingsChosen: 4 }],
      foodCards,
      {
        id: 'whole-package-test',
        title: '포장 전체 조건',
        servingMode: 'whole-package',
        requiredFoodIds: ['cracker'],
        maxSugarGram: 10,
        maxSodiumMilligram: 500,
        explanation: '각 식품을 포장 전체로 고르는 조건',
      },
    )

    expect(result.checks.servingMode).toBe(true)
    expect(result.passed).toBe(true)
  })
})
