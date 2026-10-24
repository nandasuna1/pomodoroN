import catIllustration from '../assets/mascot/cat.svg'

export type MascotState = 'idle' | 'active' | 'rest'
export type RestActivity = 'exercise' | 'reading'

interface MascotProps {
  state?: MascotState
  restActivity?: RestActivity
  size?: number
}

export function Mascot({
  state = 'idle',
  restActivity = 'exercise',
  size = 48,
}: MascotProps) {
  const description =
    state === 'rest'
      ? restActivity === 'reading'
        ? 'Cat mascot reading during your break'
        : 'Cat mascot stretching during your break'
      : 'Cat mascot ready for a focus session'

  return (
    <span
      className={`mascot mascot--${state}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={description}
    >
      <img src={catIllustration} alt="" />
      {state === 'rest' && (
        <span className="mascot-activity" aria-hidden="true">
          {restActivity === 'reading' ? '📖' : '🧘'}
        </span>
      )}
    </span>
  )
}

export default Mascot
