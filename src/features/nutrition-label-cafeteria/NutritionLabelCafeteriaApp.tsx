import { useState } from 'react'
import { ResultCard } from './ResultCard'
import { UpdateLogModal } from './UpdateLogModal'
import { StartScreen } from './StartScreen'
import { MissionHub } from './MissionHub'
import { MissionProgressBar } from './MissionProgressBar'
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
  const progressMissionId =
    screen.name === 'mission'
      ? screen.id
      : screen.name === 'result'
        ? screen.missionId
        : null

  const goMission = (id: number) => {
    if (progress.isUnlocked(id, mode)) setScreen({ name: 'mission', id })
  }

  const finishMission = (id: number, summary: string) => {
    progress.completeMission(id)
    setLastResult(summary)
    setScreen({ name: 'result', missionId: id })
  }

  return (
    <div className="app-shell" aria-busy={!progress.hydrated}>
      <header className="app-header">
        <p className="eyebrow">알록달록 학교 식당</p>
        <h1>영양표시 조합 식당</h1>
        {screen.name === 'start' && (
          <p className="muted safety">
            연습용 가상 숫자예요. 진짜 건강·체중·알레르기 정보는 넣지 않아요.
          </p>
        )}
      </header>

      {progress.hydrated ? (
        <>
          {progressMissionId !== null && (
            <MissionProgressBar currentId={progressMissionId} completed={progress.completed} />
          )}

          {screen.name === 'start' && (
            <StartScreen
              hubUnlocked={progress.hubUnlocked}
              completedCount={progress.completedCount}
              onStart={() => {
                const next = progress.completed.findIndex((c) => !c)
                goMission(next === -1 ? 0 : next)
              }}
              onHub={() => setScreen({ name: 'hub' })}
              onOpenLog={() => setShowLog(true)}
            />
          )}

          {screen.name === 'hub' && (
            <MissionHub
              completed={progress.completed}
              mode={mode}
              isUnlocked={(id) => progress.isUnlocked(id, mode)}
              onSelect={goMission}
              onBack={() => setScreen({ name: 'start' })}
            />
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
              onNext={() => goMission(screen.missionId + 1)}
              onHub={() => setScreen({ name: 'hub' })}
              onStart={() => setScreen({ name: 'start' })}
            />
          )}
        </>
      ) : (
        <main className="card loading-state" aria-live="polite">
          진행 기록을 불러오는 중이에요…
        </main>
      )}

      {showLog && <UpdateLogModal onClose={() => setShowLog(false)} />}
    </div>
  )
}
