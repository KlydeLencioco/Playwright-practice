import {test, expect} from '../fixtures/testsFixture.js';
const data = require('../fixtures/data.json');

test.describe('Cart tests', () => {

    // Create one shared browser context for all tests
  /** @type {import('@playwright/test').Page} */

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goTo();
        await loginPage.enterLoginDetails(data.validUsername, data.password);
    });

    test('User can add and remove item from the inventory page', async ({ inventoryPage }) => {
        await inventoryPage.addItems();
        await inventoryPage.validateNumberOfItemsInCartIcon();
        await inventoryPage.removeItems();
        await inventoryPage.validateNumberOfItemsInCartIcon("empty");
    });

    test('User can remove item from the cart page', async ({ inventoryPage, cartPage }) => {
        await inventoryPage.addItemsAndGoToCart();
        await cartPage.getItemsInCart();
        await cartPage.removeItemsInCart();
        await cartPage.validateRemovedItemsInCart();
    });

    test('User can continue back to shopping', async({ inventoryPage, cartPage }) => {
      await inventoryPage.addItemsAndGoToCart();
      await cartPage.clickContinueShoppingButton();
      await inventoryPage.validateUserInInventroyPage();
    });

    test('User can checkout', async({ inventoryPage, cartPage, checkOutOnePage }) => {
      await inventoryPage.addItemsAndGoToCart();
      await cartPage.clickCheckoutButton();
      await checkOutOnePage.validateCheckOutOnePage();
    });

    test('User cannot proceed to checkout with an empty cart', async({ inventoryPage, cartPage,checkOutOnePage }) => {
      await inventoryPage.clickCartLinkIcon();
      await cartPage.clickCheckoutButton();
      await checkOutOnePage.validateCheckOutOnePageNotVisible();
    });

    test('User can cancel checkout during 1st step of checkout', async({ inventoryPage, cartPage, checkOutOnePage }) => {
      await inventoryPage.addItemsAndGoToCart();
      await cartPage.clickCheckoutButton();
      await checkOutOnePage.clickCancelCheckoutButton();
      await inventoryPage.validateUserInInventroyPage();
    });

    test('User cannot proceed to checkout if there is a missing information', async({ inventoryPage, cartPage, checkOutOnePage }) => {
      await inventoryPage.addItemsAndGoToCart();
      await cartPage.clickCheckoutButton();
      await checkOutOnePage.fillInformation("", "Test Last Name", "0987");
      await checkOutOnePage.clickContinueButton();
      await checkOutOnePage.validateErrorMessage('Error: First Name is required');
      await checkOutOnePage.fillInformation("Test First Name", "", "0987");
      await checkOutOnePage.clickContinueButton();
      await checkOutOnePage.validateErrorMessage('Error: Last Name is required');
      await checkOutOnePage.fillInformation("Test First Name", "Test Last Name", "");
      await checkOutOnePage.clickContinueButton();
      await checkOutOnePage.validateErrorMessage('Error: Postal Code is required');
    })
  })