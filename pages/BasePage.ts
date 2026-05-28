import { Page, Locator, expect } from '@playwright/test';

export class BasePage {

  private readonly google_vignette: Locator;


  //let a:Locator;  


  constructor(protected page: Page) {

    this.google_vignette = page.locator("div.continue-prompt-text");

  }



  async open(url: string) {
    await this.page.goto(url);
    await this.handleGoogleVignette();

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

  async handleDialog(action: 'accept' | 'dismiss', message?: string) {

    this.page.once('dialog', async dialog => {
      if (action === 'accept') {
        await dialog.accept(message);
      }
      else if (action === 'dismiss') {
        await dialog.dismiss();
      }
      else {
        await console.log("not a valid action");
      }
    })

  }

  async uploadFile(element: Locator, filePath: string) {

    await element.setInputFiles(filePath);

  }


  async isURL(currentPageURL: string) {
    await expect(this.page).toHaveURL("https://automationexercise.com/test_cases");
  }

  async handleGoogleVignette() {
    this.page.on('framenavigated', async () => {
      if (this.page.url().includes('#google_vignette')) {
        console.log('Google vinette detected.')
        await this.click(this.google_vignette);
      }

    })
  }


}