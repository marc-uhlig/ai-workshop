export const KUDOS_CARD_WIDTH = 1200
export const KUDOS_CARD_HEIGHT = 630
export const KUDOS_CARD_ASPECT_RATIO = `${KUDOS_CARD_WIDTH} / ${KUDOS_CARD_HEIGHT}`

export const KUDOS_CARD_TEXT_STYLE = {
  fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  fontWeight: 700,
  color: '#ffffff',
  fontSizeRatio: 0.062,
  lineHeightRatio: 1.15,
  safeZone: {
    top: 0.62,
    bottom: 0.94,
    left: 0.08,
    right: 0.92,
  },
} as const
