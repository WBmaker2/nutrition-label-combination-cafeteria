import { useState } from 'react'

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
  onCopy,
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
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const resultItems = lastResult.split(/\n+/).filter(Boolean)

  const copyResult = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(lastResult)
      } else {
        const textArea = document.createElement('textarea')
        textArea.value = lastResult
        textArea.setAttribute('readonly', '')
        textArea.style.position = 'fixed'
        textArea.style.opacity = '0'
        document.body.appendChild(textArea)
        textArea.select()
        const copied = document.execCommand('copy')
        textArea.remove()
        if (!copied) throw new Error('copy failed')
      }
      onCopy?.()
      setCopyState('copied')
    } catch {
      setCopyState('failed')
    }
  }

  return (
    <section className="card result-card result-card-hero">
      <div className="result-burst" aria-hidden="true">
        <span className="burst-star s1">⭐</span>
        <span className="burst-star s2">🌟</span>
        <span className="burst-star s3">✨</span>
      </div>
      <p className="celebrate celebrate-lg">미션 완료!</p>
      <h2 className="result-title">미션 {missionId + 1} 잘했어요!</h2>
      <p className="result-lead">{FOLLOW_UP[missionId] ?? '다음 미션으로 가 볼까요?'}</p>
      <details className="result-details">
        <summary>활동 기록 보기</summary>
        <ul className="result-list">
          {resultItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div className="result-copy-row">
          <button type="button" className="btn-secondary" onClick={copyResult}>
            결과 복사
          </button>
          {copyState === 'copied' && (
            <span className="copy-status" role="status">
              결과를 복사했어요.
            </span>
          )}
          {copyState === 'failed' && (
            <span className="copy-status copy-status-error" role="status">
              복사하지 못했어요. 화면의 기록을 직접 확인해 주세요.
            </span>
          )}
        </div>
      </details>
      <div className="actions result-actions">
        {showNext ? (
          <button type="button" className="btn-primary btn-lg anim-pop key-action" onClick={onNext}>
            다음 미션으로 →
          </button>
        ) : hubUnlocked ? (
          <button type="button" className="btn-primary btn-lg anim-pop key-action" onClick={onHub}>
            미션 모음 보기
          </button>
        ) : (
          <button type="button" className="btn-primary btn-lg key-action" onClick={onStart}>
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
