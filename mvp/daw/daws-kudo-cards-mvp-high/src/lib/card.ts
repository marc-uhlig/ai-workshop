export const categories = [
  'danke',
  'teamwork',
  'erfolg',
  'motivation',
] as const

export type Category = (typeof categories)[number]

export type CardData = {
  recipient: string
  message: string
  sender: string
  category: Category
}

export const MAX_RECIPIENT_LENGTH = 40
export const MAX_MESSAGE_LENGTH = 280

export const templates: Record<Category, { label: string; kicker: string; accent: string; soft: string }> = {
  danke: { label: 'Danke', kicker: 'Für dich', accent: '#c95a3d', soft: '#f9e6dc' },
  teamwork: { label: 'Teamwork', kicker: 'Zusammen stark', accent: '#3b6978', soft: '#dcecef' },
  erfolg: { label: 'Erfolg', kicker: 'Das ist gelungen', accent: '#7b5caa', soft: '#e9e1f4' },
  motivation: { label: 'Motivation', kicker: 'Weiter so', accent: '#2c7a5d', soft: '#dcf0e5' },
}

export const emptyCard: CardData = {
  recipient: '',
  message: '',
  sender: '',
  category: 'danke',
}

export type CardErrors = Partial<Record<'recipient' | 'message', string>>

export function validateCard(card: CardData): CardErrors {
  const errors: CardErrors = {}
  const recipient = card.recipient.trim()
  const message = card.message.trim()

  if (!recipient) errors.recipient = 'Bitte Empfänger eintragen.'
  else if (recipient.length > MAX_RECIPIENT_LENGTH) errors.recipient = `Maximal ${MAX_RECIPIENT_LENGTH} Zeichen.`

  if (!message) errors.message = 'Bitte Nachricht eintragen.'
  else if (message.length > MAX_MESSAGE_LENGTH) errors.message = `Maximal ${MAX_MESSAGE_LENGTH} Zeichen.`

  return errors
}

export function isCardValid(card: CardData) {
  return Object.keys(validateCard(card)).length === 0
}

export function downloadBaseName(card: CardData) {
  const recipient = card.recipient.trim().toLocaleLowerCase('de-DE')
  const safeRecipient = recipient
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `kudo-${safeRecipient || 'karte'}`
}
