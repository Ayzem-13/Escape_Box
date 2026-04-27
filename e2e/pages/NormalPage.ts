import type { Page, Locator } from '@playwright/test'

export class NormalPage {
  readonly page: Page
  readonly title: Locator
  readonly launchButton: Locator
  readonly backLink: Locator
  readonly chrono: Locator
  readonly chronoDisplay: Locator

  constructor(page: Page) {
    this.page = page
    this.title = page.getByTestId('normal-title')
    this.launchButton = page.getByTestId('normal-launch-btn')
    this.backLink = page.getByTestId('normal-back-link')
    this.chrono = page.getByTestId('chrono')
    this.chronoDisplay = page.getByTestId('chrono-display')
  }

  async goto() {
    await this.page.goto('/normal')
  }
}
