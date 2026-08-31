import { useEffect, useRef } from 'react'
import { updateLog } from '../../data/updateLog'

export function UpdateLogModal({ onClose }: { onClose: () => void }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [onClose])

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="update-log-title"
    >
      <div className="card modal">
        <h2 id="update-log-title">업데이트 내역</h2>
        <ul>
          {updateLog.map((item) => (
            <li key={item.body}>
              <strong>{item.date}</strong> — {item.body}
            </li>
          ))}
        </ul>
        <button ref={closeButtonRef} type="button" className="btn-primary" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  )
}
