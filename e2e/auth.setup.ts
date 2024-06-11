import { expect, test as setup } from '@playwright/test'
import { Email } from 'mailhog-awesome'
import { MailhogClientService } from './helpers/mail-client'

const adminFile = 'playwright/.auth/admin.json'
const userFile = 'playwright/.auth/user.json'

const adminEmail = 'olaf@ojkaas.nl'
const doctorEmail = 'arts@ojkaas.nl'

const delay = (ms: number | undefined) => new Promise((resolve) => setTimeout(resolve, ms))

setup('warmup login', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Inloggen' }).click()
  await page.getByTestId('email').click()
  await delay(1000)
  await page.getByTestId('email').fill(adminEmail)
  await page.getByRole('button', { name: 'Email link aanvragen' }).click()
  await delay(1000)
})

setup('request magic link', async ({ page }) => {
  const mailHog = MailhogClientService.getInstance().getMailhog()
  await mailHog.deleteAllEmails()

  await page.goto('/')
  await page.getByRole('link', { name: 'Inloggen' }).click()
  await page.getByTestId('email').click()
  await page.getByTestId('email').fill(adminEmail)
  await page.getByRole('button', { name: 'Email link aanvragen' }).click()
  await expect(page.getByRole('heading', { name: 'Email link toegezonden' })).toBeVisible()
})

setup('get magic link and login', async ({ page }) => {
  // End of authentication steps.
  const mailHog = MailhogClientService.getInstance().getMailhog()
  let email: Email | undefined
  let retryCount = 0

  while (!email && retryCount < 10) {
    await delay(1000 * retryCount)
    email = await mailHog.getLastEmail({ to: adminEmail })
    retryCount++
  }

  if (email) {
    const urlRegex = /(http|https):\/\/[^\s]+/g
    const textUrl = email.text.match(urlRegex)
    if (textUrl && textUrl[0]) {
      const url = new URL(textUrl[0])
      const path = url.pathname + url.search

      await page.goto(path)
      await expect(page.getByText('Geen vragenlijst beschikbaar').first()).toBeVisible()
    } else {
      fail('No url found in email')
    }
  } else {
    fail('No email found after 10 retries')
  }

  await mailHog.deleteAllEmails()
  await page.context().storageState({ path: adminFile })
})

/*
setup('authenticate as user', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://github.com/login')
  await page.getByLabel('Username or email address').fill('user')
  await page.getByLabel('Password').fill('password')
  await page.getByRole('button', { name: 'Sign in' }).click()
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://github.com/')
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible()

  // End of authentication steps.

  await page.context().storageState({ path: userFile })
})
  */
