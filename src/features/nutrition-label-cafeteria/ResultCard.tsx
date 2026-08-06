const FOLLOW_UP: Record<number, string> = {
  0: '표시판에서 네 가지를 잘 찾았어요! 다음으로 포장 전체를 계산해 볼까요?',
  1: '포장 전체는 1회 숫자 × 총 제공량이에요. 잘했어요!',
  2: '당류는 g끼리, 나트륨은 mg끼리만 비교해요. 잘 구분했어요!',
  3: '다른 조합도 조건을 만족할까요? 미션 모음에서 다시 연습해 보세요.',
  4: '같은 식품도 몇 회 먹는지에 따라 합계가 달라져요.',
  5: '영양표시를 보고 조합을 고르는 연습을 마쳤어요. 멋져요!',
}

export function ResultCard({
  missionId,
  lastResult,
  showNext,
  hubUnlocked,
  onNext,
  onHub,
  onStart,
}: {
  missionId: number
  lastResult: string
  showNext: boolean
  hubUnlocked: boolean
  onCopy?: () => void
  onNext: () => void
  onHub: () => void
  onStart: () => void
}) {
  return (
    <section className="card result-card">
      <p className="celebrate" aria-hidden="true">
        ⭐ 미션 완료! ⭐
      </p>
      <h2>미션 {missionId} 잘했어요!</h2>
      <pre className="result-box">{lastResult}</pre>
      <p className="hint">{FOLLOW_UP[missionId] ?? '다음 미션으로 가 볼까요?'}</p>
      <div className="actions">
        {showNext && (
          <button type="button" className="btn-primary" onClick={onNext}>
            다음 미션으로
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
