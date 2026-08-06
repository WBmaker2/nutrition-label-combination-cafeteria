import { useState } from 'react'
import { getFoodById } from '../../../data/foodCards'
import { FoodLabelCard } from '../FoodLabelCard'
import { MissionShell } from '../MissionShell'

const TITLE = '같은 단위끼리 비교'

export function Mission2CompareUnits({
  onBack,
  onComplete,
}: {
  onBack: () => void
  onComplete: (summary: string) => void
}) {
  const [badges, setBadges] = useState<Record<string, { serving: boolean; package: boolean }>>({})
  const [sugarPick, setSugarPick] = useState('')
  const [sodiumPick, setSodiumPick] = useState('')
  const [quiz, setQuiz] = useState<'yes' | 'no' | ''>('')

  const confirmBadge = (foodId: string, kind: 'serving' | 'package') => {
    setBadges((prev) => ({
      ...prev,
      [foodId]: { ...(prev[foodId] ?? { serving: false, package: false }), [kind]: true },
    }))
  }

  const compareFoods = ['fruit-cup', 'sandwich', 'juice'].map((fid) => getFoodById(fid)!)
  const sugarAnswer = 'juice'
  const sodiumAnswer = 'sandwich'
  const badgesOk = compareFoods.every((f) => badges[f.id]?.serving && badges[f.id]?.package)
  const canFinish =
    badgesOk && sugarPick === sugarAnswer && sodiumPick === sodiumAnswer && quiz === 'no'

  return (
    <MissionShell
      title={TITLE}
      message={
        badgesOk
          ? '확인했어요! 이제 당류·나트륨을 따로 비교해 보세요.'
          : '각 식품의 「눌러 확인」 버튼을 모두 눌러 주세요.'
      }
      finishHint={
        !badgesOk
          ? '식품마다 「눌러 확인」을 눌러 주세요'
          : !canFinish
            ? '비교 문제와 퀴즈를 모두 맞춰 주세요'
            : undefined
      }
      onBack={onBack}
      canFinish={canFinish}
      onFinish={() =>
        onComplete(
          '당류와 나트륨을 분리해 비교했습니다. 서로 다른 단위는 한 합계로 더하지 않습니다.',
        )
      }
    >
      {compareFoods.map((food) => (
        <FoodLabelCard
          key={food.id}
          food={food}
          confirmed={badges[food.id]}
          onConfirm={(k) => confirmBadge(food.id, k)}
        />
      ))}
      {!badgesOk && (
        <p className="hint">「눌러 확인」을 모두 누른 뒤에 비교·퀴즈를 풀 수 있어요.</p>
      )}
      <fieldset disabled={!badgesOk}>
        <legend>당류(g)가 가장 큰 식품은?</legend>
        {compareFoods.map((f) => (
          <label key={f.id}>
            <input
              type="radio"
              name="sugar"
              checked={sugarPick === f.id}
              onChange={() => setSugarPick(f.id)}
            />{' '}
            {f.name}
          </label>
        ))}
      </fieldset>
      <fieldset disabled={!badgesOk}>
        <legend>나트륨(mg)이 가장 큰 식품은?</legend>
        {compareFoods.map((f) => (
          <label key={f.id}>
            <input
              type="radio"
              name="sodium"
              checked={sodiumPick === f.id}
              onChange={() => setSodiumPick(f.id)}
            />{' '}
            {f.name}
          </label>
        ))}
      </fieldset>
      <fieldset disabled={!badgesOk}>
        <legend>당류 g와 나트륨 mg를 한 합계로 더할 수 있나요?</legend>
        <label>
          <input type="radio" name="quiz" checked={quiz === 'yes'} onChange={() => setQuiz('yes')} />{' '}
          예
        </label>
        <label>
          <input type="radio" name="quiz" checked={quiz === 'no'} onChange={() => setQuiz('no')} />{' '}
          아니오
        </label>
      </fieldset>
    </MissionShell>
  )
}
