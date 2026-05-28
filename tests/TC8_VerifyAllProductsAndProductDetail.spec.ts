
import { test, Page, expect } from '@playwright/test'
import { BasePage } from "../pages/BasePage";
import { HomePage } from "../pages/HomePage";
import { ProductPages } from "../pages/ProductsPage"
import { ProductDetailsPage } from "../pages/ProductDetailsPage"

test.describe("Verify All Prducts and Product details", () => {
    let homePage: HomePage;
    let productPage: ProductPages;
    let productDetailsPage: ProductDetailsPage;



    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productPage = new ProductPages(page)
        productDetailsPage = new ProductDetailsPage(page);
    })

    test("Verify All Products", async ({ page }) => {
        await homePage.navigateToHomePage();
        await homePage.goToProduct();
        await expect(productPage.getAllProductsHeading()).toContainText("All Products");
        await expect(productPage.getProductList().first()).toBeVisible();
        await productPage.clickOnviewProductOfFirstProduct();
        await expect(page).toHaveTitle("Automation Exercise - Product Details");
        await productDetailsPage.verifyProductDetails();

    })

})