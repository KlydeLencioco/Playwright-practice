import { test as base } from '@playwright/test';
import { LoginPage } from '../pageObject/login-page.js';
import { InventoryPage } from '../pageObject/inventory-page.js';
import { CartPage } from '../pageObject/cart-page.js';
import { InventoryItemPage } from '../pageObject/inventory-item-page.js';
import { CheckOutOnePage } from '../pageObject/check-out-one-page.js';


export const test = base.test.extend({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    inventoryItemPage: async ({ page }, use) => {
        const inventoryItemPage = new InventoryItemPage(page);
        await use(inventoryItemPage);
    },
    checkOutOnePage: async ({ page }, use) => {
        const checkOutOnePage = new CheckOutOnePage(page);
        await use(checkOutOnePage);
    }
    // generateRandomNumber: function(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }
});

export { expect } from '@playwright/test';

