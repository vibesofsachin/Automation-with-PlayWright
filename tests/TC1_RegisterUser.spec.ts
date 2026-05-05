import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SignupLoginPage } from '../pages/SignupLoginPage';
import { SignupPage } from '../pages/SignupPage';
import {generateRandomUserAccountInfo} from '../utils/randomdata';
import {generateRandomUserAddressInfo} from '../utils/randomdata';

test.describe('Register User', () => {

    let homePage: HomePage;
    let signUpLoginPage: SignupLoginPage;
    let signupPage: SignupPage;
    let accountInfo = generateRandomUserAccountInfo();
    let addressInfo = generateRandomUserAddressInfo();

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signUpLoginPage = new SignupLoginPage(page);
        signupPage = new SignupPage(page);
        await homePage.navigateToHomePage();
    });



    test('should load home page successfully', async () => {
        await homePage.verifyHomePageLoaded();
    });

    test('should navigate to signup/login page', async () => {
        await homePage.goToSignupLoginPage();
        await signUpLoginPage.verifyNewUserSignupIsVisible();
    });

    test('should signUp a new user', async ({ page }) => {

        await homePage.goToSignupLoginPage();
        await signUpLoginPage.signUp(accountInfo.name, accountInfo.email);

    });

    test('register user', async ({ page }) => {


        await homePage.goToSignupLoginPage();
        await signUpLoginPage.signUp(accountInfo.name, accountInfo.email);
        await signupPage.enterAccountInformations(accountInfo);
        await signupPage.enterAddressInformations(addressInfo);
        await signupPage.createAccount();
        await signupPage.verifyAccountCreated();
        await signupPage.continueAfterAccountCreation();
        await homePage.verifyLogedInUserName(accountInfo.name);
        await homePage.verifylogoutIsVisible();
        await homePage.deleteAccount();
        await homePage.verifyAccountDeletedAndContinue();
    });



});