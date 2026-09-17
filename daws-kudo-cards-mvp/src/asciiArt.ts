import { type CardData, getOccasion } from './card'

const INNER_WIDTH = 48
const motifs: Record<string, readonly string[]> = {
  'thanks-pal': ['.-.-.   .-.-.', '(     ) (     )', ' \\   /   \\   /', '  \\ / .-. \\ /', '   V (   ) V', '     `-\'`', '      |', '   THANKS!'],
  'great-job': ['___________', "'._=====_.'", '|  * * *  |', '|  GUT!   |', "'.__|__.'", '    |', ".-'-'-.", '    |'],
  'team-strong': ['_o_       _o_', '/   \\     /   \\', '|  +  |   |  +  |', '|_____|   |_____|', '  / \\       / \\', ' /___\\     /___\\', '    \\_____/ ', 'TEAM'],
  'success-earned': ['/\\', '/==\\', '| ++ |', '|    |', '|____|', '/_/\\_\\', '  ||', ' /__\\'],
}

function wrapText(text: string, maxCharacters = 36): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (!words.length) return ['Deine Nachricht erscheint hier.']
  const lines: string[] = []
  let line = ''
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (next.length > maxCharacters && line) { lines.push(line); line = word } else line = next
  }
  if (line) lines.push(line)
  return lines.slice(0, 6)
}

function framedLine(content = '', centered = false): string {
  const clipped = content.slice(0, INNER_WIDTH)
  const padded = centered ? clipped.padStart(Math.floor((INNER_WIDTH + clipped.length) / 2)).padEnd(INNER_WIDTH) : clipped.padEnd(INNER_WIDTH)
  return `| ${padded} |`
}

export function getAsciiCardLines(card: CardData): string[] {
  const occasion = getOccasion(card.themeId, card.occasionId)
  const title = `${occasion.eyebrow.toUpperCase()} :: ${occasion.name}`
  const message = wrapText(card.message).concat(Array(5).fill('')).slice(0, 5)
  const sender = card.sender.trim() ? `- ${card.sender.trim()}` : ''
  return [
    `+${'-'.repeat(INNER_WIDTH + 2)}+`,
    framedLine(title),
    framedLine(),
    ...message.map((line) => framedLine(line)),
    framedLine(),
    ...(motifs[occasion.id] ?? []).map((line) => framedLine(line, true)),
    framedLine(),
    framedLine(sender),
    framedLine(),
    framedLine('KUDO CARD // ASCII EDITION', true),
    `+${'-'.repeat(INNER_WIDTH + 2)}+`,
  ]
}

export function getAsciiCardText(card: CardData): string { return getAsciiCardLines(card).join('\n') }
