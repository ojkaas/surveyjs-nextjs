import { expect, test } from '@playwright/test'
test.describe('Survey definitions', () => {
  test('Create', async ({ page }) => {
    await page.goto('/admin/survey-definitions')
    await expect(page.getByRole('heading', { name: 'Geen vragenlijst beschikbaar' })).toBeVisible()
    await page.getByRole('button', { name: 'Maak vragenlijst aan.' }).click()
    await page.getByPlaceholder('Vragenlijst oogdiagnose').click()
    await page.getByPlaceholder('Vragenlijst oogdiagnose').fill('Test vragenlijst')
    await page.getByPlaceholder('1.0.0').click()
    await page.getByPlaceholder('1.0.0').fill('0.1.1')
    await page.getByPlaceholder('In deze versie zijn extra').click()
    await page.getByPlaceholder('In deze versie zijn extra').fill('Dit is een test')
    await page.getByRole('button', { name: 'Vragenlijst aanmaken' }).click()
    await expect(page.getByText('De enquête is leeg. Sleep een')).toBeVisible()
  })

  test('Edit details', async ({ page }) => {
    await page.goto('/admin/survey-definitions')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('menuitem', { name: 'Wijzigen' }).click()
    await page.getByPlaceholder('Vragenlijst oogdiagnose').click()
    await page.getByPlaceholder('Vragenlijst oogdiagnose').fill('Test vragenlijst - Changed')
    await page.getByPlaceholder('1.0.0').click()
    await page.getByPlaceholder('1.0.0').fill('2')
    await page.getByPlaceholder('In deze versie zijn extra').click()
    await page.getByPlaceholder('In deze versie zijn extra').fill('Changed')
    await page.getByRole('button', { name: 'Vragenlijst aanpassen' }).click()
    await expect(page.getByText('Test vragenlijst - Changed').first()).toBeVisible()
  })

  test('Activate', async ({ page }) => {
    await page.goto('/admin/survey-definitions')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('menuitem', { name: 'Activeren' }).click()
    await expect(page.getByRole('heading', { name: 'Activeer vragenlijst' })).toBeVisible()
    await page.getByRole('button', { name: 'Vragenlijst activeren' }).click()
    await expect(page.locator('tbody').getByText('Actief')).toBeVisible()
    await expect(page.getByText('Huidige actieve vragenlijst')).toBeVisible()
  })

  test('Creator - add Multiple choice', async ({ page }) => {
    await page.goto('/admin/survey-definitions')
    await page.getByRole('link', { name: 'Wijzig in Creator' }).click()
    await page.getByText('Vraag toevoegen').first().click()
    await page.locator('#convertTo').getByRole('button', { name: 'Tekstvak' }).click()
    await page.getByRole('option', { name: 'Meerkeuzevraag' }).locator('div').click()
    await page.getByRole('heading', { name: 'Vraag1' }).getByLabel('content editable').click()
    await page.getByRole('heading', { name: 'Vraag1' }).getByLabel('content editable').fill('Test1')
    await page.getByText('Item 1').click()
    await page.getByText('Item 1').fill('test')
    await page.getByText('Item 2').click()
    await page.getByText('Item 2').fill('test2')
    await page.getByText('Item 3').click()
    await page.getByText('Item 3').fill('test3')
    await page.getByRole('button', { name: 'Enquête opslaan' }).click()
    await expect(page.getByRole('link', { name: 'Diagnose koppelen' })).toBeVisible()
  })

  test('Weight matrix', async ({ page }) => {
    await page.goto('/admin/survey-definitions')
    await page.getByRole('link', { name: 'Diagnose koppelen' }).click()
    await expect(page.getByRole('heading', { name: 'Diagnoses koppelen' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Pagina 1 - Pagina1' })).toBeVisible()
    await page.getByRole('button', { name: 'Pagina 1 - Pagina1' }).click()
    await expect(page.getByRole('link', { name: 'Vraag1 - Test1' })).toBeVisible()
    await page.getByRole('link', { name: 'Vraag1 - Test1' }).click()
    await expect(page.getByRole('heading', { name: 'Diagnose Matrix' })).toBeVisible()
    await page.locator('button:nth-child(3)').first().click()
    await page.getByRole('cell', { name: '1' }).getByRole('button').nth(1).click()
    await page.locator('tr:nth-child(2) > td:nth-child(3) > div > .relative > button').first().click()
    await page.getByRole('cell', { name: '-' }).getByRole('button').first().click()
    await expect(page.getByRole('cell', { name: '2', exact: true }).getByPlaceholder('0')).toHaveValue('2')
    await expect(page.getByRole('cell', { name: '-' }).getByPlaceholder('0')).toHaveValue('-2')
  })
})
