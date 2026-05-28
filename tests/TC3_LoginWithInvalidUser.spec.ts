import {test, expect} from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import{SignupLoginPage} from '../pages/SignupLoginPage'
import {users} from '../test-data/user'

test.describe("Login with Invalid user",()=>{
    let homePage :HomePage;
    let loginPage: SignupLoginPage;
    

    test.beforeEach(async ({page})=>{
        homePage = new HomePage(page);
        loginPage = new SignupLoginPage(page);

    });

    test("Login with Invalid user credentials", async ()=>{
        await homePage.navigateToHomePage();
        await homePage.verifyHomePageLoaded();
        await homePage.goToSignupLoginPage();
        await loginPage.VerifyLoginToYourAccountVerify();
        await loginPage.loginUser(users.InvalidUser.email,users.InvalidUser.password);
        await loginPage.verifyErrorMessage();

    })
});