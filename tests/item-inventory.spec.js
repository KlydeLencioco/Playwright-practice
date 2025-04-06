import {test, expect} from '../fixtures/testsFixture.js';
const data = require('../fixtures/data.json');

test.describe.serial('Item inventory tests', () => {
    // Create one shared browser context for all tests
  /** @type {import('@playwright/test').Page} */

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goTo();
        await loginPage.enterLoginDetails(data.validUsername, data.password);
    });

    test('User can select and view an item', async ({ inventoryPage, inventoryItemPage }) => {
        await inventoryPage.clickItemLink();
        await inventoryItemPage.validateItemDetails();
    });

    test('User can sort item by name A-Z', async ({ inventoryPage }) => {
        await inventoryPage.sortItems('az');
        await inventoryPage.validateSortedItems('az');
    
    });

    test('User can sort item by name Z-A', async ({ inventoryPage }) => {
        await inventoryPage.sortItems('za');
        await inventoryPage.validateSortedItems('za');
    });

    test('User can sort item by price low to high', async ({ inventoryPage }) => {
        await inventoryPage.sortItems('lohi');
        await inventoryPage.validateSortedItems('lohi');
    });

    test('User can sort item by price high to low', async ({ inventoryPage }) => {
        await inventoryPage.sortItems('hilo');
        await inventoryPage.validateSortedItems('hilo');
    });
});