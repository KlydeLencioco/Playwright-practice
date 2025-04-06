import { expect } from "../fixtures/testsFixture.js"; 

export class CheckOutOnePage{
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page){
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.zipCodeInput = page.locator('[data-test="postalCode"]');
        this.cancelCheckoutButton = page.getByRole('button', { name: "Go back Cancel" });
        this.errorMessage = page.locator('[data-test="error"]');
        this.continueButton = page.getByRole('button', { name: "Continue" });
    }

    async clickContinueButton(){
        await this.continueButton.click();
    }

    async validateCheckOutOnePage(){
        await expect(this.firstNameInput).toBeVisible();
        await expect(this.lastNameInput).toBeVisible();
        await expect(this.zipCodeInput).toBeVisible();
    }

    async validateCheckOutOnePageNotVisible(){
        await expect(this.firstNameInput).not.toBeVisible();
        await expect(this.lastNameInput).not.toBeVisible();
        await expect(this.zipCodeInput).not.toBeVisible();
    }

    async clickCancelCheckoutButton(){
        await this.cancelCheckoutButton.click();
    }

    async fillInformation(firstName, lastName, zipCode){
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }

    async validateErrorMessage(errorMessage){
        await expect(this.errorMessage).toHaveText(errorMessage);
    }
}