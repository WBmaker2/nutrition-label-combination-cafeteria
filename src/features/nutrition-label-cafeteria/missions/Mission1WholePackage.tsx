import { useState } from 'react'
import { getFoodById } from '../../../data/foodCards'
import { wholePackageValue } from '../../../lib/nutritionCalculation'
import { CheerBanner } from '../CheerBanner'
import { FoodLabelCard } from '../FoodLabelCard'
import { MissionShell } from '../MissionShell'

const TITLE = '한 포장 전체 계산'
const IDS = ['cereal', 'cracker'] as const

type Answers = Record<string, { sugar: number | null; sodium: number | null }>

function getWrongAnswerHint(
  food: ReturnType<typeof getFoodById>,
  expected: { sugar: number; sodium: number },
  picked: { sugar: number | null; sodium: number | null },
  times: number,
) {
  if (!food || picked.sugar === null || picked.sodium === null) {
    return '1회 제공량 × 총 제공량으로 두 숫자를 각각 계산해 보세요.'
  }

  const sugarPer = picked.sugar === food.label.sugarGram
  const sodiumPer = picked.sodium === food.label.sodiumMilligram
  const sugarWhole = picked.sugar === expected.sugar
  const sodiumWhole = picked.sodium === expected.sodium

  if (sugarPer && sodiumPer) {
    return `1회 숫자를 골랐어요. 1회 숫자에 총 제공량 ${times}회를 곱해 보세요.`
  }
  if (sugarWhole && !sodiumWhole) {
    return `당류는 맞아요. 나트륨은 1회 숫자 × ${times}회로 계산해 보세요.`
  }
  if (!sugarWhole && sodiumWhole) {
    return `나트륨은 맞아요. 당류는 1회 숫자 × ${times}회로 계산해 보세요.`
  }
  if (sugarPer && !sodiumPer) {
    return `당류는 1회 값이에요. 당류는 × ${times}회, 나트륨도 같은 방법으로 계산해 보세요.`
  }
  if (sodiumPer && !sugarPer) {
    return `나트륨은 1회 값이에요. 나트륨은 × ${times}회, 당류도 같은 방법으로 계산해 보세요.`
  }
  return '1회 제공량 × 총 제공량으로 당류와 나트륨을 각각 계산해 보세요.'
}

export function Mission1WholePackage({
  onBack,
  onComplete,
}: {
  onBack: () => void
  onComplete: (summary: string) => void
}) {
  const [step, setStep] = useState(0)
  const [badges, setBadges] = useState<Record<string, { serving: boolean; package: boolean }>>({})
  const [answers, setAnswers] = useState<Answers>({})
  const [message, setMessage] = useState('')

  const confirmBadge = (foodId: string, kind: 'serving' | 'package') => {
    setBadges((prev) => ({
      ...prev,
      [foodId]: { ...(prev[foodId] ?? { serving: false, package: false }), [kind]: true },
    }))
  }

  const expected = IDS.map((foodId) => {
    const food = getFoodById(foodId)!
    return {
      food,
      sugar: wholePackageValue(food.label.sugarGram, food.label.servingsPerPackage),
      sodium: wholePackageValue(food.label.sodiumMilligram, food.label.servingsPerPackage),
    }
  })

  const current = expected[step]!
  const food = current.food
  const ready = Boolean(badges[food.id]?.serving && badges[food.id]?.package)
  const picked = answers[food.id] ?? { sugar: null, sodium: null }
  const correct = picked.sugar === current.sugar && picked.sodium === current.sodium
  const times = food.label.servingsPerPackage

  const foodDone = (foodId: string) => {
    const item = expected.find((e) => e.food.id === foodId)!
    const a = answers[foodId]
    const b = badges[foodId]
    return Boolean(
      b?.serving && b?.package && a?.sugar === item.sugar && a?.sodium === item.sodium,
    )
  }

  const allDone = IDS.every((id) => foodDone(id))
  const canFinish = allDone
  const canAdvance = foodDone(food.id) && step < IDS.length - 1

  const sugarChips = (() => {
    const whole = current.sugar
    return Array.from(
      new Set([food.label.sugarGram, whole, whole + food.label.sugarGram]),
    ).sort((a, b) => a - b)
  })()

  const sodiumChips = (() => {
    const whole = current.sodium
    return Array.from(
      new Set([food.label.sodiumMilligram, whole, whole + food.label.sodiumMilligram]),
    ).sort((a, b) => a - b)
  })()

  const finishHint = !canFinish
    ? !foodDone(food.id)
      ? `${food.name}의 「눌러 확인」과 포장 전체 숫자를 맞춰 주세요`
      : step < IDS.length - 1
        ? `다음 식품 「${getFoodById(IDS[step + 1]!)!.name}」도 풀어 주세요`
        : '두 식품을 모두 맞춰 주세요'
    : undefined

  return (
    <MissionShell
      title={TITLE}
      message={
        message ||
        `식품 ${step + 1}/${IDS.length}: ${food.name} — 「눌러 확인」 후 포장 전체 숫자를 골라 보세요.`
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
      <div className="step-pills" aria-label="식품 진행">
        {IDS.map((id, i) => (
          <span
            key={id}
            className={`step-pill${i === step ? ' active' : ''}${foodDone(id) ? ' done' : ''}`}
          >
            {foodDone(id) ? '⭐' : `${i + 1}`} {getFoodById(id)!.name}
          </span>
        ))}
      </div>

      <div className="one-food-stage" key={food.id}>
        <FoodLabelCard
          food={food}
          confirmed={badges[food.id]}
          onConfirm={(k) => confirmBadge(food.id, k)}
        />
        <p className="muted">
          1회만: 당류 {food.label.sugarGram}g · 나트륨 {food.label.sodiumMilligram}mg
        </p>
        {!ready && <p className="hint">먼저 「눌러 확인」 버튼을 눌러 주세요.</p>}
        {ready && (
          <fieldset className="anim-fade-in">
            <legend>{food.name} 포장 전체 확인</legend>
            <p className="calc-hint">
              계산 힌트: 1회 숫자 × {times}회 = 포장 전체
              <br />
              당류 {food.label.sugarGram} × {times} = ? · 나트륨 {food.label.sodiumMilligram} ×{' '}
              {times} = ?
            </p>
            <div className="chip-row">
              <p>포장 전체 당류 (g) — 숫자 고르기</p>
              <div className="chips" role="group" aria-label={`${food.name} 당류`}>
                {sugarChips.map((n) => (
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
                {sodiumChips.map((n) => (
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
              <p className="feedback" role="status">
                {getWrongAnswerHint(food, current, picked, times)}
              </p>
            )}
            {correct && (
              <CheerBanner
                text={`포장 전체 맞아요! 당류 ${current.sugar}g · 나트륨 ${current.sodium}mg`}
                stickers="🎉⭐"
              />
            )}
          </fieldset>
        )}
      </div>

      <div className="actions">
        {step > 0 && (
          <button type="button" className="btn-secondary" onClick={() => setStep((s) => s - 1)}>
            이전 식품
          </button>
        )}
        {canAdvance && (
          <button
            type="button"
            className="btn-primary anim-pop"
            onClick={() => {
              setMessage('')
              setStep((s) => s + 1)
            }}
          >
            다음 식품: {getFoodById(IDS[step + 1]!)!.name} →
          </button>
        )}
        {ready && !correct && (
          <button
            type="button"
            className="btn-secondary"
            onClick={() => setMessage('1회 숫자 × 총 제공량을 계산한 값을 골라 보세요.')}
          >
            확인 힌트
          </button>
        )}
      </div>
    </MissionShell>
  )
}
