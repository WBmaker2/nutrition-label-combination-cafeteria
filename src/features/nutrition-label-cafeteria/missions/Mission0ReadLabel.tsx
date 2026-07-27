import { useState } from 'react'
import { getFoodById } from '../../../data/foodCards'
import { FoodLabelCard, type LabelField } from '../FoodLabelCard'
import { MissionShell } from '../MissionShell'

const TITLE = '표시판 읽기 훈련'
const REQUIRED: LabelField[] = ['serving', 'package', 'sugar', 'sodium']

export function Mission0ReadLabel({
  onBack,
  onComplete,
}: {
  onBack: () => void
  onComplete: (summary: string) => void
}) {
  const [found, setFound] = useState<Record<LabelField, boolean>>({
    serving: false,
    package: false,
    sugar: false,
    sodium: false,
  })

  const food = getFoodById('cereal')!
  const confirmField = (kind: LabelField) => {
    setFound((prev) => ({ ...prev, [kind]: true }))
  }

  const canFinish = REQUIRED.every((k) => found[k])

  return (
    <MissionShell
      title={TITLE}
      message="카드에서 1회 제공량, 총 제공량, 당류, 나트륨을 찾아 눌러 보세요."
      onBack={onBack}
      canFinish={canFinish}
      onFinish={() =>
        onComplete(`미션 0 완료: ${food.name}의 1회·총 제공량과 당류·나트륨을 확인했습니다.`)
      }
    >
      <FoodLabelCard
        food={food}
        findMode
        confirmed={found}
        onFindField={confirmField}
      />
      <ul className="condition-checklist" aria-label="찾은 항목">
        <li className={found.serving ? 'check-pass' : 'check-fail'}>
          1회 제공량: {found.serving ? '찾음' : '아직'}
        </li>
        <li className={found.package ? 'check-pass' : 'check-fail'}>
          총 제공량: {found.package ? '찾음' : '아직'}
        </li>
        <li className={found.sugar ? 'check-pass' : 'check-fail'}>
          당류: {found.sugar ? '찾음' : '아직'}
        </li>
        <li className={found.sodium ? 'check-pass' : 'check-fail'}>
          나트륨: {found.sodium ? '찾음' : '아직'}
        </li>
      </ul>
    </MissionShell>
  )
}
