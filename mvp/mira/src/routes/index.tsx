import { createFileRoute } from '@tanstack/react-router'

import { KudosCardComposer } from '@/components/kudos/kudos-card-composer'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return <KudosCardComposer />
}
