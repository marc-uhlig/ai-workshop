import { type CardData, getOccasion, pngExportOptions } from './card'
import { getAsciiCardLines } from './asciiArt'

function wrapText(text: string, maxCharacters = 24): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (!words.length) return []
  const lines: string[] = []
  let line = ''
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (next.length > maxCharacters && line) { lines.push(line); line = word } else line = next
  }
  if (line) lines.push(line)
  return lines.slice(0, 6)
}

function drawDecoration(context: CanvasRenderingContext2D, shape: ReturnType<typeof getOccasion>['shape'], accent: string, secondary: string) {
  context.strokeStyle = accent
  context.fillStyle = accent
  if (shape === 'sun') {
    context.lineWidth = 17; context.lineCap = 'round'; context.beginPath(); context.arc(950, 230, 68, 0, Math.PI * 2)
    for (const [x1, y1, x2, y2] of [[950, 70, 950, 35], [950, 425, 950, 390], [790, 230, 755, 230], [1145, 230, 1110, 230]]) { context.moveTo(x1, y1); context.lineTo(x2, y2) }
    context.stroke(); return
  }
  if (shape === 'spark') { context.beginPath(); context.moveTo(953, 56); context.lineTo(995, 204); context.lineTo(1143, 246); context.lineTo(995, 288); context.lineTo(953, 436); context.lineTo(911, 288); context.lineTo(763, 246); context.lineTo(911, 204); context.closePath(); context.fill(); return }
  if (shape === 'rings') { context.lineWidth = 24; [136, 84, 32].forEach((radius) => { context.beginPath(); context.arc(948, 218, radius, 0, Math.PI * 2); context.stroke() }); return }
  if (shape === 'grid') { context.strokeStyle = secondary; context.lineWidth = 7; context.strokeRect(700, 80, 420, 420); for (let step = 105; step < 420; step += 105) { context.beginPath(); context.moveTo(700 + step, 80); context.lineTo(700 + step, 500); context.moveTo(700, 80 + step); context.lineTo(1120, 80 + step); context.stroke() }; context.strokeStyle = accent; context.lineWidth = 18; context.beginPath(); context.moveTo(780, 420); context.lineTo(1070, 130); context.moveTo(820, 465); context.lineTo(1110, 175); context.stroke(); return }
  if (shape === 'bolt') { context.fillStyle = accent; context.beginPath(); context.moveTo(982, 45); context.lineTo(762, 315); context.lineTo(899, 315); context.lineTo(847, 550); context.lineTo(1086, 246); context.lineTo(948, 246); context.closePath(); context.fill(); context.strokeStyle = secondary; context.lineWidth = 18; context.beginPath(); context.moveTo(750, 100); context.lineTo(840, 100); context.lineTo(750, 100); context.lineTo(750, 190); context.moveTo(1110, 390); context.lineTo(1018, 390); context.moveTo(1110, 390); context.lineTo(1110, 298); context.stroke(); return }
  if (shape === 'orbit') { context.strokeStyle = secondary; context.lineWidth = 11; context.beginPath(); context.arc(955, 240, 132, 0, Math.PI * 2); context.stroke(); context.strokeStyle = accent; context.lineWidth = 16; context.save(); context.translate(955, 240); context.rotate(-.49); context.beginPath(); context.ellipse(0, 0, 215, 72, 0, 0, Math.PI * 2); context.stroke(); context.restore(); context.fillStyle = accent; context.beginPath(); context.arc(1105, 145, 25, 0, Math.PI * 2); context.fill(); return }
  if (shape === 'chip') { context.strokeStyle = secondary; context.lineWidth = 16; context.beginPath(); context.roundRect(770, 75, 360, 330, 26); context.stroke(); context.strokeStyle = accent; context.lineWidth = 15; context.beginPath(); context.roundRect(850, 150, 200, 180, 15); context.stroke(); context.lineWidth = 14; for (let x = 820; x <= 1120; x += 75) { context.beginPath(); context.moveTo(x, 45); context.lineTo(x, 100); context.moveTo(x, 380); context.lineTo(x, 435); context.stroke() }; context.strokeStyle = secondary; context.lineWidth = 12; context.beginPath(); context.moveTo(885, 240); context.lineTo(1015, 240); context.moveTo(950, 175); context.lineTo(950, 305); context.stroke(); return }
  context.beginPath(); context.ellipse(920, 195, 80, 145, .55, 0, Math.PI * 2); context.fill(); context.beginPath(); context.ellipse(915, 425, 73, 130, .55, 0, Math.PI * 2); context.fill()
}

export async function exportCardPng(card: CardData, filename = 'kudo-card.png'): Promise<void> {
  const template = getOccasion(card.themeId, card.occasionId)
  const canvas = document.createElement('canvas')
  canvas.width = pngExportOptions.width
  canvas.height = pngExportOptions.height
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas wird von diesem Browser nicht unterstützt.')
  context.fillStyle = template.background
  context.beginPath(); context.roundRect(0, 0, 1200, 1200, 72); context.fill()
  if (card.themeId === 'ascii-art') {
    const lines = getAsciiCardLines(card)
    context.fillStyle = template.ink
    context.font = '600 29px ui-monospace, SFMono-Regular, Menlo, monospace'
    lines.forEach((line, index) => context.fillText(line, 125, 122 + index * 43))
    const pngDataUrl = canvas.toDataURL(pngExportOptions.mimeType)
    const link = document.createElement('a')
    link.href = pngDataUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    return
  }
  context.fillStyle = `${card.themeId === 'cyberpunk' ? template.secondary : template.accent}24`
  context.beginPath()
  if (card.themeId === 'cyberpunk') { context.moveTo(0, 930); context.lineTo(1200, 750); context.lineTo(1200, 1200); context.lineTo(0, 1200) } else { context.moveTo(0, 940); context.quadraticCurveTo(240, 800, 615, 1060); context.quadraticCurveTo(985, 1220, 1200, 1004); context.lineTo(1200, 1200); context.lineTo(0, 1200) }
  context.fill()
  if (card.themeId === 'cyberpunk') { context.strokeStyle = `${template.secondary}70`; context.lineWidth = 4; for (let y = 760; y < 1200; y += 160) { context.beginPath(); context.moveTo(0, y); context.lineTo(1200, y - 180); context.stroke() } for (let x = 40; x < 1200; x += 210) { context.beginPath(); context.moveTo(x, 1200); context.lineTo(x - 120, 760); context.stroke() } }
  drawDecoration(context, template.shape, template.accent, template.secondary)
  context.fillStyle = template.ink; context.font = '700 31px Arial'; context.fillText(template.eyebrow.toUpperCase(), 102, 140)
  context.strokeStyle = template.accent; context.lineWidth = 10; context.lineCap = 'round'; context.beginPath(); context.moveTo(102, 184); context.lineTo(262, 184); context.stroke()
  const lines = wrapText(card.message); const fontSize = lines.length > 4 ? 72 : lines.length > 3 ? 82 : 94; const firstY = 465 - ((lines.length - 1) * fontSize * .56)
  context.font = `700 ${fontSize}px ${card.themeId === 'cyberpunk' ? 'Arial' : 'Georgia'}`; lines.forEach((line, index) => context.fillText(line, 98, firstY + index * fontSize * 1.16))
  if (card.sender.trim()) { context.font = '700 34px Arial'; context.fillText(`— ${card.sender.trim()}`, 102, 1010) }
  context.globalAlpha = .7; context.font = '600 26px Arial'; context.fillText('KUDO CARD', 102, 1100); context.globalAlpha = 1
  const pngDataUrl = canvas.toDataURL(pngExportOptions.mimeType)
  const link = document.createElement('a')
  link.href = pngDataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
}
