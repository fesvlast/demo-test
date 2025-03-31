import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./test-options";

require("dotenv").config();

export default defineConfig<TestOptions>({
    testDir: "./tests",
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 1,
    workers: process.env.CI ? 1 : undefined,
    reporter: [
        ["json", { outputFile: "test-results/jsonReport.json" }],
        ["junit", { outputFile: "test-results/junitReport.xml" }],
        //["allure-playwright"],
        ["html"],
    ],
    timeout: 40_000,
    globalTimeout: 120_000,

    expect: {
        timeout: 5_000,
        toMatchSnapshot: { maxDiffPixels: 50 },
    },

    use: {
        actionTimeout: 10_000,
        navigationTimeout: 10_000,
        trace: "on-first-retry",
        headless: true,
        video: "off",
        //baseURL: "http://localhost:4200/",
        globalsQaURl: "https://www.globalsqa.com/demo-site/draganddrop/",
        baseURL:
            process.env.DEV === "1"
                ? "http://localhost:4200/"
                : process.env.STAGING === "1"
                ? "http://localhost:4201/"
                : "http://localhost:4200/",
    },

    projects: [
        {
            name: "dev",
            use: {
                ...devices["Desktop Chrome"],
                baseURL: "http://localhost:4200/",
            },
        },
        {
            name: "staging",
            use: {
                ...devices["Desktop Chrome"],
                baseURL: "http://localhost:4201/",
            },
        },
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },

        {
            name: "mobile",

            testMatch: "testMobile.spec.ts",
            use: {
                ...devices["iPhone 15 Pro Max"],
                baseURL: "http://localhost:4200/",
            },
        },
        {
            name: "appliTools",
            testMatch: "appliToolsTest.spec.ts",
            use: {
                ...devices["Desktop Chrome"],
                baseURL: "http://localhost:4200/",
            },
        },
        {
            name: "docker-all",
            use: {
                ...devices["Desktop Chrome"],
                baseURL: "http://host.docker.internal:4200/",
            },
        },
    ],
});
