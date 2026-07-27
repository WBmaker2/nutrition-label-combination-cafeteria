import { updateLog } from '../../data/updateLog'

export function UpdateLogModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="업데이트 내역">
      <div className="card modal">
        <h2>업데이트 내역</h2>
        <ul>
          {updateLog.map((item) => (
            <li key={item.body}>
              <strong>{item.date}</strong> — {item.body}
            </li>
          ))}
        </ul>
        <button type="button" className="btn-primary" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  )
}
