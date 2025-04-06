import { expect } from "@playwright/test"; 

export class LoginPage {
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.loginButton =  page.locator('[data-test="login-button"]');
        this.usernameInput =  page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.erroMsgBox = page.locator('[data-test="error"]');

    }

    async goTo() {
        await this.page.goto('https://www.saucedemo.com/');
    }
    async enterLoginDetails(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async checkLoginError(message) {
        await expect(this.erroMsgBox).toHaveText(message);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async validateLoginPage() {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/');
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
}