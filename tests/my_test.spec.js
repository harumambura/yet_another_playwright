const { test, expect } = require("@playwright/test");

test.beforeEach(async ({page}) =>{
    await page.goto("/");
    await page.locator("#user-name").fill("standard_user");
    await page.locator("#password").fill("secret_sauce");
    await page.locator("#login-button").click();
})
test('should perform login', async({page}) => {    
    await expect(page.locator(".title")).toContainText("Products");
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('#shopping_cart_container a')).toBeVisible();
    const products = await page.locator('.inventory_item').all();
    expect(products.length).toBeGreaterThan(0);
})

test("should add product to the cart", async({page}) => {   
    const firstItemName = await page.locator(".inventory_item_name").first().textContent();
    await page.locator(".btn_primary").first().click();
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
    await page.locator('#shopping_cart_container').click();
    await expect(page.locator(".inventory_item_name")).toHaveText(firstItemName);
    await page.getByRole("button", {name: "Remove"}).click();
    await expect(page.locator(".cart_item")).toHaveCount(0);
})