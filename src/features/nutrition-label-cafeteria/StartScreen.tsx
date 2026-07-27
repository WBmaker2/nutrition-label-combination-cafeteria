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
      <p className="eyebrow">알록달록 학교 식당</p>
      <h2>영양표시 조합 식당</h2>
      <p className="muted safety">
        가상 수치 연습용입니다. 실제 건강 처방·체중 평가·알레르기 정보를 입력하거나 저장하지 않습니다.
      </p>
      <p>{FIXED_TIP}</p>
      <div className="actions">
        <button type="button" className="btn-primary" onClick={onStart}>
          시작하기
        </button>
        {hubUnlocked && (
          <button type="button" className="btn-secondary" onClick={onHub}>
            미션 모음
          </button>
        )}
        <button type="button" className="btn-secondary" onClick={onOpenLog}>
          업데이트 내역
        </button>
      </div>
    </section>
  )
}
