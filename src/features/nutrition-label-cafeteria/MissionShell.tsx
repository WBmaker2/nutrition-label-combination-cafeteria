import type { ReactNode } from 'react'

export function MissionShell({
  title,
  message,
  finishHint,
  children,
  onBack,
  canFinish,
  onFinish,
}: {
  title: string
  message?: string
  /** Shown when 완료 is disabled — what is still missing */
  finishHint?: string
  children: ReactNode
  onBack: () => void
  canFinish: boolean
  onFinish: () => void
}) {
  return (
    <section className="card mission-shell">
      <h2>{title}</h2>
      {message && <p className="hint">{message}</p>}
      {children}
      {!canFinish && finishHint && (
        <p className="finish-hint" role="status">
          아직: {finishHint}
        </p>
      )}
      <div className="actions">
        <button type="button" className="btn-secondary" onClick={onBack}>
          뒤로
        </button>
        <button type="button" className="btn-primary" disabled={!canFinish} onClick={onFinish}>
          완료
        </button>
      </div>
    </section>
  )
}
