import {test, expect} from '../fixtures/testsFixture.js';
const data = require('../fixtures/data.json');

test.describe.serial('Login Tests', () => {

    // Create one shared browser context for all tests
  /** @type {import('@playwright/test').Page} */

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goTo();
    });

    test('User can login with valid credentials', async ({ loginPage, inventoryPage }) => {
        await loginPage.enterLoginDetails(data.validUsername, data.password);
        await inventoryPage.validateUserInInventroyPage();
    });

    test('User cannot login using credentials with error', async ({ loginPage }) => {
        // empty username and password
        await loginPage.enterLoginDetails("", "");
        await loginPage.checkLoginError('Epic sadface: Username is required');

        // empty password
        await loginPage.enterLoginDetails(data.lockedOutUsername, "");
        await loginPage.checkLoginError('Epic sadface: Password is required');

        // user is locked out
        await loginPage.enterLoginDetails(data.lockedOutUsername, data.password);
        await loginPage.checkLoginError('Epic sadface: Sorry, this user has been locked out.');

        // wrong password
        await loginPage.enterLoginDetails(data.validUsername, "wrongPassword");
        await loginPage.checkLoginError('Epic sadface: Username and password do not match any user in this service');
    });
});


