import test, { expect } from 'playwright/test'

test('load user page', async ({ page }) => {
  await page.goto('/admin/users')
  await expect(page.getByRole('cell', { name: 'olaf@ojkaas.nl', exact: true }).locator('span')).toBeVisible()
  await expect(page.getByRole('cell', { name: 'arts@ojkaas.nl', exact: true }).locator('span')).toBeVisible()
})

test('add user', async ({ page }) => {
  await page.goto('/admin/users')
  await page.getByRole('button', { name: 'Gebruiker toevoegen' }).click()
  await page.getByPlaceholder('Anne Appelboom').click()
  await page.getByPlaceholder('Anne Appelboom').fill('newuser')
  await page.getByPlaceholder('Anne Appelboom').press('Tab')
  await page.getByPlaceholder('anne@appelboom.nl').fill('new@ojkaas.nl')
  await page.getByLabel('Specialist').click()
  await page.getByRole('button', { name: 'Gebruiker aanmaken' }).click()
  await expect(page.getByText("Gebruiker 'newuser'")).toBeVisible()
  await expect(page.getByRole('cell', { name: 'new@ojkaas.nl', exact: true }).locator('span')).toBeVisible()
})

test('edit user', async ({ page }) => {
  await page.goto('/admin/users')
  await page.getByRole('row', { name: 'Select row Avatar newuser new' }).getByRole('button').click()
  await page.getByRole('menuitem', { name: 'Wijzigen' }).click()
  await page.getByPlaceholder('Anne Appelboom').fill('edituser')
  await page.getByRole('button', { name: 'Gebruiker aanpassen' }).click()
})

test('delete user', async ({ page }) => {
  await page.goto('/admin/users')
  await page.getByRole('row', { name: 'Select row Avatar edituser new' }).getByRole('button').click()
  await page.getByRole('menuitem', { name: 'Verwijderen' }).click()
  await page.getByRole('button', { name: 'Verwijderen' }).click()
  await expect(page.getByText('Gebruiker "edituser"')).toBeVisible()
  await expect(page.getByRole('cell', { name: 'edituser', exact: true }).locator('span')).toHaveCount(0)
})
