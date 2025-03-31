import { expect, Page } from "@playwright/test";

export default class DatePickerPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calenderInputField = this.page.getByPlaceholder("Form Picker");
        await calenderInputField.click();
        const dateToAssert = await this.selectDateInTheCalendar(
            numberOfDaysFromToday
        );
        await expect(calenderInputField).toHaveValue(dateToAssert);
    }

    async selectDatePickerWithRangeFromToday(
        startOfDaysFromToday: number,
        endDayFromToday: number
    ) {
        const calenderInputField = this.page.getByPlaceholder("Range Picker");
        await calenderInputField.click();

        const dateToAssertStart = await this.selectDateInTheCalendar(
            startOfDaysFromToday
        );
        const dateToAssertEnd = await this.selectDateInTheCalendar(
            endDayFromToday
        );

        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;
    }

    private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        const expectedDate = date.getDate().toString();

        const expectedMonthShort = date.toLocaleString("En-US", {
            month: "short",
        });
        const expectedYear = date.getFullYear();
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

        let calendarMonthAndYear: any = await this.page
            .locator("nb-calendar-view-mode")
            .textContent();

        const expectedMonthLong = date.toLocaleString("En-US", {
            month: "long",
        });
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `;

        while (!calendarMonthAndYear.includes(expectedMonthLong)) {
            await this.page
                .locator(
                    "nb-calendar-pageable-navigation [data-name='chevron-right']"
                )
                .click();
            calendarMonthAndYear = await this.page
                .locator("nb-calendar-view-mode")
                .textContent();
        }

        await this.page
            .locator(".day-cell.ng-star-inserted")
            .getByText(expectedDate, { exact: true })
            .click();

        return dateToAssert;
    }
}
