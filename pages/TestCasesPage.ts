import { test, Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage'

export class TestCasesPage extends BasePage {
    private readonly testCasesHeading: Locator;


    constructor(page: Page) {
        super(page)
        this.testCasesHeading = page.locator("//b[contains(text(),'Test Cases')]");
    }




    getTestCasesHeading = () => this.testCasesHeading;


}

