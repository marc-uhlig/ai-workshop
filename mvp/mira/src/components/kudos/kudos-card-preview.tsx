import { cn } from '@/lib/utils'
import {
  KUDOS_CARD_ASPECT_RATIO,
  KUDOS_CARD_TEXT_STYLE,
} from '@/lib/kudos-card-style'

interface KudosCardPreviewProps {
  background: string
  text: string
  className?: string
}

export function KudosCardPreview({
  background,
  text,
  className,
}: KudosCardPreviewProps) {
  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-xl bg-black',
        className,
      )}
      style={{
        aspectRatio: KUDOS_CARD_ASPECT_RATIO,
        containerType: 'inline-size',
      }}
    >
      <img
        src={background}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div
        className="absolute flex items-center justify-center text-center"
        style={{
          top: `${KUDOS_CARD_TEXT_STYLE.safeZone.top * 100}%`,
          bottom: `${(1 - KUDOS_CARD_TEXT_STYLE.safeZone.bottom) * 100}%`,
          left: `${KUDOS_CARD_TEXT_STYLE.safeZone.left * 100}%`,
          right: `${(1 - KUDOS_CARD_TEXT_STYLE.safeZone.right) * 100}%`,
        }}
      >
        <span
          className="whitespace-pre-wrap break-words drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
          style={{
            fontFamily: KUDOS_CARD_TEXT_STYLE.fontFamily,
            fontWeight: KUDOS_CARD_TEXT_STYLE.fontWeight,
            color: KUDOS_CARD_TEXT_STYLE.color,
            fontSize: `${KUDOS_CARD_TEXT_STYLE.fontSizeRatio * 100}cqw`,
            lineHeight: KUDOS_CARD_TEXT_STYLE.lineHeightRatio,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  )
}
