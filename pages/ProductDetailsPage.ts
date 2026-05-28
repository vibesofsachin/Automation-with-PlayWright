import { Locator, Page } from '@playwright/test'
import { BasePage } from '../pages/BasePage'

export class ProductDetailsPage extends BasePage {
    //product name, category, price, availability, condition, brand
    private readonly productName: Locator;
    private readonly category: Locator;
    private readonly availability: Locator;
    private readonly condition: Locator;
    private readonly brand: Locator;

    constructor(page: Page) {
        super(page);
        this.productName = page.locator("//div[@class='product-information']//h2");
        this.category = page.locator("//div[@class='product-information']/p[1]")
        this.availability = page.locator("//div[@class='product-information']/p[2]")
        this.condition = page.locator("//div[@class='product-information']/p[3]")
        this.brand = page.locator("//div[@class='product-information']/p[4]")


    }

    // Verify details is visible: product name, category, price, availability, condition, brand

    async verifyProductDetails() {
        await this.isVisible(this.productName);
        await this.isVisible(this.category);
        await this.isVisible(this.availability);
        await this.isVisible(this.condition);
        await this.isVisible(this.brand);


    }



}