import { MISSION_COUNT } from './useMissionProgress'
import { missionTitles } from './missionTitles'

export function MissionProgressBar({
  currentId,
  completed,
}: {
  currentId: number
  completed: boolean[]
}) {
  const done = completed.filter(Boolean).length
  const pct = Math.round((done / MISSION_COUNT) * 100)

  return (
    <div
      className="mission-progress"
      aria-label={'미션 ' + (currentId + 1) + ' 진행 중, 완료 ' + done + '개 / ' + MISSION_COUNT + '개'}
    >
      <div className="mission-progress-meta">
        <strong>
          미션 {currentId + 1} / {MISSION_COUNT}
        </strong>
        <span className="muted">{missionTitles[currentId]}</span>
        <span className="muted">완료 {done}개</span>
      </div>
      <div
        className="mission-progress-track"
        role="progressbar"
        aria-label={`완료한 미션 ${done}개 / ${MISSION_COUNT}개`}
        aria-valuetext={`완료한 미션 ${done}개, 전체 ${MISSION_COUNT}개`}
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={MISSION_COUNT}
      >
        <div className="mission-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <ol className="mission-progress-dots">
        {Array.from({ length: MISSION_COUNT }, (_, i) => (
          <li
            key={i}
            className={
              completed[i] ? 'done' : i === currentId ? 'current' : i < currentId ? 'past' : ''
            }
            aria-current={i === currentId ? 'step' : undefined}
            aria-label={`미션 ${i + 1}${completed[i] ? ' 완료' : i === currentId ? ' 진행 중' : ''}`}
          >
            {completed[i] ? '★' : i + 1}
          </li>
        ))}
      </ol>
    </div>
  )
}
