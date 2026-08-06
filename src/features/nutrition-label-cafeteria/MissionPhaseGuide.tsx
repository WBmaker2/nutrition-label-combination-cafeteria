/** Visual checklist of combo-mission phases for grades 5–6. */
export function MissionPhaseGuide({
  phases,
}: {
  phases: { id: string; label: string; done: boolean; active?: boolean }[]
}) {
  return (
    <ol className="phase-guide" aria-label="미션 단계">
      {phases.map((p, i) => (
        <li
          key={p.id}
          className={`${p.done ? 'done' : ''} ${p.active ? 'active' : ''}`.trim()}
        >
          <span className="phase-num" aria-hidden="true">
            {p.done ? '⭐' : i + 1}
          </span>
          {p.label}
        </li>
      ))}
    </ol>
  )
}
