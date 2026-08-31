import { missionTitles } from './missionTitles'

export function MissionHub({
  completed,
  isUnlocked,
  mode,
  onSelect,
  onBack,
}: {
  completed: boolean[]
  isUnlocked: (id: number) => boolean
  mode: 'linear' | 'hub'
  onSelect: (id: number) => void
  onBack: () => void
}) {
  return (
    <section className="card mission-hub">
      <h2>미션 모음</h2>
      <div className="mission-grid">
        {missionTitles.map((title, id) => {
          const unlocked = isUnlocked(id)
          return (
            <button
              key={title}
              type="button"
              className="mission-card"
              disabled={!unlocked}
              onClick={() => onSelect(id)}
              title={!unlocked && mode === 'linear' ? '이전 미션을 먼저 완료해 보세요' : undefined}
            >
              <span>미션 {id + 1}</span>
              <strong>{title}</strong>
              {!unlocked && mode === 'linear' && (
                <em className="locked">이전 미션을 먼저 완료해 보세요</em>
              )}
              {completed[id] && <em>완료</em>}
            </button>
          )
        })}
      </div>
      <button type="button" className="btn-secondary" onClick={onBack}>
        처음으로
      </button>
    </section>
  )
}
