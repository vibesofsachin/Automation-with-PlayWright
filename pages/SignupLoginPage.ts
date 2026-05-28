import { BasePage } from "./BasePage";
import { Page, Locator } from "@playwright/test";

export class SignupLoginPage extends BasePage {

    private readonly newUserSignup: Locator;
    private readonly nameInputforSignup: Locator;
    private readonly emailInputforSignup: Locator;
    private readonly signupButton: Locator;
    private readonly emailAlreadyExist:Locator;

    private readonly loginToYourAccount: Locator;
    private readonly emailInputforLogin: Locator;
    private readonly passwordInputforLogin: Locator;
    private readonly loginButton: Locator;
    private readonly loginError: Locator;

    constructor(page: Page) {
        super(page);

        //Login form locators

        this.loginToYourAccount = page.getByRole('form', { name: 'Login to your account' });
        this.emailInputforLogin = page.locator('input[data-qa="login-email"]');
        this.passwordInputforLogin = page.locator('input[data-qa="login-password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginError = page.locator("//*[contains(text(),'Your email or password is incorrect!')]")


        //Signup form locators
        this.newUserSignup = page.getByRole('heading', { name: 'New User Signup!' });
        this.nameInputforSignup = page.getByRole('textbox', { name: 'Name' });
        this.emailInputforSignup = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.getByRole('button', { name: 'Signup' });
        this.emailAlreadyExist = page.locator("//*[contains(text(),'Email Address already exist!')]");
        
    }

    async loginUser(email: string, password: string) {
        await this.type(this.emailInputforLogin, email);
        await this.type(this.passwordInputforLogin, password);
        await this.loginButton.click();
    }

    //New User Signup!
    async verifyNewUserSignupIsVisible() {
        await this.isVisible(this.newUserSignup);
    }

    async signUp(name: string, email: string) {

        await this.type(this.nameInputforSignup, name);
        await this.type(this.emailInputforSignup, email);
        await this.signupButton.click();
    }

    async VerifyLoginToYourAccountVerify(){
        await this.isVisible(this.loginToYourAccount);
    }

    async verifyErrorMessage(){
        await this.isVisible(this.loginError);
    }

    async verifyEmailAlreadyExist(){
        await this.isVisible(this.emailAlreadyExist);
    }


}
