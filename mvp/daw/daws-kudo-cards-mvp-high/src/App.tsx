import { useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { MAX_MESSAGE_LENGTH, MAX_RECIPIENT_LENGTH, emptyCard, isCardValid, templates, validateCard } from './lib/card'
import type { CardData, Category } from './lib/card'
import { downloadPdf, downloadPng } from './lib/export'

type ArtProps = { category: Category }

function CardArt({ category }: ArtProps) {
  if (category === 'danke') {
    return <svg aria-hidden="true" className="card-art" viewBox="0 0 200 150"><path d="M36 102C14 72 50 26 89 57c15-39 73-13 53 28-17 31-55 44-55 44S54 123 36 102Z" fill="currentColor" opacity=".18"/><path d="M73 60c10-8 25-2 25 11 0-13 15-19 25-11 17 14-4 40-25 54C77 100 56 74 73 60Z" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/></svg>
  }
  if (category === 'teamwork') {
    return <svg aria-hidden="true" className="card-art" viewBox="0 0 200 150"><circle cx="61" cy="66" r="22" fill="none" stroke="currentColor" strokeWidth="7"/><circle cx="130" cy="66" r="22" fill="none" stroke="currentColor" strokeWidth="7"/><path d="M36 121c3-25 18-37 43-37s40 12 43 37M88 121c3-25 18-37 43-37s40 12 43 37" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
  }
  if (category === 'erfolg') {
    return <svg aria-hidden="true" className="card-art" viewBox="0 0 200 150"><path d="m48 107 31-36 23 20 47-56" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/><path d="M128 35h21v21" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/><circle cx="48" cy="107" r="8" fill="currentColor"/><circle cx="149" cy="35" r="8" fill="currentColor"/></svg>
  }
  return <svg aria-hidden="true" className="card-art" viewBox="0 0 200 150"><path d="M100 23c-25 25-48 45-48 70 0 26 21 47 48 47s48-21 48-47c0-25-23-45-48-70Z" fill="currentColor" opacity=".14"/><path d="M100 31c-14 22-25 39-25 56 0 14 11 25 25 25s25-11 25-25c0-17-11-34-25-56Z" fill="none" stroke="currentColor" strokeWidth="7"/><path d="M100 112v21M85 125h30" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/></svg>
}

function KudoCard({ card, exportMode = false }: { card: CardData; exportMode?: boolean }) {
  const template = templates[card.category]
  const recipient = card.recipient.trim() || 'Dein Name'
  const message = card.message.trim() || 'Eine kleine Anerkennung für dich.'

  return (
    <article
      aria-label={`Kudo-Card ${template.label}`}
      className={`kudo-card ${exportMode ? 'kudo-card--export' : ''}`}
      style={{ '--accent': template.accent, '--soft': template.soft } as CSSProperties}
    >
      <div className="card-topline"><span>{template.kicker}</span><span>{template.label}</span></div>
      <CardArt category={card.category} />
      <div className="card-copy">
        <p className="card-to">Für {recipient}</p>
        <p className="card-message">{message}</p>
        {card.sender.trim() && <p className="card-from">— {card.sender.trim()}</p>}
      </div>
      <div aria-hidden="true" className="card-signature">kudo</div>
    </article>
  )
}

export default function App() {
  const [card, setCard] = useState<CardData>(emptyCard)
  const [touched, setTouched] = useState({ recipient: false, message: false })
  const [exporting, setExporting] = useState<'png' | 'pdf' | null>(null)
  const [exportError, setExportError] = useState<string | null>(null)
  const exportRef = useRef<HTMLDivElement>(null)
  const errors = useMemo(() => validateCard(card), [card])
  const valid = isCardValid(card)

  function updateField(field: keyof CardData, value: string) {
    if (field === 'recipient' && value.length > MAX_RECIPIENT_LENGTH) return
    if (field === 'message' && value.length > MAX_MESSAGE_LENGTH) return
    setCard((current) => ({ ...current, [field]: value }))
  }

  async function exportCard(format: 'png' | 'pdf') {
    if (!valid || !exportRef.current) return
    setExporting(format)
    setExportError(null)
    try {
      if (format === 'png') await downloadPng(exportRef.current, card)
      else await downloadPdf(exportRef.current, card)
    } catch {
      setExportError('Download konnte nicht erstellt werden. Bitte erneut versuchen.')
    } finally {
      setExporting(null)
    }
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <a className="brand" href="/" aria-label="Kudo Cards Startseite">kudo<span>cards</span></a>
        <p>Eine Karte. Ein guter Moment.</p>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">Anerkennung zum Mitnehmen</p>
        <h1 id="page-title">Erstelle eine Kudo-Card.</h1>
        <p>Wähle Stil, schreibe ein paar ehrliche Worte und lade die Karte herunter.</p>
      </section>

      <section className="editor-grid" aria-label="Kudo-Card erstellen">
        <form className="editor" onSubmit={(event) => event.preventDefault()}>
          <fieldset>
            <legend>1. Kategorie</legend>
            <div className="category-grid">
              {(Object.keys(templates) as Category[]).map((category) => {
                const template = templates[category]
                return <label className="category-option" key={category}>
                  <input type="radio" name="category" value={category} checked={card.category === category} onChange={() => updateField('category', category)} />
                  <span style={{ '--option-color': template.accent } as CSSProperties}>{template.label}</span>
                </label>
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend>2. Deine Worte</legend>
            <label htmlFor="recipient">Für wen? <span aria-hidden="true">*</span></label>
            <input id="recipient" name="recipient" value={card.recipient} maxLength={MAX_RECIPIENT_LENGTH} onBlur={() => setTouched((state) => ({ ...state, recipient: true }))} onChange={(event) => updateField('recipient', event.target.value)} aria-invalid={Boolean(touched.recipient && errors.recipient)} aria-describedby="recipient-help recipient-error" placeholder="z. B. Alex" />
            <div className="field-meta"><span id="recipient-help">Name oder Team</span><span>{card.recipient.length}/{MAX_RECIPIENT_LENGTH}</span></div>
            {touched.recipient && errors.recipient && <p id="recipient-error" className="field-error" role="alert">{errors.recipient}</p>}

            <label htmlFor="message">Deine Nachricht <span aria-hidden="true">*</span></label>
            <textarea id="message" name="message" rows={6} value={card.message} maxLength={MAX_MESSAGE_LENGTH} onBlur={() => setTouched((state) => ({ ...state, message: true }))} onChange={(event) => updateField('message', event.target.value)} aria-invalid={Boolean(touched.message && errors.message)} aria-describedby="message-help message-error" placeholder="Was möchtest du sagen?" />
            <div className="field-meta"><span id="message-help">Mach es persönlich.</span><span>{card.message.length}/{MAX_MESSAGE_LENGTH}</span></div>
            {touched.message && errors.message && <p id="message-error" className="field-error" role="alert">{errors.message}</p>}

            <label htmlFor="sender">Von <span className="optional">optional</span></label>
            <input id="sender" name="sender" value={card.sender} onChange={(event) => updateField('sender', event.target.value)} placeholder="Dein Name" />
          </fieldset>

          <div className="download-panel">
            <p>3. Download</p>
            <div className="download-actions">
              <button type="button" onClick={() => exportCard('png')} disabled={!valid || exporting !== null}>{exporting === 'png' ? 'Erstelle PNG …' : 'PNG herunterladen'}</button>
              <button type="button" className="secondary" onClick={() => exportCard('pdf')} disabled={!valid || exporting !== null}>{exporting === 'pdf' ? 'Erstelle PDF …' : 'A6-PDF herunterladen'}</button>
            </div>
            {!valid && <p className="download-hint" aria-live="polite">Empfänger und Nachricht ausfüllen, um herunterzuladen.</p>}
            {exportError && <p className="field-error" role="alert">{exportError}</p>}
          </div>
        </form>

        <aside className="preview-panel" aria-label="Live-Vorschau">
          <div className="preview-heading"><p>Live-Vorschau</p><span>1080 × 1080</span></div>
          <KudoCard card={card} />
        </aside>
      </section>

      <div className="export-stage" aria-hidden="true"><div ref={exportRef}><KudoCard card={card} exportMode /></div></div>
    </main>
  )
}
