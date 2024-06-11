import { expect, test } from '@playwright/test'

test.describe('Diagnose', () => {
  test('create diagnose', async ({ page }) => {
    await page.goto('/admin/diagnoses')
    await page.getByRole('button', { name: 'Diagnose toevoegen' }).click()
    await page.getByPlaceholder('Fluxus Neuralis Hyperkineticus', { exact: true }).click()
    await page.getByPlaceholder('Fluxus Neuralis Hyperkineticus', { exact: true }).fill('test')
    await page.getByPlaceholder('Fluxus Neuralis Hyperkineticus', { exact: true }).press('Tab')
    await page.getByPlaceholder('"Fluxus Neuralis').fill('test')
    await page.getByLabel('Huisarts').click()
    await page.getByRole('button', { name: 'Diagnose aanmaken' }).click()
    await page.getByPlaceholder('Filter diagnoses...').click()
    await page.getByPlaceholder('Filter diagnoses...').fill('test')
    await expect(page.getByText('test').first()).toBeVisible()
  })

  test('edit diagnose', async ({ page }) => {
    await page.goto('/admin/diagnoses')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('menuitem', { name: 'Wijzigen' }).click()
    await page.getByPlaceholder('Fluxus Neuralis Hyperkineticus', { exact: true }).click()
    await page.getByPlaceholder('Fluxus Neuralis Hyperkineticus', { exact: true }).fill('testedit')
    await page.getByPlaceholder('"Fluxus Neuralis').click()
    await page.getByPlaceholder('"Fluxus Neuralis').fill('testedit')
    await page.getByLabel('Optometrist').click()
    await page.getByRole('button', { name: 'Diagnose aanpassen' }).click()
    await expect(page.getByText('testedit').first()).toBeVisible()
  })

  test('create another diagnose', async ({ page }) => {
    await page.goto('/admin/diagnoses')
    await page.getByRole('button', { name: 'Diagnose toevoegen' }).click()
    await page.getByPlaceholder('Fluxus Neuralis Hyperkineticus', { exact: true }).click()
    await page.getByPlaceholder('Fluxus Neuralis Hyperkineticus', { exact: true }).fill('test2')
    await page.getByPlaceholder('"Fluxus Neuralis').click()
    await page.getByPlaceholder('"Fluxus Neuralis').fill('Test')
    await page.getByRole('button', { name: 'Diagnose aanmaken' }).click()
    await page.getByPlaceholder('Filter diagnoses...').click()
    await page.getByPlaceholder('Filter diagnoses...').fill('test2')
  })
})
