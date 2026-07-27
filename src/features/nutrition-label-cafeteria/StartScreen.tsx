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
