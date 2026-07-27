import { useState } from 'react'
import { getFoodById } from '../../../data/foodCards'
import { wholePackageValue } from '../../../lib/nutritionCalculation'
import { FoodLabelCard } from '../FoodLabelCard'
import { MissionShell } from '../MissionShell'

const TITLE = '한 포장 전체 계산'

type Answers = Record<string, { sugar: number | null; sodium: number | null }>

export function Mission1WholePackage({
  onBack,
  onComplete,
}: {
  onBack: () => void
  onComplete: (summary: string) => void
}) {
  const [badges, setBadges] = useState<Record<string, { serving: boolean; package: boolean }>>({})
  const [answers, setAnswers] = useState<Answers>({})
  const [message, setMessage] = useState('')

  const confirmBadge = (foodId: string, kind: 'serving' | 'package') => {
    setBadges((prev) => ({
      ...prev,
      [foodId]: { ...(prev[foodId] ?? { serving: false, package: false }), [kind]: true },
    }))
  }

  const ids = ['cereal', 'cracker']
  const expected = ids.map((foodId) => {
    const food = getFoodById(foodId)!
    return {
      food,
      sugar: wholePackageValue(food.label.sugarGram, food.label.servingsPerPackage),
      sodium: wholePackageValue(food.label.sodiumMilligram, food.label.servingsPerPackage),
    }
  })

  const badgesOk = ids.every((foodId) => badges[foodId]?.serving && badges[foodId]?.package)
  const numbersOk = expected.every(
    ({ food, sugar, sodium }) =>
      answers[food.id]?.sugar === sugar && answers[food.id]?.sodium === sodium,
  )
  const canFinish = badgesOk && numbersOk

  const sugarChipsFor = (foodId: string) => {
    const food = getFoodById(foodId)!
    const whole = wholePackageValue(food.label.sugarGram, food.label.servingsPerPackage)
    return Array.from(new Set([food.label.sugarGram, whole, whole + food.label.sugarGram])).sort(
      (a, b) => a - b,
    )
  }
  const sodiumChipsFor = (foodId: string) => {
    const food = getFoodById(foodId)!
    const whole = wholePackageValue(food.label.sodiumMilligram, food.label.servingsPerPackage)
    return Array.from(
      new Set([food.label.sodiumMilligram, whole, whole + food.label.sodiumMilligram]),
    ).sort((a, b) => a - b)
  }

  return (
    <MissionShell
      title={TITLE}
      message={message || '배지를 확인한 뒤, 포장 전체 당류·나트륨을 칩으로 골라 확인하세요.'}
      onBack={onBack}
      canFinish={canFinish}
      onFinish={() =>
        onComplete(
          expected
            .map((a) => `${a.food.name} 포장 전체: 당류 ${a.sugar}g, 나트륨 ${a.sodium}mg`)
            .join('\n'),
        )
      }
    >
      <div className="grid-2">
        {expected.map(({ food, sugar, sodium }) => {
          const ready = badges[food.id]?.serving && badges[food.id]?.package
          const picked = answers[food.id] ?? { sugar: null, sodium: null }
          const correct = picked.sugar === sugar && picked.sodium === sodium
          return (
            <div key={food.id}>
              <FoodLabelCard
                food={food}
                confirmed={badges[food.id]}
                onConfirm={(k) => confirmBadge(food.id, k)}
              />
              <p className="muted">
                1회만: 당류 {food.label.sugarGram}g · 나트륨 {food.label.sodiumMilligram}mg
              </p>
              {!ready && <p className="hint">먼저 1회·총 제공량 배지를 확인해 주세요.</p>}
              {ready && (
                <fieldset>
                  <legend>{food.name} 포장 전체 확인</legend>
                  <div className="chip-row">
                    <p>포장 전체 당류 (g)</p>
                    <div className="chips" role="group" aria-label={`${food.name} 당류`}>
                      {sugarChipsFor(food.id).map((n) => (
                        <button
                          key={`s-${n}`}
                          type="button"
                          className={picked.sugar === n ? 'chip selected' : 'chip'}
                          onClick={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              [food.id]: { ...picked, sugar: n },
                            }))
                          }
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="chip-row">
                    <p>포장 전체 나트륨 (mg)</p>
                    <div className="chips" role="group" aria-label={`${food.name} 나트륨`}>
                      {sodiumChipsFor(food.id).map((n) => (
                        <button
                          key={`n-${n}`}
                          type="button"
                          className={picked.sodium === n ? 'chip selected' : 'chip'}
                          onClick={() =>
                            setAnswers((prev) => ({
                              ...prev,
                              [food.id]: { ...picked, sodium: n },
                            }))
                          }
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </div>
                  {picked.sugar !== null && picked.sodium !== null && !correct && (
                    <p className="feedback">
                      1회 기준임을 알리고 총 제공량으로 곱했는지 확인해 보세요.
                    </p>
                  )}
                  {correct && (
                    <p className="feedback">
                      포장 전체: 당류 {sugar}g · 나트륨 {sodium}mg — 맞아요!
                    </p>
                  )}
                </fieldset>
              )}
            </div>
          )
        })}
      </div>
      {badgesOk && !numbersOk && (
        <button
          type="button"
          className="btn-secondary"
          onClick={() => setMessage('두 식품의 포장 전체 숫자를 모두 맞춰 주세요.')}
        >
          확인 힌트
        </button>
      )}
    </MissionShell>
  )
}
