import type { ReactNode } from 'react'
import { FIXED_TIP } from '../../data/updateLog'

export function MissionShell({
  title,
  message,
  children,
  onBack,
  canFinish,
  onFinish,
}: {
  title: string
  message?: string
  children: ReactNode
  onBack: () => void
  canFinish: boolean
  onFinish: () => void
}) {
  return (
    <section className="card mission-shell">
      <h2>{title}</h2>
      <p className="muted">{FIXED_TIP}</p>
      {message && <p className="hint">{message}</p>}
      {children}
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
