import type { Page, Locator } from '@playwright/test'

export class DemoModePage {
  readonly page: Page
  readonly title: Locator
  readonly keyInput: Locator
  readonly duration: Locator
  readonly startButton: Locator
  readonly backLink: Locator
  readonly gameScreen: Locator
  readonly timer: Locator
  readonly backLinkGame: Locator

  constructor(page: Page) {
    this.page = page
    this.title = page.getByTestId('demo-title')
    this.keyInput = page.getByTestId('demo-key-input')
    this.duration = page.getByTestId('demo-duration')
    this.startButton = page.getByTestId('demo-start-btn')
    this.backLink = page.getByTestId('demo-back-link')
    this.gameScreen = page.getByTestId('demo-game-screen')
    this.timer = page.getByTestId('demo-timer')
    this.backLinkGame = page.getByTestId('demo-back-link-game')
  }

  async goto() {
    await this.page.goto('/demo')
  }
}
