import type { CardData } from './card'
import { CARD_SIZE, getOccasion } from './card'
import { getAsciiCardText } from './asciiArt'

type Props = { card: CardData; id?: string }

function wrapText(text: string, maxCharacters = 24): string[] {
  const words = text.trim().split(/\s+/).filter(Boolean)
  if (!words.length) return ['Deine Nachricht', 'erscheint hier.']

  const lines: string[] = []
  let line = ''
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (next.length > maxCharacters && line) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  return lines.slice(0, 6)
}

function Decoration({ shape, accent, secondary }: { shape: ReturnType<typeof getOccasion>['shape']; accent: string; secondary: string }) {
  if (shape === 'sun') return <g fill="none" stroke={accent} strokeWidth="17" strokeLinecap="round"><circle cx="950" cy="230" r="68" /><path d="M950 70v-35M950 425v-35M790 230h-35M1145 230h-35M836 116l-25-25M1089 369l-25-25M1064 116l25-25M836 344l-25 25" /></g>
  if (shape === 'spark') return <path fill={accent} d="M953 56c25 126 64 165 190 190-126 25-165 64-190 190-25-126-64-165-190-190 126-25 165-64 190-190Z" />
  if (shape === 'rings') return <g fill="none" stroke={accent} strokeWidth="24"><circle cx="948" cy="218" r="136" /><circle cx="948" cy="218" r="84" /><circle cx="948" cy="218" r="32" /></g>
  if (shape === 'leaf') return <g fill={accent}><path d="M1026 89c-126 2-207 88-221 223 129 2 207-88 221-223Z" /><path d="M1034 330c-114 0-192 72-208 190 119 5 194-75 208-190Z" /></g>
  if (shape === 'grid') return <g fill="none" strokeLinecap="square"><path d="M700 80h420v420H700zM700 185h420M700 290h420M700 395h420M805 80v420M910 80v420M1015 80v420" stroke={secondary} strokeWidth="7" opacity=".8" /><path d="M780 420 1070 130M820 465 1110 175" stroke={accent} strokeWidth="18" /></g>
  if (shape === 'bolt') return <g><path fill={accent} d="m982 45-220 270h137l-52 235 239-304H948z" /><path d="M750 100h90M750 100v90M1110 390h-92M1110 390v-92" fill="none" stroke={secondary} strokeWidth="18" /></g>
  if (shape === 'orbit') return <g fill="none"><circle cx="955" cy="240" r="132" stroke={secondary} strokeWidth="11" /><ellipse cx="955" cy="240" rx="215" ry="72" stroke={accent} strokeWidth="16" transform="rotate(-28 955 240)" /><circle cx="1105" cy="145" r="25" fill={accent} /></g>
  return <g fill="none"><rect x="770" y="75" width="360" height="330" rx="26" stroke={secondary} strokeWidth="16" /><rect x="850" y="150" width="200" height="180" rx="15" stroke={accent} strokeWidth="15" /><path d="M820 45v55m75-55v55m75-55v55m75-55v55m75-55v55M820 380v55m75-55v55m75-55v55m75-55v55m75-55v55" stroke={accent} strokeWidth="14" /><path d="M885 240h130M950 175v130" stroke={secondary} strokeWidth="12" /></g>
}

export function CardPreview({ card, id }: Props) {
  const template = getOccasion(card.themeId, card.occasionId)
  if (card.themeId === 'ascii-art') return <pre id={id} className="ascii-card" role="img" aria-label={`Kudo-Karte: ${template.name}`} data-theme={card.themeId} data-occasion={template.name} data-preview-type="text">{getAsciiCardText(card)}</pre>
  const cyberpunk = card.themeId === 'cyberpunk'
  const lines = wrapText(card.message)
  const fontSize = lines.length > 4 ? 72 : lines.length > 3 ? 82 : 94
  const firstLineY = 465 - ((lines.length - 1) * fontSize * 0.56)

  return (
    <svg id={id} role="img" aria-label={`Kudo-Karte: ${template.name}`} data-theme={card.themeId} data-occasion={template.name} viewBox={`0 0 ${CARD_SIZE} ${CARD_SIZE}`} xmlns="http://www.w3.org/2000/svg">
      <rect width={CARD_SIZE} height={CARD_SIZE} rx="72" fill={template.background} />
      {cyberpunk ? <><path d="M0 930 1200 750v450H0Z" fill={template.secondary} opacity=".11" /><path d="M0 955 1200 775M0 1080l1200-180M0 760l1200-180M160 1200 40 760m330 440L250 725m330 475L460 690m330 510L670 655m330 545L880 620" stroke={template.secondary} strokeWidth="4" opacity=".42" /></> : <path d="M0 940C225 810 430 945 615 1060c177 109 385 77 585-56v196H0V940Z" fill={template.accent} opacity=".14" />}
      <Decoration shape={template.shape} accent={template.accent} secondary={template.secondary} />
      <text x="102" y="140" fill={template.ink} fontFamily="Arial, sans-serif" fontSize="31" fontWeight="700" letterSpacing="5">{template.eyebrow.toUpperCase()}</text>
      <line x1="102" y1="184" x2="262" y2="184" stroke={template.accent} strokeWidth="10" strokeLinecap="round" />
      <text x="98" y={firstLineY} fill={template.ink} fontFamily={cyberpunk ? 'Arial, sans-serif' : 'Georgia, serif'} fontSize={fontSize} fontWeight="700">
        {lines.map((line, index) => <tspan key={`${line}-${index}`} x="98" dy={index === 0 ? 0 : fontSize * 1.16}>{line}</tspan>)}
      </text>
      {card.sender.trim() && <text x="102" y="1010" fill={template.ink} fontFamily="Arial, sans-serif" fontSize="34" fontWeight="700">— {card.sender.trim()}</text>}
      <text x="102" y="1100" fill={template.ink} opacity=".7" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="600">KUDO CARD</text>
    </svg>
  )
}
