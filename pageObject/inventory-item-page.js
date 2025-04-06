import { expect } from "../fixtures/testsFixture.js";  
import { InventoryPage } from "./inventory-page";

export class InventoryItemPage {
    /**
   * @param {import('@playwright/test').Page} page
   */
    constructor(page) {
        this.page = page;
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.itemDescription = page.locator('[data-test="inventory-item-desc"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
    }

    async validateItemDetails() {
        console.log(InventoryPage.itemSelected + " " + InventoryPage.itemDescription + " " + InventoryPage.itemPrice);
        await expect(this.itemName).toHaveText(InventoryPage.itemSelected);
        await expect(this.itemDescription).toHaveText(InventoryPage.itemDescription);
        await expect(this.itemPrice).toHaveText(InventoryPage.itemPrice);
    }
}