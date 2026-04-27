import type { Page, Locator } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly title: Locator
  readonly subtitle: Locator
  readonly normalLink: Locator
  readonly demoLink: Locator

  constructor(page: Page) {
    this.page = page
    this.title = page.getByTestId('home-title')
    this.subtitle = page.getByTestId('home-subtitle')
    this.normalLink = page.getByTestId('home-link-normal')
    this.demoLink = page.getByTestId('home-link-demo')
  }

  async goto() {
    await this.page.goto('/')
  }
}
