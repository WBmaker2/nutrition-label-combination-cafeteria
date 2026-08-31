import { useState } from 'react'
import { foodCards, getFoodById } from '../../../data/foodCards'
import type { MealSelection } from '../../../data/types'
import { sumSelections } from '../../../lib/nutritionCalculation'
import { CheerBanner } from '../CheerBanner'
import { FoodLabelCard, Stepper } from '../FoodLabelCard'
import { MissionShell } from '../MissionShell'

const TITLE = '포장 전체와 실제 선택량'
const FOOD_IDS = ['cracker', 'yogurt', 'juice'] as const

const SHARE: MealSelection[] = [
  { foodId: 'cracker', servingsChosen: 1 },
  { foodId: 'yogurt', servingsChosen: 1 },
  { foodId: 'juice', servingsChosen: 1 },
]
const ALONE: MealSelection[] = [
  { foodId: 'cracker', servingsChosen: 4 },
  { foodId: 'yogurt', servingsChosen: 1 },
  { foodId: 'juice', servingsChosen: 2 },
]

function matchesExpected(chosen: Record<string, number>, expected: MealSelection[]) {
  return expected.every((e) => chosen[e.foodId] === e.servingsChosen)
}

export function Mission4PackageVsChoice({
  onBack,
  onComplete,
}: {
  onBack: () => void
  onComplete: (summary: string) => void
}) {
  const [badges, setBadges] = useState<Record<string, { serving: boolean; package: boolean }>>({})
  const [scenario, setScenario] = useState<'share' | 'alone'>('share')
  const [shareServings, setShareServings] = useState<Record<string, number>>({
    cracker: 1,
    yogurt: 1,
    juice: 1,
  })
  const [aloneServings, setAloneServings] = useState<Record<string, number>>({
    cracker: 1,
    yogurt: 1,
    juice: 1,
  })
  const [shareConfirmed, setShareConfirmed] = useState(false)
  const [aloneConfirmed, setAloneConfirmed] = useState(false)
  const [servingFeedback, setServingFeedback] = useState('')

  const confirmBadge = (foodId: string, kind: 'serving' | 'package') => {
    setBadges((prev) => ({
      ...prev,
      [foodId]: { ...(prev[foodId] ?? { serving: false, package: false }), [kind]: true },
    }))
  }

  const expected = scenario === 'share' ? SHARE : ALONE
  const current = scenario === 'share' ? shareServings : aloneServings
  const setCurrent = scenario === 'share' ? setShareServings : setAloneServings
  const scenarioOk = matchesExpected(current, expected)
  const badgesOk = FOOD_IDS.every((id) => badges[id]?.serving && badges[id]?.package)

  const shareTotals = sumSelections(SHARE, foodCards)
  const aloneTotals = sumSelections(ALONE, foodCards)

  const canFinish = shareConfirmed && aloneConfirmed && badgesOk

  const confirmScenario = () => {
    if (!badgesOk || !scenarioOk) return
    if (scenario === 'share') setShareConfirmed(true)
    else setAloneConfirmed(true)
  }

  return (
    <MissionShell
      title={TITLE}
      message="나누어 먹기·혼자 먹기에서 목표 제공량에 맞춘 뒤, 각각 「이 시나리오 확인」을 눌러 주세요."
      finishHint={
        canFinish
          ? undefined
          : !badgesOk
            ? '각 식품의 「눌러 확인」을 눌러 주세요'
            : '두 시나리오를 모두 확인해 주세요'
      }
      onBack={onBack}
      canFinish={canFinish}
      onFinish={() =>
        onComplete(
          `나누어 먹기: 당류 ${shareTotals.sugarGram}g, 나트륨 ${shareTotals.sodiumMilligram}mg\n혼자 먹기: 당류 ${aloneTotals.sugarGram}g, 나트륨 ${aloneTotals.sodiumMilligram}mg\n같은 식품도 몇 회 먹는지에 따라 계산 결과가 달라집니다.`,
        )
      }
    >
      <div className="actions">
        <button
          type="button"
          className={scenario === 'share' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setScenario('share')}
        >
          나누어 먹기 (각 1회){shareConfirmed ? ' ✓' : ''}
        </button>
        <button
          type="button"
          className={scenario === 'alone' ? 'btn-primary' : 'btn-secondary'}
          onClick={() => setScenario('alone')}
        >
          혼자 먹기 (포장 전체){aloneConfirmed ? ' ✓' : ''}
        </button>
      </div>
      <p className="hint">
        {scenario === 'share'
          ? '세 식품을 친구와 나누어 각 1회씩 맞춰 보세요.'
          : '크래커·주스는 포장 전체, 요거트는 1회로 맞춰 보세요.'}
      </p>
      <div className="target-board" aria-label="목표 제공량">
        <p className="target-board-title">이번 목표 제공량</p>
        <ul>
          {expected.map((e) => {
            const food = getFoodById(e.foodId)!
            const whole = e.servingsChosen === food.label.servingsPerPackage
            return (
              <li key={e.foodId}>
                <strong>{food.name}</strong>: {e.servingsChosen}회
                {whole ? ' (포장 전체)' : ''}
              </li>
            )
          })}
        </ul>
      </div>
      {FOOD_IDS.map((foodId) => {
        const food = getFoodById(foodId)!
        const servings = current[foodId] ?? 1
        const target = expected.find((e) => e.foodId === foodId)!.servingsChosen
        const locked = !(badges[foodId]?.serving && badges[foodId]?.package)
        const match = servings === target
        return (
          <div key={foodId}>
            <FoodLabelCard
              food={food}
              confirmed={badges[foodId]}
              onConfirm={(k) => confirmBadge(foodId, k)}
            />
            {locked && <p className="hint">「눌러 확인」 후 제공량을 조절할 수 있어요.</p>}
            <p className={`target-serving${match && !locked ? ' match' : ''}`}>
              목표: {target}회
              {target === food.label.servingsPerPackage ? ' (포장 전체)' : ''} · 지금: {servings}회
              {!locked && !match && (
                <span className="target-dir">
                  {servings < target ? ' → 더 늘려 보세요' : ' → 줄여 보세요'}
                </span>
              )}
            </p>
            <Stepper
              value={servings}
              max={food.label.servingsPerPackage}
              food={food}
              disabled={locked}
              onBoundaryFeedback={setServingFeedback}
              onChange={(n) => {
                setCurrent((prev) => ({ ...prev, [foodId]: n }))
                if (scenario === 'share') setShareConfirmed(false)
                else setAloneConfirmed(false)
              }}
            />
          </div>
        )
      })}
      {servingFeedback && (
        <p className="feedback" role="status">
          {servingFeedback}
        </p>
      )}
      <p>
        현재 합계: 당류{' '}
        {sumSelections(
          FOOD_IDS.map((id) => ({ foodId: id, servingsChosen: current[id] })),
          foodCards,
        ).sugarGram}
        g · 나트륨{' '}
        {sumSelections(
          FOOD_IDS.map((id) => ({ foodId: id, servingsChosen: current[id] })),
          foodCards,
        ).sodiumMilligram}
        mg
      </p>
      {!scenarioOk && badgesOk && (
        <p className="feedback">목표 제공량 표를 보고 −/+ 를 맞춰 보세요.</p>
      )}
      {scenarioOk && badgesOk && (
        <CheerBanner text="제공량이 시나리오와 맞아요. 확인해 주세요!" stickers="⭐" />
      )}
      <button
        type="button"
        className="btn-primary key-action"
        disabled={!badgesOk || !scenarioOk}
        onClick={confirmScenario}
      >
        이 시나리오 확인
      </button>
    </MissionShell>
  )
}
