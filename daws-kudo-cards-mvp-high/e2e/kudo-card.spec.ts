import { expect, test } from '@playwright/test'

test('creates card, switches category, and downloads PNG and PDF', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('Für wen?').fill('Alex')
  await page.getByLabel('Deine Nachricht').fill('Danke für deinen Einsatz.')
  await page.getByLabel('Von optional').fill('Sam')
  await page.getByRole('radio', { name: 'Erfolg' }).check()

  await expect(page.getByLabel('Live-Vorschau')).toContainText('Für Alex')
  await expect(page.getByLabel('Live-Vorschau')).toContainText('Danke für deinen Einsatz.')
  await expect(page.getByLabel('Kudo-Card Erfolg').first()).toContainText('Sam')

  const pngDownload = page.waitForEvent('download')
  await page.getByRole('button', { name: 'PNG herunterladen' }).click()
  expect((await pngDownload).suggestedFilename()).toBe('kudo-alex.png')

  const pdfDownload = page.waitForEvent('download')
  await page.getByRole('button', { name: 'A6-PDF herunterladen' }).click()
  expect((await pdfDownload).suggestedFilename()).toBe('kudo-alex.pdf')
})

test('supports narrow viewport and keyboard entry', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 })
  await page.goto('/')
  await expect(page).toHaveTitle('Kudo Cards')
  expect(await page.locator('html').evaluate((element) => element.scrollWidth <= window.innerWidth)).toBe(true)

  await page.getByLabel('Für wen?').focus()
  await page.keyboard.type('Mara')
  await page.keyboard.press('Tab')
  await page.keyboard.type('Du schaffst das.')
  await page.keyboard.press('Tab')
  await page.keyboard.type('Kai')
  await expect(page.getByLabel('Live-Vorschau')).toContainText('Für Mara')
  await expect(page.getByRole('button', { name: 'PNG herunterladen' })).toBeEnabled()
})
