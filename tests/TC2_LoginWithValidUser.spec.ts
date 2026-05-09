import { test } from '@playwright/test';
import { HomePage } from "../pages/HomePage";
import { SignupLoginPage } from '../pages/SignupLoginPage';
import { users } from '../test-data/user';
import { SignupPage } from '../pages/SignupPage';
import {generateRandomUserAccountInfo} from '../utils/randomdata';
import {generateRandomUserAddressInfo} from '../utils/randomdata';
import { verify } from 'node:crypto';



test.describe('Login with valid user', () => {

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

    test('should login with valid user credentials', async ({ page }) => {

        await homePage.goToSignupLoginPage();
        await signUpLoginPage.signUp(accountInfo.name, accountInfo.email);
        await signupPage.enterAccountInformations(accountInfo);
        await signupPage.enterAddressInformations(addressInfo);
        await signupPage.createAccount();
        await signupPage.verifyAccountCreated();
        await signupPage.continueAfterAccountCreation();
        await homePage.logOut();

        await signUpLoginPage.loginUser(accountInfo.email, accountInfo.password);
        await homePage.verifyLogedInUserName(accountInfo.name);
        await homePage.verifylogoutIsVisible();
        await homePage.deleteAccount();
        await homePage.verifyAccountDeletedAndContinue();
    });





});