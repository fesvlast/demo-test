import { test, expect } from "@playwright/test";

test("Input field", async ({ page }, testInfo) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2000);
    if (testInfo.project.name == "mobile") {
        await page.locator(".sidebar-toggle").click();
    }

    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();

    if (testInfo.project.name == "mobile") {
        await page.locator(".sidebar-toggle").click();
    }

    const usingTheGridEmailInput = page
        .locator("nb-card", { hasText: "Using the Grid" })
        .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("test@test.com");
    await usingTheGridEmailInput.clear();

    await usingTheGridEmailInput.pressSequentially("test2@test.com");

    const inputValue = await usingTheGridEmailInput.inputValue();

    expect(inputValue).toEqual("test2@test.com");

    await expect(usingTheGridEmailInput).toHaveValue("test2@test.com");
});
