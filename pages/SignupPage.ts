import { Page, Locator } from "playwright";
import { BasePage } from "./BasePage";
import {generateRandomUserAccountInfo} from '../utils/randomdata';

export class SignupPage extends BasePage {

    //Account Information locators
    private readonly title: Locator;
    private readonly name: Locator;
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly dateOfBirth:Locator;
    private readonly signupForNewsletter: Locator;
    private readonly receiveSpecialOffers: Locator;

    //Address Information locators
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly company: Locator;
    private readonly address1: Locator;
    private readonly address2: Locator;
    private readonly country: Locator;
    private readonly state: Locator;
    private readonly city: Locator;
    private readonly zipcode: Locator;
    private readonly mobileNumber: Locator;

    //after account creation locators
    private readonly accountCreatedMessage: Locator;
    private readonly continueButton: Locator;

    


    constructor(page: Page)  {

        super(page);
        //Account Information locators
        // i want to title from generateRandomUserAccountInfo function and it should be either Mr or Mrs so i will use the check method to select the title
        this.title = page.getByRole('radio', { name: generateRandomUserAccountInfo().title });

        this.name = page.locator("#name");
        this.email = page.locator("#email");
        this.password = page.locator("#password");
        this.dateOfBirth = page.locator('#days, #months, #years');
        this.signupForNewsletter = page.getByRole('checkbox', { name: 'Sign up for our newsletter!' });
        this.receiveSpecialOffers = page.getByRole('checkbox', { name: 'Receive special offers from our partners!' });
        

        //Address Information locators
        this.firstName = page.locator("#first_name");
        this.lastName = page.locator("#last_name");
        this.company = page.locator("#company");
        this.address1 = page.locator("#address1");
        this.address2 = page.locator("#address2");
        this.country = page.locator("#country");
        this.state = page.locator("#state");
        this.city = page.locator("#city");
        this.zipcode = page.locator("#zipcode");
        this.mobileNumber = page.locator("#mobile_number");

        //after account creation locators
        this.accountCreatedMessage = page.locator("h2:has-text('Account Created!')");
        this.continueButton = page.locator("a:has-text('Continue')");

    }
    async selectDateOfBirth(day: string,month: string,year: string) {
    await this.dateOfBirth.nth(0).selectOption(day);
    await this.dateOfBirth.nth(1).selectOption(month);
    await this.dateOfBirth.nth(2).selectOption(year);
    }

    //CREATE A METHOD TO ENTER ACCOUNT INFORMATION AND ONLY ONE ARGSUMENT WHICH IS AN OBJECT CONTAINING ALL THE ACCOUNT INFORMATION
    async enterAccountInformations(accountInfo: {title: string, name: string, email: string, password: string, day: string, month: string, year: string}) {
        await this.title.check();
        await this.name.fill(accountInfo.name);
        await this.password.fill(accountInfo.password);
        await this.selectDateOfBirth(accountInfo.day, accountInfo.month, accountInfo.year);
    }

    //CREATE A METHOD TO ENTER ADDRESS INFORMATION AND ONLY ONE ARGSUMENT WHICH IS AN OBJECT CONTAINING ALL THE ADDRESS INFORMATION
    async enterAddressInformations(addressInfo: {firstName: string, lastName: string, company: string, address1: string, address2: string, country: string, state: string, city: string, zipcode: string, mobileNumber: string}) {
        await this.firstName.fill(addressInfo.firstName);
        await this.lastName.fill(addressInfo.lastName);
        await this.company.fill(addressInfo.company);
        await this.address1.fill(addressInfo.address1);
        await this.address2.fill(addressInfo.address2);
        await this.country.selectOption(addressInfo.country);
        await this.state.fill(addressInfo.state);
        await this.city.fill(addressInfo.city);
        await this.zipcode.fill(addressInfo.zipcode);
        await this.mobileNumber.fill(addressInfo.mobileNumber);
    }

    async createAccount() {
        await this.page.getByRole('button', { name: 'Create Account' }).click();
    }

    async verifyAccountCreated() {
        await this.accountCreatedMessage.isVisible();
    }

    async continueAfterAccountCreation() {
        await this.continueButton.click();
    }

}