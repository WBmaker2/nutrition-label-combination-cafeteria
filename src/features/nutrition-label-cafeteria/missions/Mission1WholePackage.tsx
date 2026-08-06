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

  const finishHint = !badgesOk
    ? '각 식품의 「눌러 확인」 버튼을 모두 눌러 주세요'
    : '두 식품의 포장 전체 숫자를 모두 맞춰 주세요'

  return (
    <MissionShell
      title={TITLE}
      message={
        message ||
        '「눌러 확인」으로 1회·총 제공량을 확인한 뒤, 포장 전체 숫자를 골라 보세요.'
      }
      finishHint={finishHint}
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
          const times = food.label.servingsPerPackage
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
              {!ready && (
                <p className="hint">먼저 「눌러 확인」 버튼을 눌러 주세요.</p>
              )}
              {ready && (
                <fieldset>
                  <legend>{food.name} 포장 전체 확인</legend>
                  <p className="calc-hint">
                    계산 힌트: 1회 숫자 × {times}회 = 포장 전체
                    <br />
                    당류 {food.label.sugarGram} × {times} = ? · 나트륨{' '}
                    {food.label.sodiumMilligram} × {times} = ?
                  </p>
                  <div className="chip-row">
                    <p>포장 전체 당류 (g) — 숫자 고르기</p>
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
                          {n}g
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="chip-row">
                    <p>포장 전체 나트륨 (mg) — 숫자 고르기</p>
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
                          {n}mg
                        </button>
                      ))}
                    </div>
                  </div>
                  {picked.sugar !== null && picked.sodium !== null && !correct && (
                    <p className="feedback">
                      힌트: 1회 숫자만 고르지 말고, × {times} 한 값을 골라 보세요.
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
