import { useState } from 'react'

import { KudosCardPreview } from '@/components/kudos/kudos-card-preview'
import { KudosTemplatePicker } from '@/components/kudos/kudos-template-picker'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { kudosThemes } from '@/lib/kudos-card-catalog'

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
        <div className="flex justify-end">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset to template
          </Button>
        </div>
      </div>
    </div>
  )
}
