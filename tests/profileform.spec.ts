import { test, expect } from "@playwright/test";

test.describe("ProfileForm Component", () => {
    test.beforeEach(async ({ page }) => {
        // Загрузка страницы с компонентом ProfileForm
        await page.goto("http://localhost:3000/profile/680f6d6598cd9fc552e5c90f/private");
    });
});
