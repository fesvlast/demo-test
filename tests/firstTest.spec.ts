import test, { expect } from "@playwright/test";

test.beforeAll(async () => {
    console.log("Before all!");
});

test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
});

test("Locator syntax rules", async ({ page }) => {
    await page.locator("input").first().click();

    await page.locator("#inputEmail1").click();

    page.locator(".shape-rectangle");

    page.locator("[placeholder='Email']");

    page.locator(
        "[class='input-full-width size-medium status-basic shape-rectangle nb-transition']"
    );

    page.locator("input[placeholder='Email'][nbinput]");

    page.locator("//*[@id='inputEmail1']");

    page.locator(":text('Using')");

    page.locator(":text-is('Using the Grid')");
});

test("Navigate to datepicker page", async ({ page }) => {
    await page.getByText("Datepicker").click();
});

test("User facing locators", async ({ page }) => {
    await page.getByRole("textbox", { name: "Email" }).first().click();
    await page.getByRole("button", { name: "Sign In" }).first().click();

    await page.getByLabel("Email").first().click();
    await page.getByPlaceholder("Jane Doe").click();
    await page.getByText("Using the Grid").click();

    await page.getByTitle("IoT Dashboard").click();
});

test("Locating child elements", async ({ page }) => {
    await page.locator("nb-card nb-radio :text-is('Option 1')").click();

    await page
        .locator("nb-card")
        .locator("nb-radio")
        .locator(":text-is('Option 2')")
        .click();

    await page
        .locator("nb-card")
        .getByRole("button", { name: "Sign In" })
        .first()
        .click();

    await page.locator("nb-card").nth(3).getByRole("button").click();
});

test("Locating parent elements", async ({ page }) => {
    await page
        .locator("nb-card", { hasText: "Using the Grid" })
        .getByRole("textbox", { name: "Email" })
        .click();

    await page
        .locator("nb-card", { has: page.locator("#inputEmail1") })
        .getByRole("textbox", { name: "Email" })
        .click();

    await page
        .locator("nb-card")
        .filter({ hasText: "Basic form" })
        .getByRole("textbox", { name: "Email" })
        .click();

    await page
        .locator("nb-card")
        .filter({ has: page.locator(".status-danger") })
        .getByRole("textbox", { name: "Password" })
        .click();

    await page
        .locator("nb-card")
        .filter({ has: page.locator("nb-checkbox") })
        .filter({ hasText: "Sign In" })
        .getByRole("textbox", { name: "Email" })
        .click();

    await page
        .locator(":text-is('Using the Grid')")
        .locator("..")
        .getByRole("textbox", { name: "Email" })
        .click();
});

test("Re-using locators", async ({ page }) => {
    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });

    const emailField = basicForm.getByRole("textbox", { name: "Email" });
    await emailField.fill("test@test.com");

    await basicForm
        .getByRole("textbox", { name: "Password" })
        .fill("welcome123");

    await basicForm.locator("nb-checkbox").click();

    await basicForm.getByRole("button", { name: "Submit" }).click();

    await expect(emailField).toHaveValue("test@test.com");
});

test("Extracting values", async ({ page }) => {
    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });

    const btnText = await basicForm.locator("button").textContent();
    expect(btnText).toEqual("Submit");

    const allRadioBtnsLabels = await page.locator("nb-radio").allTextContents();
    expect(allRadioBtnsLabels).toContain("Option 1");

    const emailField = basicForm.getByRole("textbox", { name: "Email" });
    await emailField.fill("test@test.com");

    const emailValue = await emailField.inputValue();
    expect(emailValue).toEqual("test@test.com");

    const placeholderValue = await emailField.getAttribute("placeholder");
    expect(placeholderValue).toEqual("Email");
});

test("Assertions", async ({ page }) => {
    const value = 5;
    expect(value).toEqual(5);

    const basicFormBtn = page
        .locator("nb-card")
        .filter({ hasText: "Basic form" })
        .locator("button");
    const text = await basicFormBtn.textContent();
    expect(text).toEqual("Submit");

    await expect(basicFormBtn).toHaveText("Submit");

    //Soft assertions

    await expect.soft(basicFormBtn).toHaveText("Submit");
    await basicFormBtn.click();
    console.log("Continue...");
});
