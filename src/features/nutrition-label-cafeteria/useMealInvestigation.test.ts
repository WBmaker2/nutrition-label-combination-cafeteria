import { describe, expect, it } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { foodCards } from '../../data/foodCards'
import { explanationNumbersMatch } from '../../lib/mealValidation'
import { useMealInvestigation } from './useMealInvestigation'
import { explanationReady } from './ExplanationBuilder'

describe('useMealInvestigation', () => {
  it('tracks selections, badges, totals, and reset', () => {
    const { result } = renderHook(() => useMealInvestigation(foodCards))

    act(() => {
      result.current.setSelection('juice', 1)
      result.current.setSelection('cracker', 1)
    })
    expect(result.current.totals).toEqual({ sugarGram: 20, sodiumMilligram: 135 })
    expect(result.current.badgesReady).toBe(false)

    act(() => {
      result.current.confirmBadge('juice', 'serving')
      result.current.confirmBadge('juice', 'package')
      result.current.confirmBadge('cracker', 'serving')
      result.current.confirmBadge('cracker', 'package')
    })
    expect(result.current.badgesReady).toBe(true)

    act(() => {
      result.current.removeSelection('cracker')
    })
    expect(result.current.selections).toEqual([{ foodId: 'juice', servingsChosen: 1 }])

    act(() => {
      result.current.reset()
    })
    expect(result.current.selections).toEqual([])
    expect(result.current.confirmedBadges).toEqual({})
  })
})

describe('explanationNumbersMatch / explanationReady', () => {
  it('requires exact sugar and sodium match', () => {
    const actual = { sugarGram: 20, sodiumMilligram: 135 }
    expect(explanationNumbersMatch({ sugarGram: 20, sodiumMilligram: 135 }, actual)).toBe(true)
    expect(explanationNumbersMatch({ sugarGram: 18, sodiumMilligram: 135 }, actual)).toBe(false)
    expect(explanationReady({ sugarGram: null, sodiumMilligram: 135 }, actual)).toBe(false)
    expect(explanationReady({ sugarGram: 20, sodiumMilligram: 135 }, actual)).toBe(true)
  })
})
