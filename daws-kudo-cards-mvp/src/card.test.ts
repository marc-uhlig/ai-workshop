import { describe, expect, it } from 'vitest'
import { CARD_SIZE, cardThemes, defaultCard, getOccasion, isCardReady, MESSAGE_MAX_LENGTH, normaliseCard, pngExportOptions, SENDER_MAX_LENGTH } from './card'

describe('card validation', () => {
  it('does not allow export without a message', () => {
    expect(isCardReady(defaultCard)).toBe(false)
    expect(isCardReady({ ...defaultCard, message: 'Danke für deine Hilfe.' })).toBe(true)
  })

  it('limits editor values to card-safe lengths', () => {
    const card = normaliseCard({ ...defaultCard, message: 'm'.repeat(MESSAGE_MAX_LENGTH + 1), sender: 's'.repeat(SENDER_MAX_LENGTH + 1) })
    expect(card.message).toHaveLength(MESSAGE_MAX_LENGTH)
    expect(card.sender).toHaveLength(SENDER_MAX_LENGTH)
  })
})

describe('theme catalogue and export', () => {
  it('contains exactly four occasions per theme, including Cyberpunk and ASCII-Art sets', () => {
    expect(cardThemes).toHaveLength(3)
    expect(cardThemes.every((theme) => theme.occasions.length > 0)).toBe(true)
    expect(cardThemes.every((theme) => theme.occasions.length === 4)).toBe(true)
    expect(cardThemes.find((theme) => theme.id === 'cyberpunk')?.occasions.map((occasion) => occasion.name)).toEqual(['Signal Boost', 'Mission erfüllt', 'Starker Move', 'Upgrade verdient'])
    expect(cardThemes.find((theme) => theme.id === 'ascii-art')?.occasions.map((occasion) => occasion.name)).toEqual(['Danke dir', 'Großartige Arbeit', 'Stark im Team', 'Erfolg verdient'])
  })

  it('selects a theme default occasion while retaining content', () => {
    const card = normaliseCard({ ...defaultCard, themeId: 'cyberpunk', message: 'Großartig gemacht.', sender: 'Daniel' })
    expect(card).toMatchObject({ themeId: 'cyberpunk', occasionId: 'signal-boost', message: 'Großartig gemacht.', sender: 'Daniel' })
    expect(getOccasion(card.themeId, card.occasionId).name).toBe('Signal Boost')
  })

  it('selects the ASCII-Art default occasion while retaining content', () => {
    const card = normaliseCard({ ...defaultCard, themeId: 'ascii-art', message: 'Danke für deinen Einsatz.', sender: 'Daniel' })
    expect(card).toMatchObject({ themeId: 'ascii-art', occasionId: 'thanks-pal', message: 'Danke für deinen Einsatz.', sender: 'Daniel' })
    expect(getOccasion(card.themeId, card.occasionId).name).toBe('Danke dir')
  })

  it('uses a square 1200px PNG export', () => expect(pngExportOptions).toEqual({ width: CARD_SIZE, height: CARD_SIZE, mimeType: 'image/png' }))
})
