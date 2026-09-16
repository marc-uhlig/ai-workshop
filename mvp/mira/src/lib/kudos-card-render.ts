import {
  KUDOS_CARD_HEIGHT,
  KUDOS_CARD_TEXT_STYLE,
  KUDOS_CARD_WIDTH,
} from '@/lib/kudos-card-style'

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    image.src = src
  })
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): Array<string> {
  const lines: Array<string> = []

  for (const paragraph of text.split('\n')) {
    const words = paragraph.split(' ')
    let currentLine = ''

    for (const word of words) {
      const candidate = currentLine ? `${currentLine} ${word}` : word
      if (ctx.measureText(candidate).width > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = candidate
      }
    }

    lines.push(currentLine)
  }

  return lines
}

export async function renderKudosCard(
  background: string,
  text: string,
): Promise<HTMLCanvasElement> {
  const canvas = document.createElement('canvas')
  canvas.width = KUDOS_CARD_WIDTH
  canvas.height = KUDOS_CARD_HEIGHT

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Canvas 2D context is not available')
  }

  const image = await loadImage(background)
  ctx.drawImage(image, 0, 0, KUDOS_CARD_WIDTH, KUDOS_CARD_HEIGHT)

  const {
    safeZone,
    fontSizeRatio,
    lineHeightRatio,
    fontFamily,
    fontWeight,
    color,
  } = KUDOS_CARD_TEXT_STYLE
  const boxLeft = safeZone.left * KUDOS_CARD_WIDTH
  const boxRight = safeZone.right * KUDOS_CARD_WIDTH
  const boxTop = safeZone.top * KUDOS_CARD_HEIGHT
  const boxBottom = safeZone.bottom * KUDOS_CARD_HEIGHT
  const boxWidth = boxRight - boxLeft
  const boxCenterX = (boxLeft + boxRight) / 2
  const boxCenterY = (boxTop + boxBottom) / 2

  const fontSize = fontSizeRatio * KUDOS_CARD_WIDTH
  const lineHeight = fontSize * lineHeightRatio

  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = color
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)'
  ctx.shadowBlur = 10
  ctx.shadowOffsetY = 2

  const lines = wrapText(ctx, text, boxWidth)
  const totalHeight = lines.length * lineHeight
  const startY = boxCenterY - totalHeight / 2 + lineHeight / 2

  lines.forEach((line, index) => {
    ctx.fillText(line, boxCenterX, startY + index * lineHeight)
  })

  return canvas
}

export function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Failed to create a PNG blob from the canvas'))
      }
    }, 'image/png')
  })
}
