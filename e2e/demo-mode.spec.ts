import { test, expect } from '@playwright/test'
import { HomePage } from './pages/HomePage'
import { DemoModePage } from './pages/DemoModePage'

test.describe('Mode démo', () => {
  test('rend l\'écran et affiche le timer (15:00) une fois la partie démarrée', async ({
    page,
  }) => {
    const home = new HomePage(page)
    const demo = new DemoModePage(page)

    await home.goto()
    await home.demoLink.click()
    await expect(page).toHaveURL(/\/demo$/)

    await expect(demo.title).toBeVisible()
    await expect(demo.keyInput).toBeVisible()
    await expect(demo.duration).toContainText('15 minutes')
    await expect(demo.gameScreen).toBeHidden()

    await demo.startButton.click()
    await expect(demo.gameScreen).toBeVisible()
    await expect(demo.timer).toContainText('15:00')
    await expect(demo.title).toBeHidden()

    await demo.backLinkGame.click()
    await expect(page).toHaveURL(/\/$/)
  })
})
