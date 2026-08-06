/** Short kid-facing cheer when something was just confirmed. */
export function CheerBanner({
  text,
  stickers = '⭐⭐⭐',
}: {
  text: string
  stickers?: string
}) {
  return (
    <p className="cheer-banner" role="status">
      <span className="cheer-stickers" aria-hidden="true">
        {stickers}
      </span>
      <span>{text}</span>
    </p>
  )
}
