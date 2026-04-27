import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'

test.describe('Page d\'accueil', () => {
  test('rend le contenu et expose les bons liens', async ({ page }) => {
    const home = new HomePage(page)
    await home.goto()

    await expect(page).toHaveTitle(/escape-box/i)
    await expect(home.title).toBeVisible()
    await expect(home.subtitle).toBeVisible()
    await expect(home.normalLink).toHaveAttribute('href', '/normal')
    await expect(home.demoLink).toHaveAttribute('href', '/demo')
  })
})
