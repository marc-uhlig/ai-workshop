import { useState } from 'react'
import { CardPreview } from './CardPreview'
import { type CardData, cardThemes, defaultCard, getTheme, isCardReady, MESSAGE_MAX_LENGTH, normaliseCard, SENDER_MAX_LENGTH } from './card'
import { exportCardPng } from './exportPng'
import './styles.css'

export default function App() {
  const [card, setCard] = useState<CardData>(defaultCard)
  const [showError, setShowError] = useState(false)
  const [exportError, setExportError] = useState('')
  const [downloaded, setDownloaded] = useState(false)
  const ready = isCardReady(card)
  const activeTheme = getTheme(card.themeId)

  const update = (next: Partial<CardData>) => {
    setCard((current) => normaliseCard({ ...current, ...next }))
    if (next.message?.trim()) setShowError(false)
    setDownloaded(false)
  }

  const download = async () => {
    if (!ready) {
      setShowError(true)
      return
    }
    setExportError('')
    setDownloaded(false)
    try {
      await exportCardPng(card)
      setDownloaded(true)
    } catch (error) {
      setExportError(error instanceof Error ? error.message : 'Export fehlgeschlagen.')
    }
  }

  return <main className="page-shell">
    <header className="masthead"><a href="/" className="brand" aria-label="Kudo Cards Startseite"><span>✦</span> Kudo Cards</a><p>Wertschätzung, die bleibt.</p></header>
    <section className="intro"><span className="step-label">SCHRITT 1 VON 1</span><h1>Erstelle eine Kudo-Card.</h1><p>Wähle ein Design, schreibe ein paar Worte und lade die Karte direkt als PNG herunter.</p></section>
    <div className="creator-grid">
      <section className="editor-panel" aria-labelledby="editor-title">
        <h2 id="editor-title">Deine Karte</h2>
        <fieldset><legend>Theme wählen</legend><div className="theme-grid">
          {cardThemes.map((theme) => <button type="button" className={`theme-option ${card.themeId === theme.id ? 'selected' : ''}`} aria-pressed={card.themeId === theme.id} onClick={() => update({ themeId: theme.id })} key={theme.id}>
            <span>{theme.name}</span><small>{theme.description}</small>
          </button>)}
        </div></fieldset>
        <fieldset><legend>Anlass wählen</legend><div className="template-grid">
          {activeTheme.occasions.map((occasion) => <button type="button" className={`template-option ${card.occasionId === occasion.id ? 'selected' : ''}`} aria-pressed={card.occasionId === occasion.id} onClick={() => update({ occasionId: occasion.id })} key={occasion.id}>
            <span className="swatch" style={{ backgroundColor: occasion.background, color: occasion.accent }}>✦</span><span>{occasion.name}</span>
          </button>)}
        </div></fieldset>
        <label htmlFor="message">Deine Nachricht <strong>*</strong></label>
        <textarea id="message" value={card.message} onChange={(event) => update({ message: event.target.value })} maxLength={MESSAGE_MAX_LENGTH} aria-describedby="message-hint message-error" placeholder="Danke, dass du immer mitdenkst und anpackst." rows={6} />
        <div className="field-meta"><span id="message-hint">{card.message.length}/{MESSAGE_MAX_LENGTH}</span>{showError && <span id="message-error" role="alert">Bitte schreibe eine Nachricht.</span>}</div>
        <label htmlFor="sender">Von <span>(optional)</span></label>
        <input id="sender" value={card.sender} onChange={(event) => update({ sender: event.target.value })} maxLength={SENDER_MAX_LENGTH} placeholder="Dein Name" />
        <div className="field-meta"><span>{card.sender.length}/{SENDER_MAX_LENGTH}</span></div>
        {exportError && <p className="export-error" role="alert">{exportError}</p>}
        {downloaded && <p className="download-success" role="status">Dein PNG-Download startet.</p>}
        <button className="download-button" onClick={download}>Als PNG herunterladen <span>↓</span></button>
        <p className="privacy-note">Keine Anmeldung. Deine Inhalte bleiben in deinem Browser.</p>
      </section>
      <section className="preview-panel" aria-labelledby="preview-title"><div className="preview-heading"><div><span className="step-label">LIVE-VORSCHAU</span><h2 id="preview-title">So sieht deine Karte aus</h2></div><span className="format-tag">1200 × 1200</span></div><div className="card-frame"><CardPreview card={card} id="card-preview" /></div><p className="preview-note">Quadratisches Format für Slack, Teams und Messenger.</p></section>
    </div>
  </main>
}
