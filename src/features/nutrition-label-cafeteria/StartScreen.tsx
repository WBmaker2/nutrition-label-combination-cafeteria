import { FIXED_TIP } from '../../data/updateLog'
import { MISSION_COUNT } from './useMissionProgress'

export function StartScreen({
  hubUnlocked,
  completedCount = 0,
  onStart,
  onHub,
  onOpenLog,
}: {
  hubUnlocked: boolean
  completedCount?: number
  onStart: () => void
  onHub: () => void
  onOpenLog: () => void
}) {
  const resume = completedCount > 0 && completedCount < MISSION_COUNT

  return (
    <section className="card start-screen">
      <div className="start-hero" aria-hidden="true">
        <span className="tray-emoji">🍽️</span>
        <div className="tray-foods">
          <span>🥣</span>
          <span>🍪</span>
          <span>🧃</span>
          <span>🥪</span>
        </div>
      </div>
      <h2 className="start-title">오늘 식판에 올릴 간식을 골라 볼까요?</h2>
      <p className="start-lead">
        영양표시의 <strong>1회 제공량</strong>과 <strong>총 제공량</strong>을 보고, 당류(g)와
        나트륨(mg)을 따로 계산해 보는 학교 식당 놀이예요.
      </p>
      {completedCount > 0 && (
        <p className="start-progress" role="status">
          저장됨: 미션 {completedCount} / {MISSION_COUNT} 완료
        </p>
      )}
      <details className="tip-details">
        <summary>시작 전에 알아두기</summary>
        <p>{FIXED_TIP}</p>
      </details>
      <div className="actions">
        <button type="button" className="btn-primary btn-lg key-action" onClick={onStart}>
          {resume ? '이어서 하기' : '미션 시작하기'}
        </button>
        {hubUnlocked && (
          <button type="button" className="btn-secondary" onClick={onHub}>
            미션 모음
          </button>
        )}
      </div>
      <details className="teacher-details">
        <summary>선생님용</summary>
        <button type="button" className="btn-ghost" onClick={onOpenLog}>
          업데이트 내역
        </button>
      </details>
    </section>
  )
}
