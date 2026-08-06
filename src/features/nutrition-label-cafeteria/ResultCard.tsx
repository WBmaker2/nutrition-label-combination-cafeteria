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
    <section className="card result-card result-card-hero">
      <div className="result-burst" aria-hidden="true">
        <span className="burst-star s1">⭐</span>
        <span className="burst-star s2">🌟</span>
        <span className="burst-star s3">✨</span>
      </div>
      <p className="celebrate celebrate-lg">미션 완료!</p>
      <h2 className="result-title">미션 {missionId} 잘했어요!</h2>
      <p className="result-lead">{FOLLOW_UP[missionId] ?? '다음 미션으로 가 볼까요?'}</p>
      <details className="result-details">
        <summary>내가 한 일 보기</summary>
        <p className="result-summary">{lastResult}</p>
      </details>
      <div className="actions result-actions">
        {showNext ? (
          <button type="button" className="btn-primary btn-lg anim-pop" onClick={onNext}>
            다음 미션으로 →
          </button>
        ) : hubUnlocked ? (
          <button type="button" className="btn-primary btn-lg anim-pop" onClick={onHub}>
            미션 모음 보기
          </button>
        ) : (
          <button type="button" className="btn-primary btn-lg" onClick={onStart}>
            처음으로
          </button>
        )}
        {showNext && hubUnlocked && (
          <button type="button" className="btn-ghost" onClick={onHub}>
            미션 모음
          </button>
        )}
        {(showNext || hubUnlocked) && (
          <button type="button" className="btn-ghost" onClick={onStart}>
            처음으로
          </button>
        )}
      </div>
    </section>
  )
}
