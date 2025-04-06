import { expect } from "@playwright/test";

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
        console.log(CartPage.listOfItems.length);
    }
    async removeItemsInCart() {
        const min = 1
        // const numberOfItems = await this.itemContainer.count();
        // generate a random number between 1 and the number of items in the cart
        CartPage.numberOfItemsToRemove = Math.floor(Math.random() * ((CartPage.listOfItems.length -1) - min + 1)) + min
        
        console.log("number of items to remove " + CartPage.numberOfItemsToRemove);

        for( let i = 0; i < CartPage.numberOfItemsToRemove; i++) {
            await this.removeButton.nth(0).click();
        }
        // const numberOfItemsToRemove = Math.floor(Math.random() * (max - min + 1)) + min

        // await this.removeButton.click();
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