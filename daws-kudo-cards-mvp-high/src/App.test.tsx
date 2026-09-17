import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('updates preview and enables downloads for complete card', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText(/Für wen/), 'Alex')
    await user.type(screen.getByLabelText(/Deine Nachricht/), 'Danke für deinen Einsatz.')
    expect(within(screen.getByLabelText('Live-Vorschau')).getByLabelText('Kudo-Card Danke')).toHaveTextContent('Für Alex')
    expect(screen.getByRole('button', { name: 'PNG herunterladen' })).toBeEnabled()
  })

  it('changes category without clearing entered content', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByLabelText(/Für wen/), 'Mara')
    await user.click(screen.getByRole('radio', { name: 'Erfolg' }))
    expect(within(screen.getByLabelText('Live-Vorschau')).getByLabelText('Kudo-Card Erfolg')).toHaveTextContent('Für Mara')
  })

  it('keeps downloads disabled and shows validation after leaving required fields', async () => {
    const user = userEvent.setup()
    render(<App />)
    const recipient = screen.getByLabelText(/Für wen/)
    expect(screen.getByRole('button', { name: 'PNG herunterladen' })).toBeDisabled()
    await user.click(recipient)
    await user.tab()
    expect(screen.getByRole('alert')).toHaveTextContent('Bitte Empfänger eintragen.')
  })
})
