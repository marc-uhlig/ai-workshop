import { KudosCardPreview } from '@/components/kudos/kudos-card-preview'
import { cn } from '@/lib/utils'
import type { KudosTemplate } from '@/lib/kudos-card-catalog'

interface KudosTemplatePickerProps {
  templates: Array<KudosTemplate>
  selectedId: string
  onSelect: (id: string) => void
}

export function KudosTemplatePicker({
  templates,
  selectedId,
  onSelect,
}: KudosTemplatePickerProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Card templates"
      className="grid grid-cols-2 gap-3 sm:grid-cols-4"
    >
      {templates.map((template) => {
        const isSelected = template.id === selectedId
        return (
          <button
            key={template.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(template.id)}
            className={cn(
              'overflow-hidden rounded-lg border-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
              isSelected
                ? 'border-primary ring-2 ring-primary/40'
                : 'border-border hover:border-primary/50',
            )}
          >
            <KudosCardPreview
              background={template.background}
              text={template.presetText}
            />
          </button>
        )
      })}
    </div>
  )
}
