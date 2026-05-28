import { BasePage } from '../pages/BasePage'
import { Locator, Page } from 'playwright';

export class ProductPages extends BasePage {

    private readonly allProducts: Locator;
    private readonly productList: Locator;
    private readonly viewProduct: Locator;


    constructor(page: Page) {
        super(page);
        this.allProducts = page.locator("//h2[contains(text(),'All Products')]");
        this.productList = page.locator("//div[@class='product-image-wrapper']");
        this.viewProduct = page.locator("//i[@class='fa fa-plus-square']");
    }

    getAllProductsHeading = () => this.allProducts
    getProductList = () => this.productList

    async clickOnviewProductOfFirstProduct() {
        await this.viewProduct.first().click();

    }










}