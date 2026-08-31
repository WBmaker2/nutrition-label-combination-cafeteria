import { useState } from 'react'
import { getFeedbackMessage } from '../../../data/feedbackRules'
import { getFoodById } from '../../../data/foodCards'
import { CheerBanner } from '../CheerBanner'
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

  const confirmBoth = (foodId: string) => {
    setBadges((prev) => ({
      ...prev,
      [foodId]: { serving: true, package: true },
    }))
  }

  const confirmAll = () => {
    const next: Record<string, { serving: boolean; package: boolean }> = {}
    for (const f of compareFoods) next[f.id] = { serving: true, package: true }
    setBadges(next)
  }

  const compareFoods = ['fruit-cup', 'sandwich', 'juice'].map((fid) => getFoodById(fid)!)
  const sugarAnswer = 'juice'
  const sodiumAnswer = 'sandwich'
  const badgesOk = compareFoods.every((f) => badges[f.id]?.serving && badges[f.id]?.package)
  const sugarOk = sugarPick === sugarAnswer
  const sodiumOk = sodiumPick === sodiumAnswer
  const quizOk = quiz === 'no'
  const canFinish = badgesOk && sugarOk && sodiumOk && quizOk

  return (
    <MissionShell
      title={TITLE}
      message={
        badgesOk
          ? '확인했어요! 이제 당류·나트륨을 따로 비교해 보세요.'
          : '식품마다 「이 식품 확인」을 누르거나, 아래에서 한 번에 확인해 보세요.'
      }
      finishHint={
        !badgesOk
          ? '표시 기준을 확인해 주세요'
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
      {!badgesOk && (
        <div className="actions">
            <button type="button" className="btn-primary key-action" onClick={confirmAll}>
            세 식품 표시 기준 한 번에 확인
          </button>
        </div>
      )}
      {compareFoods.map((food) => {
        const ok = badges[food.id]?.serving && badges[food.id]?.package
        return (
          <div key={food.id} className="compare-food-block">
            <FoodLabelCard
              food={food}
              confirmed={badges[food.id]}
              onConfirm={(k) =>
                setBadges((prev) => ({
                  ...prev,
                  [food.id]: {
                    ...(prev[food.id] ?? { serving: false, package: false }),
                    [k]: true,
                  },
                }))
              }
            />
            {!ok && (
              <button type="button" className="btn-secondary" onClick={() => confirmBoth(food.id)}>
                이 식품 확인 (1회·총 제공량)
              </button>
            )}
            {ok && <p className="feedback feedback-correct">⭐ {food.name} 표시 확인 완료</p>}
          </div>
        )
      })}
      {!badgesOk && (
        <p className="hint">표시를 확인한 뒤에 비교·퀴즈를 풀 수 있어요.</p>
      )}
      <fieldset disabled={!badgesOk} className="quiz-fieldset">
        <legend>당류(g)가 가장 큰 식품은?</legend>
        {compareFoods.map((f) => (
          <label key={f.id} className="radio-touch">
            <input
              type="radio"
              name="sugar"
              checked={sugarPick === f.id}
              onChange={() => setSugarPick(f.id)}
            />
            <span>
              {f.name} ({f.label.sugarGram}g)
            </span>
          </label>
        ))}
        {sugarPick && !sugarOk && (
          <p className="feedback" role="status">
            다시 보면: 당류(g) 숫자가 가장 큰 식품을 골라 보세요.
          </p>
        )}
        {sugarOk && <p className="feedback feedback-correct">⭐ 당류 비교 맞아요!</p>}
      </fieldset>
      <fieldset disabled={!badgesOk} className="quiz-fieldset">
        <legend>나트륨(mg)이 가장 큰 식품은?</legend>
        {compareFoods.map((f) => (
          <label key={f.id} className="radio-touch">
            <input
              type="radio"
              name="sodium"
              checked={sodiumPick === f.id}
              onChange={() => setSodiumPick(f.id)}
            />
            <span>
              {f.name} ({f.label.sodiumMilligram}mg)
            </span>
          </label>
        ))}
        {sodiumPick && !sodiumOk && (
          <p className="feedback" role="status">
            다시 보면: 나트륨(mg) 숫자가 가장 큰 식품을 골라 보세요. (당류와 섞지 마세요)
          </p>
        )}
        {sodiumOk && <p className="feedback feedback-correct">⭐ 나트륨 비교 맞아요!</p>}
      </fieldset>
      <fieldset disabled={!badgesOk} className="quiz-fieldset">
        <legend>당류 g와 나트륨 mg를 한 합계로 더할 수 있나요?</legend>
        <label className="radio-touch">
          <input type="radio" name="quiz" checked={quiz === 'yes'} onChange={() => setQuiz('yes')} />
          <span>예</span>
        </label>
        <label className="radio-touch">
          <input type="radio" name="quiz" checked={quiz === 'no'} onChange={() => setQuiz('no')} />
          <span>아니오</span>
        </label>
        {quiz === 'yes' && (
          <p className="feedback" role="status">
            {getFeedbackMessage('mixedUnits')}
          </p>
        )}
        {quizOk && <CheerBanner text="단위를 섞지 않았어요. 잘했어요!" stickers="⭐" />}
      </fieldset>
    </MissionShell>
  )
}
