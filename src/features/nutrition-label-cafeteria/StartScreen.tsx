import { FIXED_TIP } from '../../data/updateLog'

export function StartScreen({
  hubUnlocked,
  onStart,
  onHub,
  onOpenLog,
}: {
  hubUnlocked: boolean
  onStart: () => void
  onHub: () => void
  onOpenLog: () => void
}) {
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
      <details className="tip-details">
        <summary>시작 전에 알아두기</summary>
        <p>{FIXED_TIP}</p>
      </details>
      <div className="actions">
        <button type="button" className="btn-primary btn-lg" onClick={onStart}>
          미션 시작하기
        </button>
        {hubUnlocked && (
          <button type="button" className="btn-secondary" onClick={onHub}>
            미션 모음
          </button>
        )}
        <button type="button" className="btn-ghost" onClick={onOpenLog}>
          업데이트 내역
        </button>
      </div>
    </section>
  )
}
