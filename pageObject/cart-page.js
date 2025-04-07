import { expect } from "@playwright/test";
import { Commands } from "../fixtures/commands";

export class CartPage {
    static numberOfItemsToRemove;
    static listOfItems = [];
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.continueShoppingButton = page.locator('button[id="continue-shopping"]');
        this.checkoutButton = page.locator('button[data-test="checkout"]');
        this.removeButton = page.getByRole('button', { name: 'Remove' });
        this.itemContainer = page.locator('div[data-test="inventory-item"]');
        this.itemName = page.locator('div[data-test="inventory-item-name"]');
    }

    async clickContinueShoppingButton() {
        await this.continueShoppingButton.click();
    }

    async clickCheckoutButton() {
        await this.checkoutButton.click();
    }

    async clickRemoveItemButton() {
        await this.removeButton.click();    
    }
    async getItemsInCart() {
        for (let i = 0; i < await this.itemContainer.count(); i++) {
            const item = await this.itemName.nth(i).textContent();
            CartPage.listOfItems.push(item);
        }
    }
    async removeItemsInCart() {
        // generate a random number between 1 and the number of items in the cart
        CartPage.numberOfItemsToRemove = Commands.generateRandomNumber(1, CartPage.listOfItems.length - 1);
        for( let i = 0; i < CartPage.numberOfItemsToRemove; i++) {
            await this.removeButton.nth(0).click();
        }
    }

    async validateRemovedItemsInCart() {
        const listOfRemainingItems = [];
        for(let i = 0; i < await this.itemContainer.count(); i++) {
            const item = await this.itemName.nth(i).textContent();
            listOfRemainingItems.push(item);
        }
        expect(listOfRemainingItems).not.toEqual(CartPage.listOfItems);
    }
}