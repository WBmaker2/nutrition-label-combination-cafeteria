import { useState } from 'react'
import { getFoodById } from '../../../data/foodCards'
import { CheerBanner } from '../CheerBanner'
import { FoodLabelCard, type LabelField } from '../FoodLabelCard'
import { MissionShell } from '../MissionShell'

const TITLE = '표시판 읽기 훈련'
const REQUIRED: LabelField[] = ['serving', 'package', 'sugar', 'sodium']
const LABELS: Record<LabelField, string> = {
  serving: '1회 제공량',
  package: '총 제공량',
  sugar: '당류',
  sodium: '나트륨',
}

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
  const [lastCheer, setLastCheer] = useState<string | null>(null)

  const food = getFoodById('cereal')!
  const confirmField = (kind: LabelField) => {
    setFound((prev) => {
      if (prev[kind]) return prev
      return { ...prev, [kind]: true }
    })
    setLastCheer(`${LABELS[kind]} — 잘 찾았어요!`)
  }

  const foundCount = REQUIRED.filter((k) => found[k]).length
  const canFinish = foundCount === REQUIRED.length

  return (
    <MissionShell
      title={TITLE}
      message="카드에서 「눌러 확인」「눌러 찾기」를 눌러 1회 제공량, 총 제공량, 당류, 나트륨을 찾아 보세요."
      finishHint={canFinish ? undefined : '아직 찾지 않은 항목을 눌러 주세요'}
      onBack={onBack}
      canFinish={canFinish}
      onFinish={() =>
        onComplete(`미션 0 완료: ${food.name}의 1회·총 제공량과 당류·나트륨을 확인했습니다.`)
      }
    >
      <FoodLabelCard food={food} findMode confirmed={found} onFindField={confirmField} />
      {lastCheer && !canFinish && <CheerBanner text={lastCheer} stickers="⭐" />}
      {canFinish && (
        <CheerBanner text="네 가지를 모두 찾았어요! 멋져요!" stickers="🌟⭐🌟" />
      )}
      <ul className="condition-checklist sticker-list" aria-label="찾은 항목">
        {REQUIRED.map((key) => (
          <li key={key} className={found[key] ? 'check-pass sticker-pop' : 'check-fail'}>
            <span className="sticker" aria-hidden="true">
              {found[key] ? '⭐' : '○'}
            </span>
            {LABELS[key]}: {found[key] ? '잘 찾았어요!' : '아직이에요'}
          </li>
        ))}
      </ul>
      <p className="muted progress-pips" aria-live="polite">
        별 스티커 {foundCount} / {REQUIRED.length}
      </p>
    </MissionShell>
  )
}
