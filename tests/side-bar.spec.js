import {test, expect} from '../fixtures/testsFixture.js';
const data = require('../fixtures/data.json');

test.describe('Side bar tests', () => {

    // Create one shared browser context for all tests
  /** @type {import('@playwright/test').Page} */

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goTo();
        await loginPage.enterLoginDetails(data.validUsername, data.password);
    });

    test('User can open and close side bar', async ({ inventoryPage }) => {
        await inventoryPage.clickMenuButton();
        await expect(inventoryPage.sideBarContainer).toBeVisible();
        await inventoryPage.clickCloseMenuButton();
        await expect(inventoryPage.sideBarContainer).not.toBeVisible();
    });

    test('User can logout successfully', async ({ loginPage, inventoryPage }) => {
        await inventoryPage.logoutUser();
        await loginPage.validateLoginPage();
    });

    test('User can navigate to About Us via side bar menu', async ({ inventoryPage }) => {
        await inventoryPage.navigateToAboutUs();
        await expect(inventoryPage.page).toHaveURL('https://saucelabs.com/');
    });

    test('User can reset app state', async ({ inventoryPage }) => {
        await inventoryPage.addItems();
        await inventoryPage.validateNumberOfItemsInCartIcon();
        await inventoryPage.resetAppState();
        await inventoryPage.validateAppStateReset();
    });
});