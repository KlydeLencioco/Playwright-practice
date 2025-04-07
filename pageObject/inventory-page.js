import { expect } from "@playwright/test";
import { Commands } from "../fixtures/commands";

export class InventoryPage {
    static numberOfItemsToSelect;
    static itemList = [];
    static itemSelected;
    static itemDescription;
    static itemPrice;
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.menuButton = page.locator('button[id="react-burger-menu-btn"]');
        this.aboutLink = page.locator('a[data-test="about-sidebar-link"]');
        this.logoutLink = page.locator('a[data-test="logout-sidebar-link"]');
        this.resetAppLink = page.locator('a[data-test="reset-sidebar-link"]');
        this.closeMenuButton = page.locator('button[id="react-burger-cross-btn"]');
        this.sideBarContainer = page.locator('div[class="bm-menu"]');
        this.addToCartButton = page.locator('div[data-test="inventory-container"] button');
        this.numberOfItemsInCartIcon = page.locator('span[class="shopping_cart_badge"]');
        this.cartLinkIcon = page.locator('a[data-test="shopping-cart-link"]');
        this.inventoryContainer = page.locator('div[data-test="inventory-container"]');
        this.itemInventoryNameLink = page.locator('div[data-test="inventory-item-name"]');
        this.itemInventoryDescription = page.locator('div[data-test="inventory-item-desc"]');
        this.itemInventoryPrice = page.locator('div[data-test="inventory-item-price"]');
        this.sortDropDown = page.locator('select[data-test="product-sort-container"]');
    }

    async clickMenuButton() {
        await this.menuButton.click();
    }

    async clickCloseMenuButton() {
        await this.closeMenuButton.click();
    }

    async clickCartLinkIcon() {
        await this.cartLinkIcon.click();
    }

    async logoutUser() {
        await this.clickMenuButton();
        await this.logoutLink.click();
    }

    async navigateToAboutUs() {
        await this.clickMenuButton();
        await this.aboutLink.click();
    }

    async addItems () {
        const listOfItems = await this.addToCartButton.count();

        // generate random number based on the total number of items, this is to simulate a random number of items to be added to the cart
        InventoryPage.numberOfItemsToSelect = Commands.generateRandomNumber(1, listOfItems - 1);

        for (let i = 0; i < InventoryPage.numberOfItemsToSelect; i++) {
            await this.addToCartButton.nth(i).click();
            await expect(this.addToCartButton.nth(i)).toHaveText('Remove');
        }
    }

    async removeItems () {
        const addedItems = InventoryPage.numberOfItemsToSelect; // get the previous number InventoryPage.numberOfItemsToSelect which is the added items
        const removedItems = Commands.generateRandomNumber(1, addedItems - 1); // generate a number of items to be removed in which the max value is the number of items added
        InventoryPage.numberOfItemsToSelect = addedItems - removedItems; // compute for the remaining items
        for (let i = 0; i < removedItems; i++) {
            await this.addToCartButton.nth(i).click();
            await expect(this.addToCartButton.nth(i)).toHaveText('Add to cart');
        }
    }

    async validateNumberOfItemsInCartIcon () {
        if (InventoryPage.numberOfItemsToSelect === 0 ) {
            await expect(this.numberOfItemsInCartIcon).toHaveCount(0);
        } else {
            await expect(this.numberOfItemsInCartIcon).toHaveText(InventoryPage.numberOfItemsToSelect.toString());
        }
    }

    async resetAppState() {
        await this.clickMenuButton();
        await this.resetAppLink.click();
        await this.clickCloseMenuButton();
        InventoryPage.numberOfItemsToSelect = 0;
    }

    async validateAppStateReset() {
        //validate number of items in the cart
        await this.validateNumberOfItemsInCartIcon();
        // check if the buttons of the items are back to the original state
        const listOfItems = await this.addToCartButton.all();
        for (let i = 0; i < listOfItems.length; i++) {
            await expect(listOfItems[i]).toHaveText('Add to cart');
        }
    }

    async addItemsAndGoToCart () {
        await this.addItems();
        await this.cartLinkIcon.click();
    }

    async validateUserInInventroyPage () {
        await expect(this.inventoryContainer).toBeVisible();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }

    async getItemDetails (itemNumber) {
        InventoryPage.itemSelected = await this.itemInventoryNameLink.nth(itemNumber).textContent();
        InventoryPage.itemDescription = await this.itemInventoryDescription.nth(itemNumber).textContent();
        InventoryPage.itemPrice = await this.itemInventoryPrice.nth(itemNumber).textContent();
    }

    async getListOfItem (option) {
        const list = [];
        for (let i = 0; i < await this.itemInventoryNameLink.count(); i++) {
            const name = await this.itemInventoryNameLink.nth(i).textContent();
            const price = await this.itemInventoryPrice.nth(i).textContent();
            const item = [name, price];
            list.push(item);
        }
        return list
    }

    async clickItemLink () {
        const numberOfItems = await this.itemInventoryNameLink.count();
        let itemToClick = Commands.generateRandomNumber(1, numberOfItems - 1);
        this.getItemDetails(itemToClick);        
        await this.itemInventoryNameLink.nth(itemToClick).click();
    }

    // option = 'az' for A-Z
    // option = 'za' for Z-A
    // option = 'lohi' for low to high price
    // option = 'hilo' for high to low price
    async sortItems (option) {
        InventoryPage.itemList = await this.getListOfItem(); //get list of item names before sorting
        console.log(InventoryPage.itemList); 
        await this.sortDropDown.selectOption(option);
    }

    async validateSortedItems (option) {
        const sortedListOfItems = await this.getListOfItem(); //get list of item names after sorting
        if (option === 'az') {
            expect(sortedListOfItems).toEqual(InventoryPage.itemList.sort((a, b) => a[0].localeCompare(b[0])));
        } else if (option === 'za') {
            expect(sortedListOfItems).toEqual(InventoryPage.itemList.sort((a, b) => b[0].localeCompare(a[0])));
        } else if (option === 'lohi') {
            expect(sortedListOfItems).toEqual(InventoryPage.itemList.sort((a, b) => parseFloat(a[1].replace('$', '')) - parseFloat(b[1].replace('$', ''))));
        } else if (option === 'hilo') {
            expect(sortedListOfItems).toEqual(InventoryPage.itemList.sort((a, b) => parseFloat(b[1].replace('$', '')) - parseFloat(a[1].replace('$', ''))));
        }
    }
}