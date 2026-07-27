import { useState } from 'react'
import { getFoodById } from '../../../data/foodCards'
import { FoodLabelCard } from '../FoodLabelCard'
import { MissionShell } from '../MissionShell'

const TITLE = '표시판 읽기 훈련'

export function Mission0ReadLabel({
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

  const food = getFoodById('cereal')!
  const picked = new Set(
    Object.entries(badges['cereal'] ?? {})
      .filter(([, v]) => v)
      .map(([k]) => k),
  )
  const badgesOk = Boolean(badges['cereal']?.serving && badges['cereal']?.package)
  const canFinish = badgesOk && picked.size >= 2

  return (
    <MissionShell
      title={TITLE}
      message={message}
      onBack={onBack}
      canFinish={canFinish}
      onFinish={() =>
        onComplete(`미션 0 완료: ${food.name}의 1회·총 제공량과 당류·나트륨을 확인했습니다.`)
      }
    >
      <FoodLabelCard
        food={food}
        confirmed={badges['cereal']}
        onConfirm={(k) => confirmBadge('cereal', k)}
      />
    </MissionShell>
  )
}
