import { describe, expect, it } from 'vitest'
import { foodCards, getFoodById } from './foodCards'
import { mission3Condition, mission5Condition } from './mealConditions'
import { sumSelections, wholePackageValue } from '../lib/nutritionCalculation'
import {
  assertServingsInRange,
  countMission3ValidCombos,
  countMission5ValidCombos,
  evaluateMealCondition,
  explanationNumbersMatch,
} from '../lib/mealValidation'
import { foodCardAriaLabel } from '../lib/accessibilityLabels'
import { getFeedbackMessage } from './feedbackRules'

describe('foodCards', () => {
  it('matches spec table', () => {
    expect(getFoodById('cereal')?.label).toEqual({
      servingAmount: 30,
      servingUnit: 'g',
      servingsPerPackage: 3,
      sugarGram: 8,
      sodiumMilligram: 90,
    })
    expect(foodCards.map((food) => food.category)).toEqual([
      'grain',
      'dairy',
      'snack',
      'drink',
      'snack',
      'fruit',
    ])
  })
})

describe('nutritionCalculation', () => {
  it('computes whole package values', () => {
    expect(wholePackageValue(8, 3)).toBe(24)
  })

  it('sums selections separately', () => {
    const totals = sumSelections(
      [
        { foodId: 'juice', servingsChosen: 1 },
        { foodId: 'cracker', servingsChosen: 1 },
      ],
      foodCards,
    )
    expect(totals).toEqual({ sugarGram: 20, sodiumMilligram: 135 })
  })
})

describe('mealValidation', () => {
  it('accepts mission 3 juice + cereal', () => {
    const result = evaluateMealCondition(
      [
        { foodId: 'juice', servingsChosen: 1 },
        { foodId: 'cereal', servingsChosen: 1 },
      ],
      foodCards,
      mission3Condition,
    )
    expect(result.passed).toBe(true)
  })

  it('rejects sandwich + juice for mission 3 sodium', () => {
    const result = evaluateMealCondition(
      [
        { foodId: 'sandwich', servingsChosen: 1 },
        { foodId: 'juice', servingsChosen: 1 },
      ],
      foodCards,
      mission3Condition,
    )
    expect(result.passed).toBe(false)
    expect(result.checks.sodium).toBe(false)
    expect(result.totals.sodiumMilligram).toBe(275)
  })

  it('requires drink for mission 5', () => {
    const result = evaluateMealCondition(
      [{ foodId: 'cracker', servingsChosen: 1 }],
      foodCards,
      mission5Condition,
    )
    expect(result.passed).toBe(false)
  })

  it('has at least two valid mission 3 combos', () => {
    expect(countMission3ValidCombos(foodCards, mission3Condition)).toBeGreaterThanOrEqual(2)
  })

  it('has at least two valid mission 5 combos', () => {
    expect(countMission5ValidCombos(foodCards, mission5Condition)).toBeGreaterThanOrEqual(2)
  })

  it('fails assertServingsInRange when zero or over package', () => {
    const cereal = getFoodById('cereal')!
    expect(assertServingsInRange(0, cereal)).toEqual({
      ok: false,
      feedbackKey: 'servingsBelowMinimum',
    })
    expect(assertServingsInRange(4, cereal)).toEqual({
      ok: false,
      feedbackKey: 'servingsExceeded',
    })
    expect(getFeedbackMessage('servingsExceeded')).toBe(
      '한 포장에 들어 있는 총 제공량보다 많이 선택할 수는 없어요.',
    )
    expect(assertServingsInRange(3, cereal)).toEqual({ ok: true })
  })

  it('matches explanation numbers exactly', () => {
    const actual = { sugarGram: 20, sodiumMilligram: 135 }
    expect(explanationNumbersMatch({ sugarGram: 20, sodiumMilligram: 135 }, actual)).toBe(true)
    expect(explanationNumbersMatch({ sugarGram: 19, sodiumMilligram: 135 }, actual)).toBe(false)
    expect(explanationNumbersMatch({ sugarGram: 20, sodiumMilligram: 130 }, actual)).toBe(false)
  })
})

describe('accessibilityLabels', () => {
  it('formats cereal aria label', () => {
    expect(foodCardAriaLabel(getFoodById('cereal')!)).toBe(
      '바삭 시리얼, 1회 제공량 30g, 총 제공량 3회, 당류 8g, 나트륨 90mg',
    )
  })
})
