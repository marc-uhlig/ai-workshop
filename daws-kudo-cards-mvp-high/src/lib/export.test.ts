import { describe, expect, it } from 'vitest'
import { exportOptions } from './export'

describe('export configuration', () => {
  it('renders PNG exports at card resolution', () => {
    expect(exportOptions).toMatchObject({ width: 1080, height: 1080, pixelRatio: 1 })
  })
})
