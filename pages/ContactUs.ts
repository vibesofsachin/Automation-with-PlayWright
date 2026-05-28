import { Locator, Page } from '@playwright/test';
import {BasePage} from '../pages/BasePage';

export class ContactUs extends BasePage{
    private readonly getInTouch:Locator;
    private readonly name:Locator;
    private readonly email: Locator;
    private readonly subject:Locator;
    private readonly message:Locator;
    private readonly chooseFile:Locator;
    private readonly submitButton:Locator;
    private readonly successMessage:Locator;



    constructor(page:Page){
        super(page)
        this.getInTouch = page.getByRole('heading',{name:'Get In Touch'});
        this.name = page.getByPlaceholder("Name");
        this.email=page.locator("//input[@name='email']");
        this.subject =page.getByPlaceholder("Subject");
        this.message = page.getByPlaceholder("Your Message Here");
        this.chooseFile = page.getByRole("button",{name:"Choose File"});
        this.submitButton = page.locator("//input[@name='submit']");
        this.successMessage = page.locator('#contact-page').getByText("Success! Your details have been submitted successfully.");

    }

    async verifyGetInTouch(){
        await this.isVisible(this.getInTouch);
    }

    async enterNameEmailSubjectMessage(name:string,email:string,subject:string,message:string){
        await this.type(this.subject,subject);

        await this.type(this.name,name);

        await this.type(this.message,message);
        await this.type(this.email,email);

    }

    async uploadFileInCotactUS( filePath: string) {
        await this.uploadFile(this.chooseFile,filePath);
        
    }

    
    async clickOnSubmitButton(){
        await this.click(this.submitButton);
    }

    async verifySuccessMessage(){
        await this.isVisible(this.successMessage);
    }
    


}