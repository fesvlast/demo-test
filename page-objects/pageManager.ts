import { Page } from "@playwright/test";
import NavigationPage from "./navigationPage";
import FormLayoutPage from "./formLayoutsPage";
import DatePickerPage from "./datePickerPage";

export default class PageManager {
    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly formLayoutPage: FormLayoutPage;
    private readonly datePickerPage: DatePickerPage;

    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.formLayoutPage = new FormLayoutPage(this.page);
        this.datePickerPage = new DatePickerPage(this.page);
    }

    navigateTo() {
        return this.navigationPage;
    }

    onFormLayoutsPage() {
        return this.formLayoutPage;
    }

    onDatePickerPage() {
        return this.datePickerPage;
    }
}
