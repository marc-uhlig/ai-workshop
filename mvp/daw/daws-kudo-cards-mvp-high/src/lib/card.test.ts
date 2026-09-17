import { describe, expect, it } from 'vitest'
import { MAX_MESSAGE_LENGTH, MAX_RECIPIENT_LENGTH, categories, downloadBaseName, emptyCard, isCardValid, templates, validateCard } from './card'

describe('card model', () => {
  it('offers exactly four required categories', () => {
    expect(categories).toEqual(['danke', 'teamwork', 'erfolg', 'motivation'])
    expect(Object.keys(templates)).toHaveLength(4)
  })

  it('requires recipient and message', () => {
    expect(validateCard(emptyCard)).toEqual({ recipient: 'Bitte Empfänger eintragen.', message: 'Bitte Nachricht eintragen.' })
    expect(isCardValid({ ...emptyCard, recipient: 'Alex', message: 'Danke für deinen Einsatz.' })).toBe(true)
  })

  it('rejects inputs beyond defined limits', () => {
    expect(validateCard({ ...emptyCard, recipient: 'a'.repeat(MAX_RECIPIENT_LENGTH + 1), message: 'x' })).toHaveProperty('recipient')
    expect(validateCard({ ...emptyCard, recipient: 'Alex', message: 'a'.repeat(MAX_MESSAGE_LENGTH + 1) })).toHaveProperty('message')
  })

  it('uses portable download names', () => {
    expect(downloadBaseName({ ...emptyCard, recipient: 'Jörg Müller' })).toBe('kudo-jorg-muller')
  })
})
