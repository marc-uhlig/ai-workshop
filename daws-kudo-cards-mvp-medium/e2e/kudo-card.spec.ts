import { expect, test } from '@playwright/test'

test('creates a Cyberpunk card and starts PNG download', async ({ page }) => {
  const message = 'Danke für deinen großartigen Einsatz im Team.'
  await page.addInitScript(() => {
    HTMLAnchorElement.prototype.click = function () {
      if (!this.download) return
      const runtimeWindow = window as Window & { downloads?: Array<{ href: string; filename: string }> }
      runtimeWindow.downloads ??= []
      runtimeWindow.downloads.push({ href: this.href, filename: this.download })
    }
  })
  await page.goto('/')
  await page.getByRole('button', { name: /Cyberpunk/ }).click()
  await page.getByRole('button', { name: 'Upgrade verdient' }).click()
  await page.getByLabel(/Deine Nachricht/).fill(message)
  await page.getByLabel(/Von/).fill('Daniel')
  await expect(page.locator('#card-preview')).toContainText('Danke für deinen')
  await expect(page.locator('#card-preview')).toContainText('Einsatz im')
  await expect(page.locator('#card-preview')).toContainText('Daniel')
  await expect(page.locator('#card-preview')).toHaveAttribute('viewBox', '0 0 1200 1200')
  await expect(page.locator('#card-preview')).toHaveAttribute('data-theme', 'cyberpunk')
  await expect(page.locator('#card-preview')).toHaveAttribute('data-occasion', 'Upgrade verdient')
  await page.getByRole('button', { name: /Als PNG herunterladen/ }).click()
  await expect(page.getByRole('status')).toHaveText('Dein PNG-Download startet.')
  const downloads = await page.evaluate(() => (window as Window & { downloads?: Array<{ href: string; filename: string }> }).downloads)
  expect(downloads).toHaveLength(1)
  expect(downloads?.[0].filename).toBe('kudo-card.png')
  expect(downloads?.[0].href).toMatch(/^data:image\/png;base64,/)
  const dimensions = await page.evaluate((href) => {
    const binary = atob(href.split(',')[1])
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0))
    const readUint32 = (offset: number) => new DataView(bytes.buffer).getUint32(offset)
    return { width: readUint32(16), height: readUint32(20) }
  }, downloads![0].href)
  expect(dimensions).toEqual({ width: 1200, height: 1200 })
})

test('blocks download when message is empty', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: /Als PNG herunterladen/ }).click()
  await expect(page.getByRole('alert')).toHaveText('Bitte schreibe eine Nachricht.')
})

test('creates an ASCII-Art card as native text and starts PNG download', async ({ page }) => {
  await page.addInitScript(() => {
    HTMLAnchorElement.prototype.click = function () {
      if (!this.download) return
      const runtimeWindow = window as Window & { downloads?: Array<{ href: string; filename: string }> }
      runtimeWindow.downloads ??= []
      runtimeWindow.downloads.push({ href: this.href, filename: this.download })
    }
  })
  await page.goto('/')
  await page.getByRole('button', { name: /ASCII-Art/ }).click()
  await page.getByRole('button', { name: 'Erfolg verdient' }).click()
  await page.getByLabel(/Deine Nachricht/).fill('Du hast das wirklich großartig gelöst.')
  await page.getByLabel(/Von/).fill('Daniel')
  const preview = page.locator('#card-preview')
  await expect(preview).toHaveJSProperty('tagName', 'PRE')
  await expect(preview).toHaveAttribute('data-preview-type', 'text')
  await expect(preview).toHaveAttribute('data-theme', 'ascii-art')
  await expect(preview).toHaveAttribute('data-occasion', 'Erfolg verdient')
  await expect(preview).toContainText('Du hast das wirklich')
  await expect(preview).toContainText('KUDO CARD // ASCII EDITION')
  await page.getByRole('button', { name: /Als PNG herunterladen/ }).click()
  await expect(page.getByRole('status')).toHaveText('Dein PNG-Download startet.')
  const downloads = await page.evaluate(() => (window as Window & { downloads?: Array<{ href: string; filename: string }> }).downloads)
  expect(downloads).toHaveLength(1)
  expect(downloads?.[0].href).toMatch(/^data:image\/png;base64,/)
})
