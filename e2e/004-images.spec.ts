import test, { expect } from 'playwright/test'

test('Upload image', async ({ page }) => {
  await page.goto('/admin/image-upload')
  await page.getByTestId('image-upload').click()
  await page.getByTestId('image-upload').setInputFiles({
    name: 'oogned.png',
    mimeType: 'image/png',
    buffer: Buffer.from('image data'),
  })
  await page.getByRole('button', { name: 'Upload afbeelding' }).click()
  await expect(page.getByText('Naam: oogned.png')).toBeVisible()
})

/*
test('Copy link', async ({ page }) => {
  await page.goto('/admin/image-upload')
  await page.getByRole('button').nth(1).click()
  await expect(page.getByText('Link gekopieerd!')).toBeVisible()
}*/

test('Delete image', async ({ page }) => {
  await page.goto('/admin/image-upload')
  await page.getByRole('button').nth(2).click()
  await expect(page.getByText('Afbeelding verwijderd!')).toBeVisible()
})
