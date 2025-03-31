import { test } from "../test-options";
import { faker } from "@faker-js/faker";

test("parametrized methods", async ({ pageManager }) => {
    const randomFullName = faker.person.fullName();
    const randomEmail = `${randomFullName.replace(" ", "")}${faker.number.int(
        1000
    )}@test.com`;

    //await pm.navigateTo().formLayoutsPage();
    await pageManager
        .onFormLayoutsPage()
        .submitUsingTheGridFormWithCredentialsAndSelectOption(
            "test@test.com",
            "pass123",
            "Option 2"
        );

    await pageManager
        .onFormLayoutsPage()
        .submitInlineFormWithNameEmailAndCheckbox(
            randomFullName,
            randomEmail,
            true
        );
});
