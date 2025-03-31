import test from "@playwright/test";
import PageManager from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("navigate to form page @smoke @regression", async ({ page }) => {
    const pm = new PageManager(page);

    await pm.navigateTo().formLayoutsPage();
    await pm.navigateTo().datePickerPage();
    await pm.navigateTo().smartTablePage();
    await pm.navigateTo().toastrPage();
    await pm.navigateTo().tooltipPage();
});

test("parametrized methods", async ({ page }) => {
    const pm = new PageManager(page);

    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
        1000
    )}@test.com`;

    await pm.navigateTo().formLayoutsPage();
    await pm
        .onFormLayoutsPage()
        .submitUsingTheGridFormWithCredentialsAndSelectOption(
            "test@test.com",
            "pass123",
            "Option 2"
        );
    await page.screenshot({ path: "screenshots/formLayoutsPage.png" });
    // const buffer = await page.screenshot();
    // console.log(buffer.toString("base64"));

    await pm
        .onFormLayoutsPage()
        .submitInlineFormWithNameEmailAndCheckbox(
            randomFullName,
            randomEmail,
            true
        );
    await page
        .locator("nb-card", {
            hasText: "Inline Form",
        })
        .screenshot({ path: "screenshots/inlineForm.png" });

    await pm.navigateTo().datePickerPage();
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(10);
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(6, 10);
});
