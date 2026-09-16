import energyBlades from '@/assets/themes/star-wars/energy-blades.svg'
import hyperspace from '@/assets/themes/star-wars/hyperspace.svg'
import starStation from '@/assets/themes/star-wars/star-station.svg'
import twinSuns from '@/assets/themes/star-wars/twin-suns.svg'

export interface KudosTemplate {
  id: string
  background: string
  presetText: string
}

export interface KudosTheme {
  id: string
  name: string
  templates: Array<KudosTemplate>
}

export const kudosThemes: Array<KudosTheme> = [
  {
    id: 'star-wars',
    name: 'Star Wars',
    templates: [
      {
        id: 'hyperspace',
        background: hyperspace,
        presetText: 'Great Job!',
      },
      {
        id: 'twin-suns',
        background: twinSuns,
        presetText: 'Amazing Work!',
      },
      {
        id: 'star-station',
        background: starStation,
        presetText: "You're a Star!",
      },
      {
        id: 'energy-blades',
        background: energyBlades,
        presetText: 'May the Kudos Be With You!',
      },
    ],
  },
]
