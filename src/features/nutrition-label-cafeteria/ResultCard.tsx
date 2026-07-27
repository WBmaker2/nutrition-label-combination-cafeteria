export function ResultCard({
  missionId,
  lastResult,
  showNext,
  hubUnlocked,
  onCopy,
  onNext,
  onHub,
  onStart,
}: {
  missionId: number
  lastResult: string
  showNext: boolean
  hubUnlocked: boolean
  onCopy: () => void
  onNext: () => void
  onHub: () => void
  onStart: () => void
}) {
  return (
    <section className="card">
      <h2>결과 카드 · 미션 {missionId}</h2>
      <pre className="result-box">{lastResult}</pre>
      <p className="muted">다른 조합도 조건을 만족할까요?</p>
      <div className="actions">
        <button type="button" className="btn-secondary" onClick={onCopy}>
          결과 복사
        </button>
        {showNext && (
          <button type="button" className="btn-primary" onClick={onNext}>
            다음 미션
          </button>
        )}
        {hubUnlocked && (
          <button type="button" className="btn-secondary" onClick={onHub}>
            미션 모음
          </button>
        )}
        <button type="button" className="btn-secondary" onClick={onStart}>
          처음으로
        </button>
      </div>
    </section>
  )
}
