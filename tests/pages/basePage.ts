import { Page } from '@playwright/test';

export default abstract class BasePage {
  constructor(protected page: Page) {}

  async navigateTo(url: string) {
    await this.page.goto(url);
  }
}
