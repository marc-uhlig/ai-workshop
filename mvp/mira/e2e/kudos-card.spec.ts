import { expect, test } from '@playwright/test'

test('selects a template, edits text, and downloads the card', async ({
  page,
}) => {
  await page.goto('/')

  // Wait for TanStack Start's hydration/stream barrier to clear before
  // interacting, otherwise clicks can land before handlers are attached.
  await page.waitForFunction(() => !('$_TSR' in window))

  await expect(
    page.getByRole('heading', { name: 'Kudos Card Generator' }),
  ).toBeVisible()

  const templates = page.getByRole('radio')
  await expect(templates).toHaveCount(4)

  const secondTemplate = templates.nth(1)
  await secondTemplate.click()
  await expect(secondTemplate).toHaveAttribute('aria-checked', 'true')

  const textField = page.getByLabel('Card text')
  await expect(textField).toHaveValue('Amazing Work!')

  await textField.fill('Amazing work, team!')
  await expect(
    page.locator('span').filter({ hasText: 'Amazing work, team!' }),
  ).toBeVisible()

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download PNG' }).click()
  const download = await downloadPromise

  expect(download.suggestedFilename()).toMatch(/\.png$/)
  const downloadedPath = await download.path()
  expect(downloadedPath).toBeTruthy()
})
