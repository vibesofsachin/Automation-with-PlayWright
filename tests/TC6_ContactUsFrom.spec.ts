import {test} from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import {ContactUs} from '../pages/ContactUs'
import { users } from '../test-data/user'


test.describe("Contact us form",()=>{
    let homePage:HomePage;
    let contactUs: ContactUs;


    test.beforeEach(async({page})=>{
        homePage= new HomePage(page);
        contactUs = new ContactUs(page);
    })
    

    test("Contact us from",async({page})=>{
        await homePage.navigateToHomePage();
        await homePage.verifyHomePageLoaded();
        await homePage.goToContactUs();
        await contactUs.verifyGetInTouch();
        await contactUs.enterNameEmailSubjectMessage(users.validUser.name,users.validUser.email,"test subject","test message");
        await contactUs.uploadFileInCotactUS("test-data/1776246871949.pdf");
        await contactUs.handleDialog("accept");
        await contactUs.clickOnSubmitButton();
        await contactUs.verifySuccessMessage();
        await homePage.navigateToHomePage();
        await homePage.verifyHomePageLoaded();        
    })
})