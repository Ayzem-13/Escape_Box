import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { NormalPage } from './pages/NormalPage'

test.describe('Mode normal', () => {
  test('rend l\'écran et démarre un chrono à 60:00 au clic', async ({ page }) => {
    const home = new HomePage(page)
    const normal = new NormalPage(page)

    await home.goto()
    await home.normalLink.click()
    await expect(page).toHaveURL(/\/normal$/)

    await expect(normal.title).toBeVisible()
    await expect(normal.launchButton).toBeVisible()
    await expect(normal.chrono).toBeHidden()

    await normal.launchButton.click()
    await expect(normal.chrono).toBeVisible()
    await expect(normal.chronoDisplay).toHaveText('60:00')

    await normal.backLink.click()
    await expect(page).toHaveURL(/\/$/)
  })
})
