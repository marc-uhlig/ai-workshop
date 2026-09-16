import { useState } from 'react'

import { KudosCardPreview } from '@/components/kudos/kudos-card-preview'
import { KudosTemplatePicker } from '@/components/kudos/kudos-template-picker'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { kudosThemes } from '@/lib/kudos-card-catalog'
import { copyBlobToClipboard, downloadBlob } from '@/lib/kudos-card-export'
import { canvasToPngBlob, renderKudosCard } from '@/lib/kudos-card-render'

const [activeTheme] = kudosThemes

export function KudosCardComposer() {
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    activeTheme.templates[0].id,
  )
  const selectedTemplate =
    activeTheme.templates.find(
      (template) => template.id === selectedTemplateId,
    ) ?? activeTheme.templates[0]
  const [text, setText] = useState(selectedTemplate.presetText)
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)

  function handleSelectTemplate(templateId: string) {
    const nextTemplate = activeTheme.templates.find(
      (template) => template.id === templateId,
    )
    if (!nextTemplate) return
    setSelectedTemplateId(templateId)
    setText(nextTemplate.presetText)
  }

  function handleReset() {
    setText(selectedTemplate.presetText)
  }

  async function handleDownload() {
    setExportError(null)
    setIsExporting(true)
    try {
      const canvas = await renderKudosCard(selectedTemplate.background, text)
      const blob = await canvasToPngBlob(canvas)
      downloadBlob(blob, `kudos-card-${selectedTemplate.id}.png`)
    } catch {
      setExportError('Could not create the card image. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  async function handleCopy() {
    setExportError(null)
    setIsExporting(true)
    try {
      const canvas = await renderKudosCard(selectedTemplate.background, text)
      const blob = await canvasToPngBlob(canvas)
      await copyBlobToClipboard(blob)
    } catch {
      setExportError(
        'Copying to the clipboard failed or is not supported in this browser. Try downloading the image instead.',
      )
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Kudos Card Generator</h1>
        <p className="text-muted-foreground">{activeTheme.name} theme</p>
      </div>

      <KudosTemplatePicker
        templates={activeTheme.templates}
        selectedId={selectedTemplateId}
        onSelect={handleSelectTemplate}
      />

      <KudosCardPreview background={selectedTemplate.background} text={text} />

      <div className="flex flex-col gap-2">
        <label
          htmlFor="kudos-card-text"
          className="text-sm font-medium text-foreground"
        >
          Card text
        </label>
        <Textarea
          id="kudos-card-text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={2}
        />
        <div className="flex flex-wrap justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset to template
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isExporting}
            onClick={handleCopy}
          >
            Copy to clipboard
          </Button>
          <Button type="button" disabled={isExporting} onClick={handleDownload}>
            Download PNG
          </Button>
        </div>
        {exportError ? (
          <p role="alert" className="text-sm text-destructive">
            {exportError}
          </p>
        ) : null}
      </div>
    </div>
  )
}
