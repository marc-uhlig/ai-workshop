export const CARD_SIZE = 1200
export const MESSAGE_MAX_LENGTH = 280
export const SENDER_MAX_LENGTH = 60

export type ThemeId = 'minimalist' | 'cyberpunk' | 'ascii-art'
export type OccasionId = 'thanks' | 'great-work' | 'teamwork' | 'helping-hand' | 'signal-boost' | 'mission-complete' | 'strong-move' | 'upgrade-earned' | 'thanks-pal' | 'great-job' | 'team-strong' | 'success-earned'
export type Shape = 'sun' | 'spark' | 'rings' | 'leaf' | 'grid' | 'bolt' | 'orbit' | 'chip' | 'ascii'

export type CardData = { themeId: ThemeId; occasionId: OccasionId; message: string; sender: string }
export type CardOccasion = { id: OccasionId; name: string; eyebrow: string; background: string; ink: string; accent: string; secondary: string; shape: Shape }
export type CardTheme = { id: ThemeId; name: string; description: string; defaultOccasionId: OccasionId; occasions: readonly CardOccasion[] }

export const cardThemes: readonly CardTheme[] = [
  { id: 'minimalist', name: 'Minimalistisch', description: 'Ruhig, klar und zeitlos.', defaultOccasionId: 'thanks', occasions: [
    { id: 'thanks', name: 'Danke', eyebrow: 'Wertschätzung', background: '#F9E5CE', ink: '#27334B', accent: '#E66D4D', secondary: '#F4B68D', shape: 'sun' },
    { id: 'great-work', name: 'Starke Arbeit', eyebrow: 'Anerkennung', background: '#DDEBDF', ink: '#173A35', accent: '#3E8D73', secondary: '#8CC5A5', shape: 'spark' },
    { id: 'teamwork', name: 'Teamwork', eyebrow: 'Gemeinsam', background: '#E9E4F7', ink: '#302B52', accent: '#7461C8', secondary: '#B6A9E8', shape: 'rings' },
    { id: 'helping-hand', name: 'Du hast geholfen', eyebrow: 'Danke dir', background: '#DCECF2', ink: '#173947', accent: '#3D94A6', secondary: '#8AC7D2', shape: 'leaf' },
  ] },
  { id: 'cyberpunk', name: 'Cyberpunk', description: 'Neon, Nacht und Energie.', defaultOccasionId: 'signal-boost', occasions: [
    { id: 'signal-boost', name: 'Signal Boost', eyebrow: 'Frequenz erhöht', background: '#0A0820', ink: '#F7F2FF', accent: '#FF3BBE', secondary: '#32E8FF', shape: 'grid' },
    { id: 'mission-complete', name: 'Mission erfüllt', eyebrow: 'Ziel erreicht', background: '#100A25', ink: '#F9F6FF', accent: '#37F6B4', secondary: '#A45CFF', shape: 'bolt' },
    { id: 'strong-move', name: 'Starker Move', eyebrow: 'Impact erkannt', background: '#12071E', ink: '#FFF5FC', accent: '#FF7A18', secondary: '#FF3BBE', shape: 'orbit' },
    { id: 'upgrade-earned', name: 'Upgrade verdient', eyebrow: 'Level erhöht', background: '#071520', ink: '#F1FDFF', accent: '#32E8FF', secondary: '#D7FF3F', shape: 'chip' },
  ] },
  { id: 'ascii-art', name: 'ASCII-Art', description: 'Retro, Text und Charme.', defaultOccasionId: 'thanks-pal', occasions: [
    { id: 'thanks-pal', name: 'Danke dir', eyebrow: 'Wertschätzung', background: '#1A1D18', ink: '#F4F0D9', accent: '#B8D970', secondary: '#6A8450', shape: 'ascii' },
    { id: 'great-job', name: 'Großartige Arbeit', eyebrow: 'Anerkennung', background: '#202028', ink: '#F7F0E5', accent: '#F0B25D', secondary: '#9B6C3D', shape: 'ascii' },
    { id: 'team-strong', name: 'Stark im Team', eyebrow: 'Gemeinsam', background: '#142126', ink: '#E5F2EF', accent: '#78D0C0', secondary: '#3D8178', shape: 'ascii' },
    { id: 'success-earned', name: 'Erfolg verdient', eyebrow: 'Erreicht', background: '#242018', ink: '#FFF4D6', accent: '#F6CF5A', secondary: '#A88835', shape: 'ascii' },
  ] },
]

export const defaultCard: CardData = { themeId: 'minimalist', occasionId: 'thanks', message: '', sender: '' }

export function getTheme(themeId: ThemeId): CardTheme { return cardThemes.find((theme) => theme.id === themeId) ?? cardThemes[0] }
export function getOccasion(themeId: ThemeId, occasionId: OccasionId): CardOccasion {
  const theme = getTheme(themeId)
  return theme.occasions.find((occasion) => occasion.id === occasionId) ?? theme.occasions.find((occasion) => occasion.id === theme.defaultOccasionId)!
}

export function isCardReady(card: CardData): boolean {
  return card.message.trim().length > 0
}

export function normaliseCard(card: CardData): CardData {
  const theme = getTheme(card.themeId)
  const occasion = theme.occasions.find((item) => item.id === card.occasionId)
  return { ...card, themeId: theme.id, occasionId: occasion?.id ?? theme.defaultOccasionId, message: card.message.slice(0, MESSAGE_MAX_LENGTH), sender: card.sender.slice(0, SENDER_MAX_LENGTH) }
}

export const pngExportOptions = { width: CARD_SIZE, height: CARD_SIZE, mimeType: 'image/png' } as const
