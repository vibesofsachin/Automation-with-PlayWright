import { Page, Locator } from '@playwright/test';

export class BasePage {

  constructor(protected page: Page) {}

  async open(url: string) {
    await this.page.goto(url);
  }

  async click(element: Locator) {
    await element.click();

  }

  async type(element: Locator, text: string) {
    await element.fill(text);
  
  }

  // check if element is visible
  async isVisible(element: Locator) {
    return await element.isVisible();
  }

  
  

}