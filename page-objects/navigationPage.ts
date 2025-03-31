import { Locator, Page } from "@playwright/test";
import HelperBase from "./helperBase";

export default class NavigationPage extends HelperBase {
    readonly formLayoutMenuItem: Locator;
    readonly datePickerMenuItem: Locator;
    readonly smartTableMenuItem: Locator;
    readonly toastrMenuItem: Locator;
    readonly tooltipMenuItem: Locator;

    constructor(page: Page) {
        super(page);
        this.formLayoutMenuItem = page.getByText("Form Layouts");
        this.datePickerMenuItem = page.getByText("Datepicker");
        this.toastrMenuItem = page.getByText("Toastr");
        this.tooltipMenuItem = page.getByText("Tooltip");
        this.smartTableMenuItem = page.getByText("Smart Table");
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem("Forms");
        await this.formLayoutMenuItem.click();
        await this.waitForNumberOFSeconds(2);
    }

    async datePickerPage() {
        await this.selectGroupMenuItem("Forms");
        //await this.page.waitForTimeout(1000);
        await this.datePickerMenuItem.click();
    }

    async toastrPage() {
        await this.page.getByText("Modal & Overlays").click();
        await this.toastrMenuItem.click();
    }

    async tooltipPage() {
        await this.page.getByText("Modal & Overlays").click();
        await this.tooltipMenuItem.click();
    }

    async smartTablePage() {
        await this.page.getByText("Tables & Data").click();
        await this.smartTableMenuItem.click();
    }

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle);
        const expandedState = await groupMenuItem.getAttribute("aria-expanded");

        if (expandedState == "false") {
            await groupMenuItem.click();
        }
    }
}
