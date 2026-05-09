import { Page,Locator } from "playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    private readonly homeLink: Locator;
    private readonly signUpLoginLink: Locator;
    private readonly newUserSignup!: Locator;
    private readonly nameInputforSignup!: Locator;
    private readonly emailInputforSignup!: Locator
    private readonly logoutLink: Locator;
    private readonly deleteAccountLink: Locator;
    private readonly accountDeletedMessage: Locator;
    private readonly continueButtonAfterAccountDeletion: Locator;

    private readonly loggedInUserName: Locator;

    constructor(page: Page) {
        super(page);
        this.homeLink = page.locator('a:has-text("Home")');

        //signUp related locators
        this.signUpLoginLink = page.locator('a:has-text("Signup / Login")');
        this.newUserSignup = page.locator('h2:has-text("New User Signup!")');
        this.nameInputforSignup = page.locator('input[data-qa="signup-name"]');
        this.emailInputforSignup = page.locator('input[data-qa="signup-email"]');
        this.logoutLink = page.locator('a:has-text("Logout")');
        this.deleteAccountLink = page.locator('a:has-text("Delete Account")');
        this.accountDeletedMessage = page.locator('h2:has-text("Account Deleted!")');
        this.continueButtonAfterAccountDeletion = page.locator('a:has-text("Continue")');
        this.loggedInUserName = page.locator('a:has-text("Logged in as {userName}")');



    }
    async navigateToHomePage() {
        await this.open('./');        
    }

    async goToSignupLoginPage() {
        await this.signUpLoginLink.click();
    }

    async verifyHomePageLoaded() {
        await this.homeLink.isVisible();
    }

    async verifylogoutIsVisible() {
        
        await this.logoutLink.isVisible();
    }

    async deleteAccount() {
        await this.deleteAccountLink.isVisible();
        await this.deleteAccountLink.click();
    }

    async verifyAccountDeletedAndContinue() {
        await this.accountDeletedMessage.isVisible();
        await this.continueButtonAfterAccountDeletion.click();
    }

    async verifyLogedInUserName(userName: string) {
        await this.loggedInUserName.isVisible()
    }

    async logOut() {
        await this.logoutLink.click();
    }





    


}