import{test} from '@playwright/test'
import {users} from '../test-data/user'
import { HomePage } from '../pages/HomePage'
import {SignupLoginPage} from '../pages/SignupLoginPage'

test.describe("register user with existing email",()=>{
    let homePage: HomePage;
    let signUp: SignupLoginPage;

    test.beforeEach(async ({page})=>{
        homePage = new HomePage(page);
        signUp = new SignupLoginPage(page);
    
        
    });

    test("register user with existing email",async({page})=>{
        await homePage.navigateToHomePage();
        await homePage.verifyHomePageLoaded();
        await homePage.goToSignupLoginPage();
        await signUp.verifyNewUserSignupIsVisible();
        await signUp.signUp(users.validUser.name,users.validUser.email);
        await signUp.verifyEmailAlreadyExist();

        

    });

    
});