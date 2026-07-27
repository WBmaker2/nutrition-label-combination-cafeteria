import { useState } from 'react'
import { getFoodById } from '../../../data/foodCards'
import { wholePackageValue } from '../../../lib/nutritionCalculation'
import { FoodLabelCard } from '../FoodLabelCard'
import { MissionShell } from '../MissionShell'

const TITLE = '한 포장 전체 계산'

export function Mission1WholePackage({
  onBack,
  onComplete,
}: {
  onBack: () => void
  onComplete: (summary: string) => void
}) {
  const [badges, setBadges] = useState<Record<string, { serving: boolean; package: boolean }>>({})
  const [message] = useState('')

  const confirmBadge = (foodId: string, kind: 'serving' | 'package') => {
    setBadges((prev) => ({
      ...prev,
      [foodId]: { ...(prev[foodId] ?? { serving: false, package: false }), [kind]: true },
    }))
  }

  const ids = ['cereal', 'cracker']
  const answers = ids.map((foodId) => {
    const food = getFoodById(foodId)!
    return {
      food,
      sugar: wholePackageValue(food.label.sugarGram, food.label.servingsPerPackage),
      sodium: wholePackageValue(food.label.sodiumMilligram, food.label.servingsPerPackage),
    }
  })
  const canFinish = ids.every((foodId) => badges[foodId]?.serving && badges[foodId]?.package)

  return (
    <MissionShell
      title={TITLE}
      message={message}
      onBack={onBack}
      canFinish={canFinish}
      onFinish={() =>
        onComplete(
          answers
            .map((a) => `${a.food.name} 포장 전체: 당류 ${a.sugar}g, 나트륨 ${a.sodium}mg`)
            .join('\n'),
        )
      }
    >
      <div className="grid-2">
        {answers.map(({ food, sugar, sodium }) => (
          <div key={food.id}>
            <FoodLabelCard
              food={food}
              confirmed={badges[food.id]}
              onConfirm={(k) => confirmBadge(food.id, k)}
            />
            <p>
              포장 전체: 당류 {sugar}g · 나트륨 {sodium}mg
            </p>
          </div>
        ))}
      </div>
    </MissionShell>
  )
}
