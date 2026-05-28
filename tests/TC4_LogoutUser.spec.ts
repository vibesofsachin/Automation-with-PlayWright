import {test} from "@playwright/test"
import { HomePage } from "../pages/HomePage";
import {SignupLoginPage} from "../pages/SignupLoginPage"
import {users} from "../test-data/user"

test.describe("LogOut user",()=>{
    let homePage:HomePage;
    let login:SignupLoginPage;


    test.beforeEach(async({page})=>{
        homePage = new HomePage(page);
        login = new SignupLoginPage(page);

    })

    test("LogOut User",async ({page})=>{
        await homePage.navigateToHomePage();
        await homePage.verifyHomePageLoaded();
        await homePage.goToSignupLoginPage();
        await login.VerifyLoginToYourAccountVerify();
        await login.loginUser(users.validUser.email,users.validUser.password);
        await homePage.verifyLogedInUserName(users.validUser.name);
        await homePage.logOut();
        await login.VerifyLoginToYourAccountVerify();
    })

})