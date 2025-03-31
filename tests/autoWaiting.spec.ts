import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }, testInfo) => {
    if (!process.env.URL) {
        throw new Error("URL env var was not defined");
    }
    await page.goto(process.env.URL);
    await page.locator("#ajaxButton").click();
    testInfo.setTimeout(testInfo.timeout + 2_000);
});

test("Auto waiting", async ({ page }) => {
    const successButton = page.locator(".bg-success");

    // await successButton.click();
    // const text = await successButton.textContent();

    // await successButton.waitFor({ state: "attached" });
    // const text = await successButton.allInnerTexts();

    // expect(text).toContain("Data loaded with AJAX get request.");

    await expect(successButton).toHaveText(
        "Data loaded with AJAX get request.",
        { timeout: 20_000 }
    );
});

test("Alternative waits", async ({ page }) => {
    const successButton = page.locator(".bg-success");
    // Wait for element
    // await page.waitForSelector(".bg-success");

    //wait for response
    // await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

    //wait for network calls to be completed (NOT RECOMMENDED)
    //await page.waitForLoadState("networkidle");

    const text = await successButton.allInnerTexts();
    expect(text).toContain("Data loaded with AJAX get request.");
});

test("timeouts", async ({ page }) => {
    test.setTimeout(10_000);
    test.slow();
    const successButton = page.locator(".bg-success");
    await successButton.click({ timeout: 16_000 });
});
