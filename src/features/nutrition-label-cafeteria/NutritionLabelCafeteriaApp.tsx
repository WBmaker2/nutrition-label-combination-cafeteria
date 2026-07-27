import { useState } from 'react'
import { FIXED_TIP } from '../../data/updateLog'
import { ResultCard } from './ResultCard'
import { UpdateLogModal } from './UpdateLogModal'
import { MISSION_COUNT, useMissionProgress } from './useMissionProgress'
import { Mission0ReadLabel } from './missions/Mission0ReadLabel'
import { Mission1WholePackage } from './missions/Mission1WholePackage'
import { Mission2CompareUnits } from './missions/Mission2CompareUnits'
import { Mission3SchoolSnack } from './missions/Mission3SchoolSnack'
import { Mission4PackageVsChoice } from './missions/Mission4PackageVsChoice'
import { Mission5FinalOrder } from './missions/Mission5FinalOrder'

type Screen =
  | { name: 'start' }
  | { name: 'hub' }
  | { name: 'mission'; id: number }
  | { name: 'result'; missionId: number }

export const missionTitles = [
  '표시판 읽기 훈련',
  '한 포장 전체 계산',
  '같은 단위끼리 비교',
  '학교 간식 조합',
  '포장 전체와 실제 선택량',
  '영양표시 조합 식당 최종 주문',
]

function MissionView({
  id,
  onBack,
  onComplete,
}: {
  id: number
  onBack: () => void
  onComplete: (summary: string) => void
}) {
  switch (id) {
    case 0:
      return <Mission0ReadLabel onBack={onBack} onComplete={onComplete} />
    case 1:
      return <Mission1WholePackage onBack={onBack} onComplete={onComplete} />
    case 2:
      return <Mission2CompareUnits onBack={onBack} onComplete={onComplete} />
    case 3:
      return <Mission3SchoolSnack onBack={onBack} onComplete={onComplete} />
    case 4:
      return <Mission4PackageVsChoice onBack={onBack} onComplete={onComplete} />
    case 5:
      return <Mission5FinalOrder onBack={onBack} onComplete={onComplete} />
    default:
      return null
  }
}

export function NutritionLabelCafeteriaApp() {
  const progress = useMissionProgress()
  const [screen, setScreen] = useState<Screen>({ name: 'start' })
  const [showLog, setShowLog] = useState(false)
  const [lastResult, setLastResult] = useState('')

  const mode: 'linear' | 'hub' = progress.hubUnlocked ? 'hub' : 'linear'

  const goMission = (id: number) => {
    if (progress.isUnlocked(id, mode)) setScreen({ name: 'mission', id })
  }

  const finishMission = (id: number, summary: string) => {
    progress.completeMission(id)
    setLastResult(summary)
    setScreen({ name: 'result', missionId: id })
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="eyebrow">알록달록 학교 식당</p>
        <h1>영양표시 조합 식당</h1>
        <p className="muted safety">
          가상 수치 연습용입니다. 실제 건강 처방·체중 평가·알레르기 정보를 입력하거나 저장하지 않습니다.
        </p>
      </header>

      {screen.name === 'start' && (
        <section className="card">
          <p>{FIXED_TIP}</p>
          <div className="actions">
            <button type="button" className="btn-primary" onClick={() => goMission(0)}>
              시작하기
            </button>
            {progress.hubUnlocked && (
              <button type="button" className="btn-secondary" onClick={() => setScreen({ name: 'hub' })}>
                미션 모음
              </button>
            )}
            <button type="button" className="btn-secondary" onClick={() => setShowLog(true)}>
              업데이트 내역
            </button>
          </div>
        </section>
      )}

      {screen.name === 'hub' && (
        <section className="card">
          <h2>미션 모음</h2>
          <div className="mission-grid">
            {missionTitles.map((title, id) => (
              <button
                key={title}
                type="button"
                className="mission-card"
                disabled={!progress.isUnlocked(id, mode)}
                onClick={() => goMission(id)}
              >
                <span>미션 {id}</span>
                <strong>{title}</strong>
                {progress.completed[id] && <em>완료</em>}
              </button>
            ))}
          </div>
          <button type="button" className="btn-secondary" onClick={() => setScreen({ name: 'start' })}>
            처음으로
          </button>
        </section>
      )}

      {screen.name === 'mission' && (
        <MissionView
          id={screen.id}
          onBack={() => setScreen(progress.hubUnlocked ? { name: 'hub' } : { name: 'start' })}
          onComplete={(summary) => finishMission(screen.id, summary)}
        />
      )}

      {screen.name === 'result' && (
        <ResultCard
          missionId={screen.missionId}
          lastResult={lastResult}
          showNext={
            screen.missionId < MISSION_COUNT - 1 && !progress.completed[screen.missionId + 1]
          }
          hubUnlocked={progress.hubUnlocked}
          onCopy={() => navigator.clipboard.writeText(lastResult)}
          onNext={() => goMission(screen.missionId + 1)}
          onHub={() => setScreen({ name: 'hub' })}
          onStart={() => setScreen({ name: 'start' })}
        />
      )}

      {showLog && <UpdateLogModal onClose={() => setShowLog(false)} />}
    </div>
  )
}
