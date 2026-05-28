import { expect, Page, test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { TestCasesPage } from "../pages/TestCasesPage";

test.describe("Verify Test Cases Pages", () => {
    let homePage: HomePage;
    let testCases: TestCasesPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        testCases = new TestCasesPage(page);

    })

    test("Verify test Cases pages", async ({ page }) => {
        await homePage.navigateToHomePage();
        await homePage.verifyHomePageLoaded();
        await homePage.goToTestCases();
        await expect(page).toHaveURL("https://automationexercise.com/test_cases");
        await expect(testCases.getTestCasesHeading()).toContainText("Test Cases");

    })

})